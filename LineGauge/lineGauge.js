class LineGauge extends HTMLElement{
    constructor(){
        super();
        this.state = {
            displayedLabel: 'Linear gauge',
            colorTheme: 'blue',
            isActive: true,
            currentValue: 0,
            min: 0,
            max: 100,
            size: 200
        }
        this.stateProxy = new Proxy(this.state, this.getProxyHandler())
        this._getElementFromTemplate();
        this.sliderTrack = this.shadowRoot.querySelector('.slider-track')
        this.slider = this.shadowRoot.querySelector('.ignicator')
        this.label = this.shadowRoot.querySelector('.label')
        this.valueLabel = this.shadowRoot.querySelector('.positive-value-label')
        this.valueLabelNegative = this.shadowRoot.querySelector('.negative-value-label')
    }

    getProxyHandler(){
        return {
                set: function(obj, prop, value){
                    if (prop == 'colorTheme'){
                        if (!this.checkIfColorThemeIsSupported(value)) {
                            throw new Error(`${this.constructor.name}: Color theme ${value} not supported.`)
                        }
                        if (!this.state.isActive){
                            this.state.colorTheme = value;
                            return true;
                        }
                        this.changeColorThemeClass(value);
                    }
                    if (prop == 'isActive') {this.setButtonToActiveUnactiveState(value);}
                    if (prop == 'displayedLabel') {this.setNewLabel(value)}
                    if (prop == 'currentValue') {
                        let approximatedValue = this.approximate(value, 2);
                        if (approximatedValue < this.state.min) {
                            approximatedValue = this.state.min
                        } else if  (approximatedValue > this.state.max) {
                            approximatedValue = this.state.max
                        }
                        let oldValue = this.approximate(parseFloat(this.getAttribute('data-value')), 2);
                        this.setValueLabelsRegardingConstraints(approximatedValue)
                        this.changeSliderWidth(this.stateProxy.min, this.stateProxy.max, approximatedValue)
                        this.emitEventOnValueChange();
                    }
                    if (prop == 'min') {this.stateProxy['currentValue'] = this.stateProxy['currentValue']}
                    if (prop == 'max') {this.stateProxy['currentValue'] = this.stateProxy['currentValue']}
                    if (prop == 'size') {
                        this.changeSliderTrackWidth(value);
                        this.changeSliderWidth(this.state.min, this.state.max, this.stateProxy.currentValue)
                    }
                    obj[prop] = value;
                    return true;
                }.bind(this),
                get: function(obj, prop, receiver){
                    return obj[prop]
                }
            }
    }

    setValue(value){
        value = parseFloat(value)
        if (value < this.stateProxy.min) value = this.stateProxy.min
        if (value > this.stateProxy.max) value = this.stateProxy.max
        this.changeSliderWidth(this.stateProxy.min, this.stateProxy.max, value)
        this.setValueLabel(value)
    }


    setValueLabelsRegardingConstraints(value){
        let approximatedValue = this.approximate(value, 2);
        if (approximatedValue < this.state.min) approximatedValue = this.state.min
        if (approximatedValue > this.state.max) approximatedValue = this.state.max
        this.setValueLabel(value)
    }

    setValueLabel(value) {
        this.valueLabel.innerText = value;
        this.valueLabelNegative.innerText = value;
    }

    emitEventOnValueChange(){
        let event = new CustomEvent('linear-gauge-changed-value', {
            detail: {
                newValue: this.getAttribute('data-value')
            }
        })
        this.dispatchEvent(event);
    }
    onSliderTrackClick(e){
        if (!this.stateProxy.isActive) return false;
        let clickedCordRelevantToSliderTrack = parseFloat(this.getOnclickCordinanceRelativeToEventTarget(e).x)
        let newValue = this.approximate(this.calculateValueFromClick(clickedCordRelevantToSliderTrack), 2);
        this.setAttribute('data-value', newValue)
    }

    getOnclickCordinanceRelativeToEventTarget(e){
        let {left, top} = e.target.getBoundingClientRect();
        return {x: e.pageX - parseFloat(left), y: e.pageY - parseFloat(top)}
    }

    changeSliderWidth(min, max, value){
        this.slider.style.width = (value - min)*this.getSliderTrackWidth() / (max - min) + 'px';
    }

    calculateValueFromClick(clickXCord){
        let {min, max} = this.state;
        return parseFloat(min) + (clickXCord) * (parseFloat(max) - parseFloat(min))/this.getSliderTrackWidth();
    }


    getSliderTrackWidth(){
        return parseFloat(this.sliderTrack.getBoundingClientRect().width);
    }

    setNewLabel(value){
        this.label.innerHTML = value;
    }

    checkIfColorThemeIsSupported(colorThemeName){
        let supportedThemes = ['green', 'blue', 'red'];
        return supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
    }

    setButtonToActiveUnactiveState(shellBeActive){
        if (!shellBeActive) {
            this.changeColorThemeClass('inactive')
            this.onclickMemory = this.onclick;
            this.onclick = '';
        }
        else {
            this.changeColorThemeClass(this.state['colorTheme'])
            this.onclick = this.onclickMemory;
        }
    }

    changeColorThemeClass(colorThemeName){
        let targetElement = this.shadowRoot.querySelector('.slider-track')
            let colorClassPattern = 'color-theme-'
            let oldThemeClass = '';
            Array.from(targetElement.classList).forEach((item, index) => {                
                if (item.indexOf(colorClassPattern) != -1){oldThemeClass = item}
            })
        if (oldThemeClass != '') {targetElement.classList.remove(oldThemeClass)}
        targetElement.classList.add(colorClassPattern + colorThemeName)
    }

    connectedCallback(){
        let activateSlidingMode = function(e){
            if (this.stateProxy.isActive) this.slidingEventActiveted = true
        }.bind(this)
        let disactivateSlidingMode = function(e){
            if (this.stateProxy.isActive) this.slidingEventActiveted = false
        }.bind(this)
        let onMouseMove = function(e) {
            if (!this.stateProxy.isActive) return false;
            if (this.slidingEventActiveted) this.onSliderTrackClick(e);
        }

        this.sliderTrack.addEventListener('mousedown', this.onSliderTrackClick.bind(this))
        this.sliderTrack.addEventListener('mousedown', activateSlidingMode.bind(this))
        document.addEventListener('mouseup', disactivateSlidingMode.bind(this))
        this.sliderTrack.addEventListener('mousemove', onMouseMove.bind(this))
        this.setNewLabel(this.stateProxy['displayedLabel'])
    }

    static get observedAttributes() {
        return ['data-is-active', 'data-color-theme', 'data-min-val', 'data-max-val', 'data-size', 'data-value', 'data-label']
    }


    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'data-label'){
            this.stateProxy['displayedLabel'] = newVal
        }
        if (attrName == 'data-is-active') {this.stateProxy.isActive = this._stringOrBooleanToBoolean(newVal);}
        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-min-val') {this.stateProxy.min = newVal}
        if (attrName == 'data-max-val') {this.stateProxy.max = newVal}
        if (attrName == 'data-size') {this.stateProxy.size = newVal}
        if (attrName == 'data-value') {
            if (oldVal == newVal) return false;
            if (parseFloat(newVal) < this.stateProxy['min']) {
                this.setAttribute('data-value', this.stateProxy['min'])
                newVal = this.stateProxy['min']
            }
            else if (parseFloat(newVal) > this.stateProxy['max']) {
                this.setAttribute('data-value', this.stateProxy['max'])
                newVal = this.stateProxy['max']
            }
            this.stateProxy['currentValue'] = newVal;
        }
    }

    _getElementFromTemplate(){
        let template = document.createElement('template');
        template.innerHTML = this._getTemplate();
        let sh = this.attachShadow({mode: 'open'});
        sh.appendChild(template.content.cloneNode(true))
    }

    approximate(value, nrOfDitits = this.nrOfDititsToApproximation){
        let multiplier = Math.pow(10, nrOfDitits);
        return Math.round(value * multiplier) / multiplier
    }

    changeSliderTrackWidth(sliderTrackWidth){
        this.shadowRoot.querySelector('#linear-gradient-element-styling-id').remove();
        this.shadowRoot.appendChild(this.stringToElement(this._getStyling(sliderTrackWidth)))
    }

    _getStyling(sliderTrackWidth){
        return `
        <style id = "linear-gradient-element-styling-id">
        *{
            font-family: Arial;
            --height: 16px;
        }
            .wrapper{
                position: relative;
                display: flex;
                flex-direction: column;
                justify-items: center;
                align-items: center;
            }
            .slider-track{
                line-height: var(--height);
                background-color: rgb(220, 220, 220);
                position: relative;
                width: ${sliderTrackWidth}px;
                border-radius: 8px;
                box-shadow: inset 0 0 15px #455;
                overflow: hidden;
            }
            .slider-track:hover{
                cursor: pointer;
            }
            .ignicator{
                position: absolute;
                height: var(--height);
                overflow: hidden;
                top: 0;
                left: 0;
            }
            .positive-value-label{
                color: black;
                position: relative;
                width: ${sliderTrackWidth}px;
                height: var(--height);
                text-align: center;
                background-color: transparent;
            }
            .negative-value-label {
                position: relative;
                text-align: center;
                width: ${sliderTrackWidth}px;
                z-index: 4;

            }
            .color-theme-blue .ignicator{
                background-color: blue; 
                color: white;
                overflow: hidden;
                outline: 0;
            }
            .color-theme-blue>.negative-value-label{
                color: white;
            }
            .color-theme-green .ignicator{
                background-color: green; 
                color: white;
            }
            .color-theme-green>.negative-value-label{
                color: white;
            }
            .color-theme-red .ignicator{
                background-color: red; 
                color: white;
            }
            .color-theme-red>.negative-value-label{
                color: white;
            }
            .color-theme-inactive .ignicator{
                background-color: gray; 
                color: darkgray;
            }
            .color-theme-inactive>.negative-value-label{
                color: rgb(230, 230, 230);
            }
        </style>
    
        `
    }

    _getTemplate(sliderTrackWidth = this.state.size + 'px'){
        return `
            ${this._getStyling(sliderTrackWidth)}
            <div class = "wrapper">
                <div class = "slider-track color-theme-blue">
                    <div class = "ignicator">
                        <div class = "negative-value-label"></div>
                    </div>
                    <div class = "positive-value-label"></div>
                </div>
                <div class ="label"></div>
            </div>
        `
    }

    stringToElement(htmlString){
        let template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.cloneNode(true)
    }

    _stringOrBooleanToBoolean(value){
        if (value == 'true') return true;
        if (value == 'false') return false;
        if (typeof(value) == 'boolean') return value;
        throw new Error(`${this.constructor.name}: Given value ${value} is not convertavle to boolean`)
    }
}

window.customElements.define('line-gauge', LineGauge)