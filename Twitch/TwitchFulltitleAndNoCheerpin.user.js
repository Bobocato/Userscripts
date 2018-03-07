// ==UserScript==
// @name         Twitch fulltitle and no cheerpin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shows the fulltitle on twitch and removes the pin for cheers on top of the stream
// @author       Bobocato
// @match        https://www.twitch.tv/*
// @grant        none
// ==/UserScript==

/*
Taken from https://stackoverflow.com/questions/9153718/change-the-style-of-an-entire-css-class-using-javascript/14249194#14249194
*/

function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

(function() {
    'use strict';
    addNewStyle('.tw-ellipsis {text-overflow:initial !important;}');
    addNewStyle('.tw-ellipsis {white-space:initial !important;}');
    addNewStyle('.pinned-cheer-v2 {display:none !important;}');
})();