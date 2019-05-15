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
			metaColor: null,
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		//TODO: figure out how to get access to colorpicker on load and inject previous state/props
		// console.log(prevProps, prevState);
	};

	//tells parent which color is selected
	provideColorToParent = ( color ) => {
		// console.log(color);
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
						color={ this.state.selectedColor ? this.state.selectedColor : '#000000' }
						onChangeComplete={ this.provideColorToParent }
					/>
				</div>
			</div>
		);
	}
}

export default Palette;
