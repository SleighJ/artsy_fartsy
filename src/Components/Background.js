import React, {Component} from "react";
import ReactCrop from "react-image-crop";
import { storage } from '../Firebase/Firebase';
import {
	base64StringtoFile,
	extractImageFileExtensionFromBase64,
	image64toCanvasRef,
	} from "../Static/Base64";

import { Grid, Dimmer, Loader, Image, Segment, Button } from 'semantic-ui-react';


class Background extends Component {
	constructor(props){
		super(props);

		this.imagePreviewCanvasRef = React.createRef();

		this.state = {
			selectedPicture: null,
			loadingBackground: null,
			unCroppedFireBaseUrl: null,
			unCroppedImg64: null,
			croppedUrl: null,
			imagePreviewRotation: 0,
			crop: {
				aspect: 1/1,
			}
		}
	}

	//allows conditional rerendering based on the inheritance of data as props
	componentDidUpdate = (prevProps) => {
		const { selectedPicture } = this.props;
		const { croppedUrl } = this.state;

		//if a picture has been selected but not yet stored (ie, theres a new background picture selected)
		if (selectedPicture != this.state.selectedPicture) {
			this.setState({ selectedPicture }, ()=>this.uploadBackground(selectedPicture))
		}

		//if there is a cropped image (thus the user finished the process)
		if (croppedUrl && this.state.selectedPicture) {
			//set the selectedPicture to null and loading to false, tell parent not to clear the saved photograph and not pass selectedPicture var
			this.setState({
				selectedPicture: null,
				loadingBackground: false,
			}, ()=>this.props.clearBackground())
		}

		if (this.props.selectedPicture != this.state.selectedPicture) {
			this.setState({
				imagePreviewRotation: 0,
			}, ()=>this.props.getBackgroundRotation(0))
		}
	};

	//posts original picture to firebase db in base64 (my db could use a little work at this point) and gives it an accessible url
	uploadBackground = async (pic) => {

		const uploadTask = storage.ref(`images/${ pic.name }`).put(pic);
		uploadTask.on('state_changed', (snapshot) => {
			this.setState({
				loadingBackground: true,
			})
		}, (error) => {
			console.log(error)
		}, () => {
			storage.ref('images').child(pic.name).getDownloadURL().then(url => {
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					this.setState({
						unCroppedImg64: reader.result,
						unCroppedFireBaseUrl: url,
						loadingBackground: false,
					})

				}, false);
				reader.readAsDataURL(pic);
			})
		});
	};

	//saves cropped image to state
	backgroundResize = (crop) => {
		this.setState({
			crop: crop,
		});
	};

	//gets uncropped url and saves in state
	handleImageLoaded = (image) => {
		this.setState({
			unCroppedImg64: image.src,
		})
	};

	//sends cropped image to be translated to base64 string
	handleOnCropComplete = (crop, pixelCrop) => {
		const canvasRef = this.imagePreviewCanvasRef.current;
		const imageSrc = this.state.unCroppedImg64;

		image64toCanvasRef(canvasRef, imageSrc, pixelCrop);
	};

	//creates url for cropped base64
	handleDone = () => {
		const canvasRef = this.imagePreviewCanvasRef.current;
		const { unCroppedImg64 } = this.state;
		const fileExt = extractImageFileExtensionFromBase64(unCroppedImg64);
		const img64 = canvasRef.toDataURL('image/' + fileExt);
		const fileName = 'preview.'+fileExt;
		const croppedFile = base64StringtoFile(img64, fileName);

		let binaryData = [];
		binaryData.push(croppedFile);
		let newURL = URL.createObjectURL(new Blob(binaryData, {type: "image/png"}));

		this.setState({
			croppedUrl: newURL,
			unCroppedFireBaseUrl: null,
			unCroppedImg64: null,
			crop: {
				aspect: 1/1,
			}
		}, ()=>this.props.getCroppedUrlFromBackground(newURL))
	};

	//sets rotation amount in local state, passes value to parent so rotation can be changed on canvas
	rotateImagePreview = () => {

		let currentRotation = this.state.imagePreviewRotation;
		let nextRotation = currentRotation + 90;

		this.setState({
			imagePreviewRotation: nextRotation,
		}, ()=>this.props.getBackgroundRotation(nextRotation) )
	};

	render() {

		const { imagePreviewRotation } = this.state;

		let rotationStyle= {
			width: '100%',
			height: '100%',
			transform: `rotate(${imagePreviewRotation}deg)`
		};

		return (
			<div style={{ width: '100%', height: '100%' }}>

				{ this.state.selectedPicture ?
					this.state.loadingBackground ?
						<Segment>
							<Dimmer active>
								<Loader>Loading</Loader>
							</Dimmer>
							<Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
						</Segment>
						:
						<Grid style={{ width: '100%', height: '100%' }}>
							<Grid.Row style={{ width: '100%', height: '100%', display: 'inline-block', textAlign: 'center' }} colums={2}>
								<Grid.Column style={{ width: '50%', height: '100%' }}>
									<ReactCrop
										src={ this.state.unCroppedImg64 }
										onChange={ this.backgroundResize }
										crop={ this.state.crop }
										onImageLoaded={ this.handleImageLoaded }
										onComplete={ this.handleOnCropComplete }
										ref={ this.imagePreviewCanvasRef }
										style={{ height: '100%', width: '100%'}}
									/>
								</Grid.Column>
								<Grid.Column style={{ width: '50%', height: '100%' }}>
									<canvas
										id={'canvas'}
										crossOrigin="Anonymous"
										style={ rotationStyle }
										ref={ this.imagePreviewCanvasRef }
									>
									</canvas>
									<Button onClick={ ()=>this.rotateImagePreview() }>Rotate</Button>
								</Grid.Column>
								<Button style={{margin: '5%'}} onClick={ this.handleDone }>Done</Button>
							</Grid.Row>
						</Grid>
				:
					null
				}
			</div>
		)


	}
}

export default Background;