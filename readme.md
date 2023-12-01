# API'S ASIGNACION DE GRUPOS Y SALONES

Backend creado en su totalidad con EXPRESS JS para uso de SQLSERVER.

## Comandos a ejecutar

Primero debemos de instalar las dependencias necesarias con:

    $ npm install

Si queremos ejecutar en modo desarrollo ejecutaremos el siguente comando:

    $ npm run dev

## Antes de ejecutar

Tienes que crear en la raiz del proyecto un archivo .env con la siguiente estructura.

    PORT = 3000

    USER = ''
    PASSWORD = ''
    SERVER = 'localhost'
    DATABASE = ''

Los datos del .env deben ser correspondientes a tu SQlServer. 

### Configuración de SQLSERVER

¡Como tip use el SSMS para que todo sea mas fácil!

1. Tienes que restaurar el archivo .bak que se encuntra en la carpeta database donde contiene la base de datos para ello puedes consultar la documentación oficial: [Restaurar una base de datos con archivos .bak][3]

[3]: https://learn.microsoft.com/es-es/sql/relational-databases/backup-restore/restore-a-database-backup-using-ssms?view=sql-server-ver16#examples

2. Para crear un usuario en SQLSever con los permisos de SYSADMIN puedes revisar la documentación oficial: [Agregar usuario en SQLSERVER][1]

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/create-a-login?view=sql-server-ver16

3. Debes de activar la comunicacion TCP/IP para eso puedes revisar la documentación oficial: [Activar TCP/IP][2]

[2]: https://learn.microsoft.com/es-es/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port?view=sql-server-ver16
