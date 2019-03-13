import React, { Component } from 'react';

import Palette from './Palette';
import BrushContainer from './BrushContainer';
import Text from '../Components/Text';
import Background from '../Components/Background';
import TextSubComponent from "../SubComponents/TextSubComponent";

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

const sidebarClosed = {
	backgroundColor: 'lightGrey',
	width: '3%',
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
			componentArray: [
				{
					name: 'Palette',
					component: <Palette
									getColorFromPalette={ this.props.getColorFromPalette }
							   />
				},
				{
					name: 'Brushes',
					component: <BrushContainer
									getSizeFromBrush={ this.props.getSizeFromBrush }
								/>
				},
				{
					name: 'Background',
					component: <Background
									addBackground={ this.props.addBackground }
							   />,
				},
				{
					name: 'Text',
					component: <Text />,
					subcomponent: <TextSubComponent
									id={'textSubComponent'}
									setFont={ this.props.setFont }
									setFontSize={ this.props.setFontSize }
								  />

				},
			]
		}
	}

	componentDidUpdate = () => {
		console.log('from sidebar update')

		console.log(this.props);
		console.log(this.props.selectedTextEdit)
	}

	buttonContainerSelect = (id) => {
		let component = this.state.componentArray[id].component;

		this.setState({
			hovered: id,
			component: component,
		})
	};

	buttonContainerUnSelect = () => {
		this.setState({
			hovered: null,
		})
	};

	buttonClickSelect = (target, id) => {
		const textComponentId = 3;

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

								<div>{ clicked == id ? <div style={ componentContainerStyle }>{  component.subcomponent && this.props.textEditOpen ? component.subcomponent : component.component }</div> : null }</div>
							</div>
					)
					})
				}
			</div>
		);
	}
}

export default Sidebar;
