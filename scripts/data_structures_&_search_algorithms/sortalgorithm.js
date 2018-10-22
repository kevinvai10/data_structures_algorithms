/**
 * Created by kevin on 10/11/18.
 */
//----------------------------------------------------------------------------------------------------------------------
                //SORTING ALGORITHMS
//----------------------------------------------------------------------------------------------------------------------

//BUBBLE SORT
function bubbleSort(arr){
    let noSwaps;
    for(let i = arr.length; i > 0; i--){
        noSwaps = true;
        for(let j = 0; j < i - 1; j++){
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                noSwaps = false;
            }
        }
        if(noSwaps) break; //don't loop if you didn't swap
    }
    return arr;
}

//bubbleSort([37,45,29,8]);

//SELECTION SORT
function selectionSort(arr){
    let min;
    let temp;
    for(let i = 0; i < arr.length; i++){
        min = i;
        for(let j = i + 1; j < arr.length - 1; j++){
            if(arr[j] < arr[min])
                min = j
        }
        if(i !== min){
            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}

//console.log(selectionSort([5,2,1,8,6]));

//INSERTION SORT kevin
function insertionSort(arr){
    for(let i = 1; i < arr.length; i++){
        for(let j = i + 1; j >= 0; j--){
            //compare each element with the previous ones
            if(arr[j] < arr[j - 1]){
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

//console.log(insertionSort([5,120,2,1,8,6,157]));

//INNER SORT colt
function insertionSortC(arr){

    for(let i = 1; i < arr.length; i++){
        let currentVal = arr[i];
        for(var j = i - 1; j >= 0 && arr[j] > currentVal; j--){
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = currentVal;
    }
    return arr;
}

console.log(insertionSortC([5,120,2,1,8,6,157]));
