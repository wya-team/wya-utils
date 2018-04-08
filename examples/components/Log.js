import React, { Component } from 'react';
import * as utils from '../../src/main';
import { itemObj } from '../config';
class Log extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			log: 'null'
		};
	}
	handleClick = () => {
		const { curFn } = this.props;
		utils['getDevice'].apply(null);
		let log = utils[curFn].apply(
			null, 
			itemObj[curFn].params.map(item => {
				let value = document.getElementById(`${curFn}_${item}`).value;
				try {
					value = JSON.parse(value);
					return value;
				} catch (e) {
					return value;
				}
			})
		) || '请打开调试窗口查看结果';
		this.setState({
			log: typeof log === 'object' ? JSON.stringify(log).replace(/,/g, ',<br />') : log
		}, () => {
			console.log(log);
		});
	}
	render() {
		const { log } = this.state;
		return (
			<div className="_log">
				<p>输出结果</p>
				<div>
					<button onClick={this.handleClick}>点击生成结果</button>
					<p dangerouslySetInnerHTML={{ __html: log }}/>
				</div>
			</div>
		);
	}
}
export default Log;
