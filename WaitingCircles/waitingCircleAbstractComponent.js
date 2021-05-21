class AbstractWaitingCircle extends AbstractComponent{

    constructor(){
        super();

        this.state = {
            elementType: 'sample-waiting-wheel',
            colorTheme: 'blue',
            size: 'small',
            onclick: ()=>{}
        }
        this.element = this.shadowRoot.querySelector('.circle')
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
                    this.changeElementsColorThemeClass(value);
                }
                if (prop == 'elementType') {this.setElementType(value)}
                if (prop == 'elementSize') {this.changeElementSize(value)}
                obj[prop] = value;
                return true;
            }.bind(this),
            get: function(obj, prop, receiver){
                return obj[prop]
            }
        }
    }

    checkIfColorThemeIsSupported(colorThemeName){
        let supportedThemes = ['green', 'blue', 'gray'];
        return supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
    }

    _onInnerHTMLChange(){
        
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
        this.setStateIfNoAttrDefined('data-size', 'elementSize', this.changeElementSize.bind(this, 'small'))
        this.setStateIfNoAttrDefined('data-color', 'elementColor', this.changeElementsColorThemeClass.bind(this, 'blue'))
        this.setStateIfNoAttrDefined('data-type', 'elementType', (value)=> {this.stateProxy['elementType'] = value})
        console.log(this.state)
    }

    changeElementSize(newSize){
        this.changePartOfClassNameInElement('size-', newSize)
    }

    changeElementsColorThemeClass(newColorTheme){
        this.changePartOfClassNameInElement('color-theme-', newColorTheme)
    }

    changePartOfClassNameInElement(classNamePattern, newPartOfClassToBeInserted){
        let oldClass = '';
        Array.from(this.element.classList).forEach((item, index) => {    
            if (item.indexOf(classNamePattern) != -1){oldClass = item}
        })
        if (oldClass != '') {this.element.classList.remove(oldClass)}
        this.element.classList.add(classNamePattern + newPartOfClassToBeInserted)
        console.log(classNamePattern + newPartOfClassToBeInserted)
    }


    setElementType(elementType) {
        let oldElementType = this.stateProxy['elementType'];
        this.element.classList.remove(oldElementType);
        this.element.classList.add(elementType)
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'data-element-type') {this.stateProxy.elementType = newVal}
        if (attrName == 'data-size') {this.stateProxy.elementSize = newVal}
    }


    connectedCallback() {
        // In abstract component - without window.cusotmElements.define... this will never launch.
    }


    static get observedAttributes() {
        return ['data-color-theme', 'data-size', 'data-color-theme']
    }

}

