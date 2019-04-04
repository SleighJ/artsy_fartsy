import React, { PureComponent } from 'react';
import Colors from '../Static/Colors';
class BackgroundSubComponent extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectedFile: null,
			displayColors: false,
			selectedColor: 'transparent',
		}
	}

	handleBackgroundFile = (file) => {
		this.setState({
			selectedFile: file,
		}, ()=>this.props.addBackground(file))
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
			selectedColor: 'transparent',
			selectedFile: null,
		}, ()=>this.props.getBackgroundColor(this.state.selectedColor));
	};


	//simple component storing an input for adding files
	render() {
		const { addBackground } = this.props;

		return (
			<div>
				<input type={'file'} id={ 'backgroundInput' } onChange={ (e)=>this.handleBackgroundFile(e.target.files[0]) } multiple={ false } accept={ '.png' }></input>
					<div style={{ border: '1px solid black', height: '20px', width: '20px', display: 'inline-block', backgroundColor: `${ this.state.selectedColor }` }} onClick={ ()=>this.displayColors() }>
						{
							this.state.displayColors ?
								Colors.map(( color, i ) => {
									let id = `background-color-${color}`;
									return (
										<div
											id={ id }
											onClick={ this.selectedColor }
											style={{
												display: 'inline-block',
												height: '20px',
												width: '20px',
												backgroundColor: `${ color }`
											}}
										></div>
									)
								})
							: null
						}
					</div>
				<button onClick={ ()=>this.clearBackground() }>Clear</button>
			</div>
		);
	}
}

export default BackgroundSubComponent;
