$(document).ready(function() {

var savie1 = {savedTimeStamp:"milkshake"};
var savie2 = {savedTimeStamp:"milkshake"};
var savie3 = {savedTimeStamp:"milkshake"};
var sam = {hobby:"skiing"};
var matthew = {nombre:"foo123"};
setInterval(brains,500);
function brains(){
	if(matthew.nombre==="foo123"){var wasteoftime = true;
	}
	else if(sam.hobby==="skiing"){apple1();keith();
	}
	else if(sam.hobby==="drinking"){apple2();keith();
	}
	else if(sam.hobby==="cowtipping"){apple3();keith();
	}
}
swal ({ 
	title: "Welcome to Cat Chat!",   
	text: "Type a username below. Make it good.",   
	type: "input",   
	showCancelButton: true,   
	closeOnConfirm: false,   
	animation: "slide-from-top",   
	inputPlaceholder: "CheetohLord", 
	imageURL: "http://graphics8.nytimes.com/images/2012/10/20/health/20well-cheeto2/20well-cheeto2-tmagArticle.jpg"
	}, 
	function(name){ 
		console.log(typeof name);
		$('span').append(name);
		matthew.nombre = name;
	  	if (name === false) 
		return false;      
		if (name === "") {     
			swal.showInputError("You need to write something!");     
			return false   }
			swal("Well, alright...", "Your amazing username is: " + name, "success");
			//sam.hobby="painting";
			 });
		
// var yell = "";
// yell = z[z.length-1].message; 
//     talky();
//03:04::03. AM


function apple1(){$.get('https://cat-chat-1.herokuapp.com/chatrooms/The_Living_Room', function(z){	
	console.log(z);
	$('#displayWindow1').html('');
	var patt1 = new RegExp("http");
		
	var	patt2 = new RegExp("jpeg");
	
	var	patt3 = new RegExp("png");
		
	var	patt4 = new RegExp("jpg");
	
	var	patt5 = new RegExp("damn");
		
	var	patt6 = new RegExp("gif");
		
	var	patt7 = new RegExp(".ico");
	
	var hotdog = new RegExp("taint");	
	console.log(hotdog);
	if(matthew.nombre==="foo123"){
		console.log("no update yet name is not chosen")
	}
	else if(hotdog.test(z[z.length-1].message)===true){
			
			yell=z[z.length-1].user + " is a potty mouth";
			talky();
			savie1.savedTimeStamp = z[z.length-1].created_at;
	}
	else if(typeof z === undefined){
		console.log('z is blank');
	}
	else if(z[z.length-1].created_at === savie1.savedTimeStamp){
		console.log('houseboat');
	}
	else if(
//		patt1.test(z[z.length-1].message)===true ||
		
		patt2.test(z[z.length-1].message)===true ||
	
		patt3.test(z[z.length-1].message)===true ||
		
		patt4.test(z[z.length-1].message)===true ||
		
		patt5.test(z[z.length-1].message)===true ||
		
		patt6.test(z[z.length-1].message)===true ||
	
		patt7.test(z[z.length-1].message)===true){
			console.log(z[z.length-1].message.match(/http/));
			yell=z[z.length-1].user + " posted a picture";
			talky();
			savie1.savedTimeStamp = z[z.length-1].created_at;
	}
		else if(hotdog.test(z[z.length-1].message)===true){
			
			yell=z[z.length-1].user + " is a potty mouth";
			talky();
			savie1.savedTimeStamp = z[z.length-1].created_at;
	}
	else {
		yell=z[z.length-1].message;console.log(yell);talky();savie1.savedTimeStamp = z[z.length-1].created_at;
		console.log(savie1.savedTimeStamp);
	}
	for(var p = 0;p<z.length;p++){
		var currentTime = z[p].created_at;
  		var currentHours = currentTime.slice(11,13);
  		var currentMinutes = currentTime.slice(14,16);
  		var currentSeconds = currentTime.slice(17,19);
  		var currentMonth = currentTime.slice(5,7);
  		var currentYear = currentTime.slice(0,4);
  		var currentDay = currentTime.slice(8,10);
  		var currentTimeString = currentMonth + "/" + currentDay + "/" + currentYear + " " + currentHours + ":" + currentMinutes + ":" + currentSeconds;
  		console.log(currentTimeString);
		$('#displayWindow1').append("<div id='pickles'>" +currentTimeString + "</div> " + z[p].user + ": " + z[p].message + "<br/>");
   	}
   	$('#displayWindow1').emoticonize();
   	keith();
    $('#displayWindow1').scrollTop($('#displayWindow1')[0].scrollHeight);
	});
}
		
	apple1();
function apple2(){$.get('https://cat-chat-1.herokuapp.com/chatrooms/The_Tree', function(z){	
	$('#displayWindow2').html('');
	var patt1 = new RegExp("http");
		
	var	patt2 = new RegExp("jpeg");
	
	var	patt3 = new RegExp("png");
		
	var	patt4 = new RegExp("jpg");
	
	var	patt5 = new RegExp("jpeg");
		
	var	patt6 = new RegExp("gif");
		
	var	patt7 = new RegExp(".ico");
		
	if(matthew.nombre==="foo123"){
		console.log("no update yet name is not chosen")
	}
	else if(typeof z === undefined){
		console.log('z is blank');
	}
	else if(z[z.length-1].created_at === savie2.savedTimeStamp){
		console.log('houseboat');
	}
	else if(
//		patt1.test(z[z.length-1].message)===true ||
		
		patt2.test(z[z.length-1].message)===true ||
	
		patt3.test(z[z.length-1].message)===true ||
		
		patt4.test(z[z.length-1].message)===true ||
		
		patt5.test(z[z.length-1].message)===true ||
		
		patt6.test(z[z.length-1].message)===true ||
	
		patt7.test(z[z.length-1].message)===true){
			console.log(z[z.length-1].message.match(/http/));
			yell=z[z.length-1].user + " posted a picture";
			talky();
			savie2.savedTimeStamp = z[z.length-1].created_at;
	}
	else {
		yell=z[z.length-1].message;talky();savie2.savedTimeStamp = z[z.length-1].created_at;
		console.log(savie2.savedTimeStamp);
	}
	for(var p = 0;p<z.length;p++){
		var currentTime = z[p].created_at;
  		var currentHours = currentTime.slice(11,13);
  		var currentMinutes = currentTime.slice(14,16);
  		var currentSeconds = currentTime.slice(17,19);
  		var currentMonth = currentTime.slice(5,7);
  		var currentYear = currentTime.slice(0,4);
  		var currentDay = currentTime.slice(8,10);
  		var currentTimeString = currentMonth + "/" + currentDay + "/" + currentYear + " " + currentHours + ":" + currentMinutes + ":" + currentSeconds;
  		console.log(currentTimeString);
		$('#displayWindow2').append(currentTimeString + " " + z[p].user + ": " + z[p].message + "<br/>");
   	}
   	keith();
   	$('#displayWindow2').emoticonize();
    $('#displayWindow2').scrollTop($('#displayWindow2')[0].scrollHeight);
	});
}
		
	apple2();
function apple3(){$.get('https://cat-chat-1.herokuapp.com/chatrooms/The_Litter_Box', function(z){	
	$('#displayWindow3').html('');
	var patt1 = new RegExp("http");
		
	var	patt2 = new RegExp("jpeg");
	
	var	patt3 = new RegExp("png");
		
	var	patt4 = new RegExp("jpg");
	
	var	patt5 = new RegExp("jpeg");
		
	var	patt6 = new RegExp("gif");
		
	var	patt7 = new RegExp(".ico");
		
	if(matthew.nombre==="foo123"){
		console.log("no update yet name is not chosen")
	}
	else if(typeof z === undefined){
		console.log('z is blank');
	}
	else if(z[z.length-1].created_at === savie3.savedTimeStamp){
		console.log('houseboat');
	}
	else if(
//		patt1.test(z[z.length-1].message)===true ||
		
		patt2.test(z[z.length-1].message)===true ||
	
		patt3.test(z[z.length-1].message)===true ||
		
		patt4.test(z[z.length-1].message)===true ||
		
		patt5.test(z[z.length-1].message)===true ||
		
		patt6.test(z[z.length-1].message)===true ||
	
		patt7.test(z[z.length-1].message)===true){
			console.log(z[z.length-1].message.match(/http/));
			yell=z[z.length-1].user + " posted a picture or a link";
			talky();
			savie3.savedTimeStamp = z[z.length-1].created_at;
	}
	else {
		yell=z[z.length-1].message;talky();savie3.savedTimeStamp = z[z.length-1].created_at;
		console.log(savie3.savedTimeStamp);
	}
    for(var p = 0;p<z.length;p++){
		var currentTime = z[p].created_at;
  		var currentHours = currentTime.slice(11,13);
  		var currentMinutes = currentTime.slice(14,16);
  		var currentSeconds = currentTime.slice(17,19);
  		var currentMonth = currentTime.slice(5,7);
  		var currentYear = currentTime.slice(0,4);
  		var currentDay = currentTime.slice(8,10);
  		var currentTimeString = currentMonth + "/" + currentDay + "/" + currentYear + " " + currentHours + ":" + currentMinutes + ":" + currentSeconds;
  		console.log(currentTimeString);
		$('#displayWindow3').append(currentTimeString + " " + z[p].user + ": " + z[p].message + "<br/>");
   	}
   	$('#displayWindow3').emoticonize();
   	keith();
    $('#displayWindow3').scrollTop($('#displayWindow3')[0].scrollHeight);
	});
}
		
	apple3();	

$('#fred1').click(fruit1);
function fruit1(event){
	event.preventDefault();
	console.log($('#messageBox1').val());
	$.post('https://cat-chat-1.herokuapp.com/messages', 
		{message: $('#messageBox1').val(), user: matthew.nombre, chatroom: "The Living Room"}, apple1);
		 $('#messageBox1').val('');
};

$('#fred2').click(fruit2);
function fruit2(event){
	event.preventDefault();
	console.log($('#messageBox2').val());
	$.post('https://cat-chat-1.herokuapp.com/messages', 
		{message: $('#messageBox2').val(), user: matthew.nombre, chatroom: "The Tree"}, apple2);
		 $('#messageBox2').val('');
};

$('#fred3').click(fruit3);
function fruit3(event){
	event.preventDefault();
	console.log($('#messageBox3').val());
	$.post('https://cat-chat-1.herokuapp.com/messages', 
		{message: $('#messageBox3').val(), user: matthew.nombre, chatroom: "The Litter Box"}, apple3);
		 $('#messageBox3').val('');
};	

function keith(){
	$.get('https://cat-chat-1.herokuapp.com/stats', function(data){ 
		var mpc = data.mostPopularChatroom.name;
		var ttu = data.topTenUsers;
		var rau = data.recentlyActiveUsers;

		$('#stats1').html("");
		$('#stats1').append("<h6 class='statsTitle'>Most Popular Chatroom</h6>"+mpc+"<br/><h6 class='statsTitle'>Top Ten Users</h6>");
		for(var m=0;m<ttu.length;m++){$('#stats1').append(ttu[m].user+"<br/>");}	
		$('#stats1').append("<h6 class='statsTitle'>Recently Active Users</h6>");
		if(rau===null){console.log("rau is null");}
		else{for(var i=0;i<rau.length;i++){$('#stats1').append(rau[i]+"<br/>");}
		};
		

		$('#stats2').html("");
		$('#stats2').append("<h6 class='statsTitle'>Most Popular Chatroom</h6>"+mpc+"<br/><h6 class='statsTitle'>Top Ten Users</h6>");
		for(var m=0;m<ttu.length;m++){$('#stats2').append(ttu[m].user+"<br/>");}	
		$('#stats2').append("<h6 class='statsTitle'>Recently Active Users</h6>");
		if(rau===null){console.log("rau is null");}
		else{for(var i=0;i<rau.length;i++){$('#stats2').append(rau[i]+"<br/>");}
		};

		$('#stats3').html("");
		$('#stats3').append("<h6 class='statsTitle'>Most Popular Chatroom</h6>"+mpc+"<br/><h6 class='statsTitle'>Top Ten Users</h6>");
		for(var m=0;m<ttu.length;m++){$('#stats3').append(ttu[m].user+"<br/>");}	
		$('#stats3').append("<h6 class='statsTitle'>Recently Active Users</h6>");
		if(rau===null){console.log("rau is null");}
		else{for(var i=0;i<rau.length;i++){$('#stats3').append(rau[i]+"<br/>");}
		};
	});

	
};




		// $('#stats2').append("<h6 class='statsTitle'>Most Popular Chatroom</h6>"+mpc+
		// 				"<br/><h6 class='statsTitle'>Top Ten Users</h6>");

		// for(var m=0;m<ttu.length;m++){
		// $('#stats2').append(ttu[m].user+"<br/>");					 
		// }	

		// $('#stats2').append("<h6 class='statsTitle'>Recently Active Users</h6>");

		// for(var i=0;i<rau.length;i++){
		// $('#stats2').append(rau[i]+"<br/>");
		// }


		// $('#stats3').append("<h6 class='statsTitle'>Most Popular Chatroom</h6>"+mpc+
		// 				"<br/><h6 class='statsTitle'>Top Ten Users</h6>");

		// for(var m=0;m<ttu.length;m++){
		// $('#stats3').append(ttu[m].user+"<br/>");					 
		// }	

		// $('#stats3').append("<h6 class='statsTitle'>Recently Active Users</h6>");

		// for(var i=0;i<rau.length;i++){
		// $('#stats3').append(rau[i]+"<br/>");
		// }


var yell= "i hate you so much"
function talky(){
	var text = yell;
	text = encodeURIComponent(text);
	var url = "https://translate.google.com/translate_tts?ie=UTF-&&q=" + text + "&tl=en";
	$('audio').attr('src',url).get(0).play();
}




$("#chatOne").click(function(){
    $("#chat1").show();
    $("#chat2").hide();
    $("#chat3").hide();
    $('#displayWindow1').scrollTop($('#displayWindow1')[0].scrollHeight);
    $('#chatOne').css("background","gray");
    $('#chatTwo').css("background","black");
    $('#chatThree').css("background","black");
    sam.hobby==="skiing";
});

$("#chatTwo").click(function() {
	$("#chat1").hide();
	$("#chat3").hide();
	$("#chat2").show();
	$('#displayWindow2').scrollTop($('#displayWindow2')[0].scrollHeight);
	$('#chatOne').css("background","black");
    $('#chatTwo').css("background","gray");
    $('#chatThree').css("background","black");
    sam.hobby="drinking";
});

$("#chatThree").click(function() {
	$("#chat1").hide();
	$("#chat2").hide();
	$("#chat3").show();
	$('#displayWindow3').scrollTop($('#displayWindow3')[0].scrollHeight);
	$('#chatOne').css("background","black");
    $('#chatTwo').css("background","black");
    $('#chatThree').css("background","gray");
    sam.hobby="cowtipping";
});






}); //very end
