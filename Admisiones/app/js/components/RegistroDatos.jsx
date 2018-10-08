import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Field } from 'redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import renderField from './renderField';

export default class RegistroDatos extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render(){
        return(<div>
        
            <h3>Ingresar Datos del {this.props.label}</h3>
            <table>
                <tbody>
                    <tr>   
                        <td> Nombres: </td>
                        <td>
                            <Field
                                name="Nombres: "
                                type="text"
                                component={renderField}
                                label="First Name"
                              />
                              <Field
                                name="MiddleName"
                                type="text"
                                component={renderField}
                                label=""
                              />
                            // <input value={this.props.datos.nombre} onChange={this.props.handleChangeNombre} />
                            // <input value={this.props.datos.segundoNombre} onChange={this.props.handleSecondName} />
                        </td>
                        <td> Apellidos: </td>
                        <td>
                            <input value={this.props.datos.apellido} onChange={this.props.handleChangeApellido} />
                            <input value={this.props.datos.segundoApellido} onChange={this.props.handleLastName} />
                        </td>
                    </tr>
                    <tr>
                        <td>Nacionalidad: </td>
                        <td>
                            <input value={this.props.datos.nacionalidad} onChange={this.props.handleChangeNacionalidad} />
                        </td>
                    </tr>
                    <tr>
                        <td>Ocupación: </td>
                        <td>
                            <input value={this.props.datos.ocupacion} onChange={this.props.handleChangeOcupacion} />
                        </td>
                    </tr>
                    <tr>
                        <td>Dirección: </td>
                        <td>
                            <input value={this.props.datos.direccion} onChange={this.props.handleChangeDireccion} />
                        </td>
                    </tr>
                    <tr>
                        <td> Teléfono: </td>
                        <td>
                            <input value={this.props.datos.telefono} onChange={this.props.handleChangeTelefono} />
                        </td>
                        <td> Celular: </td>
                        <td>
                            <input value={this.props.datos.celular} onChange={this.props.handleChangeCelular} />
                        </td>
                    </tr>
                    <tr>
                        <td>Género: </td>
                        <td>
                            <select onChange={this.props.handleGenderChange}>
                                <option value="M">MASCULINO</option>
                                <option value="F">FEMENINO</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Fecha de Nacimiento: </td>
                        <td>
                            <DatePicker
                            selected={moment()}
                            onChange={this.props.handleChangeDate}
                            showYearDropdown
                            dateFormatCalendar="MMMM"
                            scrollableYearDropdown
                            yearDropdownItemNumber={10}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Lugar de Nacimiento: </td>
                        <td>
                            <input value={this.props.datos.lugarnac} onChange={this.props.handleChangeLugarNac} />
                        </td>
                    </tr>
                </tbody>
            </table>
                    
            <button onClick={this.props.handleClickGuardar}>Guardar</button>
                    
        </div>);
    }
    
}