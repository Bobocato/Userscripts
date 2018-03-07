// ==UserScript==
// @name         YouTube - Ad Skip
// @version      1.0
// @description  Skips ads automatically
// @author       Bobocato
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

const equalText = "Überspringen";

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
    setInterval(function (){
        if(window.location.href.substring(0,30) == "https://www.youtube.com/watch?"){
            skipAd();
        }
    }, 2500);
})();