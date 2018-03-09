// ==UserScript==
// @name         Netflix Speed
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Saves the set playback speed on Netflix
// @author       Bobocato
// @match        https://www.netflix.com/*
// @grant        none
// ==/UserScript==

function setEvents(video){
    //Safe Playback Rate
    video.onratechange = function() {
        var speedup = video.playbackRate - localStorage.getItem("playrate");
        if((Math.round(speedup *10)/10) == 0.1 ||(Math.round(speedup *10)/10) == -0.1 ){
            localStorage.setItem("playrate", video.playbackRate);
        }
    };

    //Safe volume
    video.onvolumechange = function() {
        localStorage.setItem("volume", video.volume);
    };

    //Set volume and playbackrate as soon as video starts playing
    video.onplaying = function() {
        if (localStorage.getItem("volume") !== null){
            video.volume = localStorage.getItem("volume");
        }
        if (localStorage.getItem("playrate") !== null){
            video.playbackRate = localStorage.getItem("playrate");
        }
    };
}

function setSettings(video){
    if (localStorage.getItem("volume") !== null){
        video.volume = localStorage.getItem("volume");
    }
    if (localStorage.getItem("playrate") !== null){
        video.playbackRate = localStorage.getItem("playrate");
    }
}

(function() {
    'use strict';
    setInterval(function(){
        var video = document.getElementsByTagName("video")[0];
        if(typeof(video) != "undefined"){
            setEvents(video);
            setSettings(video);
        }
    }, 2500);
})();