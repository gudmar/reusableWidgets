class SvgArcManager extends ArcDrawer {
    constructor(context, dimensionSettings, styleSettings, constraints){
        super();
        let mandatoryDimansions = ['centerX', 'centerY', 'radius', 'radiusLargeCircle', 'radiusSmalCircle', 'radiusEventCircle']
        let mandatoryStyles = ['circleStroke', 'fill', 'arcStrokeWidth', 'eventCircleStrokeWidth', 'colorAlert', 'colorInfo', 'colorWarn']
        let mandatoryConstraints = ['minAlertValue', 'minWarnValue', 'minValue', 'maxValue']
        let listOfNotPassedParameters = [];
        listOfNotPassedParameters = [...listOfNotPassedParameters, ...this.getListOfNotPassedMandatoryParameters(dimensionSettings, mandatoryDimansions)];
        listOfNotPassedParameters = [...listOfNotPassedParameters, ...this.getListOfNotPassedMandatoryParameters(styleSettings, mandatoryStyles)];
        listOfNotPassedParameters = [...listOfNotPassedParameters, ...this.getListOfNotPassedMandatoryParameters(constraints, mandatoryConstraints)];
        
        if (listOfNotPassedParameters.length > 0) throw new Error(`${this.constructor.name}: fields ${listOfNotPassedParameters} are not passed.`)

        this.context = context;
        this.dimensions = dimensionSettings;
        this.styles = styleSettings;
        this.constraints = constraints;

        this.arcAngle = 50; // Get this as arg in drawing function
        this.svgElement = null; // just for now
        this.svgArcId = 'someArcId';

        this.value = null; // transfered via drawArc 
        this.managedElement = null;
    }

    placeManagedObject(value){
        let startAngle = 0;
        let endAngle = this.valueToAngle_overwritable(this.recalculateRegardingConstraints(value));
        this.managedElement = this.getArcElement(
            this.dimensions['radius'], 
            {x: this.dimensions['centerX'], y: this.dimensions['centerY']}, 
            0,
            endAngle,
            this.styles['width'],
            this.getAlertWarnInfoColor(),
            this.svgArcId
        )
        this.context.shadowRoot.querySelector('.svg-holder').appendChild(this.managedElement)
    }

    valueToAngle_overwritable(value) {
        return value
    }

    getAlertWarnInfoColor(){
        if (this.value > this.constraints['minAlertValue']) return this.styles['colorAlert'];
        if (this.value > this.constraints['minWarnValue'])  return this.styles['colorWarn'];
        return this.styles['colorInfo']
    }

    recalculateRegardingConstraints(value){
        if (value < this.constraints['minValue']) return this.constraints['minValue']
        if (value > this.constraints['maxValue']) return this.constraints['maxValue']
        return value;
    }



    alterSVGPath(endPoint) {


        let  arc = this.shadowRoot.querySelector(`${this.svgArcId}`)
        let angle = this.calculateCartesian2Angle({ x: 100, y: 0 }, { x: 100, y: 100 }, { x: endPoint.x, y: endPoint.y })
        let value = this.angle2value(angle);
        let setSvgPath = function(_endPoint){
            let newPathString = this.describeArc(widgetMiddle, this.dimensions.rArc, 0, _endPoint)
            arc.setAttributeNS(null, 'd', newPathString)
            this.value = value
            this.arcAngle = angle;            
        }.bind(this)
        if ((value >= this.settings.minValue) && (value <= this.settings.maxValue)) {
            let _endPoint = this.calculateCartesian2Angle({ x: 100, y: 0 }, { x: 100, y: 100 }, endPoint)
            setSvgPath(_endPoint);
            return null;
        }
        if (value < this.settings.minValue) {
            setSvgPath(this.value2angle(this.settings.minValue))
            this.value = this.settings.minValue;
            this.arcAngle = this.value2angle(this.settings.minValue)
        } 
        {
            arc.setAttributeNS(null, 'd', this.describeArc(100, 100, this.dimentions.rArc, 0, this.value2angle(this.settings.maxValue)))
            setSvgPath(this.value2angle(this.settings.maxValue))
            this.value = this.settings.maxValue;
            this.arcAngle = this.value2angle(this.settings.maxValue)
        }
        this.setStrokeColor();
    }

    getListOfNotPassedMandatoryParameters(objectToCheck, listOfMandatoryFields){
        let keys = Object.keys(objectToCheck);
        let notPassedFields = [];
        listOfMandatoryFields.forEach(element => {if (keys.indexOf(element) == -1) notPassedFields.push(element)});
        return notPassedFields;
    }
}