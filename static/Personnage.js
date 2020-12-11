class Personnage {

    name;
    classe;
    hp;
    mana;
    magie;
    attack;
    defense;
    magicalDefense;
    agility;
    speed;
    gold;

    constructor(name,classe,hp,mana,magie,attack,
        defense,magicalDefense,agility,speed, gold) {
            this.name = name; 
            this.classe = classe; 
            this.hp = hp; 
            this.mana = mana; 
            this.magie = magie; 
            this.attack = attack; 
            this.defense = defense; 
            this.magicalDefense = magicalDefense; 
            this.agility = agility; 
            this.speed = speed;
            this.gold = gold;
        }

        criticalHit() {
            let value = Math.floor((Math.random() * 100) + 1)
            if(value > 94) {
                return 0;
            } else if (value < 6) {
                return 2
            } else {
                return 1
            }
        }

        physicalDamage() {
            let getCritical = this.criticalHit();

            return this.attack * getCritical;
        }

        magicalDamage() {
            let getCritical = this.criticalHit();

            if(this.mana < 4) {
                return this.magie * 0;
            }

            this.mana = this.mana - 5;


            return this.magie * getCritical;
        }

        getHp() {
            return this.hp;
        }

        setHp(hp) {
            this.hp = hp;
        }
}

export default Personnage;