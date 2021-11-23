import React, { Component } from 'react';
import styles               from './gridStyles.module.scss';

class Grid extends Component {
	constructor(props) {
		super( props );
		this.state = {};
	};

	renderGrid(props) {
		const { gridContainer, gridItem } = styles;
		const getFieldsArray = (rows, cols) => {
			let content = [];
			for (let i = 0; i < rows * cols; i++) {
				content.push(
						<div key={ i }
						     className={ gridItem }>{ i + 1 }</div>
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