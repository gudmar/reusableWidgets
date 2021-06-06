class WaitingCircle extends HTMLElement{

    // https://loading.io/css/
    // https://stackoverflow.com/questions/12813573/position-icons-into-circle

    constructor(){
        super();
        this.implementationHandlers = {
            'sample-waiting-circle': SampleWaitingCircle,
            'drop-waiting-circle': DropWaitingCircle,
            'dots-simple-waiting-circle': DotsSimpleWaitnigCirlce,
            'roller-coster-waiting-circle': RollerCosterWaitingCircle,
            'water-circles-waiting-circle': WaterCirclesWaitingCircle,
            'growing-ring-waiting-circle': GrowingRingWaitingCircle,
            'blinking-dots-waiting-circle': BlinkingDotsWaitingCircle,
            'bubbling-circles-waiting-circle': BubblingCirclesWaitingCircle,
            'growing-ring-SVG-waiting-circle':GrowingRingSVGWaitingCircle
        }
        

        this.state = {
            elementType: 'sample-waiting-circle',
            colorTheme: 'blue',
            size: 'small',
            onclick: ()=>{}
        }
        let implementerClass = this.implementationHandlers[this.state['elementType']];
        // if (this.state['elementType'] == 'growing-ring-SVG-waiting-circle') debugger
        this.implementer = new implementerClass(this)
        this.stateProxy = new Proxy(this.state, this.stateProxyHandler())
        this.attachShadow({mode: 'open'})
    }
    stateProxyHandler(){
        return {
            set: function(obj, prop, value){
                if (prop == 'colorTheme') {this.implementer.changeColorTheme(value)}
                if (prop == 'elementType') {
                    this.implementer.stopWaitingCircle();
                    this.changeImplementer(value);
                    this.implementer.startWaitingCircle();
                    this.implementer.changeColorTheme(this.stateProxy['colorTheme'])
                    this.implementer.changeElementSize(this.stateProxy['size'])
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
    }

    isInList(element, list){
        let val = list.includes(element)? true : false;
        return list.includes(element)? true : false;
        return list.indexOf(element) == (-1) ? false : true;
    }



    setInitialState(){
        this.setStateIfNoAttrDefined('data-size', 'elementSize')
        this.setStateIfNoAttrDefined('data-color', 'elementColor')
        this.setStateIfNoAttrDefined('data-element-subtype', 'elementType')
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
        if (attrName == 'data-element-subtype') {this.stateProxy.elementType = newVal}
        if (attrName == 'data-size') {this.stateProxy.elementSize = newVal}
    }


    connectedCallback() {
        this.changeImplementer(this.stateProxy['elementType']);
        this.implementer.startWaitingCircle(this.stateProxy['size'], this.stateProxy['colorTheme']);
    }


    static get observedAttributes() {
        return ['data-color-theme', 'data-size', 'data-element-subtype']
    }

}

window.customElements.define('waiting-circle', WaitingCircle)