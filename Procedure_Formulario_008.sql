delimiter $
drop procedure if exists formulario_008 $
delimiter ;

delimiter $
CREATE PROCEDURE formulario_008 ( in p_cedula varchar(20),in p_fecha date)
############################################################
# FECHA: 03/06/2019
# CREADO POR: Tai Yu Chen
# INSTITUCION: ESPOL
############################################################
BEGIN
	declare l_person_id INT(11) default 0;
    declare v_ultima_fila int default 0;
    
    ##############################################################
    ################DECLARACION DE VARIABLES #####################
	##############################################################
    declare cedula varchar(50) default ' ';
	declare apellido1 varchar(50) default ' ';
	declare apellido2 varchar(50) default ' ';
	declare nombre1 varchar(50) default ' ';
	declare nombre2 varchar(50) default ' ';
	declare direccion1 varchar(255) default ' ';
	declare parroquia varchar(255) default ' ';
	declare ciudad varchar(255) default ' ';
	declare provincia varchar(255) default ' ';
	declare fechacumpleanio date;
	declare genero varchar(50) default ' ';
	declare HOMBRE varchar(10) default ' ';
	declare MUJER varchar(10) default ' ';
	declare edad varchar(10) default ' ';
	declare Ocupacion varchar(50) default ' ';
	declare etnia varchar(50) default ' ';
	declare lugarNacimiento varchar(50) default ' ';
	declare telefono varchar(50) default ' ';
	declare celular varchar(50) default ' ';
	declare lugarTrabajo varchar(50) default ' ';
	declare otrocelular varchar(50) default ' ';
	declare soltero varchar(10) default ' ';
	declare casado varchar(10) default ' ';
	declare divorciado varchar(10) default ' ';
	declare unio varchar(10) default ' ';
	declare viudo varchar(10) default ' ';
	declare seguro varchar(255) default ' ';
	declare grupo_Sanguineo varchar(10) default ' ';
	declare direccionSesion3 TEXT default ' ';
	declare lugarSesion3 TEXT default ' ';
	declare fechaSesion3 DATETIME;
	declare alergia TEXT default ' ';
	declare clinico TEXT default ' ';
	declare ginecologico TEXT default ' ';
	declare trauma TEXT default ' ';
	declare quirurgico TEXT default ' ';
	declare farmacologico TEXT default ' ';
	declare psiquiatrico TEXT default ' ';
	declare otro TEXT default ' ';
	declare altura DOUBLE default 0;
	declare peso DOUBLE default 0;
	declare bmi DOUBLE default 0;
	declare pulso DOUBLE default 0;
	declare repiracion DOUBLE default 0;
	declare presionT varchar(100) default ' ';
	declare Saturacion_Oxigeno DOUBLE default 0;
    declare concepto_id varchar(255) default ' ';
    declare motivos varchar(255) default ' ';
    declare trauma_sesion2 varchar(10) default ' ';
    declare causa_clinica varchar(10) default ' ';
    declare causa_Quirúrgica varchar(10) default ' ';
    declare otro_Motivo varchar(10) default ' ';
    declare notificacion_Policia varchar(10) default ' ';
    declare descripcion_motivo TEXT default ' ';
    declare hora varchar(10) default ' ';
    
    declare bandera int(11) default 0;
    declare valor varchar(255) default ' ';
    declare valor2 varchar(255) default ' ';
    declare concept_id_2 varchar(255) default ' ';
    declare orden varchar(255) default ' ';
    ######### VARIABLES PARA DIAGNOSTICO DE ALTA #########
    declare enfermedad_1_alta varchar(255) default ' ';
    declare confirmado_1_alta varchar(255) default ' ';
    declare presunto_1_alta varchar(255) default ' ';
    
    declare enfermedad_2_alta varchar(255) default ' ';
    declare confirmado_2_alta varchar(255) default ' ';
    declare presunto_2_alta varchar(255) default ' ';
    
    declare enfermedad_3_alta varchar(255) default ' ';
    declare confirmado_3_alta varchar(255) default ' ';
    declare presunto_3_alta varchar(255) default ' ';
    
    ######### VARIABLES PARA DIAGNOSTICO DE INGRESO #########
    declare enfermedad_1_ingreso varchar(255) default ' ';
    declare confirmado_1_ingreso varchar(255) default ' ';
    declare presunto_1_ingreso varchar(255) default ' ';
    
    declare enfermedad_2_ingreso varchar(255) default ' ';
    declare confirmado_2_ingreso varchar(255) default ' ';
    declare presunto_2_ingreso varchar(255) default ' ';
    
    declare enfermedad_3_ingreso varchar(255) default ' ';
    declare confirmado_3_ingreso varchar(255) default ' ';
    declare presunto_3_ingreso varchar(255) default ' ';
    ##############################################################
    ###############FIN DE LAS DECLARACIONES DE VARIABLE###########
    ###############################################################
    
    
	##############################################################
	################ DECLARACIONES DE CURSORES ###################
	##############################################################

	/*CURSOR PARA OBTENER ID*/
	declare c_obtener_id cursor for 
    SELECT pem.`winner_person_id`
	FROM `patient` p
	inner join `person_merge_log` pem on pem.`winner_person_id` = p.`patient_id`
	inner join `patient_identifier` pi on p.`patient_id` = pi.`patient_id`
	where  pi.`identifier` = p_cedula
	order by pem.`person_merge_log_id` desc limit 1;
    
    
    /*CURSOR PARA LA SESION 1*/

    #DECLARAR CURSOR PARA DATOS BASICOS PARTE 1
    declare c_datos_basicos cursor for
    select 
	pi.`identifier` as cedula,
	pn.`family_name` as apellido1 ,
	pn.`family_name2` as apellido2,
	pn.`given_name` as nombre1,
	pn.`middle_name` as nombre2,
	pa.`address1` as direccion1,
	pa.`address2` as parroquia,
	pa.`city_village` as ciudad,
	pa.`state_province` as provincia,
	Date_format(p.`birthdate`,'%Y/%m/%d') as fechacumpleanio,
	p.`gender` as genero,
	(SELECT if(p.`gender` = 'M','X','')) as HOMBRE,
	(SELECT if(p.`gender` = 'F','X','')) as MUJER,
	TIMESTAMPDIFF(YEAR,p.`birthdate`,now()) as edad

	from `person` p
	inner join `person_address` pa on  p.`person_id` = pa.`person_id`

	inner join `person_name` pn on pn.`person_id` = p.`person_id`

	inner join `patient` pt on pt.`patient_id` = p.`person_id` 

	inner join `patient_identifier` pi on pt.`patient_id` = pi.`patient_id`

	where
	pi.`identifier_type` = 4
	and pn.`preferred` = 0
	and p.`person_id` = l_person_id;
    

    #OCUPACION
	declare c_ocupacion cursor for 
	SELECT pa.`value` as Ocupacion
	FROM `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'Occupation' and pa.`person_id` = l_person_id;

	#ETNIA
	declare c_etnia cursor for 
	SELECT pa.`value` as etnia
	FROM `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name`='Race' and  pa.`person_id`=l_person_id;

	#LUGAR DE NACIMIENTO
	declare c_lugar_nacimiento cursor for 
	SELECT pa.`value` as lugarNacimiento
	FROM `person_attribute` pa ,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'Birthplace' and pa.`person_id` = l_person_id;

	#TELEFONO
	declare c_telefono cursor for
	SELECT pa.`value` as telefono
	FROM  `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'Telephone Number' and pa.`person_id` = l_person_id;

	#CELULAR
	declare c_celular cursor for
	SELECT pa.`value` as celular
	FROM  `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'CellPhone' and pa.`person_id` = l_person_id;
 
 	#LUGAR DE TRABAJO
 	declare c_lugar_trabajo cursor for
	SELECT pa.`value` as lugarTrabajo
	FROM  `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'WorkPlace' and pa.`person_id` = l_person_id;

	# ESTADO CIVIL
	declare c_estado_civil cursor for
	SELECT 
	(select if(STRCMP(pa.`value`,'Soltero') = 0,'X','')) as soltero,
	(select if(STRCMP(pa.`value`,'Casado/a') = 0,'X','')) as casado,
	(select if(STRCMP(pa.`value`,'Divorciado/a') = 0,'X','')) as divorciado,
	(select if(STRCMP(pa.`value`,'Unión Libre') = 0,'X','')) as unio,
	(select if(STRCMP(pa.`value`,'Viudo/a') = 0,'X','')) as viudo

	FROM  `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'Estado Civil' and pa.`person_id` = l_person_id;

	#OTRO TELEFONO
	declare c_otro_telefono cursor for
	SELECT pa.`value` as otrocelular
	FROM `person_attribute` pa,`person_attribute_type` pt
	where pt.`person_attribute_type_id` = pa.`person_attribute_type_id`
	and pt.`name` = 'OTHER PHONE' and pa.`person_id` = l_person_id;

    /*CURSOR PARA EL SEGURO*/
    declare c_datos_seguro cursor for
    select cn.`name` as seguro
	from concept c, concept_name cn
	where c.`concept_id` = cn.`concept_id`
	and cn.`concept_id` = (select o.`value_coded`
	from concept c , concept_name cn, obs o
	where c.`concept_id` = cn.`concept_id`
	and o.`concept_id` = c.`concept_id`
	and cn.`name` = 'Tipo de Seguro'
	and cn.`locale` = 'es'
	and o.`person_id` = l_person_id);

	/*CURSOR PARA LA SESION 2*/
    
    #CURSOR MOTIVO 
    declare c_datos_motivo cursor for
    SELECT Date_format(o.`obs_datetime`,'%H:%i') as hora, o.`value_coded` as concepto_ids 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and o.`person_id` = l_person_id and cn.`name`= 'Motivo de consulta'
	and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')
	and cn.`locale_preferred` = 1;
    
    #CURSOR IDENTIFICAR CONCEPTO
    declare c_identificar_concepto cursor for
    select cn.`name` 
    from concept_name cn 
    where cn.`concept_id` =  concepto_id
    and cn.`locale` = 'en'
    and cn.`locale_preferred` = 1;
    
    
    #CURSOR DESCRIPCION DEL MOTIVO
    declare c_datos_descripcion cursor for
    SELECT o.`value_text`
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and  o.`person_id` = l_person_id
	and cn.`locale`= 'en'
	and cn.`name` = 'Descripción del Motivo de la Consulta'
	and cn.`locale_preferred`= 1
	and Date_format(o.`obs_datetime`,'%d-%m-%Y') = Date_format(p_fecha,'%d-%m-%Y') ;
    
    # CURSOR GRUPO SANGUINEO
	declare c_datos_grupo_sanguineo cursor for
	SELECT 
    CASE ( select cnd.`name` from concept_name cnd 
	where  cnd.`concept_id` = o.`value_coded` and cnd.`locale_preferred` = 1)
			when 'O Positivo' then 'O+'
	        when 'O Negativo' then 'O-'
	        when 'A Positivo' then 'A+'
		    when 'A Negativo' then 'A-' 
			when 'B Positivo' then 'B+'  
			when 'B Negativo' then 'B-' 
			when 'AB POSITIVO' then 'AB+' 
			when 'AB NEGATIVO' then 'AB-' 
	        else 'error'
			end 
	        'grupo_Sanguineo'
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Grupo Sanguíneo y Factor RH' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y');

	/*CURSOR PARA LA SESION 3*/
    
    #DIRECCION EVENTO 
    declare c_direccion_Evento_session3 cursor for
    SELECT o.`value_text` as direccionSesion3 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id`= cn.`concept_id`
	and cn.`name`='Dirección del Evento' and o.`person_id`=l_person_id
    and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y');
    
    #LUGAR EVENTO 
    declare c_lugar_Evento_session3 cursor for
    SELECT o.`value_text` as lugarSesion3 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Lugar del Evento' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y');
    
    #FECHA EVENTO 
	declare c_fecha_Evento_session3 cursor for
    SELECT o.`value_datetime` as fechaSesion3
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Fecha y Hora del Evento' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y');
    
	/*CURSOR PARA LA SESION 4*/

	declare c_datos_sesion4 cursor for
	SELECT 
	sesion4Alergia.alergia,
	sesion4Clinico.clinico,
	sesion4Ginecologico.ginecologico,
	sesion4Trauma.trauma,
	sesion4Quirurgico.quirurgico,
	sesion4Farmacologico.farmacologico,
	sesion4Psiquiatrico.psiquiatrico,
	sesion4Otros.otro

	FROM person p

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as alergia 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Alergico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Alergia on sesion4Alergia.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as clinico 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Clinico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Clinico on sesion4Clinico.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as ginecologico 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Ginecologico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Ginecologico on sesion4Ginecologico.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as trauma 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Traumatologico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Trauma on sesion4Trauma.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as quirurgico 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Quirurgico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Quirurgico on sesion4Quirurgico.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as farmacologico 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Farmacologico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Farmacologico on sesion4Farmacologico.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as psiquiatrico 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Psiquiatrico' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Psiquiatrico on sesion4Psiquiatrico.`person_id` = p.`person_id`

	INNER JOIN (SELECT o.`person_id`,o.`value_text` as otro 
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Antecedente Personal/Familiar Otros' and o.`person_id` = l_person_id
     and Date_format(o.`obs_datetime`,'%d/%m/%Y') = Date_format(p_fecha,'%d/%m/%Y')) as sesion4Otros on sesion4Otros.`person_id` = p.`person_id`

	WHERE p.`person_id` = l_person_id;

	/* DECLARACION DE CURSOR DE LA SESION 6 */

	# ALTURA
	declare c_datos_altura cursor for
	SELECT o.`value_numeric` as altura
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Height (cm)' and o.`person_id` = l_person_id;

	# PESO
	declare c_datos_peso cursor for
	SELECT o.`value_numeric` as peso
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Weight (kg)' and o.`person_id` = l_person_id;

	# BMI
	declare c_datos_bmi cursor for
	SELECT o.`value_numeric` as bmi
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Temperature (C)' 
	and cn.`locale` = 'en' 
    and o.`person_id` = l_person_id;

	# PULSO
	declare c_datos_pulso cursor for
	SELECT o.`value_numeric` as pulso
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Pulse' and o.`person_id` = l_person_id;

	# RESPIRACION
	declare c_datos_respiracion cursor for
	SELECT o.`value_numeric` as repiracion
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Respiratory rate' and o.`person_id` = l_person_id;

	# PRESION
	declare c_datos_presion cursor for
	select CONCAT(presionSanguineaNumerador.`presion`,'/', presionSanguineadenominador.`presionD`) as presionT

	from (SELECT o.`person_id`,o.`value_numeric` as presion
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Systolic blood pressure'
	and o.`person_id` = l_person_id) as presionSanguineaNumerador
	
	inner join (SELECT o.`person_id`,o.`value_numeric` as presionD
	FROM obs o,concept c,concept_name cn
	WHERE 
	o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Diastolic blood pressure' and o.`person_id` = l_person_id) as presionSanguineadenominador on presionSanguineadenominador.`person_id` = presionSanguineaNumerador.`person_id`;


	# SATURACION OXIGENO
	declare c_datos_saturacion cursor for
	SELECT o.`value_numeric` as Saturacion_Oxigeno
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and cn.`name` = 'Blood oxygen saturation'
	and o.`person_id` = l_person_id;
    
    
    /* CURSOR PARA DIAGNOSTICO DE ALTA E INGRESO*/
    
    #CURSOR PARA  Visit Diagnoses
    declare c_datos_diagnostico_visita cursor for
    SELECT o.`obs_id`
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and  o.`person_id` = l_person_id 
	and cn.`locale`= 'en'
	and cn.`name` = 'Visit Diagnoses'
	and cn.`locale_preferred` = 1
	and Date_format(o.`obs_datetime`,'%Y/%m/%d') = Date_format(p_fecha,'%Y/%m/%d');

	#CURSOR PARA BUSCAR GRUPOS DE ENFERMEDADES (orden)
	declare c_datos_grupos_enfermedad_orden cursor for
	SELECT o.`value_coded`
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and  o.`person_id` = l_person_id 
	and cn.`locale`= 'en'
	and cn.`name` = 'Diagnosis order'
	and o.`obs_group_id` = concepto_id
	and cn.`locale_preferred` = 1
	and Date_format(o.`obs_datetime`,'%Y/%m/%d') = Date_format(p_fecha,'%Y/%m/%d')
	order by cn.`name` asc;
    
    #CURSOR PARA BUSCAR GRUPOS DE ENFERMEDADES SIN CONTAR CON ORDEN
    declare c_datos_grupos_enfermedades cursor for
    SELECT o.`value_coded`,cn.`name`
	FROM obs o,concept c,concept_name cn
	WHERE o.`concept_id` = c.`concept_id`
	and c.`concept_id` = cn.`concept_id`
	and  o.`person_id` = l_person_id
	and cn.`locale`= 'en'
	and cn.`name` <> 'Diagnosis order'
	and o.`obs_group_id` = concepto_id
	and cn.`locale_preferred` = 1
	order by cn.`name` asc;

    #CURSOR PARA 'Diagnosis order' Y 'Diagnosis certainty' EN INGLES
	declare c_datos_diagnostico_order_certainty cursor for
    select cn.`name`
	from concept_name cn 
	where cn.`concept_id` = concept_id_2
	and cn.`locale_preferred` = 1
	and cn.`locale` = 'en' ;
    
    #CURSOR PARA INFORMACION DE LAS ENFERMEDADES
    declare c_datos_enfermedades cursor for
    select cn.`name`
	from concept_name cn 
	where cn.`concept_id` = concept_id_2
	and cn.`locale_preferred` = 1
	and cn.`locale` = 'es' ;
    
    ############################################################################
	################## FIN DE LA DECLARACION DE CURSORES #######################
    ############################################################################


    declare continue handler for not found set v_ultima_fila=1;


	open c_obtener_id;
	      fetch c_obtener_id into l_person_id;
    close c_obtener_id;

    open c_datos_basicos;
	      fetch c_datos_basicos into cedula,apellido1,apellido2,nombre1,
	      nombre2,direccion1,parroquia,ciudad,provincia,fechacumpleanio,
	      genero,HOMBRE,MUJER,edad;
    close c_datos_basicos;

    open c_ocupacion;
    	fetch c_ocupacion into Ocupacion;
    close c_ocupacion;

	open c_etnia;
		fetch c_etnia into etnia;
	close c_etnia;

	open c_lugar_nacimiento;
		fetch c_lugar_nacimiento into lugarNacimiento;
	close c_lugar_nacimiento;

	open c_telefono;
		fetch c_telefono into telefono;
	close c_telefono;

	open c_celular;
		fetch c_celular into celular;
	close c_celular;

	open c_lugar_trabajo;
		fetch c_lugar_trabajo into lugarTrabajo;
	close c_lugar_trabajo;

	open c_estado_civil;
		fetch c_estado_civil into soltero,casado,divorciado,unio,viudo;
	close c_estado_civil;

	open c_otro_telefono;
		fetch c_otro_telefono into otrocelular;
	close c_otro_telefono;
	
    open c_datos_motivo;
    fetch c_datos_motivo into hora,concepto_id;
    close c_datos_motivo;
    
    open c_identificar_concepto;
    fetch c_identificar_concepto into motivos;
    close c_identificar_concepto;
    
    case motivos 
	when 'lesión traumática' then
		 set trauma_sesion2 = 'X' ;
		 set causa_clinica = ' ';
		 set causa_Quirúrgica = ' ';
		 set otro_Motivo = ' ' ;
		 set notificacion_Policia = ' ' ;
         set descripcion_motivo = ' ';
	when 'Causa clinica' then
		 set trauma_sesion2 = ' ' ;
		 set causa_clinica = 'X';
		 set causa_Quirúrgica = ' ';
		 set otro_Motivo = ' ' ;
		 set notificacion_Policia = ' ' ;
         set descripcion_motivo = ' ';
	when 'Causa Quirurgica' then
		 set trauma_sesion2 = ' ' ;
		 set causa_clinica = ' ';
		 set causa_Quirúrgica = 'X';
		 set otro_Motivo = ' ' ;
		 set notificacion_Policia = ' ' ;
         set descripcion_motivo = ' ';
	when 'Notificación a la policía' then
		 set trauma_sesion2 = ' ' ;
		 set causa_clinica = ' ';
		 set causa_Quirúrgica = ' ';
		 set otro_Motivo = ' ' ;
		 set notificacion_Policia = 'X' ;
         set descripcion_motivo = ' ';
	when 'Other' then
		set trauma_sesion2 = ' ' ;
		set causa_clinica = ' ';
		set causa_Quirúrgica = ' ';
		set otro_Motivo = 'X' ;
		set notificacion_Policia = ' ' ;
        open c_datos_descripcion;
        fetch c_datos_descripcion into descripcion_motivo;
        close c_datos_descripcion;
    else
		set trauma_sesion2 = ' ' ;
		set causa_clinica = ' ';
		set causa_Quirúrgica = ' ';
		set otro_Motivo = ' ' ;
		set notificacion_Policia = ' ' ;
        set descripcion_motivo = ' ';
    end case;
    open c_datos_seguro;
	      fetch c_datos_seguro into seguro;
    close c_datos_seguro;

    open c_datos_grupo_sanguineo;
	      fetch c_datos_grupo_sanguineo into grupo_Sanguineo;
    close c_datos_grupo_sanguineo;

    open c_direccion_Evento_session3;
	      fetch c_direccion_Evento_session3 into direccionSesion3;
    close c_direccion_Evento_session3;

    open c_lugar_Evento_session3;
	      fetch c_lugar_Evento_session3 into lugarSesion3;
    close c_lugar_Evento_session3;

    open c_fecha_Evento_session3;
	      fetch c_fecha_Evento_session3 into fechaSesion3;
    close c_fecha_Evento_session3;

    open c_datos_sesion4;
		fetch c_datos_sesion4 into alergia,clinico,ginecologico,trauma,quirurgico,farmacologico,psiquiatrico,otro;
    close c_datos_sesion4;


	open c_datos_altura;
		fetch c_datos_altura into altura;
	close c_datos_altura;

	open c_datos_peso;
		fetch c_datos_peso into peso;
	close c_datos_peso;

	open c_datos_bmi;
		fetch c_datos_bmi into bmi;
	close c_datos_bmi;

	open c_datos_pulso;
		fetch c_datos_pulso into pulso;
	close c_datos_pulso;

	open c_datos_respiracion;
		fetch c_datos_respiracion into repiracion;
	close c_datos_respiracion;

	open c_datos_presion;
		fetch c_datos_presion into presionT;
	close c_datos_presion;

	open c_datos_saturacion;
		fetch c_datos_saturacion into Saturacion_Oxigeno;
	close c_datos_saturacion;

	/*set bandera = 0;
    open c_datos_diagnostico_visita;
    iterador: loop
    fetch c_datos_diagnostico_visita into concepto_id; 
    	IF v_ultima_fila=1 THEN
                LEAVE iterador;
        END IF;
		select concepto_id;##########
        open c_datos_grupos_enfermedad_orden;
	        fetch c_datos_grupos_enfermedad_orden into concept_id_2; 
        close c_datos_grupos_enfermedad_orden;

        open c_datos_diagnostico_order_certainty;
	        fetch c_datos_diagnostico_order_certainty into orden; 
        close c_datos_diagnostico_order_certainty;
        
        set concept_id_2 = ' ';
		select orden; #########
        
        open c_datos_grupos_enfermedades;
        	iterador2: loop
        	fetch c_datos_grupos_enfermedades into concept_id_2,valor;
        		IF v_ultima_fila=1 THEN
                	LEAVE iterador2;
       			END IF;
                select valor ;#########
       			case valor 
       			when 'PROBLEM LIST'  then
					select bandera; #########
       				case bandera
       				when 0 then
       					case orden
       					when 'Primary' then
       						open c_datos_enfermedades;
	       					fetch c_datos_enfermedades into enfermedad_1_ingreso;
	       					close c_datos_enfermedades;
       					when 'Secondary' then
       						open c_datos_enfermedades;
	       					fetch c_datos_enfermedades into enfermedad_1_alta;
	       					close c_datos_enfermedades;
       					end case;
       				when 1 then
       					case orden
       					when 'Primary' then
       						open c_datos_enfermedades;
	       					fetch c_datos_enfermedades into enfermedad_2_ingreso;
	       					close c_datos_enfermedades;
       					when 'Secondary' then
       						open c_datos_enfermedades;
	       					fetch c_datos_enfermedades into enfermedad_2_alta;
	       					close c_datos_enfermedades;
       					end case;
       				when 2 then
       					case orden
       					when 'Primary' then
       						open c_datos_enfermedades;
	       					fetch c_datos_enfermedades into enfermedad_3_ingreso;
	       					close c_datos_enfermedades;
       					when 'Secondary' then
       						open c_datos_enfermedades;
	       					fetch c_datos_enfermedades into enfermedad_3_alta;
	       					close c_datos_enfermedades;
       					end case;
       				end case;
       			when 'Diagnosis certainty' then
       				case bandera
       				when 0 then
       					case orden
       					when 'Primary' then
       						open c_datos_diagnostico_order_certainty;
	       					fetch c_datos_diagnostico_order_certainty into valor2;
	       					close c_datos_diagnostico_order_certainty;
	       					case valor2
	       					when 'Presumed diagnosis' then
	       						set presunto_1_ingreso = 'X';
	       						set confirmado_1_ingreso = ' ';
	       					when 'Confirmed diagnosis' then
	       						set confirmado_1_ingreso = 'X';
	       						set presunto_1_ingreso = ' ';
	       					end case;
	       					set valor2 = ' ';
       					when 'Secondary' then
       						open c_datos_diagnostico_order_certainty;
	       					fetch c_datos_diagnostico_order_certainty into valor2;
	       					close c_datos_diagnostico_order_certainty;
	       					case valor2
	       					when 'Presumed diagnosis' then
	       						set presunto_1_alta = 'X';
	       						set confirmado_1_alta = ' ';
	       					when 'Confirmed diagnosis' then
	       						set confirmado_1_alta = 'X';
	       						set presunto_1_alta = ' ';
	       					end case;
	       					set valor2 = ' ';
       					end case;
       				when 1 then
       					case orden
       					when 'Primary' then
       						open c_datos_diagnostico_order_certainty;
	       					fetch c_datos_diagnostico_order_certainty into valor2;
	       					close c_datos_diagnostico_order_certainty;
	       					case valor2
	       					when 'Presumed diagnosis' then
	       						set presunto_2_ingreso = 'X';
	       						set confirmado_2_ingreso = ' ';
	       					when 'Confirmed diagnosis' then
	       						set confirmado_2_ingreso = 'X';
	       						set presunto_2_ingreso = ' ';
	       					end case;
	       					set valor2 = ' ';
       					when 'Secondary' then
       						open c_datos_diagnostico_order_certainty;
	       					fetch c_datos_diagnostico_order_certainty into valor2;
	       					close c_datos_diagnostico_order_certainty;
	       					case valor2
	       					when 'Presumed diagnosis' then
	       						set presunto_2_alta = 'X';
	       						set confirmado_2_alta = ' ';
	       					when 'Confirmed diagnosis' then
	       						set confirmado_2_alta = 'X';
	       						set presunto_2_alta = ' ';
	       					end case;
	       					set valor2 = ' ';
       					end case;
       				when 2 then
       					case orden
       					when 'Primary' then
       						open c_datos_diagnostico_order_certainty;
	       					fetch c_datos_diagnostico_order_certainty into valor2;
	       					close c_datos_diagnostico_order_certainty;
	       					case valor2
	       					when 'Presumed diagnosis' then
	       						set presunto_3_ingreso = 'X';
	       						set confirmado_3_ingreso = ' ';
	       					when 'Confirmed diagnosis' then
	       						set confirmado_3_ingreso = 'X';
	       						set presunto_3_ingreso = ' ';
	       					end case;
	       					set valor2 = ' ';
       					when 'Secondary' then
       						open c_datos_diagnostico_order_certainty;
	       					fetch c_datos_diagnostico_order_certainty into valor2;
	       					close c_datos_diagnostico_order_certainty;
	       					case valor2
	       					when 'Presumed diagnosis' then
	       						set presunto_3_alta = 'X';
	       						set confirmado_3_alta = ' ';
	       					when 'Confirmed diagnosis' then
	       						set confirmado_3_alta = 'X';
	       						set presunto_3_alta = ' ';
	       					end case;
	       					set valor2 = ' ';
       					end case;
       				end case;
       			end case;
       			set bandera = bandera + 1;
        	end loop iterador2;
        	set bandera = 0;
        close c_datos_grupos_enfermedades;
     
    end loop iterador;
    close c_datos_diagnostico_visita;*/
    
   select cedula , apellido1 , apellido2 , nombre1 , nombre2 , direccion1 , parroquia , ciudad , provincia , 
    Date_format(fechacumpleanio,'%d/%m/%Y') as fechacumpleanio , genero , HOMBRE , MUJER , edad , Ocupacion , etnia , lugarNacimiento , telefono , celular , 
    lugarTrabajo , otrocelular , soltero , casado , divorciado , unio, viudo, Date_format(p_fecha,'%d/%m/%Y') as fechaemision, seguro ,
    hora,trauma_sesion2,causa_clinica,causa_Quirúrgica,otro_Motivo,notificacion_Policia,descripcion_motivo, grupo_Sanguineo , 
    direccionSesion3 , lugarSesion3  ,Date_format(fechaSesion3,'%d/%m/%Y %H:%i') as fechaSesion3  , alergia , clinico , ginecologico , trauma , quirurgico , 
    farmacologico , psiquiatrico , otro , altura , peso , bmi , pulso , repiracion , presionT , Saturacion_Oxigeno ,
    enfermedad_1_alta,confirmado_1_alta,presunto_1_alta,enfermedad_2_alta,
    confirmado_2_alta,presunto_2_alta,enfermedad_3_alta,confirmado_3_alta,presunto_3_alta,
    enfermedad_1_ingreso,confirmado_1_ingreso,presunto_1_ingreso,enfermedad_2_ingreso,
    confirmado_2_ingreso,presunto_2_ingreso,enfermedad_3_ingreso,confirmado_3_ingreso,presunto_3_ingreso;
END $
delimiter ;

