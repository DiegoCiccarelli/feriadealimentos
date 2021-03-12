import React from 'react';

function NavItem(props){
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="/">
                <i className={props.class}></i>
                <span>{props.name}</span>
            </a>
        </li>
    );
};

export default NavItem;

				