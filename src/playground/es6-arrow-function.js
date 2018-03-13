const square = function (x) {
    return x * x;
}

console.log(square(4));

const squareArrow = (x) => x * x;

console.log(squareArrow(8));

// getfirstName

// create regular arrow func

// shorthand syntax

const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
}

console.log(getFirstName("erkin unlu"));

const getFirstNameS = fullName => fullName.split(' ')[0];

console.log(getFirstNameS("ibrahim unlu"));