import React, { Component, Fragment } from 'react';

import CanvasContainer from './CanvasContainer';
import Sidebar from './Sidebar';
import '../CSS/ApplicationContainer.css';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: 'white',
			selectedFont: 'Roboto',
			fontSize: 20,
			fileManagement: false,
			selectedPicture: null,
			background: null,
			croppedUrl: null,
			textEditOpen: false,
			selectedTextEdit: null,
			textEditObj: null,
		}
	}

	//on the mount of the entire application, connect to the server that stores the canvas data plots
	componentDidMount = () => {
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	};

	callBackendAPI = async () => {
		const response = await fetch('/paint');
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	};

	//allows the rest of the components to know what color is selected
	getColorFromPalette = (color) => {
		this.setState({
			color: color,
		})
	};

	//allows the rest of the components to know what brush size is selected
	getSizeFromBrush = (width) => {
		this.setState({
			width: width,
		})
	};

	//facilitates state changes required to add a background, passes the data to function to add to db
	addBackground = (selectedPicture) => {
		this.setState({ selectedPicture })
	};

	clearBackground = () => {
		this.setState({
			selectedPicture: null,
		})
	};

	getCroppedUrlFromBackground = (newURL) => {
		console.log('cropped fired')
		this.setState({
			croppedUrl: newURL,
		})
	};
	//
	// //posts original picture to firebase db in base64 (my db could use a little work at this point) and gives it an accessible url
	// uploadBackground = async (pic) => {
	//
	// 	const uploadTask = storage.ref(`images/${ pic.name }`).put(pic);
	// 	uploadTask.on('state_changed', (snapshot) => {
	// 		console.log('loading')
	// 	}, (error) => {
	// 		console.log(error)
	// 	}, () => {
	// 		storage.ref('images').child(pic.name).getDownloadURL().then(url => {
	// 			const reader = new FileReader();
	// 			reader.addEventListener('load', ()=> {
	// 				this.setState({
	// 					blobArray: reader.result,
	// 					background: url,
	// 				})
	//
	// 			}, false);
	// 			reader.readAsDataURL(pic);
	// 		})
	// 	});
	// };

	//tells the rest of the components whether the text component has been selected
	setTextState = () => {
		this.setState({
			textEditOpen: !this.state.textEditOpen,
		})
	};

	//tells the rest of the components what the currently selected font size is
	setFontSize = (fontSize) => {
		this.setState({
			fontSize: fontSize
		})
	};

	//tells the rest of the components what the currently selected font is
	setFont = (font) => {
		this.setState({
			selectedFont: font,
		})
	};

	//saves data from newlySelectedObj from Text.js so it can be passed to textSubComponent.js and update based on state changes in Text.js
	getEditTextSelect = (newlySelectedObj) => {
		this.setState({
			selectedTextEdit: newlySelectedObj.id,
			textEditObj: newlySelectedObj,
		})
	};

	render() {

		const { color, width, textEditOpen, fontSize, selectedTextEdit, textEditObj, background, blobArray, selectedPicture, selectedFont, croppedUrl } = this.state;

		console.log('from AppContainer render')
		console.log(this.state)

		return (
			<div>

				<Fragment>
					<Sidebar
						//functions
						getSizeFromBrush={ this.getSizeFromBrush }
						getColorFromPalette={ this.getColorFromPalette }
						addBackground={ this.addBackground }
						uploadBackground={ this.uploadBackground }
						setTextState={ this.setTextState }
						setFontSize={ this.setFontSize }
						setFont={ this.setFont }

						//global state values
						fontSize={ fontSize }
						textEditOpen={ textEditOpen }
						selectedTextEdit={ selectedTextEdit }
						textEditObj={ textEditObj }
					/>
				</Fragment>

				<Fragment>
					<CanvasContainer
						//functions
						setTextState={ this.setTextState }
						getEditTextSelect={ this.getEditTextSelect }
						clearBackground={ this.clearBackground }
						getCroppedUrlFromBackground={ this.getCroppedUrlFromBackground }

						//global state values
						color={ color }
						width={ width }
						background={ background } //?
						selectedPicture={ selectedPicture }
						croppedUrl={ croppedUrl }
						blobArray={ blobArray } //?
						textEditOpen={ textEditOpen }
						fontSize={ fontSize }
						selectedFont={ selectedFont }
					/>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
