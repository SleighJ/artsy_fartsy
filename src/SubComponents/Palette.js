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

	//provides parent with state of color pick on closing so it can
	//be loaded to state via props upon reopening thus allowing component
	//to load with state it closed with
	componentWillUnmount = () => {
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
