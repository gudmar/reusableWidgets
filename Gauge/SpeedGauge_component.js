class SpeedGaugeComponent extends ArcGaugeAbstractComponent{
    constructor(){
        super()
    }
    settings(){
        return {

        }
    }
}

window.customElements.define('speed-gauge', SpeedGaugeComponent);