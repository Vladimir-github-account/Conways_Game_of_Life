import React     from 'react';
import PropTypes from 'prop-types';

function Button(props) {
	const { label, styles, clickHandler } = props;
	return (
			<button className={ styles }
			     onClick={ clickHandler }>
				{ label }
			</button>
	);
}

Button.propTypes = {
	clickHandler: PropTypes.func,
	label: PropTypes.string,
	styles: PropTypes.any
};

export default Button;