import React, { Component } from 'react';
import { itemArr } from '../config';
class Fn extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { curFn } = this.props;
		return (
			<div className="_fn">
				<p>函数列表</p>
				<ul>
					{
						itemArr.map((item, index) => {
							return (
								<li key={index}>
									<input 
										type="radio"
										id={item}
										name="fn"
										checked={curFn === item}
										onChange={() => this.props.onChange(item)}
									/>
									<label htmlFor={item}>{item}</label>
								</li>
							);
						})
					}
					
				</ul>
			</div>
		);
	}
}
export default Fn;
