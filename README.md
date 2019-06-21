# HospitalLeonBecerra
Proyecto de pasantías comunitarias. Aplicación web para el Hospital León Becerra. 

### Deploy en produccion
Para colocar los OWA en produccion teniendo instalado el framework *OpenMRS*, se debe tener en cuenta lo siguiente:
##### Archivo config.json
En cada modulo se debe tener el archivo `config.json` que establece donde se hara el deploy del modulo.
Aquella ruta debe coincidir con la que se encuentra en la configuracion de OpenMRS
``` json
{
  "LOCAL_OWA_FOLDER": "/var/lib/OpenMRS/owa/",
  "APP_ENTRY_POINT": "http://localhost:8080/openmrs/owa/admisiones/index.html"
}
```

#### Instalar dependencias del modulo y deploy
Ejecutar las siguientes sentencias:
``` bash
$ npm i
$ sudo npm run:build
```
Esto instalara el modulo en la carpeta ``/var/lib/OpenMRS/owa/`` o donde se haya especificado en ``config.json`` 
Procedemos a reiniciar Tomcat
```
sudo systemctl stop tomcat
sudo systemctl start tomcat
```
