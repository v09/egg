/**
 * @fileoverview In software architecture, publish–subscribe is a messaging 
 * pattern where senders of messages, called publishers, do not program the 
 * messages to be sent directly to specific receivers, called subscribers. 
 * Instead, published messages are characterized into classes, without knowledge 
 * of what, if any, subscribers there may be. Similarly, subscribers express 
 * interest in one or more classes, and only receive messages that are of 
 * interest, without knowledge of what, if any, publishers there are.
 * 
 * @author Ciro Cesar Maciel <ciro.maciel@c37.co>
 * 
 * @see {@link https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern|Publish–Subscribe Pattern}
 * 
 */
egg.core.dispatcher = (function () {
    'use strict';

    /**
     * Publish–Subscribe are sent to notify code of interesting things that have 
     * taken place. Each notification is represented by an data which is based 
     * on yours definition, and have custom fields and/or functions used to 
     * get additional information about what happened. Nnotifications can represent 
     * everything from basic user interactions to automated notifications of 
     * things happening in the rendering model
     * 
     * @memberOf egg.core
     * 
     * @class dispatcher
     */
    function Dispatcher() {
        this._listeners = {};
    }

    Dispatcher.prototype = {
        constructor: Dispatcher,
        /**
         * Register an event handler of a specific notification type.
         * 
         * @memberOf egg.core.dispatcher
         * 
         * @function listen
         * @instance
         * @param {String} event The name of the event to listen for
         * @param {Function} handler The function to call when the event occurs
         * @returns {void}
         * 
         * @see {@link egg.core.context#listen|egg.core.context.listen}
         * 
         */
        listen: function (event, handler) {
            (this._listeners[event] = this._listeners[event] || []).push(handler);
        },
        /**
         * Adds a new event handler for a particular type of event.
         * @function notify
         * @memberOf egg.core.dispatcher
         * @instance
         * @param {String} event The name of the event to listen for
         * @param {Function} data The function to call when the event occurs
         * @returns {void}
         */
        notify: function (event, data) {
            if (this._listeners[event] !== undefined) {
                for (var callback in this._listeners[event]) {
                    this._listeners[event][callback].call(this, data);
                }
            }
        },
        /**
         * Adds a new event handler for a particular type of event.
         * @function unListen
         * @memberOf egg.core.dispatcher
         * @instance
         * @param {String} event The name of the event to listen for
         * @param {Function} handler The function to call when the event occurs
         * @returns {void}
         */
        unListen: function (event, handler) {
            if (this._listeners[event] !== undefined) {
                var index = this._listeners[event].indexOf(handler);
                if (index !== -1) {
                    this._listeners[event].splice(index, 1);
                }
            }
        }
    }

    /**
     * Adds a new event handler for a particular type of event.
     * @memberOf egg.core.dispatcher
     * 
     * @function create
     * @returns {void}
     * 
     * @see egg.core.context
     * 
     * @example
     * var event = context.observer.create();
     * console.log(event); // Dispatcher{}
     */
    Dispatcher.create = function () {
        return new Dispatcher();
    };

    return Dispatcher;

})();