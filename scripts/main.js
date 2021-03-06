var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var killListHolder = {happy:"sad"};
var Parse = require('parse-browserify');
var klist = {};
var klistFINAL = {};
klistFINAL.list = [];
var myProfilePic = {};
myProfilePic.house = [];
var friendList = {};
Parse.initialize("n3pY1RgYj6joprnEw22uqgnrKuCjlOXUxzq2hWhl", "LqdhjBO6ENSnsk7z7N4k4sfQw7eOv7ewC8kl1cV5");


var App = Backbone.Router.extend({
	routes: {
		"": "login",
		"login":"login",
		"choosefriendstokill": "choosefriendstokill",
		"about":"about",
		"highscores": "highscores",
		"levelone": "levelone",
		"leveltwo": "leveltwo",
		"levelthree": "levelthree",
		"levelfour": "levelfour",
		"levelfive": "levelfive",
		"levelsix": "levelsix",
		"levelseven": "levelseven",
		"leveleight": "leveleight",
		"levelchooser": "levelchooser",
		"logout": "logout"
	},
	login: function() {
		//HIDE AND SHOWS
		$('header').hide();
  		$('#above-facebook-login').show();
  		$('#facebook-login').show();
  		
  		$('#status').hide();
  		$('#container').show();
  		$('#leveltitle').hide();
  		
  		$('#phaser-example2').hide();
  		$('#levels').hide();
  		$('#chooselistcontainer').hide();
  		$('#watchlist').hide();
  		$('#chosen').hide(); 

  		//ACTIONS 		
		$('#leveltitle').html("<br/><br/><h1>are you ready to DEFEAT your friends in BATTLE?</h1>");
        $('#phaser-example').html('<br/><button id="gotochoose"> K I L L </button>');
       
		frontPageDisplay();
				
		//LISTENERS	  
          $('#gotochoose').on('click', function(e){
          e.preventDefault;
          console.log('button works');
          getFacebookFields();
          myRouter.navigate('choosefriendstokill', {trigger: true});
          
          });
				
		
	},
	choosefriendstokill: function() {
		//HIDE AND SHOWS
		$('header').show();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
  		
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').show();
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#watchlist').show();
	  	$('#chosen').show();

	  
	  	  
		
		//ACTIONS
		$('#leveltitle').html("<h1>First CHOOSE from 1 to 4 friends to DEFEAT. Then press PLAY!</h1>");
		$('#phaser-example').html('<button id="friendlist"> C H O O S E </button> <span> </span> <button id="gotogame"> P L A Y </button><br/>');
		
		//LISTENERS
		$('#gotogame').on('click', function(){
			 
			 klist.LIST =  $("#chosen").find('img');
			 console.log(klist.LIST[0].src);
			 console.log(klist.LIST.length);
			 if(klist.LIST.length===0){}
			 else if(klist.LIST.length===1){klistFINAL.list.push(klist.LIST[0].src);klistFINAL.list.push(klist.LIST[0].src);klistFINAL.list.push(klist.LIST[0].src);klistFINAL.list.push(klist.LIST[0].src);}
			 else if(klist.LIST.length===2){klistFINAL.list.push(klist.LIST[0].src);klistFINAL.list.push(klist.LIST[1].src);klistFINAL.list.push(klist.LIST[0].src);klistFINAL.list.push(klist.LIST[1].src);}
			 else if(klist.LIST.length===3){klistFINAL.list.push(klist.LIST[0].src);klistFINAL.list.push(klist.LIST[1].src);klistFINAL.list.push(klist.LIST[2].src);klistFINAL.list.push(klist.LIST[0].src);}
			 else{for(var i = 0;i<4;i++){
			 	klistFINAL.list.push(klist.LIST[i].src);}
			 }
			 var currentUser = Parse.User.current();
             currentUser.set("current_kill_list", klistFINAL.list);
             currentUser.save();
    //          console.log(klistFINAL.list);
			 myRouter.navigate('levelchooser', {trigger: true});
		});
		// display Friends puts listener on the choose button, and lists when pressed
		displayFriends();
		

		
	},
	about: function() {
		//SHOW AND HIDES
		$('header').show();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
  		
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').show();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		//ACTIONS
		$('#phaser-example').html('<h1>COMMENTS</h1><br/><div class="fb-comments" data-href="http://keithreynoldsworld.github.io" data-width="500px" data-numposts="30"></div>')
		$('#leveltitle').html("This video explains friend invaders in depth");
		
		//LISTENERS
		$('#gotohome').on('click', function(){
			myRouter.navigate('login', {trigger: true});
		})
		
		
	},
	highscores: function() {
		//SHOW AND HIDES
		
		$('header').show();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
  		
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').show();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  

		//ACTIOND
		$('#leveltitle').html("<h1>HIGH SCORES</h1>");
		$('#phaser-example').html('');
		var high = Parse.Object.extend("game_session");
		var highquery = new Parse.Query(high);
		highquery.descending("high_score");
		highquery.find({
  			success: function(results) {
  				

    			console.log(results);

    			for(var i=0;i<20;i++){
    				$('#phaser-example').append("<br/><h1>"+ ' '+results[i].attributes.playername + ' ' + results[i].attributes.high_score + ' ' + "level " + ' ' +results[i].attributes.level+ "<br/></h1>");
    				
    			}
    			
  			},
  			error: function(error) {
    			alert("Error: " + error.code + " " + error.message);
  			}
		});


		
		// React.render(
			
		// 		<HighScoresComponent user={user} myRouter={myRouter} />,
		// 	document.getElementById("container"));
	},
	levelone: function() {
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
	  	
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
		myProfilePic.house = [currentUser.attributes.profile_pic_url];
             levelOne();
		
	},
	leveltwo: function() {
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  		  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];
             levelTwo();
	},
	levelthree: function() {
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];
             levelThree();
	},
	levelfour: function() {
		
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];

             levelFour();
	},
	levelfive: function() {
		
		
		
		$//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];
             levelFive();
	},
	levelsix: function() {
		
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];
             levelSix();
	
	},
	levelseven: function() {
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];
		
             levelSeven();
	},
	leveleight: function() {
		
		
		//HIDE SND SHOWS
		$('header').hide();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
	  	$('#status').hide();
	  	$('#container').hide();
	  	$('#leveltitle').hide();
	  	
	  	$('#phaser-example2').hide();
	  	$('#levels').hide();
	  	$('#chooselistcontainer').hide();
	  	$('#watchlist').hide();
	  	$('#chosen').hide();  
		
	  	//ACTIONS
		//get the kill list
	     var currentUser = Parse.User.current();
	     console.log(currentUser.attributes.current_kill_list);
		klistFINAL.list = currentUser.attributes.current_kill_list;
			myProfilePic.house = [currentUser.attributes.profile_pic_url];
             levelEight();
	},
	levelchooser: function() {
		
			$('header').show();
	  		$('#above-facebook-login').hide();
	  		$('#facebook-login').hide();
	  		
	  		$('#status').hide();
	  		$('#container').hide();
			$('#leveltitle').hide();
			$('#phaser-example').html('');
			$('#phaser-example2').hide();
			$('#levels').show();
			$('#chooselistcontainer').hide();
			$('#watchlist').hide();
			$('#chosen').hide();  
			
	     
	},
	logout: function(){
		//HIDE AND SHOWS
		$('header').show();
  		$('#above-facebook-login').hide();
  		$('#facebook-login').hide();
  		
  		$('#status').hide();
  		$('#container').hide();
  		$('#leveltitle').hide();
  		
  		$('#phaser-example2').hide();
  		$('#levels').hide();
  		$('#chooselistcontainer').hide();
  		$('#watchlist').hide();
  		$('#chosen').hide();  
  		//ACTIONS
  		$('#phaser-example').html('<h1><br/><br/>Clicking this button will log you out of <br/>Friend Invaders AND Facebook.<br/>Are you sure?</h1><button id = "LO">yes, log me out</button>');
  		$('#LO').on('click', function(){
  			
  			FB.logout(function(response) {
  				// user is now logged out
			});
  			myRouter.navigate('login', {trigger: true});
  		})
	}


});

var myRouter = new App();
Backbone.history.start();


var looper;
var degrees = 0;




console.log('application running');
//NAV LISTENERS

$('#themesong').on('click', function(){
	myRouter.navigate('about', {trigger: true});
});
$('#logout').on('click', function(){
	myRouter.navigate('logout', {trigger: true});
});
$('#choosevictims').on('click', function(){
	frontPageDisplay();
	myRouter.navigate('login', {trigger: true});
});
$('#highscores').on('click', function(){	
	myRouter.navigate('highscores', {trigger: true});
});
$('#realchoosevictims').on('click', function(){	
	myRouter.navigate('choosefriendstokill', {trigger: true});
});
$('#levelbutton').on('click', function(){	
	myRouter.navigate('levelchooser', {trigger: true});
});
//LEVEL LISTENERS

 $('#level1').on('click', function(){		
	myRouter.navigate('levelone', {trigger: true});
});
$('#level2').on('click', function(){	    
	myRouter.navigate('leveltwo', {trigger: true});
});
$('#level3').on('click', function(){
	myRouter.navigate('levelthree', {trigger: true});
});
$('#level4').on('click', function(){
	myRouter.navigate('levelfour', {trigger: true});
});
$('#level5').on('click', function(){	     
	myRouter.navigate('levelfive', {trigger: true});
});
$('#level6').on('click', function(){
	myRouter.navigate('levelsix', {trigger: true});
});
$('#level7').on('click', function(){
	myRouter.navigate('levelseven', {trigger: true});
});
$('#level8').on('click', function(){	     
	myRouter.navigate('leveleight', {trigger: true});
});

function getFacebookFields(){

}


function displayFriends(){


    $( "#friendlist" ).on( "click", function() {
    	getFacebookFields();
    	console.log('friendlist-button');
    	$('#chooselistcontainer').show();
    	
    	
    	
    	
    	$('#chosen').html('');
    	$('#watchlist').show();
    	$('#chosen').show();
    	var uQuery = new Parse.Query(Parse.User);
	

		uQuery.find({
  			success: function(results) {
  				
  				console.log(results);
  				console.log(results[0].attributes.first_name);
  				var f = ['asf','asdfasdf','asdffads'];
  				console.log(f);
  				
  				//console.log(results.length);
  				// var eat = results[0];
  				// console.log(eat);
  				for(var i=0;i<results.length;i++){
  					$('#watchlist').prepend("<div class='chooser'><img src='" + 
  						results[i].attributes.profile_pic_url + "'/><br/><br/>"+
  						results[i].attributes.first_name + "<br/> " +
  						results[i].attributes.last_name +
  						"<br/><button class='kill'>kill</button> </div>");
   //prob return result and make into a variable
   				}
   				addClickersToFriends();
    		},
  
  			error: function(error) {
    			alert("Error: " + error.code + " " + error.message);
  			}
		});

		
  // 		FB.api('/me/friends', {fields: 'id'},function(response) {
  // 		$('#phaser-example').append(response);
  // 		friendList.list = response;
  // 		console.log(friendList.list);
  // 		for(var i=0;i<response.data.length;i++){
  // 		$('#watchlist').prepend("<div class='chooser'><img src='" + friendList.list.data[i].picture.data.url + "'/><br/><br/>"+
  // 			friendList.list.data[i].name + "<br/><button class='kill'>KILL</button> </div>")
  // 		}
  		
		// });
	});
}

function addClickersToFriends(){
	function addToWatch(e) {
	console.log("clicked");

	$('#chosen').append(this);
	$(this).append('<br/>R. I. P.');
	}	
	$('.chooser').click(addToWatch);
 			
}

//everything below here are level functions
function levelOne(){
	
		$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;

		        	var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;

		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src, 160, 160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', '../assets/games/invaders/starfield.png');
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2, .2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 3; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {
				score=0;
		    
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 10;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 20;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 1);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
				
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();

		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 1);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
				score=0;
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,120);
		        firingTimer = game.time.now + 2000;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
function levelSix(){
	
	$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
	
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;
		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;

		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', file1.data.src);
		    game.load.image('background', file2.data.src);
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');



		}
		var sword;
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		
		function create() {


		    game.physics.startSystem(Phaser.Physics.ARCADE);

		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');


		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('sword');


		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2,.2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 10; i++) 
		    {
		        var ship = lives.create(game.world.width - 400 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {
				score=0;
		    
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.05, .05);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(800, 800);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.05, .05);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(800, 800);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.75, .75);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world  -able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 0;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		             blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();


		    //  Increase the score
		    score += 37;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 6);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();

		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 6);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

					

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    
		      }
		}

		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,400);
		        firingTimer = game.time.now + 800;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
   


function levelFive(){

	$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
	

		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;
		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;

		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', '../assets/games/invaders/starfield.png');
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2,.2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 3; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {

		    	score=0;
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 10;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;
		    

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		         game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 70;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 5);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();
		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 5);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}
	function enemySpriteHitsPlayer (player,alien) {
		    
		    alien.kill();

		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}
		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,200);
		        firingTimer = game.time.now + 100;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
	}

function levelFour(){
$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
	
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;
		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;

		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', '../assets/games/invaders/starfield.png');
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2,.2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 3; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {

		    	score=0;
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 10;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;
		    aliens.angle += 1;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		         game.physics.arcade.overlap(aliens, player, enemySpriteHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 55;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 4);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();
		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 4);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}
	function enemySpriteHitsPlayer (player,alien) {
		    
		    alien.kill();

		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}
		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,120);
		        firingTimer = game.time.now + 2000;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
function levelTwo(){
	
	$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;
		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;


		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', '../assets/games/invaders/starfield.png');
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2,.2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 3; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {
				score=0;
		    
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(600, 600);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(1000, 1000);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(.9,.9);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(400, 400);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 10;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 400;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 2);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();
		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 2);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

					

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    
		      }
		}

		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,120);
		        firingTimer = game.time.now + 2000;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
   


function levelThree(){
	
		$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
		
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;

		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;
		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', '../assets/games/invaders/starfield.png');
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2,.2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 1; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {

		    score=0;
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.10, .10);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.50, .50);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.40, .40);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            alien.body.moves = false;
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 5;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 100;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 3);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								console.log('fetch worked');
								game_session.set("playername", result.attributes.full_name);
								game_session.set('user_id', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}
		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();

		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 3);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							
							success: function(result){
								console.log('fetch worked');
								game_session.set("playername", result.attributes.full_name);
								game_session.set('user_id', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,150);
		        firingTimer = game.time.now + 700;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
function levelSeven(){
	$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});

		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;
		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;

		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', file5.data.src);
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.anchor.setTo(0.5, 0.5);
		    player.scale.setTo(.2,.2);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 3; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {

		    score=0;
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		    	for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 10;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 2;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = 200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = -200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 20;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 7);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();
		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 7);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

					

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    
		      }
		}

		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,40);
		        firingTimer = game.time.now + 300;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
   
function levelEight(){
	$('#phaser-example').html('<button id="back">back</button> <button id="refresh">if the game does not appear click here</button>');
		$('#back').on('click',function(){
			myRouter.navigate('levelchooser', {trigger: true});
		});
			$('#refresh').on('click',function(){
			location.reload();
		});
	
		var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
		var file1 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[0],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file1.data = new Image();
		        file1.data.name = file1.key;

		        file1.data.onload = function () {
		            file1.loaded = true;
		            game.cache.addImage(file1.key, file1.url, file1.data);
		        };

		        file1.data.onerror = function () {
		            file1.error = true;
		        };

		        file1.data.crossOrigin = '';
		        file1.data.src = file1.url;

				var file2 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[1],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file2.data = new Image();
		        file2.data.name = file2.key;

		        file2.data.onload = function () {
		            file2.loaded = true;
		            game.cache.addImage(file2.key, file2.url, file2.data);
		        };

		        file2.data.onerror = function () {
		            file2.error = true;
		        };

		        file2.data.crossOrigin = '';
		        file2.data.src = file2.url;

		        var file3 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[2],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file3.data = new Image();
		        file3.data.name = file3.key;

		        file3.data.onload = function () {
		            file3.loaded = true;
		            game.cache.addImage(file3.key, file3.url, file3.data);
		        };

		        file3.data.onerror = function () {
		            file3.error = true;
		        };

		        file3.data.crossOrigin = '';
		        file3.data.src = file3.url;

		        		var file4 = {
		            type: 'image',
		            key: 'example',
		            url: klistFINAL.list[3],
		            data: null,
		            error: false,
		            loaded: false
		        };

		        file4.data = new Image();
		        file4.data.name = file4.key;

		        file4.data.onload = function () {
		            file4.loaded = true;
		            game.cache.addImage(file4.key, file4.url, file4.data);
		        };

		        file4.data.onerror = function () {
		            file4.error = true;
		        };

		        file4.data.crossOrigin = '';
		        file4.data.src = file4.url;
		        var file5 = {
		            type: 'image',
		            key: 'example',
		            url: myProfilePic.house[0],
		            data: null,
		            error: false,
		            loaded: false
		        };
		        file5.data = new Image();
		        file5.data.name = file5.key;

		        file5.data.onload = function () {
		            file5.loaded = true;
		            game.cache.addImage(file5.key, file5.url, file5.data);
		        };

		        file5.data.onerror = function () {
		            file5.error = true;
		        };

		        file5.data.crossOrigin = '';
		        file5.data.src = file5.url;

		       	// var file5 = {
		        //     type: 'image',
		        //     key: 'example',
		        //     url: myProfilePic.house.data.url,
		        //     data: null,
		        //     error: false,
		        //     loaded: false
		        // };

		        // file5.data = new Image();
		        // file5.data.name = file5.key;

		        // file5.data.onload = function () {
		        //     file5.loaded = true;
		        //     game.cache.addImage(file5.key, file5.url, file5.data);
		        // };

		        // file5.data.onerror = function () {
		        //     file5.error = true;
		        // };

		        // file5.data.crossOrigin = '';
		        // file5.data.src = file5.url;
		function preload() {
			game.load.crossOrigin = 'anonymous';
		    game.load.image('bullet', '../assets/games/invaders/bullet.png');
		    game.load.image('enemyBullet', '../assets/games/invaders/enemy-bullet.png');
		    game.load.spritesheet('invader1', file1.data.src, 160, 160);
		    game.load.spritesheet('invader2', file2.data.src, 160, 160);
		    game.load.spritesheet('invader3', file3.data.src, 160, 160);
		    game.load.spritesheet('invader4', file4.data.src, 160, 160);
		    game.load.spritesheet('ship', file5.data.src,160,160);
		    game.load.spritesheet('kaboom', '../assets/games/invaders/explode.png', 128, 128);
		    game.load.image('starfield', '../assets/games/invaders/starfield.png');
		    game.load.image('background', '../assets/games/starstruck/background2.png');
		    game.load.audio('explo', 'assets/audio/SoundEffects/explosion.mp3');
    game.load.audio('sword', 'assets/audio/SoundEffects/sword.mp3');
    game.load.audio('blaster', 'assets/audio/SoundEffects/blaster.mp3');
		}
		var blaster;
		var explo;
		var player;
		var aliens;
		var bullets;
		var bullet;
		var live;
		var bulletTime = 0;
		var cursors;
		var fireButton;
		var explosions;
		var starfield;
		var score = 0;
		var scoreString = '';
		var scoreText;
		var lives;
		var enemyBullet;
		var enemyBullets;
		var firingTimer = 0;
		var stateText;
		var livingEnemies = [];

		function create() {

		    game.physics.startSystem(Phaser.Physics.ARCADE);
		    explo = game.add.audio('explo');
   
    blaster = game.add.audio('blaster');
		    //  The scrolling starfield background
		    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

		    //  Our bullet group
		    bullets = game.add.group();
		    bullets.enableBody = true;
		    bullets.physicsBodyType = Phaser.Physics.ARCADE;
		    bullets.createMultiple(30, 'bullet');
		    bullets.setAll('anchor.x', 0.5);
		    bullets.setAll('anchor.y', 1);
		    bullets.setAll('outOfBoundsKill', true);
		    bullets.setAll('checkWorldBounds', true);

		    // The enemy's bullets
		    enemyBullets = game.add.group();
		    enemyBullets.enableBody = true;
		    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
		    enemyBullets.createMultiple(30, 'enemyBullet');
		    enemyBullets.setAll('anchor.x', 0.5);
		    enemyBullets.setAll('anchor.y', 1);
		    enemyBullets.setAll('outOfBoundsKill', true);
		    enemyBullets.setAll('checkWorldBounds', true);

		    //  The hero!
		    player = game.add.sprite(400, 500, 'ship');
		    player.scale.setTo(.2,.2);
		    player.anchor.setTo(0.5, 0.5);
		    game.physics.enable(player, Phaser.Physics.ARCADE);

		    //  The baddies!
		    aliens = game.add.group();
		    aliens.enableBody = true;
		    aliens.physicsBodyType = Phaser.Physics.ARCADE;

		    createAliens();

		    //  The score
		    scoreString = 'Score : ';
		    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#FF00FF' });

		    //  Lives
		    lives = game.add.group();
		    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#FF00FF' });

		    //  Text
		    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#FF00FF' });
		    stateText.anchor.setTo(0.5, 0.5);
		    stateText.visible = false;

		    for (var i = 0; i < 25; i++) 
		    {
		        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
		        ship.anchor.setTo(0.5, 0.5);
		        ship.scale.setTo(.2,.2);
		        ship.angle = 90;
		        ship.alpha = 1;
		    }

		    //  An explosion pool
		    explosions = game.add.group();
		    explosions.createMultiple(30, 'kaboom');
		    explosions.forEach(setupInvader, this);

		    //  And some controls to play the game with
		    cursors = game.input.keyboard.createCursorKeys();
		    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		    
		}

		function createAliens () {
				score=0;
		    
		        for (var x = 0; x < 15; x++)
		        {
		            var alien = aliens.create(x * 48, 1 * 50, 'invader1');
		            alien.scale.setTo(.10, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(400, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		    	for (var x = 0; x < 3; x++)
		        {
		            var alien = aliens.create(x * 48, 2 * 50, 'invader2');
		            alien.scale.setTo(2, 2);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(2, 2);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 10; x++)
		        {
		            var alien = aliens.create(x * 48, 3 * 50, 'invader3');
		            alien.scale.setTo(.25, .25);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }
		        for (var x = 0; x < 13; x++)
		        {
		            var alien = aliens.create(x * 48, 4 * 50, 'invader4');
		            alien.scale.setTo(.3, .3);
		            alien.anchor.setTo(0.5, 0.5);
		            // alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
		            // alien.play('fly');
		            game.physics.enable(alien, Phaser.Physics.ARCADE);
    
    //  This gets it moving
    alien.body.velocity.setTo(200, 200);
    
    //  This makes the game world bounce-able
    alien.body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    alien.body.bounce.setTo(1,1);
		        }

		    aliens.x = 100;
		    aliens.y = 50;

		    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
		    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		    //  When the tween loops it calls descend
		    tween.onLoop.add(descend, this);
		}

		function setupInvader (invader) {

		    invader.anchor.x = 0.5;
		    invader.anchor.y = 0.5;
		    invader.animations.add('kaboom');

		}

		function descend() {

		    aliens.y += 10;

		}

		function update() {

		    //  Scroll the background
		    starfield.tilePosition.y += 10;

		    if (player.alive)
		    {
		        //  Reset the player, then check for movement keys
		        player.body.velocity.setTo(0, 0);

		        if (cursors.left.isDown)
		        {
		            player.body.velocity.x = -200;
		        }
		        else if (cursors.right.isDown)
		        {
		            player.body.velocity.x = 200;
		        }

		        //  Firing?
		        if (fireButton.isDown)
		        {
		            fireBullet();
		            blaster.play();
		        }

		        if (game.time.now > firingTimer)
		        {
		            enemyFires();
		        }

		        //  Run collision
		        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
		        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
		    }

		}

		function render() {

		    // for (var i = 0; i < aliens.length; i++)
		    // {
		    //     game.debug.body(aliens.children[i]);
		    // }

		}

		function collisionHandler (bullet, alien) {

		    //  When a bullet hits an alien we kill them both
		    bullet.kill();
		    alien.kill();
		    explo.play();
		    //  Increase the score
		    score += 2000;
		    scoreText.text = scoreString + score;

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(alien.body.x, alien.body.y);
		    explosion.play('kaboom', 30, false, true);

		    if (aliens.countLiving() == 0)
		    {
		        score += 1000;
		        scoreText.text = scoreString + score;

		        enemyBullets.callAll('kill',this);
		        stateText.text = " You Won, \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 8);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    }

		}

		function enemyHitsPlayer (player,bullet) {
		    
		    bullet.kill();
		    explo.play();
		    live = lives.getFirstAlive();

		    if (live)
		    {
		        live.kill();
		    }

		    //  And create an explosion :)
		    var explosion = explosions.getFirstExists(false);
		    explosion.reset(player.body.x, player.body.y);
		    explosion.play('kaboom', 30, false, true);

		    // When the player dies
		    if (lives.countLiving() < 1)
		    {
		        player.kill();
		        enemyBullets.callAll('kill');

		        stateText.text=" GAME OVER \n Click to restart";
		        stateText.visible = true;
		        if(score !== 0){
			        var game_session = Parse.Object.extend("game_session");
					var game_session = new game_session();

					game_session.set("level", 8);
					
					game_session.set("high_score", score);
					var currentUser = Parse.User.current();
					currentUser.fetch({
							success: function(result){
								game_session.set("playername", result.attributes.full_name);
								game_session.set('player_pic', result.attributes.profile_pic_url);
								game_session.save();
							}
					});
				}

					

		        //the "click to restart" handler
		        game.input.onTap.addOnce(restart,this);
		    
		      }
		}

		function enemyFires () {

		    //  Grab the first bullet we can from the pool
		    enemyBullet = enemyBullets.getFirstExists(false);

		    livingEnemies.length=0;

		    aliens.forEachAlive(function(alien){

		        // put every living enemy in an array
		        livingEnemies.push(alien);
		    });


		    if (enemyBullet && livingEnemies.length > 0)
		    {
		        
		        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

		        // randomly select one of them
		        var shooter=livingEnemies[random];
		        // And fire the bullet from this enemy
		        enemyBullet.reset(shooter.body.x, shooter.body.y);

		        game.physics.arcade.moveToObject(enemyBullet,player,700);
		        firingTimer = game.time.now + 100;
		    }

		}

		function fireBullet () {

		    //  To avoid them being allowed to fire too fast we set a time limit
		    if (game.time.now > bulletTime)
		    {
		        //  Grab the first bullet we can from the pool
		        bullet = bullets.getFirstExists(false);

		        if (bullet)
		        {
		            //  And fire it
		            bullet.reset(player.x, player.y + 8);
		            bullet.body.velocity.y = -400;
		            bulletTime = game.time.now + 200;
		        }
		    }

		}

		function resetBullet (bullet) {

		    //  Called if the bullet goes out of the screen
		    bullet.kill();

		}

		function restart () {

		    //  A new level starts
		    
		    //resets the life count
		    lives.callAll('revive');
		    //  And brings the aliens back from the dead :)
		    aliens.removeAll();
		    createAliens();

		    //revives the player
		    player.revive();
		    //hides the text
		    stateText.visible = false;

		}
}
   




function frontPageDisplay(){
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'container', { create: create, update: update });

var filter;
var sprite;

function create() {

    //  From http://glslsandbox.com/e#18918.0
    // Tenjix",

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2     resolution;",

        "#define PI 3.1415926535897932384626433832795",

        "const float position = 0.0;",
        "const float scale = 1.0;",
        "const float intensity = 1.0;",

        // "varying vec2 surfacePosition;",
        // "vec2 pos;",

        "float band(vec2 pos, float amplitude, float frequency) {",
            "float wave = scale * amplitude * sin(1.0 * PI * frequency * pos.x + time) / 2.05;",
            "float light = clamp(amplitude * frequency * 0.02, 0.001 + 0.001 / scale, 5.0) * scale / abs(wave - pos.y);",
            "return light;",
        "}",

        "void main() {",

            "vec3 color = vec3(1.5, 0.5, 10.0);",
            "color = color == vec3(0.0)? vec3(10.5, 0.5, 1.0) : color;",
            "vec2 pos = (gl_FragCoord.xy / resolution.xy);",
            "pos.y += - 0.5;",
            "float spectrum = 0.0;",
            "const float lim = 28.0;",
            "#define time time*0.037 + pos.x*10.",
            "for(float i = 0.0; i < lim; i++){",
                "spectrum += band(pos, 1.0*sin(time*0.1/PI), 1.0*sin(time*i/lim))/pow(lim, 0.25);",
            "}",

            "spectrum += band(pos, cos(10.7), 2.5);",
            "spectrum += band(pos, 0.4, sin(2.0));",
            "spectrum += band(pos, 0.05, 4.5);",
            "spectrum += band(pos, 0.1, 7.0);",
            "spectrum += band(pos, 0.1, 1.0);",

            "gl_FragColor = vec4(color * spectrum, spectrum);",

        "}"

    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];

}

function update() {

    filter.update();

}
}
		//	$('#leveltitle').append("<button id='LO'>Logout from facebook</button>");
				
				// $('#LO').on('click', function(e){
				// 	e.preventDefault;
				// 	console.log('LO button clicked');
				// 	FB.logout(function(response) {
  		// 				// user is now logged out
				// 	});
				// });