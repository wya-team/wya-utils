import React, { Component } from 'react';
import './Root.scss';
import Fn from './Fn';
import Inputs from './Inputs';
import Log from './Log';
import { itemArr } from '../config';
class Basic extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			curFn: itemArr[0] 
		};
	}
	handleChange = (curFn) => {
		this.setState({
			curFn
		});
	}
	render() {
		const { curFn } = this.state;
		return (
			<div className="v-utils-demo">
				<Fn curFn={curFn} onChange={this.handleChange} />
				<Inputs curFn={curFn} />
				<Log curFn={curFn} />
			</div>
		);
	}
}
export default Basic;
