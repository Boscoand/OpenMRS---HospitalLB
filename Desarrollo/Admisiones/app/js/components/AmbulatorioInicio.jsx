import React from 'react';
import apiCall from '../utilities/apiHelper';
import {
    SEGURO_UUID,
    HOME,
    JASPER_ROTULO_ADMISIONES,
    JASPER_GARANTIA_ADMISIONES,
    JASPER_REG_RAPIDO_ADMISIONES,
    JASPER_HOJA_INGRESO_ADMISIONES
} from '../utilities/constants';
import DatosPreliminares from './DatosPreliminares';
import ReactTable from "react-table";
import { Col, Label, Button, Form, FormControl, FormGroup, ControlLabel, Panel, Row } from "react-bootstrap"
import "./AmbulatorioInicio.css"
import 'react-table/react-table.css';
import '../styles/button.css'
import OpenMRSView from './openmrsView'

export default class AmbulatorioInicio extends React.Component {

    constructor(props) {
        super(props);

        this.contextPath = window.location.href.split("/")[3];
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAplica = this.handleAplica.bind(this);
        this.handleNoAplica = this.handleNoAplica.bind(this);
        this.getAge = this.getAge.bind(this);
        this.getPatient = this.getPatient.bind(this);
        this.state = {
            server : "localhost:8080",
            patient:"",
            seguro:"",
            provider:"",
            preliminares:{},
            url: ""
        };
        this.aReportes = this.aReportes.bind(this);
        this.aFormulario = this.aFormulario.bind(this);
        this.reporte_params = {
            cedula: ""
        };
        this.reporteRegistroRapido = this.reporteRegistroRapido.bind(this);
        this.handleChange_cedula = this.handleChange_cedula.bind(this);
        this.changeReporteTipo = this.changeReporteTipo.bind(this);
        this.aInicio = this.aInicio.bind(this);
        this.reporte_tipo = "";
        this.renderForm = this.renderForm.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }

    handleChange(ev){
        this.setState({patient:ev.target.value});
    }

    handleChange_cedula(ev){
        console.log('change', this.reporte_params);
        this.reporte_params.cedula += ev.target.value;
    }

    handleNoAplica(){
        this.props.saveSeguro("NO IESS");
        window.location.replace(`#ambulatorio/datos`);
    }

    handleAplica(){
        this.props.saveSeguro("IESS");
        window.location.replace("#ambulatorio/datos");
    }

    routeChange(path) {
        window.open(HOME+'/'+path,'targetWindow','toolbar=no,location=no, status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=400,centerscreen=yes');
    }

    getAge(dateString)
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

 getPatient(patientService) {
    const  data = { person: null };

    // console.log(patientService);
    apiCall(null,'get',`/patient?v=full&q=${patientService}`).then((result) => {

                if(result.results.length==0){
                    // this.setState({encontrado:false});
                    Object.assign(data, data.person, {});

                }else{
                    const person= result.results[0].person;
                    const age = this.getAge(person.birthdate);
                    const preliminares={nombre: person.names[0].givenName,apellido:person.names[0].familyName,genero:person.gender,edad:age };

                    console.log(preliminares);
                    this.state.preliminares=preliminares
                    this.props.savePatientPerson(preliminares);
                }                                                                                                                                              //&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3Df59fba90-e7bbF-4783-8d54-7368cf3cb525%26
          });


};


    handleClick(){
        apiCall(null,'get',`/patient?q=${this.state.patient}`).then((result) => {

            if(result.results.length>0){
                console.log(`/obs?v=full&patient=${result.results[0].uuid}&concept=${SEGURO_UUID}` );
                apiCall(null,'get',`/obs?v=full&patient=${result.results[0].uuid}&concept=${SEGURO_UUID}`).then((resultado) => {
                    if(resultado.results.length>0){
                        console.log(resultado.results)
                        let seguro = resultado.results[0].value.display;
                        let prov = resultado.results[0].encounter.encounterProviders[0].display;
                        this.setState({seguro:seguro, provider: prov.split(":")[0]});
                        this.props.savePatientOpenMRSID(this.state.patient);
                        this.getPatient(this.state.patient);
                        }else{
                            this.setState({seguro:"error"});
                        }                                                                                                          //&returnUrl=%2Fopenmrs%2Fcoreapps%2Fclinicianfacing%2Fpatient.page%3FpatientId%3Df59fba90-e7bbF-4783-8d54-7368cf3cb525%26
                  });
            }else{
                this.setState({seguro:"error"});
            }
      });
    }

    componentDidMount(){
        apiCall(null,'get',`/appui/session`).then((result) => {

            let lugar = result.sessionLocation.uuid;
            let provider = result.currentProvider.uuid;
            this.props.saveSessionLocation(lugar);
            this.props.saveSessionProvider(provider);

      });
    }

    aReportes() {
        console.log('A REPORTES');
        this.setState({seguro:"reportes"});
    }

    aInicio() {
        console.log('A INICIO');
        this.setState({seguro:"", "url": ""});
    }

    aFormulario() {
        console.log('A FORMULARIO');
        // this.setState({seguro:"formulario"});
        // this.state = {seguro:"formulario"};
        this.setState({seguro:"formulario"});
    }

    reporteRegistroRapido(){
        console.log("reigstro rapido");
        // this.reporte_params = {cedula: 'ddddd'};
        console.log(this.reporte_params);
    }

    changeReporteTipo(tipo) {
        this.reporte_tipo = tipo;
        this.setState({seguro:"reportes"});
    }

    renderForm(url_report) {
        let url = `http://${this.state.server}/` + url_report
        console.log(url);
        this.setState({"url": url});
    }

    render() {
        const styles = {
			marginTitulo: {
                marginTop: 50
            },
            labelComplete: {
                width: "100%",
                float: "left",
                marginBottom: 5
            },
            error: {
                marginTop: 18,
                fontSize: "18px",
                padding: "10px",
                width: "100%",
                float: "left"
            },
            marginTitulo2: {
                marginTop: 25,
                borderBottom: "1px solid silver",
                marginBottom: 25,
            },
            button: {
                width: '100%'
            },
            buttonIESS: {
                width: '25%',
                marginTop: 10,
                marginRight: 10,
                fontSize: 15
            },
            sizeFields: {
              fontSize: '13px'
            }
        };

        if(this.state.seguro==""){
            return (
            <div>
                <Button id="button_reportes" className="menu_button" style={ styles.button } onClick={this.aReportes}>
                Reportes
                </Button>
                <Button id="reportes" className="menu_button" style={ styles.button } onClick={this.aFormulario}>
                Consultar paciente
                </Button>
            </div>
        )}
        if(this.state.seguro=="reportes"){
            return(
                <div>
                    <Button id="button_reportes" className="menu_button" style={ styles.button } onClick={() => this.renderForm(JASPER_REG_RAPIDO_ADMISIONES)}>
                    Reporte Registro Rapido
                    </Button>
                    <Button id="button_reportes" className="menu_button" style={ styles.button } onClick={() => this.renderForm(JASPER_ROTULO_ADMISIONES)}>
                    Reporte Rotulo
                    </Button>
                    <Button id="button_reportes" className="menu_button" style={ styles.button } onClick={() => this.renderForm(JASPER_GARANTIA_ADMISIONES)}>
                    Reporte Garantia
                    </Button>
                    <Button id="button_reportes" className="menu_button" style={ styles.button } onClick={() => this.renderForm(JASPER_HOJA_INGRESO_ADMISIONES)}>
                    Reporte Hoja de Ingreso
                    </Button>
                    <Button id="button_reportes" className="menu_button" style={ styles.button } onClick={this.aInicio}>
                    Atras
                    </Button>
                    <Panel bsStyle="info" theme="chemical">
                        <Panel.Body>
                            <OpenMRSView url={this.state.url}/>
                        </Panel.Body>
                    </Panel>
                </div>
            )
        }
        if(this.state.seguro=="formulario"){
            return(
                <div>
                    <Form horizontal>
                        <Row>
                            <Col md={3}/>
                            <Col md={6}>
                                <h1 style={ styles.marginTitulo }><Label style={ styles.labelComplete }>Búsqueda de Paciente</Label></h1>
                                <h6 style={{color:"gray"}}>Buscar el paciente por su código de Atención</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}/>
                            <Col md={6}>
                                <Panel bsStyle="info">
                                    <Panel.Body>
                                            <FormGroup controlId="variableID">
                                                <Col md={12}>
                                                    <ControlLabel style={ styles.sizeFields }>Ingresar el código de atención</ControlLabel>
                                                    {""}
                                                    <FormControl data-id="" type="text" value={this.state.patient} onChange={this.handleChange}/>
                                                    <FormControl.Feedback/>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup>
                                                <Col md={12}>
                                                    <Button bsStyle="success" className="button" style={ styles.button } onClick={this.handleClick}>BUSCAR</Button>
                                                </Col>
                                            </FormGroup>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                    </Form>
              </div>
            )
        }
        if(this.state.seguro=="error"){
            return(
            <div>

                <Form horizontal>
                    <Row>
                        <Col md={3}/>
                        <Col md={6}>
                            <h1 style={ styles.marginTitulo }><Label style={ styles.labelComplete }>Registrar Ambulatorio</Label></h1>
                            <h6 style={{color:"gray"}}>Buscar el paciente por su código de Atención</h6>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}/>
                        <Col md={6}>
                            <Panel bsStyle="info">
                                <Panel.Body>
                                        <FormGroup controlId="variableID">
                                            <Col md={12}>
                                                <ControlLabel style={ styles.sizeFields }>Código de Paciente</ControlLabel>
                                                {""}
                                                <FormControl data-id="" type="text" value={this.state.patient} onChange={this.handleChange}/>
                                                <FormControl.Feedback/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col md={12}>
                                                <Button bsStyle="success" style={ styles.button } onClick={this.handleClick}>BUSCAR</Button>
                                            </Col>

                                            <Col md={12}>
                                                <div ><Label bsStyle="danger" style={ styles.error }>NO SE HAN ENCONTRADO RESULTADOS</Label></div>
                                            </Col>
                                        </FormGroup>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Form>

          </div>
          );
        }

        if(this.state.seguro!="NO IESS"){
            return(
            <div>
                {/* <h1>Registrar Ambulatorio</h1> */}
                {/* <h3>Código del Paciente</h3>

                <input type="text" value={this.state.patient} onChange={this.handleChange}/>
                <br></br>
                <button onClick={this.handleClick}> BUSCAR DE NUEVO</button> */}
                <Form horizontal>
                    <Row>
                        <Col md={3}/>
                        <Col md={6}>
                            <h1 style={ styles.marginTitulo }><Label style={ styles.labelComplete }>Registrar Ambulatorio</Label></h1>
                            <h6 style={{color:"gray"}}>Buscar el paciente por su código de Atención</h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}/>
                        <Col md={6}>
                            <Panel bsStyle="info">
                                <Panel.Body>
                                    <FormGroup>
                                        <Col md={12}>
                                            <ControlLabel style={ styles.sizeFields }>Código de Paciente</ControlLabel>
                                            {""}
                                            <FormControl data-id="" type="text" value={this.state.patient} onChange={this.handleChange}/>
                                            <FormControl.Feedback/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={12}>
                                            <Button bsStyle="success" className="button" style={ styles.button } onClick={this.handleClick}>BUSCAR</Button>
                                        </Col>
                                    </FormGroup>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>

                    <hr/>

                    <Col md={12}>
                        <Panel bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Resultado </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                {/* <h2>Paciente marcado como aspirante Seguro {this.state.seguro} por el Doctor</h2>
                                <h5>Doctor Responsable: </h5><h4>{this.state.provider}</h4>
                                <br></br> */}

                                <h3 style={ styles.marginTitulo2 }><b>Paciente marcado como aspirante por el Doctor</b></h3>

                                <h5>
                                    <Col md={3}>Seguro:</Col>
                                    <Col md={3}>{this.state.seguro}</Col>
                                </h5>
                                <br></br>
                                <h5>
                                    <Col md={3}>Doctor responsable:</Col>
                                    <Col md={3}>{this.state.provider}</Col>
                                </h5>
                                <br></br><br></br>
                                <div>
                                    <DatosPreliminares datos={this.state.preliminares}/>

                                    {/* <a href="https://www.iess.gob.ec/calificacion-web/pages/public/calificacionAtencion.jsf" target="_blank">
                                        <button> VER SI APLICA IESS</button>
                                    </a> */}
                                    <a href="https://www.iess.gob.ec/calificacion-web/pages/public/calificacionAtencion.jsf" target="_blank">
                                        <Button style={ styles.buttonIESS }>VER SI APLICA IESS</Button>
                                    </a>

                                    {/* <a href="https://aplicaciones.msp.gob.ec/coresalud/app.php/publico/rpis/afiliacion/consulta" target="_blank">
                                        <button onClick={this.handleClick}> VER SI APLICA IESS-MSP</button>
                                    </a> */}
                                    <a href="https://aplicaciones.msp.gob.ec/coresalud/app.php/publico/rpis/afiliacion/consulta" target="_blank">
                                        <Button style={ styles.buttonIESS }>VER SI APLICA IESS-MSP</Button>
                                    </a>
                                </div>
                                <br></br>
                                <h3 style={ styles.marginTitulo2 }><b>Marcar si el paciente aplica al seguro</b></h3>

                                {/* <button onClick={this.handleAplica}> APLICA</button>
                                <button onClick={this.handleNoAplica}> NO APLICA</button> */}
                                <Button style={ styles.buttonIESS } onClick={this.handleAplica}>APLICA</Button>
                                <Button style={ styles.buttonIESS } onClick={this.handleNoAplica}>NO APLICA</Button>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Form>
          </div>
          );
        }
        if(this.state.seguro=="NO IESS"){
            return(
            <div>
                <h1>Ambulatorio</h1>
                <h2>Registrar Ambulatorio</h2>
                <h3>Código del Paciente</h3>

                <input type="text" value={this.state.patient} onChange={this.handleChange}/>
                <br></br>
                <button onClick={this.handleClick}> BUSCAR DE NUEVO</button>
                <br></br><br></br>
                <h2 >Paciente marcado como NO Aspirante a Seguro Público por el Doctor</h2>
                <h5>Doctor Responsable: {this.state.provider}</h5>
                <br></br>
                <div>
                    <DatosPreliminares datos={this.state.preliminares}/>
                </div>
                <br></br>
                <h2 >Continuar con la verificación de datos</h2>
                <button onClick={this.handleNoAplica}> CONTINUAR</button>

          </div>
          );
        }



    }
}
