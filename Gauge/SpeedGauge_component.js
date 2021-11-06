class SpeedGaugeComponent extends DegreeGaugeComponent{
    constructor(){
        super()
    }
    settings(){
        return {

        }
    }
}

window.customElements.define('speed-gauge', SpeedGaugeComponent);