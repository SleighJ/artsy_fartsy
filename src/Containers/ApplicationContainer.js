import React, { Component, Fragment } from 'react';

import CanvasContainer from './CanvasContainer';
import Sidebar from './Sidebar';
import '../CSS/ApplicationContainer.css';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: 'red',
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

	// (compWillMount and callBackendAPI is not so important now, but needed for when I add the functionality to save your work)

	// on the mount of the entire application, connect to the server that stores the canvas data plots
	componentDidMount = () => {
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	};

	// fetches server
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

	//facilitates state changes to remove a background
	clearBackground = () => {
		this.setState({
			selectedPicture: null,
		})
	};

	//gets the url for the cropped image from background.js component
	getCroppedUrlFromBackground = (newURL) => {
		console.log('cropped firing from appContainer')
		this.setState({
			croppedUrl: newURL,
		})
	};

	//tells the rest of the components whether the text component has been selected
	setTextState = () => {
		this.setState({
			textEditOpen: !this.state.textEditOpen,
		})
	};

	//tells the rest of the components what the currently selected font size is
	setFontSize = (fontSize) => {
		this.setState({
			fontSize: parseInt(fontSize, 10)
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

		console.log('appContainer render')
		console.log(this.state.croppedUrl)
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
						croppedUrl={ croppedUrl }
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
						selectedPicture={ selectedPicture }
						croppedUrl={ croppedUrl }
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
