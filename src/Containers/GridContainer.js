import React, { PureComponent } from 'react';
import Grid from '../Components/Grid';


class GridContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			height: window.innerHeight,
			width: window.innerWidth,
			boxes: 0,
		};
	}

	componentWillMount() {

		let boxes = Math.floor((window.innerHeight * window.innerWidth) * .04);
		let boxArr = [];

		for (let i = 0; i<boxes; i++) {
				boxArr.push(i);
		}

		this.setState({
			height: window.innerHeight * .8,
			width: window.innerWidth * .8,
			boxes: boxes,
			boxArr: boxArr,
		});
	}

	render() {

		const { color } = this.props;

		let dynamicGridContainerStyle = {
			height: this.state.height,
			width: this.state.width,
			border: '2px solid black'
		};

		return (
			<div className={'container'} style={ dynamicGridContainerStyle }>
				<Grid
					color={ color }
					boxArr={ this.state.boxArr }
				/>
			</div>
		);
	}
}

export default GridContainer;
