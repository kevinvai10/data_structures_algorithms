/**
 * Created by kevin on 10/17/18.
 */
let stack = [];
//LAST IN FIRST OUT PRINCIPLE
stack.push("google");
stack.push("googl");
stack.push("goog");


stack.pop();

stack.unshift("asd"); //add at the beggining
stack.shift(); //delete at the beggining


//class stack


class Node{
    constructor(value){
        this.value = value;
        this.next = null
    }
}

class Stack{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(value){
        let newNode = new Node(value);
        if(!this.first){
            this.first = newNode;
            this.last = newNode;

        } else{
            let temp = this.first;
            this.first = newNode;
            this.first.next = temp;
            this.size++;
        }

    }

    pop(){
        if(!this.first) return null;
        let temp = this.first;
        if(this.first === this.last)
            this.last = null;

        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}


//----------------------------------------------------------------------------------------------------------------------
        //QUEUE
//----------------------------------------------------------------------------------------------------------------------
//js way
let q = [];

q.push("");
q.shift();



class Queue{
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(value){
        let newNode = new Node(value);
        if(!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else{
            this.last.next = newNode;
            this.last = newNode;
            this.size++;
        }

    }

    dequeue(){
        if(!this.first) return null;

        let temp = this.first;
        if(this.first === this.last)
            this.last = null;

        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}