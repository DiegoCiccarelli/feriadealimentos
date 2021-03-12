import React from 'react';

function HeaderItem(props){
    return (
        <li className="nav-item dropdown no-arrow mx-1">
		    <a className="nav-link dropdown-toggle" href={props.href} id={props.id}>
				<i className={props.classIcon}></i>
				<span className="badge badge-danger badge-counter">{props.counter}</span>
			</a>
		</li>
    );
};

export default HeaderItem;

				