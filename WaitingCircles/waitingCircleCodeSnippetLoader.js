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
            },
            'dots-simple-waiting-circle': {
    innerCode: `
<pre>
.size-small {
    --circle-dots-radius: 20px;
}

.size-medium {
    --circle-dots-radius: 30px;
}

.size-big {
    --circle-dots-radius: 50px;
}

.rotate {
    animation: infinite-rotation 1s linear infinite;
}

.dot {
    position: absolute;
    background-color: var(--color-dark);
    width: calc(var(--circle-radius) * 0.1);
    height: calc(var(--circle-radius) * 0.1);
    border-radius: 50%;
    border: none;
    top: 50%;
    left: 50%;
}


.deg0 {
    transform: translate(-50%, -50%) rotate(000deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(000deg);
}

.deg30 {
    transform: translate(-50%, -50%) rotate(030deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(030deg);
}

.deg60 {
    transform: translate(-50%, -50%) rotate(060deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(060deg);
}

.deg90 {
    transform: translate(-50%, -50%) rotate(090deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(090deg);
}

.deg120 {
    transform: translate(-50%, -50%) rotate(120deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(120deg);
}

.deg150 {
    transform: translate(-50%, -50%) rotate(150deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(150deg);
}

.deg180 {
    transform: translate(-50%, -50%) rotate(180deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(180deg);
}

.deg210 {
    transform: translate(-50%, -50%) rotate(210deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(210deg);
}

.deg240 {
    transform: translate(-50%, -50%) rotate(240deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(240deg);
}

.deg270 {
    transform: translate(-50%, -50%) rotate(270deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(270deg);
}

.deg300 {
    transform: translate(-50%, -50%) rotate(300deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(300deg);
}

.deg330 {
    transform: translate(-50%, -50%) rotate(330deg) translate(calc(var(--circle-dots-radius) - 0%)) rotate(330deg);
}

@keyframes infinite-rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</pre>
            `},
            'roller-coster-waiting-circle': {
                innerCode: 
`
<b>CSS</b>
<pre>
.roller-coster-waiting-circle {
    position: absolute;
    width: var(--circle-radius);
    height: var(--circle-radius);
  }
  .roller-coster-waiting-circle div {
    animation: roller-coster-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: calc( var(--circle-radius) * 0.5); 
  }

  .roller-coster-waiting-circle div {
      width: calc( var(--circle-radius) * 0.1);
      height: calc( var(--circle-radius) * 0.1);
      border-radius: 50%;
      background-color: var(--color-dark);
      transform: translateX(calc ( var(--circle-radius) * 0.5));
      position: absolute;
  }
  .roller-coster-waiting-circle div:nth-child(1) {
    animation-delay: -0.045s;
  }
  .roller-coster-waiting-circle div:nth-child(2) {
    animation-delay: -0.09s;
  }
  .roller-coster-waiting-circle div:nth-child(3) {
    animation-delay: -0.135s;
  }
  .roller-coster-waiting-circle div:nth-child(4) {
    animation-delay: -0.18s;
  }
  .roller-coster-waiting-circle div:nth-child(5) {
    animation-delay: -0.225s;
  }
  .roller-coster-waiting-circle div:nth-child(6) {
    animation-delay: -0.27s;
  }

  @keyframes roller-coster-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
</pre>
<b>HTML</b>
<pre>
&lt;div class="roller-coster-waiting-circle size-small circle">
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
&lt;/div>
</pre>`
                
            },
    
            'water-circles-waiting-circle': {
                'innerCode': 
`
<b>CSS</b>
<pre>
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
</pre>
<b>HTML</b>
<pre>
&lt;div class="water-circles-waiting-circle size-small circle">
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
&lt;/div>
</pre>
`  
            },
        
            'growing-ring-waiting-circle': {
                innerCode: `
<b>CSS</b>
<pre>
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
</pre>
<b>HTML</b>
<pre>
&lt;div class="growing-ring-waiting-circle circle">
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
    &lt;div>&lt;/div>
&lt;/div>
</pre>
                
                `
            },
            'blinking-dots-waiting-circle': {
                innerCode: `
<b>CSS</b>
<pre>
.size-small{ --circle-diameter: 40px; }
.color-theme-blue{
    --color-dark: blue;
    --color-light: rgb(180, 180, 255) ;
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

    animation: infinite-blinking 1.2s linear infinite;
}

.element-located-on-circle-0 {
    transform: translate(-50%, -50%) 
        rotate(0deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 0ms;
} 
.element-located-on-circle-1 {
    transform: translate(-50%, -50%) 
        rotate(30deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 100ms;
} 
.element-located-on-circle-2 {
    transform: translate(-50%, -50%) 
        rotate(60deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 200ms;
} 
.element-located-on-circle-3 {
    transform: translate(-50%, -50%) 
        rotate(90deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 300ms;
} 
.element-located-on-circle-4 {
    transform: translate(-50%, -50%) 
        rotate(120deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 400ms;
} 
.element-located-on-circle-5 {
    transform: translate(-50%, -50%) 
        rotate(150deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 500ms;
} 
.element-located-on-circle-6 {
    transform: translate(-50%, -50%) 
        rotate(180deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 600ms;
} 
.element-located-on-circle-7 {
    transform: translate(-50%, -50%) 
        rotate(210deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 700ms;
} 
.element-located-on-circle-8 {
    transform: translate(-50%, -50%) 
        rotate(240deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 800ms;
} 
.element-located-on-circle-9 {
    transform: translate(-50%, -50%) 
        rotate(270deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 900ms;
} 
.element-located-on-circle-10 {
    transform: translate(-50%, -50%) 
        rotate(300deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 1000ms;
} 
.element-located-on-circle-11 {
    transform: translate(-50%, -50%) 
        rotate(330deg) 
        translate(calc( 0.5 * var(--circle-diameter))) 
        rotate(-30deg); 
    animation-delay: 1100ms;
} 


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
</pre>
<b>HTML</b>
<pre>
&lt;div class="circle rotate color-theme-green size-medium">
    &lt;div class="element-located-on-circle element-located-on-circle-0">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-1">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-2">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-3">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-4">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-5">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-6">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-7">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-8">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-9">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-10">&lt;/div>
    &lt;div class="element-located-on-circle element-located-on-circle-11">&lt;/div>
&lt;/div>
</pre>

<b>JS</b>
<p>Styling for dot elements located on circumference of a circle can be made with help of JS, or with SCSS
Here is an example of JS approach:</p>
<pre>
getStylingForElementsLocatedOnCircle(nrOfElements, animationDelayDelta){
    let angleBetweenElements = 360 / nrOfElements;
    let output = '';
    for (let i = 0; i < nrOfElements; i++){
        output = output + \`
        .element-located-on-circle-\${i} {
            transform: translate(-50%, -50%) rotate(\${angleBetweenElements * i}deg) translate(calc( 0.5 * var(--circle-diameter))) rotate(-\${angleBetweenElements * 1}deg); 
            animation-delay: \${animationDelayDelta * i}ms;
        } \`
    }
    return output;
}

getElementsToBeLocadetOnCircle(nrOfElements){
    let output = '';
    for (let i = 0; i < nrOfElements; i++){
        output = output + \`<div class = 'element-located-on-circle element-located-on-circle-\${i}'></div>\`
    }
    return output;
}
</pre>
                
                `
            },
            'bubbling-circles-waiting-circle': {
                'innerCode': 
`
<b>CSS</b>
<pre>
.size-small{ --circle-diameter: 40px; }

.color-theme-blue{
    --color-dark: blue;
    --color-light: rgb(180, 180, 255) ;
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
    animation: 2s linear infinite animate-wheel;
    transform: translate(-50%, -50%);
    background-color: var(--color-dark);
}

.bubbling-circle-1{
    animation-delay: 0s;
}

.bubbling-circle-2{
    animation-delay: 1s;
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

</pre>
<b>HTML</b>
<pre>
    &lt;div class="bubbling-circles-waiting-circle size-small circle color-theme-blue">
        &lt;div class="bubbling-circle bubbling-circle-1">&lt;/div>
        &lt;div class="bubbling-circle bubbling-circle-2">&lt;/div>
    &lt;/div>
</pre>
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

