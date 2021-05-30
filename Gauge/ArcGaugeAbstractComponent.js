class ArcGaugeAbstractComponent extends HTMLElement {
    constructor(){
        super();
        this.addShadow();
        this.widgetRadius = 60;
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
        this.svgCreator.placeManagedObject(50)
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

    _getTemplate(){
        return `
            <div class = "wrapper">
                <div class = "svg-holder"></div>
                <div class = "value-holder"></div>
                <div class = "label-holder"></div>
            </div>
        
        `
    }
}

window.customElements.define('degree-gauge', ArcGaugeAbstractComponent)