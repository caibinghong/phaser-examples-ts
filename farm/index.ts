
import { BootInitState } from '../common/BootInitState'
class PreloadInitState extends Phaser.State {
    preload() {
        // preloadStart
        this.load.image('bg1-h', 'assets/bg1-h.jpg')
        this.load.image('bg2-h', 'assets/bg2-h.jpg')
        this.load.image('bg3-h', 'assets/bg3-h.jpg')
        this.load.image('bg4-h', 'assets/bg4-h.jpg')
        this.load.audio('m1', 'assets/m1.mp3')
        this.load.audio('m2', 'assets/m2.mp3')
        this.load.audio('m3', 'assets/m3.wav')

        this.load.spritesheet('chicken', './assets/chicken_spritesheet.png', 131, 200, 3)
        this.load.spritesheet('horse', './assets/horse_spritesheet.png', 212, 200, 3)
        this.load.spritesheet('pig', './assets/pig_spritesheet.png', 297, 200, 3)
        this.load.spritesheet('sheep', './assets/sheep_spritesheet.png', 244, 200, 3)

        // preloadEnd

        // this.load.spritesheet('chicken', './assets/chicken_spritesheet.png', 131, 200, 3)
        // this.load.spritesheet('horse', './assets/horse_spritesheet.png', 212, 200, 3)
        // this.load.spritesheet('pig', './assets/pig_spritesheet.png', 297, 200, 3)
        // this.load.spritesheet('sheep', './assets/sheep_spritesheet.png', 244, 200, 3)
    }
    create() {
        // createStart
        // let bg1H: Phaser.Sprite = this.add.sprite(0, 0, 'bg1-h')
        // let bg2H: Phaser.Sprite = this.add.sprite(0, 0, 'bg2-h')
        // let bg3H: Phaser.Sprite = this.add.sprite(0, 0, 'bg3-h')
        // let bg4H: Phaser.Sprite = this.add.sprite(0, 0, 'bg4-h')
        // let chicken_spritesheet: Phaser.Sprite = this.add.sprite(0, 0, 'chicken_spritesheet')
        // let horse_spritesheet: Phaser.Sprite = this.add.sprite(0, 0, 'horse_spritesheet')
        // let pig_spritesheet: Phaser.Sprite = this.add.sprite(0, 0, 'pig_spritesheet')
        // let sheep_spritesheet: Phaser.Sprite = this.add.sprite(0, 0, 'sheep_spritesheet')
        // createEnd
        this.state.start('s1')


    }
}
class State1 extends Phaser.State {
    distance: number
    diffTime: number
    startX: number
    endX: number
    startTm: number
    endTm: number
    totalGroup: Phaser.Group
    m1: Phaser.Sound
    m2: Phaser.Sound
    m3: Phaser.Sound
    preload() {
        this.game.input.onDown.add(this.touchDown, this)
        this.game.input.onUp.add(this.touchUp, this)
        this.m1 = this.add.audio('m1')
        this.m2 = this.add.audio('m2')
        this.m3 = this.add.audio('m3')

        this.m1.play()
    }
    touchDown(pointer, touch) {
        this.startTm = +(new Date())
        this.startX = touch.pageX
        // console.log('this.startX:' + this.startX)
    }
    touchUp(pointer, touch) {
        this.endTm = +(new Date())
        this.endX = touch.pageX

        // console.log('this.endX:' + this.endX)

        this.distance = this.endX - this.startX
        this.diffTime = this.endTm - this.startTm
        let speed = (this.distance / this.diffTime)
        // console.log('distance:', this.distance, 'speed:', speed)
        if (Math.abs(speed) > 0.8) {
            //this.state.start('s2')
        }
    }
    create() {
        this.totalGroup = this.add.group()
        // group1的东西
        let chicken = this.add.sprite(667, 323, 'chicken')
        chicken.anchor.setTo(0.5)
        chicken.scale.setTo(2)
        chicken.animations.add('chicken', [0, 1, 2], 3)
        let horse = this.add.sprite(100, 100, 'horse')
        horse.scale.setTo(2)
        horse.animations.add('horse', [0, 1, 2], 3)
        let g1 = this.add.group(null, 'g1')
        g1.create(0, 0, 'bg1-h')
        g1.add(chicken)
        g1.add(horse)
        g1.x = 1334
        // g1.add(chicken)
        // group2的东西
        let g2 = this.add.group(null, 'g2')
        g2.create(0, 0, 'bg2-h')
        g2.x = 1334
        // group3
        let g3 = this.add.group(null, 'g3')
        g3.create(0, 0, 'bg3-h')
        g3.x = 1334
        // group4
        let g4 = this.add.group(null, 'g4')
        g4.create(0, 0, 'bg4-h')
        this.totalGroup.add(g1)
        this.totalGroup.add(g2)
        this.totalGroup.add(g3)
        this.totalGroup.add(g4)
        // this.totalGroup.reverse()
        this.getGroupName(this.totalGroup.children)
        this.addButton()
    }
    getGroupName(group) {
        let arr = []
        for (var i = 0; i < group.length; i++) {
            let val = group[i]
            arr.push(val.name)
        }
        console.log(arr)
        console.log('------------------------')
    }
    addButton() {
        let index = 3
        let left = this.add.text(100, 100, '左', { fontSize: 50, fill: 'red' })
        left.inputEnabled = true
        left.events.onInputDown.add(() => {
            let current = this.totalGroup.getAt(index)
            console.log(current)
            let t1 = this.game.add.tween(current)
            t1.to({
                x: -1334
            }, 1000)
            t1.start()
            index--
            let next = this.totalGroup.getAt(index)
            console.log(next)
            let t2 = this.game.add.tween(next)
            t2.to({
                x: 0
            }, 1000)
            t2.onComplete.add(() => {
                this.m1.pause()
                this.m3.play()
                let arr = next.children
                console.log('-------------------')
                arr.forEach(sprite => {
                    // console.log(sprite.animations.name)
                    if (sprite.animations) {
                        sprite.animations.play()
                    }
                });
            })
            t2.start()
        }, this)
        let right = this.add.text(300, 100, '右', { fontSize: 50, fill: 'red' })
        right.inputEnabled = true
        right.events.onInputDown.add(() => {
            let current = this.totalGroup.getAt(index)
            let t1 = this.game.add.tween(current)
            if (index > 3) {
                return
            }
            t1.to({
                x: 1334
            }, 1000)
            t1.start()
            index++
            t1.onComplete.add(() => {
            }, this)
            let next = this.totalGroup.getAt(index)
            let t2 = this.game.add.tween(next)
            t2.to({
                x: 0
            })
            t2.start()
            this.getGroupName(this.totalGroup.children)
        }, this)
    }
}

class State2 extends Phaser.State {
    create() {
        let bg2H: Phaser.Sprite = this.add.sprite(0, 0, 'bg2-h')
    }
}
class State3 extends Phaser.State {
    create() {
        let bg3H: Phaser.Sprite = this.add.sprite(0, 0, 'bg3-h')
    }
}
class State4 extends Phaser.State {
    create() {
        let bg4H: Phaser.Sprite = this.add.sprite(0, 0, 'bg4-h')
    }
}
class Farm extends Phaser.Game {
    constructor() {
        let boot = new BootInitState(1334, 646)
        super(1334, 646, Phaser.CANVAS, 'game')
        this.state.add('boot', boot)
        this.state.add('preload', PreloadInitState)
        this.state.add('s1', State1)
        this.state.add('s2', State2)
        this.state.add('s3', State3)
        this.state.add('s4', State4)
        this.state.start('boot')
    }
}
new Farm()
