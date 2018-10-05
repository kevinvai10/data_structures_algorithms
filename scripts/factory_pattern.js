/**
 * Created by kevin on 8/17/18.
 */

//Generic constructors
function Car(options) {

    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";

}

function Truck(options) {
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";

}

//skeleton
function VehicleFactory() {
}

//prototypes and utilities
VehicleFactory.prototype.vehicleClass = Car;

VehicleFactory.prototype.createVehicle = function (options) {
    switch (options.vehicleType) {
        case "car":
            this.vehicleClass = Car;
            break;
        case "truck":
            this.vehicleClass = Truck;
            break;
        //defaults to VehicleFactory.prototype.vehicleClass (Car)
    }
    return new this.vehicleClass(options);
};

console.log("Vehicle factory " , VehicleFactory);

let carFactory = new VehicleFactory();
let car = carFactory.createVehicle({
    vehicleType: "sedan",
    color: "yellow",
    doors: 6
});

console.log(car instanceof Car);

console.log(car);


let movingTruck = carFactory.createVehicle({
   vehicleType: "truck",
    state : "brand new",
    color : "red",
    wheelSize : "small"
});

console.log(movingTruck instanceof Truck);
console.log(movingTruck);