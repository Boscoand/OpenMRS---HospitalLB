# Para todos los contenedores en ejecución
docker stop $(docker ps -a -q)  

# Borra todos los contenedores de la máquina
docker rm $(docker ps -a -q)

# Instancia imagen de mysql 5.6
docker run --name mysql56 -p 3308:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.6

# Build de imagen a partir de Dockerfile
docker build -t openmrs:espol .

# Instancia de imagen creada en el punto anterior
docker run --name openmrs -p 8081:8080 --link mysql56:db -d openmrs:espol
