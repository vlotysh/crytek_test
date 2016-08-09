define(function () {

    var _el = [];
    var jqueryFree = {};

    /**
     * Hide elements
     * 
     * @returns {jquery-free_L1.jqueryFree}
     */
    jqueryFree.hide = function () {
        this.each(function (i, el) {
            el.style.display = 'none';
        });

        return this;
    };

    /**
     * 
     * Show elements
     * 
     * @returns {jquery-free_L1.jqueryFree}
     */
    jqueryFree.show = function () {
        this.each(function (i, el) {
            el.style.display = '';
        });

        return this;
    };

    /**
     * 
     * Ajax call by url
     * 
     * @param {Mixed} options
     *
     */
    jqueryFree.ajax = function (options) {
        var xmlhttp, timeout, standart = {
            "url": document.location.href,
            "data": {},
            "method": "get",
            "timeout": 5000,
            "beforesend": function () {},
            "success": function () {},
            "error": function () {},
            "complete": function () {}
        };

        for (var param in standart){
            if (typeof options[param] === "undefined") {
                options[param] = standart[param];
            } 
        }

        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new XMLHttpRequest();
                } catch (e) {
                    options.error("Unexpected error");
                    options.complete();
                    return this;
                }
            }
        }

        timeout = setTimeout(function () {
            xmlhttp.abort();
            options.error("TimeOut");
            options.complete();
        }, options.timeout);

        xmlhttp.open(options.method, options.url, true);
        xmlhttp.send(options.data);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                clearTimeout(timeout);

                if (xmlhttp.status == 200){
                     options.success(xmlhttp.responseText);
                }                   
                else {
                    options.error(xmlhttp.statusText);
                }

                options.complete();
            }
        };

        return this;

    };

    /**
     * 
     * Get attribute value
     * 
     * @param {String} attr
     * @returns {jquery-free_L1.jqueryFree@call;getElement@call;getAttribute}
     */
    jqueryFree.getAttr = function (attr) {
        return this.getElement().getAttribute(attr);
    };

    /**
     * 
     * Set attribute value
     * 
     * @param {type} attr
     * @param {type} value
     * @returns {jquery-free_L1.jqueryFree}
     */
    jqueryFree.setAttr = function (attr, value) {
        this.getElement().setAttribute(attr, value);
        return this;

    };

    /**
     * 
     * Get or set html to element
     * 
     * @param {String} html
     * @returns {jquery-free_L1.jqueryFree}
     */
    jqueryFree.html = function (html) {
        if(typeof html === "undefined") {
            return this.getElement().innerHTML;
        }
        
        this.each(function (i, el) {
            el.innerHTML = html;
        })
        
        return this;
    },
    
    /**
    * 
    * Attach event to objects
    * 
    * @param {String} eventName
    * @param {Callback} eventHandler
    */
    jqueryFree.on = function (eventName, eventHandler) {
        for (var _i = 0; _i < this._el.length; _i++) {
            this._el[_i].addEventListener(eventName, eventHandler, false);
        }
    };

    /**
     * 
     * Trigger event
     * 
     * @param {String} eventName
     * @param {String} selector 
     */
    jqueryFree.trigger = function (eventName, selector) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, false);

        this.select(selector).each(function (i, el) {
            el.dispatchEvent(event);
        })

    },
    
    /**
    * 
    * Get element
    * 
    * @returns {Object}
    */
    jqueryFree.getElement = function () {
                return this._el[0];
    };
    
    /**
     * 
     * Iterator with callback
     * 
     * @param {Callbkack} func
     * @returns {undefined}
     */
    jqueryFree.each = function (callback) {
        for (var _i = 0; _i < this._el.length; _i++) {
            callback(_i, this._el[_i]);
        }
    }
    /**
     * 
     * Return class list for element
     * 
     * @returns {String}
     */
    jqueryFree.getClassList = function () {
        return this.getElement().classList;
    };
    
    /**
     * 
     * Select elements by selector
     * 
     * @param {String|Object} selector
     * @returns {jquery-free_L1.jqueryFree}
     */
    jqueryFree.select = function (selector) {
        var elements = typeof selector === "string" ? document.querySelectorAll(selector) : selector;
        jqueryFree._el = [];

        if (elements.length > 0) {
            jqueryFree._el = elements;
        } else if (typeof selector === "object") {
            jqueryFree._el.push(elements);
        }

        return this;
    }

    return jqueryFree;

});