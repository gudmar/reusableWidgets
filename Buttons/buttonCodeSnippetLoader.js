class ButtonDetailsDB{
    constructor(){

    }

    static getDetailsAbout(widgetDescriptor){
        let details = ButtonDetailsDB.getButtonSpecificCode(widgetDescriptor);
        // console.log(Object.keys(ButtonDetailsDB.get))
        if (details == undefined) return null;
        let beforeCode = details['codeBefore'] == undefined ? '' : details['codeBefore'];
        let innerCode = details['innerCode'] == undefined ? '' : details['innerCode'];
        let afterCode = details['afterCode'] == undefined ? '' : details['afterCode'];
        return `
            ${beforeCode}
            ${ButtonDetailsDB.getDescriptorWithCommonCode_buttons(innerCode)}
            ${ButtonDetailsDB.getEndingMessage_buttons()}
            ${afterCode}
        `
    }

    static getButtonSpecificCode(key) {
        let dbObject = {
            'sample-button': {
                innerCode: `
                    &:hover {
                        cursor: pointer;
                        background-color: rgb(120, 120, 255);
                        transition: 0.2s;
                    }
                    &:active{
                        background-color: rgb(200, 200, 255);
                        color: black;
                    }`
            },
            'grow-button': {
                innerCode: `
                &:hover {
                    cursor: pointer;
                    transform: scale(1.2);
                    transition: 0.2s;
                }
                &:active{
                    background-color: var(--button-active-bg);
                    transform: scale(0.8);
                    transition: 0.2s;
                }`
            },

            'shrink-button': {
                innerCode: `
                &:hover {
                    cursor: pointer;
                    transform: scale(0.8);
                    transition: 0.2s;
                }
                &:active{
                    background-color: var(--button-active-bg);
                    transform: scale(1);
                    transition: 0.2s;
                }
                `
            },


            'pulse-button': {
                innerCode: `
                #pulse:before {   /* ANTIJITTER */
                    position: absolute;
                    content: "";
                    width: 150%;
                    height: 150%;
                    transform: translate(-50%, -50%);
                }
    
                .pulse-button:hover{
                    cursor: pointer;
                    animation: pulse 1s infinite ease-in;
                }
    
                @keyframes pulse {
                    0%     { transform: scale(1);}
                    25%     { transform: scale(0.9);}
                    50%   { transform: scale(1);}
                    75%   { transform: scale(1.1);}
                    100%   { transform: scale(1);}
                }
                `
            },

            'pulse-grow-button': {
                innerCode: `
                .pulse-grow-button:before {   /* ANTIJITTER */
                    position: absolute;
                    content: "";
                    width: 150%;
                    heigth: 150%;
                    transfrom: translate(-50%, -50%);
                }
    
                .pulse-grow-button:hover {
                    cursor: pointer;
                    animation: pulse-grow 0.5s alternate infinite ease-in;
                }	
                
                @keyframes pulse-grow{
                    0%     { transform: scale(1);}
                    100%     { transform: scale(1.1);}
                }
                `
            },


            'push-button': {
                innerCode: `
                #push {
                    transition: 0.3s;
                }
                #push:hover {
                  animation: push 0.3s ease-in
                }
                @keyframes push {  /* has to be an animation, because transition does not support 3 frames */
                    0% {transform: scale(1);}
                    50% {transform: scale(0.9);}
                    100% {transform: scale(1);}
                }
                `
            },

            'pop-button': {
                innerCode: `
                #pop {
                    transition: 0.3s;
                }
                #pop:hover {
                  animation: pop 0.3s ease-in
                }
                @keyframes pop {  /* has to be an animation, because transition does not support 3 frames */
                    0% {transform: scale(1);}
                    50% {transform: scale(1.1);}
                    100% {transform: scale(1);}
                }
                `
            },         

            'circle-where-clicked-button': {
                innerCode: `
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
                `,
                codeBefore: `
                <b>JS</b>
                <pre>
                    class CircleWhereClickedButton{
                        constructor(){
                            this.button = document.querySelector('#button')
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
                                circle.classList.add('circle');
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
                                    width: parseFloat(circleElement.style.width) + 2, 
                                    height: parseFloat(circleElement.style.height) + 2
                                })
                                this.setElementPosition(circleInnerText, {
                                    x: parseFloat(circleInnerText.style.left) + 1 + 'px',
                                    y: parseFloat(circleInnerText.style.top) + 1 + 'px'
                                })
                                if (parseFloat(circleElement.style.width) > maxRadius) {
                                    clearInterval(interval);
                                    circleElement.remove();
                                    this.wasClickEventTriggered = false;
                                }
                            }, 5)
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
                    }
                </pre>
                `
            }

        }
        

        return dbObject[key]
    }

    static getDescriptorWithCommonCode_buttons(differentCodePart){
        return `
        <b>CSS</b>
        <pre>
        *{
            position: relative;
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
        .button-wrapper{
            display: inline-block
        }
        .center{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button{
            color: white;
            background-color: blue;
            font-family: Arial;
            border-radius: 5px;
            padding: 5px;
            transition: 0.2s;

            ${differentCodePart}
        }
        </pre>
        <b>HTML</b>

        <pre>
        &lt;div class = "button-wrapper">
            &lt;div class="button center position-right-top" >
                &lt;span>&lt;/span>
            &lt;/div>
        &lt;/div>    
        </pre>
        `
    }
    static getEndingMessage_buttons(){
        return `
        <b>Note</b>  js code is a bit too complex to show here, as custom web component is used. When <code>data-color-theme</code> is changed, 
        <code>div.button</code> class related to color theme is switched, and in that way new css variable values are loaded.</br>
        Switching data-button-type to change hoover and active properties work in similar way, but for simplicity it is introduced in this 
        code snipped in a different way. To analize original code please visit <a target="_blank" href = "https://github.com/gudmar/reusableWidgets/">gitHub repo</a>
        
        `
}

}

