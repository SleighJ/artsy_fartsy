import React, {Component} from "react";

import Palette from "../SubComponents/Palette";
import BackgroundSubComponent from "../SubComponents/BackgroundSubComponent";
import TextSubComponent from "../SubComponents/TextSubComponent";


class SubComponentContainer extends Component {
	constructor(props) {
		super(props);
	}

	pickComponentToRender = () => {
		const subComponents = [
			<Palette
				//for brushes
				color={ this.props.color }
				getSizeFromBrush={ this.props.getSizeFromBrush }
				//forPalette
				paletteColorPickerState={ this.props.paletteColorPickerState }
				getColorFromPalette={ this.props.getColorFromPalette }
				getPaletteColorPickerState={ this.props.getPaletteColorPickerState }
			/>,
			<BackgroundSubComponent
				croppedUrl={ this.props.croppedUrl }
				clearCroppedUrl={ this.props.clearCroppedUrl }
				backgroundUploadStatus={ this.props.backgroundUploadStatus }
				getBackgroundColor={ this.props.getBackgroundColor }
				addBackground={ this.props.addBackground }
			/>,
			<TextSubComponent
				selectedTextEdit={this.props.selectedTextEdit}
				setFont={ this.props.setFont }
				setFontSize={ this.props.setFontSize }
				selectedTextEdit={ this.props.selectedTextEdit }
				textEditObj={ this.props.textEditObj }
				getTextColor={ this.props.getTextColor }
			/>,
		];

		let subComponent = subComponents[this.props.clicked];
		return subComponent;
	};


	render() {
		return(
			<div>{this.pickComponentToRender()}</div>
		)
	}
}

export default SubComponentContainer