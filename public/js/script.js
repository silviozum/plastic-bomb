var sockets = io();
	sockets.emit('score', `0`);

(function(){
	var game = new Phaser.Game(800,500,Phaser.AUTO,null,{preload:preload,create:create,update:update});
	var platforms,player,keys,stars,globSndStar,txtScore,score = 0;
	var keyW,keyA,keyD;


	function preload(){

		game.load.image('diamond','../img/diamond.png');
		game.load.image('platform','../img/platform.png');
		game.load.image('star','../img/star.png');


		//Carrega o arquivo de áudio
		game.load.audio('sndStar','../audio/sndStar.mp3');

		game.load.spritesheet('dude','../img/dude.png',32,48);
	}

	function create(){
		//Associa o áudio à sua variável
		globSndStar = game.add.audio('sndStar');

		keys = game.input.keyboard.createCursorKeys();

		keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
		keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		platforms = game.add.group();
		platforms.enableBody = true;

		var platform = platforms.create(0,game.world.height - 64,'platform');
			platform.scale.setTo(2,2);
			platform.body.immovable = true;

			// platform = platforms.create(400,400,'platform');
			// platform.body.immovable = true;

			// platform = platforms.create(-150,250,'platform');
			// platform.body.immovable = true;

		stars = game.add.group();
		stars.enableBody = true;


		for(var i = 0; i < 10; i++){
		      for (var j = 0; j < 10; j++) {
		        var star = stars.create(Math.floor(Math.random() * 500),10,'star');
		          star.body.gravity.y = 3000;
		          star.body.bounce.y = 0.7 + (Math.random()*0.2);
		      }
		    }

		player = game.add.sprite(50,game.world.height - 150,'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 300;
		player.body.bounce.y = 0.2;
		player.body.collideWorldBounds = true;
		player.animations.add('left',[0,1,2,3],10,true);
		player.animations.add('right',[5,6,7,8],10,true);

		txtScore = game.add.text(16,50,'score: 0',{fontSize:'22px',fill:'#fff'});
	}

	function update(){
		game.physics.arcade.collide(player,platforms);
		game.physics.arcade.collide(stars,platforms);
		game.physics.arcade.overlap(player,stars,collectStar);

		player.body.velocity.x = 0;
		if(keys.left.isDown || keyA.isDown){
			player.body.velocity.x = -250;
			player.animations.play('left');
		} else
		if(keys.right.isDown || keyD.isDown){
			player.body.velocity.x = 250;
			player.animations.play('right');
		} else {
			player.animations.stop();
			player.frame = 4;
		}

		if((keys.up.isDown || keyW.isDown) && player.body.touching.down){
			player.body.velocity.y = -350;
		}
	}

	function collectStar(player,star){
		//Toca o som
		globSndStar.play();

		star.kill();
		score += 10;
		txtScore.text = 'SCORE: ' + score;

		sockets.emit('score', score);

	}
}());
