class ArcDrawer {
    constructor(){
        
    }

    getArcElement(radius, positionXY, startAngle, endAngle, width, color, id = this.generateGoodEnoughId()){
        let _radius = radius == undefined ? 100 : radius;
        let {x, y} = positionXY == undefined ? {x: 100, y: 100} : positionXY;
        let _x = x == undefined ? 100 : x;
        let _y = y == undefined ? 100 : y;
        let _width = width == undefined ? 10 : width;
        let _color = color == undefined ? 'black' : color;
        let _startAngle = startAngle == undefined ? 0 : startAngle;
        let _endAngle = endAngle == undefined ? 90 : endAngle;
        return this.createArc(_radius, {x: _x, y: _y}, _startAngle, _endAngle, _width, _color, id)
    }


    createArc(radius, positionXY, startAngle, endAngle, width, color, id){
        let svg = this.createSvg(radius * 2 + width)
        let path = this.createElementNS('path')
        let listOfAttributes = {
            'id': id,
            'd': this.getArcAsString(positionXY['x'], positionXY['y'], radius, startAngle, endAngle),
            'stroke': color,
            'stroke-width': width,
            'stroke-linecap': 'round',
            'fill': 'none'
        }
        this.setAttributesFromObject(path, listOfAttributes)
        svg.appendChild(path)
        return svg;
    }


    getArcAsString(x, y, radius, startAngle, endAngle) {
        let  start = this.polarToCartesian(x, y, radius, endAngle);
        let  end = this.polarToCartesian(x, y, radius, startAngle);
        let  largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        let  d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    calculateCartesian2Angle(svgElement, startPoint, middleOfCirclePoint, endPoint) {
        // THis retuns angle between 2 points
        
        let mP = this.xy2svg(middleOfCirclePoint, svgElement)
        let sP = this.xy2svg(startPoint, svgElement)
        let eP = this.xy2svg(endPoint, svgElement)
        let output = undefined;
        let pS_pM = this.getDistanceBetweenPoints(mP, sP)
        let pE_pM = this.getDistanceBetweenPoints(eP, mP)
        let pE_pS = this.getDistanceBetweenPoints(eP, sP)
        if (sP.x < eP.x) {
            output = Math.acos((pS_pM * pS_pM + pE_pM * pE_pM - pE_pS * pE_pS) / (2 * pS_pM * pE_pM)) * 180 / Math.PI    
        } else {
            output = 360 - Math.acos((pS_pM * pS_pM + pE_pM * pE_pM - pE_pS * pE_pS) / (2 * pS_pM * pE_pM)) * 180 / Math.PI
        }
        if (output == 360) output = 359.999
        return output
    }

    getDistanceBetweenPoints(A, B){
        return Math.sqrt((Math.pow(A.x - B.x, 2) + (Math.pow(A.y - B.y, 2))))
    }

    xy2svg(point, element) {
        // takes a point ({x: , y: }) in normal mouse coordinance and returns point in svg coordinance
        let p = element.createSVGPoint();
        p.x = point.x
        p.y = point.y
        let output = p.matrixTransform(element.getScreenCTM().inverse());
        return output
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    createSvg(size){
        let svg = this.createElementNS('svg')
        let listOfAttributes = {
            'viewBox': `0 0 ${size} ${size}`,
            'width': size,
            'height': size
        }
        this.setAttributesFromObject(svg, listOfAttributes)
        return svg;
    }

    createElementNS(elementType) {
        return document.createElementNS('http://www.w3.org/2000/svg', elementType)
    }

    setAttributesFromObject(targetElement, objectWithAttributes){
        for (let key of Object.keys(objectWithAttributes)){
            targetElement.setAttributeNS(null, key, objectWithAttributes[key])
        }
    }


    generateGoodEnoughId(){
        return Math.random().toString(36).substr(2, 9);
    }
}