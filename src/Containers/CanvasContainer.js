import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import {
	image64toCanvasRef,
	base64StringtoFile,
	extractImageFileExtensionFromBase64,
	arrayBufferToBase64,
} from "../Static/Base64";

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.imagePreviewCanvasRef = React.createRef();

		this.state = {
			imgSrc: null,
			crop: {
				aspect: 1/1,
			}
		}
	}

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

	handleDownloadImage = (event) => {
		event.preventDefault();

		// let type;
		// let fileExt;
		// let fileName;
		//
		// const canvasRef = this.imagePreviewCanvasRef.current;
		// const imageSrc = this.state.imgSrc;
		// const base64 = arrayBufferToBase64(this.props.blobArray);
		//
		// let indexPNG = imageSrc.indexOf('.png');
		// let indexJPEG = imageSrc.indexOf('.jpeg');
		//
		// if (indexPNG != -1) {
		// 	fileExt = 'png';
		// 	// fileExt = extractImageFileExtensionFromBase64(imageSrc, type);
		// }
		// else if (indexJPEG != -1) {
		// 	fileExt = 'jpeg';
		// 	// fileExt = extractImageFileExtensionFromBase64(imageSrc, type);
		// }
		// else {
		// 	alert('invalid file type, please select JPEG or PNG')
		// }

		// fileName = `preview.${ fileExt }`;
		// console.log('filename')
		// console.log(fileName)
		// const croppedFile = base64StringtoFile(base64, fileName);
		// console.log(croppedFile)
		// base64StringtoFile(imageSrc, fileName)

		console.log(this.props.blobArray)

		// const sampleArr = base64ToArrayBuffer(data);
		this.saveByteArray("Sample Report", this.props.blobArray);

	};

	saveByteArray = (reportName, byte) => {


		var bytes = new Uint8Array(byte);
		console.log(bytes)
		var blob = new Blob([bytes], {type: "application/pdf"});
		var link = document.createElement('a');
		let url = this.state.imgSrc;
		console.log(url)
		console.log(typeof url)
		console.log(blob)

		link.href = window.webkitURL.createObjectURL(blob);

		var fileName = reportName;
		link.download = fileName;
		link.click();
	};

	oldHandleDownloadImage = () => {
		// event.preventDefault();

		// const fileExt = extractImageFileExtensionFromBase64(imageBlob);

		// console.log(fileExt)

		// let indexPNG = imageSrc.indexOf('.png');
		// let indexJPEG = imageSrc.indexOf('.jpeg');
		//
		//
		// if (indexPNG != -1) {
		// 	type = 'png';
		// 	fileExt = extractImageFileExtensionFromBase64(imageSrc, type);
		// }
		// else if (indexJPEG != -1) {
		// 	type = 'jpeg';
		// 	fileExt = extractImageFileExtensionFromBase64(imageSrc, type);
		// }
		// else {
		// 	alert('invalid file type, please select JPEG or PNG')
		// }
		//
		// fileName = `preview.${ fileExt }`;
		// console.log('filename')
		// console.log(fileName)
		// const croppedFile = base64StringtoFile(imageSrc, fileName);
		// console.log(croppedFile)
		// base64StringtoFile(imageSrc, fileName)
	}

	render() {

		const { color , width, background, blob } = this.props;

		return (
			<div>
				{
					this.props.background ?
						<div style={{ maxWidth: '500px', maxHeight: '500px' }}>
							<ReactCrop
								src={ this.props.background }
								onChange={ this.backgroundResize }
								crop={ this.state.crop }
								onImageLoaded={ this.handleImageLoaded }
								onComplete={ this.handleOnCropComplete }
								ref={ this.imagePreviewCanvasRef }
							/>

							<br></br>

							<p>Preview Canvas Crop</p>
							<canvas ref={ this.imagePreviewCanvasRef }></canvas>
							<button onClick={ this.handleDownloadImage }>download</button>
						</div>
						:
						<Canvas color={ color } width={ width != null ? width : 1 } background={ background } />
				}
			</div>
		);
	}
}

export default CanvasContainer;
