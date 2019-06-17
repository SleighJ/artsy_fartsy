import React, { Component, Fragment } from 'react';

import CanvasContainer from './CanvasContainer';
import Sidebar from './Sidebar';
import '../CSS/ApplicationContainer.css';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: '#000080',
			width: 1,
			selectedFont: 'Roboto',
			fontSize: 20,
			fileManagement: false,
			selectedPicture: null,
			background: null,
			imagePreviewRotation: 0,
			croppedUrl: null,
			textEditOpen: false,
			selectedTextEdit: null,
			textEditObj: null,
			textColor: null,
			uploadActive: false,
			paletteColorPickerState: null,
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
		} else {
			return body;
		}
	};

	//allows the rest of the components to know what color is selected
	getColorFromPalette = (color) => {
		this.setState({
			color: color,
		})
	};

	//retrieves last state of color picker so component can re-open with previous state intact
	getPaletteColorPickerState = (colorPickerState) => {
		this.setState({
			paletteColorPickerState: colorPickerState,
		})
	};

	//allows the rest of the components to know what brush size is selected
	getSizeFromBrush = (width) => {
		this.setState({
			width: width,
		})
	};

	//tracks the status of background.js's file upload functionality
	backgroundUploadStatus = (status) => {
		this.setState({
			uploadActive: status,
		})
	};

	//facilitates state changes required to add a background, passes the data to function to add to db
	addBackground = (selectedPicture) => {
		this.setState({ selectedPicture })
	};

	//facilitates state changes to remove a background from background.js
	clearBackground = () => {
		this.setState({
			selectedPicture: null,
		})
	};

	//facilitates state changes to remove a background URL after one has been created (backgroundSubComponent)
	clearCroppedUrl = () => {
		this.setState({
			croppedUrl: null,
		})
	};

	getBackgroundRotation = (rotation) => {
		this.setState({
			imagePreviewRotation: rotation,
		})
	};

	//gets the url for the cropped image from background.js component
	getCroppedUrlFromBackground = (newURL) => {
		this.setState({
			croppedUrl: newURL,
		})
	};

	getBackgroundColor = (color) => {
		this.setState({
			backgroundColor: color,
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

	getTextColor = (color) => {
		this.setState({
			textColor: color,
		})
	};

	render() {

		const {
			color,
			width,
			textEditOpen,
			fontSize,
			selectedTextEdit,
			textEditObj,
			selectedPicture,
			selectedFont,
			croppedUrl,
			textColor,
			imagePreviewRotation,
			backgroundColor,
			uploadActive,
			paletteColorPickerState,
		} = this.state;

		return (
			<div>

				<Fragment>
					<Sidebar
						//functions
						getSizeFromBrush={ this.getSizeFromBrush }
						getColorFromPalette={ this.getColorFromPalette }
						getBackgroundColor={ this.getBackgroundColor }
						clearCroppedUrl={ this.clearCroppedUrl }
						getPaletteColorPickerState={ this.getPaletteColorPickerState }

						//TODO: remove add background from this part of application
						addBackground={ this.addBackground }
						uploadBackground={ this.uploadBackground }
						setTextState={ this.setTextState }
						setFontSize={ this.setFontSize }
						setFont={ this.setFont }
						getTextColor={ this.getTextColor }
						backgroundUploadStatus={ this.backgroundUploadStatus }

						//global state values
						paletteColorPickerState={ paletteColorPickerState }
						fontSize={ fontSize }
						textEditOpen={ textEditOpen }
						selectedTextEdit={ selectedTextEdit }
						textEditObj={ textEditObj }
						croppedUrl={ croppedUrl }
						color={ color }
						width={ width }
					/>
				</Fragment>

				<Fragment>
					<CanvasContainer
						//functions
						addBackground={ this.addBackground }
						setTextState={ this.setTextState }
						getEditTextSelect={ this.getEditTextSelect }
						clearBackground={ this.clearBackground }
						getBackgroundRotation={ this.getBackgroundRotation }
						getCroppedUrlFromBackground={ this.getCroppedUrlFromBackground }

						//global state values
						color={ color }
						width={ width }
						uploadActive={ uploadActive }
						backgroundColor={ backgroundColor }
						selectedPicture={ selectedPicture }
						imagePreviewRotation={ imagePreviewRotation }
						croppedUrl={ croppedUrl }
						textEditOpen={ textEditOpen }
						fontSize={ fontSize }
						selectedFont={ selectedFont }
						textColor={ textColor }
					/>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
