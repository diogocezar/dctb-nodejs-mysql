/**
*   Chat Node Server
*   Server literal object to start nodejs server
*   Author: Diogo Cezar Teixeira Batista
*   Year: 2015
*/

NodeServer = {
	port       : '8080',
	socket     : require('socket.io'),
	express    : require('express'),
	http       : require('http'),
	mysql      : require('mysql'),
	configs    : {
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : ''
	},
	connection : null,
	app        : null,
	server     : null,
	io         : null,
	init : function(){
		NodeServer.connection = NodeServer.mysql.createConnection(NodeServer.configs);
		NodeServer.app        = NodeServer.express();
		NodeServer.server     = NodeServer.http.createServer(NodeServer.app);
		NodeServer.io         = NodeServer.socket.listen(NodeServer.server);
		NodeServer.go();
		NodeServer.connection.connect();
	},
	go : function(){
		NodeServer.io.sockets.on('connection', function(client){
			client.on("get", function(data){
				var sql = "SELECT * FROM user";
				NodeServer.connection.query(sql, function(err, rows, fields){
					if(!err)
						NodeServer.io.sockets.emit("result", { rows: rows });
					else
						console.log('Error getting data from MySQL');
				});
			});
		});
		NodeServer.server.listen(NodeServer.port);
	}	
}

NodeServer.init();