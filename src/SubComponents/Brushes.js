import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';

let brushWrapperStyle = {
	lineHeight: '0',
	fontSize: '0',
	height: 'fit-content',
	overflow: 'scroll',
	border: '10px solid lightgrey',
	textAlign: 'center',
};


class Brushes extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			widthArray: [],
			lineWidth: null,
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

	render() {

		return (

			<div style={brushWrapperStyle}>
				{ this.state.widthArray.map((entry, i) => {
						let id = i;
						let style;
							style = {
								height: `${entry}rem`,
								width: '100%',
								marginTop: '1.5rem',
								marginBottom: '1.5rem',
							};
						return (
							<div key={ i } id={ id } onClick={ ()=>this.props.getSizeFromBrush(id) }>
								<FontAwesomeIcon id={ id } style={ style } icon={ faPaintBrush } onClick={ ()=>this.props.getSizeFromBrush(id) } />
							</div>
						)
					}) }
			</div>
		);
	}
}

export default Brushes;
