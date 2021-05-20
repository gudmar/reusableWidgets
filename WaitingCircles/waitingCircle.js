class WaitingCircle extends AbstractComponent{
    constructor(){
        super();
    }

    _getTemplate(){
        return `
        <style>
        .center{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .small{ --circle-radius: 40px; }
        .medium{ --circle-radius: 60px; }
        .big{ --circle-radius: 100px; }
        .color-theme-green{
            --color-dark: darkgreen;
            --color-light: yellow-green;
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
        .circle {
            position: absolute;
            border-radius: 50%;
            border: solid thick var(--color-light);
            border-top: solid thick var(--color-dark);
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
        <div class = "wrapper small center">
            <div class = "circle rotate color-theme-blue"></div>
        </div>
        
        `
    }
}

window.customElements.define('waiting-circle', WaitingCircle)