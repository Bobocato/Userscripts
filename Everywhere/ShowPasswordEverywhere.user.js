// ==UserScript==
// @name         Show password everywhere
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a small button to show/hide the password
// @author       Bobocato
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i< inputs.length;i++){
        //Check if its a password
        if(inputs[i].type == "password"){
            //Check if its visible
            if(!isHidden(inputs[i])){
                //Check if there is a id
                if(inputs[i].id != "")
                    createBtn(inputs[i]);
            }
        }
    }
    function createBtn(element){
        var toggleBtn = document.createElement("input");
        var elementBounding = element.getBoundingClientRect();
        var elementWidth = elementBounding.right - elementBounding.left;
        console.log(element);
        toggleBtn.addEventListener("click", togglePassword);
        toggleBtn.type = "button";
        toggleBtn.value = "change";
        toggleBtn.name = element.id;
        element.parentElement.appendChild(toggleBtn);
        toggleBtn.style.height = element.getBoundingClientRect().height + "px";
        toggleBtn.style.position = "fixed";
        toggleBtn.style.left = (elementBounding.left + elementWidth - toggleBtn.offsetWidth) + "px";
        toggleBtn.style.top = (elementBounding.top) + "px";
        console.log(element.getBoundingClientRect());

        console.log(toggleBtn);
    }

    function togglePassword(event){
        var inputPassword = document.getElementById(event.target.name);
        inputPassword.type = (inputPassword.type == "password") ? "text": "password";
    }
    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return (style.display === 'none');
    }
})();