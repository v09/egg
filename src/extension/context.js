/**
 * @fileoverview It provides an environment for the modules to work without 
 * affecting other modules and their personal sandboxes.
 * 
 * @see {@link https://github.com/shichuan/javascript-patterns/blob/master/object-creation-patterns/sandbox.html|Sandbox Pattern}
 * @see {@link http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mediatorpatternjavascript|Mediator Pattern}
 * 
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 * 
 */

egg.extension.context = (function () {

    'use strict';

    /**
     * The object type that modules use to interact with the environment. Used
     * exclusively within Box.Application, but exposed publicly for easy testing.
     * 
     * @memberOf egg.extension
     * 
     * @class context
     * @mixes egg.extension.observer
     * 
     * @param {HTMLElement} element Module's DOM element
     * @param {String} name Module's DOM element
     * @param {String} error Module's DOM element
     */
    function Context(library, element, name) {

        this._library = library;
        this._element = element;
        this._name = name;

        egg.extension.object.assign(this, {
            /**
             * Adds a new event handler for a particular type of event.
             * 
             * @memberOf egg.extension.context
             * @instance
             * 
             * @function listen
             * @param {String} event The name of the event to listen for
             * @param {Function} handler The function to call when the event occurs
             * @returns {egg.extension.context}
             * 
             * @example
             * context.listen('click', function (event) {;
             *      console.log(event); // Event{}  
             * });
             * 
             */
            listen: function (event, handler) {

                this._library.event.listen(this._name + '-' + event, handler);

                return this;

            },
            notify: function (event, data) {

                this._library.event.notify(this._name + '-' + event, data);

                return this;

            },
            /**
             * Passthrough method that signals that an error has occurred. For 
             * an event is fired.
             * 
             * @memberOf egg.extension.context
             * @instance
             * 
             * @function error
             * @param {Error} [exception] The exception object to use.
             * @returns {void}
             * 
             */
            get error() {
                return this._library._error;
            }
        });

    }

    //-------------------------------------------------------------------------
    // Passthrough Methods
    //-------------------------------------------------------------------------

    Context.prototype = {
        constructor: Context,
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @function module
         * @param {String} name module name
         * @returns {Object}
         * 
         * @example
         * var tool = context.module('tool');
         * console.log(tool); // Tool{}
         * 
         */
        module: function (name) {
            return this._library.module.get(name);
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {HTMLElement} element description
         * 
         * @example
         * var element = context.element;
         * console.log(element); // HTMLElement{}
         */
        get element() {
            return this._element;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {Dictionary} element description
         * 
         * @example
         * var apiKey = context.global.get('apiKey');
         * console.log(apiKey); // 1B:2B:2D:37:E1:CE:06:8B:A0:F0:73:05:3C:A3:63:DD
         */
        get global() {
            return egg.extension.global;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {Utility} utility description
         * 
         */
        get utility() {
            return egg.extension.utility;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {Utility} observer description
         * 
         */
        get pubsub() {
            return egg.extension.pubsub;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {Utility} data description
         * 
         */
        get data() {
            return egg.extension.data;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {Utility} object description
         * 
         */
        get object() {
            return egg.extension.object;
        },
        /**
         * Adds a new event handler for a particular type of event.
         * 
         * @memberOf egg.extension.context
         * @instance
         * 
         * @property {Utility} dom description
         * 
         */
        get dom() {
            return egg.extension.dom;
        },
    };

    return Context;

}());