class BuzzButton extends CustomButtonGeneral{
    constructor(context){
        super(context);
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

            .buzz-out-button{
                transform-origin: bottom;
            }

            .button-wrapper:hover>
            .buzz-out-button:after{
                
                content: '';
                position: absolute;
                width: 200%;
                height: 150%;
                z-index: 30;
            }

            .buzz-out-button:hover {
                animation: buzz-out 0.5s ease-in;
                
            }
            @keyframes buzz-out {
                10% {transform: rotate(-5deg);}
                20% {transform: rotate(10deg);}
                30% {transform: rotate(-10deg);}
                40% {transform: rotate(10deg);}
                50% {transform: rotate(-10deg);}
                60% {transform: rotate(7deg);}
                70% {transform: rotate(-4deg);}
                80% {transform: rotate(4deg);}
                100% {transform: rotate(-2deg);}
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
            .buzz-button:active > .shutter{
                transform: scaleY(1);
                transition-timing-function: cubic-bezier(.8,2,0,0);
            }

            </style>

            <div class = "button-wrapper">
                <div class="button color-theme-blue position-right-top button-big" >
                    <div class = "shutter"></div>
                    <span></span>
                </div>
            </div>
        `
    }
}