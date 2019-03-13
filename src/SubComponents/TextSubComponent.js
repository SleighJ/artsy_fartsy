import React, { Component } from 'react';

import { Grid, Dropdown } from "semantic-ui-react";
import Fonts from "../Static/Fonts";

class TextSubComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fontSize: 20,
			fontFamily: 'Roboto',
			selectedTextEdit: null,
		}
	}

	componentDidUpdate = (prevState, prevProps) => {
		if (this.props.selectedTextEdit != this.state.selectedTextEdit) {
			this.setState({
				selectedTextEdit: this.props.selectedTextEdit,
				fontSize: 20,
			})
		}
	//TODO: handle so a value can be passed from text.js
	};

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

	resetFont = () => {
		this.setState({
			fontSize: 20,
		})
	};


	render() {

		const { fontFamily, fontSize } = this.state;

		return (
			<Grid style={{backgroundColor: 'transparent'}} columns={2}>
				<Grid.Row>
					<Grid.Column width={9}>
						<Dropdown style={{ position: 'fixed', fontFamily: `${this.state.fontSize}` }} text={`${ this.state.fontFamily }`}>
							<Dropdown.Menu>
								{ Fonts.map((font, i) => {
									return (
										<Dropdown.Item
											key={i}
											id={'TextSubComponent-Font'}
											onClick={ (e) => this.setFontFamilyState(e.target.textContent) }
											style={ {fontFamily: `${ font.text }`, fontSize: `12px`} }
											{...font}
										/>
									)
								}) }
							</Dropdown.Menu>
						</Dropdown>
					</Grid.Column>
					<Grid.Column width={7}>
						<input
							style={{width: '100%'}}
							type={'number'}
							id={'TextSubComponent-Size'}
							label={ 'Size' }
							value={ this.state.fontSize }
							onChange={(e) => this.setFontSizeState(e.target.value)}>
						</input>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default TextSubComponent;
