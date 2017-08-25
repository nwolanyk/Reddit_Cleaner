jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

//nele is the number of elements
//elmtest = new Array(1)
//elmtest[0] = $('div:regex(class,.*dkrl8wa.*)')[0]
//elmtest[1] = $('div:regex(class,.*dkrw4vz.*)')[0]
//var data = {"suburl": window.location.href}
//create array of all elements
//delarr = $('div:regex(class,.*thing id-t1.*)')

//create array of elements to keep called keeparr
//scan through keeparr to add elements before the first comment


//insert elmtest before the first comment
//$('div:regex(class,.*thing id-t1.*)')[0].prepend(elmtest)
//for (ii = 0; ii < elmtest.length; ii++){
//	$('div:regex(class,.*commentarea.*)')[0].prepend(elmtest[ii])
//}


var baseURL = "http://63.142.253.67:5000/";
var data = {"suburl": window.location.href}
 //Get the parameters descriptions
    $.ajax({
        method: 'GET',
        url:baseURL,
        contentType : 'json',
        data: data,
        headers: {
            "Accept" : "application/json"
        },
        success:function(data){
                console.log(data);
		//need to change this line below if you want to make feature #2
		commenttexts = new Array(3)//data['comment id'].length)
		delarr = $('div:regex(class,.*thing id-t1.*comment)')
		start = 0;
		index = new Array(commenttexts.length)
		for(ii = 0; ii < commenttexts.length; ii++) {
			while(delarr[start].childNodes[2].childNodes[1].childNodes[1].childNodes[0].childElementCount!=1){
				start = start + 1
			}
			index[ii] = start
			console.log(index)
			delarr[start].childNodes[2].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].nodeValue = data['id'+ii]
			start = start + 1
		}		
		//keepcomment = new Array(data['comment id'].length)
		//for(ii = 0; ii < keepcomment.length; ii++) {
		//	keepcomment[ii] = $('div:regex(class,.*'+data['comment id'][ii]+'.*)')[0]
		//}
		for (ii = commenttexts.length; ii >-1; ii--){
			$('div:regex(class,.*commentarea.*)')[0].prepend(delarr[index[ii]])
		}
		console.log(index)
                for (ii = 0; ii < delarr.length; ii++) {
			if( index.indexOf(ii) == -1){//!keepcomment.includes(delarr[ii])){
				delarr[ii].parentElement.removeChild(delarr[ii])
			}
		}    
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
            } 
    });

