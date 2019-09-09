/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    if(s.length < 1) return true;
    //only alphanumerics no space
    const filteredString = s.replace(/[^A-Za-z0-9]/g, '');
    const lowerCaseString = filteredString.toLowerCase();
    const reversedstring = lowerCaseString.split('').reverse().join('');
    if(s === reversedstring) return true

    return false;
};