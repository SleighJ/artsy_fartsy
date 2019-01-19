import React, { PureComponent } from 'react';

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
	backgroundColor: 'purple'
};

class Box extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			active: null,
		}
	}

	handleClick = () => {
		this.setState({
			active: true,
		})
	};

	render() {

		const { isPainting } = this.props;

		return (
			<div id={ 'asdf' } onClick={ ()=>this.handleClick() } className={ 'box-div' } style={ this.state.active ? selectedBox : unselectedBox }></div>
		);
	}
}

export default Box;
