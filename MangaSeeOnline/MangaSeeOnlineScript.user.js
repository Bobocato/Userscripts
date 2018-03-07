// ==UserScript==
// @name         MangaSeeOnline Script
// @version      1.2
// @description  Shows Manga Pages in Fullscreen
// @author       Bobocato
// @match        http://mangaseeonline.us/read-online/*
// ==/UserScript==

function resizeImage(){
    var image = $(".image-container-manga").children();
    var broHeight = $(window).height();
    var broWidth = $(window).width();
    console.log("Browser Height: " + broHeight);
    console.log("Real Image Height: " + image[0].naturalHeight);
    console.log("Browser Width: " + broWidth);
    console.log("Real Image Width: " + image[0].naturalWidth);
    image.removeAttr("width");
    image.removeAttr("height");
    if(image[0].naturalWidth >= broWidth && image[0].naturalHeight >= broHeight){
        console.log("Change Both");
        var seitenverhaeltnis = image[0].naturalWidth / image[0].naturalHeight;
        var maxHeight = broWidth / seitenverhaeltnis;
        var maxWidth = seitenverhaeltnis * maxHeight;
        if(maxHeight > broHeight){
            var navHeight = ($(".containerNav").height() + 15);
            maxHeight = broHeight - navHeight;
            maxWidth = seitenverhaeltnis * maxHeight;
        }

        console.log("Seitenverhältnis: " + seitenverhaeltnis);
        console.log("Calculated Width: " + maxWidth);
        console.log("Calculated Height: " + maxHeight);
        image[0].width = maxWidth;
        image[0].height = maxHeight;
    } else if(image[0].naturalWidth >= broWidth){
        console.log("Set Width");
        image[0].width = broWidth;
    } else if (image[0].naturalHeight >= broHeight){
        console.log("Set Height");
        var navHeight = ($(".containerNav").height() + 15);
        broHeight -= navHeight;
        image[0].height = broHeight;
    }
    console.log("-----------------------------------------");
}

(function() {
    'use strict';
    //Remove Header and other stuff
    $(".pageDescription").css("display", "none");
    console.log("Removed Descr");
    $(".navbar").css("display", "none");
    console.log("Removed Navbar");
    $(".mainWrapper").css("margin-top", 0);
    //Remove Navbar on top
    var navbars = $(".containerNav");
    navbars.attr("id",  "navbarTop");
    $("#navbarTop").css("display", "none");
    //Set/Fix other Navbar to Bottom of the Page
    $('<style>.containerNav {  width: 100%; bottom: 5px; }</style>').appendTo('body');

    // store url on load
    var imageSize = $(".image-container-manga").children();
    var currentWidth = imageSize[0].width;
    var currentHeight = imageSize[0].height;
    var currentPage = window.location.href;

// listen for changes
    setInterval(function()
    {
        imageSize = $(".image-container-manga").children();
        if (currentWidth !== imageSize[0].naturalWidth || currentHeight !== imageSize[0].naturalHeight)
        {
            currentWidth = imageSize[0].naturalWidth;
            currentHeight = imageSize[0].naturalHeight;
            resizeImage();
        }
    }, 250);
    //Resize at Startup
    resizeImage();
})();