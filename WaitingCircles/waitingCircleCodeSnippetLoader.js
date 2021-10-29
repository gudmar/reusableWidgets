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

            'dark-roller-coster-waiting-circle': {
                innerCode: 
`
<p>Article how to emulate neon effects with css is available here: <a href = "https://css-tricks.com/how-to-create-neon-text-with-css/">Link</a></p>
<b>CSS</b>
<pre>
.dark-roller-coster-waiting-circle {
    position: absolute;
    width: var(--circle-radius);
    height: var(--circle-radius);
  }
  .dark-roller-coster-waiting-circle div {
    animation: roller-coster-animation 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: calc( var(--circle-radius) * 0.5); 
  }

  .dark-roller-coster-waiting-circle div {
      width: calc( var(--circle-radius) * 0.1);
      height: calc( var(--circle-radius) * 0.1);
      border-radius: 50%;
      background-color: var(--color-dark);
      transform: translateX(calc ( var(--circle-radius) * 0.5));
      position: absolute;
  }
  .dark-roller-coster-waiting-circle div:nth-child(1) {
    animation-delay: -0.045s;
  }
  .dark-roller-coster-waiting-circle div:nth-child(2) {
    animation-delay: -0.09s;
  }
  .dark-roller-coster-waiting-circle div:nth-child(3) {
    animation-delay: -0.135s;
  }
  .dark-roller-coster-waiting-circle div:nth-child(4) {
    animation-delay: -0.18s;
  }
  .dark-roller-coster-waiting-circle div:nth-child(5) {
    animation-delay: -0.225s;
  }
  .dark-roller-coster-waiting-circle div:nth-child(6) {
    animation-delay: -0.27s;
  }

  .color-theme-blue>div{
    box-shadow: 
        0 0 7px   #0f7,
        0 0 10px  #0f7,
        0 0 20px  #0f7,
        0 0 40px  #0f7,
        0 0 80px  #0f7,
        0 0 90px  #0f7,
        0 0 100px #0f7,
        0 0 150px #0f7,
        0 0 170px #0f7,
        0 0 200px #0f7;
    z-index: 130;
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
            },


            'cube-waiting-circle': {
                'innerCode': 
`
<b>CSS</b>
<pre>
*{
    --border-width: 3px;
}
.size-small{
    --cube-side-size: 40px;
}

.color-theme-blue{
    --cube-border-color: blue;
}

.center{
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    position: relative;
}

.cube{
    z-index: 8;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-100px);
    animation: rotate;
    width: var(--cube-side-size);
    height: var(--cube-side-size);
}
.rotate{
    animation: rotate-cube 1.75s infinite linear;
}

.wall {
    position: absolute;
    width: var(--cube-side-size);
    height: var(--cube-side-size);
    border: var(--cube-border-color) solid var(--border-width);
}

.back{
    transform: translateZ( calc( -1 * calc( var(--cube-side-size) + calc( 2 *var(--border-width) )) ));
}
.top {
    transform: rotateX(-90deg);
    transform-origin: top;
}
.bottom {
    transform: rotateX(90deg);
    transform-origin: bottom;
}
.left {
    transform: rotateY(90deg);
    transform-origin: left;
}
.right {
    transform: rotateY(-90deg);
    transform-origin: right;
}


@keyframes rotate-cube {
    from { transform: rotateX(0deg) rotateZ(0deg);}
    to { transform: rotateX(359deg) rotateZ(359deg);}
}

@keyframes xrotate-cube {
    from { transform: rotateX(0deg);}
    to { transform: rotateX(359deg);}
}

.placer{
    position: relative;
    transform: translateZ(calc( var(--cube-side-size) * 0.5));
    transform-style: preserve-3d;
}


</style>
</pre>
<b>HTML</b>
<pre>
&lt;div class="wrapper center size-small">
    &lt;div class="cube rotate circle color-theme-blue">
        &lt;div class="placer">
            &lt;div class="wall front">&lt;/div>
            &lt;div class="wall back">&lt;/div>
            &lt;div class="wall top">&lt;/div>
            &lt;div class="wall bottom">&lt;/div>
            &lt;div class="wall left">&lt;/div>
            &lt;div class="wall right">&lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>
</pre>
`  

            },


            'dark-cube-waiting-circle': {
                'innerCode': 
`
<b>CSS</b>
<pre>
*{
    --border-width: 3px;
}
.size-small{
    --cube-side-size: 40px;
}

.color-theme-blue{
    --cube-border-color: rgb(200, 200, 255);
}

.color-theme-blue>div>div{
    box-shadow: 
        0 0 7px   #07f,
        0 0 10px  #07f,
        0 0 20px  #07f,
        0 0 40px  #07f,
        0 0 80px  #07f,
        0 0 90px  #07f,
        inset 0 0 7px   #07f,
        inset 0 0 10px  #07f,
        inset 0 0 20px  #07f,
        inset 0 0 50px  #07f,
        inset 0 0 40px  #07f;               
    z-index: 130;
}

.center{
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    position: relative;
}

.cube{
    z-index: 8;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-100px);
    animation: rotate;
    width: var(--cube-side-size);
    height: var(--cube-side-size);
}
.rotate{
    animation: rotate-cube 1.75s infinite linear;
}

.wall {
    position: absolute;
    width: var(--cube-side-size);
    height: var(--cube-side-size);
    border: var(--cube-border-color) solid var(--border-width);
}

.back{
    transform: translateZ( calc( -1 * calc( var(--cube-side-size) + calc( 2 *var(--border-width) )) ));
}
.top {
    transform: rotateX(-90deg);
    transform-origin: top;
}
.bottom {
    transform: rotateX(90deg);
    transform-origin: bottom;
}
.left {
    transform: rotateY(90deg);
    transform-origin: left;
}
.right {
    transform: rotateY(-90deg);
    transform-origin: right;
}


@keyframes rotate-cube {
    from { transform: rotateX(0deg) rotateZ(0deg);}
    to { transform: rotateX(359deg) rotateZ(359deg);}
}

@keyframes xrotate-cube {
    from { transform: rotateX(0deg);}
    to { transform: rotateX(359deg);}
}

.placer{
    position: relative;
    transform: translateZ(calc( var(--cube-side-size) * 0.5));
    transform-style: preserve-3d;
}


</style>
</pre>
<b>HTML</b>
<pre>
&lt;div class="wrapper center size-small">
    &lt;div class="cube rotate circle color-theme-blue">
        &lt;div class="placer">
            &lt;div class="wall front">&lt;/div>
            &lt;div class="wall back">&lt;/div>
            &lt;div class="wall top">&lt;/div>
            &lt;div class="wall bottom">&lt;/div>
            &lt;div class="wall left">&lt;/div>
            &lt;div class="wall right">&lt;/div>
        &lt;/div>
    &lt;/div>
&lt;/div>
</pre>
`  

            },            



            'flower-waiting-circle': {
                'innerCode': 
`
Idea is to create a circle out of div, set its overflow to hidden, and color only upper part of this div with another div.
Tirangle part of each figure is made out of borders of next div element.
I hope SCSS works, as learning it is stil ahead of me, and original code for styling loops is in JS.
<h3>SCSS</h3>
<pre>

$circle-diameter: 50px;
$color-dark: blue;
$color-light: rgb(180, 180, 255) ;
$nr-of-elements: 16;


.wrapper {
    position: relative;
    width: $circle-diameter;
    height: $circle-diameter;
    transform: translate(-50%, -50%);
}

.circle{
    position: absolute;
    border-radius: 50%;
    width: $circle-diameter;
    height: $circle-diameter;
    z-index: 25;
}

.element-located-on-circle {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    &>*{
        animation: infinite-blinking 1.6s linear infinite;    
    }

    
}

.circle-part{
    position: relative;
    width: 0.2 * $circle-diameter;
    height: 0.2 * $circle-diameter;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    border: none;
}

.circle-part-color{
    position: relative;
    width: 0.2 * $circle-diameter;
    height: 0.2 * $circle-diameter;
    background-color: $color-dark;
    transform: translate(0, 100%);
    outline: none;
    border: none;
    
}
.triangle-part{


    border-bottom: solid var(--color-dark) calc( var(--circle-diameter) * 0.7);
    border-left: solid transparent $circle-diameter * 0.1;
    border-right: solid transparent $circle-diameter * 0.1;
    border-top: soid transparent 0px;
    position: relative;
    width: 0px;
    height: 0px;
    top: 0.1 * $circle-diameter;
}

$count = 0;
$angle-between-elements = 360 / $nr-of-elements
@while $count < $nr-of-elements {
    .element-located-on-circle-#{$count} {
        transform: translate(-50%, -50%) rotate($angle-between-elements * $count + deg) translate(0.5 $circle-diameter)) rotate(($angleBetweenElements*-4) + deg));
        &>*{
            animation-delay: $animationDelayDelta * count + ms;    
        }
}


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
</pre>
<h3>HTML</h3>
<pre>
&lt;div class = "wrapper circle size-\${this.size} center">
    &lt;div class = "circle  rotate color-theme-\${this.colorTheme}">
        \${this.getFlowerPetals(this.nrOfElementsOnCirlce)}
    &lt;/div>
&lt;/div>
</pre>
where 
<h3>JS</h3>
<pre>
getFlowerPetals(nrOfElements){
    let output = '';
    for (let i = 0; i < nrOfElements; i++){
        output = output + \`&lt;div class = 'element-located-on-circle element-located-on-circle-$\{i}'>
                            &lt;div class = "triangle-part">\`&lt;/div>
                               &lt;div class = "circle-part">
                                    &lt;div class = "circle-part-color">\`&lt;/div>
                                &lt;/div>
                            &lt;/div>\`
    }
    return output;
}
</pre>
`  

            }, 



            'rectangle-waiting-circle': {
                'innerCode': 
`
Wrapper element has class <code>circle</code>. Previous elements had only one circle element, thats color or size related classes had
to be changed in order to make element of different size or color. In this case there are 2 elements that need changini: wrapper, that
is clipped in frame shape and circle, that is moving inside. Wrapper is not circle shaped, but it has a circle class, in order not to 
make greater changes in code :(. This is one of greatest sins in clean code: missinformation. Will have to correct it one day.</br>
There is a <a href = "https://bennettfeely.com/clippy/" target="_blank">great clip-path generator</a> that was used to create this circle. 
The good thing about solution used to create this circle is that rectangle path clip can be substituted with any other way shaped frame, 
and effect will work. Have fun &#128526;
<b>CSS</b>
<pre>
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
</pre>
<b>HTML</b>
<pre>
&lt;div class = "circle wrapper size-${this.size} center">
    &lt;div class = "circle rotating-circle rectangle-waiting-circle rotate color-theme-${this.colorTheme}"></div>
&lt;/div>
</pre>
`  

            },            




            'galaxy-waiting-circle': {
                'innerCode': 
`
This work is inspired by <a href="https://codepen.io/IndependentSw/" target="_blank">this code pen</a>.
It was explored by me at begining of my learning path. Idea seemed proper for a waiting circle.
Important not to forget <code>transform-style: preserve-3d</code>
<b>CSS</b>
<pre>
*{
    --year-duration: 1.3s;
}
.size-small{ 
    --circle-radius: 60px; 
    --orbit-size: 60px;
    --star-size: 18px;
    --planet-size: 8px;
}
.color-theme-blue{
    --color-dark: blue;
    --color-light: rgb(180, 180, 255) ;
}

.wrapper {
    position: relative;
    width: var(--circle-radius);
    height: var(--circle-radius);
    transform: rotateX(60deg);
    transform-style: preserve-3d;
}

.orbit {
    
    position: relative;
    width: var(--orbit-size);
    height: var(--orbit-size);
    border-radius: 50%;
    border: solid var(--color-light) thin;
    justify-items: center;
    align-items: center;
    justify-content: center;
    
    transform-style: preserve-3d;
    overflow: visible;
    animation: rotate-orbit var(--year-duration) linear infinite;
}
.star {
    position: absolute;
    width: var(--star-size);
    height: var(--star-size);
    top: calc( 50% - 0.5*var(--star-size) );
    left: calc( 50% - 0.5*var(--star-size) );
    border-radius: 50%;
    background-color: var(--color-dark);
    transform-style: preserve-3d;
    animation: counter-orbit-rotation var(--year-duration) linear infinite;
    z-index: 100;
}
.planet {
    position: absolute;
    top: 0;
    width: var(--planet-size);
    height: var(--planet-size);
    background-color: var(--color-dark);
    border-radius: 50%;
    top: calc( 0.5 * var(--planet-size));
    left: calc( 0.5 * var(--planet-size));
    transform-style: preserve-3d;
    animation: counter-orbit-rotation var(--year-duration) linear infinite;
    z-index: 100;
}
@keyframes rotate-orbit{
    0% {transform: rotateZ(0deg);}
    100% {transform: rotateZ(360deg);}
}
@keyframes counter-orbit-rotation{
    0% {transform:  rotateX(90deg) rotateY(0deg) rotateZ(0deg); }
    100% {transform:  rotateX(90deg) rotateY(-360deg) rotateZ(0deg); }
}

</style>
</pre>
<b>HTML</b>
<pre>
&lt;div class = "wrapper circle size-small center">
    &lt;div class = "circle orbit size-small galaxy-waiting-circle rotate color-theme-blue">
        &lt;div class = "circle size-small planet color-theme-blue">&lt;/div>
        &lt;div class = "circle size-small star color-theme-blue">&lt;/div>
    &lt;/div>
&lt;/div>
</pre>
`  

            },                        

            


            'galaxy-waiting-circle-dark-theme': {
                'innerCode': 
`
This work is inspired by <a href="https://codepen.io/IndependentSw/" target="_blank">this code pen</a> and 
<a href = "https://css-tricks.com/how-to-create-neon-text-with-css/" target="_blank">this</a> article.
After remembering about <code>transform-style: preserve-3d</code> it is important to notice, that setting too small
sizes of elements that have shadows attached to, gives poor result. So planet of size 4px gave no visible shadow.</br>
Hope this scss works, as I have still learning css preprocesors ahead. In original code JS was used to loop through shadows &#128521;
<h3>SCSS</h3>
<pre>

$year-duration: 1.3s;
$circle-radius: 60px; 
$orbit-size: 60px;
$star-size: 20px;
$planet-size: 12px;
$color-dark: blue;
$color-light: rgb(180, 180, 255) ;

.wrapper {
    position: relative;
    width: $circle-radius;
    height: $circle-radius;
    transform: rotateX(60deg);
    transform-style: preserve-3d;
}

.orbit {
    
    position: relative;
    width: $orbit-size;
    height: $orbit-size;
    border-radius: 50%;
    border: solid $color-light thin;
    justify-items: center;
    align-items: center;
    justify-content: center;
    
    transform-style: preserve-3d;
    overflow: visible;
    animation: rotate-orbit $year-duration linear infinite;
}
.star {
    position: absolute;
    width: $star-size;
    height: $star-size);
    top: (50% - 0.5*$star-size);
    left: (50% - 0.5*$star-size);
    border-radius: 50%;
    background-color: $color-dark);
    transform-style: preserve-3d;
    animation: counter-orbit-rotation $year-duration) linear infinite;
    z-index: 100;
}
.planet {
    position: absolute;
    top: 0;
    width: $planet-size;
    height: $planet-size;
    background-color: $color-dark;
    border-radius: 50%;
    top: (0.5 * $planet-size);
    left: (0.5 * $planet-size);
    transform-style: preserve-3d;
    animation: counter-orbit-rotation $year-duration linear infinite;
    z-index: 100;
}

@function makeShadow($color){
    $val: 0px 0px $color;
    $grade: 10;
    @for $i from 1 through 20 {
        $val: #{$val}, 0px 0px #{$i*$grade}px #{color};
    }
    return $val
}

@mixin getshadow($color) {
    box-shadow: makeShadow($color);
}

$grade = 10;
.color-theme-blue>.planet{
    @include getshadow(#5af);
}
.color-theme-blue>.star{
    @include getshadow(#5af);
}

@keyframes rotate-orbit{
    0% {transform: rotateZ(0deg);}
    100% {transform: rotateZ(360deg);}
}
@keyframes counter-orbit-rotation{
    0% {transform:  rotateX(90deg) rotateY(0deg) rotateZ(0deg); }
    100% {transform:  rotateX(90deg) rotateY(-360deg) rotateZ(0deg); }
}

</style>
</pre>
<h3>HTML</h3>
<pre>
&lt;div class = "wrapper circle size-small center">
    &lt;div class = "circle orbit size-small galaxy-waiting-circle rotate color-theme-blue">
        &lt;div class = "circle size-small planet color-theme-blue">&lt;/div>
        &lt;div class = "circle size-small star color-theme-blue">&lt;/div>
    &lt;/div>
&lt;/div>
</pre>
`  

            },                        


            'growing-ring-SVG-waiting-circle': {
                'innerCode': 
`
<h3>growing-ring-SVG-waiting-circle</h3>
<p>Source code can be found on <a target="_blank" href = "https://github.com/gudmar/reusableWidgets">GitHub</a></p>
<p>This circle could be implemented with CSS, however background color would have to be defined and have no opacity. In case opacity is needed 
    and background-color needs to be flexibel I decidet to use SVG path for this. Using SVG path equals JS that would recalcualte this path and 
    code becomes more complex. In this real example it is even more complex, as <code>waiting-circle</code> is a custom component that implements more
    than only this growing-ring-SVG-waiting-circle but basicly all circles available on this site. But simplified example could look like below:
    </p>

<b>JS</b>
<pre>
class ArcDrawer {
    constructor(){
        
    }

    getArcElement(radius, positionXY, startAngle, endAngle, width, color, id = this.generateGoodEnoughId()){
        let _radius = radius == undefined ? 100 : radius;
        let {x, y} = positionXY == undefined ? {x: 100, y: 100} : positionXY;
        let _x = x == undefined ? 100 : x;
        let _y = y == undefined ? 100 : y;
        let _width = width == undefined ? 10 : width;
        let _color = color == undefined ? 'black' : color;
        let _startAngle = startAngle == undefined ? 0 : startAngle;
        let _endAngle = endAngle == undefined ? 90 : endAngle;
        return this.createArc(_radius, {x: _x, y: _y}, _startAngle, _endAngle, _width, _color, id)
    }


    createArc(radius, positionXY, startAngle, endAngle, width, color, id){
        let svg = this.createSvg(radius * 2 + width)
        let path = this.createElementNS('path')
        let listOfAttributes = {
            'id': id,
            'd': this.getArcAsString(positionXY['x'], positionXY['y'], radius, startAngle, endAngle),
            'stroke': color,
            'stroke-width': width,
            'stroke-linecap': 'round',
            'fill': 'none'
        }
        this.setAttributesFromObject(path, listOfAttributes)
        svg.appendChild(path)
        return svg;
    }


    getArcAsString(x, y, radius, startAngle, endAngle) {
        let  start = this.polarToCartesian(x, y, radius, endAngle);
        let  end = this.polarToCartesian(x, y, radius, startAngle);
        let  largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        let  d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
        return d;
    }

    calculateCartesian2Angle(svgElement, startPoint, middleOfCirclePoint, endPoint) {
        // THis retuns angle between 2 points
        
        let mP = this.xy2svg(middleOfCirclePoint, svgElement)
        let sP = this.xy2svg(startPoint, svgElement)
        let eP = this.xy2svg(endPoint, svgElement)
        let output = undefined;
        let pS_pM = this.getDistanceBetweenPoints(mP, sP)
        let pE_pM = this.getDistanceBetweenPoints(eP, mP)
        let pE_pS = this.getDistanceBetweenPoints(eP, sP)
        if (sP.x < eP.x) {
            output = Math.acos((pS_pM * pS_pM + pE_pM * pE_pM - pE_pS * pE_pS) / (2 * pS_pM * pE_pM)) * 180 / Math.PI    
        } else {
            output = 360 - Math.acos((pS_pM * pS_pM + pE_pM * pE_pM - pE_pS * pE_pS) / (2 * pS_pM * pE_pM)) * 180 / Math.PI
        }
        if (output == 360) output = 359.999
        return output
    }

    getDistanceBetweenPoints(A, B){
        return Math.sqrt((Math.pow(A.x - B.x, 2) + (Math.pow(A.y - B.y, 2))))
    }

    xy2svg(point, element) {
        // takes a point ({x: , y: }) in normal mouse coordinance and returns point in svg coordinance
        let p = element.createSVGPoint();
        p.x = point.x
        p.y = point.y
        let output = p.matrixTransform(element.getScreenCTM().inverse());
        return output
    }

    polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    createSvg(size){
        let svg = this.createElementNS('svg')
        let listOfAttributes = {
            'viewBox': \`0 0 \${size} \${size}\`,
            'width': size,
            'height': size
        }
        this.setAttributesFromObject(svg, listOfAttributes)
        return svg;
    }

    createElementNS(elementType) {
        return document.createElementNS('http://www.w3.org/2000/svg', elementType)
    }

    setAttributesFromObject(targetElement, objectWithAttributes){
        for (let key of Object.keys(objectWithAttributes)){
            targetElement.setAttributeNS(null, key, objectWithAttributes[key])
        }
    }


    generateGoodEnoughId(){
        return Math.random().toString(36).substr(2, 9);
    }
}



class GrowingRingSVGWaitingCircle{
    // depends on ArcDrawer.js from Gauge
    constructor(){
        super();
        this.circleHolder = document.querySelector('.circle-placeholder');
        this.arcCreator = new ArcDrawer();
        this.startAngle = 0;
        this.deltaEndAngleMin = 10;
        this.deltaEndAnfleMax = 330;
        this.radius = 40;
        this.strokeWidth = 10;
        this.arcId = 'arcId';
        this.colorTheme = 'blue'
        this.animationDelta = 12.4;
        this.nrOfAnimationFrames = 26;
        this.animationDurationInMs = 1000;
        this.animationInterval = null;
        this.arcMiddlePoint = {x: this.radius + this.strokeWidth / 2, y: this.radius + this.strokeWidth / 2}
    }


    startWaitingCircle(size, colorTheme){
        this.insertInitialSVGStartArc();
        this.arc = this.circleHolder.shadowRoot.querySelector('svg>path');
        this.animate();
    }

    insertInitialSVGStartArc(){
        let svgElement = this.arcCreator.createArc(this.radius, {x: this.arcMiddlePoint.x, y: this.arcMiddlePoint.y}, 
        this.startAngle, this.deltaEndAngleMin, this.strokeWidth, this.colorTheme, this.id)
        this.circleHolder.shadowRoot.querySelector('.circle').appendChild(svgElement);
    }

    animate(){
        let isArcGrowing = true;
        let currentStartAngle = this.startAngle;
        let currentEndAngle = this.deltaEndAngleMin;
        let alterArc = function(startAngle, endAngle){
            let newPathD = this.arcCreator.getArcAsString(this.arcMiddlePoint.x, this.arcMiddlePoint.y, this.radius, startAngle, endAngle);
            this.arc.setAttributeNS(null, 'd', newPathD)
        }.bind(this)
        let growArcIfFlag = function(deltaGrowth){
            currentEndAngle = currentEndAngle + deltaGrowth;
            alterArc(currentStartAngle, currentEndAngle)
        }.bind(this)
        let shrinkArcIfFlag = function(deltaGrowth){
            currentStartAngle = currentStartAngle + deltaGrowth;
            alterArc(currentStartAngle, currentEndAngle)            
        }.bind(this)
        let animation = function(){
            if (isArcGrowing) {
                growArcIfFlag(this.animationDelta);
                if (currentEndAngle - currentStartAngle > this.deltaEndAnfleMax - this.startAngle){isArcGrowing = false}
            } else {
                shrinkArcIfFlag(this.animationDelta);
                if (currentEndAngle - currentStartAngle < this.deltaEndAngleMin - this.startAngle) {isArcGrowing = true}
            }
        }.bind(this)

        this.animationInterval = setInterval(animation, this.animationDurationInMs/this.nrOfAnimationFrames)
    }
}
</pre>
<b>CSS</b>

<pre>

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

        .circle{
            position: absolute;
            border-radius: 50%;
            width: var(--circle-radius);
            height: var(--circle-radius);
            z-index: 25;
            animation: growing-ring-circle 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .positioning-circle{
            position: absolute;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            z-index: 25;
            transform: translate(-50%, -100%);
        }

        .growing-ring-waiting-circle {
            position: absolute;
            width: var(--circle-radius);
            height: var(--circle-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translate(-75%, -75%);
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
&lt;div class = "positioning-circle center">
    &lt;div class="growing-ring-waiting-circle size-small circle color-theme-blue">&lt;/div>
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

