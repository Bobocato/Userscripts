// ==UserScript==
// @name         MyAnimeList(MAL) - 12h to 24h
// @version      1.0
// @description  Changes the 12h system to the superior one
// @author       Bobocato
// @match        https://myanimelist.net/*
// @grant        none
// ==/UserScript==

//Translates dates like: '01:02 PM' to good time.

function convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return hours + ':' + minutes;
}

function changeTimeElements(elements){
    for (var j = 0; j < elements.length; j++){
        var tempDate = elements[j].textContent.split(" ");
        var newDate = "";
        if(tempDate.indexOf("AM") != -1){
            for (var t = 0; t < tempDate.length; t++){
                if (t == (tempDate.indexOf("AM")-1)){
                    newDate += convertTime12to24(tempDate[tempDate.indexOf("AM")-1] + " " + tempDate[tempDate.indexOf("AM")]);
                    //newDate += " o'clock";
                    t++;
                } else if(t == (tempDate.indexOf("by") +1) && tempDate.indexOf("by") != -1){
                    newDate += '<a href="https://myanimelist.net/profile/' + tempDate[t] + '">' + tempDate[t] + '</a>';
                } else if (t == tempDate.indexOf("Edit") && tempDate.indexOf("Edit") != -1){
                    var begin = elements[j].innerHTML.search("<a ");
                    var end = elements[j].innerHTML.search("</a>") + 4;
                    newDate += elements[j].innerHTML.substr(begin, end);
                } else {
                    newDate += tempDate[t];
                }
                newDate += " ";
            }
            console.log("Newdate: " + newDate);
            elements[j].innerHTML = newDate;
        } else if(tempDate.indexOf("PM") != -1){
            for (var u = 0; u < tempDate.length; u++){
                if (u == (tempDate.indexOf("PM")-1)){
                    newDate += convertTime12to24(tempDate[tempDate.indexOf("PM")-1] + " " + tempDate[tempDate.indexOf("PM")]);
                    //newDate += " o'clock";
                    u++;
                } else if(u == (tempDate.indexOf("by") +1) && tempDate.indexOf("by") != -1){
                    newDate += '<a href="https://myanimelist.net/profile/' + tempDate[u] + '">' + tempDate[u] + '</a>';
                } else if (u == tempDate.indexOf("Edit") && tempDate.indexOf("Edit") != -1){
                    var begin = elements[j].innerHTML.search("<a ");
                    var end = elements[j].innerHTML.search("</a>") + 4;
                    newDate += elements[j].innerHTML.substr(begin, end);
                }else{
                    newDate += tempDate[u];
                }
                newDate += " ";
            }
            elements[j].innerHTML = newDate;
        }
    }
}


(function() {
    'use strict';
    var currentUrl = window.location.href;
    var dates;
    var elements;
    var asynCoun;
    //Homepage
    if(currentUrl == "https://myanimelist.net/"){
        console.log("Index Page");
        dates = document.getElementsByClassName("lightLink");
        elements = [];
        asynCoun = 0;
        for(var i = 0; i < dates.length; i++){
            if(dates[i].tagName === "P"){
                elements[asynCoun] = dates[i] ;
                asynCoun++;
            }
        }
        changeTimeElements(elements);
    }
    //Profile
    if(currentUrl.substr(0,32) == "https://myanimelist.net/profile/"){
        console.log("Profile Page");
        //List updates
        dates = document.getElementsByClassName("fn-grey2");
        elements = [];
        asynCoun = 0;
        for(var j = 0; j < dates.length; j++){
            if(dates[j].tagName === "SPAN"){
                elements[asynCoun] = dates[j] ;
                asynCoun++;
            }
        }
        //Lastonline
        var lastonline = document.getElementsByClassName("user-status-data");
        for (var t = 0; t < lastonline.length; t++){
            elements[asynCoun] = lastonline[t];
            asynCoun ++;
        }
        changeTimeElements(elements);
    }
    //History
    if(currentUrl.substr(0,32) == "https://myanimelist.net/history/"){
        console.log("History Page");
        dates = document.getElementsByClassName("borderClass");
        elements = [];
        asynCoun = 0;
        for(var k = 0; k < dates.length; k++){
            if(dates[k].tagName === "TD"){
                elements[asynCoun] = dates[k] ;
                asynCoun++;
            }
        }
        changeTimeElements(elements);
    }
    //Friendpage
    if(currentUrl.substr(0, 37) == "https://myanimelist.net/myfriends.php"){
        console.log("Friend Page");
        dates = document.getElementsByClassName("lightLink");
        console.log(dates);
        changeTimeElements(dates);
    }
})();