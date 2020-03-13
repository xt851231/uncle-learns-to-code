let a = true;
let b = changeA();
function changeA() {
    if (a) {
        c = { a: 10, b: 8 };
        return c;
    }
}
console.log('b是' + b);
console.log(b.a);