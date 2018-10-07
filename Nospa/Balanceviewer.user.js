// ==UserScript==
// @name         Balanceviewer (Nospa)
// @namespace    https://github.com/Bobocato/Userscripts/
// @version      0.1
// @description  Show the balance of the account for each transfer that was done
// @author       Bobocato
// @match        https://www.nospa.de/de/home/onlinebanking/umsaetze/umsaetze.html*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //Get the table with the current transfers and the current account balance
    var transferTable = document.getElementsByClassName("table_umsatzabfrage")[0];
    let te = transferTable.children[0].children[0].children[2].children[0].textContent;
    let mp = te.substring(0, (te.indexOf("EUR") - 1))
    var currentBalance = Number(mp.replace(",", "."));
    console.log(transferTable);
    console.log(currentBalance);

    for (var i = 1; i < transferTable.children[0].children.length; i++){
        let row = transferTable.children[0].children[i];
        //Check for top row
        if(row.className.includes("tablerowodd") || row.className.includes("tableroweven")){
            let rowAmount = getAmount(row);
            let newTd = createTD(rowAmount);
            row.insertBefore(newTd, row.children[4]);
        } else if(!row.className.includes("tableheader") && !row.className.includes("tablefooter")) {
            let th = document.createElement("th");
            th.className = "right nowrap";
            th.textContent = "Saldo";
            row.insertBefore(th, row.children[4]);
        }

    }

    function getAmount(row){
        let tdAmount = {};
        for (var j = 0; j < row.children.length; j++){
            if(row.children[j].className == "right"){
                if(row.children[j].children[0].tagName == "SPAN"){
                    tdAmount.raw = row.children[j].children[0].textContent;
                    var pemt;
                    if(row.children[j].children[0].textContent[0] == "-"){
                        tdAmount.sign = "-";
                        pemt = row.children[j].children[0].textContent.substring(1,(row.children[j].children[0].textContent.indexOf("EUR") -1));
                    } else {
                        tdAmount.sign = "+";
                        pemt = row.children[j].children[0].textContent.substring(0,(row.children[j].children[0].textContent.indexOf("EUR") -1));
                    }
                    let ted = pemt.replace(".","")
                    tdAmount.amount = Number(ted.replace(",","."));
                    console.log(tdAmount);
                    return tdAmount;
                }
            }
        }
    }

    function createTD(value){
        let td = document.createElement("TD");

        if (value.sign == "-"){

            currentBalance += value.amount;
            td.textContent = toEuro(currentBalance);
        } else {
            currentBalance -= value.amount;
            td.textContent = toEuro(currentBalance);
        }
        if (currentBalance >= 0){
            td.className = ("plus");
            td.style.color = "#00724b";
        } else {
            td.className = ("minus");
        }

        return td;
    }

    function toEuro(num){
        let str = num.toFixed(2);
        str.replace(".",",");
        str += " EUR";
        return str;
    }

})();







