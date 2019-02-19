import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import {
	image64toCanvasRef,
	base64StringtoFile,
	extractImageFileExtensionFromBase64,
	arrayBufferToBase64, downloadBase64File,
} from "../Static/Base64";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { storage } from "../Firebase/Firebase";

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.imagePreviewCanvasRef = React.createRef();

		this.state = {
			imgSrc: null,
			croppedUrl: null,
			background: null,
			loadingBackground: null,
			crop: {
				aspect: 1/1,
			}
		}
	}

	componentDidUpdate = (prevProps) => {
		console.log('componentDidUpdate')
		if ( this.props.background && !this.state.background ) {

			if (!this.state.croppedUrl) {
				this.setState({
					background: this.props.background,
					loadingBackground: true,
				})
			}
		}

		if (this.state.croppedUrl && this.state.background) {
			console.log('we have a croppedURL in the state, I will now set the background to null')
			this.setState({
				background: null,
				loadingBackground: false,
			})
		}
	};

	backgroundResize = (crop) => {
		this.setState({
			crop: crop,
		});
	};

	handleImageLoaded = (image) => {
		this.setState({
			imgSrc: image.src,
		})
	};

	handleOnCropComplete = (crop, pixelCrop) => {

		const canvasRef = this.imagePreviewCanvasRef.current;
		const imageSrc = this.state.imgSrc;

		image64toCanvasRef(canvasRef, imageSrc, pixelCrop)
	};

	handleDone = () => {

		const canvasRef = this.imagePreviewCanvasRef.current;
		const { imgSrc } = this.state;
		const fileExt = extractImageFileExtensionFromBase64(imgSrc);
		const img64 = canvasRef.toDataURL('image/' + fileExt);
		const fileName = 'preview.'+fileExt;

		const croppedFile = base64StringtoFile(img64, fileName);

		let binaryData = [];
		binaryData.push(croppedFile);
		let newURL = URL.createObjectURL(new Blob(binaryData, {type: "image/png"}))

		console.log('new url from handleDone')
		console.log(newURL)

		this.setState({
			croppedUrl: newURL,
			// background: null,
		})
	};

	// uploadCroppedImage = async (croppedFile) => {
	//
	// 	console.log(croppedFile)
	// 	console.log(croppedFile.name)
	//
	// 	const uploadTask = storage.ref(`images/${ croppedFile.name }`).put(croppedFile);
	// 	uploadTask.on('state_changed', (snapshot) => {
	//
	// 		console.log('loading')
	// 	}, (error) => {
	//
	// 		console.log(error)
	// 	}, () => {
	//
	// 		storage.ref('images').child(croppedFile).getDownloadURL().then(url => {
	// 			console.log('past child statement')
	// 			console.log(url)
	// 			const reader = new FileReader();
	// 			reader.addEventListener('load', ()=> {
	// 				this.setState({
	// 					// blobArray: reader.result,
	// 					croppedFile: url,
	// 					background: null,
	// 				})
	//
	// 			}, false);
	//
	// 			reader.readAsDataURL(croppedFile);
	// 			// reader.readAsArrayBuffer(croppedFile);
	// 		})
	// 	});
	//
	// };


	render() {

		const { color , width, background, blobArray } = this.props;

		// console.log(this.state.croppedUrl)

		return (
			<div>
				{
					this.state.background ?
						<div style={{ maxWidth: '500px', maxHeight: '500px' }}>
							<ReactCrop
								src={ this.props.blobArray }
								onChange={ this.backgroundResize }
								crop={ this.state.crop }
								onImageLoaded={ this.handleImageLoaded }
								onComplete={ this.handleOnCropComplete }
								ref={ this.imagePreviewCanvasRef }
							/>

							<br></br>

							<p>Preview Canvas Crop</p>
							<canvas id={'canvas'} crossOrigin="Anonymous" ref={ this.imagePreviewCanvasRef }></canvas>
							<button onClick={ this.handleDone }>Done</button>
						</div>
						:
						<Canvas color={ color } width={ width != null ? width : 1 } croppedUrl={ this.state.croppedUrl } />
				}
			</div>
		);
	}
}

export default CanvasContainer;
