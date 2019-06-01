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

			<div style={{ marginTop: '1rem', borderRadius: '.5rem', backgroundColor: 'white' }}>
			<div className={'brush-container'} style={{display: 'flex', backgroundColor: 'white', alignItems: 'center', height: '3.75rem', margin: '.25rem' }}>
				{
					this.state.widthArray.map((entry, i) => {
						let id = `brush-wrapper-${i}`;
						let size = i + 1;
						let iconStyle = {
								color: this.props.color,
								height: `${entry}rem`,
								width: '100%',
							};
						return (
							<div
								key={ i }
								id={ id }
								style={ this.state.hovered == id ? { backgroundColor: 'grey', display: 'inherit', height: '80%', alignItems: 'inherit', borderRadius: '20%', } : { alignItems: 'center' } }
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
			</div>
		);
	}
}

export default Brushes;
