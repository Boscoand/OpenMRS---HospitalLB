import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import {renderDropdownList,renderField,renderField2,renderDateTimePicker, renderCombobox} from '../Widgets';
import DatosPreliminares from '../DatosPreliminares';
import { Button, Row, Col } from "react-bootstrap"
import '../../styles/button.css'

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;
const renderErrores = (errores)=>{
  
    let conjunto = errores.map(function(erro, idx){
         return (<li style={{"color":"red",fontWeight: "bold"}}> key={idx}>{erro}</li>)
       })
    return conjunto;
}
const AmbulatorioFormSecondPage = props => {
  
	const { handleSubmit, previousPage,pacientePerson,guardado, errorT, errores } = props;
	const styles = {      
    	marginTitulo2: {
        	marginTop: 25,
            marginBottom: 25,
            borderBottom: "1px solid silver"
		},
		button: {
		  width: '100%',
		  marginTop: "3px"
		}, 
		marginLeft20: {
			marginLeft: 20
		} 
    };

  	return (
    	<div>
			{/* Datos preliminares */}
			<DatosPreliminares datos={pacientePerson}/>

			{/* Verifique y complete datos */}
			<h3 style={ styles.marginTitulo2 }><b>Verifique y complete datos</b></h3>
			<form onSubmit={handleSubmit}>

				<div style={ styles.marginLeft20 }>
					{/* Cédula */}
					<Row>
						<Col md={6}>
							<Field
								name="Cedula"
								type="text"
								width="100%"
								component={renderField2}
								label="Indentificación: "
								placeholder="Ingrese cédula o pasaporte"
							/>
						</Col>
					</Row>

					<Row>
						{/* Primer nombre */}
						<Col md={6}>
							<Field
								name="Primer_Nombre"
								type="text"
								width="100%"
								component={renderField}
								label="Nombres"
								placeholder="Ingrese 1° nombre"
							/>
						</Col>

						{/* Segundo nombre */}
						<Col md={6}>
							<Field
								name="Segundo_Nombre"
								type="text"
								width="100%"
								component={renderField}
								label=":"
								placeholder="Ingrese 2° nombre"
							/>
						</Col>

						{/* Primer apellido */}
						<Col md={6}>
							<Field
								name="Primer_Apellido"
								type="text"
								component={renderField}
								label="Apellidos"
								placeholder="Ingrese 1° apellido"
							/>
						</Col>

						{/* Segundo apellido */}
						<Col md={6}>
							<Field
								name="Segundo_Apellido"
								type="text"
								component={renderField}
								label=":"
								placeholder="Ingrese 2° apellido"
							/>
						</Col>
					</Row>

					<Row>
						{/* Fecha de nacimiento */}
						<Col md={6}>
							<Field
								name="Fecha_Nacimiento"
								type="date"
								component={renderField}
								label="Fecha de Nacimiento: "
								width="100%"
							/>
						</Col>

						{/* Lugar de nacimiento */}
						<Col md={6}>
							<Field
								name="Lugar_Nacimiento"
								type="text"
								component={renderField}
								label="Lugar de Nacimiento: "
							/>
						</Col>

						{/* Género */}
						<Col md={6}>
							<Field name="Genero" 
								component={renderDropdownList}
								label="Género"
								data={[ { genero: 'Masculino', value: 'M' },{ genero: 'Femenino', value: 'F' },{ genero: 'Otro', value: 'otro' } ]}
								valueField="value"
								textField="genero"
								placeholder="Seleccione género"
							/>
						</Col>

						{/* Ocupacion */}
						<Col md={6}>
							<Field
								name="Ocupacion"
								type="text"
								component={renderField}
								label="Ocupacion: "
							/>
						</Col>
					
					</Row>
					
					<Row>

						{/* Estado civil */}
						<Col md={6}>
							<Field
								name="Estado_Civil"
								component={renderDropdownList}
								label="Estado Civil: "
								data={[ { estado: 'Soltero', value: 'soltero' },{ estado: 'Casado/a', value: 'casado' },{ estado: 'Unión Libre', value: 'union_libre' },{ estado: ' Divorciado/a', value: 'divorciado' } ]}
								valueField="value"
								textField="estado"
								placeholder="Seleccione estado civil"

							/>
						</Col>

						{/* Nacionalidad */}
						<Col md={6}>
							<Field name="Nacionalidad" 
									component={renderDropdownList}
									label="Nacionalidad"
									data={[ { nacionalidad: 'Ecuatoriana', value: 'ecuatoriana' },{ nacionalidad: 'Venezolana', value: 'venezolana' },{ nacionalidad: 'Otra', value: 'otra' } ]}
									valueField="value"
									textField="nacionalidad"
									placeholder="Seleccione nacionalidad"
							/>
						</Col>

						{/* Cultura Étnica */}
						<Col md={6}>
							<Field name="Cultura_Étnica" 
									component={renderDropdownList}
									label="Cultura Étnica"
									data={[ { Cultura_Étnica: 'Mestizo/a', value: 'mestizo' },{ Cultura_Étnica: 'Blanco/a', value: 'blanco' },{ Cultura_Étnica: 'Negro/a', value: 'negro' },{ Cultura_Étnica: 'Otra', value: 'otra' } ]}
									valueField="value"
									textField="Cultura_Étnica"
									placeholder="Seleccione cultura étnica"	
							/>
						</Col>
					</Row>
				</div>

				<h3 style={ styles.marginTitulo2 }><b>Información Domiciliaria</b></h3>
				<div style={ styles.marginLeft20 }>
					<Row>
						{/* Provincia */}
						<Col  md={6}>
							<Field
								name="Provincia"
								component={renderDropdownList}
								label="Provincia: "
								data={[ { provincia: 'Guayas', value: 'guayas' },{ provincia: 'Los Ríos', value: 'los_rios' },{ provincia: 'Manabí', value: 'manabi' },{ estado: ' El Oro', value: 'el_oro' } ]}
								valueField="value"
								textField="provincia"
								placeholder="Seleccione provincia"
							/>
						</Col>

						{/* Ciudad */}
						<Col md={6}>
							<Field name="Ciudad" 
									component={renderDropdownList}
									label="Ciudad"
									data={[ { ciudad: 'Guayaquil', value: 'guayaquil' },{ ciudad: 'Playas', value: 'playas' },{ ciudad: 'Otro', value: 'otro' } ]}
									valueField="value"
									textField="ciudad"
									placeholder="Seleccione ciudad"
							/>
						</Col>

						{/* Parroquia */}
						<Col md={6}>
							<Field name="Parroquia" 
									component={renderDropdownList}
									label="Parroquia"
									data={[ { parroquia: 'Tarqui', value: 'tarqui' },{ parroquia: 'Ximena', value: 'ximena' },{ parroquia: 'Febres Cordero', value: 'febres_cordero' },{ parroquia: 'Otra', value: 'otra' } ]}
									valueField="value"
									textField="parroquia"
									placeholder="Seleccione parroquia"	
							/>
						</Col>

						{/* Direccion */}
						<Col md={6}>
							<Field
								name="Direccion"
								type="text"
								component={renderField}
								label="Dirección: "
								placeholder="Ingrese direccion"
							/>
						</Col>
					</Row>

					<Row>
						{/* Telefono */}
						<Col md={6}>
						<Field
							name="Telefono"
							type="text"
							component={renderField}
							label="Teléfono:"
							placeholder="Ingrese teléfono convencional"
						/>
						</Col>
					
						{/* Celular */}
						<Col md={6}>
							<Field
								name="Celular"
								type="text"
								component={renderField}
								label="Celular: "
								placeholder="Ingrese número de celular"
							/>
						</Col>

						{/* Telefono 2 */}
						<Col md={6}>
							<Field
								name="Otro_telf"
								type="text"
								component={renderField}
								label="Otro número: "
								placeholder="Ingrese otro número"
							/>
						</Col>

						{/* Lugar de Trabajo */}
						<Col md={6}>
							<Field
								name="Lug_Trabajo"
								type="text"
								component={renderField}
								label="Lugar de trabajo: "
								placeholder="Ingrese lugar de trabajo"
							/>
						</Col>
					</Row>
				</div>

				<br></br>
				<hr></hr>
				<Col md={3}></Col>
				<Col md={6}>
					<Button bsStyle="success" style={ styles.button } type="submit" className="button">GUARDAR</Button>                            
				</Col>

				{guardado && (
					<div style={{"color":"green",fontWeight: "bold"}}> LOS DATOS FUERON GUARDADOS EXITOSAMENTE</div>
				)} 
				{errorT && (
					errores.map(function(d, idx){
					return (<li style={{"color":"red",fontWeight: "bold"}}> {d}</li>);
				})
				)} 
			</form>
		</div>
  );
};

export default reduxForm({
  form: 'ambulatorio', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues:{
  "Nacionalidad": {
    "nacionalidad": "Ecuatoriana",
    "value": "ecuatoriana"
  },
  "Cultura_Étnica": {
    "Cultura_Étnica": "Mestizo/a",
    "value": "mestizo"
  },
  "Provincia": {
    "provincia": "Guayas",
    "value": "guayas"
  },
  "Ciudad": {
    "ciudad": "Guayaquil",
    "value": "guayaquil"
  }
  }
})(AmbulatorioFormSecondPage);
