class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor(){
        this.root = null;
    }
    insert(value){
        var newNode = new Node(value);
        if(this.root === null){
            this.root = newNode;
            return this;
        }
        var current = this.root;
        while(true){
            if(value === current.value) return undefined;
            if(value < current.value){
                if(current.left === null){
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if(current.right === null){
                    current.right = newNode;
                    return this;
                } 
                current = current.right;
            }
        }
    }
    find(value){
        if(this.root === null) return false;
        var current = this.root,
            found = false;
        while(current && !found){
            if(value < current.value){
                current = current.left;
            } else if(value > current.value){
                current = current.right;
            } else {
                found = true;
            }
        }
        if(!found) return undefined;
        return current;
    }
    contains(value){
        if(this.root === null) return false;
        var current = this.root,
            found = false;
        while(current && !found){
            if(value < current.value){
                current = current.left;
            } else if(value > current.value){
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }

    BST(){
        let queue = [];
        let visited = [];
        let current;
        queue.push(this.root);

        while(queue.length){
            current = queue.shift();
            visited.push(current.value);

            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }

        return visited;
    }

    DFSPO(){
        let visited = [];
        let currentNode = this.root;

        function _traverse (currentNode){
            visited.push(currentNode.value);
            if(currentNode.left) _traverse(currentNode.left);
            if(currentNode.right) _traverse(currentNode.right);
        }

        _traverse(currentNode);
        return visited;

    }

    DFPostOrder(){
        let visited = [];
        let currentNode = this.root;

        function _traverse (currentNode){
            if(currentNode.left) _traverse(currentNode.left);
            if(currentNode.right) _traverse(currentNode.right);
            visited.push(currentNode.value);
        }

        _traverse(currentNode);
        return visited;
    }

    DFSInOrder(){
        let visited = [];
        let currentNode = this.root;

        function _traverse (currentNode){
            if(currentNode.left) _traverse(currentNode.left);
            visited.push(currentNode.value);
            if(currentNode.right) _traverse(currentNode.right);
        }

        _traverse(currentNode);
        return visited;
    }
}


//      10
//   5     13
// 2  7  11  16

let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(11);
tree.insert(2);
tree.insert(16);
tree.insert(7);

console.log(tree.DFSPO());
console.log(tree.DFPostOrder());
console.log(tree.DFSInOrder());









