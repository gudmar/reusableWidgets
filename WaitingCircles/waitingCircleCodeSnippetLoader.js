class WaitngCircleDetailsDB{
    constructor(){

    }

    static getDetailsAbout(widgetDescriptor){
        return `
        ${WaitngCircleDetailsDB.getSpecificCode(widgetDescriptor)}
        ${this.getEndingMessage()}
        `

    }

    static getSpecificCode(key) {
        console.log(key)
        let dbObject = {
            'sample-waiting-circle': {
                innerCode: `
        <pre>
                &lt;style>
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
                .circle {
                    position: absolute;
                    border-radius: 50%;
                    border: solid thick var(--color-light);
                    border-top: solid thick var(--color-dark);
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
        
                &lt;/style>
                &lt;div class = "wrapper small center">
                    &lt;div class = "circle rotate color-theme-blue">&lt;/div>
                &lt;/div>
            </pre>
                `
            },
            'drop-waiting-circle': {
                innerCode: `
        <pre>
        .sample-waiting-circle {
            border: solid thick var(--color-light);
            border-top: solid thick var(--color-dark);
            border-width: calc( var(--circle-radius) * 0.1 );

        }
        .circle-drop{
            border: solid;
            border-bottom: none;
            border-right: none;
            border-top: solid transparent 5px; /*Transparent, not none !!!*/
            border-left: solid var(--color-dark) 5px;
            position: absolute;
            border-radius: 50%;
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
        
                &lt;/style>
                &lt;div class = "wrapper small center">
                    &lt;div class = "circle circle-drop rotate color-theme-blue">&lt;/div>
                &lt;/div>
            </pre>
            <b>Note:</b> Some css classes were ommited, as only these show how this circle really works.
                `
            }
    }
    
    if (dbObject[key] == undefined) return null;
    return dbObject[key]['innerCode']
    }
    static getEndingMessage(){
        return `
        
        `
}

}

