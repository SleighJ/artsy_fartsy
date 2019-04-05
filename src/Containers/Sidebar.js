import React, { Component } from 'react';
//Components
import Text from '../Components/Text';
import Background from '../Components/Background';
//SubComponents
import BackgroundSubComponent from '../SubComponents/BackgroundSubComponent';
import TextSubComponent from "../SubComponents/TextSubComponent";
import Palette from '../SubComponents/Palette';
import Brushes from '../SubComponents/Brushes';
//npm
import 'react-image-crop/dist/ReactCrop.css';
import { Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import SubComponentContainer from "./SubComponentContainer";

const buttonStyle = {
	border: 'none',
	backgroundColor: 'inherit',
	color: 'white',
	fontFamily: 'helvetica',
	fontSize:' 12px',
	fontStyle: 'italic',
	fontWeight: 'bold',
	display: 'list-item'
};

const buttonContainerStyle = {
	margin: '10%',
	textAlign: 'center',
};

const hoveredButtonContainerStyle = {
	margin: '10%',
	textAlign: 'center',
	backgroundColor: 'grey',
};

const clickedButtonContainerStyle = {
	border: 'none',
	backgroundColor: 'grey',
	color: 'white',
	fontFamily: 'helvetica',
	fontSize:' 12px',
	fontStyle: 'italic',
	fontWeight: 'bold',
	margin: '10%',
};

const componentContainerStyle = {
	width: 'inherit',
	height: 'fit-content',
	backgroundColor: 'lightGrey',
	color: 'white',
};

const sidebarOpen = {
	backgroundColor: 'lightGrey',
	width: '13%',
	height: '100%',
	position: 'fixed',
};

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: true,
			hovered: null,
			clicked: null,
			fontSize: null,
			croppedUrl: null,
			color: null,
			subComponentArray: [
				{
					name: 'Palette',
				},
				{
					name: 'Brushes',
				},
				{
					name: 'Background',
				},
				{
					name: 'Text',
				},
			]
		}
	}

	componentDidUpdate = (prevProps) => {
		//if the incoming value of croppedUrl does not equal that of the local state, set it to the local state and close the subcomponent div
		if (this.props.croppedUrl != this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
				clicked: null,
			})
		}

		//if incoming value of color does not equal that of the local state, update the local state with it
		if (this.props.color != this.state.color) {
			this.setState({
				color: this.props.color,
			})
		}

		//if incoming value of width does not equal that of the local state, update the local state with it
		if (this.props.width != this.state.width) {
			this.setState({
				width: this.props.width,
			})
		}

	};

	//highlights the button for the subComponent
	buttonContainerSelect = (id) => {
		this.setState({
			hovered: id,
		})
	};

	//handles hovered styling
	buttonContainerUnSelect = () => {
		this.setState({
			hovered: null,
		})
	};

	//handles the selection of components and communicating local state changes to the rest of the application
	buttonClickSelect = (target, id) => {
		const textComponentId = 3;

		//if anything has been clicked
		if (this.state.clicked) {
			//if this command is coming from the text component, turn on text
			if (textComponentId == id || this.state.clicked == textComponentId) {
				this.props.setTextState()
			}

			//if what was passed to me is what was previously clicked
			if (this.state.clicked == id) {
				//set clicked to null and close it
				this.setState({
					clicked: null,
				})
			}
			//if what was passed to me is not what was previously clicked
			else {
				//set what was passed to me to be clicked
				this.setState({
					clicked: id,
				});
			}
		}
		//if nothing has been clicked
		else {
			//if I get here because I don't know the difference between '0' and 'false'
			if (this.state.clicked === 0) {
				//set clicked to null and close the div
				this.setState(({
					clicked: null,
				}))
			//if I get here because I'm supposed to get here
			} else {
				//if this command is coming from the text component
				if (textComponentId == id) {
					//turn on text
					this.props.setTextState()
				}
				//set clicked to the id and open the subComponent
				this.setState({
					clicked: id,
				})
			}
		}

	};

	render() {

		const { clicked } = this.state;

		return (
			<div style={ sidebarOpen }>
				<div style={{ width: '100%', height: '10%', marginBottom: '25%', marginTop: '25%'}}>
					<Grid>
						<Grid.Row style={{margin: '10%'}} columns={1}>
							<Grid.Column align={'center'}>
								<FontAwesomeIcon icon={ faPaintBrush } style={{ height: '3rem', width: '3rem', color: `${this.state.color}`, margin: 'auto',}}></FontAwesomeIcon>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>

				{
					this.state.subComponentArray.map((subComponent, i) => {
						let id = i;
						return (
							<div>
								<div
									id={ id }
									key={ i }
									onMouseOver={ ()=>this.buttonContainerSelect(id) }
									onMouseLeave={ ()=>this.buttonContainerUnSelect() }
									onClick={ (e)=>this.buttonClickSelect(e.target.id, id) }
									style={ this.state.clicked == id ? clickedButtonContainerStyle : this.state.hovered == id ? hoveredButtonContainerStyle : buttonContainerStyle }
								>
									<button id={ id } style={ buttonStyle }>{ subComponent.name }</button>
								</div>

								<div>
									{
										clicked == id ?
											<div style={ componentContainerStyle }>
												<SubComponentContainer
													clicked={this.state.clicked}
													getColorFromPalette={this.props.getColorFromPalette}
													color={ this.props.color }
													getSizeFromBrush={ this.props.getSizeFromBrush }
													addBackground={ this.props.addBackground }
													getTextColor={ this.props.getTextColor }
													getBackgroundColor={ this.props.getBackgroundColor }
													backgroundUploadStatus={ this.props.backgroundUploadStatus }

													//for text
													selectedTextEdit={this.props.selectedTextEdit}
													setFont={ this.props.setFont }
													setFontSize={ this.props.setFontSize }
													textEditObj={ this.props.textEditObj }
												/>
											</div>
										: null
									}
								</div>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Sidebar;
