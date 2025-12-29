import * as THREE from 'three'
import Countdown from '../Countdown.js'

export default class CrossroadsSection {
    constructor(_options) {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.objects = _options.objects
        this.areas = _options.areas
        this.tiles = _options.tiles
        this.debug = _options.debug
        this.x = _options.x
        this.y = _options.y

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        this.setStatic()
        this.setTiles()
        this.setCountdown()
    }

    setCountdown() {
        const targetDate = '2026-01-30T16:00:00+05:30'

        // Countdown 1 - Days
        this.countdown1 = new Countdown({
            time: this.time,
            resources: this.resources,
            debug: this.debug,
            position: { x: -2.15, y: -30.1, z: 1.45 },
            targetDate: targetDate,
            unit: 'days'
        })
        this.container.add(this.countdown1.container)

        // Countdown 2 - Hours
        this.countdown2 = new Countdown({
            time: this.time,
            resources: this.resources,
            debug: this.debug,
            position: { x: -0.9, y: -30.1, z: 1.45 },
            targetDate: targetDate,
            unit: 'hours'
        })
        this.container.add(this.countdown2.container)

        // Countdown 3 - Minutes
        this.countdown3 = new Countdown({
            time: this.time,
            resources: this.resources,
            debug: this.debug,
            position: { x: 0.35, y: -30.1, z: 1.45 },
            targetDate: targetDate,
            unit: 'minutes'
        })
        this.container.add(this.countdown3.container)

        // Countdown 4 - Seconds
        this.countdown4 = new Countdown({
            time: this.time,
            resources: this.resources,
            debug: this.debug,
            position: { x: 1.6, y: -30.1, z: 1.45 },
            targetDate: targetDate,
            unit: 'seconds'
        })
        this.container.add(this.countdown4.container)
    }

    setStatic() {
        this.objects.add({
            base: this.resources.items.crossroadsStaticBase.scene,
            collision: this.resources.items.crossroadsStaticCollision.scene,
            floorShadowTexture: this.resources.items.crossroadsStaticFloorShadowTexture,
            offset: new THREE.Vector3(this.x, this.y, 0),
            mass: 0
        })
    }

    setTiles() {
        // To intro
        this.tiles.add({
            start: new THREE.Vector2(this.x, - 10),
            delta: new THREE.Vector2(0, this.y + 14)
        })

        // To projects
        this.tiles.add({
            start: new THREE.Vector2(this.x + 12.5, this.y),
            delta: new THREE.Vector2(7.5, 0)
        })

        // To projects
        this.tiles.add({
            start: new THREE.Vector2(this.x - 13, this.y),
            delta: new THREE.Vector2(- 6, 0)
        })
    }
}
