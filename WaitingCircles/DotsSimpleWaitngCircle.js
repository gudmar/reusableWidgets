class DotsSimpleWaitnigCirlce extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context; // this from customWebComponent
    }

    // https://stackoverflow.com/questions/12813573/position-icons-into-circle


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
        }

        .circle{
            position: absolute;
            border-radius: 50%;
            width: var(--circle-radius);
            height: var(--circle-radius);
            z-index: 25;
            transform: translate(-50%, -50%);
        }
        .size-small{ --circle-dots-radius: 20px; }
        .size-medium{ --circle-dots-radius: 30px; }
        .size-big{ --circle-dots-radius: 50px; }

        .rotate {
            animation: infinite-rotation 1s linear infinite;
        }
        .dot {
            position: absolute;
            background-color: var(--color-dark);
            width: calc( var(--circle-radius) * 0.1 );
            height: calc( var(--circle-radius) * 0.1 );
            border-radius: 50%;
            border: none;
            top: 50%;
            left: 50%;    
        }


        .deg0   {transform:translate(-50%, -50%) rotate(000deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(000deg);}        
        .deg30  {transform:translate(-50%, -50%) rotate(030deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(030deg);}
        .deg60  {transform:translate(-50%, -50%) rotate(060deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(060deg);}        
        .deg90  {transform:translate(-50%, -50%) rotate(090deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(090deg);}    
        .deg120 {transform:translate(-50%, -50%) rotate(120deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(120deg);}    
        .deg150 {transform:translate(-50%, -50%) rotate(150deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(150deg);}
        .deg180 {transform:translate(-50%, -50%) rotate(180deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(180deg);}
        .deg210 {transform:translate(-50%, -50%) rotate(210deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(210deg);}
        .deg240 {transform:translate(-50%, -50%) rotate(240deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(240deg);}
        .deg270 {transform:translate(-50%, -50%) rotate(270deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(270deg);}
        .deg300 {transform:translate(-50%, -50%) rotate(300deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(300deg);}
        .deg330 {transform:translate(-50%, -50%) rotate(330deg) translate(calc( var(--circle-dots-radius) - 0%)) rotate(330deg);}

        @keyframes infinite-rotation{
            0% {transform: rotate(0deg);}
            100% {transform: rotate(360deg);}
        }

        </style>
        <div class = "circle wrapper size-${this.size} center">
            <div class = "circle  rotate color-theme-${this.colorTheme}">
                <div class = "dot deg0"></div>
                <div class = "dot deg30"></div>
                <div class = "dot deg60"></div>
                <div class = "dot deg90"></div>
                <div class = "dot deg120"></div>
                <div class = "dot deg150"></div>
                <div class = "dot deg180"></div>
                <div class = "dot deg210"></div>
                <div class = "dot deg240"></div>
                <div class = "dot deg270"></div>
                <div class = "dot deg300"></div>
                <div class = "dot deg330"></div>
            </div>
        </div>
        
        `
    }
}