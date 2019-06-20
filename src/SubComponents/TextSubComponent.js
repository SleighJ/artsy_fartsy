import React, { Component } from 'react';
import Colors from '../Static/Colors';

import { Grid, Dropdown } from "semantic-ui-react";
import { SketchPicker } from 'react-color';

import Fonts from "../Static/Fonts";

class TextSubComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fontSize: 20,
			fontFamily: 'Roboto',
			selectedTextEdit: null,
			textEditObj: null,
			openFontColors: false,
			textColor: 'black',
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		//if incoming selectedTextEdit value does not equal the current selectedTextEdit value (user is selecting a (possibly different) text component(s))
		if (this.props.selectedTextEdit != this.state.selectedTextEdit) {

			//decide what the font size and family should be -> if there is an incoming font size/font family value, use it, or else just set it to 20/Roboto.
			let fontSize = this.props.textEditObj.fontSize ? this.props.textEditObj.fontSize : 20;
			let fontFamily = this.props.textEditObj.fontFamily ? this.props.textEditObj.fontFamily : 'Roboto';
			let textColor = this.props.textEditObj ? this.props.textEditObj.textColor : this.state.textColor;

			//save the id of selectedTextEdit, its corresponding data, its fontSize and its fontFamily
			this.setState({
				selectedTextEdit: this.props.selectedTextEdit,
				textEditObj: this.props.textEditObj,
				fontSize: fontSize,
				fontFamily: fontFamily,
				textColor: textColor,
				//tell parent that fontSize, fontFamily, and textColor has changed
			}, this.props.setFontSize(fontSize),
				this.props.setFont(fontFamily),
				this.props.getTextColor(textColor)
			)
		}
		// allows text color to default to black
		if (prevProps.textColor != this.props.textColor) {
			this.setState({
				textColor: this.props.textColor,
			})
		}
		// communicates with DOM actions in canvas.js/text.js for switching from one color to the next
		if (this.state.textColor != prevState.textColor) {
			this.props.getTextColor(this.state.textColor);
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

	openTextColor = () => {
		this.setState({
			openFontColor: !this.state.openFontColor,
		})
	};

	selectColor = (color) => {
		const selectedColor = color.hex;

		this.setState({
			textColor: selectedColor,
		})
	};

	render() {

		const { fontFamily, fontSize } = this.state;

		// console.log('state and props in TSC');
		// console.log(this.state)
		// console.log(this.props)

		return (
			<Grid style={{backgroundColor: 'transparent', margin: 0}} columns={2}>
				<Grid.Row style={{ marginLeft: '5%', marginRight: '5%'}}>
					<Grid.Column style={{padding: '0' }} width={11}>
						<Dropdown align={'center'} style={{ position: 'fixed', fontSize: '70%', fontFamily: `${ fontFamily }` }} text={`${ fontFamily }`}>
							<Dropdown.Menu style={{marginTop: '10%'}}>
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
				<Grid.Row>
					<SketchPicker
						onChangeComplete={ (e)=>this.selectColor(e) }
						color={ this.state.textColor }
					/>
				</Grid.Row>
			</Grid>
		);
	}
}

export default TextSubComponent;
