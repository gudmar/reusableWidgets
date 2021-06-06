class BubblingCirclesWaitingCircle extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context; // this from customWebComponent
        this.animationDuration = 2;
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
        
        .wrapper {
            position: relative;
            width: var(--circle-diameter);
            height: var(--circle-diameter);
        }

        .circle{
            position: absolute;
            border-radius: 50%;
            width: calc(var(--circle-diameter) * 0.5);
            height: calc(var(--circle-diameter) * 0.5);
            transform: translate(-100%,-50%);
            z-index: 25
        }

        .bubbling-circle {
            box-sizing: border-box;
            position: absolute;
            // top: calc( var(--circle-diameter) * 0.5);
            border-radius: 50%;
            animation: ${this.animationDuration}s linear infinite animate-wheel;
            transform: translate(-50%, -50%);
            background-color: var(--color-dark);
        }

        .bubbling-circle-1{
            animation-delay: 0s;
        }

        .bubbling-circle-2{
            animation-delay: calc(${this.animationDuration}s * 0.5);
        }



        @keyframes animate-wheel {
            0% { left: 0px;
                width: 0px;
                height: 0px;
                }
            50% { left: calc( var(--circle-diameter) * 0.5);
                    width: var(--circle-diameter);
                    height: var(--circle-diameter);
                    }
            100% {
                   left: calc( var(--circle-diameter) * 1);
                   width: 0px;
                   height: 0px;
    }
        }
        </style>

        <div class="bubbling-circles-waiting-circle size-small circle color-theme-blue">
            <div class="bubbling-circle bubbling-circle-1"></div>
            <div class="bubbling-circle bubbling-circle-2"></div>
        </div>
        `
    }
}