let turn = true;

const Level = [
    {health: 100, strengthMin: 15, strengthMax: 25, shield: 10},
    {health: 200, strengthMin: 25, strengthMax: 35, shield: 15},
    {health: 300, strengthMin: 45, strengthMax: 55, shield: 20}
];

class Hero {
    constructor(health, strengthMin, strengthMax, shield) {
        this.health = health;
        this.strengthMin = strengthMin;
        this.strengthMax = strengthMax;
        this.shield = shield;
        this.defenseHero = false;
    }

    attack(){
        return Math.floor(Math.random() * (this.strengthMax - this.strengthMin) ) + this.strengthMin;
    }

    defense(){
        this.defenseHero = true;
        return this.shield;
    }
    receiveDamage(damage){
        if (this.defenseHero === true){
            this.health = this.health + this.shield - damage;
            this.defenseHero = false;
            return this.health;
        } 
        this.health -= damage;
        return this.health;
        
    }
}

const Monsters = [
    {health: 100, strengthMin: 5, strengthMax: 15, shield: 15},
    {health: 200, strengthMin: 15, strengthMax: 25, shield: 25},
    {health: 300, strengthMin: 25, strengthMax: 35, shield: 35}
];

class Monster {
    constructor(health, strengthMin, strengthMax, shield) {
        this.health = health;
        this.strengthMin = strengthMin;
        this.strengthMax = strengthMax;
        this.shield = shield;
        this.defenseMonster = false;
    }

    attack(){
        return Math.floor(Math.random() * (this.strengthMax - this.strengthMin) ) + this.strengthMin;
    }

    defense(){
        this.defenseMonster = true;
        return this.shield;
    }
    receiveDamage(damage){
        if (this.defenseMonster === true){
            this.health = this.health + this.shield - damage;
            this.defenseMonster = false;
            return this.health;
        } 
        this.health -= damage;
        return this.health;
    }
}