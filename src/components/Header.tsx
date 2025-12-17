import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header>
            <NavLink to="/">Bloomji</NavLink>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/about">Quienes somos</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Contact">Contacto</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;