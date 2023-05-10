import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

export type Link = {
    link: string,
    name: string,
    icon: string,
}

interface NavigationPanelProps {
    links: Link[]
}

const NavigationPanel: FC<NavigationPanelProps> = ({links}) => {
    return (
        <nav>
            <ul>
                {links.map((el) => <li>
                    <NavLink to={el.link}>
                        <span>{el.name}</span>
                        <img src={el.icon} alt=""/>
                    </NavLink>
                </li>)}
            </ul>
        </nav>
    );
};

export default NavigationPanel;