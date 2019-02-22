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
			input: null,
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

		this.setState({
			textEditOpen: this.props.textEditOpen,
		})
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

		if (!this.state.hasInput) {
			let input = document.createElement('input');
			input.type = 'text';
			input.id = `addTextInput-${ this.state.textInputId }`;
			input.style.position = 'fixed';
			input.style.left = (offsetX - 4) + 'px';
			input.style.top = (offsetY - 4) + 'px';
			input.onkeydown = this.handleTextClick;
			document.body.appendChild(input);

			this.setState({
				hasInput: true,
				textEditOpen: false,
			});

			input.focus();
		}
	};

	handleTextClick = (e) => {
		const keyCode = e.keyCode;

		if (keyCode === 13) {
			const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
			const increment = this.state.textInputId+1;
			this.setState({
				hasInput: false,
				textInputId: increment,
				input: {
					text: e.target.value,
					x: parseInt(e.target.offsetTop, 10),
					y: parseInt(e.target.offsetLeft, 10),
				}
			}, ()=>this.props.resetTextState(false))

			// this.drawText(e.target.value, parseInt(e.target.offsetLeft, 10), parseInt(e.target.offsetTop, 10));
			e.target.parentNode.removeChild(input);
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

	setDragText = ({ nativeEvent }) => {
		const { x, y } = nativeEvent;

		//TODO: figure out why DOM wants x and y switched for drag event
		if (x != 0 || y !=0) {
			this.setState({
				input: {
					text: nativeEvent.target.nodeValue,
					x: parseInt(y, 10) + 'px',
					y: parseInt(x, 10) + 'px',
				}
			})
		}
	};

	render() {

		const { croppedUrl, resetTextState } = this.props;

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
			<div style={{ marginLeft: '13%', border: '3px solid pink' }}>
				{ this.state.input ? <div onDrag={ this.setDragText } style={{ position: 'fixed', top: this.state.input.x, left: this.state.input.y }}>{ this.state.input.text }</div> : null }
				<canvas
					ref={ (ref) => (this.canvas = ref) }
					style={ this.props.croppedUrl ? image : noImage }
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