import React, { Component } from 'react';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import Text from '../Components/Text';
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

		console.log(this.props)

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
					component: <input type={'file'} id={ 'backgroundInput' } onChange={ (e)=>this.props.addBackground(e.target.files[0]) } multiple={ false } accept={ '.png' }></input>,
				},
				{
					name: 'Text',
					component: <Text />,
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

		if (id != this.state.clicked) {
			id == textComponentId ? this.props.setTextState() : console.log('setting clicked to id');
			this.setState({
				clicked: id,
			})
		} else if (id == 3 && !target) {
			return;
		}
		 else {
			id == textComponentId ? this.props.setTextState() : console.log(id, this.state.clicked);
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
								id={ id }
								key={ i }
								onMouseOver={ ()=>this.buttonContainerSelect(id) }
								onMouseLeave={ ()=>this.buttonContainerUnSelect() }
								onClick={ (e)=>this.buttonClickSelect(e.target.id, id) }
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
