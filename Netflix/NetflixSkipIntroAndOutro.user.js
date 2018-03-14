// ==UserScript==
// @name         Netflix skip intro and outro
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically skip intro and outro on Netflix
// @author       You
// @match        https://www.netflix.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setInterval(function(){
        //Check if on watching
        var urlParts = window.location.href.split("/");
        if(urlParts.indexOf("watch") > -1){
            var introSkip = document.getElementsByClassName("skip-credits")[0];
            if(typeof(introSkip) != "undefined"){
                console.log(introSkip);
                introSkip.children[0].click();
            }
            var hoverOutro = document.getElementsByClassName("WatchNext-still-container")[0];
            if(typeof(hoverOutro) != "undefined"){
                console.log("Skip that Outro");
                hoverOutro.click();
            }

            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length; i++){
                if(links[i].children.length > 1 && links[i].className == "nf-icon-button nf-flat-button nf-flat-button-primary"){
                    var smallOutro = links[i];
                    console.log(links[i]);
                    if(smallOutro.parentElement.className != "PromotedVideo-actions"){
                        smallOutro.click();
                    }
                }
            }
        }
    }, 1000);
})();