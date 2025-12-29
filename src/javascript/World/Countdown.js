import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class Countdown {
    constructor(_options) {
        // Options
        this.time = _options.time
        this.resources = _options.resources
        this.debug = _options.debug
        this.targetDate = new Date(_options.targetDate)
        this.unit = _options.unit // 'days', 'hours', 'minutes', 'seconds'

        // Set up
        this.container = new THREE.Object3D()
        this.container.matrixAutoUpdate = false

        // Apply values
        this.container.position.x = _options.position && _options.position.x ? _options.position.x : -2.15
        this.container.position.y = _options.position && _options.position.y ? _options.position.y : -30.1
        this.container.position.z = _options.position && _options.position.z ? _options.position.z : 1.45
        this.container.rotation.x = Math.PI / 2
        this.container.rotation.y = Math.PI / 4
        this.container.updateMatrix()

        // Parameters
        this.font = this.resources.items.stFont
        this.material = new THREE.MeshMatcapMaterial({ matcap: this.resources.items.matcapWhiteTexture })

        // Initial create
        this.updateCount()
        this.createGeometry()

        // Debug
        if (this.debug) {
            this.setDebug()
        }

        // Timer
        this.interval = window.setInterval(() => {
            this.updateCount()
            this.createGeometry()
        }, 1000)
    }

    updateCount() {
        const now = new Date()
        const diff = this.targetDate - now

        if (diff < 0) {
            this.count = 0
            return
        }

        const totalSeconds = Math.floor(diff / 1000)
        const totalMinutes = Math.floor(totalSeconds / 60)
        const totalHours = Math.floor(totalMinutes / 60)
        const totalDays = Math.floor(totalHours / 24)

        if (this.unit === 'days') {
            this.count = totalDays
        } else if (this.unit === 'hours') {
            this.count = totalHours % 24
        } else if (this.unit === 'minutes') {
            this.count = totalMinutes % 60
        } else if (this.unit === 'seconds') {
            this.count = totalSeconds % 60
        } else {
            this.count = totalSeconds // Fallback
        }
    }

    createGeometry() {
        // Remove old mesh if exists
        if (this.mesh) {
            this.container.remove(this.mesh)
            this.mesh.geometry.dispose()
        }

        // Create geometry
        const geometry = new TextGeometry(
            this.count.toString(),
            {
                font: this.font,
                size: 0.5,
                height: 0.25, // Changed from depth to height as per Three.js standard (though TextGeometry usually used height in older versions, recent ones often use depth/height interchangeably depending on abstraction, but standard TextGeometry params are size, height, curveSegments, etc.)
                // Checking TextGeometry source or docs would confirm 'height' is the extrusion depth.
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )

        // Center geometry
        geometry.computeBoundingBox()
        const xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x) + 0.25
        geometry.translate(xMid, 0, 0)

        // Create mesh
        this.mesh = new THREE.Mesh(geometry, this.material)
        this.container.add(this.mesh)
        this.container.updateMatrix()
    }

}
