function ConvertHandler() {
  this.getNum = function(input) {
    const numRegex = /^[.\d\/]+/;
    const numPart = input.match(numRegex);
    if (!numPart) return 1; 
    const nums = numPart[0].split('/');
    if (nums.length > 2) return null;
    try {
      const num1 = parseFloat(nums[0]);
      const num2 = nums.length === 2 ? parseFloat(nums[1]) : 1;
      return num1 / num2;
    } catch (e) {
      return null;
    }
  };

  this.getUnit = function(input) {
    if (!input) return null;
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return null;
    let unit = unitMatch[0].toLowerCase();
    const validUnits = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    unit = unit === 'l' ? 'L' : unit;
    return validUnits.includes(unit) ? unit : null;
  };

  this.getReturnUnit = function(initUnit) {
    switch (initUnit) {
      case 'gal': return 'L';
      case 'L': return 'gal';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      case 'mi': return 'km';
      case 'km': return 'mi';
      default: return null;
    }
  };

  this.spellOutUnit = function(unit) {
    const spell = {
      gal: 'gallons',
      L: 'liters',
      lbs: 'pounds',
      kg: 'kilograms',
      mi: 'miles',
      km: 'kilometers'
    };
    return spell[unit] || null;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return null;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };

  this.parse = function(input) {
    const initNum = this.getNum(input);
    const initUnit = this.getUnit(input);
    if (initNum === null && initUnit === null) return 'invalid number and unit';
    if (initNum === null) return 'invalid number';
    if (initUnit === null) return 'invalid unit';
    const returnUnit = this.getReturnUnit(initUnit);
    const returnNum = this.convert(initNum, initUnit);
    const string = this.getString(initNum, initUnit, returnNum, returnUnit);
    return { initNum, initUnit, returnNum, returnUnit, string };
  };
}

module.exports = ConvertHandler;