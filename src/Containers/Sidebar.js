import React, { Component } from 'react';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
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

const sideBarContainer = {
	backgroundColor: 'lightGrey',
	width: '13%',
	height: '100%',
	position: 'fixed',
};

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: null,
			clicked: null,
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
					component: 'OH NOOOOOOO'
				},
				{
					name: 'Text',
					component: null,
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

	buttonClickSelect = (id) => {
		const textComponentId = 3;

		if (id != this.state.clicked) {
			id == textComponentId ? this.props.setTextState() : console.log('hi');
			this.setState({
				clicked: id,
			})
		} else {
			id == textComponentId ? this.props.setTextState() : console.log('hi');
			this.setState({
				clicked: null,
			})
		}
	};

	render() {

		return (
			<div style={ sideBarContainer }>
				{
					this.state.componentArray.map((component, i) => {
						let id = i;
						return (
							<div
								onMouseOver={ ()=>this.buttonContainerSelect(id) }
								onMouseLeave={ ()=>this.buttonContainerUnSelect() }
								onClick={ ()=>this.buttonClickSelect(id) }
								style={ this.state.clicked == id ? clickedButtonContainerStyle : this.state.hovered == id ? hoveredButtonContainerStyle : buttonContainerStyle }
							>
								<button id={ id } style={ buttonStyle }>{ component.name }</button>

								{ this.state.clicked == id ? <div style={ componentContainerStyle }>{ component.component }</div> : null }

							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Sidebar;
