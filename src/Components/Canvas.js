import React, { PureComponent } from 'react';

import { v4 } from 'uuid';

class Canvas extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: this.props.color != null ? this.props.color : null,
			width: this.props.width != null ? this.props.width: null,
			background: this.props.background != null ? this.props.background : null,
			textEditOpen: null,
			hasInput: null,
			textInputId: 0,
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

		if (this.props.textEditOpen && !this.state.textEditOpen) {
			this.setState({
				textEditOpen: this.props.textEditOpen,
			})
		}
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
			this.prevPos = { offsetX, offsetY };
		} else {
			this.addText(offsetX, offsetY);
		}
	};

	addText = (offsetX, offsetY) => {

		const input = document.createElement('input');
		input.type = 'text';
		input.id = `addTextInput-${ this.state.textInputId }`;
		input.style.position = 'fixed';
		input.style.left = (offsetX - 4) + 'px';
		input.style.top = (offsetY - 4) + 'px';

		input.onkeydown = this.handleTextClick;

		document.body.appendChild(input);

		input.focus();
		console.log(input.id)

		this.setState({
			hasInput: true,
		})
	};

	handleTextClick = (e) => {
		const keyCode = e.keyCode;

		if (keyCode === 13) {
			const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
			this.drawText(e.target.value, parseInt(e.target.offsetLeft, 10), parseInt(e.target.offsetTop, 10));
			e.target.parentNode.removeChild(input);

			this.setState({
				hasInput: false,
			})
		}
	};

	drawText = (txt, x, y) => {
		this.ctx.textBaseline = 'top';
		this.ctx.textAlign = 'left';
		this.ctx.font = '14px sans-serif';
		this.ctx.fillText(txt, x - 4, y - 4);
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

		console.log(this.state)

		const { croppedUrl } = this.props;

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

		return (
			<div>
				<canvas
					ref={ (ref) => (this.canvas = ref) }
					style={ this.props.croppedUrl ? image : noImage }
					onMouseDown={ this.onMouseDown }
					onMouseLeave={ this.endPaintEvent }
					onMouseUp={ this.endPaintEvent }
					onMouseMove={ this.onMouseMove }
				/>
				{/*{ this.state.hasInput ? <textarea onBlur={()=>console.log('submitting')} id="go"></textarea> : null }*/}
			</div>
		);
	}
}
export default Canvas;