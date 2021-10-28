class SingleElementPresenter extends HTMLElement{
    constructor(){
        super();
        this.wrappedElementType = this.getAttributeOrDefault('data-element-type', 'custom-button');
        this.wrappedElementSubtype = this.getAttributeOrDefault('data-element-subtype', 'sample-button')
        this.presenterDarkLightTheme = this.getAttributeOrDefault('data-presenter-light-dark-theme', 'light')
      console.log(this.wrappedElementType)
        this.addTemplate();
        this.presenterWrapper = this.shadowRoot.querySelector('.wrapper')
        this.content = this.shadowRoot.querySelector('.content')
        this.wrappedElement = this.shadowRoot.querySelector("#wrapped-element-id");
        this.optionsMenuOpenButton = this.shadowRoot.querySelector('.menu-oppener-button')
        this.wrappedElementTitleHolder = this.shadowRoot.querySelector('.type-label')

        // this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
        // this.labelInput = this.shadowRoot.querySelector('input')
        
        // this.colorChoser = this.shadowRoot.querySelector('#colorChoserId')
        // this.sizeChoser = this.shadowRoot.querySelector('#sizeChoserId')
        

        // let implementerConstructor = this.getWrappedElementImplementer(this.wrappedElementType, this.wrappedElementSubtype)
        // this.wrappedElementImplementer = new this.getWrappedElementImplementer(this.wrappedElementType, this.wrappedElementSubtype)


        this.wrappedElementImplementer = this.getWrappedElementImplementer(this.wrappedElementType, this.wrappedElementSubtype)
        
        // this.setSubtypeToWrappedElement();
    }

    addWrappedElement(element){
        this.content.appendChild(element)
    }

    getWrappedElementImplementer(type, subtype){
        let isInArray = function(element, arr){
            return arr.indexOf(element) == -1 ? false : true;
        }
        if (type == 'custom-button' || type == 'custom-button-1') return new ButtonWrapper(this, subtype);
        if (type == 'waiting-circle') return new WaitnigCircleWrapper(this, subtype)
        if (type == 'switch') return new MultiSwitchWrapper(this,subtype)
        if (type == 'line-gauge') return new LineGalugeWrapper(this)
        if (isInArray(type, ['degree-gauge', 'percentage-gauge', 'speed-gauge'])) return new ArcGaugeWrapper(this, type)
        throw new Error(`${this.constructor.name} : ${this.wrappedElementType} is not supported.`)
    }

    static get observedAttributes() {
        return ['data-element-type', 'data-element-subtype', 'data-presenter-light-dark-theme']
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        if (attrName == 'data-element-type') this.changeElementType(newVal);
        if (attrName == 'data-presenter-light-dark-theme') this.changePresenterColorTheme(oldVal, newVal);
        if (attrName == 'data-element-subtype') this.changeWrappedElementSubtype(newVal);
    }

    changeElementType(){
        // window.alert('Changing presenters wrapped element type is not implemented')
    }

    changePresenterColorTheme(oldVal, newVal){
        let wrapper = this.shadowRoot.querySelector('.wrapper');
        wrapper.classList.remove(oldVal);
        wrapper.classList.add(newVal);
    }



    changeWrappedElementSubtype(newVal){
        try {
            this.wrappedElementImplementer.changeElementSubtype(newVal)
        } catch {
            // this type of element has no subtypes and this menthod is not implemented
        }
        
    }

    addTemplate(){
        let template = document.createElement('template');
        template.innerHTML = this._getTemplate();
        let sh = this.attachShadow({mode: 'open'});
        sh.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        this.wrappedElementImplementer.addEvents();
        this.addWrappedElementTitle();
    }

    setWrappedElementOnclick(){
        this.wrappedElementImplementer.setOnclick(`SingleElementPresenter.openModalOnButtonClick()`)
    }

    // static openModalWithContent(){
    //     this.wrappedElementImplementer.openModalWithContent(this.wrappedElementType, wrappedElementSubtype)
    // }

    addWrappedElementTitle() {
        this.wrappedElementTitleHolder.innerHTML = this.wrappedElementSubtype;
    }


    changePresenterElementSize(newSize){
        this.changePartOfClassNameInElement('size-', newSize)
    }

    changePartOfClassNameInElement(classNamePattern, newPartOfClassToBeInserted){
        let oldClass = '';
        Array.from(this.presenterWrapper.classList).forEach((item, index) => {    
            if (item.indexOf(classNamePattern) != -1){oldClass = item}
        })
        if (oldClass != '') {this.presenterWrapper.classList.remove(oldClass)}
        this.presenterWrapper.classList.add(classNamePattern + newPartOfClassToBeInserted)
    }

    static stringToElement (content){
        let template = document.createElement('template');
        template.innerHTML = this.content;
        return template.content.cloneNode(true)
    }
    _getTemplate(){
        return `
            <style>
              ::-webkit-scrollbar {
                width: 5px;
              }
              
              /* Track */
              ::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.25); 
                border-radius: 20px 0 0 20px;
              }
               
              /* Handle */
              ::-webkit-scrollbar-thumb {
                background: rgba(150, 150, 150, 0.5); 
                box-shadow: inset 0px 0px 5px -4px black; 
                -webkit-box-shadow: inset 0px 0px 5px -4px black; 
                border-radius: 3px 0 0 3px;
              }
              
              /* Handle on hover */
              ::-webkit-scrollbar-thumb:hover {
                background:rgba(100, 100, 100, 0.5); 
                box-shadow: inset 0px 0px 15px -4px black;
                // -webkit-box-shadow: inset 0px 0px 15px -4px black; 
                // border-radius: 20px;
              }

              multi-switch{
                  margin-left: 20px;
              }


                .center{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                :host{
                    display: inline-block;
                    margin: 20px;
                }
                .wrapper{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    border-radius: 5px;
                    align-items: center;
                    
                }
                .light{
                    background-color: rgba(255, 255, 255, 0.5);
                    box-shadow: inset 0px 0px 20px -3px #000000;
                }
                .light>.type-label{
                    color: black;
                }
                .light>.menu-oppener-button{
                    color: black;
                }
                .dark{
                    background-color: rgba(0, 0, 0, 0.7);
                    box-shadow: inset 0px 0px 10px -3px #ddd;
                }
                .dark>.type-label{
                    color: white;
                }
                .dark>.menu-oppener-button{
                    color: white;
                }
                .size-small{
                    width: 200px;
                    height: 100px;
                }
                .size-medium{
                    width: 200px;
                    height: 150px;
                }
                .size-big{
                    width: 200px;
                    height: 200px;
                }
                .size-vBig{
                    width: 200px;
                    height: 420px;                    
                }


                .options{
                    flex-direction: column;
                    position: absolute;
                    background-color: rgba(240, 240, 240, 0.9);
                    border-radius: 5px;
                    box-shadow: 7px 10px 6px 0px rgba(0,0,0,0.71);             
                    z-index: 100;
                    top: -4rem;
                    height: 20rem;
                    
                }
                .options-content > *{
                    margin-bottom:20px;
                    margin-top:20px;
                    
                }
                .content{
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .content>*{
                    cursor: pointer;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .content>degree-gauge, .content>percentage-gauge, .content>speed-gauge, .content>line-gauge{
                    cursor: default;
                }
                .close-button{
                    position: relative;
                    left: 90%;
                    align-self: flex-end;
                    align-self: end;
                    margin: 0;
                    margin-top: 0.5rem;
                    cursor: pointer;
                    width: 1rem;
                    height: 1rem;
                    color: white;
                    background-color: rgb(220, 0, 0);
                    border-radius: 50%;
                    font-weight: bold;
                    transition: 200ms;
                }
                .close-button:hover{
                    transform: scale(1.5);
                    transition: 200ms;
                }
                .close-button:active{
                    transition: 200ms;
                    transform: rotate(180deg);
                    background-color: rgba(100, 100, 100);
                    background-color: green;
                }

                input{
                    height: 1.5rem;
                    border-radius: 0.75rem;
                    background: white;
                    padding: 5px;
                    margin-left: 10px;
                    margin-right: 10px;
                }
                input:focus{
                    outline: none;
                    background-color: rgb(200, 250, 200);
                }

                .do-not-display{
                    width: 0px;
                    height: 0px;
                    overflow: hidden;
                    padding: 0;
                    margin: 0;
                }
                .menu-oppener-button {
                    width: 1.5rem;
                    height: 1.5rem;
                    position: absolute;
                    line-height: 1.5rem;
                    font-size: 1.5rem;
                    z-index: 50;
                }
                .menu-oppener-placeholder {
                    position: relative;
                    align-self: flex-start;
                    border-radius: 50%;
                }
                .endless-rotate{
                    align-self: flex-start;
                    left: 0px;
                    top: 0px;
                    border-radius: 50%;
                    transition: 200ms;
                    animation: infinite-rotation 1.5s linear infinite;
                }
                .menu-oppener-button:hover{
                    cursor: pointer;
                    font-size: 2.3rem;
                    transform: scale(2);
                    transition: 200ms;
                }
                .controlled-element{
                    position: relative;
                    width: 100px;
                    height: 100px;
                    border-radius: 80% 20% 70% 30% / 30% 30% 70% 70%;
                    -webkit-box-shadow: inset 0px 0px 100px -22px rgba(8, 8, 8, 1);
                    -moz-box-shadow: inset 0px 0px 100px -22px rgba(8, 8, 8, 1);
                    box-shadow: inset 0px 0px 100px -22px rgba(8, 8, 8, 1);
                    cursor:default;
                }
                @keyframes infinite-rotation{
                    0% {transform: rotate(0);}
                    100% {transform: rotate(360deg);}
                }

                .type-label{
                    position: absolute;
                    font-style: italic;
                    font-family: Arial;
                    bottom: 5px;
                    text-align: center;
                }
                waiting-circe {
                    z-index: 25;
                    cursor: pointer;
                }
                .close-button-placeholder{
                    position: relative;
                    height: 1.5rem;
                    margin: 0px;
                }
                .options-content{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    position: relative;
                    max-height: 18rem;
                    overflow: auto;
                    margin: 0px;
                }
                ${this.wrappedElementType == 'speed-gauge' ? '.menu-oppener-button {display: none;}':''}
                ${this.wrappedElementType == 'percentage-gauge' ? '.menu-oppener-button {display: none;}':''}
                ${this.wrappedElementType == 'degree-gauge' ? '.menu-oppener-button {display: none;}':''}
                ${this.wrappedElementType == 'multi-switch' ? '.menu-oppener-button {display: none;}':''}
            </style>

            <div class = "wrapper ${this.getWrapperSizeClass()} ${this.presenterDarkLightTheme}">
                <div class = "center menu-oppener-button  endless-rotate">&#9881</div>
                <div class = "content center">
                    
                </div>
                <div class = "type-label"></div>
            </div>
            `
    }

    getWrapperSizeClass(){
        if (this.wrappedElementSubtype == 'multi-switch') return 'size-vBig';
        if (this.wrappedElementSubtype == 'toggle-switch') return 'size-big';
        return 'size-small'
    }

    addMenu(element){
        this.shadowRoot.querySelector('.wrapper').appendChild(element)
    }

    getAttributeOrDefault(attirbuteName, defaultValue){
        let attr = this.getAttribute(attirbuteName);
        return attr == null || attr == undefined || attr == '' ? defaultValue : attr;
    }

    _stringOrBooleanToBoolean(val) {
        let output = val
        if (typeof(val) == 'string') {
            output = val == "false"?false:true;
        }  
        return output
    }
}

window.customElements.define('single-element-presenter', SingleElementPresenter)