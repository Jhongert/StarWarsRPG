$(document).ready(function(){
	//Global variables
	var defenderId,
	attackerId,
	attackerHp,
	defenderHp,
	attackPower,
	enemyCount,
	//array of characters
	character = [{name: "Luke Skywalker", 
				hp: 100, 
				attackPower: 15, 
				counterAttack: 5, 
				img: "luke.jpg"},

				{name: "Darth Vader", 
				hp: 120, 
				attackPower: 8, 
				counterAttack: 15, 
				img: "darth.jpg"},

				{name: "Obi Wan Kenobi", 
				hp: 150, 
				attackPower: 5, 
				counterAttack: 20, 
				img: "obi.jpg"},

				{name: "Kylo Ren", 
				hp: 180, 
				attackPower: 3, 
				counterAttack: 25, 
				img: "kylo.jpg"}];
	
	//This function is called when the game start and every time restart is pressed
	function newGame(){
		//initialize variables
		attackPower = 0;
		defenderId = "";
		attackerId = "";
		attackerHp = 0;
		defenderHp = 0;
		enemyCount = character.length - 1;

		//Clean containers
		$("#yourCharacter").empty();
		$("#characters").empty();
		$("#defender").empty();
		$("#msg").empty();
		$("#topMsg").text("Select your character");

		//Loop through character array and create each character 
		for(var i = 0; i < character.length; i++){
			//create a new div, add class character and id
			var div = $("<div>").addClass("character").attr("id",i);
			$("#characters").append(div); //append the new div to id=characters

			//inside the new div append a <p> with the character name,
			//character's image and Heath points
			div.append($("<p>").text(character[i]["name"]));
			div.append($("<img>").attr("src", "assets/images/" + character[i]["img"]));
			div.append($("<span>").text(character[i]["hp"]));
		}
		attachOnClick(); //attach onclick event to characters
	}

	newGame(); //create a new game
	var msg = $("#msg");

	//Restart button click
	//start new game and hidde this button
	$("#restart").on("click", function(){
		newGame();
		$(this).css("display", "none");
	});

	//attach onclick event to characters, this fuction has to be called 
	//after create characters elements
	function attachOnClick() {
		$(".character").on("click", function(){
			var currentCharacter = $(this); //character that has been clicked

			//if there is not a attacker
			if(attackerId == ""){
				attackerId = currentCharacter.attr("id"); //get attacker id
				attackerHp = character[attackerId].hp;    //get attacker heath points
				currentCharacter.addClass("attacker");    //add class attacker

				//append the character to 'your character'(attacker) zone
				$("#yourCharacter").append(currentCharacter); 
				$("#topMsg").text("Enemies Available To Attack");

				//add class enemy to the rest of the characters
				$(".character:not(.attacker)").addClass("enemy");

				//if there is not a defender and I am not clicking the attacker(if is a enemy)
			}else if(defenderId == "" && currentCharacter.attr("id") != attackerId){
				defenderId = currentCharacter.attr("id"); //get enemy id
				defenderHp = character[defenderId].hp;    //get enemy heath points
				currentCharacter.addClass("defender");    //add class defender

				//append character to defender zone
				$("#defender").append(currentCharacter);  

				$("#attack").css("display", "inline"); //display button attack
				msg.empty(); //clean mesages
			}
		});
	}

	//button attack click
	$("#attack").click(function(){
		
			//increase attacker's attackPower
			attackPower += character[attackerId]["attackPower"];
			defenderHp -= attackPower; //decrease defender hp

			//if defender hp is less than 1
			if(defenderHp <= 0){
				$("#" + defenderId).remove(); //remove the defender
				$("#attack").css("display", "none"); //hide button attack

				enemyCount --; //decrease enemies count

				//if there is not more enemies, you won
				if(enemyCount == 0){
					msg.html("<p>You Won!!!</p>");
					$("#restart").css("display", "block");
				}else{ //if still more enemies show a message and clean defenderId variable
					msg.html("<p>You have defeated " + character[defenderId].name + ", you can choose to fight another enemy.</p>");
					defenderId = "";
				}

			}else{ //if defender still alive
				$(".defender span").text(defenderHp); //update defender hp on screen
				attackerHp -= character[defenderId].counterAttack; //decrease attacker hp
				$(".attacker span").text(attackerHp); //update attacker hp on screen

				if(attackerHp > 0){ //if attacker still have hp show message
					msg.html("<p>You attacked " + character[defenderId]["name"] + " for "+ attackPower + " damage. <br>" +
					character[defenderId]["name"] + " attacked you back for "+ character[defenderId]["counterAttack"] + " damage.</p>");
				}else{ //if attacker's hp is less than 1 then game over
					msg.html("<p>You have been defeated...</P>");
					$("#attack").css("display", "none");
					$("#restart").css("display", "block");
				}
			}		
	});
});