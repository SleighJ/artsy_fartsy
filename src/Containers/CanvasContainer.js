import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import Text from '../Components/Text';
import Background from "../Components/Background";
import BackgroundSubComponent from '../SubComponents/BackgroundSubComponent';

import {
image64toCanvasRef,
base64StringtoFile,
extractImageFileExtensionFromBase64,
} from "../Static/Base64";

import ReactCrop from 'react-image-crop';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import 'react-image-crop/dist/ReactCrop.css';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.imagePreviewCanvasRef = React.createRef();

		this.state = {
			imgSrc: null,
			croppedUrl: null,
			background: null,
			loadingBackground: null,
			modalOpen: null,
			crop: {
				aspect: 1/1,
			}
		}
	}

	componentDidUpdate = () => {
		if (this.props.selectedPicture && !this.state.modalOpen) {
			this.setState({
				modalOpen: true,
			})
		}

		if (this.props.croppedUrl && !this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
			})
		}
	};


	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });
	// componentDidUpdate = (prevProps) => {
	// 	//if there is a background in props and none in the state (first load)
	// 	if ( this.props.background && !this.state.background ) {
	// 		//if there is no cropped pic available (thus process has not been finished)
	// 		if (!this.state.croppedUrl) {
	// 			//set the background in the local state and set loading to true
	// 			this.setState({
	// 				background: this.props.background,
	// 				loadingBackground: true,
	// 			})
	// 		}
	// 	}
	//
	// 	//if there is a cropped image (thus the user finished the process)
	// 	if (this.state.croppedUrl && this.state.background) {
	// 		//set the background to null and loading to false so process can run again later
	// 		this.setState({
	// 			background: null,
	// 			loadingBackground: false,
	// 		})
	// 	}
	// };

	// //saves cropped image to state
	// backgroundResize = (crop) => {
	// 	this.setState({
	// 		crop: crop,
	// 	});
	// };
	//
	// //gets uncropped url and saves in state
	// handleImageLoaded = (image) => {
	// 	this.setState({
	// 		imgSrc: image.src,
	// 	})
	// };
	//
	// //sends cropped image to be translated to base64 string
	// handleOnCropComplete = (crop, pixelCrop) => {
	// 	const canvasRef = this.imagePreviewCanvasRef.current;
	// 	const imageSrc = this.state.imgSrc;
	//
	// 	image64toCanvasRef(canvasRef, imageSrc, pixelCrop);
	// };
	//
	// //creates url for cropped base64
	// handleDone = () => {
	// 	const canvasRef = this.imagePreviewCanvasRef.current;
	// 	const { imgSrc } = this.state;
	// 	const fileExt = extractImageFileExtensionFromBase64(imgSrc);
	// 	const img64 = canvasRef.toDataURL('image/' + fileExt);
	// 	const fileName = 'preview.'+fileExt;
	// 	const croppedFile = base64StringtoFile(img64, fileName);
	//
	// 	let binaryData = [];
	// 	binaryData.push(croppedFile);
	// 	let newURL = URL.createObjectURL(new Blob(binaryData, {type: "image/png"}));
	//
	// 	this.setState({
	// 		croppedUrl: newURL,
	// 	})
	// };

	render() {

		const { color , width, textEditOpen, fontSize, selectedFont, selectedPicture, setTextState, getEditTextSelect, clearBackground, getCroppedUrlFromBackground } = this.props;

		return (
			<div>
				{/*{*/}
					{/*this.state.background ?*/}
						<div>
							{/*<div style={{ maxWidth: '500px', maxHeight: '500px', marginLeft: '20%' }}>*/}
							{/*<BackgroundSubComponent/>*/}
							{/*<ReactCrop*/}
							{/*src={ this.props.blobArray }*/}
							{/*onChange={ this.backgroundResize }*/}
							{/*crop={ this.state.crop }*/}
							{/*onImageLoaded={ this.handleImageLoaded }*/}
							{/*onComplete={ this.handleOnCropComplete }*/}
							{/*ref={ this.imagePreviewCanvasRef }*/}
							{/*/>*/}

							{/*<br></br>*/}

							{/*<p>Preview Canvas Crop</p>*/}
							{/*<canvas id={'canvas'} crossOrigin="Anonymous" ref={ this.imagePreviewCanvasRef }></canvas>*/}
							{/*<button onClick={ this.handleDone }>Done</button>*/}
							{/*</div>*/}
						</div>

						{/*:*/}
						<div id={'text-canvas-wrapper'} style={{ marginLeft: '13%', marginRight: 'none', backgroundColor: 'rbga(0, 0, 0, 0.5)' }}>

							<Modal
								// trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
								open={ selectedPicture }
								onClose={this.handleClose}
								basic
								size='small'
							>
								<Header icon='browser' content='Cookies policy' />
								<Modal.Content>
									<div style={{ border: '1px solid white', height: '300px', width: '300px' }}>
										<Background
											selectedPicture={ selectedPicture }
											clearBackground={ clearBackground }
											getCroppedUrlFromBackground={ getCroppedUrlFromBackground }
										/>
									</div>
								</Modal.Content>
								<Modal.Actions>
									<Button color='green' onClick={this.handleClose} inverted>
										<Icon name='checkmark' /> Got it
									</Button>
								</Modal.Actions>
							</Modal>

							<Text
								fontSize={ fontSize }
								selectedFont={ selectedFont }

								textEditOpen={ textEditOpen }
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
				}
			</div>
		);
	}
}

export default CanvasContainer;
