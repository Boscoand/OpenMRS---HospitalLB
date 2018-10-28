import React from 'react';
import { Nav, NavItem, Glyphicon, Button, Navbar, NavDropdown, MenuItem } from "react-bootstrap"
import Iframe from 'react-iframe'
export default class OpenMRSView extends React.Component {
    constructor(props) {
        super(props);   
    }
    render(){
        return(
            <div>
                <Iframe url={this.props.url}
                    width="100%"
                    height="1580px"
                    display="block"
                    position="relative"
                    allowFullScreen
                />    
            </div>
        )
    }
}