class AbstractWaitingCircle extends AbstractComponent{

    constructor(){
        super();

        this.state = {
            elementType: 'sample-waiting-wheel',
            colorTheme: 'blue',
            size: 'small',
            onclick: ()=>{}
        }
        this.element = this.shadowRoot.querySelector('element')
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
                if (prop == 'elementSize') {this.setElementSize(value)}
                obj[prop] = value;
                return true;
            }.bind(this),
            get: function(obj, prop, receiver){
                return obj[prop]
            }
        }
    }

    checkIfColorThemeIsSupported(colorThemeName){
        let supportedThemes = ['green', 'blue', 'grau'];
        return supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
    }

    changeElementsColorThemeClass(colorThemeName){
        let targetElement = this.shadowRoot.querySelector('element')
        let colorClassPattern = 'color-theme-'
        let oldThemeClass = '';
        Array.from(targetElement.classList).forEach((item, index) => {                
            if (item.indexOf(colorClassPattern) != -1){oldThemeClass = item}
        })
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
        this.setStateIfNoAttrDefined('data-size', 'elementSize', this.setElementSize.bind(this))
        this.setStateIfNoAttrDefined('data-color', 'elementColor', this.setElementSize.bind(this))
        this.setStateIfNoAttrDefined('data-type', 'elementType', (value)=> {this.stateProxy['elementType'] = value})
        console.log(this.state)
    }


    setElementType(elementType) {
        let oldElementType = this.stateProxy['elementType'];
        this.element.classList.remove(oldElementType);
        this.element.classList.add(elementType)
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        if (attrName == 'data-color-theme') {this.stateProxy.colorTheme = newVal}
        if (attrName == 'element-type') {this.stateProxy.elementType = newVal}
    }


    connectedCallback() {
        // In abstract component - without window.cusotmElements.define... this will never launch.
    }


    static get observedAttributes() {
        return ['data-label', 'data-color-theme', 'data-is-active', 'data-onclick']
    }

}

