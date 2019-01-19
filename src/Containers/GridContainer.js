import React, { PureComponent } from 'react';

class Grid extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			height: window.innerHeight,
			width: window.innerWidth,
			boxes: 0,
		};
	}


	componentWillMount() {

		let boxes = Math.floor((window.innerHeight * window.innerWidth) * .01);
		let boxArr = [];

		for (let i = 0; i<boxes; i++) {
			if (i < 100) {
				boxArr.push(i);
			}
		}

		this.setState({
			height: window.innerHeight,
			width: window.innerWidth,
			boxes: boxes,
			boxArr: boxArr,
		});
	}



	render() {

		console.log(this.state.boxArr)

		return (
			<div style={{width: '100px', height: '100px', border: '1px solid orange'}}>
				<div style={{display: 'inline-flex'}}>
					{
						this.state.boxArr.map((box, i) => {
							return (
								<div style={{height: '10px', width: '10px', border: '1px solid black'}}></div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default Grid;
