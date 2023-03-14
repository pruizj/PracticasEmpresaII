# PracticasEmpresaII

Este es un proyecto que consiste en una plataforma de cartelera de cine para dos tipos de usuarios: administradores y usuarios regulares.

Los administradores tienen permiso para cambiar el rol de los usuarios, así como crear, editar y eliminar cines y películas. Por otro lado, los usuarios regulares pueden ver los cines y películas, hacer comentarios y reservas.

## Ejecución 🚀

Para ejecutar este programa por primera vez, es necesario rellenar el archivo .env con las variables del archivo .env.sample.
Luego, hay que ejecutar los siguientes comandos en la terminal desde el directorio principal:

```
yarn install
yarn run docker up --build
```

## Web 📋

La plataforma se puede acceder a través de

```
localhost:8008/access
```

## Ejecutando las pruebas ⚙️

Para ejecutar los test unitarios e integración en la terminal debes ejecutar:

```
cd packages/api
yarn run test-env
```
y desde el directorio principal en otra terminal ejecutar:

```
yarn run unit-tests
```

## Construido con 🛠️

* Next - framework front usado
* Node - framework api usado
* Jest - Usado para generar tests
* Docker - Para desplegar la aplicación en un contenedor

## Autora ✒️

* **Paula Ruiz Jiménez** 
