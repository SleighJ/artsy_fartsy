import React, {Component} from "react";
import BackgroundSubComponent from "../SubComponents/BackgroundSubComponent";
import ReactCrop from "react-image-crop";
import { storage } from '../Firebase/Firebase';
import {
	base64StringtoFile,
	extractImageFileExtensionFromBase64,
	image64toCanvasRef,
	} from "../Static/Base64";


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
			crop: {
				aspect: 1/1,
			}
		}
	}

	componentDidUpdate = (prevProps) => {
		const { selectedPicture } = this.props;
		const { unCroppedImg64, croppedUrl } = this.state;

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
	};

	//posts original picture to firebase db in base64 (my db could use a little work at this point) and gives it an accessible url
	uploadBackground = async (pic) => {

		const uploadTask = storage.ref(`images/${ pic.name }`).put(pic);
		uploadTask.on('state_changed', (snapshot) => {
			console.log('loading')
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
		}, ()=>this.props.getCroppedUrlFromBackground(newURL))
	};

	render() {

		return (
			<div style={{ maxWidth: '500px', maxHeight: '500px', marginLeft: '20%' }}>

				{ this.state.selectedPicture ?
					<div style={{width: '400px', height: '400px', border: '1px solid black' }}>
						<ReactCrop
							src={ this.state.unCroppedImg64 }
							onChange={ this.backgroundResize }
							crop={ this.state.crop }
							onImageLoaded={ this.handleImageLoaded }
							onComplete={ this.handleOnCropComplete }
							ref={ this.imagePreviewCanvasRef }
						/>
						<p>Preview Canvas Crop</p>
						{ this.state.loadingBackground ?
							<div>
								LOADING....
							</div>
							:
							<div>
								<button onClick={ this.handleDone }>
									Done
								</button>
								<canvas
									id={'canvas'}
									crossOrigin="Anonymous"
									ref={ this.imagePreviewCanvasRef }
								>
								</canvas>
							</div>
						}
					</div>
				: null }



				{/*<br></br>*/}

				{/*<p>Preview Canvas Crop</p>*/}
				{/*<canvas id={'canvas'} crossOrigin="Anonymous" ref={ this.imagePreviewCanvasRef }></canvas>*/}
				{/*<button onClick={ this.handleDone }>Done</button>*/}
			</div>
		)


	}
}

export default Background;