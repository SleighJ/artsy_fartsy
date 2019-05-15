import React, { Component } from "react";

import { Grid } from 'semantic-ui-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";

const SideBarLogo = (props) => {
	return (
		<div style={{ width: '100%', height: '9rem', marginBottom: '25%', marginTop: '25%'}}>
			<Grid>
				<Grid.Row style={{margin: '10%'}} columns={1}>
					<Grid.Column align={'center'}>
						<div style={{ width: '5rem', height: '5rem', border: '10px solid black', borderRadius: '50%'}}>
							<FontAwesomeIcon icon={ faPaintBrush } style={{ height: '2rem', width: '2rem', color: `${ props.brushColor }`, margin: '.65rem'}}></FontAwesomeIcon>
						</div>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
};

export default SideBarLogo;