import React, { PureComponent } from 'react';
import GridContainer from './GridContainer';
import Palette from './Palette';

class ApplicationContainer extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ alignItems: 'center' }}>
				<div>Whats up G? Dis App Container</div>
				<div>
					<GridContainer />
					<Palette />
				</div>
			</div>
		);
	}
}

export default ApplicationContainer;
