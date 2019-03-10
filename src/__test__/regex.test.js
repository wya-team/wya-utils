import { RegEx } from '..';

describe('regex.js', () => {
	test('验证api', () => {
		expect(RegEx.num.test(123)).toBe(true);
		expect(RegEx.email.test(123)).toBe(false);

		RegEx.set('xxx', { value: /1/, msg: "222" });
		expect(RegEx.xxx.test(1)).toBe(true);


		expect(typeof RegEx.validator).toBe('function');

		RegEx.validator({ required: true }, '', (errorMsg) => {
			expect(errorMsg).toBe('必填');
		});

		RegEx.validator({ required: true, type: "mobile" }, '16', (errorMsg) => {
			expect(errorMsg).toBe('请填写正确的手机号码');
		});

		RegEx.validator({ 
			required: true, 
			type: ["mobile", "email"], // 可以是mobile也可以是email
			msg: "test" 
		}, '16', (errorMsg) => {
			expect(errorMsg).toBe('test');
		});

	});
});
