class LineGauge extends HTMLElement{
    constructor(){
        super();
        this.state = {
            displayedLabel: 'Linear gauge',
            colorTheme: 'blue',
            isActive: true,
            currentValue: 0,
            min: 0,
            max: 100
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
                            // this.setAttribute(`data-color-theme`, value)
                            return true;
                        }
                        this.changeColorThemeClass(value);
                    }
                    if (prop == 'isActive') {this.setButtonToActiveUnactiveState(value);}
                    if (prop == 'displayedLabel') {this.setNewLabel(value)}
                    if (prop == 'currentValue') {this.changeSliderWidth(this.state.min, this.state.max, value)}
                    if (prop == 'min') {this.changeSliderWidth(value, this.state.max, this.state.currentValue)}
                    if (prop == 'max') {this.changeSliderWidth(this.state.min, value, this.state.currentValue)}
                    obj[prop] = value;
                    return true;
                }.bind(this),
                get: function(obj, prop, receiver){
                    return obj[prop]
                }
            }
    }

    onSliderTrackClick(e){
        console.log(e)
        this.stateProxy['currentValue'] = e.clientX;
    }

    changeSliderWidth(min, max, value){
        console.log(value)
        this.slider.style.width = value * (max - min)/this.getSliderTrackWidth();
    }

    getValueFromSlider(){
        let {min, max} = this.state;
        return (max - min) / this.getSliderWidth;
    }

    getSliderWidth() {
        return parseFloat(this.slider.getBoundingClientRect().width);
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
            {this.changeColorThemeClass('inactive')}
            this.onclickMemory = this.onclick;
            this.onclick = ''
        }
        else {
            this.changeColorThemeClass(this.state['colorTheme'])
            this.button.classList.add(this.state.buttonType)
            this.onclick = this.onclickMemory;
        }
    }

    changeColorThemeClass(colorThemeName){
        let targetElement = this.shadowRoot.querySelector('.wrapper')
            let colorClassPattern = 'color-theme-'
            let oldThemeClass = '';
            Array.from(targetElement.classList).forEach((item, index) => {                
                if (item.indexOf(colorClassPattern) != -1){oldThemeClass = item}
            })
        if (oldThemeClass != '') {targetElement.classList.remove(oldThemeClass)}
        targetElement.classList.add(colorClassPattern + colorThemeName)
    }

    connectedCallback(){
        this.sliderTrack.addEventListener('click', this.onSliderTrackClick.bind(this))
    }


    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'data-label'){
            // this.setButtonLabel(newVal)
            this.stateProxy.labelFromAttrib = newVal
        }
        if (attrName == 'data-is-active') {this.stateProxy.isActive = this._stringOrBooleanToBoolean(newVal);}
        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
    }

    _getElementFromTemplate(){
        let template = document.createElement('template');
        template.innerHTML = this._getTemplate();
        let sh = this.attachShadow({mode: 'open'});
        sh.appendChild(template.content.cloneNode(true))
    }

    _getTemplate(){
        return `
            <style>
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
                    width: 200px;
                    border-radius: 5px;
                    box-shadow: inset 0 0 15px #455;
                    overflow: hidden;
                }
                .ignicator{
                    position: absolute;
                    height: var(--height);
                    top: 0;
                    left: 0;
                }
                .positive-value-label{
                    color: black;
                    position: relative;
                    width: 100%;
                    height: var(--height);
                }
                .color-theme-blue{
                    background-color: blue; 
                    color: white;
                }
                .color-theme-blue>.negative-value-label{
                    color: white;
                }
                .color-theme-green{
                    background-color: green; 
                    color: white;
                }
                .color-theme-green>.negative-value-label{
                    color: white;
                }
                .color-theme-red{
                    background-color: red; 
                    color: white;
                }
                .color-theme-red>.negative-value-label{
                    color: white;
                }
            </style>

            <div class = "wrapper">
                <div class = "slider-track">
                    <div class = "ignicator color-theme-blue">
                        <div class = "negative-value-label"></div>
                    </div>
                    <div class = "positive-value-label"></div>
                </div>
                <div class ="label></div>
            </div>
        `
    }
}

window.customElements.define('line-gauge', LineGauge)