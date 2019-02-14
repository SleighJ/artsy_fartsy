import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { storage } from '../Firebase/Firebase';
import CanvasContainer from './CanvasContainer';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import '../CSS/ApplicationContainer.css';

import ReactCrop from 'react-image-crop';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: 'white',
			guide: 0,
			fileManagement: false,
			pic: null,
			background: null,
			croppedUrl: null,
		}
	}

	componentDidMount() {
		// canvas api
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	}

	callBackendAPI = async () => {
		const response = await fetch('/paint');
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	};

	getColorFromPalette = (color) => {
		this.setState({
			color: color,
		})
	};

	getSizeFromBrush = (width) => {
		this.setState({
			width: width,
		})
	};

	nextGuide = () => {
		let currentGuideState = this.state.guide;

		if (currentGuideState < 1) {
			this.setState({
				guide: currentGuideState+1,
			})
		} else {
			this.setState({
				guide: 0,
			})
		}
	};

	openFileManagement = () => {
		this.setState({
			fileManagement: true,
		})
	};

	addBackground = (pic) => {
		this.setState({ pic })
	};

	uploadBackground = async () => {

		const { pic } = this.state;

		const uploadTask = storage.ref(`images/${ pic.name }`).put(pic);
		uploadTask.on('state_changed', (snapshot) => {

			console.log('loading')
		}, (error) => {

			console.log(error)
		}, () => {

			storage.ref('images').child(pic.name).getDownloadURL().then(url => {
				const reader = new FileReader();
				reader.addEventListener('load', ()=> {

					this.setState({
						blobArray: reader.result,
						background: url,
					})

				}, false);

				reader.readAsDataURL(pic);
				// reader.readAsArrayBuffer(pic);
			})
		});

	};

	render() {

		const { color, width } = this.state;

		console.log(this.state);

		return (
			<div>

				<Fragment>
					<div className="main">

						<div className='rotating-master-guide'>

							{ !this.state.fileManagement ? <button onClick={ ()=>this.openFileManagement() }>Add Background</button> : <button onClick={ ()=>this.uploadBackground() }>Upload</button>}

								{ this.state.fileManagement ? <input type={'file'} onChange={ (e)=>this.addBackground(e.target.files[0]) } multiple={ false } accept={ '.png' }></input> : null }
							<button onClick={ ()=>this.nextGuide() }>{ this.state.guide < 1 ? 'Stroke Size' : 'Color Palette' }</button>

							{ this.state.guide == 0 ?
								<div className="color-guide">
									<h5>Colors</h5>
									<Palette getColorFromPalette={ this.getColorFromPalette }/>
								</div>
								:
								<div className="brush-guide">
									<h5>Brushes</h5>
									<BrushContainer getSizeFromBrush={ this.getSizeFromBrush } />
								</div>
							}

						</div>

						<div className={'canvas-container-master'}>
							<CanvasContainer color={ color } width={ this.state.width } background={ this.state.background } blobArray={ this.state.blobArray } />
						</div>

					</div>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
