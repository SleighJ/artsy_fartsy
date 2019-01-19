import React, { PureComponent } from 'react';

class SimpleColor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: 'black',
		}
	}

	render() {

		const { color } = this.state;

		let style = {
			backgroundColor: `${ color }`,
			border: '2px solid red',
			height: '20px',
			width: '20px',
		};

		return (
			<div className={'palette-container'} style={{height: '100px', width: '100px', border: '1px solid red', alignItems: 'center'}}>
				<text>SimpleColor</text>
				<div style={ style }></div>
			</div>
		);
	}
}

export default SimpleColor;
