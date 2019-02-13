import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import { image64toCanvasRef } from "../Static/Base64";

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
		console.log('asdfasdfasdfasdfasdf')
		console.log(image)
		this.setState({
			imgSrc: image.src,
		})
	};

	handleOnCropComplete = (crop, pixelCrop) => {

		const canvasRef = this.imagePreviewCanvasRef.current;
		const imageSrc = this.state.imgSrc;

		console.log(canvasRef, imageSrc, pixelCrop)

		image64toCanvasRef(canvasRef, imageSrc, pixelCrop)
	};

	render() {

		const { color , width, background } = this.props;

		console.log(this.state)
		return (
			<div>
				{
					this.props.background ?
						<div style={{ maxWidth: '500px', maxHeight: '500px' }}>
							CROPPING YOOOOOOOOOOO
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
						</div>
						:
						<Canvas color={ color } width={ width != null ? width : 1 } background={ background } />
				}
			</div>
		);
	}
}

export default CanvasContainer;
