// ==UserScript==
// @name         AmazonVideo skip outro
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically skip the outro on Amazonvideo
// @author       Bobocato
// @match        https://www.amazon.de/*
// @match        https://www.amazon.com/*
// @match        https://www.amazon.co.uk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        //Skip Ad
        var ad = document.getElementsByClassName("adSkipButton")[0];
        if(ad.className.split(" ")[1] == "skippable"){
            console.log("Skip that ad");
            ad.click();
        }
        //Skip Outro
        var hoverOutro = document.getElementsByClassName("nextUpCard")[0];
        if(typeof(hoverOutro) != "undefined"){
            console.log("Skip that Outro");
            hoverOutro.click();
        }
    }, 1000);
})();