import React, {Component} from "react";

import Palette from "../SubComponents/Palette";
import Brushes from "../SubComponents/Brushes";
import BackgroundSubComponent from "../SubComponents/BackgroundSubComponent";
import TextSubComponent from "../SubComponents/TextSubComponent";


class SubComponentContainer extends Component {
	constructor(props) {
		super(props);
	}

	pickComponentToRender = () => {

		const subComponents = [
				<Palette
					getColorFromPalette={ this.props.getColorFromPalette }
				/>,

				<Brushes color={ this.props.color }
						 getSizeFromBrush={ this.props.getSizeFromBrush }
				/>,

				<BackgroundSubComponent
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