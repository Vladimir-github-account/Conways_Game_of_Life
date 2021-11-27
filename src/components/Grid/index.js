import React, { Component } from 'react';
import styles               from './gridStyles.module.scss';
import Field                from '../Field';
import _                    from 'lodash';
import { COLS, ROWS }       from '../../constants';
import Sidebar              from '../Sidebar';

class Grid extends Component {
	constructor(props) {
		super( props );
		this.intervalID = null;
		this.state = {
			gridValues: Array( ROWS * COLS ).fill( true )
		};
	};

	changeGrid = (e) => {
		if ( this.intervalID ) {
			return;
		}
		this.intervalID = setInterval( this.oneStepChange, 100 );
	};

	stopChange = e => {
		clearInterval( this.intervalID );
		this.intervalID = null;
	};

	clickHandler = (elementNumber) => {
		return (e) => {
			const state = _.clone( this.state );
			state.gridValues[ elementNumber ] = !state.gridValues[ elementNumber ];
			this.setState( state );
		};
	};

	oneStepChange = (e) => {
		const currentState = _.clone( this.state );
		const adjacentSquaresArr = [-COLS - 1, -COLS, -COLS + 1, -1, 1, COLS + 1, COLS, COLS - 1];
		const changedCells = [];
		const { gridValues } = this.state;


		const oppositeCells = (index) => {
			return adjacentSquaresArr.filter( el => {
				const adjacentCellIndex = index + el;
				return adjacentCellIndex >= 0 && adjacentCellIndex < gridValues.length
				       ? gridValues[ index + el ] === false
				       : false;
			} );
		};

		currentState.gridValues.forEach( (element, index) => {
			let oppositeCellsArr;
			if ( element ) {
				oppositeCellsArr = oppositeCells( index );
				if ( oppositeCellsArr.length === 3 ) {
					changedCells.push( index );
				}
			} else {
				oppositeCellsArr = oppositeCells( index );
				if ( oppositeCellsArr.length < 2 || oppositeCellsArr.length > 3 ) {
					changedCells.push( index );
				}
			}
		} );
		changedCells.forEach( el => {
			currentState.gridValues[ el ] = !currentState.gridValues[ el ];
		} );
		this.setState( currentState );
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

		return <div className={ gridContainer }>{ getFieldsArray( ROWS, COLS ) }</div>;
	}


	render() {
		return <>
			{ this.renderGrid() }
			<Sidebar startHandler={ this.changeGrid }
			         stopHandler={ this.stopChange }/>
		</>;

	}
}

export default Grid;