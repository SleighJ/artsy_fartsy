import React, { PureComponent } from 'react';
import { SketchPicker } from 'react-color';

let colorWrapperStyle = {
	margin: '5%',
	lineHeight: '0px',
	fontSize: '0px',
	height: 'fit-content',
};

class Palette extends PureComponent {
	constructor(props) {
		super(props);

		 this.colorPickerRef = React.createRef();

		this.state = {
			selectedColor: this.props.color,
			paletteColorPickerState: this.props.paletteColorPickerState,
		}
	}

	// componentDidUpdate = (prevProps, prevState) => {
	// 	//TODO: figure out how to get access to colorpicker on load and inject previous state/props
	// 	// console.log(prevProps, prevState);
	// 	const colorPicker = this.colorPickerRef.current;
	//
	// 	console.log('updating')
	// 	// console.log(colorPicker)
	// 	console.log(colorPicker.state)
	//
	//
	// 	// if (prevState.pastState) {
	// 	// 	console.log('PREVIOUS STATE OF COLOR PICKER')
	// 	// 	console.log(prevState.pastState)
	// 	// }
	// };

	componentDidMount = () => {
		console.log('mounted --> should contain color from unMounting')
		console.log(this.props)
		console.log('check for data in state')
		console.log(this.state)
	};

	componentWillUnmount = () => {
		console.log('unMounting')
		const colorPicker = this.colorPickerRef.current;
		const colorPickerState = colorPicker.state;

		this.props.getPaletteColorPickerState(colorPickerState);
	};



	//tells parent which color is selected
	provideColorToParent = ( color ) => {
		let selectedColor = color.hex;

		this.setState({
			selectedColor: selectedColor,
			metaColor: color,
		}, this.props.getColorFromPalette(selectedColor));
	};

	render() {
		return (
			<div className={'color-picker-container'}>
				<div style={ colorWrapperStyle }>
					<SketchPicker
						ref={ this.colorPickerRef }
						color={ this.state.selectedColor ? this.state.selectedColor : this.state.paletteColorPickerState ? this.state.paletteColorPickerState : '#000000'}
						onChangeComplete={ this.provideColorToParent }
					/>
				</div>
			</div>
		);
	}
}

export default Palette;
