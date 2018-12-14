/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react';
import { Grid } from "react-bootstrap"
import Menu from "../containers/Menu"

export default class App extends React.Component {
  componentDidMount(){
    console.info(this.props.router)
    this.props.router.push('/triaje');
  }
  render() {
    return (
      <div>
        <Menu />
        <Grid>
          { this.props.children }
        </Grid>
      </div>
    )
  }
}
