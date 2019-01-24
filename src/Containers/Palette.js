import React, { PureComponent } from 'react';
import SimpleColor from '../Components/SimpleColor';

class Palette extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			activeSimpleColor: null,
		}
	}

	getColorSimplePalette = (color) => {
		this.setState({
			activeSimpleColor: color,
		}, this.props.getColorFromPalette(color))
	};

	render() {

		return (
			<div className={ 'palette-container' }>
				<SimpleColor getColorSimplePalette={ this.getColorSimplePalette } />,
			</div>
		);
	}
}

export default Palette;
