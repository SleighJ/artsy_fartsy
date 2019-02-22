import React, { Component } from 'react';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import 'react-image-crop/dist/ReactCrop.css';

// const componentArray = [
// 	'Palette',
// 	'Brushes',
// 	'Background',
// 	'Text',
// ];

const componentArray = [
	{name: 'Palette', component: <Palette/>},
	{name: 'Brushes', component: <BrushContainer/>},
	{name: 'Background', component: 'OH NOOOOOOO'},
	{name: 'Text', component: 'UGGGGGHHHHH'},
];

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

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: null,
		}
	}

	buttonContainerSelect = (id) => {
		let component = componentArray[id].component;

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

	// buttonContainerClicked = (id) => {
	// 	this.setState({
	// 		clicked: id,
	// 	})
	// };

	render() {

		console.log(this.state)
		return (
			<div style={{ backgroundColor: 'lightGrey', width: '13%', height: '100%', position: 'fixed' }}>
				{
					componentArray.map((component, i) => {
						let id = i;
						return (
							<div
								// onClick={ ()=>this.buttonContainerClicked(component) }
								onMouseOver={ ()=>this.buttonContainerSelect(id) }
								onMouseLeave={ ()=>this.buttonContainerUnSelect() }
								style={
									this.state.hovered == id ?
									hoveredButtonContainerStyle :
									buttonContainerStyle
								}
							>
								<button id={ id } style={ buttonStyle }>{ component.name }</button>

								{
									this.state.hovered == id ?
									<div
										style={{width: 'inherit', height: 'fit-content', border: '1px solid black' }}
									>
										{ component.name }
										{ component.component }
									</div> :
									null
								}

							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Sidebar;
