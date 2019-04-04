import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import Text from '../Components/Text';
import Background from "../Components/Background";

import { Header, Modal, Grid } from 'semantic-ui-react';
import 'react-image-crop/dist/ReactCrop.css';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.textCanvasWrapper = React.createRef();

		this.state = {
			croppedUrl: null,
			modalOpen: null,
			canvasRef: null,
		}
	}

	//tells component to update if selectedPicture or croppedUrl is passed via props
	componentDidUpdate = () => {
		if (this.props.selectedPicture && !this.state.modalOpen) {
			this.setState({
				modalOpen: true,
			});
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

	getRefFromCanvas = (ref) => {
		this.setState({
			canvasRef: ref,
		})
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
			getBackgroundRotation,
			backgroundColor,
		} = this.props;

		return (
			<div id={'text-canvas-wrapper'} ref={ this.textCanvasWrapper } style={{ margin: 'auto', width: '70%', height: '70%', padding: '50px' }}>

				<Grid>
					<Grid.Column>
						<Grid.Row>
							<Modal open={ selectedPicture } basic size='small'>
								<Header icon='cloud upload' content='Please Crop Your Background' align={'center'}/>
								<Modal.Content>
									<Background
										selectedPicture={ selectedPicture }
										clearBackground={ clearBackground }
										getCroppedUrlFromBackground={ getCroppedUrlFromBackground }
										getBackgroundRotation={ getBackgroundRotation }
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
								canvasRef={ this.state.canvasRef }
							/>
							<Canvas
								color={ color }
								width={ width != null ? width : 1 }
								backgroundColor={ backgroundColor }
								croppedUrl={ this.state.croppedUrl }
								imagePreviewRotation={ this.props.imagePreviewRotation }
								textEditOpen={ textEditOpen }
								getRefFromCanvas={ this.getRefFromCanvas }
							/>
						</Grid.Row>
					</Grid.Column>
				</Grid>



			</div>
		);
	}
}

export default CanvasContainer;
