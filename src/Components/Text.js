import React, { PureComponent } from 'react';
import Brushes from '../Components/Brushes';

class Text extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			fontSize: 20,
			fontFamily: 'Roboto',
			font: null,
			textEditOpen: null,
			hasInput: null,
			textInputId: 0,
			input: [],
		}
	}

	componentDidUpdate = () => {
		this.setState({
			fontSize: this.props.fontSize,
			fontFamily: this.props.selectedFont,
		})
	};

	onMouseDown = ({ nativeEvent }) => {
		const { offsetX, offsetY } = nativeEvent;

		if (this.state.textEditOpen) {
			this.addText(offsetX, offsetY)
		}
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
			let inputObj = {
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
			}), ()=>this.props.resetTextState(false));

			// this.drawText(e.target.value, parseInt(e.target.offsetLeft, 10), parseInt(e.target.offsetTop, 10));
			e.target.parentNode.removeChild(input);
		}
	};

	setDragText = ({ nativeEvent }) => {
		const { x, y } = nativeEvent;

		let inputObj = {
			text: nativeEvent.target.nodeValue,
			x: parseInt(y, 10) + 'px',
			y: parseInt(x, 10) + 'px',
		};
	};

	render() {

		const { croppedUrl } = this.props;
		const { input } = this.state;

		return (
			<div style={{ position: 'fixed', height: ' 100%', width: '100%'}} onClick={ this.onMouseDown }>

				{ input
					?

					input.map((inputEntry, i) => {
						return (
							<div onDrag={ this.setDragText } style={{ position: 'fixed', top: inputEntry.x, left: inputEntry.y, fontSize: `${ inputEntry.fontSize }px`, fontFamily: `${ inputEntry.fontFamily }` }}>{ inputEntry.text }</div>
						)
					})

					:
					null
				}
			</div>
		);
	}
}

export default Text;
