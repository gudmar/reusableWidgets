class RectangleWaitingCircle extends WaitingCircleGeneralClass{
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
        .color-theme-red{
            --color-dark: red;
            --color-light: rgb(255, 180, 180) ;
        }
        
        .wrapper {
            position: relative;
            width: var(--circle-radius);
            height: var(--circle-radius);
            clip-path: polygon(0% 0%, 0% 100%, 3% 100%, 3% 3%, 98% 2%, 98% 97%, 2% 97%, 3% 100%, 100% 100%, 100% 0);
            clip-path: polygon(0% 0%, 0% 100%, 10% 100%, 10% 10%, 91% 10%, 91% 89%, 10% 88%, 10% 100%, 100% 100%, 100% 0%);
        }

        .rotating-circle{
            position: absolute;
            border-radius: 50%;
            width: 0;
            height: 0;
            z-index: 25

        }

        .rectangle-waiting-circle {
            border: solid thick var(--color-light);
            border-top: solid thick var(--color-dark);
            border-width: calc( var(--circle-radius) * 1 );

        }
        .circle-drop{
            border: solid;
            border-bottom: none;
            border-right: none;
            border-top: solid transparent 5px; /*Transparent, not none !!!*/
            border-left: solid darkgreen 5px;
            position: absolute;
            border-radius: 50%;
            border: solid thick var(--color-light);
            border-width: calc( var(--circle-radius) * 0.1 );
            width: var(--circle-radius);
            height: var(--circle-radius);
        }
        .rotate {
            animation: infinite-rotation 1s linear infinite;
        }


        @keyframes infinite-rotation{
            0% {transform: rotate(0deg);}
            100% {transform: rotate(360deg)}
        }

        </style>
        <div class = "circle wrapper size-${this.size} center">
            <div class = "circle rotating-circle rectangle-waiting-circle rotate color-theme-${this.colorTheme}"></div>
        </div>
        
        `
    }
}