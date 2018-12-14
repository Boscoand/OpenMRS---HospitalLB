import React from 'react';
import { Nav, NavItem, Glyphicon, Button, Navbar, NavDropdown, MenuItem } from "react-bootstrap"
import Iframe from 'react-iframe'
export default class OpenMRSView extends React.Component {
    constructor(props) {
        super(props);   
    }
    render(){

        const styles = {
            marginTop20: {
                marginTop: 20
            }
        }

        return(
            <div style = { styles.marginTop20 }>
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