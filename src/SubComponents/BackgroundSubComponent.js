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
					<Grid.Row>
						<Grid.Column>
							<SketchPicker
								color={ this.state.selectedColor ? this.state.selectedColor : 'white' }
								onChangeComplete={ this.setColor }
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row style={{ paddingTop: '0', paddingBottom: '10%' }}>
						<Grid.Column>
							{
							this.props.croppedUrl ?
								<div style={{ margin: '1rem', borderRadius: '.5rem', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px' }}>
									<Button style={{ backgroundColor: 'white' }} onClick={ this.removeFile }>Remove Image</Button>
								</div>
								:
								<div style={{ marginLeft: '.25rem', marginRight: '.25rem', marginTop: '0', borderRadius: '.5rem', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px'}}>
									<Button style={{ backgroundColor: 'white' }} onClick={ ()=>this.uploadFile()}>Upload Image</Button>
								</div>
							}
						</Grid.Column>
					</Grid.Row>
				</Grid>
		);
	}
}

export default BackgroundSubComponent;
