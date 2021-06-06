class ButtonWrapper extends PresenterMethodProvider{
    constructor(context, subtype){
        super(context);
        this.context = context;
        this.subtype = subtype;
        this.addWrappedElement('wrapped-element-id');
        this.wrappedElement = this.context.shadowRoot.querySelector('#wrapped-element-id')
        
        this.acitivatingSwitch = this.context.shadowRoot.querySelector('#acitveButtonSwitchId')
        this.labelInput = this.context.shadowRoot.querySelector('input')
        this.colorChoser = this.context.shadowRoot.querySelector('#colorChoserId')
        this.optionsMenu = this.context.shadowRoot.querySelector('.options');
        this.optionsMenuCloseButton = this.context.shadowRoot.querySelector('.close-button');
        this.addOnclickWrappedElement();
        this.addCloseOpenMenu()

    }

    addOnclickWrappedElement(){
        this.wrappedElement.setAttribute('onclick', `ButtonWrapper.openModalWithContent('${this.subtype}')`)
    }

    addEvents(){
        this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
        this.labelInput.addEventListener('input', this.setLabelChange.bind(this))
        this.colorChoser.addEventListener('click', this.setColorTheme.bind(this))
    }

    changeElementSubtype(newVal){
        this.wrappedElement.setAttribute('data-element-subtype', newVal)
    }


    static openModalWithContent(elementSubtype) {
        let openModalWithContent = function(elementSubtype) {
            let content = null;
            let modal = document.createElement('killable-modal');
            content = new CodePresentationCustomWebElement(ButtonDetailsDB.getDetailsAbout(elementSubtype))
            modal.insertElementToKillableModal(content);
            document.querySelector('body').appendChild(modal)
        }
        let openModalAfterDelay = function(){
            setTimeout(()=>{
                openModalWithContent(elementSubtype)
            }, 300);
        }
        openModalAfterDelay();
    }

    getElementSpecyficStyling(){
        return `
            <styling>

            </styling>
        `
    }
    getElementSpecyficTemplate(id){
        return `
        <custom-button-1 id = "${id}" data-element-subtype = '${this.subtype}' data-color-theme = 'blue'>Button</custom-button-1>
        `
    }

    getMenuContentAsStirng(){
        return `
        <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
        <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
        <input type = "text" placeholder = "Button caption..." value = ''></input>
        `
    }


}