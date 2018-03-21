// ==UserScript==
// @name         Animeheaven Enhanced
// @version      1.0
// @description  Autoplay, fullscreen and keyboard controls for "animeheaven.eu"
// @author       Bobocato
// @match        http://animeheaven.eu/watch.php*
// @grant        none
// ==/UserScript==

var videoElement;
var controlElement;
var bodyElements = [];

function remove(element) {
    return element.parentNode.removeChild(element);
}

function setControlOpacity0(){
    document.getElementsByClassName("con")[0].style.opacity = "0";
}

function setControlOpacity1(){
    document.getElementsByClassName("con")[0].style.opacity = "1";
}

function fullscreen(){
    //Domscripting for Fullscreen
    var playpause = video.paused;
    controlElement = remove(document.getElementsByClassName("con")[0]);
    videoElement = remove(video);
    let k =0;
    while (document.getElementsByTagName("BODY")[0].firstChild){
        bodyElements[k] =  remove(document.getElementsByTagName("BODY")[0].firstChild);
        k++;
    }
    document.getElementsByTagName("BODY")[0].appendChild(videoElement);
    document.getElementsByTagName("BODY")[0].appendChild(controlElement);
    if(!playpause) video.play();
    //CSS
    video.style.position = "fixed";
    video.style.top = "0";
    video.style.left = "0";
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.maxHeight = "5000px";
    video.controls = true;
    controls = controlElement;
    //controls = document.getElementsByClassName("con")[0];
    controls.style.position = "absolute";
    controls.style.bottom = "15px";
    let left = (window.innerWidth - controls.clientWidth) /2;
    controls.style.left = left + "px";
    controls.style.width = "66%";
    controls.style.zIndex = "1000";
    controls.style.opacity = "0";
    controls.addEventListener("mouseenter", setControlOpacity1, false);
    controls.addEventListener("mouseleave", setControlOpacity0, false);
    var conchi = controls.children;
    for(var i = 0; i < conchi.length; i++){
        conchi[i].addEventListener("mouseenter", setControlOpacity1, false);
        conchi[i].addEventListener("mouseleave", setControlOpacity0, false);
    }

}


function normalscreen(){
    //Domscripting for reset
    var playpause = video.paused;
    controlElement = remove(document.getElementsByClassName("con")[0]);
    videoElement = remove(video);
    for(let i = 0; i < bodyElements.length; i++){
        document.getElementsByTagName("BODY")[0].appendChild(bodyElements[i]);
    }
    document.getElementById("videocon").insertBefore(videoElement, document.getElementById("controls"));
    document.getElementById("controls").children[0].children[0].appendChild(controlElement);
    if(!playpause) video.play();
    //CSS
    video.style.position = "";
    video.style.top = "";
    video.style.left = "";
    video.style.width = "";
    video.style.height = "";
    video.style.maxHeight = "";
    video.controls = false;
    controls = controlElement;
    controls.style.position = "";
    controls.style.bottom = "";
    controls.style.left= "";
    controls.style.width = "";
    controls.style.zIndex = "";
    controls.style.opacity = "100";
    controls.removeEventListener("mouseenter",setControlOpacity1, false);
    controls.removeEventListener("mouseleave", setControlOpacity0, false);
    var conchi = controls.children;
    for(var i = 0; i < conchi.length; i++){
        conchi[i].removeEventListener("mouseenter", setControlOpacity1, false);
        conchi[i].removeEventListener("mouseleave", setControlOpacity0, false);
    }

}

function epsiodeSkip(kind){
    var currentUrl = window.location.href;
    var epsiodeIndex = currentUrl.search("&e=");
    var node = currentUrl.substr(epsiodeIndex + 3, currentUrl.length);
    node = node.split("&");
    var episodeNr = node[0];
    //Check for more Episodes
    var nextExists = false;
    if(document.getElementsByClassName("next2").length > 0){
        nextExists = true;
    } else {
        nextExists = false;
    }
    //Check for previous Episodes
    var prevExists = false;
    if(document.getElementsByClassName("prew2").length > 0){
        prevExists = true;
    } else {
        prevExists = false;
    }
    if(kind == "next"){
        episodeNr ++;
    } else if(kind == "prev"){
        episodeNr --;
    }
    var newUrl = currentUrl.substr(0, epsiodeIndex) + "&e=" + episodeNr + currentUrl.substr(epsiodeIndex + 3 + node[0].toString().length);
    if (kind == "prev" && prevExists === true){
        window.location.href = newUrl;
    }
    if(kind == "next" && nextExists === true){
        window.location.href = newUrl;
    } else if (kind == "next" && nextExists === false) {
        normalscreen();
    }
}

var autoplayEnd = true;
(function() {
    'use strict';
    console.log("Jump to script");
    var video = document.getElementById("videodiv");
    autoplayEnd = true;
    //UI
    var resoBox = document.getElementsByClassName("cleft")[3];
    var controls = document.createElement("div");
    controls.innerHTML = '<br> <input style="width:15px;" type="radio" id="radioEnd" name="kind" value="end" checked><label for="radioend" style="color:white">Skip at the End </label><br><input style="width:15px" type="radio" id="radioTime" name="kind" value="timer"><label for="radioTime" style="color:white;">Skip beforehand with Timer</label><input style="width:67px" type="number" id="tts" name="tts" min="1" placeholder="Seconds"><br><input style="width:15px;" type="radio" id="fullscreenCheck" name="fullscreen" value="full"><label for="fullscreen" style="color:white">Set Fullscreen automatically</label><br><input style="width:30px" type="button" id="setBtn" value="set">';
    if(localStorage.getItem("autoplay") == "end"){
        if(localStorage.getItem("fullscreen") === "true"){
            controls.innerHTML = '<br> <input style="width:15px;" type="radio" id="radioEnd" name="kind" value="end" checked><label for="radioend" style="color:white">Skip at the End </label><br><input style="width:15px" type="radio" id="radioTime" name="kind" value="timer"><label for="radioTime" style="color:white;">Skip beforehand with Timer</label><input style="width:67px" type="number" id="tts" name="tts" min="1" placeholder="Seconds"><br><input style="width:15px;" type="radio" id="fullscreenCheck" name="fullscreen" value="full" checked><label for="fullscreen" style="color:white">Set Fullscreen automatically</label><br><input style="width:30px" type="button" id="setBtn" value="set">';
        } else {
            controls.innerHTML = '<br> <input style="width:15px" type="radio" id="radioEnd" name="kind" value="end" checked><label for="radioend" style="color:white">Skip at the End </label><br><input style="width:15px" type="radio" id="radioTime" name="kind" value="timer"><label for="radioTime" style="color:white;">Skip beforehand with Timer</label><input style="width:67px" type="number" id="tts" name="tts" min="1" placeholder="Seconds"><br><input style="width:15px;" type="radio" id="fullscreenCheck" name="fullscreen" value="full"><label for="fullscreen" style="color:white">Set Fullscreen automatically</label><br><input style="width:30px" type="button" id="setBtn" value="set">';
        }
    } else if(localStorage.getItem("autoplay") == "time"){
        var tts = localStorage.getItem("tts");
        if(localStorage.getItem("fullscreen") === "true"){
            controls.innerHTML = '<br> <input style="width:15px" type="radio" id="radioEnd" name="kind" value="end"><label for="radioend" style="color:white">Skip at the End </label><br><input style="width:15px" type="radio" id="radioTime" name="kind" value="timer" checked><label for="radioTime" style="color:white;">Skip beforehand with Timer</label><input style="width:67px" type="number" value="'+ parseInt(tts) +'" id="tts" name="tts" min="1" placeholder="Seconds"><br><input style="width:15px;" type="radio" id="fullscreenCheck" name="fullscreen" value="full" checked><label for="fullscreen" style="color:white">Set Fullscreen automatically</label><br><input style="width:30px" type="button" id="setBtn" value="set">';
        } else {
            controls.innerHTML = '<br> <input style="width:15px" type="radio" id="radioEnd" name="kind" value="end"><label for="radioend" style="color:white">Skip at the End </label><br><input style="width:15px" type="radio" id="radioTime" name="kind" value="timer" checked><label for="radioTime" style="color:white;">Skip beforehand with Timer</label><input style="width:67px" type="number" value="'+ parseInt(tts) +'" id="tts" name="tts" min="1" placeholder="Seconds"><br><input style="width:15px;" type="radio" id="fullscreenCheck" name="fullscreen" value="full"><label for="fullscreen" style="color:white">Set Fullscreen automatically</label><br><input style="width:30px" type="button" id="setBtn" value="set">';
        }
    }
    resoBox.appendChild(controls);

    document.getElementById("setBtn").addEventListener("click", function(){
        var radioEnd = document.getElementById("radioEnd");
        var radioTime = document.getElementById("radioTime");
        var fullscreen = document.getElementById("fullscreenCheck");
        if(radioTime.checked){
            autoplayEnd = false;
            var tts = document.getElementById("tts").value;
            if(tts === ""){ tts=0;}
            localStorage.setItem("autoplay", "time");
            localStorage.setItem("tts", tts);
        } else if (radioEnd.checked){
            autoplayEnd = true;
            localStorage.setItem("autoplay", "end");
            localStorage.removeItem("tts");
        }
        if(fullscreen.checked){
            localStorage.setItem("fullscreen","true");
            location.reload();
        } else if(!fullscreen.checked){
            localStorage.removeItem("fullscreen");
        }
    });
    //General Changes
    if(localStorage.getItem("fullscreen") === "true"){
        fullscreen();
        video.play();
    }

    //Autoplay
    //At the End
    video.onended = function() {
        if(localStorage.getItem("autoplay") == "end"){
            epsiodeSkip("next");
        }
    };
    //With a timer
    video.ontimeupdate = function() {
        if(localStorage.getItem("autoplay") == "time"){
            var newTime = parseInt(video.currentTime) + parseInt(localStorage.getItem("tts"));
            if(newTime > video.duration){
                epsiodeSkip("next");
            }
        }
    };
    //Safe Playback Rate
    video.onratechange = function() {
        var speedup = video.playbackRate - localStorage.getItem("playrate");
        //if((Math.round(speedup *10)/10) == 0.1 ||(Math.round(speedup *10)/10) == -0.1 ){
        //console.log("Playbackrate saved");
        localStorage.setItem("playrate", video.playbackRate);
        //}
    };
    //Safe volume
    video.onvolumechange = function() {
        localStorage.setItem("volume", video.volume);
    };
    //Set volume and playbackrate as soon as video is loaded
    video.onplaying = function() {
        if (localStorage.getItem("volume") !== null){

            video.volume = localStorage.getItem("volume");

        }
        if (localStorage.getItem("playrate") !== null){

            video.playbackRate = localStorage.getItem("playrate");

        }
    };

    document.addEventListener("keydown", keyDownTextField, false);
    function keyDownTextField(e){
        var search = document.getElementsByClassName("searchinput")[0];
        if(document.activeElement !== search){
            switch(e.which) {
                case 86: // "v"
                    if (localStorage.getItem("fullscreen") === null){
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
                    epsiodeSkip("prev");
                    break;
                case 78: // "n"
                    epsiodeSkip("next");
                    break;
                case 38: // "Arrow Up"
                    try{
                        video.volume = (Math.round((video.volume + 0.05)*100))/100;
                    } catch (err){}
                    console.log("Volume: " + (video.volume * 100) +"%");
                    break;
                case 40: // "Arrow Down"
                    try{
                        video.volume = (Math.round((video.volume - 0.05)*100))/100;
                    } catch (err){}
                    console.log("Volume: " + (video.volume * 100) +"%");
                    break;
                case 37: // "Arrow Left"
                    video.currentTime = video.currentTime - 5;
                    console.log("Current Time: " +(video.currentTime /60));
                    break;
                case 39: // "Arrow Right"
                    video.currentTime = video.currentTime + 5;
                    console.log("Current Time: " +(Math.round(video.currentTime /60)));
                    break;
                case 77: // "m"
                    video.currentTime = video.currentTime + 85;
                    console.log("Current Time: " +(Math.round(video.currentTime /60)));
                    break;
                default: return; // exit this handler for other keys
            }
            e.preventDefault(); // prevent the default action
        } else if (e.which == 32) {
            search.value += " ";
            e.preventDefault();
        }
        return;
    }
})();