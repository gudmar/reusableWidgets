class WaitingCircle extends HTMLElement{

    constructor(){
        super();
        this.implementationHandlers = {
            'sample-waiting-circle': SampleWaitingCircle,
            'drop-waitg-circle': DropWaitingCircle
        }

        this.state = {
            elementType: 'sample-waiting-circle',
            colorTheme: 'blue',
            size: 'small',
            onclick: ()=>{}
        }
        let implementerClass = this.implementationHandlers[this.state['elementType']];
        this.implementer = new implementerClass(this)
        this.stateProxy = new Proxy(this.state, this.stateProxyHandler())
        this.setInitialState();
    }
    stateProxyHandler(){
        return {
            set: function(obj, prop, value){
                if (prop == 'colorTheme') {this.implementer.changeColorTheme(value)}
                if (prop == 'elementType') {
                    this.changeImplementer(value);
                    this.startWaitingCircle();
                }
                if (prop == 'elementSize') {this.implementer.changeElementSize(value)}
                obj[prop] = value;
                return true;
            }.bind(this),
            get: function(obj, prop, receiver){
                return obj[prop]
            }
        }
    }

    changeImplementer(key){
        if (!this.isInList(key, Object.keys(this.implementationHandlers))) {
            throw new Error(`${this.constructor.name}: ${key} is not supported. Try one of : ${Object.keys(this.implementationHandlers)}`)
        }
        if (this.implementer != undefined) this.implementer.stopWaitingCircle();
        delete this.implementer;
        let implementerClassName = this.implementationHandlers[key]
        this.implementer = new implementerClassName(this);
        console.log(this.implementer)
    }

    isInList(element, list){
        return list.indexOf(element) == (-1) ? false : true;
    }



    setInitialState(){
        console.log(this.implementer)
        this.setStateIfNoAttrDefined('data-size', 'elementSize')
        this.setStateIfNoAttrDefined('data-color', 'elementColor')
        this.setStateIfNoAttrDefined('data-element-subtype', 'elementType')
        console.log(this.state)
    }

    setStateIfNoAttrDefined(attrName, stateKey){
        let attr = this.getAttribute(attrName);
        if (attr != '') this.stateProxy[attrName] = attr;
        // debugger;

    }


    // setElementType(elementType) {
    //     let oldElementType = this.stateProxy['elementType'];
    //     this.element.classList.remove(oldElementType);
    //     this.element.classList.add(elementType)
    // }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-element-type') {this.stateProxy.elementType = newVal}
        if (attrName == 'data-size') {this.stateProxy.elementSize = newVal}
    }


    connectedCallback() {
        this.attachShadow({mode: 'open'})
        this.changeImplementer(this.stateProxy['elementType'])
        console.log(this.stateProxy['size'])
        this.implementer.startWaitngCircle(this.stateProxy['size'], this.stateProxy['colorTheme']);

    }


    static get observedAttributes() {
        return ['data-color-theme', 'data-size', 'data-color-theme']
    }

}

window.customElements.define('waiting-circle', WaitingCircle)