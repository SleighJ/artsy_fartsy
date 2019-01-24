import React, { Component } from 'react';

class Box extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: null,
			color: 'blue',
		}
	}

	// componentWillMount = () => {
	//
	// }

	handleClick = () => {
		this.setState({
			active: true,
			color: this.props.color,
		})
	};

	handleDrag = () => {
		return false;
	}

	// shouldComponentUpdate = (nextProps, nextState) => {
	// 	// console.log(nextProps, nextState)
	// 	if (this.state.active != nextState.active) {
	// 		return true;
	// 	}
	// 	else {
	// 		return false;
	// 	}
	// }

	render() {

		const { id, color, isPainting } = this.props;

		// console.log(isPainting)

		const unselectedBox = {
			height: '2px',
			width: '2px',
			borderRadius: '30%',
			border: '1px solid lightgrey',
			display: 'inline-block',
		};

		const selectedBox = {
			height: '2px',
			width: '2px',
			borderRadius: '30%',
			border: `1px solid ${ this.state.color }`,
			display: 'inline-block',
			backgroundColor: this.state.color,
		};

		return (
			<div
				id={ id }
				className={ 'box-div' }
				onMouseOver={ this.props.isPainting == true ? ()=>this.handleClick() : null}
				onMouseDown={ ()=>this.handleClick() }
				onDragStart={ ()=>this.handleDrag() }
				// onDragEnter={ ()=>this.handleClick() }
				// onDragStart={ ()=>this.handleClick() }
				style={ this.state.active ? selectedBox : unselectedBox }>

			</div>
		);
	}
}

export default Box;
