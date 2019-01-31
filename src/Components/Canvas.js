import React, { PureComponent } from 'react';
import { v4 } from 'uuid';

class Canvas extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: this.props.color != null ? this.props.color : null,
			width: this.props.width,
		}
	}

	componentDidMount = () => {
		// Here we set up the properties of the canvas element.
		this.canvas.width = 1000;
		this.canvas.height = 800;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = this.state.width;
	};

	// componentWillReceiveProps = (nextProps) => {
	// 	console.log('comp receive')
	// 	console.log(this.props, nextProps)
	// }

	isPainting = false;
	line = [];
	userId = v4();
	prevPos = { offsetX: 0, offsetY: 0 };

	onMouseDown = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		this.isPainting = true;
		this.prevPos = { offsetX, offsetY };
	};

	onMouseMove = ({ nativeEvent }) => {

		if (this.isPainting) {
			const { offsetX, offsetY } = nativeEvent;
			const offSetData = { offsetX, offsetY };
			// Set the start and stop position of the paint event.
			const positionData = {
				start: { ...this.prevPos },
				stop: { ...offSetData },
			};

			// Add the position to the line array
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

		// Move the the prevPosition of the mouse
		this.ctx.moveTo(x, y);

		// Draw a line to the current position of the mouse
		this.ctx.lineTo(offsetX, offsetY);

		// Visualize the line using the strokeStyle
		this.ctx.stroke();
		this.prevPos = { offsetX, offsetY };
	};

	sendPaintData = async () => {

		let body = {
			line: this.line,
			userId: this.userId,
		};

		body = JSON.stringify(body);

		// We use the native fetch API to make requests to the server
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

	render() {
		return (
			<canvas
				// We use the ref attribute to get direct access to the canvas element.
				ref={ (ref) => (this.canvas = ref) }
				style={{ background: 'black' }}
				onMouseDown={ this.onMouseDown }
				onMouseLeave={ this.endPaintEvent }
				onMouseUp={ this.endPaintEvent }
				onMouseMove={ this.onMouseMove }
			/>
		);
	}
}
export default Canvas;