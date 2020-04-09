const calculator = document.getElementById("calc_container");
const taxbtn = document.querySelectorAll(".taxbtn");
const results = document. querySelectorAll(".result");
const municipTax = document.getElementById("municipTax");
const ontarioTax = document.getElementById("ontarioTax");
const municipTaxResult = document.getElementById("municipTaxResult");
const ontarioTaxResult = document.getElementById("ontarioTaxResult");
const noFirstTime = document.getElementById("noFirstTime");
const firstTime = document.getElementById("firstTime");
const yesShareBuy = document.getElementById("yesShareBuy");
const noShareBuy = document.getElementById("noShareBuy");
const yesCobFirst = document.getElementById("yesCobFirst");
const noCobFirst = document.getElementById("noCobFirst");
const calcError = document.getElementById('calcError');
const prov_rebate = document.getElementById('prov_rebate');
const mun_rebate = document.getElementById('mun_rebate');
const totalTax = document.getElementById('totalTax');
const calcScreen = document.getElementById("calcScreen");
const resultFront = document.getElementById("resultFront");
const nfObject = new Intl.NumberFormat('en-US');
const nrst = document.getElementById("nrst");
const nrstChecks = nrst.getElementsByTagName("INPUT");
const nrstResult = document.getElementById("nrstResult");
const firstTimeShareTbl = document.getElementById("firstTimeShareTbl");
const shareSlider = document.getElementById("shareSlider");
const output = document.getElementById("shareValueInt");
const integ = new RegExp(/^\d*\.?\d*$/);

/*----------  Events  ----------*/

// Click
document.addEventListener('click', function (event) {

    if (!event.target.matches('.taxbtn')) return;

    event.target.classList.add("buttonChecked");

    if (event.target.id == "municipTax") {
        ontarioTax.classList.remove("buttonChecked");
        municipTax.style["boxShadow"] = "unset";
        ontarioTax.style["boxShadow"] = "unset";
        calcError.innerHTML = '';
    } else if (event.target.id == "ontarioTax") {
        municipTax.classList.remove("buttonChecked");
        municipTax.style["boxShadow"] = "unset";
        ontarioTax.style["boxShadow"] = "unset";
        calcError.innerHTML = '';
    } else if (event.target.id == "noFirstTime") {
        firstTime.classList.remove("buttonChecked");
        firstTime.style["boxShadow"] = "unset";
        noFirstTime.style["boxShadow"] = "unset";
        calcError.innerHTML = '';
    } else if (event.target.id == "firstTime") {
        noFirstTime.classList.remove("buttonChecked");
        firstTime.style["boxShadow"] = "unset";
        noFirstTime.style["boxShadow"] = "unset";
        calcError.innerHTML = '';
    } else if (event.target.id == "noShareBuy") {
        yesShareBuy.classList.remove("buttonChecked");
        yesShareBuy.style["boxShadow"] = "unset";
        noShareBuy.style["boxShadow"] = "unset";
        firstTimeShareTbl.classList.add("hideElem");
        firstTimeShareTbl.classList.add("elemTrans");
        calcError.innerHTML = '';
        shareSlider.value = 0;
        output.innerHTML = shareSlider.value;
    } else if (event.target.id == "yesShareBuy") {
        noShareBuy.classList.remove("buttonChecked");
        yesShareBuy.style["boxShadow"] = "unset";
        noShareBuy.style["boxShadow"] = "unset";
        calcError.innerHTML = '';
        firstTimeShareTbl.classList.add("elemTrans");
        firstTimeShareTbl.clientWidth;
        firstTimeShareTbl.classList.remove("hideElem");
    } else if (event.target.id == "noCobFirst") {
        yesCobFirst.classList.remove("buttonChecked");
        yesCobFirst.style["boxShadow"] = "unset";
        noCobFirst.style["boxShadow"] = "unset";
    } else if (event.target.id == "yesCobFirst") {
        noCobFirst.classList.remove("buttonChecked");
        yesCobFirst.style["boxShadow"] = "unset";
        noCobFirst.style["boxShadow"] = "unset";
    } else if (event.target.id == "calculate") {
        calculate();
    } else if (event.target.id == "reset") {
        reset();
    }

}, false);


// Keydown
calculator.addEventListener("keydown", function (event) {

    if (integ.test(event.key)) {

        event.preventDefault();

        calcScreen.value += event.key;

        resultFront.value = "$" + nfObject.format(calcScreen.value);

    } else if (event.key == 'Escape') {

        event.preventDefault();

        clr();

    } else if (event.key == 'Enter') {

        event.preventDefault();

        calculate();

    } else if (event.key == 'Backspace') {

        event.preventDefault();

        backSpace();

    } else {

        event.preventDefault();
        calcScreen.value += "";

    }

});


// Paste
calculator.addEventListener('paste', (event) => {

    event.preventDefault();

    var paste = (event.clipboardData || window.clipboardData).getData('text');

    paste = paste.replace(/\D+/g, '');

    paste = dis(paste);

});

/*----------  FUNCTIONS  ----------*/

// Share range slider
output.innerHTML = shareSlider.value;

shareSlider.oninput = function () {
    output.innerHTML = this.value;
}
const firstTimeShare = Number(output.innerHTML) > 0 ? Number(output.innerHTML) : false;


// Check if Non-resident Speculation Tax applies
function nrstApplies() {

    let nrstChecked = 0;

    for (var i = 0; i < nrstChecks.length; i++) {
        if (nrstChecks[i].checked) {
            nrstChecked++;
        } else {

        }
    }

    if (nrstChecked === 3) {

        return true;

    } else {

        return false;

    }

}

// Nrst Checkboxes event
for (let i = 0; i < nrstChecks.length; i++) {
    nrstChecks[i].addEventListener('change', () => {
        if (nrstChecks[i].checked) {
            nrstApplies();
        }
    });
}

// Unchecks Nrst Checkboxes
function uncheck() {
    for (var i = 0; i < nrstChecks.length; i++) {
        if (nrstChecks[i].type == 'checkbox')
            nrstChecks[i].checked = false;
    }
}


// Displays value
function dis(val) {

    calcScreen.value += val;

    resultFront.value = "$" + nfObject.format(calcScreen.value);

}

// Clears the display
function clr() {
    calcScreen.value = "";
    resultFront.value = "";
}

// Backspace
function backSpace() {

    var number = calcScreen.value;

    var len = number.length - 1;

    var newNumber = number.substring(0, len);

    calcScreen.value = newNumber;

    resultFront.value = "$" + nfObject.format(calcScreen.value);

}

// Reset all
function reset() {

    taxbtn.forEach(el => {
        el.classList.remove("buttonChecked");
        el.style["boxShadow"] = "unset";
    });
    results.forEach(el => {
        el.innerHTML = "";
        el.value = "";
    });
    firstTimeShareTbl.classList.add("hideElem");
    shareSlider.value = 0;
    output.innerHTML = shareSlider.value;
    uncheck();

}

//function that evaluates the digit and returns result
function calculate() {

    // Check if Non-resident Speculation Tax applies
    nrstApplies();

    let homeValue = calcScreen.value;

    // Calculate the tax applied
    let lessthan55k = homeValue * 0.5 / 100;
    let lessthan250k = ((homeValue - (55000 * 0.5)) * 1) / 100;
    let lessthan400k = ((homeValue - 250000) * 1.5 / 100) + (((250000 - (55000 * 0.5)) * 1) / 100);
    let lessthan2m = ((homeValue - 400000) * 2 / 100) + ((400000 - 250000) * 1.5 / 100) + (((250000 - (55000 * 0.5)) *
        1) / 100);
    let morethan2m = ((homeValue - 2000000) * 2.5 / 100) + ((2000000 - 400000) * 2 / 100) + ((400000 - 250000) * 1.5 /
        100) + (((250000 - (55000 * 0.5)) * 1) / 100);

    // Make sure the necessary options have been clicked
    if (!municipTax.classList.contains("buttonChecked") && !ontarioTax.classList.contains("buttonChecked")) {

        calcError.innerHTML = '<td colspan="3"><span>Please select your location</span></td>';
        municipTax.style["boxShadow"] = "0px 0px 6px 5px #FF270E";
        ontarioTax.style["boxShadow"] = "0px 0px 6px 5px #FF270E";

        return;
    }

    if (!firstTime.classList.contains("buttonChecked") && !noFirstTime.classList.contains("buttonChecked")) {

        calcError.innerHTML = '<td colspan="3"><span>Are you a First Time Homebuyer?</span></td>';
        firstTime.style["boxShadow"] = "0px 0px 6px 5px #FF270E";
        noFirstTime.style["boxShadow"] = "0px 0px 6px 5px #FF270E";

        return;

    }

    if (!yesShareBuy.classList.contains("buttonChecked") && !noShareBuy.classList.contains("buttonChecked")) {

        calcError.innerHTML = '<td colspan="3"><span>Are you buying a home with someone?</span></td>';
        yesShareBuy.style["boxShadow"] = "0px 0px 6px 5px #FF270E";
        noShareBuy.style["boxShadow"] = "0px 0px 6px 5px #FF270E";

        return;

    }

    if (yesShareBuy.classList.contains("buttonChecked") && !yesCobFirst.classList.contains("buttonChecked") && !noCobFirst.classList.contains("buttonChecked")) {

        calcError.innerHTML = '<td colspan="3"><span>Is the co-Buyer a first-time buyer?</span></td>';
        yesCobFirst.style["boxShadow"] = "0px 0px 6px 5px #FF270E";
        noCobFirst.style["boxShadow"] = "0px 0px 6px 5px #FF270E";

        return;

    }

    // Ontario Rebates
    function ontarioRebate() {

        if (firstTime.classList.contains("buttonChecked") || yesCobFirst.classList.contains("buttonChecked")) {

            prov_rebate.innerHTML = rebateEligibAmount <= 4000 ? "-$" + nfObject.format(rebateEligibAmount) : "-$" + nfObject.format(4000);

        } else {

            prov_rebate.innerHTML = "n/a";

        }

    }

    // Toronto Rebates
    function municipalRebate() {

        if (firstTime.classList.contains("buttonChecked") || yesCobFirst.classList.contains("buttonChecked")) {

            prov_rebate.innerHTML = rebateEligibAmount <= 4000 ? "-$" + nfObject.format(rebateEligibAmount) : "-$" + nfObject.format(4000);
            mun_rebate.innerHTML = rebateEligibAmount <= 4475 ? "-$" + nfObject.format(rebateEligibAmount) : "-$" + nfObject.format(4475);

        } else {

            prov_rebate.innerHTML = "n/a";
            mun_rebate.innerHTML = "n/a";

        }

    }


    if (homeValue <= 55000) {

        homeValue = lessthan55k;

    } else if (homeValue >= 55000.01 && homeValue <= 250000) {

        homeValue = lessthan250k;

    } else if (homeValue > 250000 && homeValue <= 400000) {

        homeValue = lessthan400k;

    } else if (homeValue > 400000 && homeValue <= 2000000) {

        homeValue = lessthan2m;

    } else if (homeValue > 2000000) {

        homeValue = morethan2m;

    }

    // Get the share of the co-buyer (range-slider)
    let firstTimeShare = output.innerHTML ? Number(output.innerHTML) : false;

    if (firstTime.classList.contains("buttonChecked") && yesCobFirst.classList.contains("buttonChecked")) {

        var rebateEligibAmount = homeValue;

    } else if (firstTime.classList.contains("buttonChecked") && !yesCobFirst.classList.contains("buttonChecked")) {

        var rebateEligibAmount = firstTimeShare ? (homeValue * (100 - firstTimeShare)) / 100 : homeValue;

    } else if (!firstTime.classList.contains("buttonChecked") && yesCobFirst.classList.contains("buttonChecked")) {

        var rebateEligibAmount = firstTimeShare ? (homeValue * firstTimeShare) / 100 : homeValue;

    }

    if (nrstApplies()) {

        nrstResult.innerHTML = "$" + nfObject.format(calcScreen.value * .15);

        if (ontarioTax.classList.contains("buttonChecked")) {

            ontarioTaxResult.innerHTML = "$" + nfObject.format(homeValue);
            municipTaxResult.innerHTML = "n/a";
            mun_rebate.innerHTML = "n/a";

            ontarioRebate();

        } else if (municipTax.classList.contains("buttonChecked")) {

            ontarioTaxResult.innerHTML = "$" + nfObject.format(homeValue);
            municipTaxResult.innerHTML = "$" + nfObject.format(homeValue);

            municipalRebate();

        }


    } else { // NRST does not apply

        nrstResult.innerHTML = "n/a";

        if (ontarioTax.classList.contains("buttonChecked")) {

            ontarioTaxResult.innerHTML = "$" + nfObject.format(homeValue);
            municipTaxResult.innerHTML = "n/a";
            mun_rebate.innerHTML = "n/a";

            ontarioRebate();



        } else if (municipTax.classList.contains("buttonChecked")) {

            ontarioTaxResult.innerHTML = "$" + nfObject.format(homeValue);
            municipTaxResult.innerHTML = "$" + nfObject.format(homeValue);

            municipalRebate();

        }

    }

    let prov_rebate_integ = Number(prov_rebate.innerHTML.replace(/[^\d.-]/g, ''));
    let mun_rebate_integ = Number(mun_rebate.innerHTML.replace(/[^\d.-]/g, ''));
    let municipTaxResult_integ = Number(municipTaxResult.innerHTML.replace(/[^\d.-]/g, ''));
    let ontarioTaxResult_integ = Number(ontarioTaxResult.innerHTML.replace(/[^\d.-]/g, ''));
    let nrstResult_integ = Number(nrstResult.innerHTML.replace(/[^\d.-]/g, ''));

    let val = (municipTaxResult_integ + ontarioTaxResult_integ) + (prov_rebate_integ + mun_rebate_integ) + nrstResult_integ;

    totalTax.innerHTML = val > 0 ? "$" + nfObject.format(val) : "$" + nfObject.format(0);

}