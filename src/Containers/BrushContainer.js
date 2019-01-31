import React, { PureComponent } from 'react';
import Brushes from '../Components/Brushes';

class BrushContainer extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			activeStroke: null,
		}
	}

	render() {

		const { getSizeFromBrush } = this.props;

		return (
			<div className={ 'stroke-density-container' }>
				<Brushes getSizeFromBrush={ getSizeFromBrush } />
			</div>
		);
	}
}

export default BrushContainer;
