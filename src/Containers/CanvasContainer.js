import React, { Component } from 'react';
import Canvas from '../Components/Canvas';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { color , width } = this.props;

		return (
			<div>
				<Canvas color={ color } width={ width != null ? width : 1 } />
			</div>
		);
	}
}

export default CanvasContainer;
