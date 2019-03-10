import { Calc } from '..';

describe('calc.js', () => {
	test('验证api', () => {
		expect(Calc(1).add(1).val()).toBe(2);
	});
});
