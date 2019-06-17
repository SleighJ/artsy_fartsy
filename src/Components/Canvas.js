import React, { PureComponent } from 'react';

import { v4 } from 'uuid';

let textOpenStyle = {
	pointerEvents: 'auto',
};

let textClosedStyle = {
	pointerEvents: 'auto',
	position: 'absolute',
};

class Canvas extends PureComponent {
	constructor(props) {
		super(props);

		this.canvasWrapperRef = React.createRef();
		// this.canvas = React.createRef();

		this.state = {
			color: 'red',
			width: null,
			background: null,
			imagePreviewRotation: 0,
			backgroundColor: 'transparent',
		};
	}

	// This component needs a bit of work. I tried to refactor these global variables
	// into the local state but the component updates very frequently and causes issues.

	isPainting = false;
	line = [];
	userId = v4();
	prevPos = { offsetX: 0, offsetY: 0 };

	//on the mount, set width, height & initialize the canvas
	componentDidMount = () => {
		this.props.getRefFromCanvas(this.canvasWrapperRef);
		// this.props.getRefFromCanvas(this.canvas);
		this.canvas.width = 800;
		this.canvas.height = 600;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.ctx.lineWidth = this.state.width;
	};

	//allows conditional rendering based on the inheritance of color, width, and croppedUrl values
	componentDidUpdate = () => {
		this.setState({
			color: this.props.color,
			width:this.props.width,
			croppedUrl: this.props.croppedUrl,
			imagePreviewRotation: this.props.imagePreviewRotation,
			backgroundColor: this.props.backgroundColor,
		});

		this.ctx.lineWidth = this.props.width;
	};

	//sets initial values of global variables isPainting and prevPos via nativeEvent
	onMouseDown = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		if ( !this.state.textEditOpen ) {
			this.isPainting = true;
			this.prevPos = {offsetX, offsetY};
		}
	};

	onMouseMove = ({ nativeEvent }) => {
		// updates position global variables and pushes data to 'line' array
		// passes updated data to 'paint' function for rendering
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

	// renders data passed from onMouseMove om <canvas>
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

	// sets isPainting to false and posts the data to the server
	// TODO: save functionality needs to be added
	endPaintEvent = () => {
		if (this.isPainting) {
			this.isPainting = false;
			this.sendPaintData();
		}
	};

	//saves painting data to db
	//TODO: save functionality needs to be added
	sendPaintData = async () => {

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

	render() {

		const { croppedUrl, backgroundColor } = this.state;

		let urlStyle = {
			width: '800px',
			height: '600px',
			pointerEvents: 'none',
			border: '3px solid pink',
			backgroundColor: `${ this.state.backgroundColor }`,
			backgroundImage: `url(${ croppedUrl })`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		};

		let noUrlStyle = {
			width: '800px',
			height: '600px',
			backgroundColor: `${ this.state.backgroundColor }`,
			pointerEvents: 'none',
			border: '3px solid pink',
		};

		return (
			<div id={'canvas-wrapper'} ref={ this.canvasWrapperRef } style={ croppedUrl ? urlStyle : noUrlStyle }>
				<canvas
					id={'canvas'}
					style={ this.props.textEditOpen ? textOpenStyle : textClosedStyle }
					ref={ (ref) => (this.canvas = ref) }
					onMouseDown={ this.onMouseDown }
					onMouseLeave={ this.endPaintEvent }
					onMouseUp={ this.endPaintEvent }
					onMouseMove={ this.onMouseMove }
				/>
			</div>
		);
	}
}
export default Canvas;