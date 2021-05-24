class SingleElementPresenter extends HTMLElement{
    constructor(){
        super();
        this.wrappedElementType = this.getAttribute('data-element-type');
        this.wrappedElementSubtype = this.getAttribute('data-element-subtype')
        this.addTemplate();
        this.presenterWrapper = this.shadowRoot.querySelector('.wrapper')
        this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
        this.labelInput = this.shadowRoot.querySelector('input')
        this.content = this.shadowRoot.querySelector('.content')
        this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
        this.colorChoser = this.shadowRoot.querySelector('#colorChoserId')
        this.sizeChoser = this.shadowRoot.querySelector('#sizeChoserId')
        this.wrappedElement = this.shadowRoot.querySelector(this.wrappedElementType);
        this.optionsMenuCloseButton = this.shadowRoot.querySelector('.close-button');
        this.optionsMenu = this.shadowRoot.querySelector('.options')
        this.optionsMenuOpenButton = this.shadowRoot.querySelector('.menu-oppener-button')
        this.wrappedElementTitleHolder = this.shadowRoot.querySelector('.type-label')
        this.updatePresentedElementType();

        this.wholeElement = this.shadowRoot.querySelector('.wrapper')
    }

    addTemplate(){
        let template = document.createElement('template');
        template.innerHTML = this._getTemplate();
        let sh = this.attachShadow({mode: 'open'});
        sh.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
        if (this.wrappedElementType == 'waiting-circle'){
            this.wrappedElement.setAttribute('onclick', `SingleElementPresenter.openModalWithContent('${this.wrappedElementType}', '${this.wrappedElementSubtype}')`)
        } 
        if (this.wrappedElementType == "custom-button") {
            this.wrappedElement.setAttribute('onclick', `SingleElementPresenter.openModalOnButtonClick('${this.wrappedElementType}', '${this.wrappedElementSubtype}')`)
        }
        this.setEventsOnWrappedElement();
        this.addCloseButtonAction();
        this.addWrappedElementTitle();
    }

    addWrappedElementTitle() {
        this.wrappedElementTitleHolder.innerHTML = this.wrappedElementSubtype;
    }

    addCloseButtonAction(){
        let hideOptionsMenu = function(){this.optionsMenu.classList.add('do-not-display')}.bind(this)
        let showOptionsMenu = function(){this.optionsMenu.classList.remove('do-not-display')}.bind(this)
        this.optionsMenuCloseButton.addEventListener('click', hideOptionsMenu);
        this.optionsMenuOpenButton.addEventListener('click', showOptionsMenu);
    }

    updatePresentedElementType(){
        this.wrappedElementSubtype = this.getAttribute('data-element-subtype')
        this.wrappedElementSubtype = this.wrappedElementSubtype == undefined || this.wrappedElementSubtype == null ? '' : this.wrappedElementSubtype;
        this.wrappedElement.setAttribute('data-element-subtype', this.wrappedElementSubtype) 
    }

    wrapButton(buttonAsElement) {
        this.content.innerHTML = '';
        this.content.appendChild(buttonAsElement);
        this.setEventsOnWrappedButton();
    }

    setEventsOnWrappedElement() {
        if (this.wrappedElementType == 'waiting-circle'){this.sizeChoser.addEventListener('click', this.setSize.bind(this))}
        if (this.wrappedElementType == 'custom-button'){
            this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
            this.labelInput.addEventListener('input', this.setLabelChange.bind(this))
        }
        this.colorChoser.addEventListener('click', this.setColorTheme.bind(this))
    }

    activateDisactivateButton() {
        let isActivatingSwitchOn = this._stringOrBooleanToBoolean(this.acitivatingSwitch.getAttribute('data-is-on'))
        let getActivationSwitchLabel = function () { return isActivatingSwitchOn ? 'disactivate' : 'activate' }
        this.wrappedElement.setAttribute('data-is-active', isActivatingSwitchOn)
        this.acitivatingSwitch.setAttribute('data-label', getActivationSwitchLabel())
    }

    setColorTheme() {
        let colorTheme = this.colorChoser.getAttribute('data-position');
        this.wrappedElement.setAttribute('data-color-theme', colorTheme)
    }

    setSize() {
        let size = this.sizeChoser.getAttribute('data-position');
        this.wrappedElement.setAttribute('data-size', size)
        this.changePresenterElementSize(size)
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


    setLabelChange() {
        this.wrappedElement.setAttribute('data-label', this.labelInput.value)
    }

    static openModalOnButtonClick(elementType, elementSubtype) {
        let openModalAfterDelay = function(){
            setTimeout(()=>{
                SingleElementPresenter.openModalWithContent(elementType, elementSubtype)
            }, 300);
        }
        openModalAfterDelay();
    }
    static openModalWithContent(elementType, elementSubtype) {
        let content = null;
        let modal = document.createElement('killable-modal');
        if (elementType == 'waiting-circle') {
            content = new CodePresentationCustomWebElement(WaitngCircleDetailsDB.getDetailsAbout(elementSubtype))

            modal.insertElementToKillableModal(content);
        }
        if (elementType == 'custom-button') {
            content = new CodePresentationCustomWebElement(ButtonDetailsDB.getDetailsAbout(elementSubtype))
            modal.insertElementToKillableModal(content);
        
        }
        document.querySelector('body').appendChild(modal)
    }

    static stringToElement (content){
        let template = document.createElement('template');
        template.innerHTML = this.content;
        return template.content.cloneNode(true)
    }
    _getTemplate(){
        return `
            <style>
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
                    background-color: white;
                    border-radius: 5px;
                    align-items: center;
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


                .options{
                    flex-direction: column;
                    position: absolute;
                    background-color: rgb(240, 240, 240);
                    padding: 1rem;
                    border-radius: 5px;
                    box-shadow: 7px 10px 6px 0px rgba(0,0,0,0.71);             
                    z-index: 100;
                }
                .options > *{
                    margin-bottom:20px;
                    margin-top:20px;
                    
                }
                .content{
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .content>*{
                    cursor: pointer;
                }
                .close-button{
                    align-self: flex-end;
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
                }
                input:focus{
                    outline: none;
                    background-color: rgb(200, 250, 200);
                }

                .do-not-display{
                    display: none;
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
                @keyframes infinite-rotation{
                    0% {transform: rotate(0);}
                    100% {transform: rotate(360deg);}
                }

                .type-label{
                    position: absolute;
                    font-style: italic;
                    font-family: Arial;
                    bottom: 5px;
                }
                waiting-circe {
                    z-index: 25;
                    cursor: pointer;
                }
            </style>

            <div class = "wrapper size-small">
                <div class = "center menu-oppener-button  endless-rotate">&#9881</div>
                <div class = "options center do-not-display">
                    ${this.wrappedElementType == 'custom-button' ? this.getCustomButtonOptionsHtml() : ''}
                    ${this.wrappedElementType == 'waiting-circle' ? this.getWaitingCircleOptionsHtml() : ''}
                </div>
                <div class = "content center">
                    <${this.wrappedElementType}></${this.wrappedElementType}>
                </div>
                <div class = "type-label"></div>
            </div>
            `
    }

    getWaitingCircleOptionsHtml(){
        return `
            <div class = "close-button center">&times;</div>
            <multi-switch id="colorChoserId" data-label-set="blue,green,gray"></multi-switch>
            <multi-switch id="sizeChoserId" data-label-set="small,medium,big"></multi-switch>
        `
    }
    getCustomButtonOptionsHtml(){
        return `
            <div class = "close-button center">&times;</div>
            <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
            <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
            <input type = "text" placeholder = "Button caption..." value = ''></input>
        `
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