import React, { PureComponent } from 'react';
import Text from './Text';

import { v4 } from 'uuid';

class Canvas extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: null,
			width: null,
			background: null,
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

		this.setState({
			color: this.props.color,
			width:this.props.width,
		});

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

		if ( !this.state.textEditOpen ) {
			this.isPainting = true;
			this.prevPos = {offsetX, offsetY};
		}
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

		const { croppedUrl, resetTextState } = this.props;
		const { color, width } = this.state;

		let noImage = {
			backgroundColor: 'transparent'
		};

		let image = {
			backgroundColor: 'transparent',
			backgroundImage: `url(${ croppedUrl })`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		};

		let asdf = {
			border: '3px solid pink',
			backgroundColor: 'transparent',
			backgroundImage: `url(${ croppedUrl })`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		};

		let fdsa = {
			border: '3px solid pink',
		};

		return (
			<div onClick={()=>console.log('you clicked a wrapper div in canvas.js')} style={ this.props.croppedUrl ? asdf : fdsa }>
				<canvas
					onClick={()=>console.log('you clicked the canvas')}
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