class LineGalugeWrapper extends PresenterMethodProvider{
    constructor(context){
        super(context);
        this.context = context;
        this.addWrappedElement('wrapped-element-id');
        this.addMenuToContext();
        this.wrappedElement = this.context.shadowRoot.querySelector('#wrapped-element-id')
        this.acitivatingSwitch = this.context.shadowRoot.querySelector('#acitveButtonSwitchId')
        this.colorChoser = this.context.shadowRoot.querySelector('#colorChoserId')
        this.optionsMenu = this.context.shadowRoot.querySelector('.options');
        this.optionsMenuCloseButton = this.context.shadowRoot.querySelector('.close-button');
        this.addCloseOpenMenu();
        // this.sizeChoser = this.shadowRoot.querySelector('#sizeChoserId')


    }

    addEvents(){
        let sizeControllingSlider = this.context.shadowRoot.querySelector('#size-controlling-slider')
        let valueControllingSlider = this.context.shadowRoot.querySelector('#value-controlling-slider')
        this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
        sizeControllingSlider.addEventListener('linear-gauge-changed-value', this.changeWrappedElementWidth.bind(this))
        valueControllingSlider.addEventListener('linear-gauge-changed-value', this.changeWrappedElementValue.bind(this))
        this.wrappedElement.addEventListener('linear-gauge-changed-value', this.changeTargetElementsValue.bind(this, valueControllingSlider))
        this.colorChoser.addEventListener('click', this.setColorTheme.bind(this))
    }



    getElementSpecyficStyling(){
        return`

        `
    }
    getElementSpecyficTemplate(){
        return `
        <line-gauge id = "wrapped-element-id" data-label = "line-gauge" data-size= "150" data-color-theme = "blue" data-min-val = "30", data-max-val = "100", data-value = "50"></line-gauge>
        `
    }

    getMenuContentAsStirng(){
        return `
            <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
            <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
            <line-gauge id="size-controlling-slider" data-size= "100" data-label="Change size" data-color-theme = "blue", data-min-val = "100", data-max-val = "150", data-value = "140"></line-gauge>
            <line-gauge id="value-controlling-slider" data-size= "100" data-label="Change value" data-color-theme = "blue", data-min-val = "30", data-max-val = "100", data-value = "50"></line-gauge>
        `
    }

}