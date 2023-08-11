import {assert} from "chai";
import {describe,it} from "mocha";
import {add,sub} from "../addSub";

describe("Test Block",()=> {
    it("Check Add function",()=>{
        add(1,2);
    });

    it("Check sub function num1 greater than num 2",()=>{
        sub(1000,1);
    });

    /*it("Check sub function num2 greater than num 1",()=>{
        sub(2,1000);
    });*/

    it.skip("Forcefully fail the test",()=>{
        assert.isequal(1,2);
    });
})
