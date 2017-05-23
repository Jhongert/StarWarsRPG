$(document).ready(function(){
	var defenderId,
	attackerId,
	attackerHp,
	defenderHp,
	attackPower,
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
				img: "kylo.jpg"}],
	enemyCount = character.length - 1;
	
	function newGame(){
		attackPower = 0;
		defenderId = "";
		attackerId = "";
		attackerHp = 0;
		defenderHp = 0;

		$("#yourCharacter").empty();
		$("#characters").empty();
		$("#defender").empty();
		$("#msg").empty();

		for(var i = 0; i < character.length; i++){
			var div = $("<div>").addClass("character").attr("id",i);
			$("#characters").append(div);

			div.append($("<p>").text(character[i]["name"]));
			div.append($("<img>").attr("src", "assets/images/" + character[i]["img"]));
			div.append($("<span>").text(character[i]["hp"]));
		}
		attachOnClick();
	}

	newGame();
	var msg = $("#msg");

	$("#restart").on("click", function(){
		newGame();
		$(this).css("display", "none");
	});

	function attachOnClick() {
		$(".character").on("click", function(){
			var currentCharacter = $(this);

			if(attackerId == ""){
				attackerId = currentCharacter.attr("id");
				attackerHp = character[attackerId].hp;
				currentCharacter.addClass("attacker");
				$("#yourCharacter").append(currentCharacter);
				$("#topMsg").text("Enemies Available To Attack");
				$(".character:not(.attacker)").addClass("enemy");
			}else if(defenderId == "" && currentCharacter.attr("id") != attackerId){
				defenderId = currentCharacter.attr("id");
				defenderHp = character[defenderId].hp;
				currentCharacter.addClass("defender");
				$("#defender").append(currentCharacter);

				$("#attack").css("display", "inline");
				msg.empty();
			}
		});
	}

	$("#attack").click(function(){
		
			attackPower += character[attackerId]["attackPower"];
			defenderHp -= attackPower;
			if(defenderHp <= 0){
				$("#" + defenderId).remove();
				$("#attack").css("display", "none");

				enemyCount --;

				if(enemyCount == 0){
					msg.html("You Won!!!");
					$("#restart").css("display", "block");
				}else{
					msg.html("<p>You have defeated " + character[defenderId].name + ", you can choose to fight another enemy.</p>");
					defenderId = "";
				}

			}else{
				$(".defender span").text(defenderHp);
				attackerHp -= character[defenderId].counterAttack;
				$(".attacker span").text(attackerHp);

				if(attackerHp > 0){
					msg.html("<p>You attacked " + character[defenderId]["name"] + " for "+ attackPower + " damage. <br>" +
					character[defenderId]["name"] + " attacked you back for "+ character[defenderId]["counterAttack"] + " damage.</p>");
				}else{
					msg.html("<p>You have been defeated...</P>");
					$("#attack").css("display", "none");
					$("#restart").css("display", "block");
				}
			}		
	});
});