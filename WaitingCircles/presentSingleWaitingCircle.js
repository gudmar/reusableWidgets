class WaitingCirclePresenter extends AbstractComponent {
    constructor() {
        super();
        this.content = this.shadowRoot.querySelector('content')
        this.colorChoser = this.shadowRoot.querySelector('#colorChoserId')
        this.sizeChoser = this.shadowRoot.querySelector('#sizeChoserId')
        this.wrappedElementType = this.getAttribute('data-type');
        this.wrappedElement = this.shadowRoot.querySelector('waiting-circle');
        this.optionsMenuCloseButton = this.shadowRoot.querySelector('.close-button');
        this.optionsMenu = this.shadowRoot.querySelector('.options')
        this.optionsMenuOpenButton = this.shadowRoot.querySelector('.menu-oppener-button')
        this.wrappedElementTitleHolder = this.shadowRoot.querySelector('.type-label')
        this.updatePresentedElementType();

        this.element = this.shadowRoot.querySelector('.wrapper')
    }

    connectedCallback() {
        this.setEventsOnWrappedElement();
        this.wrappedElement.setAttribute('onclick', `WaitingCirclePresenter.openModalOnButtonClick("${this.wrappedElementType}")`)
        this.addCloseButtonAction();
        this.addWrappedElementTitle();
    }

    addWrappedElementTitle() {
        this.wrappedElementTitleHolder.innerHTML = this.wrappedElementType;
    }

    addCloseButtonAction(){
        let hideOptionsMenu = function(){this.optionsMenu.classList.add('do-not-display')}.bind(this)
        let showOptionsMenu = function(){this.optionsMenu.classList.remove('do-not-display')}.bind(this)
        this.optionsMenuCloseButton.addEventListener('click', hideOptionsMenu);
        this.optionsMenuOpenButton.addEventListener('click', showOptionsMenu);
    }

    updatePresentedElementType(){
        this.wrappedElementType = this.getAttribute('data-button-type')
        this.wrappedElementType = this.wrappedElementType == undefined || this.wrappedElementType == null ? 'sample-button' : this.wrappedElementType;
        this.wrappedElement.setAttribute('data-button-type', this.wrappedElementType) 
    }


    setEventsOnWrappedElement() {
        this.colorChoser.addEventListener('click', this.setColorTheme.bind(this))
        this.sizeChoser.addEventListener('click', this.setSize.bind(this))
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
        Array.from(this.element.classList).forEach((item, index) => {    
            if (item.indexOf(classNamePattern) != -1){oldClass = item}
        })
        if (oldClass != '') {this.element.classList.remove(oldClass)}
        this.element.classList.add(classNamePattern + newPartOfClassToBeInserted)
        console.log(classNamePattern + newPartOfClassToBeInserted)
    }


    static openModalOnButtonClick(contentDescriptor) {
            console.log(contentDescriptor)
            let modalContent = ButtonDetailsDB.getDetailsAbout(contentDescriptor)
            let openModalAfterDelay = function(){
                setTimeout(()=>{
                    SingleButtonPresenter.openModalWithContent(modalContent)
                }, 300);
            }
            openModalAfterDelay();
    }

    static openModalWithContent(buttonType) {
        let modal = document.createElement('killable-modal');
        let content = new CodePresentationCustomWebElement(buttonType)
        modal.insertElementToKillableModal(content)
        document.querySelector('body').appendChild(modal)
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
            }
        </style>

        <div class = "wrapper size-small">
            <div class = "center menu-oppener-button  endless-rotate">&#9881</div>
            <div class = "options center do-not-display">
                <div class = "close-button center">&times;</div>
                <multi-switch id="colorChoserId" data-label-set="blue,green,gray"></multi-switch>
                <multi-switch id="sizeChoserId" data-label-set="small,medium,big"></multi-switch>
            </div>
            <div class = "content center">
                <waiting-circle></waiting-circle>
            </div>
            <div class = "type-label"></div>


        </div>
        `
    // sampleButton
}
}
window.customElements.define('waiting-circle-presenter', WaitingCirclePresenter)