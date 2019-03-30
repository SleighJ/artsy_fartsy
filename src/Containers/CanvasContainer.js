import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import Text from '../Components/Text';
import Background from "../Components/Background";

import { Header, Modal } from 'semantic-ui-react';
import 'react-image-crop/dist/ReactCrop.css';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			croppedUrl: null,
			modalOpen: null,
		}
	}

	//tells component to update if selectedPicture or croppedUrl is passed via props
	componentDidUpdate = () => {
		if (this.props.selectedPicture && !this.state.modalOpen) {
			this.setState({
				modalOpen: true,
			})
		}

		//first iteration
		if (this.props.croppedUrl && !this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
				modalOpen: null,
			})
		}

		//additional iterations (changes background with one already loaded)
		if (this.props.croppedUrl != this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
				modalOpen: null,
			})
		}
	};

	render() {

		const {
			color,
			width,
			textEditOpen,
			fontSize,
			selectedFont,
			selectedPicture,
			textColor,
			getFontColor,
			setTextState,
			getEditTextSelect,
			clearBackground,
			getCroppedUrlFromBackground,
		} = this.props;

		return (
			<div id={'text-canvas-wrapper'} style={{ marginLeft: '13%', marginRight: 'none', backgroundColor: 'rbga(0, 0, 0, 0.5)' }}>

				<Modal open={ selectedPicture } basic size='small'>
					<Header icon='cloud upload' content='Please Crop Your Background' align={'center'}/>
					<Modal.Content>
						<Background
							selectedPicture={ selectedPicture }
							clearBackground={ clearBackground }
							getCroppedUrlFromBackground={ getCroppedUrlFromBackground }
						/>
					</Modal.Content>
				</Modal>

				<Text
					fontSize={ fontSize }
					selectedFont={ selectedFont }
					textEditOpen={ textEditOpen }
					textColor={ textColor }
					setTextState={ setTextState }
					getEditTextSelect={ getEditTextSelect }
				/>
				<Canvas
					color={ color }
					width={ width != null ? width : 1 }
					croppedUrl={ this.state.croppedUrl }
					textEditOpen={ textEditOpen }
				/>

			</div>
		);
	}
}

export default CanvasContainer;
