import React, { Component, Fragment } from 'react';
import CanvasContainer from './CanvasContainer';
import Palette from './Palette';
import BrushContainer from './BrushContainer';
import '../CSS/ApplicationContainer.css';

class ApplicationContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: 'white',
			size: null,
			data: null,
			guide: 0,
			fileManagement: false,
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

	getSizeFromBrush = (width) => {
		this.setState({
			width: width,
		})
	};

	nextGuide = () => {
		let currentGuideState = this.state.guide;

		if (currentGuideState < 1) {
			this.setState({
				guide: currentGuideState+1,
			})
		} else {
			this.setState({
				guide: 0,
			})
		}
	};

	openFileManagement = () => {
		this.setState({
			fileManagement: true,
		})
	};

	addBackground = (e) => {
		let pic = e.target.files;
		console.log(pic[0].name)
		this.setState({
			pic: pic,
		})
	};

	render() {

		const { color, width } = this.state;

		return (
			<div>

				<Fragment>
					<div className="main">

						<div className='rotating-master-guide'>

							<button onClick={ ()=>this.openFileManagement() }>Add Background</button>
								{ this.state.fileManagement ? <input type={'file'} onChange={ (e)=>this.addBackground(e) }></input> : null }
							<button onClick={ ()=>this.nextGuide() }>{ this.state.guide < 1 ? 'Stroke Size' : 'Color Palette' }</button>

							{ this.state.guide == 0 ?
								<div className="color-guide">
									<h5>Colors</h5>
									<Palette getColorFromPalette={ this.getColorFromPalette }/>
								</div>
								:
								<div className="brush-guide">
									<h5>Brushes</h5>
									<BrushContainer getSizeFromBrush={ this.getSizeFromBrush } />
								</div>
							}

						</div>

						<div className={'canvas-container-master'}>
							<CanvasContainer color={ color } width={ this.state.width } />
							{this.state.pic ? <img src={this.state.pic}></img> : null}
						</div>

					</div>
				</Fragment>

			</div>
		);
	}
}

export default ApplicationContainer;
