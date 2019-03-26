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
		//if incoming selectedTextEdit value does not equal the current selectedTextEdit value (user is selecting a (possibly different) text component(s))
		if (this.props.selectedTextEdit != this.state.selectedTextEdit) {

			//decide what the font size and family should be -> if there is an incoming font size/font family value, use it, or else just set it to 20/Roboto.
			let fontSize = this.props.textEditObj.fontSize ? this.props.textEditObj.fontSize : 20;
			let fontFamily = this.props.textEditObj.fontFamily ? this.props.textEditObj.fontFamily : 'Roboto';

			//save the id of selectedTextEdit, its corresponding data, its fontSize and its fontFamily
			this.setState({
				selectedTextEdit: this.props.selectedTextEdit,
				textEditObj: this.props.textEditObj,
				fontSize: fontSize,
				fontFamily: fontFamily,
				//tell parent that fontSize and fontFamily has changed
			}, this.props.setFontSize(fontSize), this.props.setFont(fontFamily))
		}
	};

	//handles setting the local state when font size is changed. Communicates changes to parent
	setFontSizeState = (fontSize) => {
		this.setState({
			fontSize: fontSize,
		}, ()=>this.props.setFontSize(fontSize));
	};

	//handles setting the local state when font is changed. Communicates changes to parent
	setFontFamilyState = (fontFamily) => {
		this.setState({
			fontFamily: fontFamily,
		}, ()=>this.props.setFont(fontFamily));
	};

	render() {

		const { fontFamily, fontSize } = this.state;

		return (
			<Grid style={{backgroundColor: 'transparent', margin: 0}} columns={2}>
				<Grid.Row style={{ marginLeft: '5%', marginRight: '5%'}}>
					<Grid.Column style={{padding: '0'}} width={11}>
						<Dropdown style={{ position: 'fixed', fontSize: '70%', fontFamily: `${ fontFamily }` }} text={`${ fontFamily }`}>
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
					<Grid.Column style={{padding: '0'}} width={5}>
						<input
							style={{width: '100%'}}
							type={'number'}
							id={'TextSubComponent-Size'}
							label={ 'Size' }
							value={ fontSize }
							onChange={ (e) => this.setFontSizeState(e.target.value) }>
						</input>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default TextSubComponent;
