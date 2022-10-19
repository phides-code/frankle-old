const myArray = ["8", "20", "30", "56", "66", "77"];

const myvar = "76";
let i;
for (i = 0; i < myArray.length; i++) {
    if (parseInt(myvar) < parseInt(myArray[i])) {
        myArray.splice(i, 0, myvar);
        myArray.pop();
        break;
    }
}

console.log("myArray: ");
console.log(myArray);

console.log("i: ");
console.log(i);
