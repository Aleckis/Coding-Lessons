const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("Function convertHandler.getNum(input)", function(){
        test("Whole number input", function(){
            assert.equal(convertHandler.getNum("32L"), 32);
        });
        test("Decimal number input", function(){
            assert.equal(convertHandler.getNum("32.5L"), 32.5);
        });
        test("Fractional input", function(){
            assert.equal(convertHandler.getNum("3/2L"), 1.5);
        });
        test("Fractional input with decimal", function(){
            assert.equal(convertHandler.getNum("3.5/2L"), 1.75);
        });
        test("Double fraciton", function(){
            assert.equal(convertHandler.getNum("3/2/2L"), null);
        });
        test("No number input", function(){
            assert.equal(convertHandler.getNum("L"), 1);
        });
    });
    suite("Function convertHandler.getUnit(input)", function(){
        test("Valid liters input", function(){
            assert.equal(convertHandler.getUnit("32L"), "L");
            assert.equal(convertHandler.getUnit("32l"), "L");
        });
        test("Valid gallons input", function(){
            assert.equal(convertHandler.getUnit("32gal"), "gal");
            assert.equal(convertHandler.getUnit("32GAL"), "gal");
        });
        test("Valid pounds input", function(){
            assert.equal(convertHandler.getUnit("32lbs"), "lbs");
            assert.equal(convertHandler.getUnit("32LBS"), "lbs");
        });
        test("Valid kilograms input", function(){
            assert.equal(convertHandler.getUnit("32kg"), "kg");
            assert.equal(convertHandler.getUnit("32KG"), "kg");
        });
        test("Valid miles input", function(){
            assert.equal(convertHandler.getUnit("32mi"), "mi");
            assert.equal(convertHandler.getUnit("32MI"), "mi");
        });
        test("Valid kilometers input", function(){
            assert.equal(convertHandler.getUnit("32km"), "km");
            assert.equal(convertHandler.getUnit("32KM"), "km");
        });
        test("Invalid unit input", function(){
            assert.equal(convertHandler.getUnit("32Ls"), null);
        });
        test("No unit input", function(){
            assert.equal(convertHandler.getUnit("32"), null);
        });
        test("Spell out unit", function(){
            assert.equal(convertHandler.spellOutUnit("L"), "liters");
            assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
            assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
            assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
            assert.equal(convertHandler.spellOutUnit("mi"), "miles");
            assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        });
        test("Convert", function(){
            assert.equal(convertHandler.convert(32, "L"), 8.45351);
            assert.equal(convertHandler.convert(32, "gal"), 121.13312);
            assert.equal(convertHandler.convert(32, "lbs"), 14.51494);
            assert.equal(convertHandler.convert(32, "kg"), 70.54798);
            assert.equal(convertHandler.convert(32, "mi"), 51.49888);
            assert.equal(convertHandler.convert(32, "km"), 19.88393);
        });
    });
});