// ==UserScript==
// @name         Overall Speed
// @namespace    https://github.com/Bobocato/Userscripts/blob/master/Everywhere/OverallSpeed.user.js
// @version      0.1
// @description  Sets the playbackSpeed of all (also embedded) videos to a fixed speed.
// @author       Bobocato
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

var speed = 1.75;

var blacklist = ["www.youtube.com",
                 "www.animeheaven.com",
                 "www.twitch.tv"];

function setVideoSpeed(doc){
    if(blacklist.indexOf(window.location.hostname) == -1){
        var iframes = doc.getElementsByTagName("iframe");
        if(iframes.length > 0){
            for (let iframe of iframes){
                setVideoSpeed(iframe);
            }
        }
        var videos = doc.getElementsByTagName("video");
        for (let video of videos) {
            video.playbackRate = speed;
        }
    }
}

(function() {
    'use strict';
    window.setInterval(setVideoSpeed, 500, document);
})();