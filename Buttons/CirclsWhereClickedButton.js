class CircleWhereClickedButton extends CustomButtonGeneral{

    constructor(context){
        super(context);
        this.context = context
        this.wasClickEventTriggered = false;
    }

    startButton({buttonType, labelFromAttrib, colorTheme, isActive, onclick}){
        let getShorterLabel = labelFromAttrib;
        let labelToDisplay = this.getShorterLabelIfLabelTooLong(labelFromAttrib);
        // this.button.addEventListener('click', this.animateOnClick.bind(this))
        this.CIRCLE_CLASS = 'circle'
        this.addStringContentToShadowRoot(this._getTemplate())
        this.button = this.context.shadowRoot.querySelector('.button')
        this.addOnclickAnimation();
        this.setButtonType(buttonType);
        this.setButtonLabel(labelFromAttrib)
        this.addTooltipEvents();
        // this.changeOnclickFunction(onclick)
    }

    stopButton(){
        this.removeTooltipEvents();
        this.emptyShadowRoot();
        this.removeOnclickAnimation();
    }

    setButtonToInactiveState(){
        this.changeButtonColorThemeClass('inactive')
        this.removeOnclickAnimation()
    }

    setButtonToActiveState({colorTheme}){
        this.changeButtonColorThemeClass(colorTheme)
        this.addOnclickAnimation();
    }

    setButtonToActiveUnactiveState(value){
        if (!value) {
            {this.changeButtonColorThemeClass('inactive')}
            this.context.button.classList.remove(this.buttonType)
            this.removeOnclickAnimation()
        }
        else {
            this.changeButtonColorThemeClass(this.state['colorTheme'])
            this.button.classList.add(this.state.buttonType)
            this.addOnclickAnimation();
        }
    }

    addOnclickAnimation(){
        this.animateOnclickFunctoinInstance = this.animateOnClick.bind(this)
        this.button.addEventListener('mousedown', this.animateOnclickFunctoinInstance)
    }

    removeOnclickAnimation(){
        this.button.removeEventListener('click', this.animateOnclickFunctoinInstance)
    }

    animateOnClick(event){
        if (this.wasClickEventTriggered) return false;
        this.wasClickEventTriggered = true;
        this.drawACircleInsideElement(event)
    }


    drawACircleInsideElement(event){
        let mouseCords = this.getClickPointInElementRelativeToButton(event)
        let createAndPlaceCircleInsideButton_returnCircle = function(){
            let circle = document.createElement('div');
            circle.classList.add(this.CIRCLE_CLASS);
            this.button.appendChild(circle);
            circle.style.left = mouseCords.x + 'px';
            circle.style.top = mouseCords.y + 'px';    
            return circle;
        }.bind(this)
        let createPlaceLabelToCircle_returnLabel = function (){
            let label = document.createElement('span');
            label.innerText = this.button.querySelector('span').innerText;
            circle.appendChild(label);    
            return label
        }.bind(this)
        let calculateMaxCircleRadius = function(){
            let {width, height} = this.getElementsSize(this.button)
            let sumOfPowers = Math.pow(width, 2) + Math.pow(height, 2);
            return 2 * Math.sqrt(sumOfPowers)
        }.bind(this)

        let circle = createAndPlaceCircleInsideButton_returnCircle();
        let label = createPlaceLabelToCircle_returnLabel();
        this.growCircleAndDestroyIt(circle, calculateMaxCircleRadius(), this.getElementPosition(label));
    }

    growCircleAndDestroyIt(circleElement, maxRadius){
        this.setElementInlineSize(circleElement, {width: 0, height: 0})
        let circleInnerText = circleElement.querySelector('span');
        let clickPoint = this.getElementPositionRelativeToTargetElement(circleElement, this.button)
        let circleMiddlePosition = {
            x: parseFloat(circleElement.style.left),
            y: parseFloat(circleElement.style.top)
        }
        let labelPosition = this.claculateLabelPositionInCircleElement(circleMiddlePosition);
        this.setElementPosition(circleInnerText, labelPosition) 
        let interval = setInterval(() => {
            this.setElementInlineSize(circleElement, {
                width: parseFloat(circleElement.style.width) + 4, 
                height: parseFloat(circleElement.style.height) + 4
            })
            this.setElementPosition(circleInnerText, {
                x: parseFloat(circleInnerText.style.left) + 2 + 'px',
                y: parseFloat(circleInnerText.style.top) + 2 + 'px'
            })
            if (parseFloat(circleElement.style.width) > maxRadius) {
                clearInterval(interval);
                circleElement.remove();
                this.wasClickEventTriggered = false;
            }
        }, 1)
    }

    getElementPositionRelativeToTargetElement(queredElement, referenceElement){
        let referenceElementCords = this.substractCordinates(
            this.getElementsPositionRelativeToPage(queredElement), 
            this.getElementsPositionRelativeToPage(referenceElement)
        );
        let queredElementChords = this.substractCordinates(
            this.getElementsPositionRelativeToPage(queredElement), 
            this.getElementsPositionRelativeToPage(referenceElement)
        );
        return {x: queredElementChords.x - referenceElementCords.x, y: queredElementChords.y - referenceElementCords.y}       
    }

    getElementsPositionRelativeToPage(element){
        let {left, top} = this.getElementPosition(element)
        return {
            x: parseFloat(window.scrollX) + left,
            y: parseFloat(window.scrollY) + top
        }
    }


    getClickPointInElementRelativeToButton(event){
        let clickedPositionRelativePage =  {x: event.pageX, y: event.pageY}
        let buttonPositionRelativePage = this.getElementPosition(this.button)
        return this.substractCordinates(clickedPositionRelativePage, buttonPositionRelativePage)
    }

    claculateLabelPositionInCircleElement(circleMiddlePosition){
        let positionOfMouseClick = circleMiddlePosition
        let parentLabelCords = this.getLabelPositionRelativeToParent()
        let circleLabelPosition = this.substractCordinates( parentLabelCords, positionOfMouseClick);
        return circleLabelPosition
    }

    getLabelPositionRelativeToParent(){
        let labelPosition = this.getElementPosition(this.button.querySelector('span'));
        let buttonPosition = this.getElementPosition(this.button)
        return this.substractCordinates(labelPosition, buttonPosition)
    }

    substractCordinates(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        }
    }

    getElementPosition(element) {
        let descriptor = element.getBoundingClientRect();
        return {
            x: parseFloat(descriptor.left),
            y: parseFloat(descriptor.top)
        }
    }

    getElementsSize(element) {
        let {width: widthAsString, height: heightAsString} = element.getBoundingClientRect();
        return {
            width: parseFloat(widthAsString),
            height: parseFloat(heightAsString)
        }
    }

    setElementInlineSize(element, {width, height}){
        element.style.width = parseFloat(width) + 'px';
        element.style.height = parseFloat(height) + 'px';
    }

    setElementPosition(element, {x, y}) {
        element.style.left = parseFloat(x) + 'px';
        element.style.top = parseFloat(y) + 'px';
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
