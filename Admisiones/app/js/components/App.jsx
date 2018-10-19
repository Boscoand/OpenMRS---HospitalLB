import React from 'react';
import { Grid } from "react-bootstrap"

export default class App extends React.Component {
  componentDidMount(){
    // console.info(this.props.router)
    this.props.router.push('/ambulatorio/inicio');
  }
  render() {
    return (
      <div>
      
        <Grid id="mainApp"  height="100%" width="100%">
          { this.props.children }
        </Grid>
      </div>
    )
  }
}
