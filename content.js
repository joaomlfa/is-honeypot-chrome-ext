var isUrlDexscreener = window.location.href.split("/")[2] == 'dexscreener.com';
var isDextools = window.location.href.split("/")[2] == 'www.dextools.io';
var getTokenInUrl = getToken();
var urlTokenCheck = 'https://api.honeypot.is/v2/IsHoneypot?address=' + getTokenInUrl;
var method = 'GET';
var simulationSuccess;
var isHoneypot;
var sellTax;
var buyTax;
var isLoading = true;
var isFirstLoad = true;
var mainDiv = document.createElement("divDaril");
mainDiv.setAttribute("id", "divDaril");
checkTokenAsync();

function checkTokenAsync() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            var responseJson = JSON.parse(xhr.responseText);
            simulationSuccess = responseJson.simulationSuccess;
            isHoneypot = responseJson.honeypotResult.isHoneypot;
            sellTax = 'Sell Tax: ' + toFixed(responseJson.simulationResult.sellTax, 4);
            buyTax = 'Buy Tax: ' + toFixed(responseJson.simulationResult.buyTax, 4);
            isGood = (simulationSuccess == true && isHoneypot == false);
            isLoading = false;
            appendCheck(isGood, buyTax, sellTax);
        }
    }
    xhr.open(method, urlTokenCheck, true);
    xhr.send();
}

function appendCheck(isGood, buyTax, sellTax) {
    if (!isFirstLoad) {
        cleanMainDiv();
    }
    var divSite = getDivBase();
    var img = document.createElement("img");
    var spanBuyTax = document.createElement("span");
    var spanSellTax = document.createElement("span");

    img.src = isGood ? "https://i.ibb.co/JQWJs8p/checkmark-flat.png" : "i.ibb.co/4JdJXSD/uncheck.png";
    img.width = 20;
    img.height = 20;
    img.style.marginRight = "10px";



    spanBuyTax.innerHTML = buyTax;
    spanSellTax.innerHTML = sellTax;

    spanSellTax.style.marginLeft = "10px";

    if (isDextools) {
        img.style.marginLeft = "10px";
        spanBuyTax.style.marginRight = "10px";
        spanSellTax.style.marginRight = "10px";
    }

    if (isUrlDexscreener) {
        spanBuyTax.style.fontSize = "12px";
        spanSellTax.style.fontSize = "12px";
    }


    mainDiv.appendChild(img);
    mainDiv.appendChild(getLoadIcon());
    mainDiv.appendChild(getLoadingAnimated());
    mainDiv.appendChild(spanBuyTax);
    mainDiv.appendChild(spanSellTax);
    divSite.appendChild(mainDiv);
    isFirstLoad = false;

}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function getToken() {
    return isDextools ? window.location.href.split("/")[7] : window.location.href.split("/")[4];
}

function getDivBase() {
    if (isDextools) {
        return document.getElementsByClassName("social ng-tns-c328536588-2")[0];
    } else if (isUrlDexscreener) {
        return document.getElementsByClassName("chakra-heading custom-to0qxc")[0];
    } else {
        return document.getElementById("ContentPlaceHolder1_copyButtonPanel");
    }
}

function getLoadIcon() {
    var img = document.createElement("img");
    img.setAttribute("id", "refreshDaril");
    img.src = "https://i.ibb.co/TBKvF5S/refresh.png";
    img.width = 20;
    img.height = 20;
    img.style.marginRight = "10px";
    img.style.cursor = "pointer";
    img.style.display = isLoading ? "none" : "block";
    img.addEventListener("click", function () {
        isLoading = true;
        var divLoad = document.getElementById("loadAnimatedDaril");
        divLoad.style.display = "block";
        var loadIcon = document.getElementById("refreshDaril");
        loadIcon.style.display = "none";
        setTimeout(function () {
            checkTokenAsync();
        }, 1000);
    });
    return img;
}

function getLoadingAnimated() {
    var divLoad = document.createElement("div");
    divLoad.setAttribute("id", "loadAnimatedDaril");
    divLoad.style.display = isLoading ? "block" : "none";
    return divLoad;
}

function cleanMainDiv() {
    var div = document.getElementById("divDaril");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}