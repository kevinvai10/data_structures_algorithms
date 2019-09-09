/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n){
    let resultArray = [];

    for(let index = 1; index <= n; index++){
        if(index % 3 === 0 && index % 5 === 0){
            resultArray.push("FizzBuzz");
        }

        else if(index % 3 === 0){
            resultArray.push("Fizz");
        }

        else if(index % 5 === 0){
            resultArray.push("Buzz");
        }

        else{
            resultArray.push("" + index);
        }
    }

    return resultArray;
}