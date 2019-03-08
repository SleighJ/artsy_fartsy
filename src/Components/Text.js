import React, { PureComponent } from 'react';

const textWrapperStyle = {
 	position: 'fixed',
	height: ' 100%',
	width: '100%',
	pointerEvents: 'auto',
};

const clickedTextWrapperStyle = {
	border: '1px solid black',
	backgroundColor: 'yellow',
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
			editing: null,
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

	onDoubleClick = (e) => {
		let id = e.target.id;

		if (id == this.state.editing) {
			this.setState({
				editing: null,
			})
		} else {
			this.setState({
				editing: id,
			})
		}
	};

	render() {

		const { input } = this.state;

		return (
			<div id={'text-wrapper'} style={ textWrapperStyle } onClick={ this.onMouseDown }>
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
								onDoubleClick={ (e)=>this.onDoubleClick(e) }
								style={{
									position: 'fixed',
									pointerEvents: `${ !this.props.textEditOpen ? 'none' : 'auto' }`,
									backgroundColor: `${this.state.editing == id ? 'yellow' : 'transparent'}`,
									cursor: `${this.state.dragging == id ? 'move' : 'arrow'}`,
									top: inputEntry.x,
									left: inputEntry.y,
									fontSize: `${ this.state.editing == id ? `${ this.state.fontSize }px` : `${ inputEntry.fontSize }px` }`,
									fontFamily:  `${ this.state.editing == id ? `${ this.state.fontFamily }` : `${ inputEntry.fontFamily }` }`,
								}}
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
