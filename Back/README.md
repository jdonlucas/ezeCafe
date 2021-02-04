# Instalación

*  Corre en bash [npm i]
*  Crea el archivo [.env] en el directorio raíz del proyecto con la siguiente estructura:

```
PORT = 3000
DEVELOPMENT_DATABASE_URL = "[postgres]://[user]:[password]@[host]:[port]/[database]"
SECRET_KEY = "[secret key]"
```

*  Corre en bash [sequelize db:migrate]
*  Corre en bash [npm run start]

# SEQUELIZE 

### Asociaciones: 
    
 https://stackoverflow.com/questions/22958683/how-to-implement-many-to-many-association-in-sequelize
 http://docs.sequelizejs.com/class/lib/associations/belongs-to-many.js~BelongsToMany.html

### Operadores: 
    
[Documentación querying](http://docs.sequelizejs.com/manual/tutorial/querying.html)

### Comandos: 

```
sequelize model:create --name User --attributes name:string,email:string
```
```
db:migrate                        Correr migraciones pendientes
db:migrate:schema:timestamps:add  Actualizar las tablas de migraciones con marcas de tiempo
db:migrate:status                 Mostrar el status de todas las migraciones
db:migrate:undo                   Revertir una migración
db:migrate:undo:all               Revertir todas las migraciones
db:seed                           Correr una semilla específica
db:seed:undo                      Eliminar datos de la base de datos
db:seed:all                       Correr todas las semillas
db:seed:undo:all                  Eliminar todos los datos de la base de datos
db:create                         Crear base de datos especificada por la configuración
db:drop                           Eliminar la case de datos especificada por la configuración
init                              Inicializar proyecto
init:config                       Inicializar configuración
init:migrations                   Inicializar migraciones
init:models                       Inicializar modelos
init:seeders                      Inicializar semillas
migration:generate                Genera un nuevo archivo de migración       [aliases: migration:create]
model:generate                    Genera un modelo y su migración            [aliases: model:create]
seed:generate                     Genera un nuevo archivo de semilla         [aliases: seed:create]
```

#### Opciones:
```
--version  Mostrar número de versión                                         [boolean]
--help     Mostrar ayuda                                                     [boolean]
```