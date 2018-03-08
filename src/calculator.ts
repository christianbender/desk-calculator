/*
    author: Christian Bender
    license: MIT-license

    This file contains the class Calculator for enclose the 
    functionality of the calculator. In addition the program logic.
*/

class Calculator {

    // string contains the arithmetic term that to calculate.
    private calcString: string;

    constructor() {
        this.calcString = "";
    }

    // adds a operation a a digit to the string calcString.
    add(ch: string): void {
        if ((ch >= '0' && ch <= '9') || (ch == '+') || (ch == '-') || (ch == '*')
            || (ch == '/') || (ch == "sign")) {

            // for avoiding leading 0
            if (this.calcString == "0") {
                switch (ch) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        this.calcString += ch;
                        break;
                    case "sign":
                        this.append("-(");
                        this.calcString += ")";
                        this.display();
                        this.calculate();
                    default:
                        this.calcString = ch;
                        break;
                }
            } else {
                if (ch == "sign") {
                    this.append("-(");
                    this.calcString += ")";
                    this.display();
                    this.calculate();
                } else {
                    this.calcString += ch;
                }

            }

        } else {
            throw new Error("unknow character!");
        }
    }

    // helper for append a string to the begin of the string calcString.
    private append(str: string): void {
        var s: string = "";
        s += str;
        s += this.calcString;
        this.calcString = s;
    }

    // evals the string calcString
    calculate(): void {
        var ans: number;

        // checks whether calcString is empty.
        if (this.calcString == "") {
            ans = 0;
        } else {
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
        } else {
            $("#io-display").val("Calculation Error!");
            this.calcString = "";
        }
    }

    // clears the string calcString
    clear(): void {
        this.calcString = "";
    }

    // displays the string calcString in the display.
    display(): void {
        $("#io-display").val(this.calcString);
    }
}


$("document").ready(function () {

    // string contais the arithmetic term that been calculate.
    var cal: Calculator = new Calculator();

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

});