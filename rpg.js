let moving;
let movingAttack;
let x;
let y;
let musicBattle = document.getElementById('battle');
let musicMenu = document.getElementById('menu');
let musicAfter = document.getElementById('afterBattle');
let musicGameover = document.getElementById('gameOver');
let musickAttack = document.getElementById('kattack');
let musicmAttack = document.getElementById('mattack');
let musicsAttack = document.getElementById('sattack');
let musicShield = document.getElementById('shield');
let randomMonsterTurn = 0;
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
let deadMonsters = 0;
let textMoviments = document.getElementById('text')
let getImagesHero = [document.getElementById("knight-frame2"), document.getElementById("knight-frame3"), document.getElementById("knight-frame4"),
document.getElementById("knight-frame5"), document.getElementById("knight-moving0"), document.getElementById("knight-moving1"), 
document.getElementById('knight-attack1'), document.getElementById('knight-attack2'), document.getElementById('knight-attack3'),
document.getElementById('knight-attack4'), document.getElementById('knight-attack5'), document.getElementById('knight-attack6'),
document.getElementById('knight-attack7'), document.getElementById('knight-hurt')];
let getImagesMonsters = {
    slime: [document.getElementById("slime-idle-0"), document.getElementById("slime-idle-1"), document.getElementById("slime-idle-2"),
document.getElementById("slime-idle-3"), document.getElementById("slime-hurt-0"), document.getElementById("slime-hurt-1"),
document.getElementById("slime-hurt-2"), document.getElementById("slime-hurt-3"), document.getElementById('slime-run-0'),
document.getElementById('slime-run-1'), document.getElementById('slime-run-2'), document.getElementById('slime-run-3'),
document.getElementById('slime-run-4'), document.getElementById('slime-run-5'), document.getElementById('slime-attack-0'),
document.getElementById('slime-attack-1'), document.getElementById('slime-attack-2'), document.getElementById('slime-attack-3'),
document.getElementById('slime-attack-4'), document.getElementById('slime-attack-5'), document.getElementById('slime-attack-6'),
document.getElementById('slime-attack-7')],
    minotaur:[document.getElementById("minotaur-idle-0"), document.getElementById("minotaur-idle-1"), document.getElementById("minotaur-idle-2"),
document.getElementById("minotaur-idle-3"), document.getElementById("minotaur-hurt-0"), document.getElementById("minotaur-hurt-1"),
document.getElementById("minotaur-hurt-2"), document.getElementById("minotaur-hurt-3"), document.getElementById('minotaur-run-0'),
document.getElementById('minotaur-run-1'), document.getElementById('minotaur-run-2'), document.getElementById('minotaur-run-3'),
document.getElementById('minotaur-run-4'), document.getElementById('minotaur-run-5'), document.getElementById('minotaur-attack-0'),
document.getElementById('minotaur-attack-1'), document.getElementById('minotaur-attack-2'), document.getElementById('minotaur-attack-3'),
document.getElementById('minotaur-attack-4'), document.getElementById('minotaur-attack-5'), document.getElementById('minotaur-attack-6'),
document.getElementById('minotaur-attack-7')],
    ironhack: document.getElementById('ironhack')
};

const startGame = () => {
      canvas.width = 1200;
      canvas.height = 600;
      document.getElementById('game-board').insertBefore(canvas, document.getElementById('game-board').childNodes[0])
  
      createBoard();
}

const Level = [
    { health: 100, strengthMin: 10, strengthMax: 25, shield: 10 },
    { health: 200, strengthMin: 25, strengthMax: 35, shield: 15 },
    { health: 300, strengthMin: 35, strengthMax: 55, shield: 20 }
];

class Hero {
    constructor(health, strengthMin, strengthMax, shield) {
        this.health = health;
        this.strengthMin = strengthMin;
        this.strengthMax = strengthMax;
        this.shield = shield;
        this.defenseHero = false;
    };

    attack() {
        return Math.floor(Math.random() * (this.strengthMax - this.strengthMin)) + this.strengthMin;
    };

    defense() {
        this.defenseHero = true;
        textMoviments.innerText = 'You are in Defense Mode!';
    };
    receiveDamage(damage) {
        if (this.defenseHero === true) {
            if ((damage - this.shield) > 0){
                this.health = this.health - (damage - this.shield);
                textMoviments.innerText = `You received ${damage - this.shield} damage!`;
                this.defenseHero = false;
                console.log(this.health);
            } else {
                textMoviments.innerText = `You defended the whole attack!`;
                this.defenseHero = false;
                console.log(this.health);
            }
        } else {
            this.health -= damage;
            console.log('Hero health: ', this.health);
            textMoviments.innerText = `You received ${damage} damage!`;
            console.log(this.health);
        }
    };
};

const Monsters = [
    { name: 'slime', health: 100, strengthMin: 10, strengthMax: 25, shield: 15, positionX: 850, positionY: 300, sizeX: 200, sizeY: 200 },
    { name: 'minotaur', health: 200, strengthMin: 15, strengthMax: 35, shield: 25, positionX: 750, positionY: 0, sizeX: 500, sizeY: 500 },
    { name: 'ironhack', health: 300, strengthMin: 30, strengthMax: 55, shield: 35, positionX: 750, positionY: 100, sizeX: 400, sizeY: 400 }
];

class Monster {
    constructor(name, health, strengthMin, strengthMax, shield, positionX, positionY, sizeX, sizeY) {
        if (name === 0){
            this.name = getImagesMonsters.slime;
        } else if (name === 1){
            this.name = getImagesMonsters.minotaur;
        } else this.name = getImagesMonsters.ironhack;
        this.health = health;
        this.strengthMin = strengthMin;
        this.strengthMax = strengthMax;
        this.shield = shield;
        this.defenseMonster = false;
        this.positionX = positionX;
        this.positionY = positionY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    attack() {
        return Math.floor(Math.random() * (this.strengthMax - this.strengthMin)) + this.strengthMin;
    }

    defense() {
        this.defenseMonster = true;
        textMoviments.innerText = 'Monster is in Defense Mode!';

    }
    receiveDamage(damage) {
        if (this.defenseMonster === true) {
            if ((damage - this.shield) > 0){
                this.health = this.health - (damage - this.shield);
                this.defenseMonster = false;
                textMoviments.innerText = `Monster received ${damage} damage!`;
                console.log(this.health);
            } else {
                textMoviments.innerText = `The Monster defended the whole attack!`;
                this.defenseMonster = false;
                console.log(this.health);
            }
        } else {
            this.health -= damage;
            textMoviments.innerText = `Monsters received ${damage} damage!`;
            console.log(this.health);
        }
    }
}

const createBoard = () => {

    canvas.setAttribute('style', 'background-image: url(images/background_rift.png); background-repeat: no-repeat; background-size: cover;')
    context.clearRect(0, 0, 1200, 600);
    animated();

}

const turns = (turn) => {
        if(turn){
            if (y.health>0){
                document.getElementById("buttonAttack").setAttribute("style", "display: inherit;")
                document.getElementById("buttonDefense").setAttribute("style", "display: inherit;")
            }
            checkWinnerOrLooser();
        } else {
            document.getElementById("buttonAttack").setAttribute("style", "display: none;")
            document.getElementById("buttonDefense").setAttribute("style", "display: none;")
            
            setTimeout(() => {
                MonsterTurn();
            }, 3000); 

        }
}

const MonsterTurn = () => {
    randomMonsterTurn = Math.floor(Math.random() * 10)
    if(x.health > 0){
        if(randomMonsterTurn < 8){
            startAttackMonster();
        } else {
            console.log('Monster use defense')
            x.defense()
            musicShield.play();
        };
        setTimeout(() => {
            turns(true);
        }, 3000);
    } 
    checkWinnerOrLooser();

}

const animated = () => {
    let count = 1;
    moving = setInterval(() => {
        context.clearRect(0, 0, 1200, 600);
        context.font = "30px fantasy";
        context.fillStyle = "snow";
        context.fillText(`HP: ${y.health}`, 175, 550);
        context.fillText(`HP: ${x.health}`, 900, 550);
        switch (count) {
            case 1:
                context.drawImage(getImagesHero[0], 50, 100, 400, 400);
                context.drawImage(x.name[0], x.positionX, x.positionY, x.sizeX, x.sizeY);
                count += 1;
                break;
            case 2:
                context.drawImage(getImagesHero[1], 50, 100, 400, 400);
                context.drawImage(x.name[1], x.positionX, x.positionY, x.sizeX, x.sizeY);
                count += 1;
                break;
            case 3: 
                context.drawImage(getImagesHero[2], 50, 100, 400, 400);
                context.drawImage(x.name[2], x.positionX, x.positionY, x.sizeX, x.sizeY);
                count += 1;
                break;
            case 4:
                context.drawImage(getImagesHero[3], 50, 100, 400, 400);
                context.drawImage(x.name[3], x.positionX, x.positionY, x.sizeX, x.sizeY);
                count = 1;
                break;
        }
    }, 200);
}

const startAttackHero = () => {
    let countM = 1;
    clearInterval(moving);
    movingAttack = setInterval(() => {
        context.clearRect(0, 0, 1200, 600);
        switch (countM) {
            case 1:
                context.drawImage(getImagesHero[4], 50, 100, 400, 400);
                context.drawImage(x.name[0], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 2:
                context.drawImage(getImagesHero[5], 100, 100, 400, 400);
                context.drawImage(x.name[1], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 3:
                context.drawImage(getImagesHero[4], 150, 100, 400, 400);
                context.drawImage(x.name[2], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;        
            case 4:
                context.drawImage(getImagesHero[5], 200, 100, 400, 400);
                context.drawImage(x.name[3], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 5:
                context.drawImage(getImagesHero[4], 250, 100, 400, 400);
                context.drawImage(x.name[0], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 6:
                context.drawImage(getImagesHero[5], 300, 100, 400, 400);
                context.drawImage(x.name[1], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 7:
                context.drawImage(getImagesHero[4], 350, 100, 400, 400);
                context.drawImage(x.name[2], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 8:
                context.drawImage(getImagesHero[5], 400, 100, 400, 400);
                context.drawImage(x.name[3], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 9:
                context.drawImage(getImagesHero[4], 450, 100, 400, 400);
                context.drawImage(x.name[0], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 10:
                context.drawImage(getImagesHero[5], 500, 100, 400, 400);
                context.drawImage(x.name[1], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 11:
                context.drawImage(getImagesHero[4], 550, 100, 400, 400);
                context.drawImage(x.name[2], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 12:
                context.drawImage(getImagesHero[5], 600, 100, 400, 400);
                context.drawImage(x.name[3], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 13:
                context.drawImage(getImagesHero[6], 600, 100, 400, 400);
                context.drawImage(x.name[0], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 14:
                context.drawImage(getImagesHero[7], 600, 100, 400, 400);
                context.drawImage(x.name[1], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 15:
                context.drawImage(getImagesHero[8], 600, 100, 400, 400);
                context.drawImage(x.name[4], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 16:
                context.drawImage(getImagesHero[9], 600, 100, 400, 400);
                context.drawImage(x.name[5], x.positionX, x.positionY, x.sizeX, x.sizeY);
                musickAttack.play();
                countM += 1;
                break;
            case 17:
                context.drawImage(getImagesHero[10], 600, 100, 400, 400);
                context.drawImage(x.name[6], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 18:
                context.drawImage(getImagesHero[11], 600, 100, 400, 400);
                context.drawImage(x.name[7], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 19:
                context.drawImage(getImagesHero[12], 600, 100, 400, 400);
                context.drawImage(x.name[0], x.positionX, x.positionY, x.sizeX, x.sizeY);
                countM = 0;
                x.receiveDamage(y.attack());
                clearInterval(movingAttack);
                turn = false;
                startGame();
                break;
        }
    }, 100);

}

const startAttackMonster = () => {
    let countM = 1;
    clearInterval(moving);
    movingAttack = setInterval(() => {
        context.clearRect(0, 0, 1200, 600);
        switch (countM) {
            case 1:
                context.drawImage(getImagesHero[0], 50, 100, 400, 400);
                context.drawImage(x.name[8], 750, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 2:
                context.drawImage(getImagesHero[1], 50, 100, 400, 400);
                context.drawImage(x.name[9], 700, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 3:
                context.drawImage(getImagesHero[2], 50, 100, 400, 400);
                context.drawImage(x.name[10], 650, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;        
            case 4:
                context.drawImage(getImagesHero[3], 50, 100, 400, 400);
                context.drawImage(x.name[11], 600, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 5:
                context.drawImage(getImagesHero[0], 50, 100, 400, 400);
                context.drawImage(x.name[12], 550, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 6:
                context.drawImage(getImagesHero[1], 50, 100, 400, 400);
                context.drawImage(x.name[13], 500, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 7:
                context.drawImage(getImagesHero[2], 50, 100, 400, 400);
                context.drawImage(x.name[8], 450, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 8:
                context.drawImage(getImagesHero[3], 50, 100, 400, 400);
                context.drawImage(x.name[9], 400, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 9:
                context.drawImage(getImagesHero[0], 50, 100, 400, 400);
                context.drawImage(x.name[10], 350, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 10:
                context.drawImage(getImagesHero[1], 50, 100, 400, 400);
                context.drawImage(x.name[11], 300, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 11:
                context.drawImage(getImagesHero[2], 50, 100, 400, 400);
                context.drawImage(x.name[12], 250, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 12:
                context.drawImage(getImagesHero[3], 50, 100, 400, 400);
                context.drawImage(x.name[13], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 13:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[14], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 14:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[15], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 15:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[16], 200, x.positionY, x.sizeX, x.sizeY);
                if(x.health === 200){
                    musicmAttack.play();
                } else if (x.health === 100){
                    musicsAttack.play();
                }
                countM += 1;
                break;
            case 14:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[17], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 15:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[18], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 16:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[19], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 17:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[20], 200, x.positionY, x.sizeX, x.sizeY);
                countM += 1;
                break;
            case 18:
                context.drawImage(getImagesHero[13], 50, 100, 400, 400);
                context.drawImage(x.name[21], 200, x.positionY, x.sizeX, x.sizeY);
                countM = 0;
                y.receiveDamage(x.attack());
                clearInterval(movingAttack);
                startGame();
                break;
        }
    }, 100);
    
}

const checkWinnerOrLooser = () => {
    if(x.health <= 0){
        clearInterval(moving);
        textMoviments.innerText = '';
        context.clearRect(0, 0, 1200, 600);
        document.getElementById("buttonAttack").setAttribute("style", "display: none;")
        document.getElementById("buttonDefense").setAttribute("style", "display: none;")
        context.font = "100px fantasy";
        context.fillStyle = "white";
        context.fillText('You killed the monster!', 100, 200);
        context.fillText('Choose a new one', 200, 300);
        context.fillText('to level up!', 350, 400);
        deadMonsters += 1;
        musicBattle.pause();
        musicAfter.play();
        document.getElementById("buttonSlime").setAttribute("style", "display: inherit;")
        document.getElementById("buttonMinotaur").setAttribute("style", "display: inherit;")
        console.log('You killed the monster')
    } else if (y.health <0){
        clearInterval(moving);
        textMoviments.innerText = '';
        context.clearRect(0, 0, 1200, 600);
        document.getElementById("buttonAttack").setAttribute("style", "display: none;")
        document.getElementById("buttonDefense").setAttribute("style", "display: none;")
        context.font = "100px fantasy";
        context.fillStyle = "white";
        context.fillText('You are died!', 320, 200);
        context.fillText('Try killing a weak monster,', 50, 300);
        context.fillText('to level up first!', 200, 400);
        musicBattle.pause();
        musicGameover.play();
        document.getElementById("buttonSlime").setAttribute("style", "display: inherit;")
        document.getElementById("buttonMinotaur").setAttribute("style", "display: inherit;")
        console.log('You are died!')
    }
}

document.getElementById('buttonSlime').onclick = () => {
    musicGameover.pause();
    musicAfter.pause();
    musicMenu.play();
    x = new Monster(0, Monsters[0].health, Monsters[0].strengthMin, Monsters[0].strengthMax, Monsters[0].shield, Monsters[0].positionX, Monsters[0].positionY, Monsters[0].sizeX, Monsters[0].sizeY);
    if(deadMonsters <= 3){
        y = new Hero(Level[0].health, Level[0].strengthMin, Level[0].strengthMax, Level[0].shield);
    } else if (deadMonsters >= 3 && deadMonsters <= 6){
        y = new Hero(Level[1].health, Level[1].strengthMin, Level[1].strengthMax, Level[1].shield);
    } else {
        y = new Hero(Level[2].health, Level[2].strengthMin, Level[2].strengthMax, Level[2].shield);
    }
    document.getElementById("buttonSlime").setAttribute("style", "display: none;")
    document.getElementById("buttonMinotaur").setAttribute("style", "display: none;")
    document.getElementById("buttonStart").setAttribute("style", "display: inherit;")
}

document.getElementById('buttonMinotaur').onclick = () => {
    musicGameover.pause();
    musicAfter.pause();
    musicMenu.play();
    x = new Monster(1, Monsters[1].health, Monsters[1].strengthMin, Monsters[1].strengthMax, Monsters[1].shield, Monsters[1].positionX, Monsters[1].positionY, Monsters[1].sizeX, Monsters[1].sizeY);
    if(deadMonsters <= 3){
        y = new Hero(Level[0].health, Level[0].strengthMin, Level[0].strengthMax, Level[0].shield);
    } else if (deadMonsters >= 3 && deadMonsters <= 6){
        y = new Hero(Level[1].health, Level[1].strengthMin, Level[1].strengthMax, Level[1].shield);
    } else {
        y = new Hero(Level[2].health, Level[2].strengthMin, Level[2].strengthMax, Level[2].shield);
    }
    document.getElementById("buttonSlime").setAttribute("style", "display: none;")
    document.getElementById("buttonMinotaur").setAttribute("style", "display: none;")
    document.getElementById("buttonStart").setAttribute("style", "display: inherit;")
}

document.getElementById("buttonStart").onclick = () => {
    musicMenu.pause();
    musicBattle.play();
    document.getElementById("buttonStart").setAttribute("style", "display: none;")
    document.getElementById("buttonAttack").setAttribute("style", "display: inherit;")
    document.getElementById("buttonDefense").setAttribute("style", "display: inherit;")
    startGame();
};

document.getElementById("buttonAttack").onclick = function() {
    startAttackHero();
    turns(false);
}

document.getElementById("buttonDefense").onclick = function() {
    y.defense();
    musicShield.play();
    turns(false);
}