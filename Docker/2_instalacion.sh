# Copiar modulos
docker exec -it openmrs bash -c "mv /root/owa /root/.OpenMRS/"
docker exec -it openmrs bash -c "mv /root/modules /root/.OpenMRS/"

# Copiar conceptos a la base de datos
mysql -h 0.0.0.0 -P 3308 -u root -proot < ./dependencias/openmrs/openmrs.sql

docker stop openmrs
docker start openmrs