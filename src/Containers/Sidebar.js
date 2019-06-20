import React, { Component } from 'react';
//Components
import Text from '../Components/Text';
import Background from '../Components/Background';
//SubComponents
import Palette from '../SubComponents/Palette';
import Brushes from '../SubComponents/Brushes';
import SideBarLogo from '../SubComponents/SideBarLogo';
//npm
import 'react-image-crop/dist/ReactCrop.css';
import SubComponentContainer from "./SubComponentContainer";
import { Button, Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faPaintBrush, faImage, faFont } from "@fortawesome/free-solid-svg-icons";

const iconStyle = {
	marginLeft: '1rem',
	marginRight: '1rem',
	color: 'white',
	fontSize: '22px',
};

const buttonStyle = {
	marginTop: '.5rem',
	marginBottom: '.5rem',
	padding: '0',
	border: 'none',
	backgroundColor: 'inherit',
	color: 'white',
	fontFamily: 'Larsseit, Roboto, Verdana',
	fontSize:' 20px',
	fontWeight: 'bold',
};

const buttonContainerStyle = {
	marginLeft: '1rem',
	marginTop: '.5rem',
	marginBottom: '.5rem',
	padding: '0',
	alignItems: 'center',
};

const hoveredButtonContainerStyle = {
	padding: '0',
	marginLeft: '1rem',
	marginRight: '1rem',
	backgroundColor: 'grey',
	alignItems: 'center',
	marginTop: '.5rem',
	marginBottom: '.5rem',
};

const clickedButtonContainerStyle = {
	padding: '0',
	backgroundColor: 'grey',
	marginLeft: '1rem',
	marginRight: '1rem',
	marginTop: '.5rem',
	marginBottom: '.5rem',
	alignItems: 'center',
};

const componentContainerStyle = {
	width: 'inherit',
	height: 'fit-content',
	backgroundColor: 'lightGrey',
	color: 'white',
};

const sidebarOpen = {
	backgroundColor: 'lightGrey',
	width: '17%',
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
					icon: faPalette,
				},
				{
					name: 'Background',
					icon: faImage,
				},
				{
					name: 'Text',
					icon: faFont,
				},
			]
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		//if new subcomponent is clicked, tell the parenting container so subComponent functionality turns on/off on selection
		if (prevState.clicked != this.state.clicked) {
			this.props.clickedSubComponent(this.state.clicked);
		}

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
		const textComponentId = 2;

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

		// console.log('state and props in SIDEBAR');
		// console.log(this.state)
		// console.log(this.props)
		// console.log('clicked in sidebar');
		// console.log(clicked)

		return (
			<div style={ sidebarOpen }>
				<SideBarLogo
					brushColor={ this.state.color }
					backgroundColor={ null }
				/>
				<div>
					{
						this.state.subComponentArray.map((subComponent, i) => {
							let id = i;
							return (
								<div>
									<Grid>

										<Grid.Row
											column={2}
											id={ id }
											key={ i }
											onMouseOver={ ()=>this.buttonContainerSelect(id) }
											onMouseLeave={ ()=>this.buttonContainerUnSelect() }
											onClick={ (e)=>this.buttonClickSelect(e.target.id, id) }
											style={ this.state.clicked == id ? clickedButtonContainerStyle : this.state.hovered == id ? hoveredButtonContainerStyle : buttonContainerStyle }
										>
											<div className={'inner-row-element-container'} style={{ display: 'flex', marginTop: '.5rem', marginBottom: '.5rem', marginLeft: '1rem', alignItems: 'center' }}>
												<Grid.Column>
													<FontAwesomeIcon style={ iconStyle } icon={subComponent.icon} />
												</Grid.Column>

												<Grid.Column>
													<Button id={ id } style={ buttonStyle }>{ subComponent.name }</Button>
												</Grid.Column>
											</div>

										</Grid.Row>

										<div className={'subcomponent-container'}>
											{
												clicked == id ?
													<div style={ componentContainerStyle }>
														<SubComponentContainer
															clicked={ this.state.clicked }
															getColorFromPalette={ this.props.getColorFromPalette }
															getPaletteColorPickerState={ this.props.getPaletteColorPickerState }
															paletteColorPickerState={ this.props.paletteColorPickerState }
															color={ this.props.color }
															getSizeFromBrush={ this.props.getSizeFromBrush }
															addBackground={ this.props.addBackground }
															getTextColor={ this.props.getTextColor }
															getBackgroundColor={ this.props.getBackgroundColor }
															backgroundUploadStatus={ this.props.backgroundUploadStatus }
															croppedUrl={ this.props.croppedUrl }
															clearCroppedUrl={ this.props.clearCroppedUrl }

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
									</Grid>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default Sidebar;
