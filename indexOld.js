const http = require('http');

const notes = [
  { id: 1, title: 'Express'},
  { id: 2, title: 'Mongo' },
  { id: 3, title: 'Docker' }
]

const app = http.createServer((request, response) => {
 // construir toda la respuesta de BE hacia el FE
 // consulta a base de datos, transformar, CRUD
  response.writeHead(200, {'Content-type': 'application/json'})
  response.write(JSON.stringify(notes))

  response.end();

})

const PORT = 8080;

app.listen(PORT, () => {


  console.log('Server is running on locahost:8080')
});






