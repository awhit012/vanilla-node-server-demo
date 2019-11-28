const http = require('http')
const fs = require('fs');

const users = [
	{
		name: "Alex"
	},{
		name: "Umar"
	},{
		name: "Jaela"
	},{
		name: "Kat"
	}
]

const comments = [{body: "This is awesome!"}]

const bodyParser = (request) => {
	let body = '';
	request.on('data', (chunk) => {
	  body += chunk.toString();
	}).on('end', () => {
	  return body
	});
}

const userController = (request, response) => {
	if(request.method === "GET") {
		response.writeHead(200,{'Content-Type':'application/json'});
		response.write(JSON.stringify(users));
	} else if(request.method === "POST") {
		const newUser = bodyParser(request)
		users.push(newUser)
		response.writeHead(200,{'Content-Type':'application/json'});
  	response.end();
	}
}

const commentController = (request, response) => {
	response.writeHead(200,{'Content-Type':'application/json'});
	response.write(JSON.stringify(comments));
  response.end();
}

const homeController = (request, response) => {
	response.writeHeader(200, {"Content-Type": "text/html"}); 
	fs.readFile('./index.html', function (err, html) {
    if (err) {
      throw err; 
    }
  	response.write(html); 
  	response.end();

  })       
}

const makeServer = (request,response) => {
	switch(request.url) {
		case '/api/users':
			userController(request, response)
			break
		case '/api/comments': 
			commentController(request, response)
			break
		case '/': 
			homeController(request, response)
			break
	}
}
      
const server = http.createServer(makeServer);

server.listen(3000,()=>{
  console.log('Node server created at port 3000');
})