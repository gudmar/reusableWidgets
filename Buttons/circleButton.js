class CircleButton extends AbstractButton{

    constructor(){
        super();
        this.button = this.shadowRoot.querySelector('.button')
        this.wasClickEventTriggered = false;
    }

    connectedCallback(){
        this.button.addEventListener('click', this.animateOnClick.bind(this))
    }

    animateOnClick(event){

        if (this.wasClickEventTriggered) return false;
        this.wasClickEventTriggered = true;
        this.drawACircleInsideElement(event)
    }

    getElementsPositionRelativeToPage(element){
        let elementRelatedValues = element.getBoundingClientRect();
        let _x = parseFloat(window.scrollX) + parseFloat(elementRelatedValues.left);
        let _y = parseFloat(window.scrollY) + parseFloat(elementRelatedValues.top);
        return {x: _x, y: _y}
    }

    substractCord(a, b) {
        return {x: a.x-b.x, y: a.y - b.y}
    }


    getClickPointInElementRelativeToButton(event){
        let hostingElementsCoords = this.getElementPosition(this.button)
        return {x: event.pageX - hostingElementsCoords.x, y: event.pageY - hostingElementsCoords.y}
    }

    getElementPositionRelativeToTargetElement(srcElement, targetElement){
        let targetElementCords = this.substractCord(this.getElementsPositionRelativeToPage(srcElement), this.getElementsPositionRelativeToPage(targetElement));
        let srcElementChords = this.substractCord(this.getElementsPositionRelativeToPage(srcElement), this.getElementsPositionRelativeToPage(targetElement));
        return {x: srcElementChords.x - targetElementCords.x, y: srcElementChords.y - targetElementCords.y}       
    }


    getElementPosition(element) {
        let descriptor = element.getBoundingClientRect();
        return {x: descriptor.left, y: descriptor.top}
    }

    setElementPosition(element, {x, y}) {
        element.style.left = parseFloat(x) + 'px';
        element.style.top = parseFloat(y) + 'px';
    }

    drawACircleInsideElement(event){
        let targetElement = this.button;
        let circle = document.createElement('div');
        let label = document.createElement('span');
        
        label.innerText = targetElement.querySelector('span').innerText;
        circle.appendChild(label);
        let mouseCords = this.getClickPointInElementRelativeToButton(event)
        let calculateCircleRadius = function(){
            let circleParentDescriptor = targetElement.getBoundingClientRect();
            let width = parseFloat(circleParentDescriptor.width);
            let height = parseFloat(circleParentDescriptor.height);
            let maxWidthHeight = Math.max(width, height)
            let sumOfPowers = 2* Math.pow(maxWidthHeight, 2);
            return width + height;
            return Math.sqrt(sumOfPowers)
        }
        let parentLabelCords = targetElement.tex
        circle.classList = 'circle'
        targetElement.appendChild(circle);
        circle.style.left = mouseCords.x + 'px';
        circle.style.top = mouseCords.y + 'px';
        this.growCircleAndDestroyIt(circle, calculateCircleRadius(), this.getElementPosition(label));
    }

    getClickPointInElementRelativeToButton(event){
        let clickedPositionRelativePage =  {x: event.pageX, y: event.pageY}
        let buttonPositionRelativePage = {x: this.button.getBoundingClientRect().left, y: this.button.getBoundingClientRect().top}
        return this.substractCord(clickedPositionRelativePage, buttonPositionRelativePage)
    }

    claculateLabelPositionInCircleElement(circleMiddlePosition){
        let positionOfMouseClick = circleMiddlePosition
        let parentLabelCords = this.getLabelPositionRelativeToParent()
        let circleLabelPosition = this.substractCord( parentLabelCords, positionOfMouseClick);
        return circleLabelPosition
    }
    getLabelPositionRelativeToParent(){
        let labelDimentions = this.button.querySelector('span').getBoundingClientRect();
        let labelPosition = {x: labelDimentions.left, y: labelDimentions.top}
        let buttonDimention = this.button.getBoundingClientRect();
        let buttonPosition = {x: buttonDimention.left, y: buttonDimention.top}
        return this.substractCord(labelPosition, buttonPosition)
    }

    growCircleAndDestroyIt(circleElement, maxRadius){
        circleElement.style.width = 0;
        circleElement.style.height = 0;
        let circleInnerText = circleElement.querySelector('span');
        let clickPoint = this.getElementPositionRelativeToTargetElement(circleElement, this.button)
        let circleMiddlePosition = {
            x: parseFloat(circleElement.style.left),
            y: parseFloat(circleElement.style.top)
        }
        let labelPosition = this.claculateLabelPositionInCircleElement(circleMiddlePosition);
        circleInnerText.style.left = labelPosition.x + 'px';
        circleInnerText.style.top = labelPosition.y + 'px';       

        let interval = setInterval(() => {
            
            circleElement.style.width = parseFloat(circleElement.style.width) + 1 + 'px';
            circleElement.style.height = parseFloat(circleElement.style.height) + 1 + 'px';
            circleInnerText.style.left = parseFloat(circleInnerText.style.left) + 0.5 + 'px';
            circleInnerText.style.top = parseFloat(circleInnerText.style.top) + 0.5 + 'px';
            if (parseFloat(circleElement.style.width) > maxRadius) {
                clearInterval(interval);
                circleElement.remove();
                this.wasClickEventTriggered = false;
            }
        }, 5)

    }



    _getTemplate(){
        return `
            <style>
            *{
                position: relative;
            }
            .button-wrapper{
                display: inline-block
            }
            .button-big{
                --button-font-size: 1.5rem;
                --button-padding: 10px;
            }
            .button-small{
                --button-font-size: 1rem;
                --button-padding: 5px;
            }
            .circle {
                position: absolute;
                border-radius: 50%;
                width: 0;
                height: 0;
                background-color: var(--button-fg);
                transform: translate(-50%, -50%);
                overflow: hidden;
            }
            .circle>span{
                color: var(--button-bg);
                position: absolute;
            }

            .color-theme-blue{
                --button-bg: blue;
                --button-fg: white;
                --button-hover-bg: rgb(120, 120, 255);
                --button-hover-fg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }

            .color-theme-green{
                --button-bg: GreenYellow;
                --button-fg: DarkGreen;
                --button-hover-bg: DarkGreen;
                --button-hover-fg: GreenYellow;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: DarkGreen;
            }
            .color-theme-red{
                --button-bg: rgb(220, 0, 0);
                --button-fg: white;
                --button-hover-bg: rgb(150, 0, 0);
                --button-hover-fg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }
            .color-theme-inactive{
                --button-bg: gray;
                --button-fg: DarkGray;
                --button-hover-bg: gray;
                --button-hover-fg: DarkGray;
                --button-active-bg: gray;
                --button-active-fg: DarkGray; 
                --button-border-color: rgba(0, 0, 0, 0);
            }

            .button{
                display: flex;
                justify-content: center;
                align-items: center;
                display: flex;
                overflow: hidden;
                text-align: center;
                color: var(--button-fg);
                background-color: var(--button-bg);
                font-family: Arial;
                border: solid thin var(--button-border-color);
                border-radius: 5px;
                padding: var(--button-padding);
                transition: 0.2s;
            }

            .color-theme-inactive:hover{
                cursor: not-allowed;
            }

            .tooltip {
                position: absolute;
                background: white;
                color: black;
                border-radius: 5px;
                padding: 5px;
                max-width: 100px;
                line-break: anywhere;
                z-index: 70;
            }



            .sample-button:hover {
                cursor: pointer;
                background-color: var(--button-hover-bg);
                color: var(--button-hover-fg);
                transition: 0.2s;
            }

            .sample-button:active {
                background-color: var(--button-active-bg);
                color: var(--button-active-fg);
            }


            .circle-button{

            }

            .circle-button:hover{
                
            }
            .circle-button:active{
                
            }
            .circle>span {
                position: absolute;
            }

            
            </style>
            <div class = "button-wrapper">
                <div class="button color-theme-blue position-right-top button-big" >
                    <span>
                    </span>
                </div>
            </div>
        `
    }

}

window.customElements.define('circle-button', CircleButton)
