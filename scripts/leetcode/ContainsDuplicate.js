/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
    let seenNums = {}
    
    for(let number of nums){
        seenNums[number] = (seenNums[number] || 0) + 1;
    }

    for(let nums in seenNums){
        if(seenNums[nums] > 1) return true;
    }

    return false;
};