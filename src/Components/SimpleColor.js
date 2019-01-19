import React, { PureComponent } from 'react';
import Colors from '../Static/Colors';

class SimpleColor extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			color: 'black',
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

		let style = {
			backgroundColor: `${ color }`,
			border: '2px solid red',
			height: '20px',
			width: '20px',
		};

		return (
			<div className={'palette-container'} style={{height: '100px', width: '100px', border: '1px solid red', alignItems: 'center'}}>
				<text>SimpleColor</text>
				<div style={ style }></div>
				<div style={{lineHeight: '0px', fontSize: '0px'}}>
					{
						Colors.map(( color, i ) => {
							let style = { backgroundColor: color, height: '5px', width: '5px', border: '1px solid black', display: 'inline-flex', lineHeight: '0px', fontSize: '0px'};
							return (
								<div id={ color } onClick={ (e)=>this.provideColorToParent(e) } style={ style }></div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default SimpleColor;
