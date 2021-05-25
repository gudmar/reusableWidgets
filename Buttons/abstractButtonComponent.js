class AbstractButton extends AbstractComponent{

    constructor(){
        super();
        this.maxLabelLenght = 10;
        this.state = {
            buttonType: 'sample-button',
            labelFromAttrib: 'Button',
            displayedLabel: 'Button',
            colorTheme: 'blue',
            isActive: true,
            isLabelTooBid: false,
            onclick: ()=>{}
        }
        this.button = this.shadowRoot.querySelector('.button')
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
                    if (!this.state.isActive){
                        this.state.colorTheme = value;
                        // this.setAttribute(`data-color-theme`, value)
                        return true;
                    }
                    this.changeButtonColorThemeClass(value);
                }
                if (prop == 'isActive') {this.setButtonToActiveUnactiveState(value);}
                if (prop == 'displayedLabel') {this.value = this.getShorterLabelIfLabelTooLong(value)}
                if (prop == 'labelFromAttrib') {this.setButtonLabel(value);}
                if (prop == 'buttonType') {this.setButtonType(value)}
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
            this.button.classList.remove(this.state.buttonType)
            this.onclickMemory = this.onclick;
            this.onclick = ''
        }
        else {
            this.changeButtonColorThemeClass(this.state['colorTheme'])
            this.button.classList.add(this.state.buttonType)
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
        // }
        if (oldThemeClass != '') {targetElement.classList.remove(oldThemeClass)}
        targetElement.classList.add(colorClassPattern + colorThemeName)
    }

    _onInnerHTMLChange(){
        
    }


    attachAction(callback, trigger = 'click') {
        this.addEventListener(trigger, callback)
    }


    setInitialState(){
        this.setStateIfNoAttrDefined('label', 'labelFromAttrib', this.setButtonLabel.bind(this))
        this.setStateIfNoAttrDefined('data-element-subtype', 'buttonType', (value)=> {this.stateProxy['buttonType'] = value})
    }

    setButtonLabel(label) {
        // this.shadowRoot.querySelector('.button').innerHTML = label
        let newLabel = this.getShorterLabelIfLabelTooLong(label)
        this.stateProxy['displayedLabel'] = newLabel;
        this.shadowRoot.querySelector('.button>span').innerHTML = newLabel;
    }

    setButtonType(buttonType) {
        let oldButtonType = this.stateProxy['buttonType'];
        this.button.classList.remove(oldButtonType);
        this.button.classList.add(buttonType)
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
        if (attrName == 'data-is-active') {this.stateProxy.isActive = this._stringOrBooleanToBoolean(newVal);}
        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-onclick') {this.stateProxy.onclick = newVal}
        if (attrName == 'data-element-subtype') {this.stateProxy.buttonType = newVal}
    }


    connectedCallback() {
        // In abstract component - without window.cusotmElements.define... this will never launch.
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
        this.stateProxy['onclick'] = onclickFunction != undefined ? onclickFunction : ()=>{}
    }

    _changeButtonToBig() {
        this.shadowRoot.querySelector('.button').classList.remove('button-min')
    }


    static get observedAttributes() {
        return ['data-label', 'data-color-theme', 'data-is-active', 'data-onclick', 'data-element-subtype']
    }

}

