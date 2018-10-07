import React, { Component } from "react"
import PropTypes from "prop-types"
import { hashHistory } from "react-router"
import { Nav, NavItem, Glyphicon, Button, Navbar, NavDropdown, MenuItem } from "react-bootstrap"
import styles from "./Menu.css"

class Menu extends Component {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.goHome = this.goHome.bind(this)
    this.logOut = this.logOut.bind(this)
    this.state = {
      keySelected: "1"
    }
  }

  logOut() {
    console.info("Log out...")
    this.props.deleteSession()
  }

  goHome() {
    console.info("Go home..")
    const addresses = document.location.href.split("/")
    window.open(`${addresses[0]}/${addresses[1]}/${addresses[2]}/${addresses[3]}`)
  }
  handleClose() {
    document.getElementById("sideBar").style.width = "0"
  }

  // handleSelect(selectedKey) {
  //   console.info("PROPS:", this.props)
  //   this.props.changeSidebarOption(selectedKey)
  //   switch (Number(selectedKey)) {
  //     case 1: {
  //       hashHistory.push("/triaje")
  //       break
  //     }
  //     case 2: {
  //       hashHistory.push("/ambulatorio")
  //       break
  //     }
  //     case 3: {
  //       this.props.toggleSidebar()
  //       break
  //     }
  //     default:
  //       hashHistory.push("/")
  //   }
  // }

  handleSelect(key) {
    this.setState({ keySelected : key })
    console.log(this.selectedOption)
  }

  render() {

    return (

      <div>

        <Nav bsStyle="tabs" activeKey={ this.state.keySelected } onSelect={k => this.handleSelect(k)}>
          {this.selectedOption}
          <NavItem eventKey="1" href="#triaje">
            <b>Triaje en Emergencia </b>
          </NavItem>
          <NavItem eventKey="2" href="#ambulatorio">
            <b>Ambulatorio</b>
          </NavItem>
        </Nav>
        
        {/* <Navbar fluid className="sidebar" inverse >

          <Navbar.Header>
            <Navbar.Brand>
        <a href="/openmrs">Bienvenido</a>
            </Navbar.Brand>
            
          </Navbar.Header>

          <Navbar>
            <Navbar.Text className="userMenu">
              <Navbar.Link onClick={this.goHome}><Glyphicon glyph="align-left" /></Navbar.Link>
              <Navbar.Link onClick={this.logOut}><Glyphicon glyph="log-out" /></Navbar.Link>
            </Navbar.Text>
            <Nav activeKey={this.props.sidebarOption} onSelect={this.handleSelect} > */}
              {/* <NavItem eventKey={3}><Glyphicon glyph="glyphicon glyphicon-remove" /> </NavItem> */}
              {/* <NavItem eventKey={1} href="#triaje">Triaje</NavItem>
              <NavItem eventKey={2} href="#ambulatorio">Ambulatorio</NavItem>
            </Nav>
          </Navbar>

        </Navbar> */}
      </div>

    )
  }
}

export default Menu


