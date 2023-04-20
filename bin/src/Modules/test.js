"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildName(firstName, lastName) {
    console.log('firstName:', firstName, 'lastName:', lastName, '打印');
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
exports.default = buildName;
