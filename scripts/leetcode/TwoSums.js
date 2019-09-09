function twoSum(nums, target){
    if(nums.length < 2) return [];
    //multiple pointers
    let i= 0;
    let j = 1;
    let sum = 0;

    while(j < nums.length){
        sum = nums[i] + nums[j];
        if(sum === target) return [i, j];   
        else if(j === nums.length -1){
            i++;
            j = i + 1;
        }
        else{
            j++
        }
    }
    return []
}