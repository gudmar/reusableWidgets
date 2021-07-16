class ColorPulseButton extends CircleWhereClickedButton{
    constructor(context){
        super(context);
        this.context = context
        
    }

    drawACircleInsideElement(event){}
    // drawACircleInsideElement(event){
    //     let mouseCords = this.getClickPointInElementRelativeToButton(event)
    //     let createAndPlaceCircleInsideButton_returnCircle = function(){
    //         let circle = document.createElement('div');
    //         circle.classList.add(this.CIRCLE_CLASS);
    //         this.button.appendChild(circle);
    //         circle.style.left = mouseCords.x + 'px';
    //         circle.style.top = mouseCords.y + 'px';    
    //         return circle;
    //     }.bind(this)
    //     let createPlaceLabelToCircle_returnLabel = function (){
    //         let label = document.createElement('span');
    //         label.innerText = this.button.querySelector('span').innerText;
    //         circle.appendChild(label);    
    //         return label
    //     }.bind(this)
    //     let calculateMaxCircleRadius = function(){
    //         let {width, height} = this.getElementsSize(this.button)
    //         let sumOfPowers = Math.pow(width, 2) + Math.pow(height, 2);
    //         return 2 * Math.sqrt(sumOfPowers)
    //     }.bind(this)

    //     let circle = createAndPlaceCircleInsideButton_returnCircle();
    //     // let label = createPlaceLabelToCircle_returnLabel();
    //     // this.growCircleAndDestroyIt(circle, calculateMaxCircleRadius(), this.getElementPosition(label));
    //     this.destroyCircleAfterAWhile(circle)
    // }

    // destroyCircleAfterAWhile(circle){
    //     let interval = setTimeout(()=>{
    //         circle.remove();
    //     }, 500)
    //     this.wasClickEventTriggered = false;
    // }

    startButton({buttonType, labelFromAttrib, colorTheme, isActive, onclick}){
        let getShorterLabel = labelFromAttrib;
        let labelToDisplay = this.getShorterLabelIfLabelTooLong(labelFromAttrib);
        this.addStringContentToShadowRoot(this._getTemplate())
        this.button = this.context.shadowRoot.querySelector('.button')
        this.setButtonType(buttonType);
        this.setButtonLabel(labelFromAttrib)
        this.addTooltipEvents();

        let circle = this.context.shadowRoot.querySelector('.circle')
        
        let moveCirclePointer = function(event){
            let mouseCords = this.getClickPointInElementRelativeToButton(event)
            console.log(mouseCords)
                circle.style.left = mouseCords.x + 'px';
                circle.style.top = mouseCords.y + 'px';   
                circle.classList.remove('hidden')
        }.bind(this)
        let hideCircle = function(event){
            circle.classList.add('hidden')
        }
        // debugger
        this.context.shadowRoot.querySelector('.button').addEventListener('mousedown', moveCirclePointer)
        document.querySelector('body').addEventListener('mouseup', hideCircle)
        // this.changeOnclickFunction(onclick)
    }
    

    _getTemplate(){
        return `
            <style>
            .circle{
                position: absolute;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background-color: yellow;
                opacity: 0.5;
                transform: translate(-50%, -50%);
                mix-blend-mode: difference;
                z-index: 40;
            }
            .hidden{
                visibility: hidden;
            }
            // .button:active>.circle{
            //     visibility: visible;
            // }
            *{
                position: relative;
            }
            .button-wrapper{
                display: inline-block
                overflow: hidden;
            }
            .button-big{
                --button-font-size: 1.5rem;
                --button-padding: 10px;
            }
            .button-small{
                --button-font-size: 1rem;
                --button-padding: 5px;
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
                text-align: center;
                color: var(--button-fg);
                background-color: var(--button-bg);
                font-family: Arial;
                border: solid thin var(--button-border-color);
                border-radius: 5px;
                padding: var(--button-padding);
                overflow:hidden;
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


            .color-pulse-button:hover {
                animation: color-pulse 0.9s linear alternate infinite;
            }
            @keyframes color-pulse {
                100% {color: var(--button-bg); background-color: var(--button-fg);}
            }

            .shutter{
                width: 100%;
                height: 100%;
                position: absolute;
                width: 100%;
                width: 100%;
                height: 100%;
                margin:0;
                background-color: rgba(250, 250, 250, 0.5);
                transform: scaleY(0);
                transition: 0.3s;
            }
            .color-pulse-button:active > .shutter{
                transform: scaleY(1);
                transition-timing-function: cubic-bezier(.8,2,0,0);
            }

            </style>

            <div class = "button-wrapper">
                <div class="button color-theme-blue position-right-top button-big" >
                    <div class = "circle hidden"></div>
                    <span></span>
                </div>
            </div>
        `
    }
}