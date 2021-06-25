class WaitnigCircleWrapper extends PresenterMethodProvider{
    constructor(context, elementSubtype){
        super(context);
        this.wrappedElementSubtype = elementSubtype;
        this.context = context;
        this.addWrappedElement('wrapped-element-id');
        this.wrappedElement = this.context.shadowRoot.querySelector('#wrapped-element-id')

        this.colorChoser = this.context.shadowRoot.querySelector('#colorChoserId')
        this.sizeChoser = this.context.shadowRoot.querySelector('#sizeChoserId')
        this.optionsMenu = this.context.shadowRoot.querySelector('.options');
        this.optionsMenuCloseButton = this.context.shadowRoot.querySelector('.close-button');
        this.addOnclickWrappedElement()
        this.addCloseOpenMenu();

    }

    addOnclickWrappedElement(){
        this.wrappedElement.setAttribute('onclick', `WaitnigCircleWrapper.openModalWithContent('${this.wrappedElementSubtype}')`)
    }


    // static openModalWithContent(elementType, elementSubtype) {
    //     let content = null;
    //     let modal = document.createElement('killable-modal');
    //     content = new CodePresentationCustomWebElement(WaitngCircleDetailsDB.getDetailsAbout(elementSubtype))
    //     modal.insertElementToKillableModal(content);
    //     document.querySelector('body').appendChild(modal)
    // }

    static openModalWithContent(elementSubtype){
        let modal = document.createElement('killable-modal');
        let content = new CodePresentationCustomWebElement(WaitngCircleDetailsDB.getDetailsAbout(elementSubtype))
        console.log(elementSubtype)
        modal.insertElementToKillableModal(content);
        document.querySelector('body').appendChild(modal)
    }

    addEvents(){
        this.sizeChoser.addEventListener('click', this.setSize.bind(this))
        this.colorChoser.addEventListener('click', this.setColorTheme.bind(this))
    }

    setSize() {
        let size = this.sizeChoser.getAttribute('data-position');
        this.wrappedElement.setAttribute('data-size', size)
        this.context.changePresenterElementSize(size)
    }


    getElementSpecyficStyling(){
        return`
            <styling>

            </styling>
        `
    }
    getElementSpecyficTemplate(id){
        return `
        <waiting-circle id = "${id}" data-element-subtype = '${this.wrappedElementSubtype}' data-color-theme = 'blue' data-size = 'small'></waiting-circle>
        `
    }

    getMenuContentAsStirng(){
        return `
            <multi-switch id="colorChoserId" data-label-set="blue,green,gray,red"></multi-switch>
            <multi-switch id="sizeChoserId" data-label-set="small,medium,big"></multi-switch>
        `
    }


}