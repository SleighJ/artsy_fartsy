import React, { PureComponent } from 'react';
import SimpleColor from '../Components/SimpleColor';
import RGBAColor from '../Components/RGBAColor';

const activePalette = {
	0: <SimpleColor />,
	1: <RGBAColor />,
};

class Palette extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			activePalette: 0,
		}
	}

	setPalette = () => {
		this.state.activePalette == 0 ? this.setState({ activePalette: 1 }) : this.setState({ activePalette: 0 });
	};

	render() {

		return (
			<div className={'palette-container'} style={{height: '100px', width: '100px', border: '1px solid red', alignItems: 'center'}}>

				<button
					onClick={ ()=>this.setPalette() }
				>-1</button>

				<button
					onClick={ ()=>this.setPalette() }
				>+1
				</button>

				{console.log(activePalette[this.state.activePalette])}
				{ activePalette[this.state.activePalette] }
			</div>
		);
	}
}

export default Palette;
