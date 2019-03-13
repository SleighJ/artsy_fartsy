import React, { PureComponent } from 'react';

const textWrapperStyle = {
 	position: 'fixed',
	height: '100%',
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
			editedText: null,
		}
	}

	componentDidUpdate = (prevState, prevProps) => {
		if (prevProps != this.props) {
			this.setState({
				fontSize: parseInt(this.props.fontSize),
				fontFamily: this.props.selectedFont,
				textEditOpen: this.props.textEditOpen,
			})
		}
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
		const value = e.target.value;

		if (keyCode === 13 && value) {
			const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
			const increment = this.state.textInputId+1;

			let inputObj = {
					id: `draggableDiv-${increment}`,
					text: value,
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
		const { x, y, target } = nativeEvent;

		if (x == 0 && y == 0) {
			return
		}

		let parentNode = target.parentNode;
		let id = parentNode.id;
		let index = id.split('')[id.length-1]-1;
		let inputArrayCopy = this.state.input;

		let inputObj = {
			id: id,
			text: target.nodeValue,
			x: parseInt(y, 10),
			y: parseInt(x, 10),
			fontSize: this.state.fontSize,
			fontFamily: this.state.fontFamily,
		};

		inputArrayCopy.splice(index, 1, inputObj);
		this.setState({
			input: inputArrayCopy,
		})
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

	onDoubleClick = ({ nativeEvent }) => {

		const { target } = nativeEvent;
		let parentId = target.parentElement.id;

		console.log(parentId, target.parentElement, this.state.clickedText)

		if (parentId == this.state.editedText) {
			this.setEditState({nativeEvent});
		} else {
			this.setState({
				editedText: parentId,
			})
		}
	};

	setEditState = ({ nativeEvent }) => {

		console.log('here')
		const { target } = nativeEvent;

		let parentId = target.parentElement.id;
		let text = target.parentElement.innerText;
		let inputArrayCopy = this.state.input;
		let index = parentId.split('')[parentId.length-1]-1;
		let selectedInput = inputArrayCopy[index];

		let inputObj = {
				id: parentId,
				text: text,
				x: parseInt(selectedInput.x, 10),
				y: parseInt(selectedInput.y, 10),
				fontSize: parseInt(this.state.fontSize),
				fontFamily: this.state.fontFamily,
			};

		console.log('from setEditState ')
		console.log(inputObj)

		inputArrayCopy.splice(index, 1, inputObj);
		this.setState({
			input: inputArrayCopy,
		}, ()=>this.resetEditState())
	};

	resetEditState = () => {
		this.setState({
			editedText: null,
			clickedText: null,
		})
	};

	render() {

		const { input } = this.state;

		console.log(this.state)

		return (
			<div id={'text-wrapper'} style={ textWrapperStyle } onClick={ this.onMouseDown }>
				{ input ?
					input.map((inputEntry, i) => {
						let id = inputEntry.id;
						let index = id.split('')[id.length-1]-1;
						return (
							<div
								id={ id }
								key={ i }
								value={inputEntry.text}
								onMouseDown={ ()=>this.setDragIdToState(id) }
								onDragStart={ ()=>this.onDragStart(id) }
								onDrag={ this.setDragText }
								onDragEnd={ this.onDragEnd }
								onDoubleClick={ this.state.editedText == id ? this.resetEditState : this.onDoubleClick }
								style={{
									position: 'fixed',
									height: `fit-content`,
									cursor: `${this.state.dragging == id ? 'move' : 'arrow'}`,
									top: inputEntry.x,
									left: inputEntry.y,
								}}
							>
								<div
									style={{
										display: 'inline',
										height: `${ this.state.clickedText == id ? `${ this.state.fontSize }px` : `${ inputEntry.fontSize }px` }`,
										fontSize: `${ this.state.clickedText == id ? `${ this.state.fontSize }px` : `${ inputEntry.fontSize }px` }`,
										fontFamily:  `${ this.state.clickedText == id ? `${ this.state.fontFamily }` : `${ inputEntry.fontFamily }` }`,
										backgroundColor: `${ this.state.editedText == id ? 'yellow' : 'transparent' }`,
										color: `${ this.state.editedText == id ? 'darkGrey' : 'black' }`
									}}
								>

									{ inputEntry.text }

								</div>
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
