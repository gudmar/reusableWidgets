class SvgArcManager extends ArcDrawer {
    constructor(context, dimensionSettings, styleSettings, constraints){
        super();
        let mandatoryDimansions = ['centerX', 'centerY', 'radius', 'radiusLargeCircle', 'radiusSmalCircle', 'radiusEventCircle']
        let mandatoryStyles = ['circleStroke', 'fill', 'arcStrokeWidth', 'eventCircleStrokeWidth', 'colorAlert', 'colorInfo', 'colorWarn']
        let mandatoryConstraints = ['minAlertValue', 'minWarnValue', 'minValue', 'maxValue', 'unit']
        let listOfNotPassedParameters = [];
        listOfNotPassedParameters = [...listOfNotPassedParameters, ...this.getListOfNotPassedMandatoryParameters(dimensionSettings, mandatoryDimansions)];
        listOfNotPassedParameters = [...listOfNotPassedParameters, ...this.getListOfNotPassedMandatoryParameters(styleSettings, mandatoryStyles)];
        listOfNotPassedParameters = [...listOfNotPassedParameters, ...this.getListOfNotPassedMandatoryParameters(constraints, mandatoryConstraints)];
        
        if (listOfNotPassedParameters.length > 0) throw new Error(`${this.constructor.name}: fields ${listOfNotPassedParameters} are not passed.`)

        this.context = context;
        this.dimensions = dimensionSettings;
        this.styles = styleSettings;
        this.constraints = constraints;

        this.arcAngle = 150; // Get this as arg in drawing function
        this.svgElement = null; // just for now
        this.svgArcId = 'someArcId';

        this.value = null; // transfered via drawArc 
        this.managedElement = null;

        this.mouseMoveEventEnabled = false;
        this.nrOfDititsToApproximation = 0;
    }

    placeManagedObject(value){
        let startAngle = 0;
        let endAngle = this.valueToAngle_overwritable(this.recalculateRegardingConstraints(value));
        if (endAngle == undefined) endAngle = 0;
        this.managedElement = this.getArcElement(
            this.dimensions['radius'], 
            {x: this.dimensions['centerX'], y: this.dimensions['centerY']}, 
            0,
            endAngle,
            this.styles['width'],
            this.getAlertWarnInfoColor(),
            this.svgArcId
        )
        this.context.shadowRoot.querySelector('.svg-holder').appendChild(this.managedElement);
        this.createSurroundingWheels();
        this.createEventWheel();
        this.addOnEvenCircleClickEvent();
        this.addEventSVG();
    }

    addEventSVG(){
        let f = function(e) {console.log(e.target)}
        this.managedElement.addEventListener('click', f)
    }

    changeApproximation(nrOfDititsToApproximation){
        this.nrOfDititsToApproximation = nrOfDititsToApproximation;
        this.previousBoxValue = this.approximate(this.previousBoxValue);
        this.fullValueBoxContent = this.approximate(this.fullValueBoxContent);
    }

    addOnEvenCircleClickEvent(){
        let dispatchArcChangeEvent = function(value){
            let event = new CustomEvent('arcValueChanged', {
                detail: {newValue: this.approximate(value)}
            })
            this.context.dispatchEvent(event)
        }.bind(this)
        let mouseEventOnArc = function(e){
            let newPoint = this.xy2svg({x: e.clientX, y: e.clientY}, this.managedElement);
            this.alterArcPointInput(newPoint)
            dispatchArcChangeEvent(this.endPointToValue(newPoint))
        }.bind(this)
        let mouseMoveEventOnArc = function(e) {if (this.mouseMoveEventEnabled) {mouseEventOnArc(e)}}.bind(this)
        let unlockMouseMoveEvent = function(e) {this.mouseMoveEventEnabled = true}.bind(this)
        let lockMouseMoveEvent = function(e) {this.mouseMoveEventEnabled = false}.bind(this)
        this.eventWheel.addEventListener('click', mouseEventOnArc)
        this.eventWheel.addEventListener('mousedown', unlockMouseMoveEvent)
        document.querySelector('body').addEventListener('mouseup', lockMouseMoveEvent)
        this.eventWheel.addEventListener('mousemove', mouseMoveEventOnArc)
    }

    alterArcPointInput(endPoint){
        this.alterArc(this.endPointToValue(endPoint))
    }

    endPointToValue(endPoint){
        let angle = this.calculateCartesian2Angle(this.managedElement, {x:this.dimensions.centerX, y:0}, {x: this.dimensions.centerX, y: this.dimensions.centerY}, endPoint)        
        return this.angle2value(angle);
    }


    alterArc(value){
        this.value = value;
        this.managedElement.querySelector(`#${this.svgArcId}`).setAttribute('stroke', this.getAlertWarnInfoColor());
        this.setArcAngle(this.valueToAngle_overwritable(this.value))
    }

    angle2value(angle) {return this.context.angle2value_overwritable(angle)}

    valueToAngle_overwritable(value) {
        return this.context.valueToAngle_overwritable(value)
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


    setArcAngle(endAngle){
        let path = this.getArcAsString(this.dimensions['centerX'], this.dimensions['centerY'], this.dimensions['radius'], 0, endAngle)
        this.managedElement.querySelector(`#${this.svgArcId}`).setAttributeNS(null, 'd', path)
    }

    createSurroundingWheels(){
        let createCircle = function(radius){
            return this.createCircle(radius, this.styles['circleStroke'], 1)
        }.bind(this)
        this.managedElement.appendChild(createCircle(this.dimensions.radius - this.styles.arcStrokeWidth / 2))
        this.managedElement.appendChild(createCircle(this.dimensions.radius + this.styles.arcStrokeWidth / 2))
    }

    createEventWheel(){
        let createCircle = function(radius) {
            let circle = this.createCircle(radius, 'transparent', this.styles['arcStrokeWidth']);
            circle.setAttribute('class', 'circle-hoverable');
            return circle
        }.bind(this)
        this.eventWheel = createCircle(this.dimensions.radius )
        this.managedElement.appendChild(this.eventWheel)
    }

    createCircle(radius, stroke, width){
        let circle = this.createElementNS('circle');
        let listOfAttributes = {
            'cx': this.dimensions['centerX'],
            'cy': this.dimensions['centerY'],
            'r' : radius,
            'stroke': stroke,
            'fill': 'none',
            'stroke-opacity': 1,
            'stroke-width': width,
        }
        this.setAttributesFromObject(circle, listOfAttributes);
        return circle;
    }


    getListOfNotPassedMandatoryParameters(objectToCheck, listOfMandatoryFields){
        let keys = Object.keys(objectToCheck);
        let notPassedFields = [];
        listOfMandatoryFields.forEach(element => {if (keys.indexOf(element) == -1) notPassedFields.push(element)});
        return notPassedFields;
    }

    approximate(value, nrOfDitits = this.nrOfDititsToApproximation){
        let multiplier = Math.pow(10, nrOfDitits);
        return Math.round(value * multiplier) / multiplier
    }
}