window.onload = () => {

	let context = window.document.getElementsByTagName("canvas")[0].getContext("2d");

	console.log("Début du code");

	// ********************************************************** //

	// Raccourcis

	let b2World = Box2D.Dynamics.b2World;
	let b2Vec2 = Box2D.Common.Math.b2Vec2;
	let b2AABB = Box2D.Collision.b2AABB;
	let b2BodyDef = Box2D.Dynamics.b2BodyDef;
	let b2Body = Box2D.Dynamics.b2Body;
	let b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	let b2Fixture = Box2D.Dynamics.b2Fixture;
	let b2MassData = Box2D.Collision.Shapes.b2MassData;
	let b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	let b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	let b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	let b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

 	// ********************************************************** //

	// Zoom lors de l'action

	let scale = 20;

	// Créer la gravity 

	let gravity = new b2Vec2(0,100);

	// Créer le monde

	let world = new b2World(gravity);

 	// ********************************************************** //

	// Function qui permet de random la balle

	function getRandomInt(max) {

		return Math.floor(Math.random(max) * Math.floor(max));
	}

	// ********************************************************** //

	// Function pour la création des cercles 

	function createCircle(x,y,radius,density,restitution){

		// Créer le body du circle (matière, caractéristique);

		let groundBodyDef = new b2BodyDef(); // caractéristique matière circle

		groundBodyDef.position.Set(x/scale,y/scale);
		groundBodyDef.type = b2Body.b2_dynamicBody;

		let groundBody = world.CreateBody(groundBodyDef); // matière du sol

		// Permet de crée l'ensemble fixture de la function 

		let fixDefCreateCircle = new b2FixtureDef();

		fixDefCreateCircle.shape = new b2CircleShape(radius/scale); // shape c'est la forme 

		// Permet le rebond

		fixDefCreateCircle.density = density; // masse
		fixDefCreateCircle.restitution = restitution; // rebond 

		// Frottement pour freiner

		fixDefCreateCircle.friction = 1;

		// Création fixture 

		groundBody.CreateFixture(fixDefCreateCircle);

	}

    // ********************************************************** //

    function createTriangle(x,y){

    	let groundBodyDefTriangle = new b2BodyDef();

    	groundBodyDefTriangle.position.Set(x/scale,y/scale);
    	groundBodyDefTriangle.type = b2Body.b2_dynamicBody;
    	
    	let groundBodyTriangle = world.CreateBody(groundBodyDefTriangle);

    	let fixDefCreateTriangle= new b2FixtureDef();

    	fixDefCreateTriangle.shape = new b2PolygonShape();

    	let tabVec = [
    		new b2Vec2(0,-1),
    		new b2Vec2(2,2),
    		new b2Vec2(-1,1),
    	];

    	fixDefCreateTriangle.shape.SetAsArray(tabVec,3);

    	fixDefCreateTriangle.density = 5;
    	fixDefCreateTriangle.friction = 0.3;
    	fixDefCreateTriangle.restitution = 1;

    	// Créer une rotation consante

    	groundBodyTriangle.SetAngularVelocity(4);

    	groundBodyTriangle.CreateFixture(fixDefCreateTriangle);

    }

    // ********************************************************** //

    function createHexagone(x,y){

    	let groundBodyDefHexa = new b2BodyDef();

    	groundBodyDefHexa.position.Set(x/scale,y/scale);
    	groundBodyDefHexa.type = b2Body.b2_dynamicBody;
    	
    	let groundBodyHexa = world.CreateBody(groundBodyDefHexa);

    	let fixDefCreateHexagone = new b2FixtureDef();

    	fixDefCreateHexagone.shape = new b2PolygonShape();

    	let tabVec = [
    		new b2Vec2(0,1),
    		new b2Vec2(-1,1/2),
    		new b2Vec2(-1,-1/2),
       		new b2Vec2(0,-1),
        	new b2Vec2(1,-1/2),	
    		new b2Vec2(1,1/2),	
    	];

    	fixDefCreateHexagone.shape.SetAsArray(tabVec,6); // 6 c'est le paramètres pour les points 

    	fixDefCreateHexagone.density = 5;
    	fixDefCreateHexagone.friction = 0.3;
    	fixDefCreateHexagone.restitution = 1;

    	groundBodyHexa.CreateFixture(fixDefCreateHexagone);

    }

    // ********************************************************** //

        function createMarteau(x,y){

    	let groundBodyDefMarteau = new b2BodyDef();

    	groundBodyDefMarteau.position.Set(x/scale,y/scale);
    	groundBodyDefMarteau.type = b2Body.b2_dynamicBody;
    	
    	let groundBodyMarteau = world.CreateBody(groundBodyDefMarteau);

    	let fixDefCreateMarteau = new b2FixtureDef();

    	fixDefCreateMarteau.shape = new b2PolygonShape();

    	let tabVec = [
    		new b2Vec2(0,0),
    		new b2Vec2(2,2),
    		new b2Vec2(2,-2),
    	];

    	fixDefCreateMarteau.shape.SetAsArray(tabVec,3); // 4 c'est le paramètres pour les points 

    	fixDefCreateMarteau.density = 5;
    	fixDefCreateMarteau.friction = 0.3;
    	fixDefCreateMarteau.restitution = 1;

    	groundBodyMarteau.CreateFixture(fixDefCreateMarteau);


    	//////////////////////////////////////////////////////

    	/*let fixDefCreateMarteau2 = new b2FixtureDef();

    	fixDefCreateMarteau2.shape = new b2PolygonShape();

    	let tabVec2 = [
    		new b2Vec2(0,0),
    		new b2Vec2(-2,-2),
    		new b2Vec2(-2,2),
    	];

    	fixDefCreateMarteau2.shape.SetAsArray(tabVec2,3); // 4 c'est le paramètres pour les points 

    	fixDefCreateMarteau2.density = 5;
    	fixDefCreateMarteau2.friction = 0.3;
    	fixDefCreateMarteau2.restitution = 1;

    	groundBodyMarteau2.SetAngularVelocity(4);

    	groundBodyMarteau2.CreateFixture(fixDefCreateMarteau2);
	*/
    }

    // ********************************************************** //

	// Permet de crée l'ensemble fixture 

	let fixDef = new b2FixtureDef();

	// ********************************************************** //

	// Matière polygon en bas

	let groundBodyDefPoly = new b2BodyDef(); // caractéristique matière sol

	groundBodyDefPoly.position.Set(100/scale,590/scale);
	groundBodyDefPoly.type = b2Body.b2_staticBody;

	let groundBodyPoly = world.CreateBody(groundBodyDefPoly); // matière du sol

	// Fixure polygon en bas

	fixDef.shape = new b2PolygonShape();
    fixDef.shape.SetAsBox(800/scale,10/scale);

    groundBodyPoly.CreateFixture(fixDef);

    // ********************************************************** //

    // Matière rectangle a droite 

	let groundBodyDefRectRight = new b2BodyDef();

	groundBodyDefRectRight.position.Set(800/scale,295/scale); // Position x,y
	groundBodyDefRectRight.type = b2Body.b2_staticBody;

	let groundBodyRectRight = world.CreateBody(groundBodyDefRectRight);

	// Fixure rectrangle à droite 

	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(10/scale,295/scale); // Longueur rectangle

	groundBodyRectRight.CreateFixture(fixDef);

	// ********************************************************** //

	// Matière rectangle a gauche 

	let groundBodyDefRectLeft = new b2BodyDef();

	groundBodyDefRectLeft.position.Set(10/scale,295/scale); // Position x,y
	groundBodyDefRectLeft.type = b2Body.b2_staticBody;

	let groundBodyRectLeft = world.CreateBody(groundBodyDefRectLeft);

	// Fixure rectrangle à droite 

	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(10/scale,295/scale); // Longueur rectangle

	groundBodyRectLeft.CreateFixture(fixDef);

	// ********************************************************** //

	// Matière rectangle en haut

	let groundBodyDefRectTop = new b2BodyDef();

	groundBodyDefRectTop.position.Set(208/scale,10/scale); // Position x,y
	groundBodyDefRectTop.type = b2Body.b2_staticBody;

	let groundBodyRectTop = world.CreateBody(groundBodyDefRectTop);

	// Fixure rectrangle à droite 

	fixDef.shape = new b2PolygonShape();
	fixDef.shape.SetAsBox(590/scale,10/scale); // Longueur rectangle

	groundBodyRectTop.CreateFixture(fixDef);

	// ********************************************************** //

    // Préparer la simulation 

    let timeStep = 1/60;

	// Définir la méthode d'affichage du débug

	let debugDraw = new b2DebugDraw();

	// ********************************************************** //

	// Définir les propriétés d'affichage du débug

	debugDraw.SetSprite(context);      // contexte
	debugDraw.SetFillAlpha(0.3);       // transparence
	debugDraw.SetLineThickness(1.0);   // épaisseur du trait
	debugDraw.SetDrawScale(scale); 

	// Affecter la méthode de d'affichage du débug au monde 2dbox

	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	world.DrawDebugData(debugDraw);

	// ********************************************************** //

	// Boucle pour les circles 

	//for(let i = 0; i < 5; i ++){
	//	createCircle(getRandomInt(200)+100+i-50*2+50,getRandomInt(150)+100+i+10*2+i,10+i*5+i,50+i*2+10,2);
	//}

	// ********************************************************** //	

	// Boucle pour les triangles 

	for(let i = 0; i < 5; i ++){
		createTriangle(getRandomInt(200)+100+i-50*2+50,getRandomInt(150)+100+i+10*2+i,10+i*5+i,50+i*2+10,2);
	}

	// ********************************************************** //

	// Boucle pour les hexagones 

	for(let i = 0; i < 10; i ++){
		createHexagone(getRandomInt(200)+100+i-50*2+50,getRandomInt(150)+100+i+10*2+i,10+i*5+i,50+i*2+10,2);
	}

	// ********************************************************** //

	// Boucle pour les Marteaus

	//for(let i = 0; i < 1; i ++){
	//	createMarteau(getRandomInt(200)+100+i-50*2+50,getRandomInt(150)+100+i+10*2+i,10+i*5+i,50+i*2+10,2);
	//}

	// ********************************************************** //

	// Simulation 

	window.setInterval (() => {

		world.Step(timeStep,10,10);
		world.DrawDebugData();
		world.ClearForces();

		//let pos = billeBody.GetPosition();

		// let pos = billeBody.GetPosition();
		// console.log(pos.y);

	},100/6);

};