import React, { Component } from 'react';
import styles               from './gridStyles.module.scss';
import Field                from '../Field';
import _                    from 'lodash';

class Grid extends Component {
	constructor(props) {
		super( props );
		this.state = {
			gridValues: Array( 256 ).fill( true )
		};
	};

	changeGrid = (e) => {
		const currentState = _.clone( this.state );
		const adjacentSquaresArr = [-17, -16, -15, -1, 1, 15, 16, 17];
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
				//любая черная клетка, если она имеет 3-х белых соседей - оживает
				oppositeCellsArr = oppositeCells( index );
				if ( oppositeCellsArr.length === 3 ) {
					changedCells.push( index );
				}
			} else {
				//если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить;
				//в противном случае, если соседей меньше двух или больше трёх, клетка умирает
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

		return <div className={ gridContainer }>{ getFieldsArray( 16, 16 ) }</div>;
	}


	render() {
		return <>
			{ this.renderGrid() }
			<button onClick={ this.changeGrid }/>
		</>;

	}
}

export default Grid;