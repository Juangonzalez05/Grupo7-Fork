# Gestion-Escolar
Proyecto Django gestion escolar 

Iniciar el proyecto

1.	Git clone https://github.com/Juangonzalez05/Gestion-Escolar.git
2.	Tener instalado node.js y Python en el equipo, y tener instalado en el Python el pip install virtualenv
3.	Crear el entorno dentro
Luego poner el siguiente comando para la creación del entorno virtual:

virtualenv Entorno

4.	Después de haber creado el entorno se debe poner en una terminal de visual el siguiente comando:

.\Entorno\Scripts\activate   

5.	Después poner el siguiente comando para ingresar dentro de la carpeta de backend, deberías estar ubicado dentro de esta carpeta

cd .\Backend\    


6.	Luego introducir el comando para descargar los requerimientos del backend, con el siguiente comando:

pip install -r .\requirements.txt   

7.	Después iniciamos el servidor para las apis con el siguiente comando:

python .\manage.py runserver  

8.	Después dejar esa terminal abierta de backend, y abrir una terminal nueva dentro de visualstudio para iniciar el servidor de frontend

9.	Nos ubicamos con el siguiente comando:

cd .\Frontend\

10.	Después debemos descargar los requerimientos necesarios para el frontend con el siguiente comando:

npm install

11.	Después iniciamos el servidor de react para visualizar todo con el siguiente comando:

npm run dev  

12.	Si no sabes cómo es la ruta inicial del proceso, aquí te dejo un ejemplo de la ruta de front:

http://localhost:5173/login

Y este es una ejemplo de la ruta de backend

http://127.0.0.1:8000/api/

