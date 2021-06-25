class WaterCirclesWaitingCircle extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context; // this from customWebComponent
    }


    _getTemplate(){
        return `
        <style>
        .center{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .size-small{ --circle-radius: 40px; }
        .size-medium{ --circle-radius: 60px; }
        .size-big{ --circle-radius: 100px; }
        .color-theme-green{
            --color-dark: darkgreen;
            --color-light: YellowGreen;
        }
        .color-theme-blue{
            --color-dark: blue;
            --color-light: rgb(180, 180, 255) ;
        }
        .color-theme-red{
            --color-dark: red;
            --color-light: rgb(255, 180, 180) ;
        }
        .color-theme-gray{
            --color-dark: darkGray;
            --color-light: rgb(220, 220, 220) ;
        }
        
        .wrapper {
            position: relative;
            width: var(--circle-radius);
            height: var(--circle-radius);
        }

        .circle{
            position: absolute;
            border-radius: 50%;
            width: var(--circle-radius);
            height: var(--circle-radius);
            transform: translateX(-50%);
            z-index: 25
        }

        .water-circles-waiting-circle {
            position: absolute;
            width: var(--circle-radius);
            height: var(--circle-radius);
            transform: translate(-50%, -50%)
          }

        .water-circles-waiting-circle div {
            position: absolute;
            width: calc( var(--circle-radius) * 0.1);
            height: calc( var(--circle-radius) * 0.1);
            border-radius: 50%;
            background-color: var(--color-dark);            
            animation: water-circles-animation 1.35s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .water-circles-waiting-circle div:nth-child(1) {
            animation-delay: -0.45s;
        } 

        .water-circles-waiting-circle div:nth-child(2) {
            animation-delay: -0.9s;
        }

        .water-circles-waiting-circle div:nth-child(3) {
            animation-delay: -1.35s;
        }

        @keyframes water-circles-animation {
        0% {
            width: 0px;
            height: 0px;
            top: calc( var(--circle-radius) * 0.5);
            left: calc( var(--circle-radius) * 0.5);
            opacity: 1;
        }
        100% {
            width: var(--circle-radius);
            height: var(--circle-radius);
            top: 0px;
            left: 0px;
            opacity: 0;
        }
        }
        </style>

        <div class="water-circles-waiting-circle size-small circle color-theme-${this.colorTheme}">
            <div></div>
            <div></div>
            <div></div>
        </div>
        `
    }
}