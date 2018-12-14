# Para la realización de este código, tomé como referencia este repositorio de Github: https://github.com/davidochobits/docker-centos-7-tomcat

FROM centos:7

ENV container docker

RUN yum -y update
RUN yum -y install sudo \
	tar \
	gzip \
	openssh-clients \
	java-1.8.0-openjdk-devel \
	vi \
	find

# Instalción de Tomcat
RUN groupadd tomcat
RUN useradd -M -s /bin/nologin -g tomcat -d /opt/tomcat tomcat

ADD dependencias/tomcat/apache-tomcat-8.5.35.tar.gz /opt/

RUN mv /opt/apache-tomcat-8.5.35 /opt/tomcat

ADD dependencias/tomcat/tomcat-users.xml /opt/tomcat/conf
ADD dependencias/tomcat/context.xml /opt/tomcat/webapps/manager/META-INF/context.xml
ADD dependencias/tomcat/context.xml /opt/tomcat/webapps/host-manager/META-INF/context.xml

RUN cd /opt/tomcat; \
	chgrp -R tomcat /opt/tomcat; \
	chmod -R g+r conf; \
	chmod g+x conf; \
	chown -R tomcat /opt/tomcat/webapps/; \
	chown -R tomcat /opt/tomcat/work/; \
	chown -R tomcat /opt/tomcat/temp/; \
	chown -R tomcat /opt/tomcat/logs/

ENV JAVA_HOME /usr/lib/jvm/jre
ENV CATALINA_PID /opt/tomcat/temp/tomcat.pid
ENV CATALINA_HOME /opt/tomcat
ENV CATALINA_BASE /opt/tomcat

EXPOSE 8080
VOLUME "/opt/tomcat/webapps"

# Añadir OpenMRS a Tomcat
ADD dependencias/openmrs/openmrs.war /opt/tomcat/webapps

# Copiar modulos 
ADD modulos/defecto/modules /root/modules
ADD modulos/defecto/owa /root/owa
ADD modulos/nuevos /root/owa/

#Lanzar Tomcat
CMD ["/opt/tomcat/bin/catalina.sh", "run"]
