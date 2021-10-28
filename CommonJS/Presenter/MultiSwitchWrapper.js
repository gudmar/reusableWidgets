class MultiSwitchWrapper extends PresenterMethodProvider{
    constructor(context, elementSubtype){
        super(context);
        this.wrappedElementSubtype = elementSubtype;
        this.context = context;
        this.addWrappedElement('wrapped-element-id');
        this.wrappedElement = this.context.shadowRoot.querySelector('#wrapped-element-id')

        this.colorChoser = this.context.shadowRoot.querySelector('#colorChoserId')
        // this.sizeChoser = this.context.shadowRoot.querySelector('#sizeChoserId')
        this.optionsMenu = this.context.shadowRoot.querySelector('.options');
        this.optionsMenuCloseButton = this.context.shadowRoot.querySelector('.close-button');
        this.addOnclickWrappedElement()
        this.addCloseOpenMenu();

    }

    addOnclickWrappedElement(){
        // this.wrappedElement.setAttribute('onclick', `WaitnigCircleWrapper.openModalWithContent('${this.wrappedElementSubtype}')`)
    }

    static openModalWithContent(elementSubtype){
        let modal = document.createElement('killable-modal');
        let content = new CodePresentationCustomWebElement(WaitngCircleDetailsDB.getDetailsAbout(elementSubtype))
        modal.insertElementToKillableModal(content);
        document.querySelector('body').appendChild(modal)
    }

    addEvents(){
        // this.sizeChoser.addEventListener('click', this.setSize.bind(this))
        if (this.wrappedElementSubtype == 'multi-switch'){
            this.colorChoser.addEventListener('click', this.setColor.bind(this))
        }
        if (this.wrappedElementSubtype == 'toggle-switch'){
            this.colorChoser.addEventListener('click', this.setOnOff.bind(this))
        }
    }

    setOnOff(event){
        let newColor = event.target.getAttribute('data-is-on')=="true"?'green':'gray';
        let colorTarget = this.context.shadowRoot.querySelector('.controlled-element');
        colorTarget.style.backgroundColor = newColor;
    }
    setColor(event){
        let newColor = event.target.getAttribute('data-position');
        let colorTarget = this.context.shadowRoot.querySelector('.controlled-element');
        colorTarget.style.backgroundColor = newColor;
    }


    getElementSpecyficStyling(){
        return`
        `
    }
    getElementSpecyficTemplate(){
        
        if (this.wrappedElementSubtype == 'multi-switch'){
            return `
                <div class="controlled-element" style='background-color: blue'></div>
                <multi-switch id="colorChoserId" data-label-set="blue,green,gray,red"></multi-switch>
            `
        }
        if (this.wrappedElementSubtype == 'toggle-switch'){
            return `
                <div class="controlled-element" style='background-color: green'></div>
                <slide-box id="colorChoserId" data-is-on="true" data-label=""></slide-box>
            `
        }
    }

    getMenuContentAsStirng(){
        return `
            // <multi-switch id="colorChoserId" data-label-set="blue,green,gray,red"></multi-switch>
            // <multi-switch id="sizeChoserId" data-label-set="small,medium,big"></multi-switch>
        `
    }


}