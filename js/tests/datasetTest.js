/**
 * Tim Unger
 * Unit Tests for dataset.controller.js
 *
 * These tests are completely trivial, but I was struggling to find testable blocks of code.
 */

describe("check edge getRecords", function(){

    it("should pass as 102001",function(){

        expect(getRecords(100001,102000)).toBe(102001);
    })
});

describe("check edge getRecords", function(){

    it("should fail to be 101999",function(){

        expect(getRecords(100001,102000)).toBe(101999);
    })
});

