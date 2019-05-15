import React, { PureComponent } from 'react';

import { Grid, Button } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';
import Fonts from "../Static/Fonts";

class BackgroundSubComponent extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			uploadActive: false,
			selectedFile: null,
			fileUploaded: null,
			displayColors: false,
			selectedColor: 'white',
		}
	}

	uploadFile = () => {
		this.setState({
			uploadActive: true,
		}, ()=>this.props.backgroundUploadStatus(true))
	};

	removeFile = () => {
		this.props.clearCroppedUrl();
	};

	setColor = (color) => {
		let selectedColor = color.hex;

		this.setState({
			selectedColor: selectedColor,
			metaColor: color,
		}, ()=>this.props.getBackgroundColor(selectedColor));
	};

	render() {
		const { addBackground } = this.props;

		return (
				<Grid align={'center'}>
					<Grid.Row style={{ paddingBottom: '0' }}>
						<Grid.Column>
							{
							this.props.croppedUrl ?
								<Button onClick={ this.removeFile }>Remove File</Button>
								:
								<Button onClick={ ()=>this.uploadFile()}>Upload File</Button>
							}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<SketchPicker
								color={ this.state.selectedColor ? this.state.selectedColor : 'white' }
								onChangeComplete={ this.setColor }
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
		);
	}
}

export default BackgroundSubComponent;
