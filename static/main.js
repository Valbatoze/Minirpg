import Personnage from "./Personnage.js";

$(document).ready(function(){
    
    let perso = new Object();
    let data = new Personnage();
    let ennemyStats = new Personnage();

    //affichage des trois classe
    $(".card").click(function(){
        let value = $(this).attr('id');
        if (value == "Warrior") {
            perso = {
                name: '',
                classe: value,
                hp: 100,
                mana: 0,
                magie: 0,
                attack: 30,
                defense: 25,
                magicalDefense: 30,
                agility: 30,
                speed: 40,
                gold: 0
            }
        } else if (value == "Magician") {
            perso = {
                name: '',
                classe: value,
                hp: 60,
                mana: 60,
                magie: 40,
                attack: 5,
                defense: 10,
                magicalDefense: 10,
                agility: 15,
                speed: 35,
                gold: 0
            }
        } else if (value == "Roublard") {
            perso = {
                name: '',
                classe: value,
                hp: 60,
                mana: 25,
                magie: 10,
                attack: 45,
                defense: 10,
                magicalDefense: 10,
                agility: 35,
                speed: 65,
                gold: 0
            }
        }
        $('.stepOne').hide();
        $(".stepTwo").show();
    });
    
    $("#btnStepTwo").click(function(){
        perso.name = $('#name').val();

        if (perso.name !== "") {
             data = new Personnage (
                perso.name,
                perso.classe,
                perso.hp,
                perso.mana,
                perso.magie,
                perso.attack,
                perso.defense,
                perso.magicalDefense,
                perso.agility,
                perso.speed,
                perso.gold
             );

            localStorage.setItem("Test", data);
            $('.stepTwo').hide();
            document.getElementById('myName').innerHTML = "Name: " + data.name;
            document.getElementById('myHp').innerHTML = "HP: " + data.hp;
            document.getElementById('myMagie').innerHTML = "Magie: " + data.magie;
            document.getElementById('myGold').innerHTML = "Gold: " + data.gold;
            $(".stepThree").show();
            
        }
    });

    //Affichage des stats
    $("#myName").click(function(){
        $('.stepThree').hide();
        $('.profile').show();

        document.getElementById('myProfileName').innerHTML = "Name: " + data.name;
        document.getElementById('myProfileHp').innerHTML = "Class: " + data.classe;
        document.getElementById('myProfileHp').innerHTML = "HP: " + data.hp;
        document.getElementById('myProfileMana').innerHTML = "Mana: " + data.mana;
        document.getElementById('myProfileMagie').innerHTML = "Magie: " + data.magie;
        document.getElementById('myProfileAttack').innerHTML = "Attack: " + data.attack;
        document.getElementById('myProfileDefense').innerHTML = "Defense: " + data.defense;
        document.getElementById('myProfileMagicalDefense').innerHTML = "Magical Defense: " + data.magicalDefense;
        document.getElementById('myProfileAgility').innerHTML = "Agility: " + data.agility;
        document.getElementById('myProfileSpeed').innerHTML = "Speed: " + data.speed;
        document.getElementById('myProfileGold').innerHTML = "Gold: " + data.gold;
    });

    //"Fermeture" affichage des stats
    $(".close").click(function(){
        $(".profile").hide();
        $('.stepThree').show();
    });

    //Génerateur de l'énnemi stat, name plus gen Gold
    function generateEnemyStats(myStats) {

        let chooseClass = Math.floor((Math.random() * 3) + 1);
        let getName;
        let getClass;
        let getGold;
        
        switch(chooseClass) {
            case 1:
                getName = "The Weird Warior"
                getClass = "Warrior";
                getGold = Math.floor((Math.random() * 50) + 1)
                break;
            case 2:
                getName = "The PowerFull Magician"
                getClass = "Magician";
                getGold = Math.floor((Math.random() * 50) + 1);
                break;
            case 3:
                getName = "The Rogue"
                getClass = "Roublard";
                getGold = Math.floor((Math.random() * 50) + 1) * 1.2;
                break;
        }
        let ennemy = new Personnage (
            getName,
            getClass,
            Math.floor(Math.random() * ((myStats.hp * 1.1)) - (myStats.hp * 0.9) + 1) + (myStats.hp * 0.9),
            Math.floor(Math.random() * ((myStats.mana * 1.1)) - (myStats.mana * 0.9) + 1) + (myStats.mana * 0.9),
            Math.floor(Math.random() * ((myStats.magie * 1.1)) - (myStats.magie * 0.9) + 1) + (myStats.magie * 0.9),
            Math.floor(Math.random() * ((myStats.attack * 1.1)) - (myStats.attack * 0.9) + 1) + (myStats.attack * 0.9),
            Math.floor(Math.random() * ((myStats.defense * 1.1)) - (myStats.defense * 0.9) + 1) + (myStats.defense * 0.9),
            Math.floor(Math.random() * ((myStats.magicalDefense * 1.1)) - (myStats.magicalDefense * 0.9) + 1) + (myStats.magicalDefense * 0.9),
            Math.floor(Math.random() * ((myStats.agility * 1.1)) - (myStats.agility * 0.9) + 1) + (myStats.agility * 0.9),
            Math.floor(Math.random() * ((myStats.speed * 1.1)) - (myStats.speed * 0.9) + 1) + (myStats.speed * 0.9),
            getGold
        );

        return ennemy;
    }

    function checkSpeed(ennemy) {
        return data.speed > ennemy.speed;
    }
    
    //Fonction Ennemi attack
    function ennemyTurn() {
        let physicalEnnemyStats = ennemyStats.physicalDamage() - data.defense;
        let magicalEnnemyStats = ennemyStats.magicalDamage() - data.magicalDefense;

        if(ennemyStats.classe == "Warrior") {
            if(ennemyStats.physicalDamage() - data.defense > 0) {
                if(physicalEnnemyStats >= 0) {
                    data.hp = data.hp - physicalEnnemyStats;
                }
            }
        }
        if(ennemyStats.classe == "Magician") {
            if(ennemyStats.magicalDamage() - data.magicalDefense > 0) {
                if(magicalEnnemyStats >= 0) {
                    data.hp = data.hp - magicalEnnemyStats;
                }
            }
        }
        if(ennemyStats.classe == "Roublard") {
            if(data.physicalDamage() - ennemyStats.defense > 0) {
                if(physicalEnnemyStats >= 0) {
                    data.hp = data.hp - physicalEnnemyStats;
                }
            }
        }
        document.getElementById('allyHp').innerHTML = "";
        document.getElementById('allyHp').innerHTML = "HP: " + data.hp;
    }

    //Function Joueur
    function allyTurn() {
        let physicalAllyStats = data.physicalDamage() - ennemyStats.defense;
        let magicalAllyStats = data.magicalDamage() - ennemyStats.magicalDefense;

        if(data.classe == "Warrior") {
            if(data.physicalDamage() - ennemyStats.defense > 0) {
                if(physicalAllyStats >= 0) {
                    ennemyStats.hp = ennemyStats.hp - physicalAllyStats;
                }
            }
        }
        if(data.classe == "Magician") {
            if(data.magicalDamage() - ennemyStats.magicalDefense > 0) {
                if(magicalAllyStats >= 0) {
                    ennemyStats.hp = ennemyStats.hp - magicalAllyStats;
                }
            }
        }
        if(data.classe == "Roublard") {
            if(data.physicalDamage() - ennemyStats.defense > 0) {
                if(physicalAllyStats >= 0) {
                    ennemyStats.hp = ennemyStats.hp - physicalAllyStats;
                }
            }
        }
        document.getElementById('ennemyHp').innerHTML = "";
        document.getElementById('ennemyHp').innerHTML = "HP: " + ennemyStats.hp;
    }

    $("#fightTravel").click(function(){
        $(".stepThree").hide();
        $('.fight').show();
        ennemyStats = generateEnemyStats(data);
        let speed = checkSpeed(ennemyStats);
        document.getElementById('ennemyName').innerHTML = "Name: " + ennemyStats.name;
        document.getElementById('ennemyHp').innerHTML = "HP: " + ennemyStats.hp;

        document.getElementById('allyName').innerHTML = "Name: " + data.name;
        document.getElementById('allyHp').innerHTML = "HP: " + data.hp;

        if (speed == false) {
            ennemyTurn();
        }

    })

    $("#attackEnnemy").click(function(){
        allyTurn();
        ennemyTurn();
        if (ennemyStats.hp <= 0 && data.hp >= 0) {
            data.gold = data.gold + ennemyStats.gold;
            document.getElementById('myGold').innerHTML = "Gold: " + data.gold;
            document.getElementById('dropFight').innerHTML = "Gold win: " + ennemyStats.gold;
            $('.fight').hide();
            $('.successFight').show();
        }
        if (data.hp <= 0) {
            alert("Lose")
        }
    })

    $(".closeDropSuccess").click(function(){
        $(".successFight").hide();
        $('.stepThree').show();
    })

    $(".closeDropDefeat").click(function(){
        $(".defeatFight").hide();
        $('.stepThree').show();
    })

    //Fonction Amélioration proto 
    $("#TimeToPowerUp").click(function(){
        if (data.gold >= 5) {
            if(data.classe == "Warrior"){
                data.Gold -= 5;
                data.hp += 10;
                data.defense += 2;
                data.attack += 1;
            }

            if(data.classe == "Magician"){
                data.Gold -= 5;
                data.hp += 10;
                data.magie += 4;
            }

            if(data.classe == "Roublard"){
                data.Gold -= 5;
                data.hp += 10;
                data.attack += 2;
                data.agility += 1;
            }
        }
    })

});
