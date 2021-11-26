import React, { Component } from 'react';
import styles               from './gridStyles.module.scss';
import Field                from '../Field';
import _                    from 'lodash';
import { COLS, ROWS }       from '../../constants';

class Grid extends Component {
	constructor(props) {
		super( props );
		this.state = {
			gridValues: Array( ROWS * COLS ).fill( true )
		};
	};

	changeGrid = (e) => {
		const currentState = _.clone( this.state );
		const adjacentSquaresArr = [-COLS - 1, -COLS, -COLS + 1, -1, 1, COLS + 1, COLS, COLS - 1];
		const changedCells = [];

		const oppositeCells = (index) => {
			return adjacentSquaresArr.filter( el => {
				const adjacentCellIndex = index + el;
				return adjacentCellIndex >= 0 && adjacentCellIndex < this.state.gridValues.length
				       ? this.state.gridValues[ index + el ] === false
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

	clickHandler = (elementNumber) => {
		return (e) => {
			const state = _.clone( this.state );
			state.gridValues[ elementNumber ] = !state.gridValues[ elementNumber ];
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

		return <div className={ gridContainer }>{ getFieldsArray( ROWS, COLS ) }</div>;
	}


	render() {
		return <>
			{ this.renderGrid() }
			<button onClick={ (e) => {
				setInterval( this.changeGrid, 200 ); } }>
				START
			</button>
			<button> FINISH</button>
		</>;

	}
}

export default Grid;