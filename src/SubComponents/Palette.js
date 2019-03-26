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

	handleHover = ({nativeEvent}) => {
		const { target } = nativeEvent;
		let id = target.id;

		this.setState({
			hovered: id,
		})
	};

	//tells parent which color is selected
	provideColorToParent = ({nativeEvent}) => {

		const { target } = nativeEvent;

		let color = target.style.backgroundColor;

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

							let highlightedColorStyle = {
								backgroundColor: color,
								height: '1.5rem',
								width: '100%',
								border: '4px solid white',
								display: 'inline-flex',
								lineHeight: '0px',
								fontSize: '0px'
							};

							let id = `color-wrapper-${i}`;
							return (
								<div
									id={ id }
									key={ i }
									value={ color }
									onMouseOver={ this.handleHover }
									style={ this.state.hovered == id ? highlightedColorStyle : colorStyle }
									onClick={ this.provideColorToParent }
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
