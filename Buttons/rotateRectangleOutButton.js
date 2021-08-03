class RotateRectangleOutButton extends CircleWhereClickedButton{
    constructor(context){
        super(context);
        this.context = context
        
    }

    drawACircleInsideElement(event){}

    setButtonToInactiveState({buttonType}){
        this.changeButtonColorThemeClass('inactive')
        this.context.shadowRoot.querySelector('.button').classList.remove(buttonType)
    }

    setButtonToActiveState({colorTheme, buttonType}){
        this.changeButtonColorThemeClass(colorTheme)
        this.context.shadowRoot.querySelector('.button').classList.add(buttonType)
    }

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
            if (this.context.state.isActive == false) return null;
            let mouseCords = this.getClickPointInElementRelativeToButton(event)
            circle.style.left = mouseCords.x + 'px';
            circle.style.top = mouseCords.y + 'px';   
            circle.classList.remove('hidden')
        }.bind(this)
        let hideCircle = function(event){
            circle.classList.add('hidden')
        }
        this.context.shadowRoot.querySelector('.button').addEventListener('mousedown', moveCirclePointer)
        document.querySelector('body').addEventListener('mouseup', hideCircle)
        this.copyButtonContentToShutter()
    }

    copyButtonContentToShutter(){
        let buttonContent = this.context.shadowRoot.querySelector(".button-label").innerText;
        let shutterElement = this.context.shadowRoot.querySelector('.shutter-label');
        
        shutterElement.innerText = buttonContent;
    }
    

    _getTemplate(){
        return `
            <style>
            *{
                position: relative;
                --animation-time: 0.5s;
            }
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

            .color-theme-blue, .color-theme-blue:before{
                --button-bg: blue;
                --button-fg: white;
                --button-hover-fg: rgb(120, 120, 255);
                --button-hover-bg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }

            .color-theme-green, .color-theme-green:before{
                --button-bg: GreenYellow;
                --button-fg: DarkGreen;
                --button-hover-bg: DarkGreen;
                --button-hover-fg: GreenYellow;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: DarkGreen;
            }
            .color-theme-red, .color-theme-red:before{
                --button-bg: rgb(220, 0, 0);
                --button-fg: white;
                --button-hover-fg: rgb(150, 0, 0);
                --button-hover-bg: white;
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

            .rotate-rectangle-out-button {
                transition-property: color;
                position:relative; 
                overflow: hidden;
                z-index: 1;
            }
            
            .shutter{
                display: flex;
                justify-content:center;
                align-items: center;
                position: absolute;
                width: 0px;
                height: 0px;
                transform: rotate(0deg);
                transition: var(--animation-time);
                background-color: var(--button-hover-bg);
                color: var(--button-hober-fg);
                overflow: hidden;
                z-index: 20;
            }

            .rotate-rectangle-out-button:hover>.shutter {
                transform: rotate(0deg);
                transform-origin: 50% 50%;
                transform: rotate(-90deg);
                width: 100px;
                height: 100px;
                transition: var(--animation-time);
            }
            .rotate-rectangle-out-button:hover>.shutter>span {
                transform: rotate(90deg);
                transition: var(--animation-time);
            }
            .shutter-label{
                position: relative;
                position: absolute;
                display: inline-block;
                color: var(--button-hover-fg);
                transition: var(--animation-time);
                z-index: 30;
            }
            
            </style>

            <div class = "button-wrapper">
                <div class="button color-theme-blue position-right-top button-big" >
                    <div class = "shutter">
                        <span class="shutter-label"></span>
                    </div>
                    <div class = "circle hidden"></div>
                    <span class="button-label"></span>
                </div>
            </div>
        `
    }
}