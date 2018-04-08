import React, { Component } from 'react';
import { itemObj } from '../config';
class Inputs extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { curFn } = this.props;
		const { params = [] } = itemObj[curFn];
		return (
			<div className="_inputs">
				<p>参数名称</p>
				<ul>
					{
						params.map((item, index) => {
							let id = `${curFn}_${item}`;
							return (
								<li key={id}>
									<span>{item}</span>
									<b>=</b>
									<input type="text" id={id}/>
								</li>
							);
						})
					}
				</ul>
			</div>
		);
	}
}
export default Inputs;
