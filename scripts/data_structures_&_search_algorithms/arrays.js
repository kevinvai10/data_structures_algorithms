
const numbers = [1,-1,2,3];
let sum = 0;
for(let n of numbers)
    sum += n;

//algorithm sum of array items
const add = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;

}, 0);

const arr = ['kevin'];
const arr2 = ['castro'];

const arr3 = [...arr2,...arr];
console.log(arr3);

for(let items of arr3)
    console.log('items: ',items);

const string1 = arr3.join(',');
console.log(string1);

//SORTING
const nums = [1,4,5,2,3];
nums.sort();
//console.log(nums);
const courses = [
    {id: 1, name: 'Nodejs'},
    {id: 2, name: 'javascript'}
];

courses.sort(function(a,b){
    if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
    if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
    return 0
});

//console.log('cursos: ', courses);
