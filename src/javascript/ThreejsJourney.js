import gsap from 'gsap'

export default class ThreejsJourney {
    constructor(_options) {
        // Options
        this.config = _options.config
        this.time = _options.time
        this.world = _options.world

        // Setup
        this.$container = document.querySelector('.js-threejs-journey')
        this.$messages = [...this.$container.querySelectorAll('.js-message')]
        this.$yes = this.$container.querySelector('.js-yes')
        this.$no = this.$container.querySelector('.js-no')
        this.step = 0
        this.maxStep = this.$messages.length - 1

        this.setYesNo()
        this.start()
    }

    setYesNo() {
        // Hovers
        this.$yes.addEventListener('mouseenter', () => {
            this.$container.classList.remove('is-hover-none')
            this.$container.classList.remove('is-hover-no')
            this.$container.classList.add('is-hover-yes')
        })

        this.$yes.addEventListener('mouseleave', () => {
            this.$container.classList.add('is-hover-none')
            this.$container.classList.remove('is-hover-no')
            this.$container.classList.remove('is-hover-yes')
        })
    }

    start() {
        this.$container.classList.add('is-active')

        window.requestAnimationFrame(() => {
            this.next()
        })
    }

    updateMessages() {
        let i = 0

        // Visibility
        for (const _$message of this.$messages) {
            if (i < this.step)
                _$message.classList.add('is-visible')

            i++
        }

        // Position
        this.$messages.reverse()

        let height = 0
        i = this.maxStep
        for (const _$message of this.$messages) {
            const messageHeight = _$message.offsetHeight
            if (i < this.step) {
                _$message.style.transform = `translateY(${- height}px)`
                height += messageHeight + 20
            }
            else {
                _$message.style.transform = `translateY(${messageHeight}px)`
            }

            i--
        }


        this.$messages.reverse()
    }

    next() {
        if (this.step > this.maxStep)
            return

        this.step++

        this.updateMessages()
    }
}