class BlinkingDotsWaitingCircle extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context;
        this.nrOfElementsOnCirlce = 12;
        this.animationDelta = 100;
        this.animationDuration = 1.2;

    }
    _getTemplate(){
        return `
        <style>
        .center{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .size-small{ --circle-diameter: 40px; }
        .size-medium{ --circle-diameter: 60px; }
        .size-big{ --circle-diameter: 100px; }
        .color-theme-green{
            --color-dark: darkgreen;
            --color-light: YellowGreen;
        }
        .color-theme-blue{
            --color-dark: blue;
            --color-light: rgb(180, 180, 255) ;
        }
        .color-theme-gray{
            --color-dark: darkGray;
            --color-light: rgb(220, 220, 220) ;
        }
        .color-theme-red{
            --color-dark: red;
            --color-light: rgb(255, 180, 180) ;
        }
        
        .wrapper {
            position: relative;
            width: var(--circle-diameter);
            height: var(--circle-diameter);
        }

        .circle{
            position: absolute;
            border-radius: 50%;
            width: var(--circle-diameter);
            height: var(--circle-diameter);
            z-index: 25;
        }
        .size-small{ --circle-dots-diameter: 20px; }
        .size-medium{ --circle-dots-diameter: 30px; }
        .size-big{ --circle-dots-diameter: 50px; }

        .element-located-on-circle {
            position: absolute;
            background-color: var(--color-dark);
            width: calc( var(--circle-diameter) * 0.1 );
            height: calc( var(--circle-diameter) * 0.1 );
            border-radius: 50%;
            border: none;
            top: 50%;
            left: 50%;    

            animation: infinite-blinking ${this.animationDuration}s linear infinite;
        }

        ${this.getStylingForElementsLocatedOnCircle(this.nrOfElementsOnCirlce, this.animationDelta)}


        @keyframes infinite-blinking{
            0% {
                opacity: 1; 
                width: calc( var(--circle-diameter) * 0.2 );
                height: calc( var(--circle-diameter) * 0.2 );
            }
            10% {
                opacity: 0.9; 
                width: calc( var(--circle-diameter) * 0.18 );
                height: calc( var(--circle-diameter) * 0.18 );
            }
            20% {
                opacity: 0.8; 
                width: calc( var(--circle-diameter) * 0.15 );
                height: calc( var(--circle-diameter) * 0.15 );
            }
            30% {
                opacity: 0.7; 
                width: calc( var(--circle-diameter) * 0.12 );
                height: calc( var(--circle-diameter) * 0.12 );                
            }
            50% {
                opacity: 0.6;
                width: calc( var(--circle-diameter) * 0.12 );
                height: calc( var(--circle-diameter) * 0.12 );                

            }
            60% {opacity: 0.5;}
            70% {opacity: 0.4;}
            80% {opacity: 0.35;}
            90% {opacity: 0.3;}
            100% {opacity: 0.25;}
        }

        </style>
        <div class = "wrapper size-${this.size} center">
            <div class = "circle  rotate color-theme-${this.colorTheme}">
                ${this.getElementsToBeLocadetOnCircle(this.nrOfElementsOnCirlce)}
            </div>
        </div>
        
        `
    }

}