import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { storage } from '../Firebase/Firebase';
import CanvasContainer from './CanvasContainer';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import '../CSS/ApplicationContainer.css';

// import firebase from 'firebase/app';
// import 'firebase/storage';


class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: 'white',
			size: null, //needed??
			guide: 0,
			fileManagement: false,
			pic: null,
		}
	}

	componentDidMount() {
		// canvas api
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	}

	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
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

		// let fd = new FormData();
		// fd.append('background', this.state.pic, this.state.pic.name);

		const uploadTask = storage.ref(`images/${ pic.name }`).put(pic);
		uploadTask.on('state_changed', (snapshot) => {

		}, (error) => {
			console.log(error)
		}, () => {
			storage.ref('images').child(pic.name).getDownloadURL().then(url => {
				console.log(url)
			})
		});


		// Firebase(fd);
	};

	// sendPaintData = async () => {
	//
	// 	let body = {
	// 		line: this.line,
	// 		userId: this.userId,
	// 	};
	//
	// 	body = JSON.stringify(body);
	//
	// 	const req = await fetch('http://localhost:4000/paint', {
	// 		method: 'POST',
	// 		body: body,
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	});
	//
	// 	const res = await req.text();
	// 	this.line = [];
	// };


	render() {

		const { color, width } = this.state;

		return (
			<div>

				<Fragment>
					<div className="main">

						<div className='rotating-master-guide'>

							{ !this.state.fileManagement ? <button onClick={ ()=>this.openFileManagement() }>Add Background</button> : <button onClick={ ()=>this.uploadBackground() }>Upload</button>}

								{ this.state.fileManagement ? <input type={'file'} onChange={ (e)=>this.addBackground(e.target.files[0]) }></input> : null }
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
							<CanvasContainer color={ color } width={ this.state.width } />
						</div>

						<div style={{border: '1px solid black', width: '100px', height: '100px'}}>
						{this.state.pic ? <img src={this.state.picLocation}></img> : null}
						</div>
					</div>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
