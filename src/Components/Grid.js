import React, { PureComponent } from 'react';
import Box from './Box';

class Grid extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isPainting: false,
			targetArray: [],
			cell: null,
		}
	}

	render() {

		const { boxArr, color } = this.props;

		return (
			<div className={'grid-div'} style={{border: '1px solid green', lineHeight: '0', fontSize: '0'}}>
				{
					boxArr.map((box, i) => {
						let id = i;
						return (
							<Box
								id={ id }
								color={ color }
							/>
						)
					})
				}
			</div>
		);
	}
}

export default Grid;
