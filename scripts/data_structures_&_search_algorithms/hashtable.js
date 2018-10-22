/**
 * Created by kevin on 10/16/18.
 */

class HashTable{
    constructor(size = 53){
        this.keyMap = new Array(size);
    }

    _hash(key){
        let total = 0;
        let weird_prime = 31;
        for(let i = 0; i < Math.min(key.length, 100); i++){
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * weird_prime + value) % this.keyMap.length;
        }
        return total;
    }

    set(key,value){
        let hashed = this._hash(key);
        if(!this.keyMap[hashed])
            this.keyMap[hashed] = [];

        this.keyMap[hashed].push([key,value]);
    }

    get(key){
        let hashed = this._hash(key);
        if(!this.keyMap[hashed]) return undefined;

        for(let i = 0; i < this.keyMap[hashed].length; i++)
            if(this.keyMap[hashed][i][0] === key) return this.keyMap[hashed][i][1];

        return undefined;
    }

    keys(){
        let arr = [];
        for(let value of this.keyMap)
            if(value.length === 0)
            arr.push(value[0]);



        return arr;
    }

    values(){
        let arr = [];
        for(let value of this.keyMap)
            if(value)


        return arr;
    }
}

//----------------------------------------------------------------------------------------------------------------------
                    //COLT'S HASH
//----------------------------------------------------------------------------------------------------------------------

class HashTable {
    constructor(size=53){
        this.keyMap = new Array(size);
    }

    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return total;
    }
    set(key,value){
        let index = this._hash(key);
        if(!this.keyMap[index]){
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }
    get(key){
        let index = this._hash(key);
        if(this.keyMap[index]){
            for(let i = 0; i < this.keyMap[index].length; i++)
                if(this.keyMap[index][i][0] === key)
                    return this.keyMap[index][i][1];
        }
        return undefined;
    }
    keys(){
        let keysArr = [];
        for(let i = 0; i < this.keyMap.length; i++){
            if(this.keyMap[i]){
                for(let j = 0; j < this.keyMap[i].length; j++){
                    if(!keysArr.includes(this.keyMap[i][j][0]))
                        keysArr.push(this.keyMap[i][j][0]);
                }
            }
        }
        return keysArr;
    }
    values(){
        let valuesArr = [];
        for(let i = 0; i < this.keyMap.length; i++){
            if(this.keyMap[i]){
                for(let j = 0; j < this.keyMap[i].length; j++){
                    if(!valuesArr.includes(this.keyMap[i][j][1])){
                        valuesArr.push(this.keyMap[i][j][1])
                    }
                }
            }
        }
        return valuesArr;
    }
}

let ht = new HashTable(17);
ht.set("maroon","#800000")
ht.set("yellow","#FFFF00")
ht.set("olive","#808000")
ht.set("salmon","#FA8072")
ht.set("lightcoral","#F08080")
ht.set("mediumvioletred","#C71585")
ht.set("plum","#DDA0DD")
ht.set("purple","#DDA0DD")
ht.set("violet","#DDA0DD")


ht.keys().forEach(function(key){
    console.log(ht.get(key));
})