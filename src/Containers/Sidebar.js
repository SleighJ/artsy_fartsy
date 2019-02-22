import React, { Component } from 'react';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import 'react-image-crop/dist/ReactCrop.css';

const componentArray = [ 'Palette', 'Brushes', 'Background', 'Text' ];

class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ backgroundColor: 'lightGrey', width: '7.5%', height: '100%', position: 'fixed' }}>
				{
					componentArray.map((component) => {
						return (
							<button style={{ border: 'none', backgroundColor: 'inherit', color: 'white', fontFamily: 'helvetica', fontSize:' 12px', fontStyle: 'italic', fontWeight: 'bold' }}>{component}</button>
						)
					})
				}
			</div>
		);
	}
}

export default Sidebar;
