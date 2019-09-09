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