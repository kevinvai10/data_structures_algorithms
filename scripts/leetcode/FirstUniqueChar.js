/**
 * @param {string} s
 * @return {number}
 */
function firstUniqChar(s) {
    if(!s) return -1
    let i = 0;     
    let j = i + 1;   
    let seen = [];
    
    while(j < s.length){
        let current = s[i]
        if(s[i] === s[j]){
            seen.push(current)
            i++;
            j = i + 1;
        } else{
            if(seen.includes(current)){
                i = j 
            } 
            j++
        }        
    }
    
    if(seen.includes(s[i])) return - 1
    if(i === j) return -1
    return i;
};