// ==UserScript==
// @name         Animeheaven Epsiode saver
// @version      1.0
// @description  Saves watched Episodes on Animeheaven and remembers the timing
// @author       Bobcat
// @match        http://animeheaven.eu*
// @match        http://animeheaven.eu/*
// @match        http://www.animeheaven.eu*
// @match        http://www.animeheaven.eu/*
// @grant        none
// ==/UserScript==

function getName(){
    var currentUrl = window.location.href;
    var begin = currentUrl.indexOf("?a=");
    var end = currentUrl.indexOf("&e=");
    var name;
    if(end === -1){
        name = currentUrl.substring((begin + 3), currentUrl.length);
    } else {
        name = currentUrl.substring((begin + 3), end);
    }
    console.log(name);
    return name;
}
function getEpisode(){
    var currentUrl = window.location.href;
    var epsiodeIndex = currentUrl.search("&e=");
    var node = currentUrl.substr(epsiodeIndex + 3, currentUrl.length);
    node = node.split("&");
    var episodeNr = node[0];
    console.log(episodeNr);
    return episodeNr;
}

function addEpisodeBox(){
    var sidebar = document.getElementsByClassName("side")[0];
    sidebar.insertBefore(document.createElement("DIV"),sidebar.childNodes[5]);
    var outerDiv = sidebar.childNodes[5];
    outerDiv.className = "watchingbox";
    outerDiv.append(document.createElement("DIV"));
    var innerDiv = outerDiv.childNodes[0];
    innerDiv.className = "lisbox2";
    innerDiv.append(document.createElement("DIV"));
    var headerDiv = innerDiv.childNodes[0];
    headerDiv.className = "c";
    headerDiv.append(document.createElement("DIV"));
    var heading = headerDiv.childNodes[0];
    heading.className = "lisb";
    heading.append("Currently Watching");
    var storedList = JSON.parse(localStorage.getItem("animeList"));
    // Sortierung nach Wert
    storedList.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        // a muss gleich b sein
        return 0;
    });
    for (let i = 0; i < storedList.length; i++){
        innerDiv.append(document.createElement("A"));
        var entry = innerDiv.childNodes[i+1];
        entry.className = "an";
        var name = storedList[i].name;
        var epi = storedList[i].episode;
        var url = "http://animeheaven.eu/i.php?a=" + name;
        entry.id = name;
        entry.href = url;
        entry.append(document.createElement("DIV"));
        var linkDiv = entry.childNodes[0];
        linkDiv.className = "lis";
        var showName = name.replace(/%20/g," ");
        linkDiv.append(showName);
        linkDiv.append(document.createElement("DIV"));
        var remove = linkDiv.childNodes[1];
        remove.id = name;
        remove.style.float = "right";
        remove.append("X");
        remove.addEventListener("click", function(event){
            event.preventDefault();
            console.log(event.target.id);
            let updateList = JSON.parse(localStorage.getItem("animeList"));
            for (let j = 0; j < updateList.length; j++){
                if (updateList[j].name == event.target.id){
                    updateList.splice(j, 1);
                    console.log(updateList);
                    localStorage.setItem("animeList", JSON.stringify(updateList));
                }
            }
            document.getElementById(event.target.id).remove();
        });
    }
}

(function() {
    'use strict';
    var currentUrl = window.location.href;
    console.log(currentUrl);
    if(currentUrl.substr(0,28) == "http://animeheaven.eu/i.php?"){
        console.log("Overview Page");
        addEpisodeBox();
        let overviewName = getName();
        let storedList = JSON.parse(localStorage.getItem("animeList"));
        //get Anime out of list
        let currAnime;
        for (let i = 0; i < storedList.length; i++){
            if (storedList[i].name == overviewName){
                currAnime = storedList[i];
                let episodeNr = currAnime.episode;
                let episodeBoxes = document.getElementsByClassName("infoept");
                console.log(episodeBoxes);
                for(let j= 0; j < episodeBoxes.length; j++){
                    var epi = episodeBoxes[j].children[1].textContent;
                    if(parseInt(episodeNr) >= parseInt(epi)){
                        episodeBoxes[j].style.backgroundColor = "red";
                        episodeBoxes[j].style.color = "white";
                    }
                    for(let k = 0; k < (episodeBoxes[j].children.length); k++){
                        episodeBoxes[j].children[k].style.color = "white";
                    }
                }
            }
        }

    }
    else if(currentUrl.substr(0,32) == "http://animeheaven.eu/watch.php?"){
        console.log("Episode Page");
        var episodeName = getName();
        var episodeNr = getEpisode();
        var video = document.getElementById("videodiv");
        var refTime = video.currentTime;
        var currTime;

        if(localStorage.getItem("animeList") === null){
            let emptyList = [];
            localStorage.setItem("animeList", JSON.stringify(emptyList));
        }
        let storedList = JSON.parse(localStorage.getItem("animeList"));
        let exists = false;
        for (let i = 0; i < storedList.length; i++){
            if(storedList[i].name == episodeName){
                exists = true;
                if(storedList[i].episode != episodeNr){
                    storedList[i].episode = episodeNr;
                } else {
                    try {
                        video.currentTime = storedList[i].timestamp;
                    } catch (e){
                        console.log("Es ist kein Timestamp gesetzt");
                    }
                }
                localStorage.setItem("animeList", JSON.stringify(storedList));
            }
        }
        if(!exists){
            let length = storedList.length;
            storedList[length] = {name:episodeName, episode:episodeNr};
            localStorage.setItem("animeList", JSON.stringify(storedList));
        }

        video.ontimeupdate = function() {
            currTime = video.currentTime;
            if (currTime - refTime > 10 || currTime - refTime < -10){
                refTime = currTime;
                for (let i = 0; i < storedList.length; i++){
                    if(storedList[i].name == episodeName){
                        storedList[i].timestamp = refTime;
                        localStorage.setItem("animeList", JSON.stringify(storedList));
                    }
                }
            }
        };
    } else if(currentUrl.substr(0, 32) != "http://animeheaven.eu/staff.php"){
        addEpisodeBox();
    }
})();