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

		let boxes = Math.floor((window.innerHeight * window.innerWidth) * .0099367);
		let boxArr = [];

		for (let i = 0; i<boxes; i++) {
				boxArr.push(i);
		}

		this.setState({
			height: window.innerHeight * .4,
			width: window.innerWidth * .4,
			boxes: boxes,
			boxArr: boxArr,
		});
	}

	render() {

		const { color } = this.props;

		let dynamicContainerStyle = {
			height: this.state.height, width: this.state.width, border: '2px solid black'
		};

		return (
			<div className={'container'} style={ dynamicContainerStyle }>
				<Grid
					color={ color }
					boxArr={ this.state.boxArr }
				/>
			</div>
		);
	}
}

export default GridContainer;
