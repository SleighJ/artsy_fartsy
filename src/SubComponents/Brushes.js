import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';


class SimpleColor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			widthArray: [],
			lineWidth: null,
		}
	}

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

	provideSizeToParent = (id) => {
		this.props.getSizeFromBrush(id)
	};

	render() {

		return (
			<div style={{lineHeight: '0', fontSize: '0', height: 'fit-content', overflow: 'scroll', border: '10px solid lightgrey', textAlign: 'center'}}>

				{
					this.state.widthArray.map((entry, i) => {
						let id = i;
						let style;
							style = {
								height: `${entry}rem`, width: '100%', marginTop: '1.5rem', marginBottom: '1.5rem'
							};
						return (
							<div key={ i } id={ id } onClick={ ()=>this.provideSizeToParent(id) }>
								<FontAwesomeIcon id={ id } style={ style } icon={ faPaintBrush } onClick={ ()=>this.provideSizeToParent(id) } />
							</div>
						)
					})
				}

			</div>
		);
	}
}

export default SimpleColor;
