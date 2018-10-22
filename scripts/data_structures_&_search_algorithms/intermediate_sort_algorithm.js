/**
 * Created by kevin on 10/11/18.
 */
//----------------------------------------------------------------------------------------------------------------------
                                                    //MERGE SORT
//----------------------------------------------------------------------------------------------------------------------

function merge(arr1, arr2){
        //break down the array in individual arrays
        let results = [];
            let i = 0;
            let j = 0;

            while(i < arr1.length && j < arr2.length){
                if(arr2[j] > arr1[i]){
                    results.push(arr[i]);
                    i++;
                } else {
                    results.push()
                }
            }

            while(i < arr1.length){
                results.push(arr1[i]);
                i++;
            }

            while(i < arr2.length){
                results.push(arr2[j]);
                j++;
            }

            return results;
    //merge the small arrays
}


function mergeSort(arr){
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    //split the array in 2 halves
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left,right);
}

//QUICK SORT
