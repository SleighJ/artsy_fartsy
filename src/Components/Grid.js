import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isPainting: null,
			// childStatus: null,
		}
	}

	setPaintingStateTrue = () => {
		this.setState({
			isPainting: true,
		})
	};

	setPaintingStateFalse = () => {
		this.setState({
			isPainting: false,
		})
	};

	// getChildStatus = (status) => {
	// 	this.setState({
	// 		childStatus: status,
	// 	});
	//
	// 	return status;
	// };

	// shouldComponentUpdate = (nextProps, nextState) => {
	//
	// 	if (this.props.color != nextProps.color) {
	// 		return true;
	// 	}
	// 	else if (this.state.childStatus != nextState.childStatus) {
	// 		console.log('CHILD STATUS')
	// 		return true;
	// 	}
	// 	else {
	// 		return false;
	// 	}
	//
	// }


	render() {

		const { boxArr, color } = this.props;

		return (
			<div className={'grid-div'} onMouseDown={ ()=>this.setPaintingStateTrue() } onMouseUp={ ()=>this.setPaintingStateFalse() } style={{lineHeight: '0', fontSize: '0'}}>
				{
					boxArr.map((box, i) => {
						let id = i;
						return (
							<Box
								id={ id }
								key={ id }
								color={ color }
								isPainting={ this.state.isPainting == true ? true : false }
							/>
						)
					})
				}
			</div>
		);
	}
}

export default Grid;
