/**
 * Created by kevin on 10/17/18.
 */
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;

    }
}


class BinaryTree{
    constructor(){
        this.root = null;
        this.size = 0;
    }

    insert(value){
        let newNode = new Node(value);
        if(!this.root){
            this.root = newNode;
            this.size++;
            return this;
        }

        let temp = this.root;
        for(let i = 0; i < this.size.length; i++){
            if(value < temp){
                if(!temp.left) {
                    temp.left = newNode;
                    this.size++;
                } else{
                    temp = temp.left;
                }
            } else{
                if(!temp.right) {
                    temp.right = newNode;
                    this.size++;
                } else{
                    temp = temp.right;
                }
            }
        }
        return this;
    }

    find(value){
        if(!this.root) return "It's not in the tree";

        let temp = this.root;
        for(let i = 0; i < this.size.length; i++){
            if(value < temp.value){
                if(!temp.left) {
                    if(temp.left.value === value) return true;

                    temp = temp.left;
                }

                return "It's not in the tree"
            } else{
                if(!temp.right) {
                    if(temp.left.value === value) return true;

                    temp = temp.right;
                }
                //return "It's not in the tree"
            }
        }
        return false;
    }
}