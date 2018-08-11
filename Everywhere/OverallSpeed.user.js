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

var speed = 1.5;

var blacklist = ["www.youtube.com",
                 "animeheaven.eu",
                 "www.twitch.tv",
                 "www.netflix.com",
                 "www.amazon.com",
                 "www.amazon.de",
                 "ww8.kiss-anime.me"];

function setVideoSpeed(doc){
    if(blacklist.indexOf(window.location.hostname) == -1){
        var iframes = doc.getElementsByTagName("iframe");
        if(iframes.length > 0){
            for (let iframe of iframes){
                setVideoSpeed(iframe);
            }
        }
        try{
            var videos = doc.getElementsByTagName("video");
            for (let video of videos) {
                video.playbackRate = speed;
            }
        } catch(err){
            console.log(err);
        }
    }
}

(function() {
    'use strict';
    window.setInterval(setVideoSpeed, 500, document);
})();