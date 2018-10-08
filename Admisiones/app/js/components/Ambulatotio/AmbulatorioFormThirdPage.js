import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {renderDropdownList,renderField,renderDateTimePicker, renderCombobox} from '../Widgets';
import DatosPreliminares from '../DatosPreliminares';
const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;
const renderErrores = (errores)=>{
  
    let conjunto = errores.map(function(erro, idx){
         return (<li style={{"color":"red",fontWeight: "bold"}}> key={idx}>{erro}</li>)
       })
       
    return conjunto;
}
const AmbulatorioFormThirdPage = props => {
    const { handleSubmit, previousPage,pacientePerson, guardado, errorT, errores } = props;
    
  return (
    <div>
     
    <div>
    <h2>Paciente</h2>
    <DatosPreliminares datos={pacientePerson}/>
    
      <h3>Verifique y complete datos</h3>
    </div>
  <div>
    <form onSubmit={handleSubmit}>
    <div id="DatosPersonales" className="seccion">
      <Field
        name="Cedula"
        type="text"
        component={renderField}
        label="Indentificación: "
        placeholder="Ingrese cédula o pasaporte"
      />
      <Row>
      <Col xs ={5} md={2}>
      <Field
        name="Primer_Nombre"
        type="text"
        component={renderField}
        label="Nombres:"
        placeholder="Ingrese 1° nombre"
      />
      </Col>
      <Col xs ={5} md={2}>
      <Field
        name="Segundo_Nombre"
        type="text"
        label=":"
        style={{"color":"white",fontWeight: "bold"}}
        component={renderField}
        placeholder="Ingrese 2° nombre"
      />
      </Col>
      <Col xs ={1} md={1}>
      </Col>
      <Col xs ={5} md={2}>
      <Field
        name="Primer_Apellido"
        type="text"
        component={renderField}
        label="Apellidos:"
        placeholder="Ingrese 1° apellido"
      />
      </Col>
      <Col xs ={6} md={3}>
      <Field
        name="Segundo_Apellido"
        type="text"
        label=":"
        style={{"color":"white",fontWeight: "bold"}}
        component={renderField}
        placeholder="Ingrese 2° apellido"
      />
      </Col>
      </Row>
      <Row>
      <Col xs ={6} md={3}>
      <Field
        name="Fecha_Nacimiento"
        type="date"
        component={renderField}
        label="Fecha de Nacimiento: "
      />
      </Col>
      <Col xs ={6} md={3}>
      <Field
        name="Lugar_Nacimiento"
        type="text"
        component={renderField}
        label="Lugar de Nacimiento: "
      />
      </Col>
      <Col xs ={6} md={3}>
      <Field name="Genero" 
            component={renderDropdownList}
            label="Género"
            data={[ { genero: 'Masculino', value: 'masculino' },{ genero: 'Femenino', value: 'femenino' },{ genero: 'Otro', value: 'otro' } ]}
            valueField="value"
            textField="genero"
            placeholder="Seleccione género"
      />
      </Col>
      </Row>
       <Row>
       <Col xs ={6} md={3}>
      <Field
        name="Ocupacion"
        type="text"
        component={renderField}
        label="Ocupacion: "
      />
      </Col>
      <Col xs ={6} md={3}>
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
      <Col xs ={6} md={3}>
      <Field name="Nacionalidad" 
            component={renderDropdownList}
            label="Nacionalidad"
            data={[ { nacionalidad: 'Ecuatoriana', value: 'ecuatoriana' },{ nacionalidad: 'Venezolana', value: 'venezolana' },{ nacionalidad: 'Otra', value: 'otra' } ]}
            valueField="value"
            textField="nacionalidad"
            placeholder="Seleccione nacionalidad"
      />
      </Col>
       <Col xs ={6} md={3}>
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
      <hr></hr>
    <div id="DatosDomicilio" className="seccion">
    <h4>Información Domiciliaria</h4>
      <Row>
       <Col xs ={6} md={3}>
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
      <Col xs ={6} md={3}>
      <Field name="Ciudad" 
            component={renderDropdownList}
            label="Ciudad"
            data={[ { ciudad: 'Guayaquil', value: 'guayaquil' },{ ciudad: 'Playas', value: 'playas' },{ ciudad: 'Otro', value: 'otro' } ]}
            valueField="value"
            textField="ciudad"
            placeholder="Seleccione ciudad"
      />
      </Col>
       <Col xs ={6} md={3}>
      <Field name="Parroquia" 
            component={renderDropdownList}
            label="Parroquia"
            data={[ { parroquia: 'Tarqui', value: 'tarqui' },{ parroquia: 'Ximena', value: 'ximena' },{ parroquia: 'Febres Cordero', value: 'febres_cordero' },{ parroquia: 'Otra', value: 'otra' } ]}
            valueField="value"
            textField="parroquia"
            placeholder="Seleccione parroquia"	
      />
      </Col>
      <Col xs ={12} md={6}>
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
      <Col xs ={6} md={3}>
      <Field
        name="Telefono"
        type="text"
        component={renderField}
        label="Teléfono:"
        placeholder="Ingrese teléfono convencional"
      />
      </Col>
      
      <Col xs ={6} md={3}>
      <Field
        name="Celular"
        type="text"
        component={renderField}
        label="Celular: "
        placeholder="Ingrese número de celular"
      />
      </Col>
      <Col xs ={6} md={3}>
      <Field
        name="Otro_telf"
        type="text"
        component={renderField}
        label="Otro número: "
        placeholder="Ingrese otro número"
      />
      </Col>
      </Row>
       <Row>
       <Col xs ={12} md={6}>
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
      <div>
        <button type="submit" className="next">
          Guardar
        </button>
      </div>
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
</div>
 );
};
export default reduxForm({
  form: 'ambulatorio2', //Form name is same
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
})(AmbulatorioFormThirdPage);
