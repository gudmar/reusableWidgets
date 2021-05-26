class GrowButton extends CustomButtonGeneral {
    constructor(context) {
        super(context);
    }

    _getTemplate(){{
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

            .grow-button:hover {
                cursor: pointer;
                transform: scale(1.2);
                transition: 0.2s;
            }

            .grow-button:active {
                background-color: var(--button-active-bg);
                transform: scale(1);
                transition: 0.2s;
            }


            .circle{
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


            
            </style>
            <div class = "button-wrapper">
                <div class="button color-theme-blue position-right-top button-big" >
                    <span></span>
                </div>
            </div>
        `
    }

}
}