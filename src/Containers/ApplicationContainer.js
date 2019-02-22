import React, { Component, Fragment } from 'react';

import CanvasContainer from './CanvasContainer';
import Sidebar from './Sidebar';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import '../CSS/ApplicationContainer.css';

import { storage } from '../Firebase/Firebase';

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
			textEditOpen: false,
		}
	}

	componentDidMount() {
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

	addBackground = (pic) => {
		this.uploadBackground(pic);
		this.setState({ pic })
	};

	uploadBackground = async (pic) => {

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
			})
		});
	};

	setTextState = () => {
		this.setState({
			textEditOpen: !this.state.textEditOpen,
		})
	};

	resetTextState = (bool) => {
		this.setState({
			textEditOpen: bool,
		})
	};

	render() {

		const { color, width } = this.state;

		return (
			<div>

				<Fragment>
					<div>
						<Sidebar
							getSizeFromBrush={ this.getSizeFromBrush }
							getColorFromPalette={ this.getColorFromPalette }
							setTextState={ this.setTextState }
							addBackground={ this.addBackground }
							uploadBackground={ this.uploadBackground }
						/>
					</div>
				</Fragment>

				<Fragment>
					<CanvasContainer
						color={ color }
						width={ this.state.width }
						background={ this.state.background }
						blobArray={ this.state.blobArray }
						textEditOpen={ this.state.textEditOpen }
						resetTextState={ this.resetTextState }
					/>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
