/**
*   Chat Node Client
*   Client to connect to node server and return broadcasts
*   Author: Diogo Cezar Teixeira Batista
*   Year: 2015
*/

NodeClient = {
	host   : '11.1.1.40',
	port   : '8080',
	socket : null,
	init : function(){
		NodeClient.socket = io.connect('http://' + NodeClient.host + ':' + NodeClient.port);
		NodeClient.emit();
		NodeClient.on();
	},
	emit : function(obj){
		NodeClient.socket.emit('get');
	},
	on : function(obj){
		NodeClient.socket.on('result', function(data){
			var result = data.rows;
			var str    = "<ul>";
			for(var i=0; i<result.length; i++){
				str += "<li>";
				str += "Nome: "  + result[i].name;
				str += "<br/>";
				str += "Email: " + result[i].email;
				str += "</li>";
			}
			str += "</ul>";
			$("#content").empty().html(str);
		});
	}
}

NodeClient.init();