import React, { PureComponent } from 'react';
import Colors from '../Static/Colors';

let colorWrapperStyle = {
	lineHeight: '0px',
	fontSize: '0px',
	height: '27.75rem',
	overflow: 'scroll',
	border: '10px solid lightgrey'
};

class Palette extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: null,
		}
	}

	//tells parent which color is selected
	provideColorToParent = (e) => {
		let color = e.target.id;

		this.setState({
			color: color,
		}, this.props.getColorFromPalette(color));
	};

	render() {
		
		return (
			<div className={'simple-palette-container'}>
				<div style={ colorWrapperStyle }>
					{
						Colors.map(( color, i ) => {

							let colorStyle = {
								backgroundColor: color,
								height: '1.5rem',
								width: '100%',
								border: '1px solid black',
								display: 'inline-flex',
								lineHeight: '0px',
								fontSize: '0px'
							};

							let id = i;
							return (
								<div
									id={ color }
									key={ id }
									style={ colorStyle }
									onClick={ (e)=>this.provideColorToParent(e) }
								>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default Palette;
