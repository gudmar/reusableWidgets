class SingleButtonPresenter extends AbstractComponent {
    constructor() {
        super();
        this.content = this.shadowRoot.querySelector('content')
        this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
        this.colorChoser = this.shadowRoot.querySelector('#colorChoserId')
        this.buttonType = this.getAttribute('data-button-type');
        this.labelInput = this.shadowRoot.querySelector('input');
        this.button = this.shadowRoot.querySelector('custom-button');
        this.optionsMenuCloseButton = this.shadowRoot.querySelector('.close-button');
        this.optionsMenu = this.shadowRoot.querySelector('.options')
        this.optionsMenuOpenButton = this.shadowRoot.querySelector('.menu-oppener-button')
        this.updatePresentedButtonType();
    }

    connectedCallback() {
        this.setEventsOnWrappedButton();
        this.button.setAttribute('onclick', `SingleButtonPresenter.openModalOnButtonClick("${this.buttonType}")`)
        this.addCloseButtonAction();
    }

    addCloseButtonAction(){
        let hideOptionsMenu = function(){this.optionsMenu.classList.add('do-not-display')}.bind(this)
        let showOptionsMenu = function(){this.optionsMenu.classList.remove('do-not-display')}.bind(this)
        this.optionsMenuCloseButton.addEventListener('click', hideOptionsMenu);
        this.optionsMenuOpenButton.addEventListener('click', showOptionsMenu);
    }

    updatePresentedButtonType(){
        this.buttonType = this.getAttribute('data-button-type')
        this.buttonType = this.buttonType == undefined || this.buttonType == null ? 'sample-button' : this.buttonType;
        this.button.setAttribute('data-button-type', this.buttonType) 
    }

    wrapButton(buttonAsElement) {
        this.content.innerHTML = '';
        this.content.appendChild(buttonAsElement);
        this.setEventsOnWrappedButton();
    }
    setEventsOnWrappedButton() {
        this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
        this.colorChoser.addEventListener('click', this.setButtonColorTheme.bind(this))
        this.labelInput.addEventListener('input', this.setLabelChange.bind(this))
    }
    activateDisactivateButton() {
        let isActivatingSwitchOn = this._stringOrBooleanToBoolean(this.acitivatingSwitch.getAttribute('data-is-on'))
        let getActivationSwitchLabel = function () { return isActivatingSwitchOn ? 'disactivate' : 'activate' }
        this.button.setAttribute('data-is-active', isActivatingSwitchOn)
        this.acitivatingSwitch.setAttribute('data-label', getActivationSwitchLabel())
    }
    setButtonColorTheme() {
        let colorTheme = this.colorChoser.getAttribute('data-position');
        this.button.setAttribute('data-color-theme', colorTheme)
    }
    setLabelChange() {
        console.log('changed')
        this.button.setAttribute('data-label', this.labelInput.value)
    }

    static openModalOnButtonClick(contentDescriptor) {
            console.log(contentDescriptor)
            let modalContent = WidgetDetailsDB.getDetailsAbout(contentDescriptor)
            SingleButtonPresenter.openModalWithContent(modalContent)
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
            .wrapper{
                flex-direction: row;
                postion: relative;
                
                width: 300px;
                height: 100px;
                border-radius: 5px;
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
                width: 60%;
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
                width: 1rem;
                height: 1rem;
                position: absolute;
                font-size: 1.5rem;
            }
            .menu-oppener-placeholder {
                position: relative;
                align-self: flex-start;
            }
            .endless-rotate{
                align-self: flex-start;
                left: 0px;
                top: 0px;
                animation: infinite-rotation 1.5s linear infinite;
                transition: 200ms;
            }
            .endless-rotate:hover{
                cursor: pointer;
                font-size: 2.3rem;
                transform: scale(2);
                transition: 200ms;
            }
            @keyframes infinite-rotation{
                0% {transform: rotate(0);}
                100% {transform: rotate(360deg);}
            }
        </style>

        <div class = "wrapper center">
            <div class="menu-oppener-placeholder">
                <div class = "center menu-oppener-button  endless-rotate">&#9881</div>
            </div>
            <div class = "options center do-not-display">
                <div class = "close-button center">&times;</div>
                <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
                <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
                <input type = "text" placeholder = "Button caption..." value = ''></input>
            </div>
            <div class = "content center">
                <custom-button></custom-button>
            </div>
        </div>
        `
    // sampleButton
}
}
window.customElements.define('single-button-presenter', SingleButtonPresenter)