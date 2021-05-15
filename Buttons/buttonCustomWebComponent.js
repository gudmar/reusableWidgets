class CustomButton extends AbstractComponent{

    // Here some button effects could be added - like wobbling button etc

    constructor(){
        super();
        this.state = {
            label: 'Button',
            colorTheme: 'blue',
            isActive: true,
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
                if (prop == 'label') {this.setButtonLabel(value);}
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
        let supportedThemes = ['green', 'blue'];
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
        this.setStateIfNoAttrDefined('label', 'label', this.setButtonLabel.bind(this))
    }

    setButtonLabel(label) {
        this.shadowRoot.querySelector('.button').innerHTML = label
    }


    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-label'){
            // this.setButtonLabel(newVal)
            this.stateProxy.label = newVal
        }
        if (attrName == 'data-is-active') {this.stateProxy.isActive = this._stringOrBooleanToBoolean(newVal); console.log('attrig')}
        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-onclick') {this.stateProxy.onclick = newVal}
    }


    connectedCallback() {
        // let cb = function (){
        //     this.innerHTML = "Content"
        // }.bind(this)
        // setTimeout(cb, 700)
        this.setInitialOnclick();
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
            }

            .color-theme-green{
                --button-bg: GreenYellow;
                --button-fg: DarkGreen;
                --button-hover-bg: DarkGreen;
                --button-hover-fg: GreenYellow;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
            }
            .color-theme-inactive{
                --button-bg: gray;
                --button-fg: DarkGray;
                --button-hover-bg: gray;
                --button-hover-fg: DarkGray;
                --button-active-bg: gray;
                --button-active-fg: DarkGray; 
            }

            .button{
                display: flex;
                justify-content: center;
                align-items: center;
                display: flex;
                
                text-align: center;
                color: var(--button-fg);
                background-color: var(--button-bg);
                font-family: Arial;
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
                transition: 0.2s;
            }
            .button:active {
                background-color: var(--button-active-bg);
                color: var(--button-active-fg);
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
