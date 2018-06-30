const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
	it('Should reject non-string values', () => {
		expect(isRealString({name: 'Rishabh'})).toBe(false);
	});
	it('Should reject string with only white spaces', () => {
		expect(isRealString('  ')).toBe(false);
	});
	it('Should accept strings with non-space characters', () => {
		expect(isRealString('Rishabh')).toBe(true);
	});
});