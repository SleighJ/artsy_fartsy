import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

class Brushes extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			widthArray: [],
			hovered: null,
		}
	}

	//simple way to provide values for the sizes of brush
	componentWillMount = () => {
		let widthArray = [];

		for (let i = 0; i<7; i++) {
			if (i >0) {
				widthArray.push(i * .2);
			}
		}

		this.setState({
			widthArray: widthArray,
		})
	};

	handleHovered = ({nativeEvent}) => {

		const { target } = nativeEvent;

		this.setState({
			hovered: target.id,
		})
	};

	render() {

		return (

			<div style={{display: 'flex'}}>
				{
					this.state.widthArray.map((entry, i) => {
						let id = `brush-wrapper-${i}`;
						let size = i + 1;
						let iconStyle = {
								color: this.props.color,
								height: `${entry}rem`,
								width: '100%',
								marginTop: '1.5rem',
								marginBottom: '1.5rem',
							};
						return (
							<div
								key={ i }
								id={ id }
								style={ this.state.hovered == id ? { backgroundColor: 'grey'} : null }
								onMouseOver={ this.handleHovered }
								onClick={ ()=>this.props.getSizeFromBrush(size) }
							>
								<FontAwesomeIcon
									id={ id }
									style={ iconStyle }
									icon={ faPaintBrush }
									onClick={ ()=>this.props.getSizeFromBrush(size) }
								/>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Brushes;
