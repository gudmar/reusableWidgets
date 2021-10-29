class FlowerWaitingCircle extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context;
        this.nrOfElementsOnCirlce = 16;
        this.animationDelta = 100;
        this.animationDuration = 1.6;

    }

    getFlowerPetals(nrOfElements){
        let output = '';
        for (let i = 0; i < nrOfElements; i++){
            output = output + `<div class = 'element-located-on-circle element-located-on-circle-${i}'>
                                    <div class = "triangle-part"></div>
                                    <div class = "circle-part">
                                        <div class = "circle-part-color"></div>
                                    </div>
                               </div>`
        }
        return output;
    }


    getAnimationDelays(nrOfElements, animationDelayDelta){
        let angleBetweenElements = 360 / nrOfElements;
        let output = '';
        for (let i = 0; i < nrOfElements; i++){
            output = output + `
            .element-located-on-circle-${i}>* {
                animation-delay: ${animationDelayDelta * i}ms;
            }             
            `
        }
        return output;
    }

    _getTemplate(){
        return `
        <style>
        .center{
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .size-small{ --circle-diameter: 20px; }
        .size-medium{ --circle-diameter: 30px; }
        .size-big{ --circle-diameter: 50px; }
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
            transform: translate(-50%, -50%);
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
            display: flex;
            flex-direction: column;
            top: 50%;
            left: 50%;    

            
        }

        .element-located-on-circle>*{
            animation: infinite-blinking ${this.animationDuration}s linear infinite;
        }

        .circle-part{
            position: relative;
            width: calc(0.2 * var(--circle-diameter));
            height: calc(0.2 * var(--circle-diameter));
            border-radius: 50%;
            background-color: transparent;
            overflow: hidden;
            border: none;
        }

        .circle-part-color{
            position: relative;
            width: calc(0.2 * var(--circle-diameter));
            height: calc(0.1 * var(--circle-diameter));
            background-color: var(--color-dark);
            transform: translate(0, 100%);
            outline: none;
            border: none;
            
        }
        .triangle-part{


            border-bottom: solid var(--color-dark) calc( var(--circle-diameter) * 0.7);
            border-left: solid transparent calc( var(--circle-diameter) * 0.1);
            border-right: solid transparent calc( var(--circle-diameter) * 0.1);
            border-top: soid transparent 0px;
            position: relative;
            width: 0px;
            height: 0px;
            top: calc( 0.1 * var(--circle-diameter));
        }

         ${this.getStylingForElementsLocatedOnCircle(this.nrOfElementsOnCirlce, this.animationDelta)}
        ${this.getAnimationDelays(this.nrOfElementsOnCirlce, this.animationDelta)}


        @keyframes infinite-blinking{
            0% {
                opacity: 1; 
            }
            10% {
                opacity: 0.9; 
            }
            20% {
                opacity: 0.8; 
            }
            30% {
                opacity: 0.7;            
            }
            50% {
                opacity: 0.6;         

            }
            60% {opacity: 0.5;}
            70% {opacity: 0.4;}
            80% {opacity: 0.35;}
            90% {opacity: 0.3;}
            100% {opacity: 0.25;}
        }

        </style>
        <div class = "wrapper circle size-${this.size} center">
            <div class = "circle  rotate color-theme-${this.colorTheme}">
                ${this.getFlowerPetals(this.nrOfElementsOnCirlce)}
            </div>
        </div>
        
        `
    }

}