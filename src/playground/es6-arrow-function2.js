const add = (a, b) => {
    return a + b;
}

console.log(add(55, 1)); 

const multiplier = {
    // numbers array 
    numbers: [1,2,3],
    // multiplyBy - single number 
    multiplyBy: 2,
    // multiply -- return a new array where the number will be multiplied
    multiply() {
        return this.numbers.map((n) => n * this.multiplyBy);
    }
}

console.log(multiplier.multiply());