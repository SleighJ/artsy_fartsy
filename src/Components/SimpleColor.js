import React, { PureComponent } from 'react';
import Colors from '../Static/Colors';

class SimpleColor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: 'purple',
		}
	}

	provideColorToParent = (e) => {
		let color = e.target.id;

		this.setState({
			color: color,
		}, this.props.getColorSimplePalette(color));
	};

	render() {

		const { color } = this.state;

		let currentColorStyle = {
			backgroundColor: `${ color }`,
			border: '2px solid red',
			height: '20px',
			width: '20px',
		};

		let palletteContainerStyle = {
			height: 'fit-contents',
			width: window.innerWidth * .5,
			display: 'inline-block',
			position: 'relative',
			border: '1px solid red',
			alignItems: 'center',
		};

		return (
			<div className={'palette-container'} style={ palletteContainerStyle }>
				<div>SimpleColor</div>
				<div className={ 'current-color' } style={ currentColorStyle }></div>
				<div style={{lineHeight: '0px', fontSize: '0px'}}>
					{
						Colors.map(( color, i ) => {
							let style = { backgroundColor: color, height: '5px', width: '5px', border: '1px solid black', display: 'inline-flex', lineHeight: '0px', fontSize: '0px'};
							let id = i;
							return (
								<div
									id={ color }
									key={ id }
									style={ style }
									onClick={ (e)=>this.provideColorToParent(e) }
								>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default SimpleColor;
