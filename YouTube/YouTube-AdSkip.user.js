// ==UserScript==
// @name         YouTube - Ad Skip
// @version      1.0
// @description  Skips and removes ads on YouTube automatically
// @author       Bobocato
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

const equalText = "Skip Ad";

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

function skipAd(){
    console.log("Tried to skip a ad");
    if(document.getElementsByClassName("videoAdUiSkipButton").length > 0){
        if(document.getElementsByClassName("videoAdUiSkipButton")[0].childNodes[0].textContent === equalText){
            document.getElementsByClassName("videoAdUiSkipButton")[0].click();
        } else {
            setTimeout(skipAd(), 1000);
        }
    }
}

(function() {
    'use strict';
    addNewStyle('.controls {display:none !important;}');
    setInterval(function (){
        if(window.location.href.substring(0,30) == "https://www.youtube.com/watch?"){
            skipAd();
        }
    }, 2500);
})();