import React, { PureComponent } from 'react';
import GridContainer from './GridContainer';

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
				</div>
			</div>
		);
	}
}

export default ApplicationContainer;
