import { Calc } from '..';

describe('calc.js', () => {
	test('验证api', () => {
		expect(Calc(1).add(1).val()).toBe(2);
		expect(Calc(2).sub(1).val()).toBe(1);
		expect(Calc(2).div(1).val()).toBe(2);
	});
});
