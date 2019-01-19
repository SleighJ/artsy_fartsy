import React, { PureComponent } from 'react';
import GridContainer from './GridContainer';
import Palette from './Palette';

class ApplicationContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: null,
		}
	}

	getColorFromPalette = (color) => {
		this.setState({
			color: color,
		})
	};

	render() {
		console.log(this.state)
		return (
			<div style={{ alignItems: 'center' }}>
				<div>Whats up G? Dis App Container</div>
				<div>
					<GridContainer
						color={ this.state.color }
					/>
					<Palette
						getColorFromPalette={ this.getColorFromPalette }
					/>
				</div>
			</div>
		);
	}
}

export default ApplicationContainer;
