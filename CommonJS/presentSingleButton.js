class SingleButtonPresenter extends AbstractComponent {
    constructor(){
        super();
        this.content = this.shadowRoot.querySelector('content')
        this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
        this.colorChoser = this.shadowRoot.querySelector('#colorChoserId')
        this.buttonType = this.getAttribute('data-button-type');
        this.labelInput = this.shadowRoot.querySelector('input')
        this.button = this.shadowRoot.querySelector('custom-button')
    }

    connectedCallback(){
        this.setEventsOnWrappedButton();
    }

    wrapButton(buttonAsElement){
        this.content.innerHTML = '';
        this.content.appendChild(buttonAsElement);
        this.setEventsOnWrappedButton();
    }
    setEventsOnWrappedButton(){
        this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
        this.colorChoser.addEventListener('click', this.setButtonColorTheme.bind(this))
        this.labelInput.addEventListener('input', this.setLabelChange.bind(this))
    }
    activateDisactivateButton(){
        let isActivatingSwitchOn = this._stringOrBooleanToBoolean(this.acitivatingSwitch.getAttribute('data-is-on'))
        let getActivationSwitchLabel = function() {return isActivatingSwitchOn? 'disactivate' : 'activate'}
        this.button.setAttribute('data-is-active', isActivatingSwitchOn)
        this.acitivatingSwitch.setAttribute('data-label', getActivationSwitchLabel())
    }
    setButtonColorTheme(){
        let colorTheme = this.colorChoser.getAttribute('data-position');
        this.button.setAttribute('data-color-theme', colorTheme)
    }
    setLabelChange(){
        console.log('changed')
        this.button.setAttribute('data-label', this.labelInput.value)
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
                // height: rem;
                border: solid thin black;
                border-radius: 5px;
            }
            .options{
                flex-direction: column;
                position: relative;
                // width: 30%;
            }
            .content{
                position: relative;
                width: 60%;
            }
        </style>

        <div class = "wrapper center">
            <div class = "options center">
                <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
                <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
                <input type = "text" placeholder = "Button caption..." value = ''></input>
            </div>
            <div class = "content center">
                <custom-button onclick = "openModalOnButtonClick('${this.button}')"></custom-button>
            </div>
        </div>
        `
        // sampleButton
    }
}
window.customElements.define('single-button-presenter', SingleButtonPresenter)