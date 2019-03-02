import React, { PureComponent } from 'react';
import Brushes from '../Components/Brushes';

class Text extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			size: null,
			font: null,
			textEditOpen: null,
			hasInput: null,
			textInputId: 0,
			input: null,
		}
	}

	// setSizeInputState = (value) => {
	// 	this.setState({
	// 		size: value,
	// 	})
	// };
	//
	// setFontInputState = (value) => {
	// 	this.setState({
	// 		font: value
	// 	})
	// };

	componentDidUpdate = () => {
		this.setState({
			size: this.props.fontSize,
		})
	};

	onMouseDown = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;
		this.addText(offsetX, offsetY)
	};

	addText = (offsetX, offsetY) => {

		if (!this.state.hasInput) {
			let input = document.createElement('input');
			input.type = 'text';
			input.id = `addTextInput-${ this.state.textInputId }`;
			input.style.position = 'fixed';
			input.style.left = (offsetX) + 'px';
			input.style.top = (offsetY) + 'px';
			input.style.marginLeft = '13%';
			input.autofocus = true;
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

		console.log(this.state.size)

		const { croppedUrl } = this.props;

		return (
			<div style={{ position: 'fixed', height: ' 100%', width: '100%'}} onClick={ this.onMouseDown }>

				{ this.state.input ? <div onDrag={ this.setDragText } style={{ position: 'fixed', top: this.state.input.x, left: this.state.input.y, fontSize: `${this.state.size}px` }}>{ this.state.input.text }</div> : null }

				{/*<input*/}
					{/*onChange={ (e)=>this.setSizeInputState(e.target.value)}*/}
					{/*placeholder={'Size'}*/}
					{/*type={'number'}*/}
				{/*/>*/}
				{/*<input*/}
					{/*onChange={ (e)=>this.setFontInputState(e.target.value) }*/}
					{/*placeholder={'Font'}*/}
				{/*/>*/}
			</div>
		);
	}
}

export default Text;
