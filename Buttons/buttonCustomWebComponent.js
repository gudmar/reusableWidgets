class CustomButton extends AbstractComponent{

    // Here some button effects could be added - like wobbling button etc

    constructor(){
        super();
        this.maxLabelLenght = 10;
        this.state = {
            labelFromAttrib: 'Button',
            displayedLabel: 'Button',
            colorTheme: 'blue',
            isActive: true,
            isLabelTooBid: false,
            onclick: ()=>{}
        }
        this.stateProxy = new Proxy(this.state, this.stateProxyHandler())
        this.setInitialState();
    }
    stateProxyHandler(){
        return {
            set: function(obj, prop, value){
                if (prop == 'colorTheme'){
                    if (!this.checkIfColorThemeIsSupported(value)) {
                        throw new Error(`${this.constructor.name}: Color theme ${value} not supported.`)
                    }
                    this.changeButtonColorThemeClass(value);
                }
                if (prop == 'isActive') {this.setButtonToActiveUnactiveState(value);}
                if (prop == 'displayedLabel') {this.value = this.getShorterLabelIfLabelTooLong(value)}
                if (prop == 'labelFromAttrib') {this.setButtonLabel(value);}
                if (prop == 'onclick') {this.changeOnclickFunction(value)}
                obj[prop] = value;
                return true;
            }.bind(this),
            get: function(obj, prop, receiver){
                return obj[prop]
            }
        }
    }

    changeOnclickFunction(newFunction){
        this.removeEventListener('click', this.state['onclick'])
        this.addEventListener('click', eval(this.state['onclick']))
    }

    checkIfColorThemeIsSupported(colorThemeName){
        let supportedThemes = ['green', 'blue', 'red'];
        return supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
    }

    setButtonToActiveUnactiveState(value){
        if (!value) {
            {this.changeButtonColorThemeClass('inactive')}
            this.onclickMemory = this.onclick;
            this.onclick = ''
        }
        else {
            this.changeButtonColorThemeClass(this.state['colorTheme'])
            this.onclick = this.onclickMemory;
        }
    }

    changeButtonColorThemeClass(colorThemeName){
        let targetElement = this.shadowRoot.querySelector('.button')
        // let findColorThemeRelatedClass = function() {
            let colorClassPattern = 'color-theme-'
            let oldThemeClass = '';
            Array.from(targetElement.classList).forEach((item, index) => {                
                if (item.indexOf(colorClassPattern) != -1){oldThemeClass = item}
            })
            console.log(oldThemeClass)
        // }
        if (oldThemeClass != '') {targetElement.classList.remove(oldThemeClass)}
        targetElement.classList.add(colorClassPattern + colorThemeName)
    }

    _onInnerHTMLChange(){
        
    }


    attachAction(callback, trigger = 'click') {
        this.addEventListener(trigger, callback)
    }

    // setStateIfNoAttrDefined(attrName, stateKey, cb){
    //     let attr = this.getAttribute(attrName);
    //     if ((attr == undefined) || attr == null) {
    //         cb(this.state[stateKey])
    //     } else {
    //         cb(attr)
    //     }
    // }

    setInitialState(){
        this.setStateIfNoAttrDefined('label', 'labelFromAttrib', this.setButtonLabel.bind(this))
    }

    setButtonLabel(label) {
        // this.shadowRoot.querySelector('.button').innerHTML = label
        let newLabel = this.getShorterLabelIfLabelTooLong(label)
        this.stateProxy['displayedLabel'] = newLabel;
        this.shadowRoot.querySelector('.button').innerHTML = newLabel;
    }

    getShorterLabelIfLabelTooLong(labelToShorten){
        if (labelToShorten.length <= this.maxLabelLenght) return labelToShorten
        let getShorterLabel = function(label){return label.substring(0, this.maxLabelLenght - 3)}.bind(this)
        return getShorterLabel(labelToShorten) + '...'
    }


    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-label'){
            // this.setButtonLabel(newVal)
            this.stateProxy.labelFromAttrib = newVal
        }
        if (attrName == 'data-is-active') {this.stateProxy.isActive = this._stringOrBooleanToBoolean(newVal); console.log('attrig')}
        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-onclick') {this.stateProxy.onclick = newVal}
    }


    connectedCallback() {
        this.setInitialOnclick();
        this.displayTooltipIfNeeded();
    }

    displayTooltipIfNeeded(){
        this.addEventListener('mouseenter', this.createTooltipIfNeeded.bind(this));
        this.addEventListener('mouseleave', this.removeTooltipIfExists.bind(this));
    }

    createTooltipIfNeeded(){
        if (this.stateProxy['labelFromAttrib'].length > this.maxLabelLenght){
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = this.stateProxy['labelFromAttrib'];
            this.shadowRoot.appendChild(tooltip)
        }
    }
    removeTooltipIfExists(){
        let tooltip = this.shadowRoot.querySelector('.tooltip');
        if (tooltip != null) {this.shadowRoot.removeChild(tooltip)}
    }

    setInitialOnclick(){
        let onclickFunction = this.getAttribute('data-onclick')
        console.log(onclickFunction)
        this.stateProxy['onclick'] = onclickFunction != undefined ? onclickFunction : ()=>{}
    }

    _changeButtonToBig() {
        this.shadowRoot.querySelector('.button').classList.remove('button-min')
    }


    static get observedAttributes() {
        return ['data-label', 'data-color-theme', 'data-is-active', 'data-onclick']
    }

    _getTemplate(){
        return `
            <style>
            *{
                position: relative;
            }
            .button-wrapper{
                display: inline-block
            }
            .button-big{
                --button-font-size: 1.5rem;
                --button-padding: 10px;
            }
            .button-small{
                --button-font-size: 1rem;
                --button-padding: 5px;
            }

            .color-theme-blue{
                --button-bg: blue;
                --button-fg: white;
                --button-hover-bg: rgb(120, 120, 255);
                --button-hover-fg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }

            .color-theme-green{
                --button-bg: GreenYellow;
                --button-fg: DarkGreen;
                --button-hover-bg: DarkGreen;
                --button-hover-fg: GreenYellow;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: DarkGreen;
            }
            .color-theme-red{
                --button-bg: rgb(220, 0, 0);
                --button-fg: white;
                --button-hover-bg: rgb(150, 0, 0);
                --button-hover-fg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }
            .color-theme-inactive{
                --button-bg: gray;
                --button-fg: DarkGray;
                --button-hover-bg: gray;
                --button-hover-fg: DarkGray;
                --button-active-bg: gray;
                --button-active-fg: DarkGray; 
                --button-border-color: rgba(0, 0, 0, 0);
            }

            .button{
                display: flex;
                justify-content: center;
                align-items: center;
                display: flex;
                overflow: hidden;
                text-align: center;
                color: var(--button-fg);
                background-color: var(--button-bg);
                font-family: Arial;
                border: solid thin var(--button-border-color);
                border-radius: 5px;
                padding: var(--button-padding);
                transition: 0.2s;
            }
            .button-min{
                border-radius: 50%;
                width: 0.7rem;
                height: 0.7rem;
            }
            .button:hover {
                cursor: pointer;
                background-color: var(--button-hover-bg);
                color: var(--button-hover-fg);
                transition: 0.2s;
            }
            .color-theme-inactive:hover{
                cursor: not-allowed;
            }
            .button:active {
                background-color: var(--button-active-bg);
                color: var(--button-active-fg);
            }
            .tooltip {
                position: absolute;
                background: white;
                color: black;
                border-radius: 5px;
                padding: 5px;
                max-width: 100px;
                line-break: anywhere;
            }
            ${this.additionalStyling}
            </style>
            <div class = "button-wrapper">
                <div class="button color-theme-blue position-right-top button-big" ></div>
            </div>
        `
    }

    additionalStyling() {
        return `

        
        `
    }
}

window.customElements.define('custom-button', CustomButton)
