function isAnagram(s,t){
    //frequency pattern
    if(s.length !== t.length) return false;
    //create two objects to store letters
    let objCount = {};
    let objCount2 = {};

    //iterate through the strings and store the values
    for(let letter of s){
        objCount[letter] = (objCount[letter] || 0) + 1;
    }

    for(let letter of t){
        objCount2[letter] = (objCount2[letter] || 0) + 1;
    }

    //compare the keys
    for(let key in objCount){
        if(!(objCount2[key])) return false;
        if(objCount[key] !== objCount2[key]) return false;
    }
    return true;
}