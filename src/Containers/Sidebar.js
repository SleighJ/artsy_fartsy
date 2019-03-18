import React, { Component } from 'react';
//Components
import Text from '../Components/Text';
import Background from '../Components/Background';
//SubComponents
import BackgroundSubComponent from '../SubComponents/BackgroundSubComponent';
import TextSubComponent from "../SubComponents/TextSubComponent";
import Palette from '../SubComponents/Palette';
import Brushes from '../SubComponents/Brushes';
//Modules
import 'react-image-crop/dist/ReactCrop.css';

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
			componentArray: [
				{
					name: 'Palette',
					component: <Palette getColorFromPalette={ this.props.getColorFromPalette } />
				},
				{
					name: 'Brushes',
					component: <Brushes getSizeFromBrush={ this.props.getSizeFromBrush } />
				},
				{
					name: 'Background',
					component: <BackgroundSubComponent addBackground={ this.props.addBackground } />
				},
				{
					name: 'Text',
					component: <Text />,
				},
			]
		}
	}

	componentDidUpdate = (prevProps) => {
		console.log('compDidUpdate Sidebar')
		console.log(this.props.croppedUrl, this.state.croppedUrl)
		//if the incoming value of croppedUrl does not equal that of the local state, set it to the local state and close the subcomponent div
		if (this.props.croppedUrl != this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
				clicked: null,
			})
		}
	}

	//selects the component from the state (I know, prob not the best idea - Refactor coming soon!)
	buttonContainerSelect = (id) => {
		let component = this.state.componentArray[id].component;

		this.setState({
			hovered: id,
			component: component,
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
		const backgroundComponentId = 2;

		//if anything has been clicked
		if (this.state.clicked) {
			//if this command is coming from the text component, turn on text
			if (textComponentId == id || this.state.clicked == textComponentId) {
				this.props.setTextState('sidebar buttonClickSelect 2.1')
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
					this.props.setTextState('sidebar buttonClickSelect 0.1')
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
				{
					this.state.componentArray.map((component, i) => {
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
									<button id={ id } style={ buttonStyle }>{ component.name }</button>
								</div>

								<div>{ clicked == id ? <div style={ componentContainerStyle }>{ component.component }</div> : null }</div>
							</div>
					)
					})
				}

				{/* <------------- work around to allow textSubComponent to receive props via state of parent -----------------> */}
				{ this.state.clicked == 3 ?
					<TextSubComponent
						id={'textSubComponent'}
						selectedTextEdit={this.props.selectedTextEdit}
						setFont={ this.props.setFont }
						setFontSize={ this.props.setFontSize }
						selectedTextEdit={ this.props.selectedTextEdit }
						textEditObj={ this.props.textEditObj }
					/>
				: null
				}

			</div>
		);
	}
}

export default Sidebar;
