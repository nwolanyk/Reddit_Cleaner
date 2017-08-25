$.ajax({
                    url: "http://127.0.0.1:5000/hello",
                    type: 'GET',
		    contentType : "application/jsonp; charset=utf-8",
		    //jsonp : 'callback',
		    //jsonpCallback: 'jsonp_callback',
		    //crossDomain: true,
                    dataType: 'jsonp',
		    success: function(data){
                        data = JSON.parse(data)
		    	console.log(data)
		    var xhttp = new XMLHttpRequest();
		    xhttp.open("POST", 'http://127.0.0.1:5000/hello', true);},
		    error: function(data,a,b){
			console.log(data);
			console.log(a);
			console.log(b);
		    }
});
