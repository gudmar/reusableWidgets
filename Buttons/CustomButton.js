class CustomButton1 extends HTMLElement{

    // https://loading.io/css/
    // https://stackoverflow.com/questions/12813573/position-icons-into-circle

    constructor(){
        super();
        this.implementationHandlers = {
            'sample-button': SampleButton,
            'grow-button': GrowButton,
            'shrink-button': ShrinkButton,
            'pulse-button': PulseButton,
            'pulse-grow-button': PulseGrowButton,
            'circle-where-clicked-button': CircleWhereClickedButton,
            'pop-button':PopButton,
            'push-button': PushButton
        }
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
        this.stateProxy = new Proxy(this.state, this.stateProxyHandler())
        
        let implementerClass = this.implementationHandlers[this.state['buttonType']];
        this.implementer = new implementerClass(this)
        this.attachShadow({mode: 'open'})
        this.implementer.startButton(this.stateProxy);
        this.changeImplementer(this.stateProxy['buttonType']);
    }

    setStateToValuesFromAttributes(){
        // this.stateProxy[]
    }
    stateProxyHandler(){
        return {
            set: function(obj, prop, value){
                obj[prop] = value;
                if (prop == 'colorTheme'){
                    if (!this.implementer.checkIfColorThemeIsSupported(value)) {return true}
                    if (!this.state.isActive){this.state.colorTheme = value; return true;}
                    this.implementer.changeButtonColorThemeClass(value);
                }
                if (prop == 'isActive') {this.setButtonToActiveUnactiveState(value);}
                if (prop == 'labelFromAttrib') {this.implementer.setButtonLabel(value);}
                if (prop == 'buttonType') {this.changeImplementer(value)}
                if (prop == 'onclick') {this.implementer.changeOnclickFunction(this.stateProxy, value)}
                
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

    setButtonToActiveUnactiveState(value){
        if (!value) {
            this.implementer.setButtonToInactiveState(this.stateProxy);
            this.onclickMemory = this.onclick;
            this.onclick = ''
        }
        else {
            this.implementer.setButtonToActiveState(this.stateProxy);
            this.onclick = this.onclickMemory;
        }
    }

    changeImplementer(key){
        if (!this.isInList(key, Object.keys(this.implementationHandlers))) {
            throw new Error(`${this.constructor.name}: ${key} is not supported. Try one of : ${Object.keys(this.implementationHandlers)}`)
        }
        if (this.implementer != undefined) this.implementer.stopButton();
        delete this.implementer;
        let implementerClassName = this.implementationHandlers[key]
        this.implementer = new implementerClassName(this);
        this.implementer.startButton(this.stateProxy);
        
    }

    isInList(element, list){
        let val = list.includes(element)? true : false;
        return list.includes(element)? true : false;
        return list.indexOf(element) == (-1) ? false : true;
    }



    setInitialState(){
        // this.setStateIfNoAttrDefined('data-size', 'elementSize')
        // this.setStateIfNoAttrDefined('data-color', 'elementColor')
        // this.setStateIfNoAttrDefined('data-element-subtype', 'elementType')
    }

    setStateIfNoAttrDefined(attrName, stateKey){
        let attr = this.getAttribute(attrName);
        if (attr != '') this.stateProxy[attrName] = attr;
        
    }


    // setElementType(elementType) {
    //     let oldElementType = this.stateProxy['elementType'];
    //     this.element.classList.remove(oldElementType);
    //     this.element.classList.add(elementType)
    // }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-element-subtype') {this.stateProxy.buttonType = newVal}
        if (attrName == 'data-is-active') {this.stateProxy.isActive = this.stringOrBooleanToBoolean(newVal)}
        if (attrName == 'data-label') {this.stateProxy.labelFromAttrib = newVal}
        if (attrName == 'data-onclick') {this.stateProxy.onclick = newVal}
    }

    stringOrBooleanToBoolean(val){
        return val == 'true' || val == true ? true : false
    }


    connectedCallback() {
        // this.implementer.startButton(this.stateProxy);
        // this.changeImplementer(this.stateProxy['elementType']);
    }


    static get observedAttributes() {
        return ['data-color-theme', 'data-is-active', 'data-element-subtype', 'data-label', 'onclick']
    }

}

window.customElements.define('custom-button-1', CustomButton1)