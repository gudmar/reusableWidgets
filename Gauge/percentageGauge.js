class PercentageGauge extends ArcGaugeAbstractComponent{
    constructor(){
        super()
    }

    getConstraints(){
        return {
            minAlertValue : 80, 
            minWarnValue: 60,
            minValue: 0, 
            maxValue: 100,
            unit: '%'
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

    getArcAngle(){ return (this.currentValue / this.getConstraints().maxValue) * 360 }
    valueToAngle_overwritable(value) {
        return (value / this.getConstraints().maxValue) * 360;
    }
}

window.customElements.define('percentage-gauge', PercentageGauge)