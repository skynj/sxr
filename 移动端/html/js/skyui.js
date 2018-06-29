;(function () {
    'use strict';


    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function () {
                return method.apply(context, arguments);
            };
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function (type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function (type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                            if (!event.propagationStopped) {
                                callback(event);
                            }
                        }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function (event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch,
            targetElement = this.targetElement;
        if (event.target.hasAttribute("type") && event.target.getAttribute("type") == "number") {
            return false;
        }
        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function (layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function () {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());
!function (window) {
    "use strict";

    var doc = window.document,
        skyui = {};
    if (typeof (fastFlag) == "undefined") {
        $(window).on('load', function () {
            typeof FastClick == 'function' && FastClick.attach(doc.body);
        });
    }

    //util 给本地用  ydui.uitl 给外面用
    var util = skyui.util = {
        /**
         * 格式化参数（string转json对象）
         * @param string
         * jQuery.isPlainObject()函数用于判断指定参数是否是一个纯粹的对象。
         * 所谓"纯粹的对象"，就是该对象是通过"{}"或"new Object"创建的。
         */
        parseOptions: function (string) {
            if ($.isPlainObject(string)) {
                return string;
            }

            var start = (string ? string.indexOf('{') : -1),
                options = {};

            if (start != -1) {
                try {
                    //创建自执行函数给options
                    options = (new Function('', 'var json = ' + string.substr(start) + '; return JSON.parse(JSON.stringify(json));'))();
                } catch (e) {
                }
            }
            return options;
        },
        /**
         * 页面滚动方法【移动端】
         * @type {{lock, unlock}}
         * lock：禁止页面滚动, unlock：释放页面滚动
         */
        pageScroll: function () {
            var fn = function (e) {
                e.preventDefault();
                e.stopPropagation();
            };
            var islock = false;

            return {
                lock: function () {
                    if (islock)return;
                    islock = true;
                    doc.addEventListener('touchmove', fn);
                },
                unlock: function () {
                    islock = false;
                    doc.removeEventListener('touchmove', fn);
                }
            };
        }(),
        /**
         * 本地存储
         */
        localStorage: function () {
            return storage(window.localStorage);
        }(),
        /**
         * Session存储
         */
        sessionStorage: function () {
            return storage(window.sessionStorage);
        }(),
        /**
         * 序列化
         * @param value
         * @returns {string}
         */
        serialize: function (value) {
            if (typeof value === 'string') return value;
            return JSON.stringify(value);
        },
        /**
         * 反序列化
         * @param value
         * @returns {*}
         */
        deserialize: function (value) {
            if (typeof value !== 'string') return undefined;
            try {
                return JSON.parse(value);
            } catch (e) {
                return value || undefined;
            }
        }
    };

    /**
     * HTML5存储
     */
    function storage(ls) {
        return {
            set: function (key, value) {
                ls.setItem(key, skyui.util.serialize(value));
            },
            get: function (key) {
                return skyui.util.deserialize(ls.getItem(key));
            },
            remove: function (key) {
                ls.removeItem(key);
            },
            clear: function () {
                ls.clear();
            }
        };
    }

    /**
     * 判断css3动画是否执行完毕（补充了一个jquery插件）
     * @git http://blog.alexmaccaw.com/css-transitions
     * @param duration
     */
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false,
            $el = this;

        $(this).one('webkitTransitionEnd', function () {
            called = true;
        });

        var callback = function () {
            if (!called) $($el).trigger('webkitTransitionEnd');
        };

        setTimeout(callback, duration);
    };

    if (typeof define === 'function') {
        define(skyui);
    } else {
        window.SKYUI = skyui;
    }

}(window);

// ============================================屏幕rem适配============================================
!function (window) {
    // 是否加载pem转换
    if(typeof(window.remFlag) && window.remFlag){
        return;
    }
    /* 美工设计稿宽度 */
    var docWidth = 750;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem() {
        var clientWidth = docEl.getBoundingClientRect().width;
        console.log("clientWidth:" + clientWidth);
        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 10), 8.55) * 5 + 'px';

        return refreshRem;
    })();
    /* 添加倍屏标识，安卓倍屏为1 */
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);

    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
        /* 添加IOS标识 */
        doc.documentElement.classList.add('ios');
        /* IOS8以上给html添加hairline样式，以便特殊处理 */
        if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
            doc.documentElement.classList.add('hairline');
    }
    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}(window);

// ============================================dropload-list============================================
!function (a) {
    "use strict";
    function g(a) {
        a.touches || (a.touches = a.originalEvent.touches)
    }

    function h(a, b) {
        b._startY = a.touches[0].pageY, b.touchScrollTop = b.$scrollArea.scrollTop()
    }

    function i(b, c) {
        c._curY = b.touches[0].pageY, c._moveY = c._curY - c._startY, c._moveY > 0 ? c.direction = "down" : c._moveY < 0 && (c.direction = "up");
        var d = Math.abs(c._moveY);
        "" != c.opts.loadUpFn && c.touchScrollTop <= 0 && "down" == c.direction && !c.isLockUp && (b.preventDefault(), c.$domUp = a("." + c.opts.domUp.domClass), c.upInsertDOM || (c.$element.prepend('<div class="' + c.opts.domUp.domClass + '"></div>'), c.upInsertDOM = !0), n(c.$domUp, 0), d <= c.opts.distance ? (c._offsetY = d, c.$domUp.html(c.opts.domUp.domRefresh)) : d > c.opts.distance && d <= 2 * c.opts.distance ? (c._offsetY = c.opts.distance + .5 * (d - c.opts.distance), c.$domUp.html(c.opts.domUp.domUpdate)) : c._offsetY = c.opts.distance + .5 * c.opts.distance + .2 * (d - 2 * c.opts.distance), c.$domUp.css({height: c._offsetY}))
    }

    function j(b) {
        var c = Math.abs(b._moveY);
        "" != b.opts.loadUpFn && b.touchScrollTop <= 0 && "down" == b.direction && !b.isLockUp && (n(b.$domUp, 300), c > b.opts.distance ? (b.$domUp.css({height: b.$domUp.children().height()}), b.$domUp.html(b.opts.domUp.domLoad), b.loading = !0, b.opts.loadUpFn(b)) : b.$domUp.css({height: "0"}).on("webkitTransitionEnd mozTransitionEnd transitionend", function () {
            b.upInsertDOM = !1, a(this).remove()
        }), b._moveY = 0)
    }

    function k(a) {
        "" != a.opts.loadDownFn && a.opts.autoLoad && a._scrollContentHeight - a._threshold <= a._scrollWindowHeight && m(a)
    }

    function l(a) {
        a._scrollContentHeight = a.opts.scrollArea == b ? e.height() : a.$element[0].scrollHeight
    }

    function m(a) {
        a.direction = "up", a.$domDown.html(a.opts.domDown.domLoad), a.loading = !0, a.opts.loadDownFn(a)
    }

    function n(a, b) {
        a.css({"-webkit-transition": "all " + b + "ms", transition: "all " + b + "ms"})
    }

    var f, b = window, c = document, d = a(b), e = a(c);
    a.fn.dropload = function (a) {
        return new f(this, a)
    }, f = function (a, b) {
        var c = this;
        c.$element = a, c.upInsertDOM = !1, c.loading = !1, c.isLockUp = !1, c.isLockDown = !1, c.isData = !0, c._scrollTop = 0, c._threshold = 0, c.init(b)
    }, f.prototype.init = function (f) {
        var l = this;
        l.opts = a.extend(!0, {}, {
            scrollArea: l.$element,
            domUp: {
                domClass: "dropload-up",
                domRefresh: '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate: '<div class="dropload-update">↑释放更新</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            domDown: {
                domClass: "dropload-down",
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">暂无更多数据</div>'
            },
            autoLoad: !0,
            distance: 50,
            threshold: "",
            loadUpFn: "",
            loadDownFn: ""
        }, f), "" != l.opts.loadDownFn && (l.$element.append('<div class="' + l.opts.domDown.domClass + '">' + l.opts.domDown.domRefresh + "</div>"), l.$domDown = a("." + l.opts.domDown.domClass)), l._threshold = l.$domDown && "" === l.opts.threshold ? Math.floor(1 * l.$domDown.height() / 3) : l.opts.threshold, l.opts.scrollArea == b ? (l.$scrollArea = d, l._scrollContentHeight = e.height(), l._scrollWindowHeight = c.documentElement.clientHeight) : (l.$scrollArea = l.opts.scrollArea, l._scrollContentHeight = l.$element[0].scrollHeight, l._scrollWindowHeight = l.$element.height()), k(l), d.on("resize", function () {
            clearTimeout(l.timer), l.timer = setTimeout(function () {
                l._scrollWindowHeight = l.opts.scrollArea == b ? b.innerHeight : l.$element.height(), k(l)
            }, 150)
        }), l.$element.on("touchstart", function (a) {
            l.loading || (g(a), h(a, l))
        }), l.$element.on("touchmove", function (a) {
            l.loading || (g(a, l), i(a, l))
        }), l.$element.on("touchend", function () {
            l.loading || j(l)
        }), l.$scrollArea.on("scroll", function () {
            l._scrollTop = l.$scrollArea.scrollTop(), "" != l.opts.loadDownFn && !l.loading && !l.isLockDown && l._scrollContentHeight - l._threshold <= l._scrollWindowHeight + l._scrollTop && m(l)
        })
    }, f.prototype.lock = function (a) {
        var b = this;
        void 0 === a ? "up" == b.direction ? b.isLockDown = !0 : "down" == b.direction ? b.isLockUp = !0 : (b.isLockUp = !0, b.isLockDown = !0) : "up" == a ? b.isLockUp = !0 : "down" == a && (b.isLockDown = !0, b.direction = "up")
    }, f.prototype.unlock = function () {
        var a = this;
        a.isLockUp = !1, a.isLockDown = !1, a.direction = "up"
    }, f.prototype.noData = function (a) {
        var b = this;
        void 0 === a || 1 == a ? b.isData = !1 : 0 == a && (b.isData = !0)
    }, f.prototype.resetload = function () {
        var b = this;
        "down" == b.direction && b.upInsertDOM ? b.$domUp.css({height: "0"}).on("webkitTransitionEnd mozTransitionEnd transitionend", function () {
            b.loading = !1, b.upInsertDOM = !1, a(this).remove(), l(b)
        }) : "up" == b.direction && (b.loading = !1, b.isData ? (b.$domDown.html(b.opts.domDown.domRefresh), l(b), k(b)) : b.$domDown.html(b.opts.domDown.domNoData))
    }
}(window.Zepto || window.jQuery);

// ============================================Give the thumbs-up============================================
(function ($) {
    $.extend({
        tipsBox: function (options) {
            options = $.extend({
                obj: null, //jq对象，要在那个html标签上显示
                str: "+1", //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
                startSize: "12px", //动画开始的文字大小
                endSize: "30px",  //动画结束的文字大小
                interval: 600, //动画时间间隔
                color: "red",  //文字颜色
                callback: function () {
                }  //回调函数
            }, options);
            $("body").append("<span class='num'>" + options.str + "</span>");
            var box = $(".num");
            var left = options.obj.offset().left + options.obj.width() / 2;
            if (options.arrow == "top") {
                var top = options.obj.offset().top - options.obj.height();
            } else {
                console.log("bottom=======================");
                var top = options.obj.offset().top - options.obj.height();
            }

            console.log("bottom:" + options.obj.offset().bottom);
            console.log("height:" + options.obj.height());
            console.log("top:" + top);

            box.css({
                "position": "absolute",
                "left": left + "px",
                "top": top + "px",
                "z-index": 9999,
                "font-size": options.startSize,
                "line-height": options.endSize,
                "color": options.color
            });
            box.animate({
                "font-size": options.endSize,
                "opacity": "0",
                "top": top - parseInt(options.endSize) + "px"
            }, options.interval, function () {
                box.remove();
                options.callback();
            });
        }
    });
})(window.jQuery || window.Zepto);
//todo jquery支持改成zepto支持

// ============================================dialog============================================
!function (window, skyui) {
    "use strict";
    var dialog = skyui.dialog = skyui.dialog || {},
        $body = $(window.document.body);

    /**
     * 确认提示框
     * @param title 标题String 【可选】
     * @param mes   内容String 【必填】
     * @param opts  按钮们Array 或 “确定按钮”回调函数Function 【必填】
     * @constructor
     */
    dialog.confirm = function (title, mes, opts, opts1) {
        var ID = 'skyui_CONFRIM';

        $('#' + ID).remove();

        var args = arguments.length;
        if (args < 2) {
            console.error('From skyui\'s confirm: Please set two or three parameters!!!');
            return;
        }

        if (typeof arguments[1] != 'function' && args == 2 && !arguments[1] instanceof Array) {
            console.error('From skyui\'s confirm: The second parameter must be a function or array!!!');
            return;
        }

        if (args == 2) {
            opts = mes;
            mes = title;
            title = '提示';
        }

        var btnArr = opts;
        if (typeof opts === 'function') {
            btnArr = [{
                txt: '否',
                color: false,
                callback: function () {
                    opts1 && opts1();
                }
            }, {
                txt: '是',
                color: true,
                callback: function () {
                    opts && opts();
                }
            }];
        }

        var $dom = $('' +
            '<div class="mask-black-dialog" id="' + ID + '">' +
            '   <div class="m-confirm">' +
            '       <div class="confirm-hd"><strong class="confirm-title">' + title + '</strong></div>' +
            '       <div class="confirm-bd">' + mes + '</div>' +
            '   </div>' +
            '</div>');

        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');

        $.each(btnArr, function (i, val) {
            var $btn;
            // 指定按钮颜色
            if (typeof val.color == 'boolean') {
                $btn = $('<a href="javascript:;" class="' + 'confirm-btn ' + (val.color ? 'primary' : 'default') + '">' + (val.txt || '') + '</a>');
            } else if (typeof val.color == 'string') {
                $btn = $('<a href="javascript:;" style="color: ' + val.color + '">' + (val.txt || '') + '</a>');
            }

            // 给对应按钮添加点击事件
            (function (p) {
                $btn.on('click', function (e) {
                    e.stopPropagation();

                    // 是否保留弹窗
                    if (!btnArr[p].stay) {
                        // 释放页面滚动
                        skyui.util.pageScroll.unlock();
                        $dom.remove();
                    }
                    btnArr[p].callback && btnArr[p].callback();
                });
            })(i);
            $btnBox.append($btn);
        });

        $dom.find('.m-confirm').append($btnBox);

        // 禁止滚动屏幕【移动端】
        skyui.util.pageScroll.lock();
        $body.append($dom);
    };

    dialog.confirmCenter = function (title, mes, opts, opts1) {
        var ID = 'skyui_CONFRIM';

        $('#' + ID).remove();

        var args = arguments.length;
        if (args < 2) {
            console.error('From skyui\'s confirm: Please set two or three parameters!!!');
            return;
        }

        if (typeof arguments[1] != 'function' && args == 2 && !arguments[1] instanceof Array) {
            console.error('From skyui\'s confirm: The second parameter must be a function or array!!!');
            return;
        }

        if (args == 2) {
            opts = mes;
            mes = title;
            title = '确认操作';
        }

        var btnArr = opts;
        if (typeof opts === 'function') {
            btnArr = [{
                txt: '取消',
                color: true,
                callback: function () {
                    opts1 && opts1();
                }
            }, {
                txt: '确认',
                color: true,
                callback: function () {
                    opts && opts();
                }
            }];
        }

        var $dom = $('<div class="confirm-center">' +
            '<div class="mask-black-dialog" id="' + ID + '">' +
            '   <div class="m-confirm">' +
            '       <div class="confirm-hd"><strong class="confirm-title">' + title + '</strong></div>' +
            '       <div class="confirm-bd">' + mes + '</div>' +
            '   </div>' +
            '   </div>' +
            '</div>');

        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');

        $.each(btnArr, function (i, val) {
            var $btn;
            // 指定按钮颜色
            if (typeof val.color == 'boolean') {
                $btn = $('<a href="javascript:;" class="' + 'confirm-btn ' + (val.color ? 'primary' : 'default') + '">' + (val.txt || '') + '</a>');
            } else if (typeof val.color == 'string') {
                $btn = $('<a href="javascript:;" style="color: ' + val.color + '">' + (val.txt || '') + '</a>');
            }

            // 给对应按钮添加点击事件
            (function (p) {
                $btn.on('click', function (e) {
                    e.stopPropagation();

                    // 是否保留弹窗
                    if (!btnArr[p].stay) {
                        // 释放页面滚动
                        skyui.util.pageScroll.unlock();
                        $dom.remove();
                    }
                    btnArr[p].callback && btnArr[p].callback();
                });
            })(i);
            $btnBox.append($btn);
        });

        $dom.find('.m-confirm').append($btnBox);

        // 禁止滚动屏幕【移动端】
        skyui.util.pageScroll.lock();

        $body.append($dom);
    };

    dialog.searchConfirm = function (title, opts, opts1, opts2) {
        var ID = 'SKYUI_INPUT_CONFRIM';

        $('#' + ID).remove();

        var args = arguments.length;
        if (args < 2) {
            console.error('From SKYUI\'s confirm: Please set two or three parameters!!!');
            return;
        }

        if (typeof arguments[1] != 'function' && args == 2 && !arguments[1] instanceof Array) {
            console.error('From SKYUI\'s confirm: The second parameter must be a function or array!!!');
            return;
        }

        var btnArr = opts;
        if (typeof opts === 'function') {
            btnArr = [{
                txt: '取消',
                color: false,
                callback: function () {
                    opts1 && opts1();
                }
            }, {
                txt: '查询',
                color: true,
                callback: function () {
                    opts && opts();
                    $dom.remove();
                }
            }];
        }

        var $dom = $('' +
            '<div class="mask-black-dialog" id="' + ID + '">' +
            '   <div class="m-confirm">' +
            '       <div class="confirm-hd"><strong class="confirm-title">' + title + '</strong></div>' +
            '       <div class="confirm-item">' +
            '           <div class="confirm-bd-input">姓名：</div>' +
            '           <input id="gzryxm" class="confirm-input" placeholder="请输入">' +
            '       </div>' +
            '       <div class="confirm-item">' +
            '           <div class="confirm-bd-input">人员类型：</div>' +
            '           <div class="confirm-texticon">' +
            '               <input id="gzrylx" class="confirm-input" value=""  placeholder="请选择" onclick="pickerPersonnelType(this)"/>' +
            '               <div>' +
            '                   <img src="/app/common/images/downArrow.png" id="img_down" alt="" style="width: 0.21rem;height: 0.22rem;margin-right:0.8rem">' +
            '                   <img src="/app/common/images/fork.png" alt="" id="img_clear"  onclick="select_clear()"  style="width: 0.32rem;height: 0.32rem;margin-right: 0.38rem"> ' +
            '               </div>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>');
        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');

        $.each(btnArr, function (i, val) {
            var $btn;
            // 指定按钮颜色
            if (typeof val.color == 'boolean') {
                $btn = $('<a href="javascript:;" class="' + 'confirm-btn ' + (val.color ? 'primary' : 'default') + '">' + (val.txt || '') + '</a>');
            } else if (typeof val.color == 'string') {
                $btn = $('<a href="javascript:;" style="color: ' + val.color + '">' + (val.txt || '') + '</a>');
            }

            // 给对应按钮添加点击事件
            (function (p) {
                $btn.on('click', function (e) {
                    e.stopPropagation();

                    // 是否保留弹窗
                    if (!btnArr[p].stay) {
                        // 释放页面滚动
                        skyui.util.pageScroll.unlock();
                    }
                    btnArr[p].callback && btnArr[p].callback();
                });
            })(i);
            $btnBox.append($btn);
        });

        $dom.find('.m-confirm').append($btnBox);

        // 禁止滚动屏幕【移动端】
        skyui.util.pageScroll.lock();

        $body.append($dom);

    };

    dialog.inputConfirm = function (title, mes, opts, opts1) {
        var ID = 'skyui_INPUT_CONFRIM';

        $('#' + ID).remove();

        var args = arguments.length;
        if (args < 2) {
            console.error('From skyui\'s confirm: Please set two or three parameters!!!');
            return;
        }

        if (typeof arguments[1] != 'function' && args == 2 && !arguments[1] instanceof Array) {
            console.error('From skyui\'s confirm: The second parameter must be a function or array!!!');
            return;
        }

        if (args == 2) {
            opts = mes;
            mes = title;
            title = '提示';
        }

        var btnArr = opts;
        if (typeof opts === 'function') {
            btnArr = [{
                txt: '否',
                color: false,
                callback: function () {
                    opts1 && opts1();
                }
            }, {
                txt: '是',
                color: true,
                callback: function () {
                    opts && opts();
                }
            }];
        }

        var $dom = $('' +
            '<div class="mask-black-dialog" id="' + ID + '">' +
            '   <div class="m-confirm">' +
            '       <div class="confirm-hd"><strong class="confirm-title">' + title + '</strong></div>' +
            '       <div class="confirm-bd">' + mes + '</div>' +
            '       <input class="confirm-input">' +
            '       <input class="confirm-input">' +
            '   </div>' +
            '</div>');

        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');

        $.each(btnArr, function (i, val) {
            var $btn;
            // 指定按钮颜色
            if (typeof val.color == 'boolean') {
                $btn = $('<a href="javascript:;" class="' + 'confirm-btn ' + (val.color ? 'primary' : 'default') + '">' + (val.txt || '') + '</a>');
            } else if (typeof val.color == 'string') {
                $btn = $('<a href="javascript:;" style="color: ' + val.color + '">' + (val.txt || '') + '</a>');
            }

            // 给对应按钮添加点击事件
            (function (p) {
                $btn.on('click', function (e) {
                    e.stopPropagation();

                    // 是否保留弹窗
                    if (!btnArr[p].stay) {
                        // 释放页面滚动
                        skyui.util.pageScroll.unlock();
                        $dom.remove();
                    }
                    btnArr[p].callback && btnArr[p].callback();
                });
            })(i);
            $btnBox.append($btn);
        });

        $dom.find('.m-confirm').append($btnBox);

        // 禁止滚动屏幕【移动端】
        skyui.util.pageScroll.lock();

        $body.append($dom);
    };

    /**
     *评价弹出框
     * @param title
     * @param mes
     * @param opts
     * @param opts1
     */
    dialog.evaluateConfirm = function (title, mes, loadingOpt, opts, opts1) {
        var ID = 'YDUI_EVALUATE_CONFRIM';

        $('#' + ID).remove();

        var args = arguments.length;
        if (args < 2) {
            console.error('From YDUI\'s confirm: Please set two or three parameters!!!');
            return;
        }

        if (typeof arguments[1] != 'function' && args == 2 && !arguments[1] instanceof Array) {
            console.error('From YDUI\'s confirm: The second parameter must be a function or array!!!');
            return;
        }

        if (args == 2) {
            opts = mes;
            mes = title;
            title = '提示';
        }

        var btnArr = opts;
        if (typeof opts === 'function') {
            btnArr = [{
                txt: '取消',
                color: false,
                callback: function () {
                    opts1 && opts1();
                    $dom.remove();
                }
            }, {
                txt: '确认',
                color: true,
                callback: function () {
                    opts && opts();
                    $dom.remove();
                }
            }];
        }

        var $dom = $('' +
            '<div class="mask-black-dialog" id="' + ID + '">' +
            '<div class="e-confirm">' +
            '<div class="e-confirm-hd"><label class="confirm-title">' + title + '</label></div>' +

            '<div class="e-stars">' +

            '<div class="wrapper">' +
            '<label>服务态度</label>' +
            '<div id="rating1" class="rating">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="一般">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很好">' +
            '</div>' +
            '</div>' +

            '<div class="wrapper">' +
            '<label>专业水平</label>' +
            '<div id="rating2" class="rating">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="一般">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很好">' +
            '</div>' +
            '</div>' +

            '<div class="wrapper">' +
            '<label>工作效率</label>' +
            '<div id="rating3" class="rating">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="一般">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很好">' +
            '</div>' +
            '</div>' +

            '<div class="wrapper">' +
            '<label>满意度</label>' +
            '<div id="rating4" class="rating">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="不好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="一般">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="好">' +
            '<img src="/app/common/component/stars/images/ic_star_inactive.png" alt="star" class="rating-item" title="很好">' +
            '</div>' +
            '</div>' +

            '<div>' +
            '<div class="desc-container">' +
            '<div class="item-title">点评描述' +
            '</div>' +
            '<textarea id="wtnr" class="textarea_common" rows="4" placeholder="请输入律师简评，100字以内。" value="" maxlength="50">' +
            '</textarea>' +
            '</div>' +

            '</div>' +

            '</div>' +
            '</div>' +
            '</div>');
        // 遍历按钮数组
        var $btnBox = $('<div class="confirm-ft"></div>');

        $.each(btnArr, function (i, val) {
            var $btn;
            // 指定按钮颜色
            if (typeof val.color == 'boolean') {
                $btn = $('<a href="javascript:;" class="' + 'confirm-btn ' + (val.color ? 'primary' : 'default') + '">' + (val.txt || '') + '</a>');
            } else if (typeof val.color == 'string') {
                $btn = $('<a href="javascript:;" style="color: ' + val.color + '">' + (val.txt || '') + '</a>');
            }

            // 给对应按钮添加点击事件
            (function (p) {
                $btn.on('click', function (e) {
                    e.stopPropagation();

                    // 是否保留弹窗
                    if (!btnArr[p].stay) {
                        // 释放页面滚动
                        skyui.util.pageScroll.unlock();

                    }
                    btnArr[p].callback && btnArr[p].callback();
                });
            })(i);
            $btnBox.append($btn);
        });

        $dom.find('.e-confirm').append($btnBox);

        // 禁止滚动屏幕【移动端】
        skyui.util.pageScroll.lock();

        $body.append($dom);

        //渲染之后回调函数
        loadingOpt && loadingOpt();
    };

    /**
     * 弹出警示框
     * @param mes       提示文字String 【必填】
     * @param callback  回调函数Function 【可选】
     */
    dialog.alert = function (mes, callback) {

        var ID = 'skyui_ALERT';

        $('#' + ID).remove();

        var $dom = $('' +
            '<div id="' + ID + '">' +
            '   <div class="mask-black-dialog">' +
            '       <div class="m-confirm m-alert">' +
            '           <div class="confirm-bd">' + (mes || 'skyui Touch') + '</div>' +
            '           <div class="confirm-ft">' +
            '               <a href="javascript:;" class="confirm-btn primary">确定</a>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>');

        skyui.util.pageScroll.lock();

        $body.append($dom);

        $dom.find('a').on('click', function () {
            $dom.remove();
            skyui.util.pageScroll.unlock();
            typeof callback === 'function' && callback();
        });
    };

    /**
     * 弹出提示层
     */
    dialog.toast = function () {
        var timer = null;
        /**
         * @param mes       提示文字String 【必填】
         * @param type      类型String success or error 【必填】
         * @param timeout   多久后消失Number 毫秒 【默认：2000ms】【可选】
         * @param callback  回调函数Function 【可选】
         */
        return function (mes, type, timeout, callback) {

            clearTimeout(timer);

            var ID = 'skyui_TOAST';
            $('#' + ID).remove();

            var args = arguments.length;
            if (args < 2) {
                console.error('From skyui\'s toast: Please set two or more parameters!!!');
                return;
            }

            var iconHtml = '';
            if (type == 'success' || type == 'error') {
                iconHtml = '<div class="' + (type == 'error' ? 'toast-error-ico' : 'toast-success-ico') + '"></div>';
            }

            var $dom = $('' +
                '<div class="mask-white-dialog" id="' + ID + '">' +
                '    <div class="m-toast ' + (iconHtml == '' ? 'none-icon' : '') + '">' + iconHtml +
                '        <p class="toast-content">' + (mes || '') + '</p>' +
                '    </div>' +
                '</div>');

            skyui.util.pageScroll.lock();
            console.log($body);
            $body.append($dom);

            if (typeof timeout === 'function' && arguments.length >= 3) {
                callback = timeout;
                timeout = 2000;
            }

            timer = setTimeout(function () {
                clearTimeout(timer);
                skyui.util.pageScroll.unlock();
                $dom.remove();
                typeof callback === 'function' && callback();
            }, (~~timeout || 2000) + 100);//100为动画时间
        };
    }();

    /**
     * 顶部提示层
     */
    dialog.notify = function () {

        var timer = null;

        /**
         * @param mes       提示文字String 【必填】
         * @param timeout   多久后消失Number 毫秒 【默认：2000ms】【可选】
         */
        return function (mes, timeout, callback) {

            clearTimeout(timer);

            var ID = 'skyui_NOTIFY';

            $('#' + ID).remove();

            var $dom = $('<div id="' + ID + '"><div class="m-notify">' + (mes || '') + '</div></div>');

            $body.append($dom);

            var next = function () {
                $dom.remove();
                typeof callback == 'function' && callback();
            };

            var closeNotify = function () {
                clearTimeout(timer);

                $dom.find('.m-notify').addClass('notify-out');

                $dom.one('webkitTransitionEnd', next).emulateTransitionEnd(150);
            };

            $dom.on('click', closeNotify);

            if (~~timeout > 0) {
                timer = setTimeout(closeNotify, timeout + 200);
            }
        }
    }();

    /**
     * 加载中提示框
     */
    dialog.loading = function () {

        var ID = 'skyui_LOADING';

        return {
            /**
             * 加载中 - 显示
             * @param text 显示文字String 【可选】
             */
            open: function (text) {
                $('#' + ID).remove();
                var $dom = $('' +
                    '<div class="mask-white-dialog" id="' + ID + '">' +
                    '   <div class="m-loading">' +
                    '       <div class="loading-icon"></div>' +
                    '       <div class="loading-txt">' + (text || '数据加载中') + '</div>' +
                    '   </div>' +
                    '</div>').remove();

                skyui.util.pageScroll.lock();
                $body.append($dom);
            },
            /**
             * 加载中 - 隐藏
             */
            close: function () {
                skyui.util.pageScroll.unlock();
                $('#' + ID).remove();
            }
        };
    }();
}(window, SKYUI);

// ============================================pick.js============================================
/**
 * picker v1.0 Created by zx.
 */
(function (window, document, Math) {
    //scroll
    function Scroll(id, params) {
        this.scroller = document.querySelector(id);
        this.childNode = this.scroller.childNodes[0];
        this.options = {
            step: true, // 是否开启步长模式
            defaultPlace: 0, // 默认列表位置
            callback: null
        };

        this.startPageY = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.offsetTop = 0; //上一次滚动位置

        this.scrollerHeight = this.scroller.clientHeight; //scroller高度
        this.childNodeHeight = this.childNode.clientHeight; //scroller子元素的高度
        this.scrollHeight = this.childNodeHeight - this.scrollerHeight; //滚动高度

        var childNodes = this.childNode.childNodes;
        this.stepLen = childNodes.length > 0 ? childNodes[0].clientHeight : 0; // 步长

        // 设置参数
        for (var i in params) {
            this.options[i] = params[i];
        }

        // 默认列表位置
        var defaultPlace = this.options.defaultPlace ? this.options.defaultPlace : 0;
        this.scrollTo(0, defaultPlace);

        this._start();
        this._move();
        this._end();
        // console.log(this);
    }

    Scroll.prototype = {
        _start: function () {
            var self = this;
            self.scroller.addEventListener('touchstart', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.startTime = self.getTime();
                var touches = e.touches ? e.touches[0] : e;
                self.startPageY = touches.pageY; //起始触摸点

                self.browserVendor('transition', 'none');
            }, false);
        },

        _move: function () {
            var self = this;
            self.scroller.addEventListener('touchmove', function (e) {
                e.stopPropagation();
                e.preventDefault();

                var timestamp = self.getTime();
                var touches = e.touches ? e.touches[0] : e;

                // 滚动高度
                var diffPageY = touches.pageY - self.startPageY;
                var movePageY = diffPageY + self.offsetTop;

                // 最少移动10px
                if (timestamp - self.endTime > 300 && Math.abs(diffPageY) < 10) {
                    return;
                }

                // 超过边缘滚动有阻力
                if (movePageY > 0) {
                    movePageY /= 3;
                } else if (Math.abs(movePageY) > Math.abs(self.scrollHeight)) {
                    movePageY = Math.abs(self.scrollHeight) - Math.abs(movePageY);
                    movePageY = movePageY / 3 - self.scrollHeight;
                }

                self.browserVendor('transform', 'translate(0, ' + movePageY + 'px)');
            }, false);
        },

        _end: function () {
            var self = this;
            self.scroller.addEventListener('touchend', function (e) {
                e.stopPropagation();
                e.preventDefault();

                self.endTime = self.getTime();
                var duration = self.endTime - self.startTime;

                var touches = e.changedTouches ? e.changedTouches[0] : e;
                var offsetHeight = touches.pageY - self.startPageY; //本次滚动偏移位置
                self.offsetTop += offsetHeight; //记录总偏移位置

                if ((self.offsetTop > 0) || (Math.abs(self.offsetTop) > Math.abs(self.scrollHeight))) {
                    //上边缘&下边缘
                    self.browserVendor('transition', 'all 500ms');
                } else if (duration < 300) { // 惯性滚动
                    var speed = Math.abs(offsetHeight) / duration; // 惯性移动速度
                    var moveTime = duration * speed * 20; // 惯性滚动时间(动画)
                    moveTime = moveTime > 2000 ? 2000 : moveTime;
                    self.offsetTop += offsetHeight * speed * 10; // 惯性移动距离

                    self.browserVendor('transitionProperty', 'all');
                    self.browserVendor('transitionDuration', moveTime + 'ms');
                    self.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
                } else {
                    self.browserVendor('transition', 'all 500ms');
                }

                if (self.offsetTop > 0) {
                    self.offsetTop = 0;
                } else if (Math.abs(self.offsetTop) > Math.abs(self.scrollHeight)) {
                    self.offsetTop = -self.scrollHeight;
                }

                // 步长模式
                if (self.options.step && self.stepLen > 0) {
                    var nowEndY = self.offsetTop;
                    var h = Math.abs(nowEndY % self.stepLen); //滚动多余不足step的高度
                    var halfHeight = self.stepLen / 2; //step一半的高度

                    //超过行一半的高度，则滚动一行
                    var moveY = (h >= halfHeight) ? (nowEndY - self.stepLen + h) : (nowEndY + h);

                    var index = parseInt(Math.abs(moveY) / self.stepLen);
                    self.options.callback({
                        index: index,
                        node: self.childNode.childNodes
                    });
                    self.offsetTop = moveY;
                }

                self.browserVendor('transform', 'translate(0, ' + self.offsetTop + 'px)');

            }, false);
        },

        // 滚动到指定位置
        scrollTo: function (x, y, time) {
            var self = this;

            if (time && time > 0) {
                self.browserVendor('transitionProperty', 'all');
                self.browserVendor('transitionDuration', time + 'ms');
                self.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)');
            } else {
                self.browserVendor('transition', 'none');
            }

            y = -y;
            self.offsetTop = y;
            self.browserVendor('transform', 'translate(0, ' + y + 'px)');
        },

        // 刷新
        refresh: function () {
            this.childNode = this.scroller.childNodes[0];
            this.startPageY = 0;
            this.startTime = 0;
            this.endTime = 0;
            this.offsetTop = 0;

            this.scrollerHeight = this.scroller.clientHeight; //scroller高度
            this.childNodeHeight = this.childNode.clientHeight; //scroller子元素的高度
            this.scrollHeight = this.childNodeHeight - this.scrollerHeight; //滚动高度

            var childNodes = this.childNode.childNodes;
            this.stepLen = childNodes.length > 0 ? childNodes[0].clientHeight : 0; // 步长

            this.scrollTo(0, 0, 500);
        },

        // 浏览器兼容
        browserVendor: function (styleStr, value) {
            var self = this;
            var vendors = ['t', 'WebkitT', 'MozT', 'msT', 'OT'],
                styleObj,
                len = vendors.length;
            var elementStyle = self.childNode.style;

            for (var i = 0; i < len; i++) {
                styleObj = vendors[i] + styleStr.substr(1);
                if (styleObj in elementStyle) {
                    elementStyle[styleObj] = value;
                    // console.log(styleObj + ' = ' + value);
                }
            }
        },

        // 获取当前时间
        getTime: function () {
            return parseInt(new Date().getTime());
        }
    };


    // Picker
    function Picker(params) {
        this.dataListTwo = null; //二级数据
        this.arrayDepth = 1; //数组深度
        this.scrollArray = []; //iscroll变量
        this.textArray = []; //选中的值
        this.isScrollTo = false; //是否是scrollTo 滚动

        //参数
        this.options = {
            "title": '请选择', //标题(可选)
            "defaultValue": '', //默认值-多个以空格分开（可选）
            "type": '', //几级联动（1、2、3）
            "data": [], //数组数据(必传)
            "keys": null, //数组内的键名称(必传，id、text、data)
            "callBack": null
        };

        // 参数赋值
        for (var i in params) {
            this.options[i] = params[i];
        }

        // 键名称不能为空, 数组数据不能为空
        if (!this.options.keys && this.options.data.length <= 0) {
            //console.log('键名称不能为空, 数组数据不能为空');
            return;
        }

        // 几级联动
        if (!this.options.type || this.options.type > 3 || this.options.type < 1) {
            //获取数组深度（几级联动）
            this.getArrayDepth(params.data);
        } else {
            this.arrayDepth = this.options.type;
        }

        //键值
        var keys = this.options.keys;
        this.keyId = keys.id;
        this.keyValue = keys.value;
        this.keyData = keys.childData;

        //是否有默认值
        this.defaultArray = ['', '', ''];
        if (this.options.defaultValue) {
            var defaultValue = this.options.defaultValue;
            var dvArray = defaultValue.split(" ");
            if (dvArray.length > 0) {
                for (var num = 0; num < dvArray.length; num++) {
                    this.defaultArray[num] = dvArray[num];
                }
            }
        }

        //填充数据并显示picker
        this.FillData();

        //添加click事件
        this.eventClick();
    }

    Picker.prototype = {
        //填充data
        FillData: function () {
            var self = this;

            // 所有输入失去焦点
            self.enterNodesBlur();

            //body中是否存在picker
            var modalbox = document.querySelector(".zx_mask");
            if (modalbox) {
                document.body.removeChild(modalbox);
            }

            var title = self.options.title ? self.options.title : '请选择';
            var modalParent = document.createElement("div"); //父节点
            modalParent.className = "zx_mask";

            var picker_list = '<div class="zx_select showPicker">' +
                '<header><button class="nav_left picker-cancel">取消</button>' +
                '<h1>' + title + '</h1><button class="nav_right picker-ok">确定</button></header>' +
                '<div class="ub"><div class="ub-f1 picker-wrapper" id="picker-wrapper0"><ul></ul></div>';

            //2级选择
            if (self.arrayDepth >= 2) {
                picker_list += '<div class="ub-f1 picker-wrapper" id="picker-wrapper1"><ul></ul></div>';
            }

            //3级选择
            if (self.arrayDepth >= 3) {
                picker_list += '<div class="ub-f1 picker-wrapper" id="picker-wrapper2"><ul></ul></div>';
            }

            picker_list += '<div class="sel_top"></div><div class="sel_bottom"></div>';
            picker_list += '<div class="sel_middle"></div></div></div>';
            modalParent.innerHTML = picker_list;
            document.body.appendChild(modalParent);

            //设置宽度
            var listWidth = parseFloat(100 / self.arrayDepth).toFixed(3) + "%";
            var pickerWrapperArr = document.querySelectorAll('.picker-wrapper');
            for (var i = 0; i < pickerWrapperArr.length; i++) {
                pickerWrapperArr[i].style.minWidth = listWidth;
                pickerWrapperArr[i].style.maxWidth = listWidth;
            }

            if (self.arrayDepth >= 1) {
                self.showScrollList(this.options.data, 0, true);
            }
            setTimeout(function () {
                document.querySelector('.zx_select').style.height = '245px';
                document.querySelector('.zx_mask').style.zIndex = '9999';
            }, 0);
        },

        // iscroll初始化
        scrollInit: function (index, num) {
            var self = this;

            //每个选项对的高度
            var wrapperList = document.querySelector('#picker-wrapper0').childNodes[0];
            var itemHeight = wrapperList.childNodes[0].clientHeight;

            var id = '#picker-wrapper' + index;
            self.scrollArray[index] = new Scroll(id, {
                //步长（每次滚动固定距离）
                step: itemHeight,

                // 列表默认位置(默认为0)
                defaultPlace: itemHeight * num,

                // 滚动结束回调函数
                callback: function (params) {
                    var num = params.index + 2;
                    var node = params.node[num];
                    self.SetItemList(node, index);
                }
            });

            //禁止move事件
            self.add_EventListen();
        },

        //设置列表、存储选中数据
        SetItemList: function (nowScroll, index) {
            // nowScroll, 当前选择项的节点
            // index, 当前选择的是第几级列表 0，1，2
            var self = this;
            if (nowScroll) {
                //键值
                var keyId = self.keyId;
                var keyValue = self.keyValue;

                // 当前选择项的值
                if (nowScroll.attributes.length > 0) {
                    var nowItem = {};
                    nowItem[keyValue] = nowScroll.textContent;
                    nowItem[keyId] = nowScroll.attributes[0].value;

                    // 默认值重置
                    self.defaultArray = ['', '', ''];
                    if (index == 0) {
                        // 滚动一级列表
                        self.defaultArray[index] = nowItem[keyValue];
                        self.showScrollList(self.options.data, 0);
                    } else if (index == 1) {
                        // 滚动二级列表
                        self.defaultArray[index] = nowItem[keyValue];
                        self.showScrollList(self.dataListTwo, 1);
                    }
                }
            } else {
                var nowItem = "";
            }

            //重置二级选项
            if (self.dataListTwo.length == 0) {
                self.setDefaultItem(1, "", "");
            } else {
                self.setDefaultItem(1, self.dataListTwo[0][keyValue], self.dataListTwo[0][keyId]);
            }

            self.textArray[index] = nowItem;
        },

        // 显示数据列表
        showScrollList: function (dataList, index, isInit) {
            // dataList, 数据(例如：省、市、区)
            // index, 当前wrapper列数(0、1、2)
            // hasDefaultValue, 需要判断默认值(true/false)
            // isInit, 需要判断是否为初始化(true/false)

            var self = this;
            var keyId = self.keyId;
            var keyValue = self.keyValue;
            var keyData = self.keyData;

            var list = '<li></li><li></li>',
                defaultNum, childData = []; //默认值

            if (self.defaultArray[index]) {
                // 判断默认值
                var isMatch = false; // 默认值是否能匹配
                for (var i = 0; i < dataList.length; i++) {
                    if (self.defaultArray[index] && self.defaultArray[index] == dataList[i][keyValue]) {
                        isMatch = true;
                        defaultNum = i; //默认选中的值
                        if (keyData && dataList[i][keyData]) {
                            childData = dataList[i][keyData]; //子集
                        }
                        self.setDefaultItem(index, dataList[i][keyValue], dataList[i][keyId]);
                    }

                    list += '<li data-id="' + dataList[i][keyId] + '">' + dataList[i][keyValue] + '</li>';
                }

                if (!isMatch) {
                    if (keyData && dataList[0][keyData]) {
                        childData = dataList[0][keyData]; //子集
                    }
                    self.setDefaultItem(index, dataList[0][keyValue], dataList[0][keyId]);
                }
            } else {
                if (dataList.length == 0) {
                    list += '<li ></li>';
                } else {
                    for (var i = 0; i < dataList.length; i++) {
                        list += '<li data-id="' + dataList[i][keyId] + '">' + dataList[i][keyValue] + '</li>';
                    }

                    if (keyData && dataList[0][keyData]) {
                        childData = dataList[0][keyData]; //子集
                    }
                    self.setDefaultItem(index, dataList[0][keyValue], dataList[0][keyId]);
                }


            }

            list += '<li></li><li></li>';
            document.querySelector('#picker-wrapper' + index).childNodes[0].innerHTML = list;

            // 初始化&滚动选择
            var num = index + 1;
            if (isInit) {
                self.scrollInit(index, defaultNum); //iscroll init

                if (num < self.arrayDepth && childData.length > 0) {
                    self.showScrollList(childData, num, true);
                }
            } else {
                if (num < self.arrayDepth) {
                    if (childData.length >= 0) {
                        self.showScrollList(childData, num);
                    }

                    setTimeout(function () {
                        if (self.scrollArray.length > 1) {
                            self.scrollArray[num].refresh();
                        }
                    }, 0);
                }
            }

            // 保存一级数据（只滚动二级时使用）
            if (index == 0) {
                self.dataListTwo = childData;
            }
        },

        // 默认选中的值
        setDefaultItem: function (index, value, id) {
            var self = this;

            //键值
            var keyId = self.keyId;
            var keyValue = self.keyValue;

            var newItem = {};
            newItem[keyValue] = value;
            newItem[keyId] = id;

            self.textArray[index] = newItem;
        },

        //点击事件
        eventClick: function () {
            var self = this;

            //取消按钮
            document.querySelector('.picker-cancel').addEventListener("touchstart", function (e) {
                e.stopPropagation();
                e.preventDefault();
                self.HidePicker(); //隐藏picker
            });

            //确定按钮
            document.querySelector('.picker-ok').addEventListener("touchstart", function (e) {
                e.stopPropagation();
                e.preventDefault();

                var inputValue = '';
                var dataCode = '';

                var keys = self.options.keys;
                for (var i = 0; i < self.textArray.length; i++) {
                    var id = keys.id;
                    var value = keys.value;

                    if (i == 0) {
                        inputValue += self.textArray[i][value];
                        dataCode += self.textArray[i][id];
                    } else {
                        inputValue += " " + self.textArray[i][value];
                        dataCode += "," + self.textArray[i][id];
                    }
                }

                //回调函数
                if (self.options.callBack) {
                    self.options.callBack(inputValue, dataCode);
                }

                //隐藏picker
                self.HidePicker();
            });
        },

        //隐藏picker
        HidePicker: function () {
            var self = this;
            document.querySelector('.zx_select').style.height = '0';
            self.remove_EventListen();
            setTimeout(function () {
                var modalBox = document.querySelector('.zx_mask');
                document.body.removeChild(modalBox);
                self.destroy(); //销毁变量
            }, 200);
        },

        //获取数组深度
        getArrayDepth: function (data) {
            var self = this;
            var dataArray = data[0],
                index = "";

            for (var i in dataArray) {
                if (Array.isArray(dataArray[i]) && dataArray[i].length != 0) {
                    index = i;
                    self.arrayDepth++;
                    break;
                }
            }

            if (index) {
                self.getArrayDepth(dataArray[index]);
            }
        },

        // 所有输入失去焦点(隐藏键盘)
        enterNodesBlur: function () {
            var inputArr = document.querySelectorAll('input');
            for (var m = 0; m < inputArr.length; m++) {
                inputArr[m].blur();
            }

            var textareaArr = document.querySelectorAll('textarea');
            for (var n = 0; n < textareaArr.length; n++) {
                textareaArr[n].blur();
            }
        },

        //禁止默认事件
        touchDefault: function (e) {
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
        },

        //阻止冒泡&默认事件
        touchStop: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        //添加监听事件
        add_EventListen: function () {
            var self = this;
            // document.addEventListener('touchstart', self.touchDefault, false);
            document.addEventListener('touchmove', self.touchDefault, false);
            // document.addEventListener('touchend', self.touchDefault, false);
        },

        //移除监听事件
        remove_EventListen: function () {
            var self = this;
            // document.removeEventListener('touchstart', self.touchDefault, false);
            document.removeEventListener('touchmove', self.touchDefault, false);
            // document.removeEventListener('touchend', self.touchDefault, false);
        },

        //picker销毁
        destroy: function () {
            var self = this;

            self.dataListTwo = null; //二级地址数据
            self.options = null; //参数
            self.arrayDepth = 1; //数组深度
            self.scrollArray = []; //iscroll变量
            self.textArray = []; //选中的值
            self.isScrollTo = false; //是否是scrollTo 滚动

            this.keyId = '';
            this.keyValue = '';
            this.keyData = '';

            this.defaultArray = ['', '', '']; //默认值
        }
    };

    if (typeof module != 'undefined' && module.exports) {
        module.exports = Picker;
    } else {
        window.Picker = Picker;
    }
})(window, document, Math);

// ============================================star.js============================================
(function ($) {
    var rating = (function () {
        // default是关键字，无法作为变量名
        var defaults = {
            num: 0,
            readOnly: false,
            mode: 'one',
            activeStar: 'images/ic_star_active.png',
            unActiveStar: 'images/ic_star_inactive.png',
            mouseover: function (num, length) {
                console.log('current object: ', this)
                console.log(num, length)
            },
            mouseclick: function (num, length) {
                console.log('current object: ', this)
                console.log(num, length)
            }
        }


        var extend = function (subClass, superClass) {
            var Super = function () {
            }
            Super.prototype = superClass.prototype
            // 这时候Super实例化就没有superClass的构造函数的内容了
            subClass.prototype = new Super()
            subClass.prototype.constructor = subClass
        }


        var Light = function (wrapper, el, options) {
            // 构造函数全局定义变量
            this.$wrapper = $(wrapper)
            this.$el = this.$wrapper.find(el)
            this.el = el
            this.options = options
        }

        Light.prototype.lightON = function (num, unActiveStar) {
            // 清空初始化
            this.$el.each(function (index, item) {
                $(item).attr('src', unActiveStar)
            })
            // 主计算逻辑
            var num = Math.floor(num * 2) / 2
            var hasDecimal = num % 1 !== 0
            var integer = Math.floor(num)

            for (var i = 0; i < integer; i++) {
                this.$el.eq(i).attr('src', this.options.activeStar)
            }

            if (hasDecimal && this.options.mode === 'half') {
                this.$el.eq(integer).attr('src', 'images/hoshi-halfactive.png')
            }
        }

        Light.prototype.bindEvent = function () {
            // 保存实例对象的this，this会由于事件绑定的原因而改变
            var that = this
            // 根据实例的子例判断加载哪个mouseevent
            this.$wrapper.on(that.mouseevent, this.el, function (e) {
                var num
                if (that.options.mode === 'one') {
                    num = $(this).index() + 1
                } else {
                    num = that.calNum.call(this, e)
                }

                that.lightON(num, that.options.unActiveStar)
                // 绑定一下this，自定义函数中可能有用
                that.options.mouseover && that.options.mouseover.apply(this, [num, that.$el.length])
            })

            // 点击修改全局变量
            this.$wrapper.on('click', this.el, function (e) {
                var num
                if (that.options.mode === 'one') {
                    num = $(this).index() + 1
                } else {
                    num = that.calNum.call(this, e)
                }
                that.options.num = num
                // 绑定一下this，自定义函数中可能有用
                that.options.mouseclick && that.options.mouseclick.apply(this, [that.options.num, that.$el.length])
            })

            // 离开的时候激活
            this.$wrapper.on('mouseleave', function () {
                that.lightON(that.options.num, that.options.unActiveStar)
            })
        }

        Light.prototype.calNum = function (e) {
            // 用于计算鼠标在星星上的间距从而计算num值（用于点亮半颗）
            // var num = (e.pageX - $this.offset().left) / $this.width() + $this.index()
            // 以上代码无法使用，由于点亮函数是判断低于N(1+0.5)的情况下就显示N，需人为控制num
            var num
            var $this = $(this)
            if (e.pageX - $this.offset().left < $this.width() / 2) {
                num = $this.index() + 0.5
            } else {
                num = $this.index() + 1
            }
            return num
        }

        Light.prototype.init = function () {
            this.lightON(this.options.num, this.options.unActiveStar)
            if (!this.options.readOnly) {
                this.bindEvent()
            }
        }

        // 点亮整颗
        var LightOne = function (wrapper, el, options) {
            // 构造函数继承
            Light.call(this, wrapper, el, options)
            this.mouseevent = 'mouseenter'
        }

        // 原型链继承
        extend(LightOne, Light)

        // 点亮半颗
        var LightHalf = function (wrapper, el, options) {
            // 构造函数继承
            Light.call(this, wrapper, el, options)
            this.mouseevent = 'mousemove'
        }

        // 原型链继承
        extend(LightHalf, Light)

        // 模式映射，其实用if也可以
        // new LightOne(wrapper, el, options).init()
        var Mode = {
            'one': LightOne,
            'half': LightHalf
        }

        // 配置需要定义默认值，初始化入口
        var init = function (wrapper, el, options) {
            options = $.extend({}, defaults, options)
            // 容错判断
            Mode[options.mode] ? '' : options.mode = 'one'
            new Mode[options.mode](wrapper, el, options).init()
        }

        return {
            init: init
        }
    })()

    $.fn.rating = function (el, options) {
        this.each(function () {
            rating.init(this, el, options)
        });
    }
})(window.Zepto || window.jQuery);
(function ($) {
    $.fn.touchEventBind = function (touch_options) {
        var touchSettings = $.extend({
            tapDurationThreshold: 250,					//触屏大于这个时间不当作tap
            scrollSupressionThreshold: 10,				//触发touchmove的敏感度
            swipeDurationThreshold: 250,				//大于这个时间不当作swipe
            horizontalDistanceThreshold: 130,			//swipe的触发垂直方向move必须小于这个距离
            verticalDistanceThreshold: 15,				//swipe的触发水平方向move必须大于这个距离
            tapHoldDurationThreshold: 750,				//swipe的触发水平方向move必须大于这个距离
            doubleTapInterval: 250						//swipe的触发水平方向move必须大于这个距离
        }, touch_options || {})


        var touch = {}, touchTimeout, delta, longTapTimeout;

        function parentIfText(node) {
            return 'tagName' in node ? node : node.parentNode
        }

        function swipeDirection(x1, x2, y1, y2) {
            var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
            return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
        }


        function longTap() {
            longTapTimeout = null
            touch.el.trigger('longTap');
            touch.longTap = true;
            touch = {};
        }

        function cancelLongTap() {
            if (longTapTimeout) clearTimeout(longTapTimeout)
            longTapTimeout = null
        }


        this.data('touch_event_bind', "true");
        this.bind('touchstart', function (e) {
            touchTimeout && clearTimeout(touchTimeout);

            touch.el = $(parentIfText(e.touches[0].target));
            now = Date.now();
            delta = now - (touch.last_touch_time || now);
            touch.x1 = e.touches[0].pageX;
            touch.y1 = e.touches[0].pageY;
            touch.touch_start_time = now;
            touch.last_touch_time = now;


            if (delta > 0 && delta <= touchSettings.doubleTapInterval) touch.isDoubleTap = true;

            longTapTimeout = setTimeout(function () {

                longTap();
            }, touchSettings.tapHoldDurationThreshold);

        }).bind('touchmove', function (e) {
            cancelLongTap();

            touch.x2 = e.touches[0].pageX;
            touch.y2 = e.touches[0].pageY;

            // prevent scrolling
            if (Math.abs(touch.x1 - touch.x2) > touchSettings.scrollSupressionThreshold) {
                e.preventDefault();
            }

            touch.touch_have_moved = true;


        }).bind('touchend', function (e) {
            cancelLongTap();

            now = Date.now();
            touch_duration = now - (touch.touch_start_time || now);


            if (touch.isDoubleTap) {
                touch.el.trigger('doubleTap');
                touch = {};
            }
            else if (!touch.touch_have_moved && touch_duration < touchSettings.tapDurationThreshold) {
                touch.el.trigger('tap');

                touchTimeout = setTimeout(function () {
                    touchTimeout = null;
                    touch.el.trigger('singleTap');
                    touch = {};
                }, touchSettings.doubleTapInterval);
            }
            else if (touch.x1 && touch.x2) {
                if (touch_duration < touchSettings.swipeDurationThreshold && Math.abs(touch.x1 - touch.x2) > touchSettings.verticalDistanceThreshold && Math.abs(touch.y1 - touch.y2) < touchSettings.horizontalDistanceThreshold) {
                    touch.el.trigger('swipe').trigger(touch.x1 > touch.x2 ? "swipeLeft" : "swipeRight");
                    touch = {};
                }
            }

        }).bind('touchcancel', function (e) {

            touchTimeout && clearTimeout(touchTimeout);
            cancelLongTap();
            touch = {};
        })
    };

    $.fn.touchbind = function (m, callback, touch_options) {
        if (this.data('touch_event_bind') != "true") {
            this.touchEventBind(touch_options);
        }

        this.bind(m, callback);
    };

    ;
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function (m) {
        $.fn[m] = function (touch_options, callback) {
            if (typeof(touch_options) == "object" && typeof(callback) == "function") {
                return this.touchbind(m, callback, touch_options)
            }
            else if (typeof(touch_options) == "function") {
                var callback = touch_options;
                return this.touchbind(m, callback)
            }
        }
    });
// ============================================TouchSlider============================================

})(window.Zepto || window.jQuery);