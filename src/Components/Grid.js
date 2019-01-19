import React, { PureComponent } from 'react';
import Box from './Box';

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

class Grid extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isPainting: false,
			targetArray: [],
			cell: null,
		}
	}

	isPainting = (e) => {

		let id = e.target.id;

		this.setState(prevState => ({
			isPainting: true,
			targetArray: [...prevState.targetArray, id],
			cell: id,
		}))

		this.checkStateForId(e);
	};

	checkStateForId = (e) => {

		let id = e.target.id;
		let jj = this.state.targetArray.indexOf(id);

		if (jj != -1) {
			console.log(jj)
			console.log(true)
			console.log(e)
			e.currentTarget.style.backgroundColor = 'blue';
			return true;
		} else {
			console.log(e.currentTarget.style)
			return false;
		}

	};

	render() {
		// {/*<div id={ id } className={ 'box-div' } onMouseDown={ (e)=>this.isPainting(e) } style={ this.state.cell == id || this.state.targetArray.indexOf(id) != -1 ? selectedBox : unselectedBox }></div>*/}


		const { boxArr } = this.props;

		return (
			<div className={'grid-div'} style={{border: '1px solid green', lineHeight: '0', fontSize: '0'}}>
				{
					boxArr.map((box, i) => {
						let id = i;
						const idStored = (e) => {}
						return (
							<Box
								isPainting={ this.isPainting }
							/>
						)
					})
				}
			</div>
		);
	}
}

export default Grid;
