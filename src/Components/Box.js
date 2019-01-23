import React, { PureComponent } from 'react';

class Box extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			active: null,
			color: null,
		}
	}

	handleClick = () => {
		this.setState({
			active: true,
			color: this.props.color,
		})
	};

	render() {

		const { id, color } = this.props;

		const unselectedBox = {
			height: '2px',
			width: '2px',
			border: '1px solid black',
			display: 'inline-block',
		};

		const selectedBox = {
			height: '2px',
			width: '2px',
			border: '1px solid black',
			display: 'inline-block',
			backgroundColor: this.state.color,
		};

		return (
			<div
				id={ id }
				className={ 'box-div' }
				//not sure how to improve the click handling, possibly additional state manip between parent and child? write unique handler?
				onMouseDown={ ()=>this.handleClick() }
				onDragStart={ ()=>this.handleClick() }
				onDragEnter={ ()=>this.handleClick() }
				style={ this.state.active ? selectedBox : unselectedBox }>
			</div>
		);
	}
}

export default Box;
