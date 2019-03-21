import React, { PureComponent } from 'react';

class BackgroundSubComponent extends PureComponent {
	constructor(props) {
		super(props);
	}

	//simple component storing an input for adding files
	render() {
		const { addBackground } = this.props;

		return (
			<div>
				<input type={'file'} id={ 'backgroundInput' } onChange={ (e)=>addBackground(e.target.files[0]) } multiple={ false } accept={ '.png' }></input>
			</div>
		);
	}
}

export default BackgroundSubComponent;
