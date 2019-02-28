import React, { PureComponent } from 'react';
import Brushes from '../Components/Brushes';

class Text extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			size: null,
			font: null,
		}
	}

	setSizeInputState = (value) => {
		this.setState({
			size: value,
		})
	};

	setFontInputState = (value) => {
		this.setState({
			font: value
		})
	};

	render() {

		console.log(this.state);
		return (
			<div>
				<input onChange={ (e)=>this.setSizeInputState(e.target.value)} placeholder={'Size'} type={'number'} />
				<input onChange={ (e)=>this.setFontInputState(e.target.value) } placeholder={'Font'} />
			</div>
		);
	}
}

export default Text;
