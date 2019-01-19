import React, { PureComponent } from 'react';

class RGBAColor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			red: 0,
			blue: 0,
			green: 0,
			opacity: .5,
		}
	}

	setToGreen = () => {
		this.setState({
			green: 255,
		})
	};

	setToBlue = () => {
		this.setState({
			blue: 255,
		})
	};

	setToRed = () => {
		this.setState({
			red: 255,
		})
	};

	render() {

		const { red, blue, green, opacity } = this.state;

		let style = {
			backgroundColor: `rgba(${ red }, ${ blue }, ${ green }, ${opacity} )`,
			border: '2px solid red',
			height: '20px',
			width: '20px',
		};

		return (
			<div className={'palette-container'} style={{height: '100px', width: '100px', border: '1px solid red', alignItems: 'center'}}>
				<text>RGBA Palette</text>
				<div style={ style }></div>
				<button style={{ backgroundColor: 'red' }} onClick={ ()=>this.setToRed() }>Red</button>
				<button style={{ backgroundColor: 'green' }} onClick={ ()=>this.setToGreen() }>Green</button>
				<button style={{ backgroundColor: 'blue' }} onClick={ ()=>this.setToBlue() }>Blue</button>
			</div>
		);
	}
}

export default RGBAColor;
