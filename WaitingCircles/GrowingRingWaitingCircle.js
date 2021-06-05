class GrowingRingWaitingCircle extends WaitingCircleGeneralClass{
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
            z-index: 25;
        }

        .growing-ring-waiting-circle {
            position: absolute;
            width: var(--circle-radius);
            height: var(--circle-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate(-50%, -50%);
        }
        .growing-ring-waiting-circle div {
            position: absolute;
            width: var(--circle-radius);
            height: var(--circle-radius); 
            border: calc( var(--circle-radius) * 0.1) var(--color-dark) solid;
            border-radius: 50%;
            animation: growing-ring-circle 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: var(--color-dark) transparent transparent transparent;
        }
        .growing-ring-waiting-circle div:nth-child(1) {
            animation-delay: -0.45s;
        }
        .growing-ring-waiting-circle div:nth-child(2) {
            animation-delay: -0.3s;
        }
        .growing-ring-waiting-circle div:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes growing-ring-circle {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
          

        </style>

        <div class="growing-ring-waiting-circle size-small circle color-theme-${this.colorTheme}">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        `
    }
}