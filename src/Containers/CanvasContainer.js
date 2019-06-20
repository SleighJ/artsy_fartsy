import React, { Component } from 'react';
import Canvas from '../Components/Canvas';
import Text from '../Components/Text';
import Background from "../Components/Background";
import '../Components/CSS/cursor.css';

import { Header, Modal, Grid } from 'semantic-ui-react';
import 'react-image-crop/dist/ReactCrop.css';

class CanvasContainer extends Component {
	constructor(props) {
		super(props);

		this.textCanvasWrapper = React.createRef();

		this.state = {
			selectedPicture: null,
			croppedUrl: null,
			modalOpen: null,
			canvasRef: null,
		}
	}

	//tells component to update if selectedPicture or croppedUrl is passed via props
	componentDidUpdate = () => {
		if (this.props.selectedPicture && !this.state.modalOpen) {
			this.setState({
				modalOpen: true,
			});
		}

		//first iteration
		if (this.props.croppedUrl && !this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
				modalOpen: null,
			})
		}

		//additional iterations (changes background with one already loaded)
		if (this.props.croppedUrl != this.state.croppedUrl) {
			this.setState({
				croppedUrl: this.props.croppedUrl,
				modalOpen: null,
			})
		}
	};

	getRefFromCanvas = (ref) => {
		this.setState({
			canvasRef: ref,
		})
	};

	handleBackgroundFile = (file) => {
		this.setState({
			selectedPicture: file,
		}, ()=>this.props.addBackground(file))
	};

	render() {

		const {
			color,
			width,
			textEditOpen,
			fontSize,
			selectedFont,
			selectedPicture,
			textColor,
			setTextState,
			getEditTextSelect,
			clearBackground,
			getCroppedUrlFromBackground,
			getBackgroundRotation,
			backgroundColor,
			uploadActive,
			// turnOffText,
			selectedSubComponent,
		} = this.props;

		return (
			<div id={'text-canvas-wrapper'} ref={ this.textCanvasWrapper } style={{ margin: 'auto', width: '70%', height: '70%', padding: '50px' }}>

				<Grid>
					<Grid.Column>
						<Grid.Row>
							{ this.props.uploadActive ?
								!this.state.selectedPicture ?
								<Modal open={uploadActive} basic size='small'>
									<Header icon='cloud upload' content='Please Crop Your Background' align={'center'}/>
									<Modal.Content>
										<input type={'file'} id={ 'backgroundInput' } onChange={ (e)=>this.handleBackgroundFile(e.target.files[0]) } multiple={ false } accept={ '.png' }></input>
									</Modal.Content>
								</Modal>
								:
								<Modal open={selectedPicture} basic size='small'>
									<Header icon='cloud upload' content='Please Crop Your Background' align={'center'}/>
									<Modal.Content>
										<Background
											selectedPicture={selectedPicture}
											clearBackground={clearBackground}
											getCroppedUrlFromBackground={getCroppedUrlFromBackground}
											getBackgroundRotation={getBackgroundRotation}
										/>
									</Modal.Content>
								</Modal>
							: null }

							<Text
								fontSize={ fontSize }
								selectedFont={ selectedFont }
								textEditOpen={ textEditOpen }
								textColor={ textColor }
								selectedSubComponent={ selectedSubComponent }
								// turnOffText={ turnOffText }
								setTextState={ setTextState }
								getEditTextSelect={ getEditTextSelect }
								canvasRef={ this.state.canvasRef }
							/>
							<Canvas
								color={ color }
								width={ width != null ? width : 1 }
								backgroundColor={ backgroundColor }
								croppedUrl={ this.state.croppedUrl }
								imagePreviewRotation={ this.props.imagePreviewRotation }
								textEditOpen={ textEditOpen }
								getRefFromCanvas={ this.getRefFromCanvas }
							/>
						</Grid.Row>
					</Grid.Column>
				</Grid>



			</div>
		);
	}
}

export default CanvasContainer;
