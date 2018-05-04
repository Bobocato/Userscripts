// ==UserScript==
// @name         AnimeHeaven - Search Episodebox Divert
// @namespace    https://github.com/Bobocato
// @version      1.0
// @description  When searching the Episodebox will send you to the episode overview
// @author       Bobocato
// @match        http://animeheaven.eu/search.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var episodeBoxes = document.getElementsByClassName("iepsbox");
    for (let i = 0; i < episodeBoxes.length; i++){
        let anchor = episodeBoxes[i].children[0];
        anchor.href = anchor.href.split("&")[0].replace("watch.php", "i.php");
    }
})();