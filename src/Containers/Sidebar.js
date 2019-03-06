import React, { Component } from 'react';

import Palette from './Palette';
import BrushContainer from './BrushContainer';
import Text from '../Components/Text';
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
					component: <Palette getColorFromPalette={ this.props.getColorFromPalette } />
				},
				{
					name: 'Brushes',
					component: <BrushContainer getSizeFromBrush={ this.props.getSizeFromBrush } />
				},
				{
					name: 'Background',
					component: <input type={'file'} id={ 'backgroundInput' } onChange={ (e)=>this.props.addBackground(e.target.files[0]) } multiple={ false } accept={ '.png' }></input>,
				},
				{
					name: 'Text',
					component: <Text fontSize={ this.props.fontSize } fontFamily={ this.props.fontFamily } setTextState={ this.props.setTextState } />,
					subcomponent: <TextSubComponent setFont={ this.props.setFont } setFontSize={ this.props.setFontSize } setTextState={ this.props.setTextState } />

				},
			]
		}
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

		if (id == textComponentId) {
			console.log(this.state.clicked)
			if (this.state.clicked == textComponentId) {
				this.setState({
					clicked: null,
				})
			}
			this.props.setTextState()
		}

		if (id != this.state.clicked) {
			this.setState({
				clicked: id,
			});
		}

		if (id != target) {
			return;
		}

		 if (id == this.state.clicked) {
			this.setState({
				clicked: null,
			})
		}
	};

	closeSideBar =	() => {
		this.setState({
			sidebarOpen: !this.state.sidebarOpen,
		})
	};

	render() {

		const { clicked } = this.state;

		console.log(clicked)

		return (
			<div style={ this.state.sidebarOpen ? sidebarOpen : sidebarClosed }>
				<button onClick={ ()=>this.closeSideBar() }>Open/Close</button>
				{
					this.state.componentArray.map((component, i) => {
						let id = i;
						return (
							<div
								id={ id }
								key={ i }
								onMouseOver={ ()=>this.buttonContainerSelect(id) }
								onMouseLeave={ ()=>this.buttonContainerUnSelect() }
								onClick={ (e)=>this.buttonClickSelect(e.target.id, id) }
								style={ this.state.clicked == id ? clickedButtonContainerStyle : this.state.hovered == id ? hoveredButtonContainerStyle : buttonContainerStyle }
							>
								<button id={ id } style={ buttonStyle }>{ component.name }</button>

								{ clicked == id ? <div style={ componentContainerStyle }>{  component.subcomponent && this.props.textEditOpen ? component.subcomponent : component.component }</div> : null }

							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Sidebar;
