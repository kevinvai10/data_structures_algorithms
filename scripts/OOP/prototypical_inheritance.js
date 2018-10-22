/**
 * Created by kevin on 10/13/18.
 */
//Calling super constructor
function Shape(color){
    this.color = color;
}

Shape.prototype.duplicate = function () {
    console.log('duplicate');
};


function Circle(radius, color){
    Shape.call(this, color);

    this.radius = radius;
}

//Circle.prototype = Object.create(Object.prototype); //implicit creation

//whenever reseting protoype, reset it's constructor as well
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(){
    console.log('draw');
};

const c = new Circle(4,'red');


//----------------------------------------------------------------------------------------------------------------------
                //INTERMEDIATE FUNCTION INHERITANCE
//----------------------------------------------------------------------------------------------------------------------

function Shape(color){
    this.color = color;
}

Shape.prototype.duplicate = function () {
    console.log('duplicate');
};

//whenever reseting protoype, reset it's constructor as well
function extend(Child, Parent){ //extend class
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}


function Circle(radius, color){
    Shape.call(this, color);

    this.radius = radius;
}

extend(Circle, Shape);


//Circle.prototype = Object.create(Object.prototype); //implicit creation




Circle.prototype.draw = function(){
    console.log('draw');
};

function Square(size){
    this.size = size;
}

extend(Square, Shape);

const c = new Circle(4,'red');

//----------------------------------------------------------------------------------------------------------------------
                        //METHOD OVERRIDING
//----------------------------------------------------------------------------------------------------------------------

function extend(Child, Parent){ //extend class


    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

Circle.prototype.duplicate = function(){ //js by defaults executes method in child object
    Shape.prototype.duplicate(this);
    console.log('duplicate circle');
};

//----------------------------------------------------------------------------------------------------------------------
                //POLYMORPHISM
//----------------------------------------------------------------------------------------------------------------------

function Shape2(){

}

Shape2.prototype.duplicate = function(){
    console.log('duplicate');
};

function Circle2(){

}

extend(Circle2, Shape2);

Circle2.prototype.duplicate = function(){
    console.log('duplicate circle');
};

function Square2(){

}

extend(Square2, Shape2);

Square2.prototype.duplicate = function(){ //js by defaults executes method in child object
    console.log('duplicate square');
};

const shapes = [
  new Circle(),
    new Square()
];

for(let shape of shapes)
    shape.duplicate();


//----------------------------------------------------------------------------------------------------------------------
                    //MIXINS
//----------------------------------------------------------------------------------------------------------------------

const canEat = {
    eat : function () {
        this.hunger--;
        console.log('eating');
    }
};

const canWalk= {
    walk: function(){
        console.log('walking');
    }
};

const canSwim = {
    walk: function(){
        console.log('swimming');
    }
};


function Person(){
}

function Goldfish(){

}
function mixin(target, ...sources){
    Object.assign(target, ...sources);
}

mixin(Person.prototype, canEat, canWalk);

console.log(person);
