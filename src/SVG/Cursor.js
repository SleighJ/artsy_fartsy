import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";

class Cursor extends Component {
	render() {
		return (
				<FontAwesomeIcon icon={ faPaintBrush }></FontAwesomeIcon>
		)
	}
};

export default Cursor;