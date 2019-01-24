import React, { PureComponent } from 'react';
import SimpleColor from '../Components/SimpleColor';
import RGBAColor from '../Components/RGBAColor';

class Palette extends PureComponent {
	constructor(props) {
		super(props);

		this.getColorSimplePalette.passive = true;

		this.state = {
			activePalette: 0,
			activeSimpleColor: 'purple',
			height: window.innerHeight * .8,
			width: window.innerWidth * .8,
		}
	}

	setPalette = () => {
		this.state.activePalette == 0 ? this.setState({ activePalette: 1 }) : this.setState({ activePalette: 0 });
	};

	getColorSimplePalette = (color) => {
		this.setState({
			activeSimpleColor: color,
		}, this.props.getColorFromPalette(color))
	};

	render() {

		let paletteContainerStyle = {
				height: this.state.height,
				width: this.state.width,
				display: 'inline-block',
				position: 'relative',
				textAlign: 'center'
		};

		const activePalette = {
			0: <SimpleColor getColorSimplePalette={ this.getColorSimplePalette } />,
			1: <RGBAColor />,
		};

		return (
			<div className={ 'palette-container' } style={ paletteContainerStyle }>

				<button
					onClick={ ()=>this.setPalette() }
				>-1</button>

				<button
					onClick={ ()=>this.setPalette() }
				>+1
				</button>

				{ activePalette[this.state.activePalette] }

			</div>
		);
	}
}

export default Palette;
