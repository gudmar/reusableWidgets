class DegreeGaugeComponent extends HTMLElement {
    constructor(){
        super();
        let nrOfDigitsDisplayedInValueBox = 3;
        this.addShadow();
        this.widgetRadius = 90;
        this.svgCreator = new SvgArcManager(this, this.getSettingDimentions(), this.getSettingStyle(), this.getConstraints())
        this.textBoxManager = new ValueTextboxContentManager(this.shadowRoot.querySelector('.value-input'), nrOfDigitsDisplayedInValueBox, 
                this.getConstraints().minValue, this.getConstraints().maxValue);
        this.currentValue = 190;
        this.nrOfDititsForApptoximation = 0;
        this.arcAngle = this.getArcAngle();  
        this.svgCreator.placeManagedObject(this.getCurrentValue());
    }

    static get observedAttributes() {
        return ['data-value', 'data-label', 'data-approximate']
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName == 'data-label') this.setLabel(newVal)
        if (attrName == 'data-approximate') this.changeApproximation(newVal)
        if (attrName == 'data-value') {
            if (oldVal != newVal) {
                this.updateArc(newVal);
                this.updateLabel(newVal);
                this.emitEventOnValueChange(newVal);
            }
        }

    }

    emitEventOnValueChange(value){
        let event = new Event('gauge-changed-value', {
            detail: {
                newValue: value
            }
        })
        this.dispatchEvent(event);
    }

    getCurrentValue() {
        let fromAttrib = this.approximate(this.getAttribute('data-value'));
        return isNaN(fromAttrib) ? this.currentValue : fromAttrib;
    }

    setLabel(newLabel){
        this.shadowRoot.querySelector('.label-holder').innerText = newLabel;
    }

    changeApproximation(value){
        this.nrOfDititsForApptoximation = value;
        this.svgCreator.changeApproximation(value)
        this.textBoxManager.changeApproximation(value)
    }

    connectedCallback() {
        this.setInitialValue();
        this.textBoxManager.setValue(this.getCurrentValue())
        this.textBoxManager.addEventsToManagedBox();

        
        this.resetStyle();
        this.addEventListeners();
    }

    setInitialValue(){
        let valueFromDataAttribute = this.getCurrentValue();//this.getAttribute('data-value');
        if (!this.textBoxManager.validateValue(valueFromDataAttribute)) {
            this.setAttribute('data-value', this.approximate(this.getConstraints().minValue))
        }
        else {
            this.setAttribute('data-value', this.approximate(valueFromDataAttribute))
        }
    }

    addEventListeners(){
        this.shadowRoot.querySelector('.value-input').addEventListener('valueTextBoxChanged', this.updateDataValueAttribute.bind(this))
        this.addEventListener('arcValueChanged', this.updateDataValueAttribute.bind(this))
    }

    updateDataValueAttribute(e){
        let oldValue = this.getAttribute('data-value');
        let newValue = e.detail['newValue']
        if (oldValue != newValue){
            this.setAttribute('data-value', e.detail['newValue'])
            this.updateArc(newValue)
            this.updateLabel(newValue)
        }
    }

    updateArc(value){
        this.svgCreator.alterArc(value)
    }
    updateLabel(value){
        this.textBoxManager.setValue(value)
    }

    getConstraints(){
        return {
            minAlertValue : 250, 
            minWarnValue: 150,
            minValue: 1, 
            maxValue: 360,
            unit: 'deg'
        }
    }

    
    getSettingDimentions(){
        return {
            centerX: this.widgetRadius/2,
            centerY: this.widgetRadius/2,
            radius: this.widgetRadius/2 - (parseInt(this.getSettingStyle()['arcStrokeWidth'], 10) / 2),
            radiusLargeCircle: this.widgetRadius/2 + this.getSettingStyle()['arcStrokeWidth']/2,
            radiusSmalCircle: this.widgetRadius/2 - this.getSettingStyle()['arcStrokeWidth']/2,
            radiusEventCircle: this.widgetRadius/2 - (parseInt(this.getSettingStyle()['arcStrokeWidth'], 10) / 2)
        }
    }

    getSettingStyle(){
        return {
            colorAlert: "red",
            colorWarn:  "orange",
            colorInfo:  "green",
            circleStroke: "black",
            arcStroke: "black",
            fill: "none",
            arcStrokeWidth: 10,
            eventCircleStrokeWidth: 30
        }
    }

    angle2value_overwritable(angle) {return ((angle/360) * (this.getConstraints().maxValue))}


    valueToAngle_overwritable(value) {
        return (value / this.getConstraints().maxValue) * 360;
    }

    getArcAngle(){ return (this.currentValue / this.getConstraints().maxValue) *360 }

    stringOrBooleanToBoolean(val){
        return val == 'true' || val == true ? true : false
    }


    addShadow(){
        let template = document.createElement('template');
        template.innerHTML = this._getTemplate();
        let sh = this.attachShadow({mode:'open'});
        sh.appendChild(template.content.cloneNode(true))
    }

    resetStyle(){
        let fontSizes = {valueFontSize: '220%', unitFontSize: '100%', labelFontSize: '100%'};
        if (this.widgetRadius < 120) fontSizes = {valueFontSize: '180%', unitFontSize: '100%', labelFontSize: '100%'};
        if (this.widgetRadius < 95) fontSizes = {valueFontSize: '150%', unitFontSize: '100%', labelFontSize: '100%'};
        this.shadowRoot.querySelector('#widget_style').remove();
        this.shadowRoot.appendChild(this.stringToElement(this._getStyle(fontSizes)))
    }

    _getStyle(fontSizes = {valueFontSize: '220%', unitFontSize: '100%', labelFontSize: '100%'}){
        let calculateValueInputHeight = function(){
            let valueFontSizeFactor = parseFloat(fontSizes.valueFontSize)
            return Math.floor(valueFontSizeFactor*1.3 / 10) / 10;
        }
        return `
        <style id = "widget_style">
        .svg-holder{
            position: relative;
            
        }
        .wrapper{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-items: center;
            align-items: center;
        }
        .center{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .value-holder{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50%;
            height: 50%;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            display: flex;

            flex-direction: column;
            justify-items: center;
            font-family: Arial;
        }
        .value-input{
            position: relative;
            height: ${calculateValueInputHeight()}rem;
            width: 100%;
            font-size: ${fontSizes.valueFontSize};
            text-align: center;
        }
        .unit{
            position: relative;
            width: 100%;
            height: 1rem;
            font-size: ${fontSizes.unitFontSize};
            text-align: center;
        }
        .editable-content{
            width: 100%;
            text-align: center;
            line-height: ${calculateValueInputHeight()}rem;
            font-size: ${fontSizes.valueFontSize};
            background-color: white;
            color: black;
            border: none;
            outline: none;
        }
        .full-value-tooltip{
            background-color: beige;
            color: black;
            padding: 4px;
            border-radius: 5px;
            position: absolute;
            z-index: 100;
        }
        .label-holder{
            font-family: Arial;
            font-size: ${fontSizes.labelFontSize};
            cursor: pointer;
        }
        .circle-hoverable:hover{
            cursor: pointer;
        }
        .input-not-valid{
            background-color: rgba(255, 0, 0, 0.7);
        }
    </style>
        `
    }

    _getTemplate(){
        return `
            ${this._getStyle()}
            <div class = "wrapper">
                <div class = "svg-holder">
                    <div class = "value-holder center">
                        <div class = "value-input" contenteditable></div>
                        <div class = "unit">${this.getConstraints().unit}</div>
                    </div>
                </div>
                <div class = "label-holder"></div>
            </div>
        
        `
    }

    stringToElement(htmlString){
        let template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.cloneNode(true)
    }

    approximate(value, nrOfDitits = this.nrOfDititsForApptoximation){
        let multiplier = Math.pow(10, nrOfDitits);
        return Math.round(parseFloat(value) * multiplier) / multiplier
    }
}

window.customElements.define('degree-gauge', DegreeGaugeComponent)