import React      from 'react';
import PropTypes  from 'prop-types';
import styles     from './fieldStyles.module.sass';
import classNames from 'classnames';

const Field = props => {
	const { fieldItem, blackField, whiteField } = styles;
	const { elementNumber, gridValues, clickHandler } = props;
	const fieldTypeStyles = gridValues[ elementNumber ] ? blackField : whiteField;
	const fieldStyles = classNames( fieldTypeStyles, fieldItem );
	const clickHandlerWithElement = clickHandler( elementNumber );
	return (
			<div key={ elementNumber }
			     className={ fieldStyles }
			     onClick={ clickHandlerWithElement }>
				{  }
			</div>
	);
};

Field.propTypes = {};

export default Field;