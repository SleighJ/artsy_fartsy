import React, { PureComponent } from 'react';

import { Grid, Dropdown } from "semantic-ui-react";
import Fonts from "../Static/Fonts";

class TextSubComponent extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			fontSize: 20,
			fontFamily: 'Roboto',
		}
	}

	setFontSizeState = (fontSize) => {
		this.setState({
			fontSize: fontSize,
		});

		this.props.setFontSize(fontSize);
	};

	setFontFamilyState = (fontFamily) => {
		this.setState({
			fontFamily: fontFamily,
		});

		this.props.setFont(fontFamily);
	};

	render() {

		return (
			<Grid style={{ backgroundColor: 'transparent' }} columns={2}>
				<Grid.Row>
					<Grid.Column width={9}>
						<Dropdown placeholder={ this.state.fontFamily }>
							<Dropdown.Menu>
								{ Fonts.map((font, i) => { return (
									<Dropdown.Item
										key={i}
										onClick={ (e)=>this.setFontFamilyState(e.target.textContent) }
										style={{ fontFamily: `${font.text}`, fontSize: `${this.state.fontSize}`}}
										{ ...font }
									/>
								) } ) }
							</Dropdown.Menu>
						</Dropdown>
					</Grid.Column>
					<Grid.Column width={7}>
						<input
							style={{ width: '100%' }}
							type={'number'}
							onChange={ (e)=>this.setFontSizeState(e.target.value) }>
						</input>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default TextSubComponent;
