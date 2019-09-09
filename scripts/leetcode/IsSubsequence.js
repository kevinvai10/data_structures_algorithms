/**
 * Given a string s and a string t, check if s is subsequence of t.
A subsequence of a string is a new string which is formed from the original string
by deleting some (can be none) of the characters without disturbing the relative 
positions of the remaining characters. 
(ie, "ace" is a subsequence of "abcde" while "aec" is not).
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(substr, str) {
    let i= 0;
    let j = 0;

    //iterate over longest word*/
    if(str.length === 1){
        return (str[0] === substr[0])
    }
    else{
    while(j < str.length && i < substr.length){
        if(substr[i] === str[j]){
            console.log(substr[i] + " and " + str[j])
            i++;
            j++;
        } else{
            j++;
        }
    }
        return i === substr.length ? true : false        
    }
}
