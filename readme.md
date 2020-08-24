para iniciar el proyecto

copia del repositorio

git clone https://github.com/nikacer/servInformacion.git

instalacion de dependencias necesarias y de desarrolllo

npm i

npm run debug // inicializa modo de compilacion para desarrollo (compilacion automatica y servidor con nodemon)
npm run build // compila ts a js
npm run start // ejecuta la ultima versión compilada del proyecto
npm run dev // Ejecuta nodemon en la ultima versÃ³n compilada

ejemplo consultas

para obtener el token localhost:5000/seguridad/token
es necesario que exista el usuario en la base de datos

{
    "correo":"nikolasg77@gmail.com"
}


!importante a partir de aca debe entregarse el token de lo contrario ninguna peticion respondera los datos esperados
header:{ Authorization: "Bearer Token"}

para insertar una nueva empresa, si la empresa no tiene id se creara una, de lo contrario se modificara, del mismo modo pasa con las sedes

localhost:5000/empresa/insertar

{
    "nombre": "exito",
    "id":"3", // si no tiene se cerara
    "sedes":[{
	   "id":"1" // si no tiene se creará
        "direccion": "calle 25 # 12 - 51 cundinamarca colombia",
        "telefono": 3006167382
    }]
}

para insertar un catalogo, si contiene id el catalogo se modificará

localhost:5000/empresa/catalogo/insertar

{
    "id":"2",
    "tipo": "s",
    "nombre": "hamburguesa",
    "descripcion":"Rica comida para pasar un tiempo en familia",
    "costo":45000,
    "id_moneda":3,
    "id_categoria":1,
    "id_empresa":1
}

para relacionar un catalogo con una sede, si encuentra la relacio actualiza, si no inserta, si se requiere que no se muestre se entrega elñ estado en false

localhost:5000/empresa/catalogo/sede

{
    "id_sede": 1,
    "catalogos": [{
        "id_catalogo":5,
        "estado": true
    }]
}
