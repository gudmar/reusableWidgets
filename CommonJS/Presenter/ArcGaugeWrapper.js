class ArcGaugeWrapper extends PresenterMethodProvider{
    constructor(context, subtype){
        super(context);
        this.elementSubtype = subtype;
        this.context = context;
        this.addWrappedElement('wrapped-element-id');
        this.wrappedElement = this.context.shadowRoot.querySelector('#wrapped-element-id')
        this.context.changePresenterElementSize('big')
    }

    addEvents(){
        let controller = this.context.shadowRoot.querySelector('#wrapped-element-controller-id');
        controller.addEventListener('linear-gauge-changed-value', this.changeWrappedElementValue.bind(this));
        this.wrappedElement.addEventListener('gauge-changed-value', this.changeTargetElementsValue.bind(this, controller))
    }

    getElementSpecyficStyling(){
        return`

        `
    }
    getElementSpecyficTemplate(){
        if (this.elementSubtype == 'degree-gauge'){
            return `
                <degree-gauge id = "wrapped-element-id" data-value="185" data-label = "angle-gauge" data-approximate='1'></degree-gauge>
                <line-gauge id = "wrapped-element-controller-id" data-label = "Gauge controller" data-size= "150" data-color-theme = "blue" data-min-val = "0", data-max-val = "360", data-value = "185"></line-gauge>
            `
        }
        if (this.elementSubtype == 'percentage-gauge'){
            return `
                <percentage-gauge id = "wrapped-element-id" data-value="85" data-label = "percentage-gauge" data-approximate='0'></percentage-gauge>
                <line-gauge id = "wrapped-element-controller-id" data-label = "Gauge controller" data-size= "150" data-color-theme = "blue" data-min-val = "0", data-max-val = "100", data-value = "85"></line-gauge>
            `
        }
        if (this.elementSubtype == 'speed-gauge'){
            return `
                <speed-gauge id = "wrapped-element-id" data-value = "105" data-label = "Speedmeter" data-approximate='0'></speed-gauge>
                <line-gauge id = "wrapped-element-controller-id" data-label = "Gauge controller" data-size= "150" data-color-theme = "blue" data-min-val = "0", data-max-val = "0", data-value = "385"></line-gauge>
            `
        }
    }

    getMenuContentAsStirng(){
        return `
        <div id="colorChoserId" data-label-set="blue,green,red">
            Option stylig is not supported by this component, just this id='colorChoserId' element is significant to avoid error
        </div>
        `
    }
}