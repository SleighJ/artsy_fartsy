import React, { PureComponent } from 'react';
import Colors from '../Static/Colors';

import {Grid, Button, Dropdown} from 'semantic-ui-react';
import Fonts from "../Static/Fonts";

class BackgroundSubComponent extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			uploadActive: false,
			selectedFile: null,
			displayColors: false,
			selectedColor: 'white',
		}
	}

	uploadFile = () => {
		this.setState({
			uploadActive: true,
		}, ()=>this.props.backgroundUploadStatus(true))
	};

	displayColors = () => {
		this.setState({
			displayColors: !this.state.displayColors,
		})
	};

	selectedColor = ({ nativeEvent }) => {
		const { target } = nativeEvent;

		const color = target.style.backgroundColor;

		this.setState({
			selectedColor: color,
		}, ()=>this.props.getBackgroundColor(this.state.selectedColor))
	};

	clearBackground = () => {
		this.setState({
			selectedColor: 'white',
			selectedFile: null,
		}, ()=>this.props.getBackgroundColor(this.state.selectedColor));
	};

	//simple component storing an input for adding files
	render() {
		const { addBackground } = this.props;

		return (
				<Grid align={'center'}>
					<Grid.Row style={{ paddingBottom: '0' }}>
						<Grid.Column>
							<Button onClick={ ()=>this.uploadFile()}>Upload File</Button>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Dropdown style={{ backgroundColor: `${ this.state.selectedColor }`, color: 'lightGrey', width: '8rem', height: '2.8rem', borderRadius: '.3rem' }} placeholder={ 'Pick a Color' } onClick={ ()=>this.displayColors() }>
								<Dropdown.Menu scrolling options={ Colors }>
									{ this.state.displayColors ?
										Colors.map(( color, i ) => {
											let id = `background-color-${ color }-${ i }`;
											return (
												<Dropdown.Item style={{ backgroundColor: `${ color }`, width: '7rem' }} onClick={ this.selectedColor }></Dropdown.Item>
											)
										}) : null
									}
								</Dropdown.Menu>
							</Dropdown>
						</Grid.Column>
					</Grid.Row>
				</Grid>
		);
	}
}

export default BackgroundSubComponent;
