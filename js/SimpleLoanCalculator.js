/*===================== SimpleLoanCalculator.js =======================*\
    簡易版月付金試算，不與DOM連動，不含優惠方案。
    To run the code correctly, the following js libraries are required:
        1. jQuery 2.x
	---
	Version: 1.0.0
	---
	^TOC
	1. LC (Namespace)
		- functions: setAttrs, isNull, calFloat, getBasedValue
	2. function
\*=======================================================*/

/*==================================================================
    1. ^LC: (namespace) namespace & common functions
==================================================================*/
var LC = {
	/* ------------------------------------------------------------------------------------------------
		^setAttrs: (function) Set attributes for an Object.
		---
		thisObj*: [Object] object to be set the attributes
		attrs*: [Object] name-value paired object to be set
		exclude: [Array] array of attributes to be excluded
	-------------------------------------------------------------------------------------------------*/
	setAttrs: function (thisObj, attrs, exclude) {
		/* check attrs validity */
		if (!attrs) { return; }
		if (typeof (attrs) != "object") { return console.log("Argument 'attrs' is not an object."); }

		/* check exclude validity */
		exclude = exclude ? exclude : [];
		if (!Array.isArray(exclude)) { return console.log("Argument 'exclude' is not an object."); }

		/* set attributes */
		for (var name in attrs) {
			var match = false;
			for (var i = 0; i < exclude.length; i++) {
				if (name == exclude[i]) {
					match = true;
					break;
				}
			}
			if (match) { continue; }
			thisObj[name] = attrs[name];
		}
	},
	/* ------------------------------------------------------------------------------------------------
		^isNull: (function) test if a variable is null
		---
		value*: [*] value to be tested
		---
		return: [Boolean] is null or not
	-------------------------------------------------------------------------------------------------*/
	isNull: function (value) { return value != 0 && !value; },
	/* ------------------------------------------------------------------------------------------------
		^calFloat: (function) calculate float numbers
		---
		a*: [Number] first number
		b*: [Number] 2nd number
		oprand*: [String] oprand to be executed ("+" | "-" | "*" | "/")
		---
		return [Number] calculated result
	-------------------------------------------------------------------------------------------------*/
	calFloat: function (a, b, oprand) {
		var aPrecision, bPrecision, maxPrecision, shifter;
		/* convert number to string */
		var aString = a.toString();
		var bString = b.toString();
		/* calculate digital numbers */
		try { aPrecision = aString.split(".")[1].length; } catch (e) { aPrecision = 0; }
		try { bPrecision = bString.split(".")[1].length; } catch (e) { bPrecision = 0; }
		maxPrecision = Math.max(aPrecision, bPrecision);

		switch (oprand) {
			case "+":
				shifter = Math.pow(10, maxPrecision);
				return (this.calFloat(a, shifter, "*") + this.calFloat(b, shifter, "*")) / shifter;
			case "-":
				shifter = Math.pow(10, maxPrecision);
				return ((this.calFloat(a, shifter, "*") - this.calFloat(b, shifter, "*")) / shifter).toFixed(maxPrecision);
			case "*":
				return Number(aString.replace(".", "")) * Number(bString.replace(".", "")) / Math.pow(10, aPrecision + bPrecision);
			case "/":
				return Number(aString.replace(".", "")) / Number(bString.replace(".", "")) * Math.pow(10, bPrecision - aPrecision);
		}
		return null;
	},
	/* ------------------------------------------------------------------------------------------------
		^getBasedValue: (function) get value in a given base
		---
		value*: [Number] value to be converted
		base*: [Number] base number to be calculated
		---
		return [Integer] calculated based value
	-------------------------------------------------------------------------------------------------*/
	getBasedValue: function (value, base) { return parseInt(value / base); },
	/*---------------------------------------------------------------------------------------------
		^formatNumber: (function) format number to "xxx,xxx" format
		---
		value*: [Integer] value to be formated
		skipComma: [Boolean] skip inserting comma to format number or not
	---------------------------------------------------------------------------------------------*/
	formatNumber: function (value, skipComma) {
		var str = value + "";

		/* insert "," */
		if (skipComma) {
			formatStr = str;
		} else {
			var formatStr = "";
			var counter = 1;
			for (var i = str.length - 1; i >= 0; i--) {
				if (counter % 3 == 0 && i != 0) {
					formatStr = "," + str.charAt(i) + formatStr;
				} else {
					formatStr = str.charAt(i) + formatStr;
				}
				counter++;
			}
		}
		return formatStr;
	}
};

/*==================================================================
    2. ^function
==================================================================*/
/* ------------------------------------------------------------------------------------------------
	^simplePMT: (function) 簡易本息攤還計算(一段式，無費用或優惠方案)，四捨五入到整數。
	---
	loanAmt*: [Number] 貸款金額，10萬則輸入100000。
	loanPeriod*: [Number] 貸款期間(年)
	loanRate*: [Number] 貸款利率(年利率)，2%則輸入0.02。
	skipComma: [boolean]是否忽略數字的分號，預設為false。
	---
	return [object] calculated result
		PPIAmt: [Number] 每月應付本息金額
-------------------------------------------------------------------------------------------------*/
function simplePMT(loanAmt, loanPeriod, loanRate, skipComma){
	var monthlyRate = LC.calFloat(loanRate, 12, '/');
	var monthPeriod = LC.calFloat(loanPeriod, 12, '*');	
	var c = LC.calFloat(1, monthlyRate, '+');
	var j = Math.pow(c, monthPeriod);
	var k = LC.calFloat(j, monthlyRate, '*');	
	var l = LC.calFloat(j ,1, '-');	
	var resultRate = LC.calFloat(k, l, '/');
	/* resultAmt = loanAmt * resultRate = montlyPrincipal + monthlyInterest */
	var resultAmt = LC.calFloat( loanAmt, resultRate, '*');
	var rtnObj = {};
	rtnObj.PPIAmt = LC.formatNumber( Math.round(resultAmt), skipComma);
	return rtnObj;
}