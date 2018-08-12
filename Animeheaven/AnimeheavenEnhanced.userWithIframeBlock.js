// ==UserScript==
// @name         Animeheaven Enhanced
// @version      2.0
// @description  Autoplay, fullscreen and keyboard controls for "animeheaven.eu"
// @author       Bobocato
// @match        http://animeheaven.eu/watch.php*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DISPLAY_TITLE_DURATION = 4;
    const FADE_TITLE_DURATION = 1;

    function changeEpisode(url) {
        if (typeof (url) != "undefined") {
            window.location.href = url;
        } else {
            normalscreen();
        }
    }

    function setControlOpacity1() {
        document.getElementById("controls").style.opacity = "1";
    }

    function setControlOpacity0() {
        document.getElementById("controls").style.opacity = "0";
    }

    function fullscreen() {
        //Set fullscreen to style
        //Video Style
        var videoDiv = document.getElementById("videocon");
        videoDiv.style.position = "fixed";
        videoDiv.style.top = "0";
        videoDiv.style.left = "0";
        videoDiv.style.width = "100%";
        videoDiv.style.height = "100%";
        videoDiv.style.maxHeight = "5000px";
        //Control Style
        var controlDiv = document.getElementById("controls");
        controlDiv.style.position = "absolute";
        controlDiv.style.bottom = "15px";
        let left = (window.innerWidth - controls.clientWidth) / 2;
        controlDiv.style.left = left + "px";
        controlDiv.addEventListener("mouseenter", setControlOpacity1, false);
        controlDiv.addEventListener("mouseleave", setControlOpacity0, false);
        setControlOpacity0();
    }

    function normalscreen() {
        //Reset CSS
        //Video Style
        var videoDiv = document.getElementById("videocon");
        videoDiv.style.position = "";
        videoDiv.style.top = "";
        videoDiv.style.left = "";
        videoDiv.style.width = "";
        videoDiv.style.height = "";
        videoDiv.style.maxHeight = "";
        //Control Style
        var controlDiv = document.getElementById("controls");
        controlDiv.style.position = "";
        controlDiv.style.bottom = "";
        let left = (window.innerWidth - controls.clientWidth) / 2;
        controlDiv.style.left = "";
        controlDiv.style.opacity = "";
        controlDiv.removeEventListener("mouseenter", setControlOpacity1, false);
        controlDiv.removeEventListener("mouseleave", setControlOpacity0, false);
    }

    function getName() {
        let episodeName = document.getElementsByClassName("c")[0].textContent.split("\n")[0];
        return episodeName;
    }

    function showSpeed(durationInSeconds, fadeDuration, speed){
        const containerDiv = document.createElement("div");
        let opacity = 0;
        containerDiv.setAttribute("id", "speedDiv");
        containerDiv.style.maxWidth = "32%";
        containerDiv.style.paddingRight = "2em";
        containerDiv.style.paddingLeft = "2em";
        containerDiv.style.position = "fixed";
        containerDiv.style.border = "1px solid #696969";
        containerDiv.style.zIndex = "99999";
        containerDiv.style.fontFamily = "sans-serif";
        containerDiv.style.fontSize = "2.1em";
        containerDiv.style.textAlign = "center";
        containerDiv.style.top = "2%";
        containerDiv.style.right = "2%";
        containerDiv.style.borderLeft = "0.5em solid #ffffff";
        containerDiv.style.background = "linear-gradient(0deg,#333333, #505050)";
        containerDiv.style.opacity = opacity.toString();
        const episodeLabel = document.createElement("p");
        episodeLabel.style.color = "white";
        const textNode = document.createTextNode(speed);
        episodeLabel.appendChild(textNode);
        containerDiv.appendChild(episodeLabel);
        document.body.insertBefore(containerDiv, document.body.childNodes[0]);

        // animate
        let accumulatedTicks = 0;
        const tickrate = 5;
        const maxTickCount = Math.round(fadeDuration * 1000 / tickrate);

        let fadeInTimer = setInterval(() => {
            accumulatedTicks += tickrate;
            if (accumulatedTicks >= fadeDuration * 1000) {
                accumulatedTicks = 0;
                clearInterval(fadeInTimer);
                setTimeout(() => {
                    let fadeOutTimer = setInterval(() => {
                        accumulatedTicks += tickrate;
                        if (accumulatedTicks >= fadeDuration * 1000) {
                            accumulatedTicks = 0;
                            clearInterval(fadeOutTimer);
                            containerDiv.style.display = "none";
                        }
                        opacity -= 1 / maxTickCount;
                        containerDiv.style.opacity = opacity.toString();
                    }, tickrate);
                }, durationInSeconds * 1000);
            }
            opacity += 1 / maxTickCount;
            containerDiv.style.opacity = opacity.toString();
        }, tickrate);
    }

    function clearSpeedPopup(){
        let speedDiv = document.getElementById("speedDiv");
        speedDiv.parentNode.removeChild(speedDiv);
    }

    function showEpisodeTitle(durationInSeconds, fadeDuration) {
        // retrieve episode name
        const name = getName();
        // display episode name
        let opacity = 0;
        const containerDiv = document.createElement("div");
        containerDiv.style.maxWidth = "32%";
        containerDiv.style.paddingRight = "2em";
        containerDiv.style.paddingLeft = "2em";
        containerDiv.style.position = "fixed";
        containerDiv.style.border = "1px solid #696969";
        containerDiv.style.zIndex = "99999";
        containerDiv.style.fontFamily = "sans-serif";
        containerDiv.style.fontSize = "2.1em";
        containerDiv.style.textAlign = "center";
        containerDiv.style.top = "2%";
        containerDiv.style.left = "2%";
        containerDiv.style.borderLeft = "0.5em solid #e81e30";
        containerDiv.style.background = "linear-gradient(0deg,#333333, #505050)";
        containerDiv.style.opacity = opacity.toString();
        const episodeLabel = document.createElement("p");
        episodeLabel.style.color = "white";
        const textNode = document.createTextNode(name);
        episodeLabel.appendChild(textNode);
        containerDiv.appendChild(episodeLabel);
        document.body.insertBefore(containerDiv, document.body.childNodes[0]);

        // animate
        let accumulatedTicks = 0;
        const tickrate = 5;
        const maxTickCount = Math.round(fadeDuration * 1000 / tickrate);

        let fadeInTimer = setInterval(() => {
            accumulatedTicks += tickrate;
            if (accumulatedTicks >= fadeDuration * 1000) {
                accumulatedTicks = 0;
                clearInterval(fadeInTimer);
                setTimeout(() => {
                    let fadeOutTimer = setInterval(() => {
                        accumulatedTicks += tickrate;
                        if (accumulatedTicks >= fadeDuration * 1000) {
                            accumulatedTicks = 0;
                            clearInterval(fadeOutTimer);
                            containerDiv.style.display = "none";
                        }
                        opacity -= 1 / maxTickCount;
                        containerDiv.style.opacity = opacity.toString();
                    }, tickrate);
                }, durationInSeconds * 1000);
            }
            opacity += 1 / maxTickCount;
            containerDiv.style.opacity = opacity.toString();
        }, tickrate);
    }

    function iframeCleaner(){
        let iframes = document.getElementsByTagName("iframe");
        console.log(iframes);
        for (let iframe of iframes){
            if(iframe.src.includes("chatango") || iframe.src.includes("facebook") || iframe.src.includes("google") || iframe.src.includes("twitter")|| iframe.title.includes("Twitter")){
                iframe.parentNode.removeChild(iframe);
                cleaned++;
                console.log("Cleaned: " + cleaned);
                if(iframes.length == 0 || cleaned >= 10){
                    clearInterval(iframeInterval);
                }
            }
        }
    }

    console.log("Jump to Script");
    //Remove Chatango and Comments
    var cleaned = 0;
    var iframeInterval = window.setInterval(iframeCleaner, 1000);

    //Get the needed variables...
    var video = document.getElementById("videodiv");
    var nextLink, prevLink;
    var links = document.getElementsByTagName("A");
    for (let i = 0; i < links.length; i++) {
        if (links[i].rel == "next") {
            nextLink = links[i].href;
        } else if (links[i].rel == "prev") {
            prevLink = links[i].href;
        }
    }

    //Was fullscreen used before?
    if (localStorage.getItem("fullscreen") === "true") {
        fullscreen();
    }

    //Display episode title
    if (localStorage.getItem("fullscreen")) {
        showEpisodeTitle(DISPLAY_TITLE_DURATION, FADE_TITLE_DURATION);
    }

    //Video events
    //At the End
    video.onended = function () {
        changeEpisode(nextLink);
    };
    //Safe volume
    video.onvolumechange = function () {
        localStorage.setItem("volume", video.volume);
    };
    //Set volume and playbackrate as soon as video starts playing and display episode title
    video.onplaying = function () {
        if (localStorage.getItem("volume") !== null) {
            video.volume = localStorage.getItem("volume");
        }
        if (localStorage.getItem("playrate") !== null) {
            video.playbackRate = localStorage.getItem("playrate");
        }
        //Safe Playback Rate
        video.onratechange = function () {
            localStorage.setItem("playrate", video.playbackRate);
        };
    };
    document.addEventListener("keydown", keyDownTextField, false);

    function keyDownTextField(e) {
        var search = document.getElementsByClassName("searchinput")[0];
        if (document.activeElement !== search) {
            switch (e.which) {
                case 86: // "v"
                    if (localStorage.getItem("fullscreen") === null) {
                        localStorage.setItem("fullscreen", true);
                        fullscreen();
                        console.log("Fullscreen enabled");
                    } else {
                        localStorage.removeItem("fullscreen");
                        normalscreen();
                        console.log("Fullscreen disabled");
                    }
                    break;
                case 66: // "b"
                    changeEpisode(prevLink);
                    break;
                case 78: // "n"
                    changeEpisode(nextLink);
                    break;
                case 83: // "s"
                    video.playbackRate = video.playbackRate = (Math.round((video.playbackRate - 0.1)*100)/100);
                    console.log("Set video speed to: " + video.playbackRate);
                    try{
                        clearSpeedPopup();
                    } catch (e){}
                    showSpeed(2,1,video.playbackRate);
                    break;
                case 68: // "d"
                    video.playbackRate = video.playbackRate = (Math.round((video.playbackRate + 0.1)*100)/100);
                    console.log("Set video speed to: " + video.playbackRate);
                    try{
                        clearSpeedPopup();
                    } catch (e){}
                    showSpeed(2,1,video.playbackRate);
                    break;
                case 38: // "Arrow Up"
                    try {
                        video.volume = (Math.round((video.volume + 0.05) * 100)) / 100;
                    } catch (err) {}
                    console.log("Volume: " + (video.volume * 100) + "%");
                    break;
                case 40: // "Arrow Down"
                    try {
                        video.volume = (Math.round((video.volume - 0.05) * 100)) / 100;
                    } catch (err) {}
                    console.log("Volume: " + (video.volume * 100) + "%");
                    break;
                case 37: // "Arrow Left"
                    video.currentTime = video.currentTime - 5;
                    console.log("Current Time: " + (video.currentTime / 60));
                    break;
                case 39: // "Arrow Right"
                    video.currentTime = video.currentTime + 5;
                    console.log("Current Time: " + (Math.round(video.currentTime / 60)));
                    break;
                case 77: // "m"
                    video.currentTime = video.currentTime + 85;
                    console.log("Current Time: " + (Math.round(video.currentTime / 60)));
                    break;
                default:
                    return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action
        } else if (e.which == 32) {
            search.value += " ";
            e.preventDefault();
        }
        return;
    }

})();