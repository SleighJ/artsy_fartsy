import React, { Component } from 'react';
import Canvas from '../Components/Canvas';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { color , width, background } = this.props;

		console.log(background)

		return (
			<div>
				<Canvas color={ color } width={ width != null ? width : 1 } background={ background } />
			</div>
		);
	}
}

export default CanvasContainer;
