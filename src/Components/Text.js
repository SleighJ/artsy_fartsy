import React, { PureComponent } from 'react';

const textWrapperStyle = {
 	position: 'fixed',
	height: ' 100%',
	width: '100%',
};

const clickedTextWrapperStyle = {
	border: '1px solid black',
	cursor: 'move',
	position: 'fixed',
	height: ' 100%',
	width: '100%'
};

class Text extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			fontSize: 20,
			fontFamily: 'Roboto',
			textEditOpen: null,
			hasInput: null,
			textInputId: 0,
			input: [],
			clickedText: null,
			dragging: null,
		}
	}

	componentDidUpdate = () => {
		this.setState({
			fontSize: this.props.fontSize,
			fontFamily: this.props.selectedFont,
			textEditOpen: this.props.textEditOpen,
		})
	};

	onMouseDown = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		if (this.state.textEditOpen) {
			this.addText(offsetX, offsetY)
		}
	};

	addText = (offsetX, offsetY) => {
		if (!this.state.hasInput && !this.state.clickedText) {
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
			});

			input.focus();
		}
	};

	handleTextClick = (e) => {
		const keyCode = e.keyCode;

		if (keyCode === 13) {
			const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
			const increment = this.state.textInputId+1;

			let inputObj = {
					id: `draggableDiv-${increment}`,
					text: e.target.value,
					x: parseInt(e.target.offsetTop, 10),
					y: parseInt(e.target.offsetLeft, 10),
					fontSize: this.state.fontSize,
					fontFamily: this.state.fontFamily,
			};

			this.setState(prevState => ({
				hasInput: false,
				textInputId: increment,
				input: [...prevState.input, inputObj],
			}) );

			e.target.parentNode.removeChild(input);
		}
	};

	setDragText = ({ nativeEvent }) => {

		const { x, y } = nativeEvent;
		let inputArrayCopy = this.state.input;

		if (x == 0 && y == 0) {
			return
		}

		for (let i = 0; i < inputArrayCopy.length; i++) {

			let currentEntry = inputArrayCopy[i];
			let id = currentEntry.id;

			if (id == this.state.clickedText) {

				let inputObj = {
					id: this.state.clickedText,
					text: nativeEvent.target.nodeValue,
					x: parseInt(y, 10),
					y: parseInt(x, 10),
					fontSize: this.state.fontSize,
					fontFamily: this.state.fontFamily,
				};

				inputArrayCopy.splice(i, 1, inputObj);
				this.setState({
					input: inputArrayCopy,
				})
			}
		}
	};

	onDragEnd = () => {
		this.setState({
			clickedText: null,
			dragging: null,
		})
	};

	setDragIdToState = (id) => {
		this.setState({
			clickedText: id,
		})
	};

	onDragStart = (id) => {
		this.setState({
			dragging: id,
		})
	};

	render() {

		const { input } = this.state;

		return (
			<div style={ textWrapperStyle } onClick={ this.onMouseDown }>
				{ input ?
					input.map((inputEntry, i) => {
						let id = inputEntry.id;
						return (
							<div
								id={ id }
								key={ i }
								onMouseDown={ ()=>this.setDragIdToState(inputEntry.id) }
								onDragStart={ ()=>this.onDragStart(id) }
								onDrag={ this.setDragText }
								onDragEnd={ this.onDragEnd }
								style={{
									position: 'fixed',
									backgroundColor: `${this.state.dragging == id ? 'black' : 'transparent'}`,
									cursor: `${this.state.dragging == id ? 'move' : 'arrow'}`,
									top: inputEntry.x,
									left: inputEntry.y,
									fontSize: `${ inputEntry.fontSize }px`,
									fontFamily: `${ inputEntry.fontFamily }` }}
							>{ inputEntry.text }
							</div>
						)
					}) :
					null
				}
			</div>
		);
	}
}

export default Text;
