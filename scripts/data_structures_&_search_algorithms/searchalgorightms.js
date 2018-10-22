/**
 * Created by kevin on 10/10/18.
 */
//----------------------------------------------------------------------------------------------------------------------
                        //SEARCH ALGORITHM
//----------------------------------------------------------------------------------------------------------------------

//LINEAR SEARCH

/*
BUILT IN LINEAR SEARCH JAVASCRIPT FUNCTIONS
indexOf
includes
find
findIndex
*/

let arr = [1,2,3,4,5,6];

//console.log(arr.includes(4));

function linearSearch(arr, num){
    /*for(let value of arr)
        if(value = num) return arr.indexOf(value);

    return -1;*/

    //improved
    for(let i = 0; i < arr.length; i++)
        if(arr[i] === num) return i;

    return -1;
}

console.log(linearSearch(arr, 34));

//binary search only works with sorted arrays
function binarySearch(arr, val){
    let left = 0;
    let right = arr.length;
    let middle;

    for(let i = 0; i < arr.length; i++){
        debugger;
        //if(right < val) return -1;
        middle = Math.floor(right + left / 2);
        if(arr[middle] === val)
            return arr.indexOf(arr[middle]);
        else {
            if(arr[middle] > val)
                right = middle;
            else
                left = middle;
        }
    }
    return -1;
}
console.log(binarySearch([1,2,3,4,5], 2));

//COLE'S CODE BINARY SEARCH
function binarySearch(arr, elem){
    let start = 0;
    let end = arr.length;
    let middle = Math.floor((start + end) / 2);

    while(arr[middle] !== elem && start <= end){
        if(elem < arr[middle])
            end = middle - 1;
         else
             start = middle + 1;

        middle = Math.floor((start + end) / 2);
    }
    return arr[middle] === elem ? middle : -1;
}


//naive Search string kevin
function findString(str, str2){
    if(str2.length <= 0) return 0;

    let count = 0;
    for(let i = 0; i < str.length; i++){
        if(str2[0] === str[i]){
            for(let j = 1; j <= str2.length; j++){
                if(j === str2.length){
                    count += 1;
                    break;
                }
                if(str2[j] !== str[++i])
                    break;
            }
        }
    } return count;
}

console.log(findString("kevinhokevi", "hol"));

//naive search string colt
function naiveSearch(long,short){
    let count = 0;
    for(let i = 0; i < long.length; i++){
        for(let j = 0; j < short.length; j++){
            if(short[j] !== long[i + j]) break;

            if(j === short.length - 1) count++;
        }
    } return count;
}

console.log(naiveSearch("kevinhokevi", "ho"));