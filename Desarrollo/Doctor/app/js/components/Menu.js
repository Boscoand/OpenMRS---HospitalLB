import React, { Component } from "react"
import { Nav, NavItem, Tab, Row, Col, page, Label, TabContainer } from "react-bootstrap"
import "./MenuStyle.css"

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

  handleSelect(key) {
    this.setState({ keySelected : key })
    console.log(this.selectedOption)
  }

  render() {

    const styles = {      
			navBar: {
        display: "inline-block",
        width: "100%",
        marginTop: "15px"
      }, 
      borderBottom: {
        borderBottom: "1px solid silver"
      },
      containerItem: {
        margin: "10px"
      },
      containerNavLeft: {
        borderRight: "1px solid silver",
      },
      textFormat: {
        color: "#777"
      },
      button: {
        width: '100%'
      },
      button: {
        width: '100%',
        marginTop: "3px"
      },
      marginTitulo: {
        marginTop: 50
      },
      labelComplete: {
        width: "100%", 
        float: "left",
        marginBottom: 5
      }
    };

    return (

      <div>
        
        <h1 style={ styles.marginTitulo }><Label style={ styles.labelComplete }>Doctor Emergencia</Label></h1>

        <Tab.Container className="selectedItem" style={ styles.navBar } id="tab-left" defaultActiveKey="1">
          {/* <Row> */}
            <Col sm={3} style={ styles.containerNavLeft }>
              <Nav style={ styles.navBar } bsStyle="pills" stacked activeKey={ this.state.keySelected } onSelect={k => this.handleSelect(k)}>
                <NavItem eventKey="1" href="#triaje" onClick={this.page1} style={ styles.borderBottom }><b style={ styles.textFormat }>Triaje en Emergencia</b></NavItem>
                <NavItem eventKey="2" href="#ambulatorio" onClick={this.page2} style={ styles.borderBottom }><b style={ styles.textFormat }>Ambulatorio</b></NavItem>
              </Nav>
            </Col>
        </Tab.Container>
        
      </div>

    )
  }
}

export default Menu


