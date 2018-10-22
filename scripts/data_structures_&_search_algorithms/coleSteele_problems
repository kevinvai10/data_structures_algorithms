//create a function that takes a string and returns every character and it's count

function charCount(str){
    //create object to return
    let charobj = {};
    //loop over each character
    for(let i = 0; i < str.length; i++){
        let char = str[i].toLowerCase();
        if(/[a-z0-9]/.test(char)){
            if(charobj[char] > 0)
                charobj[char]++;

            else
                charobj[char] = 1;
        }
    }
    return charobj;
    //if char is a number letter and is a key in object, add count + 1
    //if char doesn't exist, create new property and add 1;
    //if the input is invalid(not a string) don't do anything
    //Return obejct
}



//refactor version
function charCountClean(str){
    //create object to return
    let charobj = {};
    //loop over each character
    for(let char of str){
        char = char.toLowerCase();

        if(/[a-z0-9]/.test(char))
            charobj[char] = ++charobj[char] || 1;

    }
    return charobj;
    //if char is a number letter and is a key in object, add count + 1
    //if char doesn't exist, create new property and add 1;
    //if the input is invalid(not a string) don't do anything
    //Return obejct
}

//more refacotored version
function charCountClean2(str){
    //create object to return
    let charobj = {};
    //loop over each character
    for(let char of str){
        if(isAlphanumeric(char)){
            char = char.toLowerCase();
            charobj[char] = ++charobj[char] || 1;
        }
    }
    return charobj;
    //if char is a number letter and is a key in object, add count + 1
    //if char doesn't exist, create new property and add 1;
    //if the input is invalid(not a string) don't do anything
    //Return obejct
}

function isAlphanumeric(char) {
    let code = char.charCodeAt(0);
    if (!(code > 47 && code < 58) && //numeric [0 - 9]
        !(code > 64 && code < 123) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { //lower alpha [a-z]
        return false;
    }
    return true;
}


//console.log(charCountClean2("Hey !!!hey"));

//----------------------------------------------------------------------------------------------------------------------
            //FREQUENCY PATTERNS
//----------------------------------------------------------------------------------------------------------------------
//make a function that takes two arrays of numbers, the second array contains the
//square numbers of the first array

function sameArray(arr1, arr2){
    //loop over arrays to see if they have the same ammount of characters
    if(arr1.length !== arr2.length) return;

    //create 2 objects to compare
    let objarr1 = {};
    let objarr2 = {};

    //add values to object counter
    for(let value of arr1){
        objarr1[value] = (objarr1[value] || 0) + 1;
    }

    for(let i of arr2){
        objarr2 = (objarr2[i] || 0) + 1;
    }

    //compare items in 2 objects
    for(let key in objarr1){
        if(!(key ** 2 in objarr2)) return false; // if
        if(objarr2[key ** 2] !== objarr1[1]) return false;
    }

    return true;
}

//ANAGRAM CHALLENGE
//write a function to determine if the second string is an anagram of the first.

function anagram(str, str2){
    if(str.length !== str2.length) return false;

    let compareobj = {};
    let compareobj2 = {};

    for(let value of str){
        compareobj[value] = (compareobj[value] || 0) + 1;
    }

    for(let value of str2){
        compareobj2[value] = (compareobj2[value] || 0) + 1;
    }

    for(let key in str){
        if((compareobj[key] !== compareobj2[key])) return false;
    }

    return true;

}

//console.log(anagram("hola", "o165ah"));

//cole's solution

function validAnagram(first,second){
    if(first.length !== second.length) return false;

    const lookup = {};

    for (let i = 0; i < first.length; i++){
        let letter = first[i];
        //if letter exists increment, otherwise set to 1
        lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
    }

    for(let i = 0; i < second.length; i++){
        let letter = [second[i]];
        //can't find letter or letter zero then it's not an anagram
        if(!lookup[letter]){
            return false;
        } else {
            lookup[letter] -= 1;
        }

    }

    return true;
}

//console.log(validAnagram("hey", "yehs"));


//----------------------------------------------------------------------------------------------------------------------
                //MULTIPLE POINTERS
//----------------------------------------------------------------------------------------------------------------------

//Write a function called sumzero which accepts a sorted array
//of integers. hte function should find the first pair where the sum is 0
//return an array that includes both values that sum to zero or undefined if doesn't exist

//NAIVE SOLUTION
function sumZero(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] + arr[j] === 0){
                return [arr[i], arr[j]];
            }
        }
    }
}

//Refactor version using left and right going to the center
function sumZero2(arr){
    let left = 0;
    let right = arr.length - 1;

    while(left < right){
        let sum = arr[left] + arr[right];

        if(sum === 0) return [arr[left], arr[right]];

        else if(sum > 0){
            right--;
        } else {
            left++;
        }
    }
}

//console.log(sumZero2([-8,-3,-1,2,3,5]));
//NAIVE KEVIN SOLUTION
function countUniqueValues(arr){
    let count  = 0;
    let objcount = {};
    //loop through the array to find different numbers
    for(let value of arr){
        //validate the number doesn't exist already
        if(!objcount[value]){
            objcount[value] =  1;
            count += 1;
        }
    }
    //return count

    return count;
}
console.log(countUniqueValues([1,2,3,3,4,5,3,3,3]));
//input [1,2,3,3,4,5] output = 5


//REFACTOR WITH POINTERS
function _countUniqueValues(arr){

    let i = 0;
    for(let j = 1; j < arr.length; j++){
        if(arr[i] !== arr[j]){
             i++;
            arr[i] = arr[j];
        }
    }
    return i + 1;
}

console.log(_countUniqueValues([1,2,3,3,3,3,3,5]));


//SLIDING WINDOW PATTERN
function maxSubarraySum(arr, num){

    if(arr.length < num) return null;

    let maxSum = 0;
    let tempSum = 0;
    for(let i = 0; i < num; i++){
        maxSum += arr[i];
    }

    tempSum = maxSum;

    for(let i = num; i < arr.length; i++){
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }

    return maxSum;


}

//----------------------------------------------------------------------------------------------------------------------
            //EXERCISES
//----------------------------------------------------------------------------------------------------------------------

function sameFrequency(num1, num2){
    // good luck. Add any arguments you deem necessary.
    num1 = num1 + "";
    num2 = num2 + "";
    if(num1.length !== num2.length) return false;

    let num1obj = {};
    let num2obj = {};

    for(let value of num1){
        num1obj[value] = (num1obj[value] || 0) + 1;
    }

    for(let value of num2){
        num2obj[value] = (num2obj[value] || 0) + 1;
    }

    for(let key in num1obj){
        if((num1obj[key] !== num2obj[key])) return false
    }

    return true;
}

sameFrequency(121, 211);

function areThereDuplicates(...params) {
    // good luck. (supply any arguments you deem necessary.)
    const compobj = {};

    for(let value of params){
        compobj[value] = (compobj[value] || 0) + 1;
    }

    for(let keys in compobj){
        if(compobj[keys] > 1) return true;
    }

    return false;
}

console.log(areThereDuplicates(1,2,3));

//areThereDuplicates Solution (Multiple Pointers)
function areThereDuplicates(...args) {
    // Two pointers
    args.sort((a,b) => a > b);
    let start = 0;
    let next = 1;
    while(next < args.length){
        if(args[start] === args[next]){
            return true
        }
        start++
        next++
    }
    return false
}
//areThereDuplicates One Liner Solution
function areThereDuplicates() {
    return new Set(arguments).size !== arguments.length;
}


//----------------------------------------------------------------------------------------------------------------------
                //RECURSION
//----------------------------------------------------------------------------------------------------------------------
function countDownR(num){
    if(num <= 0){
        console.log("all done");
        return;
    }

    console.log(num);
    num--;
    countDownR(num);
}

//countDownR(10);

function sumRange(num){
    if(num === 1) return 1;
    return num + sumRange(num - 1);
}

function factorial(num){
    if(num === 1) return 1;
    return num * factorial(num -1);
}
//console.log(factorial(3));

//helper method recursion
function collectOdds(arr){
    let result = [];

    //recursive function
    function helper(helperinput){
        if(helperinput.length === 0) return;

        if(helperinput[0] % 2 !== 0){
            result.push(helperinput[0]);
        }

        helper(helperinput.slice(1));
    }
    helper(arr);
    return result;
}

//console.log(collectOdds([1,2,3,4,5,6]));


//EXERCISE
//POWER SOLUTION
function power(base, exponent){
    if(exponent === 0) return 1;
    return base * power(base,exponent-1);
}
//FACTORIAL SOLUTION
function factorial(x){
    if (x < 0 ) return 0;
    if (x <= 1 ) return 1;
    return x * factorial(x-1);
}
//PRODUCT OF ARRAY SOLUTION
function productOfArray(arr) {
    if(arr.length === 0) {
        return 1;
    }
    return arr[0] * productOfArray(arr.slice(1));
}
//RECURSIVE RANGE SOLUTION
function recursiveRange(x){
    if (x === 0 ) return 0;
    return x + recursiveRange(x-1);
}
//FIBONACCI SOLUTION
function fib(n){
    if (n <= 2) return 1;
    return fib(n-1) + fib(n-2);
}


//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
