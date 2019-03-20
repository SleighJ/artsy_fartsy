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

	// this allows Text.js and TextSubComponent.js to reflect changes made in the other component
	componentDidUpdate = (prevState, prevProps) => {
		// if props of past render doesnt equal these newly incoming props..
		if (prevProps != this.props) {
			// update this component with the new props and save them in the state..
			this.setState({
				fontSize: parseInt(this.props.fontSize),
				fontFamily: this.props.selectedFont,
				textEditOpen: this.props.textEditOpen,
			})
		}
	};

	//handles adding text to the canvas by adding it to the state so it can be mapped in render()
	addText = ({nativeEvent}) => {

		//get corresponding x and y values from the click event
		const { offsetX, offsetY, x, y } = nativeEvent;

		//if there is no selectedText and user is not editing any text
		if (!this.state.clickedText && !this.state.editedText) {

			//if there is no input on the screen
			if (!this.state.hasInput) {

				//create one
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

				//save the coordinants of this click event for use in the next event
				let clickCoords = {
					x: x,
					y: y,
				};

				//let component know that there is an active input and store the
				// coordinants of this click in case the user clicks away
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
		if (keyCode === 13) {
			if(value) {
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
			} else {
				const input = document.getElementById(`addTextInput-${ this.state.textInputId }`);
				e.target.parentNode.removeChild(input);
			}
		}
	};

	// handles user dragging text to a different part of the screen
	setDragText = ({ nativeEvent }) => {
		const { x, y, target } = nativeEvent;

		// when event ends '0, 0' is the last event -> safeguards against
		// text defaulting to upper right of screen
		if (x == 0 && y == 0) {
			return
		}

		//since text is nested inside a div and we need to drag the div, get x/y data from the parent of the clicked text
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

		//find the corresponding object in input array and update it
		inputArrayCopy.splice(index, 1, inputObj);
		this.setState({
			input: inputArrayCopy,
		})
	};

	//resets 'setDragText' when finished dragging
	onDragEnd = () => {
		this.setState({
			clickedText: null,
			dragging: null,
		})
	};

	//puts data in the state to let component know that a user has selected some text, and not to apply an input when selecting.
	setDragIdToState = (id) => {
		this.setState({
			clickedText: id,
		})
	};

	//sets state when dragging so render() can change the cursor
	onDragStart = (id) => {
		this.setState({
			dragging: id,
		})
	};

	//handles ability to edit text font and size (and eventually modification of text and delete)
	setEditState = (e) => {

		const { target } = e;

		//if the targeted click is not on an element that the user is editing...
		if (target.id != this.state.editedText) {

			// here id is retrieved from state, unless it is the first iteration,
			// because if user is switching from text component to text component,
			// the data passed will represent the most recently clicked Text
			// and apply styling changes as such. The old id is stored (oldTextId)
			// so that styling can be changed immediately if the user clicks from
			// one text component to another rather than having to double-click
			// the element again to de-select it.

			let oldTextId = this.state.editedText;
			let newTextId = target.id;
			let oldTextFont = this.state.fontFamily;
			let newTextFont = target.style.fontFamily;

			let id = this.state.editedText ? oldTextId : newTextId;
			let font = this.state.editedText ? oldTextFont : newTextFont;

			// find the corresponding object in the state by pulling the index from the
			// id and using it in inputArray to get any previously stored data out of the state
			let inputArrayCopy = this.state.input;
			let index = id.split('')[id.length-1]-1;
			let selectedInput = inputArrayCopy[index];
			let text = selectedInput.text;

			// create object to save changes of previously selected Text and replace old
			// data w current data (for use in this component)
			let inputObj = {
				id: id,
				text: text,
				x: parseInt(selectedInput.x, 10),
				y: parseInt(selectedInput.y, 10),
				fontSize: this.state.fontSize,
				fontFamily: font,
			};

			// remove 'px' off the DOM styling obj so user can can switch from text component
			// to text component without setting changes being applied to new component
			let newlyStyledFontSizeArr = target.style.fontSize.split('');
			newlyStyledFontSizeArr.splice(newlyStyledFontSizeArr.length-2, 2);
			let newlyStyledFontSize = newlyStyledFontSizeArr.join('');

			// create an object that represents the newly clicked Text so TextSubComponent
			// can reflect the changes that will take place in this component.
			let newlySelectedObj = {
				id: newTextId,
				text: text,
				fontSize: newlyStyledFontSize,
				fontFamily: newTextFont,
			};

			// set the local state so styling will change, replace the old data/obj
			// with new data/obj in input array
			inputArrayCopy.splice(index, 1, inputObj);
			this.setState({
				editedText: newTextId,
				input: inputArrayCopy,
				//tell parent that there is a newly selected text so its state can be changed and passed to TextSubComponent
			}, ()=>this.props.getEditTextSelect(newlySelectedObj));
		}
	};

	//handles user deselecting a textComponent after editing
	resetEditState = ({ nativeEvent }) => {

		// get changes in data from the clicked object
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
		//and update any saved data corresponding to that Text Component.
		inputArrayCopy.splice(index, 1, inputObj);
		this.setState({
			input: inputArrayCopy,
			editedText: null,
			clickedText: null,
		})
	};

	render() {

		const { input } = this.state;

		return (
			<div id={'text-wrapper'} style={ textWrapperStyle } onClick={ this.addText }>
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
								onDoubleClick={ this.state.editedText == id ? this.resetEditState : this.setEditState }
								onMouseDown={ ()=>this.setDragIdToState(id) }
								onDragStart={ ()=>this.onDragStart(id) }
								onDrag={ this.setDragText }
								onDragEnd={ this.onDragEnd }
								style={{
									top: x,
									left: y,
									position: 'fixed',
									lineHeight: '100%',
									overflow: 'hidden',
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
