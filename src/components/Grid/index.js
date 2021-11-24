import React, { Component } from 'react';
import styles               from './gridStyles.module.scss';
import Field                from '../Field';
import _                    from 'lodash';

class Grid extends Component {
	constructor(props) {
		super( props );
		this.state = {
			gridValues: Array.from( { length: 256 }, (element, index) => {
				return {
					isBlack: true,
					index,
				};
			} )
		};
	};

	clickHandler = (elementNumber) => {
		return (e) => {
			const state = _.clone( this.state );
			state.gridValues[ elementNumber ].isBlack = !state.gridValues[ elementNumber ].isBlack;
			this.setState( state );
		};
	};

	renderGrid() {
		const { gridContainer } = styles;
		const getFieldsArray = (rows, cols) => {
			let content = [];
			for (let i = 0; i < rows * cols; i++) {
				content.push(
						<Field elementNumber={ i }
						       gridValues={ this.state.gridValues }
						       clickHandler={ this.clickHandler }/>
				);
			}
			return content;
		};

		return <div className={ gridContainer }>{ getFieldsArray( 16, 16 ) }</div>;
	}


	render() {
		return <>
			{ this.renderGrid() }
		</>;

	}
}

export default Grid;