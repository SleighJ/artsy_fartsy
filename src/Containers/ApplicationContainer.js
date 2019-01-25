import React, { Component, Fragment } from 'react';
import CanvasContainer from './CanvasContainer';
import Palette from './Palette';
import '../CSS/ApplicationContainer.css';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: null,
			data: null,
		}
	}

	componentDidMount() {
		// Call our fetch function below once the component mounts
		this.callBackendAPI()
			.then(res => this.setState({ data: res.express }))
			.catch(err => console.log(err));
	}
	// Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
	callBackendAPI = async () => {
		const response = await fetch('/paint');
		const body = await response.json();

		if (response.status !== 200) {
			throw Error(body.message)
		}
		return body;
	};


	getColorFromPalette = (color) => {
		this.setState({
			color: color,
		})
	};

	render() {

		const { color } = this.state;

		return (
			<div>

				<Fragment>
					<h3 style={{ textAlign: 'center' }}>Dos Paint</h3>
					<div className="main">
						<div className="color-guide">
							<h5>Color Guide</h5>
							<Palette getColorFromPalette={ this.getColorFromPalette } />
							<div className="user user">User</div>
							<div className="user guest">Guest</div>
						</div>
						<CanvasContainer color={ color } />
					</div>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
