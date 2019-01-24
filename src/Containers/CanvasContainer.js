import React, { Component } from 'react';
import Canvas from '../Components/Canvas';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { color } = this.props;
		return (
			<div>
				<Canvas color={ color } />
			</div>
		);
	}
}

export default CanvasContainer;
