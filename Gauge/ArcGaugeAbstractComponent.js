class ArcGaugeAbstractComponent extends HTMLElement {
    constructor(){
        super();
        this.addShadow();
        this.widgetRadius = 90;
        this.svgCreator = new SvgArcManager(this, this.getSettingDimentions(), this.getSettingStyle(), this.getConstraints())
        this.currentValue = 190;

        this.arcAngle = this.getArcAngle();

        
    }

    static get observedAttributes() {
        return ['data-value']
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

    }

    connectedCallback() {
        this.svgCreator.placeManagedObject(50);
        this.resetStyle();
    }

    getConstraints(){
        return {
            minAlertValue : 250, 
            minWarnValue: 150,
            minValue: 10, 
            maxValue: 330
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
            background-color: purple;
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
            background-color: yellow;
            text-align: center;
        }
        .unit{
            position: relative;
            width: 100%;
            height: 1rem;
            font-size: ${fontSizes.unitFontSize};
            background-color: red;
            text-align: center;
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
                        <div class = "unit"></div>
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
}

window.customElements.define('degree-gauge', ArcGaugeAbstractComponent)