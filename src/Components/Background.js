import React, { PureComponent } from 'react';

class Background extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			activeStroke: null,
		}
	}

	render() {

		return (
			<div>
				{/*<input type={'file'} id={ 'backgroundInput' } onChange={ (e)=>this.props.addBackground(e.target.files[0]) } multiple={ false } accept={ '.png' }></input>*/}
			</div>
		);
	}
}

export default Background;
