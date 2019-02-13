import React, { PureComponent } from 'react';

import { v4 } from 'uuid';

class Canvas extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: this.props.color != null ? this.props.color : null,
			width: this.props.width != null ? this.props.width: null,
			background: this.props.background != null ? this.props.background : null,
		};
	}

	isPainting = false;
	line = [];
	userId = v4();
	prevPos = { offsetX: 0, offsetY: 0 };

	componentDidMount = () => {

		this.canvas.width = 800;
		this.canvas.height = 600;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = this.state.width;
	};

	componentDidUpdate = () => {

		this.updateWidth(this.props.width);
		this.ctx.lineWidth = this.props.width;
	};

	updateWidth = (newWidth) => {

		this.setState({
			width: newWidth,
		});
	};

	onMouseDown = ({ nativeEvent }) => {

		const { offsetX, offsetY } = nativeEvent;

		this.isPainting = true;
		this.prevPos = { offsetX, offsetY };
	};

	onMouseMove = ({ nativeEvent }) => {

		if (this.isPainting) {
			const { offsetX, offsetY } = nativeEvent;
			const offSetData = { offsetX, offsetY };

			const positionData = {
				start: { ...this.prevPos },
				stop: { ...offSetData },
			};

			this.line = this.line.concat(positionData);
			this.paint(this.prevPos, offSetData, this.props.color);
		}
	};

	endPaintEvent = () => {

		if (this.isPainting) {
			this.isPainting = false;
			this.sendPaintData();
		}
	};

	paint = (prevPos, currPos, strokeStyle) => {

		const { offsetX, offsetY } = currPos;
		const { offsetX: x, offsetY: y } = prevPos;

		this.ctx.beginPath();
		this.ctx.strokeStyle = strokeStyle;
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(offsetX, offsetY);
		this.ctx.stroke();
		this.prevPos = { offsetX, offsetY };
	};

	sendPaintData = async () => {


		console.log('calling send paint data')
		let body = {
			line: this.line,
			userId: this.userId,
		};

		body = JSON.stringify(body);

		const req = await fetch('http://localhost:4000/paint', {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const res = await req.text();
		this.line = [];
	};

	incomingImage = () => {
		this.setState({
			incomingImage: true,
		})
	};

	render() {

		const { background } = this.props;

		let noImage = {
			backgroundColor: 'black'
		};

		let image = {
			backgroundColor: 'transparent',
			backgroundImage: `url(${ background })`
		};

		return (
			<canvas
				ref={ (ref) => (this.canvas = ref) }
				style={ this.props.background ? image : noImage }
				onMouseDown={ this.onMouseDown }
				onMouseLeave={ this.endPaintEvent }
				onMouseUp={ this.endPaintEvent }
				onMouseMove={ this.onMouseMove }
			/>
		);
	}
}
export default Canvas;