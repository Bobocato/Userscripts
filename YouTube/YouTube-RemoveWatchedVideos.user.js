// ==UserScript==
// @name         YouTube - Remove Watched Videos
// @version      1.0
// @description  Watched videos will be removed from subfeed
// @author       Bobocato
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

function deleteParents(){
    console.log("Start");
    let watchedBadges = document.getElementsByClassName("ytd-thumbnail-overlay-playback-status-renderer");
    let parent = false;
    let currElement;
    //Get parent and remove them
    for (let i = 0; i < watchedBadges.length; i++){
        currElement = watchedBadges[i];
        while (!parent){
            if(currElement.nodeName == "YTD-GRID-VIDEO-RENDERER"){
                parent = true;
                currElement.remove();
                console.log("Removed");
            } else {
                currElement = currElement.parentElement;
            }
        }
        parent = false;
    }
    if(document.getElementsByClassName("ytd-thumbnail-overlay-playback-status-renderer").length > 0){
        deleteParents();
    }
}

(function() {
    'use strict';
    setInterval(function(){
        console.log("Remove Called");
        if(document.getElementsByClassName("ytd-thumbnail-overlay-playback-status-renderer").length > 0){
            deleteParents();
        }
    }, 1000);

})();