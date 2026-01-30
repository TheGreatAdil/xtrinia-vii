import * as THREE from 'three'

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
        this.setParticles()
    }

    setParticles() {
        const count = 80

        // Store particle data for animation
        this.particleData = []
        for (let i = 0; i < count; i++) {
            this.particleData.push({
                angle: Math.random() * Math.PI * 2,
                radius: 1.0 + Math.random() * 2.5,
                speed: 0.3 + Math.random() * 0.7,
                zOffset: Math.random() * Math.PI * 2
            })
        }

        // Geometry
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(count * 3)

        // Initialize positions
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            positions[i3] = this.x
            positions[i3 + 1] = this.y
            positions[i3 + 2] = 2.5
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        // Material - simple red glowing points
        const material = new THREE.PointsMaterial({
            color: 0xff0000,
            size: 0.15,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })

        // Create points mesh
        this.particles = new THREE.Points(geometry, material)
        this.objects.container.add(this.particles)

        // Animation loop
        this.time.on('tick', () => {
            const positions = this.particles.geometry.attributes.position.array
            const time = this.time.elapsed * 0.001

            for (let i = 0; i < count; i++) {
                const i3 = i * 3
                const data = this.particleData[i]

                const angle = data.angle + time * data.speed
                const radius = data.radius + Math.sin(time * 0.5 + data.zOffset) * 0.3

                positions[i3] = this.x + Math.cos(angle) * radius
                positions[i3 + 1] = this.y + Math.sin(angle) * radius
                positions[i3 + 2] = 2.5 + Math.sin(time * data.speed + data.zOffset) * 1.5
            }

            this.particles.geometry.attributes.position.needsUpdate = true
        })
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
