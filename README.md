# Proyecto eze Café

Plataforma que gestiona el sistema de caja, comanda e inventario de eze Café. Se construye con angular para el front y node.js y express para el back, utilizando el ORM de sequelize.

### Necesario

* Angular CLI (version 8.2.0)
* Node.js (version 10.16.1)[npm (version 6.9.0)]
* MySQL

## Instalación

#### Node.js 

* Ubuntu/Debian

Primero hay que agregar el PPA al tu sistema para instalar Node.js en Ubuntu.
```
sudo apt-get install curl python-software-properties
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash 
```

Después de esto podemos instalar Node.js en ubuntu corriendo el siguiente comando:
```
sudo apt-get install nodejs
```

y comprobamos que la instalación se haya realizado comprobando las versiones de Node:
```
$ node -v 

v10.16.1
```
y npm: 
```
$ npm -v 

6.9.0
```
* Otros sistemas

Para la instalación de Node en Windows o Mac sólo es necesario descargar el [instalador](https://nodejs.org/en/#download) para su respectivo sistema operativo, directamente desde el sitio web de [nodejs.org](https://nodejs.org/en/) y seguir sus instrucciones en pantalla.

#### Angular CLI

La instalación de Angular CLI es igual en todos los sistemas. 

*Importante:* Es necesario ya tener instalado node.js

Para instalar Angular CLI hay que correr el siguiente comando en terminal:
```
npm install -g @angular/cli
```

Una vez instalado podemos correr comandos propios de Angular CLI:
```
ng serve                  # para correr el proyecto en servidor de prueba
ng g c [componentName]    # para crear un componente nuevo
ng g m [moduleName]       # para crear un módulo nuevo
```
Para conocer más referirse a la [documentación de Angular](https://angular.io/cli), o el archivo README del Front.

#### PostgresSQL con PgAdmin4

* Ubuntu/Debian

Para la instalación de postgresql en sistemas basados en Debian sólo es necesario correr los siguientes comandos:
```
sudo apt update

sudo apt install posgresql
```

Para la instalación de pgAdmin4 es necesario correr los siguientes comandos:
```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'

sudo apt install wget ca-certificates

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add

sudo apt update

sudo apt install pgadmin4
```
una vez instalado se debe configurar el servidor donde corre postgresql, en el caso de un servidor local:

Dirección: localhost
Port: 5432
Contraseña: [contraseña definida por el usuario]

* Windows/Mac

Para instalar postgreSQL en Windows o Mac es necesario [descargar el instalador](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) y seguir los pasos del mismo. 

Una vez en el instalador, se recomienda dejar puerto por default (5432) y designar una contraseña memorable para acceder a él. 

Para la instalación de pgAdmin4 en Windows se necesita descargar su [instalador](https://www.pgadmin.org/download/pgadmin-4-windows/) en su versión más reciente, y lo mismo para [MacOs](https://www.pgadmin.org/download/pgadmin-4-macos/).

## Para deployment en server

Es necesario revisar varios puntos:

# Back

- Verificar que las rutas en los cors apunten a negocio.ezecafe.com.mx y no a localhost:8000
- Correr el servidor con forever y no con npm:
```
$ forever start ./bin/www
```
para esto hay que estar parados en el directorio Back/ que alberga los archivos del servidor

# Front 

- Verificar que las rutas de la api sean db.ezecafe.com.mx y no localhost:3000
- Correr ng build --prod para obtener el compilado de la aplicacion de angular
- Eliminar en servidor los archivos anteriores de la aplicacion
- Copiar los archivos generador con ng build, ubicados en dist/ezeCafe/ en la carpeta root del subdominio negocio en servidor

