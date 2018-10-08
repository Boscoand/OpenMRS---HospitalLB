/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { Nav, NavItem, Glyphicon, Button, Navbar, NavDropdown, MenuItem } from "react-bootstrap"
import HOME from '../utilities/constants'
export default class Ambulatorio extends React.Component {
  constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            patient:"f59fba90-e7bb-4783-8d54-7368cf3cb525",
            visit:"008ce5d3-8f7a-4375-b877-eed1b216467f",
            form:"87cfc6c8-d607-4b39-97e0-dbc2c6e18818",
            url:""
        };
    
  }
  
  componentWillMount(){
    console.info(this.props.router)
    let url=`http://${HOME}:9001/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${this.state.patient}&visitId=${this.state.visit}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${this.state.patient}%26`
   this.setState({"url":url})
   console.log(url);
  }
  handleClick(event){
    this.setState({patient:"06e13701-0d9c-4a6c-bc53-a36ee0d71803"})
    this.setState({visit:"d1f5f49d-1a15-4fc6-a7f6-31aca3b0c231"})
    let url=`http://${HOME}:9001/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?patientId=${this.state.patient}&visitId=${this.state.visit}&formUuid=${this.state.form}&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3D${this.state.patient}%26`
   this.setState({"url":url})
   console.log(url)
  }
  
  render() {
    return (
      <div height="100%" width="100%">
      <Navbar >
       <iframe  className="frame"  height="100%" width="80%"  src={this.state.url} name="targetframe" allowTransparency="true" scrolling="yes"  >
    </iframe>
    <button onClick={this.handleClick}>Siguiente Paciente </button>
    </Navbar>
      </div>
    )
  }
}

//"${HOME}:3000/openmrs/htmlformentryui/htmlform/enterHtmlFormWithStandardUi.page?formUuid=87cfc6c8-d607-4b39-97e0-dbc2c6e18818&patientId=39&refappui=true&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId=39"