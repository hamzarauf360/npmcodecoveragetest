export function add(num1: number, num2: number) : number {
    let reslt = num1 + num2;
    console.log(`Result is: ${reslt}`);
    return reslt;
}

export function sub(num1: number, num2: number) {
    let result: number;

    if (num1 > num2) {
        result = num1-num2;
    }
    else{
        result = num2-num1;
    }

    console.log(`result is: ${result}`);
}