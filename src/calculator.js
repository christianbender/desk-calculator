/*
    author: Christian Bender
    license: MIT-license

    This file contains the class Calculator for enclose the
    functionality of the calculator. In addition the program logic.
*/
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.calcString = "";
        this.waitInput = false;
        this.waitOp = "";
    }
    // adds a operation a a digit to the string calcString.
    Calculator.prototype.add = function (ch) {
        if (((ch >= '0' && ch <= '9') || (ch == '+') || (ch == '-') || (ch == '*')
            || (ch == '/') || (ch == "sign") || (ch == "square") || (ch == "(") || (ch == ")")
            || (ch == "sroot") || (ch == "power")) && !this.waitInput) {
            // for avoiding leading 0
            if (this.calcString == "0") {
                switch (ch) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case ')':
                        this.calcString += ch;
                        break;
                    case "sign":
                        this.append("-(");
                        this.calcString += ")";
                        this.display();
                        this.calculate();
                        break;
                    case "square":
                        this.append("(");
                        this.calcString += ")";
                        this.append(this.calcString + "*");
                        this.calculate();
                        this.display();
                        break;
                    case "(":
                        this.append("(");
                        this.display();
                        break;
                    case "sroot":
                        this.append("Math.sqrt(");
                        this.calcString += ")";
                        this.calculate();
                        this.display();
                        break;
                    case "power":
                        this.waitInput = true;
                        this.waitOp = "power";
                        this.append("Math.pow(");
                        this.calcString += ",";
                        break;
                    default:
                        this.calcString = ch;
                        break;
                }
            }
            else if (this.calcString == "Infinity") {
                if (ch != "sign" && ch != "square" && ch != "(" && ch != ")"
                    && ch != "sroot" && ch != "power") {
                    this.calcString = ch;
                    this.display();
                }
            }
            else {
                if (ch == "sign") {
                    this.append("-(");
                    this.calcString += ")";
                    this.display();
                    this.calculate();
                }
                else if (ch == "square") {
                    this.append("(");
                    this.calcString += ")";
                    this.append(this.calcString + "*");
                    this.calculate();
                    this.display();
                }
                else if (ch == "(") {
                    this.append("(");
                    this.display();
                }
                else if (ch == ")") {
                    this.calcString += ")";
                    this.display();
                }
                else if (ch == "sroot") {
                    this.append("Math.sqrt(");
                    this.calcString += ")";
                    this.calculate();
                    this.display();
                }
                else if (ch == "power") {
                    this.waitInput = true;
                    this.waitOp = "power";
                    this.append("Math.pow(");
                    this.calcString += ",";
                }
                else {
                    this.calcString += ch;
                }
            }
        }
        else if (this.waitInput) {
            switch (this.waitOp) {
                case "power":
                    this.calcString += ch;
                    break;
            }
        }
        else {
            throw new Error("unknow character!");
        }
    };
    // helper for append a string to the begin of the string calcString.
    Calculator.prototype.append = function (str) {
        var s = "";
        s += str;
        s += this.calcString;
        this.calcString = s;
    };
    // evals the string calcString
    Calculator.prototype.calculate = function () {
        var ans;
        if (!this.waitInput) {
            // checks whether calcString is empty.
            if (this.calcString == "") {
                ans = 0;
            }
            else {
                try {
                    ans = eval(this.calcString);
                }
                catch (SyntaxError) {
                    $("#io-display").val("Syntax Error!");
                    this.calcString = "";
                    return;
                }
            }
            if (!isNaN(ans)) {
                $("#io-display").val("" + ans);
                this.calcString = "" + ans;
            }
            else {
                $("#io-display").val("Calculation Error!");
                this.calcString = "";
            }
        }
        else {
            this.calcString += ")";
            this.waitInput = false;
            this.waitOp = "";
            this.calculate();
        }
    };
    // clears the string calcString
    Calculator.prototype.clear = function () {
        this.calcString = "";
    };
    // displays the string calcString in the display.
    Calculator.prototype.display = function () {
        if (!this.waitInput) {
            $("#io-display").val(this.calcString);
        }
    };
    return Calculator;
}());
$("document").ready(function () {
    // string contais the arithmetic term that been calculate.
    var cal = new Calculator();
    $("#button-six").click(function () {
        cal.add("6");
        cal.display();
    });
    $("#button-seven").click(function () {
        cal.add("7");
        cal.display();
    });
    $("#button-eight").click(function () {
        cal.add("8");
        cal.display();
    });
    $("#button-nine").click(function () {
        cal.add("9");
        cal.display();
    });
    $("#button-two").click(function () {
        cal.add("2");
        cal.display();
    });
    $("#button-three").click(function () {
        cal.add("3");
        cal.display();
    });
    $("#button-four").click(function () {
        cal.add("4");
        cal.display();
    });
    $("#button-five").click(function () {
        cal.add("5");
        cal.display();
    });
    $("#button-zero").click(function () {
        cal.add("0");
        cal.display();
    });
    $("#button-one").click(function () {
        cal.add("1");
        cal.display();
    });
    $("#button-clear").click(function () {
        cal.clear();
        cal.display();
    });
    $("#button-plus").click(function () {
        cal.add("+");
        cal.display();
    });
    $("#button-minus").click(function () {
        cal.add("-");
        cal.display();
    });
    $("#button-sign").click(function () {
        cal.add("sign");
        cal.display();
    });
    $("#button-mul").click(function () {
        cal.add("*");
        cal.display();
    });
    $("#button-div").click(function () {
        cal.add("/");
        cal.display();
    });
    $("#button-calc").click(function () {
        cal.calculate();
    });
    $("#button-square").click(function () {
        cal.add("square");
    });
    $("#button-obracket").click(function () {
        cal.add("(");
    });
    $("#button-cbracket").click(function () {
        cal.add(")");
    });
    $("#button-sroot").click(function () {
        cal.add("sroot");
    });
    $("#button-power").click(function () {
        cal.add("power");
    });
});
