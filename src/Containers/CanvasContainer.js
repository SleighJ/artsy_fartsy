import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import Text from '../Components/Text';
import Background from '../Components/Background';

import {
	image64toCanvasRef,
	base64StringtoFile,
	extractImageFileExtensionFromBase64,
} from "../Static/Base64";

import ReactCrop from 'react-image-crop';
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
			crop: {
				aspect: 1/1,
			}
		}
	}

	componentDidUpdate = (prevProps) => {
		if ( this.props.background && !this.state.background ) {
			if (!this.state.croppedUrl) {
				this.setState({
					background: this.props.background,
					loadingBackground: true,
				})
			}
		}

		if (this.state.croppedUrl && this.state.background) {
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

		image64toCanvasRef(canvasRef, imageSrc, pixelCrop);
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
		let newURL = URL.createObjectURL(new Blob(binaryData, {type: "image/png"}));

		this.setState({
			croppedUrl: newURL,
		})
	};

	render() {

		const { color , width, textEditOpen, fontSize, selectedFont,setTextState } = this.props;

		console.log('props and state form container')

		return (
			<div>
				{
					this.state.background ?
						<div style={{ maxWidth: '500px', maxHeight: '500px', marginLeft: '20%' }}>
							<Background/>
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
						<div id={'text-canvas-wrapper'} style={{ marginLeft: '13%', marginRight: 'none', pointerEvents: 'none' }}>
							<Text
								onClick={()=>console.log('you clicked the the text component????')}
								fontSize={ fontSize }
								selectedFont={ selectedFont }
								textEditOpen={ textEditOpen }
								setTextState={ setTextState }
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
