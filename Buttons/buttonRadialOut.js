class RadialOutButton extends CircleWhereClickedButton{
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
    }
    

    _getTemplate(){
        return `
            <style>
            *{
                position: relative;
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

            .color-theme-blue{
                --button-bg: blue;
                --button-fg: white;
                --button-hover-fg: rgb(120, 120, 255);
                --button-hover-bg: white;
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

            .radial-out-button {
                transition: 0.3s;
                transition-property: color;
                position:relative;  /* without this whole screan is animated*/
                overflow: hidden;
            }
            .radial-out-button:before {
             position: absolute;
                top: -15px;
                bottom: -15px;
                left: -15px;
                right: -15px;
                transform: scaleX(0) scaleY(0);
                color: var(--button-hover-fg);
                background-color: var(--button-hover-bg);
                transition-property: transform;
                transition-duration: 0.3s;
                transform-origin: 50% 50%; /*start from left side*/
                border-radius: 50%;
                content: "";
                z-index: -1;
            }
            .radial-out-button:hover, .radial-out-button:focus, .radial-out-button:active {
                color: var(--button-hover-fg);
                background-color: var(-button-hover-bg);
            }
            
            .radial-out-button:hover:before, .radial-out-button:focus:before, .radial-out-button:active:before {
                transform: scaleX(1) scaleY(1);
                color: var(--button-hover-fg);
                background-color: var(--button-hover-bg);
            }
            .radial-out-button {   
                z-index: 1;
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