import React, { PureComponent } from 'react';

const textWrapperStyle = {
 	position: 'fixed',
	height: '600px',
	width: '800px',
	pointerEvents: 'auto',
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
		// console.log('from text.js')
		// console.log(prevState, this.state)
		// console.log(prevProps, this.props)
		if (prevProps != this.props) {
			this.setState({
				fontSize: parseInt(this.props.fontSize),
				fontFamily: this.props.selectedFont,
				textEditOpen: this.props.textEditOpen,
			})
		}
	};

	//this function will eventually handle different situations once I add the ability to delete a textBox, edit its text, or change its color.
	onMouseDown = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		if (this.state.textEditOpen) {
			this.addText({nativeEvent})
		}
	};

	//handles
	addText = ({nativeEvent}) => {

		const { offsetX, offsetY, x, y } = nativeEvent;

		//if there is no selectedText and user is not editing any text
		if (!this.state.clickedText && !this.state.editedText) {

			//if there is no current input on the screen
			if (!this.state.hasInput) {

				//create one with the data from the click event
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

				let clickCoords = {
					x: x,
					y: y,
				};

				//let page know that there is an active input, store the coordinants of this click in case user clicks away
				this.setState({
					hasInput: true,
					previousClickCoords: clickCoords,

				});
				input.focus();

			//handle if user clicks away from input
			} else {
				//get the currently open input element and its value
				const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
				const value = input.value;

				//if there is a value in the input, save it when user clicks away
				if (value) {
					const increment = this.state.textInputId+1;

					let inputObj = {
						id: `draggableDiv-${increment}`,
						text: value,
						y: parseInt(this.state.previousClickCoords.x, 10),
						x: parseInt(this.state.previousClickCoords.y, 10),
						fontSize: this.state.fontSize,
						fontFamily: this.state.fontFamily,
					};

					//save changes so that obj can be rendered on screen
					this.setState(prevState => ({
						hasInput: false,
						textInputId: increment,
						input: [...prevState.input, inputObj],
					}), ()=>document.body.removeChild(input));

				} else {
					//if there is no value, turn 'hasInput' off and remove the input
					this.setState({
						hasInput: false,
					}, ()=>document.body.removeChild(input));
				}
			}
		}
	};

	//handles case of user pressing enter (instead of clicking away) to create text
	handleTextClick = (e) => {

		const keyCode = e.keyCode;
		const value = e.target.value;

		//if there is a value in the input and user hit 'return'
		if (keyCode === 13 && value) {
			//get the element
			const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
			const increment = this.state.textInputId+1;

			//create an object to store its data
			let inputObj = {
				id: `draggableDiv-${increment}`,
				text: value,
				x: parseInt(e.target.offsetTop, 10),
				y: parseInt(e.target.offsetLeft, 10),
				fontSize: this.state.fontSize,
				fontFamily: this.state.fontFamily,
			};

			//save the data in an array so it can be rendered
			this.setState(prevState => ({
				hasInput: false,
				textInputId: increment,
				input: [...prevState.input, inputObj],
			}) );

			//remove the input
			e.target.parentNode.removeChild(input);
		}
	};

	//handles user dragging text to a different part of the screen
	setDragText = ({ nativeEvent }) => {
		const { x, y, target } = nativeEvent;

		//when event ends '0, 0' is the last event -> safeguards against text defaulting to upper right of screen
		if (x == 0 && y == 0) {
			return
		}

		//since text is nested inside a div and we need to drag the location of that div, we need to get data from the parent of the clicked text
		let parentNode = target.parentNode;
		let id = parentNode.id;
		let index = id.split('')[id.length-1]-1;
		let inputArrayCopy = this.state.input;

		//its data needs to be stored in the state for rendering
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

	//pulls data necessary for dragging out of state so 'setDragText' can be used later
	onDragEnd = () => {
		this.setState({
			clickedText: null,
			dragging: null,
		})
	};

	//puts data in the state to let component know that a user has clicked some text, and not to apply an input on top of this text.
	setDragIdToState = (id) => {
		this.setState({
			clickedText: id,
		})
	};

	//sets state so DOM can change the cursor to drag
	onDragStart = (id) => {
		this.setState({
			dragging: id,
		})
	};

	//TODO: remove, not needed any longer
	onDoubleClick = (e) => {
		let id = e.target.id;

		//if the selected text is not the same one stored from the last double click...
		if (id != this.state.editedText) {
			this.setEditState(e);
		}
	};

	//handles ability to edit text font and size (and eventually modification of text and delete)
	setEditState = (e) => {

		const { target } = e;

		//if the targeted click is not on an element that the user is editing...
		if (target.id != this.state.editedText) {

			//here id is retrieved from state, unless it is the first iteration, because if user is switching from text component to text component,
			//the data passed will represent the most recently clicked and apply styling changes as such.
			//the old id is stored (oldTextId) so that styling can be changed immediately if the user clicks from one text component to another
			//rather than having to double-click the element again to de-select it.
			let oldTextId = this.state.editedText;
			let newTextId = target.id;

			let oldTextFont = this.state.fontFamily;
			let newTextFont = target.style.fontFamily;

			let id = this.state.editedText ? oldTextId : newTextId;
			let font = this.state.editedText ? oldTextFont : newTextFont;

			//find the element in the state by pulling the index out of the id and applying it to the input array stored in the state
			let inputArrayCopy = this.state.input;
			let index = id.split('')[id.length-1]-1;
			let selectedInput = inputArrayCopy[index];
			let text = selectedInput.text;

			//create new object to save changes of previously edited object and replace old data w data (for use in this component)
			let inputObj = {
				id: id,
				text: text,
				x: parseInt(selectedInput.x, 10),
				y: parseInt(selectedInput.y, 10),
				fontSize: this.state.fontSize,
				fontFamily: font,
			};

			//remove 'px' off the DOM styling obj so user can can switch from text component to text component without setting changes to new component
			let newlyStyledFontSizeArr = target.style.fontSize.split('');
			newlyStyledFontSizeArr.splice(newlyStyledFontSizeArr.length-2, 2);
			let newlyStyledFontSize = newlyStyledFontSizeArr.join('');

			//create an object so it can be passed to the subComponent so it can reset its state to represent what is saved in the recently edited object (for use in a different component)
			let newlySelectedObj = {
				id: newTextId,
				text: text,
				fontSize: newlyStyledFontSize,
				// fontFamily: newTextId == id ? selectedInput.fontFamily : this.state.fontFamily,
				fontFamily: newTextFont,

				// fontFamily:  `${ this.state.editedText == id ? `${ this.state.fontFamily }` : `${ inputEntry.fontFamily }` }`,

			};




			// console.log(`${this.state.editedText} == ${id}  ? ${this.state.fontFamily} : ${selectedInput.fontFamily}`)
			// console.log(this.state)
			// console.log(this.props)
			// console.log(`I choose ${ this.state.editedText == id ? this.state.fontFamily : selectedInput.fontFamily }`)
			//
			// console.log('data stored in TEXT')
			// console.log(inputObj)
			// console.log('data sent in TEXTSUBCOMPONENT)')
			// console.log(newlySelectedObj)

			//set state so styling will change, replace the old data/obj with new data/obj in input array
			inputArrayCopy.splice(index, 1, inputObj);
			this.setState({
				editedText: newTextId,
				input: inputArrayCopy,
				//tell parent that there is a newly selected text so its state can be changed to reflect that
			}, ()=>this.props.getEditTextSelect(newlySelectedObj));
		}
	};

	//allows user to deselect a textComponent that is being edited
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

		// console.log('text component render')
		// console.log(this.state.fontFamily)

		return (
			<div id={'text-wrapper'} style={ textWrapperStyle } onClick={ this.onMouseDown }>
				{ input ?
					input.map((inputEntry, i) => {
						let id = inputEntry.id;
						let x = inputEntry.x;
						let y = inputEntry.y;
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
									top: x,
									left: y,
									cursor: `${ this.state.dragging == id ? 'move' : 'arrow' }`,
									backgroundColor: `${this.state.editedText == id ? 'yellow' : 'transparent'}`,
									height: `${ this.state.editedText == id ? `${ this.state.fontSize }px` : `${ inputEntry.fontSize }px` }`,
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
