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
			textEditObj: null,
		}
	}

	componentDidUpdate = (prevState, prevProps) => {
		// console.log('fromTSC')
		//if incoming selectedTextEdit does not equal selectedTextEdit
		if (this.props.selectedTextEdit != this.state.selectedTextEdit) {
			console.log(this.props.textEditObj)
			// console.log('selectedTextEdit != this.state.selectedTextEdit')
			//decide what the font size should be -> if there is an incoming fontSize, use it, or else just set it to 20.
			let fontSize = this.props.textEditObj.fontSize ? this.props.textEditObj.fontSize : 20;

			// if (fontSize == 20) { console.log('No fontSize was detected, fontSize has been set to 20') }
			//save the id of selectedTextEdit, its corresponding data, and its fontSize
			this.setState({
				selectedTextEdit: this.props.selectedTextEdit,
				textEditObj: this.props.textEditObj,
				fontSize: fontSize,
			}, this.props.setFontSize(fontSize))
		}
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
