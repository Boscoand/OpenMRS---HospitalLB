import React from 'react';
import { Nav, NavItem, Glyphicon, Button, Navbar, NavDropdown, MenuItem } from "react-bootstrap"
import Iframe from 'react-iframe'
export default class OpenMRSView extends React.Component {
    constructor(props) {
        super(props);
        this.iframe=this.props.estilos;
    }
    
    render(){
        return(
            <div>
                <div height="100%" width="100%">
                    <Navbar>
                        <Iframe url={this.props.url}
                            width="105%"
                            height="450px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                            styles={this.iframe}
                            allowFullScreen/>
                    </Navbar>
                </div>
            </div>
        );
    }
    
}