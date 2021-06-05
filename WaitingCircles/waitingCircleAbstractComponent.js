class AbstractWaitingCircle extends AbstractComponent{

    constructor(){
        super();
        this.implementationHandlers = {
            'sample-witing-circle': SampleWaitingCircle,
            'drop-waitg-circle': DropWaitngCircle
        }

        this.state = {
            elementType: 'sample-waiting-circle',
            colorTheme: 'blue',
            size: 'small',
            onclick: ()=>{}
        }
        this.implementer = this.implementationHandlers[this.state['element-type']]

        this.stateProxy = new Proxy(this.state, this.stateProxyHandler())
        this.setInitialState();
    }
    stateProxyHandler(){
        return {
            set: function(obj, prop, value){
                if (prop == 'colorTheme') {this.implementer.changeColorTheme(value)}
                if (prop == 'elementType') {
                    this.changeImplementer(value);
                    this.startWaitingCircle(this.stateProxy.size, this.stateProxy.colorTheme);
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
        this.implementer.stopWaitingCircle();
        delete this.implementer;
        let implementerClassName = this.implementationHandlers[key]
        this.implementer = new implementerClassName(this);
    }

    isInList(element, list){
        return list.indexOf(element) == (-1) ? false : true;
    }



    setInitialState(){
        this.setStateIfNoAttrDefined('data-size', 'elementSize', this.implementer.changeElementSize.bind(this, 'small'))
        this.setStateIfNoAttrDefined('data-color', 'elementColor', this.impletenter.changeElementsColorThemeClass.bind(this, 'blue'))
        this.setStateIfNoAttrDefined('data-type', 'elementType', (value)=> {this.stateProxy['elementType'] = value})
        console.log(this.state)
    }



    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-element-type') {this.stateProxy.elementType = newVal}
        if (attrName == 'data-size') {this.stateProxy.elementSize = newVal}
    }


    connectedCallback() {        
    }


    static get observedAttributes() {
        return ['data-color-theme', 'data-size', 'data-color-theme']
    }

}

