import React      from 'react';
import styles     from './sidebarStyles.module.sass';
import classNames from 'classnames';
import Button     from '../Button';


function Sidebar(props) {
	const { startHandler, stopHandler } = props;
	const { sidebar, hidden, button } = styles;
	const sidebarStyles = classNames( sidebar, hidden );

	const mouseEnterHandler = e => {
		document.querySelector( `.${ sidebar }` ).classList.remove( hidden );
	};

	const mouseLeaveHandler = e => {
		document.querySelector( `.${ sidebar }` ).classList.add( hidden );
	};

	return (
			<aside className={ sidebarStyles }
			       onMouseEnter={ mouseEnterHandler }
			       onMouseLeave={ mouseLeaveHandler }>
				<Button styles={ button }
				        label='Start'
				        clickHandler={ startHandler }/>
				<Button styles={ button }
				        label='Stop'
				        clickHandler={ stopHandler }/>
			</aside>
	);
}

export default Sidebar;