/**
 * Created by kevin on 10/15/18.
 */
//node store a piece of data and reference to next node

class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
//node works
/*let first = new Node('Hi');
first.next = new Node('There');
first.next.next = new Node('how');
first.next.next.next = new Node('are');
first.next = new Node('you');*/

class SinglyLinkedList{
    constructor(){
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    push(val){
        let newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else{
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop(){
        //save variable with popped item
        //if this.tail null make new tail
        if(!this.head) return undefined;

        let current = this.head;
        let newtail = current;

        while(current.next){
            newtail = current;
            current = current.next;
        }

        this.tail = newtail;
        this.tail.next = null;
        this.length--;

        if(this.length === 0){
            this.head = null;
            this.tail = null;
        }

        return current;
    }

    shift(){
        if(!this.head) return undefined;

        let temp = this.head;
        this.head = this.head.next;
        this.length--;
        if(this.length === 0)
            this.tail = null;

        return temp;
    }

    unshift(val){
        let newNode = new Node(val);

        if(!this.head){
            this.head = newNode;
            this.tail = this.head;
        } else{
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    get(val){
        let counter = 0;
        let current = this.head;

        while(counter !== val){
            current = current.next;
            counter++;
        }
        return current;
    }

    set(index, val){
        let foundNode = this.get(index);

        if(foundNode){
            foundNode.val = val;
            return true;
        }

        return false;
    }

    insert(index, value){
        if(index < 0 || index > this.length) return false;
        if(index === this.length) return !!this.push(value);
        if(index === 0) return !!this.unshift(value);

        let prev = this.get(index - 1);
        let temp = prev.next;
        let newNode = new Node(value);
        prev.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }

    remove(index){
        if(index < 0 || index >= this.length) return false;
        if(index === 0) return !!this.shift();
        if(index === this.length - 1) return !!this.pop();

        let previous = this.get(index - 1);
        let removed = previous.next;
        previous.next = removed.next;
        this.length--;
        return removed;
    }

    print(){
        let arr = [];
        let current = this.head;
        while(current){
            arr.push(current.val);
            current = current.next;
        }
    }

    reverse(){
       let node = this.head;
       this.head = this.tail;
       this.tail = node;
        let previous = null;
        let next;

       for(let i = 0; i <= this.length; i++){
           next = node.next;
           node.next = previous;
           previous = node;
           node = next;
       }
       return this;
    }
}