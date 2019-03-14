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

	// shouldComponentUpdate = (prevProps, prevState) => {
	// 	console.log('should')
	// 	if (prevState.input.length > 0 && this.state.input.length == 0) {
	// 		return false
	// 	} else {
	// 		return true;
	// 	}
	// }

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
		// const { offsetX, offsetY } = nativeEvent;

		if (this.state.textEditOpen) {
			this.addText({nativeEvent})
		}
	};

	addText = ({nativeEvent}) => {

		console.log(this.state)

		const { offsetX, offsetY } = nativeEvent;

		if (!this.state.clickedText && !this.state.editedText) {

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
				});

				input.focus();
			} else {

				const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
				const value = input.value;

				//if there is a value in the input, save it when user clicks away
				if (value) {
					const increment = this.state.textInputId+1;
					const y = input.style.left;
					const x = input.style.top;

					let inputObj = {
						id: `draggableDiv-${increment}`,
						text: value,
						x: parseInt(x),
						y: parseInt(y),
						fontSize: this.state.fontSize,
						fontFamily: this.state.fontFamily,
					};

					this.setState(prevState => ({
						hasInput: false,
						textInputId: increment,
						input: [...prevState.input, inputObj],
					}), ()=>document.body.removeChild(input));

				} else {
					//remove input if there is no value
					this.setState({
						hasInput: false,
					}, ()=>document.body.removeChild(input));
				}
			}
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

	onDoubleClick = (e) => {
		let id = e.target.id;

		//if the selected text is not the same one stored from the last double click...
		if (id != this.state.editedText) {
			this.setEditState(e);
		}
	};

	setEditState = (e) => {
		const { target } = e;

		//unless it is the first iteration, id is retrieved from state, because if user is switching from text component to text component,
		//the data passed will represent the most recently clicked and apply styling changes to the wrong text component.
		//the old id is stored (oldTextId) so that styling can be changed immediately (hightlight) if the user clicks from one text component to another.

		let oldTextId = this.state.editedText;
		let newTextId = target.id;
		let id = this.state.editedText ? oldTextId : newTextId;

		let inputArrayCopy = this.state.input;
		let index = id.split('')[id.length-1]-1;
		let selectedInput = inputArrayCopy[index];
		let text = selectedInput.text;

		//create new object to replace old object
		let inputObj = {
			id: id,
			text: text,
			x: parseInt(selectedInput.x, 10),
			y: parseInt(selectedInput.y, 10),
			fontSize: this.state.fontSize,
			fontFamily: this.state.fontFamily,
		};

		//removed 'px' off the DOM obj styling
		let newlyStyledFontSizeArr = target.style.fontSize.split('');
		newlyStyledFontSizeArr.splice(newlyStyledFontSizeArr.length-2, 2);
		let newlyStyledFontSize = newlyStyledFontSizeArr.join('');

		let newlySelectedObj = {
			id: newTextId,
			text: text,
			fontSize: newlyStyledFontSize,
			fontFamily: selectedInput.fontFamily,
		};

		//set state so styling will change, update obj in input array
		inputArrayCopy.splice(index, 1, inputObj);
		this.setState({
			editedText: newTextId,
			input: inputArrayCopy,
		//tell parent that there is a newly selected text
		}, ()=>this.props.getEditTextSelect(newlySelectedObj));
	};

	resetEditState = ({ nativeEvent }) => {

		let id = nativeEvent.target.id;
		let text = nativeEvent.target.firstChild.data;
		let inputArrayCopy = this.state.input;
		let index = id.split('')[id.length-1]-1;
		let selectedInput = inputArrayCopy[index];

		let inputObj = {
			id: id,
			text: text,
			x: parseInt(selectedInput.x, 10),
			y: parseInt(selectedInput.y, 10),
			fontSize: this.state.fontSize,
			fontFamily: this.state.fontFamily,
		};

		inputArrayCopy.splice(index, 1, inputObj);
		this.setState({
			input: inputArrayCopy,
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
								value={ inputEntry.text }
								onDoubleClick={ this.state.editedText == id ? this.resetEditState : this.onDoubleClick }
								onMouseDown={ ()=>this.setDragIdToState(id) }
								onDragStart={ ()=>this.onDragStart(id) }
								onDrag={ this.setDragText }
								onDragEnd={ this.onDragEnd }
								style={{
									position: 'fixed',
									pointerEvents: `${ !this.props.textEditOpen ? 'none' : 'auto' }`,
									cursor: `${ this.state.dragging == id ? 'move' : 'arrow' }`,
									top: inputEntry.x,
									left: inputEntry.y,
									height: `${ this.state.editedText == id ? `${ this.state.fontSize }px` : `${ inputEntry.fontSize }px` }`,
									backgroundColor: `${this.state.editedText == id ? 'yellow' : 'transparent'}`,
									//if i am selected and there is a stored value for fontSize, make sure that textSubComponent sets the saved fontSize to its default
									fontSize: `${ this.state.editedText == id ? `${ this.state.fontSize }px` : `${ inputEntry.fontSize }px` }`,
									fontFamily:  `${ this.state.editedText == id ? `${ this.state.fontFamily }` : `${ inputEntry.fontFamily }` }`,
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
