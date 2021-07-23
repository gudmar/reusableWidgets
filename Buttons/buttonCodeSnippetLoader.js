class ButtonDetailsDB{
    constructor(){
    }

    static getDetailsAbout(widgetDescriptor){
        let details = ButtonDetailsDB.getButtonSpecificCode(widgetDescriptor);
        // console.log(Object.keys(ButtonDetailsDB.get))
        if (details == undefined) return null;
        let beforeCode = details['codeBefore'] == undefined ? '' : details['codeBefore'];
        let innerCode = details['innerCode'] == undefined ? '' : details['innerCode'];
        let afterCode = details['afterCode'] == undefined ? '' : details['afterCode'];
        let noWrapFlag = details['doNotWrapp']
        return `
            ${beforeCode}
            ${noWrapFlag ? innerCode : ButtonDetailsDB.getDescriptorWithCommonCode_buttons(innerCode, widgetDescriptor)}
            ${ButtonDetailsDB.getEndingMessage_buttons()}
            ${afterCode}
        `
    }

    static getButtonSpecificCode(key) {
        let dbObject = {
            'sample-button': {
                innerCode: `
                    &:hover {
                        cursor: pointer;
                        background-color: rgb(120, 120, 255);
                        transition: 0.2s;
                    }
                    &:active{
                        background-color: rgb(200, 200, 255);
                        color: black;
                    }`
            },
            'grow-button': {
                innerCode: `
                &:hover {
                    cursor: pointer;
                    transform: scale(1.2);
                    transition: 0.2s;
                }
                &:active{
                    background-color: var(--button-active-bg);
                    transform: scale(0.8);
                    transition: 0.2s;
                }`
            },

            'shrink-button': {
                innerCode: `
                &:hover {
                    cursor: pointer;
                    transform: scale(0.8);
                    transition: 0.2s;
                }
                &:active{
                    background-color: var(--button-active-bg);
                    transform: scale(1);
                    transition: 0.2s;
                }
                `
            },


            'pulse-button': {
                innerCode: `
                #pulse:before {   /* ANTIJITTER */
                    position: absolute;
                    content: "";
                    width: 150%;
                    height: 150%;
                    transform: translate(-50%, -50%);
                }
    
                .pulse-button:hover{
                    cursor: pointer;
                    animation: pulse 1s infinite ease-in;
                }
    
                @keyframes pulse {
                    0%     { transform: scale(1);}
                    25%     { transform: scale(0.9);}
                    50%   { transform: scale(1);}
                    75%   { transform: scale(1.1);}
                    100%   { transform: scale(1);}
                }
                `
            },

            'pulse-grow-button': {
                innerCode: `
                .pulse-grow-button:before {   /* ANTIJITTER */
                    position: absolute;
                    content: "";
                    width: 150%;
                    heigth: 150%;
                    transfrom: translate(-50%, -50%);
                }
    
                .pulse-grow-button:hover {
                    cursor: pointer;
                    animation: pulse-grow 0.5s alternate infinite ease-in;
                }	
                
                @keyframes pulse-grow{
                    0%     { transform: scale(1);}
                    100%     { transform: scale(1.1);}
                }
                `
            },


            'push-button': {
                innerCode: `
                #push {
                    transition: 0.3s;
                }
                #push:hover {
                  animation: push 0.3s ease-in
                }
                @keyframes push {  /* has to be an animation, because transition does not support 3 frames */
                    0% {transform: scale(1);}
                    50% {transform: scale(0.9);}
                    100% {transform: scale(1);}
                }
                `
            },

            'pop-button': {
                innerCode: `
                #pop {
                    transition: 0.3s;
                }
                #pop:hover {
                  animation: pop 0.3s ease-in
                }
                @keyframes pop {  /* has to be an animation, because transition does not support 3 frames */
                    0% {transform: scale(1);}
                    50% {transform: scale(1.1);}
                    100% {transform: scale(1);}
                }
                `
            },   


            'bounce-in-button': {
                innerCode: `
                .bounce-in-button {
                    transition: 0.5s;
                }
                .bounce-in-button:hover {
                    transform: scale(0.8);
                    transition-timing-function: cubic-bezier(0.47, 2, 0.31, -0.36);
                }
                `
            },         


            'bounce-out-button': {
                innerCode: `
                .bounce-in-button {
                    transition: 0.5s;
                }
                .bounce-in-button:hover {
                    transform: scale(1.2);
                    transition-timing-function: cubic-bezier(0.47, 2, 0.31, -0.36);
                }
                `
            },  

            'rotate-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .rotate-button {
                    transition: 0.5s;
                }
                .rotate-button:after {
                    content: "";
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    transform: (-50%, -50%);
                    z-index: -1;
                }
                .rotate-button:hover {
                    transform: rotate(345deg);
                }
                .shutter{
                    position: absolute;
                    width: 0px;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transition: 0.3s;
                }
                .rotate-button:active > .shutter{
                    width: 100%;
                    height: 100%;
                    transform: rotate(180deg);
                    transition: 0.3s;
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button rotate-button color-theme-blue   button-big" >
                        &lt;div class = "shutter">&lt;/div>
                        &lt;span>&lt;/span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },  

            'rotate-bounce-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .rotate-button:after {
                    content: "";
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    transform: (-50%, -50%);
                    z-index: -1;
                }
                .rotate-bounce-button {
                    transition: 0.5s;
                }
                .rotate-bounce-button:after {
                    content: "";
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    transform: (-50%, -50%);
                    z-index: -1;
                }
                .rotate-bounce-button:hover {
                    transform: rotate(45deg);
                    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
                }
                .shutter{
                    position: absolute;
                    width: 0px;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transition: 0.3s;
                }
                .rotate-bounce-button:active > .shutter{
                    width: 100%;
                    height: 100%;
                    transform: rotate(180deg);
                    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
                    transition: 0.3s;
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button rotate-bounce-button color-theme-blue   button-big" >
                        &lt;div class = "shutter">&lt;/div>
                        &lt;span>&lt;/span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },  


            'rotate-growth-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .rotate-growth-button {
                    transition: 0.17s 0.17s;
                }
                
                .rotate-growth-button:hover {
                    transform: rotate(40deg) scale(1.4);
                }
    
                .rotate-growth-button:after {
                    content: "";
                    position: absolute;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    transform: (-50%, -50%);
                    z-index: -1;
                }
                .shutter{
                    position: absolute;
                    width: 0px;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transition: 0.3s;
                }
                .rotate-growth-button:active > .shutter{
                    width: 100%;
                    height: 100%;
                    transform: rotate(180deg);
                    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button rotate-growth-button rotate-bounce-button color-theme-blue   button-big" >
                        &lt;div class = "shutter">&lt;/div>
                        &lt;span>&lt;/span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },  


            'float-right-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .float-right-button {
                    transition: 0.5s
                }
                .float-right-button:after {
                  position: absolute;
                  content:  "";
                  width: 30px;
                  height: 70px;
                  left: -20px;
                  top: -5px;
                }
                .float-right-button:hover {
                    transform: translate(20px, 0);
                }
                
                .shutter:active >.float-right-button:active:before {
    
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleX(0);
                    transition: 0.3s;
                }
                .float-right-button:active > .shutter{
                    transform: scaleX(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
                </pre>
                `
            },  

            'sink-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .sink-button {
                    transition: 0.5s
                }
                .sink-button:after {
                  position: absolute;
                  content:  "";
                  width: 30px;
                  height: 70px;
                  left: -10%;
                  top: -20%;
                }
                .sink-button:hover {
                    transform: translate(0, 20%);
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .sink-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);	/* transition after mouse leave is ease-out, on hover cubic-beizer */
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button sink-button color-theme-blue   button-big" >
                        &lt;div class = "shutter"></div>
                            &lt;span></span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },  


            'bob-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .bob-button {
                    transition: 0.5s
                }
                .bob-button:after {
                  position: absolute;
                  content:  "";
                  width: 100%;
                  height: 110%;
                  bottom: -40%;
                }
                .bob-button:hover {
                    animation: bob 0.5s alternate infinite ease-in;
                }
    
                @keyframes  bob {
                    to {transform: translate(0, -20%);}
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .bob-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);	/* transition after mouse leave is ease-out, on hover cubic-beizer */
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button bob-button color-theme-blue   button-big" >
                        &lt;div class = "shutter"></div>
                            &lt;span></span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },  


            'skew-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.</p>
                <h3>CSS</h3>
                <pre>
                .skew-button {
                    transition: 0.3s;	
                }
                .skew-button:hover {
                    transform: skewX(-30deg);	
                }
                .skew-button:hover > shew-button:after{
                    width: 150%;
                    height: 150%;
                }
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .skew-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button color-theme-blue skew-button   button-big" >
                        &lt;div class = "shutter"></div>
                            &lt;span></span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },




            'skew-forward-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.</p>
                <h3>CSS</h3>
                .skew-forward-button {
                    transition: 0.3s;	
                    transform-origin: bottom;	
                }
                .skew-forward-button:hover {
                    transform: skewX(-30deg);
                }
    
                .skew-forward-button:hover > shew-forward-button:after{
                    width: 150%;
                    height: 150%;
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .skew-forward-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button skew-forward-button color-theme-blue   button-big" >
                        &lt;div class = "shutter"></div>
                            &lt;span></span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },


            'hang-button': {
                doNotWrapp: true,
                innerCode: `
                <p>Important is creation of <code>.button-wrapper:hover>.hang-button:after</code> pseudoelement. Thanks to it 
                button will not jitter after being hovered. This selector will create after pseudo element only if .button-wrapper element
                is hovered, and pseudoelement will be removed as soon as cursor moves out from .button wrapper. Thanks to this sollution
                button will not animate long before button is hovered.</p>
                <h3>CSS</h3>
                .hang-button {
                    transition: 0.5s;
                    transform-origin: top left;
                    transition-timing-function: cubic-bezier(0.01, 1.3, 0.72, 1.46);
                }
                .hang-button:hover {
                    transform: rotate(45deg);	
                }
                
                .button-wrapper:hover>
                .hang-button:after{
                    content: '';
                    position: absolute;
                    width: 150%;
                    height: 350%;
                    z-index: 30;
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .hang-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button hang-button color-theme-blue   button-big" >
                        &lt;div class = "shutter"></div>
                            &lt;span></span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },

                       'bob-button': {
                doNotWrapp: true,
                innerCode: `
                <p>There is a class <code>shutter</code> added to additional div, so when button is in active state it could animate nicely.
                Moreover there is a pseudo element <code>after</code> added, for antijitter effect.</p>
                <h3>CSS</h3>
                <pre>
                .bob-button {
                    transition: 0.5s
                }
                .bob-button:after {
                  position: absolute;
                  content:  "";
                  width: 100%;
                  height: 110%;
                  bottom: -40%;
                }
                .bob-button:hover {
                    animation: bob 0.5s alternate infinite ease-in;
                }
    
                @keyframes  bob {
                    to {transform: translate(0, -20%);}
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .bob-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);	/* transition after mouse leave is ease-out, on hover cubic-beizer */
                }
                </pre>
                <h3>HTML</h3>
                <pre>
                &lt;div class = "button-wrapper">
                    &lt;div class="button bob-button color-theme-blue   button-big" >
                        &lt;div class = "shutter"></div>
                            &lt;span></span>
                    &lt;/div>
                &lt;/div>
                </pre>
                `
            },

            'wobble-horizontal-button': {
                doNotWrapp: true,
                innerCode: `
                <pre>
                *{
                    position: relative;
                }
                .button-wrapper{
                    display: inline-block
                }
                .button-big{
                    --button-font-size: 1.5rem;
                    --button-padding: 10px;
                }
                .button-small{
                    --button-font-size: 1rem;
                    --button-padding: 5px;
                }
    
                .color-theme-blue{
                    --button-bg: blue;
                    --button-fg: white;
                    --button-hover-bg: rgb(120, 120, 255);
                    --button-hover-fg: white;
                    --button-active-bg: rgb(200, 200, 255);
                    --button-active-fg: black;
                    --button-border-color: rgba(0, 0, 0, 0);
                }
    
    
                .button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    text-align: center;
                    color: var(--button-fg);
                    background-color: var(--button-bg);
                    font-family: Arial;
                    border: solid thin var(--button-border-color);
                    border-radius: 5px;
                    padding: var(--button-padding);
                }
    
                .color-theme-inactive:hover{
                    cursor: not-allowed;
                }
    
                .tooltip {
                    position: absolute;
                    background: white;
                    color: black;
                    border-radius: 5px;
                    padding: 5px;
                    max-width: 100px;
                    line-break: anywhere;
                    z-index: 70;
                }
    
    
                .wobble-horizontal-button{
                    transition: 0.5s;
                }
    
                .wobble-horizontal-button:hover {
                 animation: wobble-horizontal 0.7s linear;
                }
                @keyframes wobble-horizontal {
                    20% {transform: translate(30px, 0px);}
                    40% {transform: translate(-50px, 0px);}
                    60% {transform: translate(35px, 0px);}
                    80% {transform: translate(-20px, 0px);}
                    100% {transform: translate(5px, 0px);}
                }
                .wobble-horizontal-button{
                    transition: 0.5s;
                }
    
                .button-wrapper:hover>
                .wobble-horizontal-button:after{
                    content: '';
                    position: absolute;
                    width: 350%;
                    height: 150%;
                    z-index: 30;
                }
    
    
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .wobble-horizontal-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
    
                </pre>
                `
            },


            'wobble-top-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .wobble-top-button{
                    transition: 0.5s;
                }
    
                .button-wrapper:hover>
                .wobble-top-button:after{
                    
                    content: '';
                    position: absolute;
                    width: 200%;
                    height: 150%;
                    z-index: 30;
                }
    
                .wobble-top-button:hover {
                    animation: wobble-top 0.7s linear;
                    transform-origin: bottom;
                    
                }
                @keyframes wobble-top {
                    20% {transform: skewX(30deg);}
                    40% {transform: skewX(-50deg);}
                    60% {transform: skewX(35deg);}
                    80% {transform: skewX(-20deg);}
                    100% {transform: skewX(5deg);}
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .wobble-top-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }                
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button wobble-top-button color-theme-blue   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },

            'wobble-top-bottom-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .wobble-top-bottom-button{
                    transition: 0.5s;
                }
    
                .button-wrapper:hover>
                .wobble-top-bottom-button:after{
                    
                    content: '';
                    position: absolute;
                    width: 150%;
                    height: 150%;
                    z-index: 30;
                }
    
                .wobble-top-bottom-button:hover {
                    animation: wobble-top 0.7s linear;
                    
                }
                @keyframes wobble-top {
                    20% {transform: skewX(30deg);}
                    40% {transform: skewX(-50deg);}
                    60% {transform: skewX(35deg);}
                    80% {transform: skewX(-20deg);}
                    100% {transform: skewX(5deg);}
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .wobble-top-bottom-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }                
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },



            'wobble-bottom-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .wobble-bottom-button{
                    transition: 0.5s;
                    transform-origin: top;
                }
    
                .button-wrapper:hover>
                .wobble-bottom-button:after{
                    
                    content: '';
                    position: absolute;
                    width: 150%;
                    height: 150%;
                    z-index: 30;
                }
    
                .wobble-bottom-button:hover {
                    animation: wobble-bottom 0.7s linear;
                    
                }
                @keyframes wobble-bottom {
                    20% {transform: skewX(30deg);}
                    40% {transform: skewX(-50deg);}
                    60% {transform: skewX(35deg);}
                    80% {transform: skewX(-20deg);}
                    100% {transform: skewX(5deg);}
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .wobble-bottom-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }                
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue wobble-bottom-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },




            'buzz-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .buzz-button{
                    transform-origin: bottom;
                }
    
                .button-wrapper:hover>
                .buzz-button:after{
                    
                    content: '';
                    position: absolute;
                    width: 200%;
                    height: 150%;
                    z-index: 30;
                }
    
                .buzz-button:hover {
                    animation: buzz 0.1s alternate infinite ease-in;
                    transform-origin: bottom;
                    
                }
                @keyframes buzz {
                    50% {transform: rotate(-10deg);}
                    100% {transform: rotate(10deg);}
                }
    
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .buzz-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue buzz-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },


            'buzz-out-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .buzz-out-button{
                    transform-origin: bottom;
                }
    
                .button-wrapper:hover>
                .buzz-out-button:after{
                    
                    content: '';
                    position: absolute;
                    width: 200%;
                    height: 150%;
                    z-index: 30;
                }
    
                .buzz-out-button:hover {
                    animation: buzz-out 0.5s ease-in;
                    
                }
                @keyframes buzz-out {
                    10% {transform: rotate(-5deg);}
                    20% {transform: rotate(10deg);}
                    30% {transform: rotate(-10deg);}
                    40% {transform: rotate(10deg);}
                    50% {transform: rotate(-10deg);}
                    60% {transform: rotate(7deg);}
                    70% {transform: rotate(-4deg);}
                    80% {transform: rotate(4deg);}
                    100% {transform: rotate(-2deg);}
                }
    
                .shutter{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    width: 100%;
                    width: 100%;
                    height: 100%;
                    margin:0;
                    background-color: rgba(250, 250, 250, 0.5);
                    transform: scaleY(0);
                    transition: 0.3s;
                }
                .buzz-out-button:active > .shutter{
                    transform: scaleY(1);
                    transition-timing-function: cubic-bezier(.8,2,0,0);
                }
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue buzz-out-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },

            'sweep-to-right-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .sweep-to-right-button {
                    transition: 0.3s;
                    transition-property: color;
                    position:relative;
                }
                .sweep-to-right-button:before {
                 position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: scaleX(0);
                    color: var(--button-color-focus);
                    background-color: var(--button-fg);
                    transition-property: transform;
                    transition-duration: 0.3s;
                    transform-origin: 0%;
                    content: "";
                    z-index: -1;
                }
                .sweep-to-right-button:hover, .sweep-to-right-button:focus, .sweep-to-right-button:active {
                    color: var(--button-hover-fg);
                }
                
                .sweep-to-right-button:hover:before, .sweep-to-right-button:focus:before, .sweep-to-right-button:active:before {
                    transform: scaleX(1);
                }
                .sweep-to-right-button {   
                    z-index: 1;
                }
    
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue sweep-to-right-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },


            'bounce-to-right-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .bounce-to-right-button {
                    transition: 0.3s;
                    transition-property: color;
                    position:relative;
                }
                .bounce-to-right-button:before {
                 position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: scaleX(0);
                    color: var(--button-color-focus);
                    background-color: var(--button-fg);
                    transition-property: transform;
                    transition-timing-function: ease-out;
                    transition-duration: 0.3s;
                    transform-origin: 0%;
                    content: "";
                    z-index: -1;
                }
                .bounce-to-right-button:hover, .bounce-to-right-button:focus, .bounce-to-right-button:active {
                    color: var(--button-hover-fg);
                }
                
                .bounce-to-right-button:hover:before, .bounce-to-right-button:focus:before, .bounce-to-right-button:active:before {
                    transform: scaleX(1);
                    transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);	/* transition after mouse leave is ease-out, on hover cubic-beizer */
                }
                .bounce-to-right-button {   
                    z-index: 1;
                }
    
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue bounce-to-right-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },

            'sweep-to-left-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .sweep-to-left-button {
                    transition: 0.3s;
                    transition-property: color;
                    position:relative;
                }
                .sweep-to-left-button:before {
                 position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: scaleX(0);
                    color: var(--button-color-focus);
                    background-color: var(--button-fg);
                    transition-property: transform;
                    transition-duration: 0.3s;
                    transform-origin: 0%;
                    content: "";
                    z-index: -1;
                }
                .sweep-to-left-button:hover, .sweep-to-left-button:focus, .sweep-to-left-button:active {
                    color: var(--button-hover-fg);
                }
                
                .sweep-to-left-button:hover:before, .sweep-to-left-button:focus:before, .sweep-to-left-button:active:before {
                    transform: scaleX(1);
                }
                .sweep-to-left-button {   
                    z-index: 1;
                }
    
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue sweep-to-left-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },

            'sweep-to-bottom-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .sweep-to-bottom-button {
                    transition: 0.3s;
                    transition-property: color;
                    position:relative;  /* without this whole screan is animated*/
                }
                .sweep-to-bottom-button:before {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: scaleY(0);
                    color: var(--button-color-focus);
                    background-color: var(--button-fg);
                    transition-property: transform;
                    transition-duration: 0.3s;
                    transform-origin: top;
                    content: "";
                    z-index: -1;
                }
                .sweep-to-bottom-button:hover, .sweep-to-bottom-button:focus, .sweep-to-bottom-button:active {
                    color: var(--button-hover-fg);
                }
                
                .sweep-to-bottom-button:hover:before, .sweep-to-bottom-button:focus:before, .sweep-to-bottom-button:active:before {
                    transform: scaleY(1);
                }
                .sweep-to-bottom-button {   
                    z-index: 1;
                }
    
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue sweep-to-bottom-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },


            'sweep-to-top-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>

                .sweep-to-top-button {
                    transition: 0.3s;
                    transition-property: color;
                    position:relative;  /* without this whole screan is animated*/
                }
                .sweep-to-top-button:before {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transform: scaleY(0);
                    color: var(--button-color-focus);
                    background-color: var(--button-fg);
                    transition-property: transform;
                    transition-duration: 0.3s;
                    transform-origin: top;
                    content: "";
                    z-index: -1;
                }
                .sweep-to-top-button:hover, .sweep-to-top-button:focus, .sweep-to-top-button:active {
                    color: var(--button-hover-fg);
                }
                
                .sweep-to-top-button:hover:before, .sweep-to-top-button:focus:before, .sweep-to-top-button:active:before {
                    transform: scaleY(1);
                }
                .sweep-to-top-button {   
                    z-index: 1;
                }
    
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue sweep-to-top-button   button-big" >
        &lt;div class = "shutter"></div>
            &lt;span>&lt;/span>
        &lt;/div>
    &lt;/div>                
                </pre>
                `
            },



            'color-pulse-button': {
                doNotWrapp: true,
                innerCode: `
                <h3>CSS:</h3>
                <pre>
                *{
                    position: relative;
                }
                .circle{
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    background-color: yellow;
                    opacity: 0.5;
                    transform: translate(-50%, -50%);
                    mix-blend-mode: difference;
                    z-index: 40;
                }
                .hidden{
                    visibility: hidden;
                }

                .button-wrapper{
                    display: inline-block
                    overflow: hidden;
                }
                .button-big{
                    --button-font-size: 1.5rem;
                    --button-padding: 10px;
                }
    
                .color-theme-blue{
                    --button-bg: blue;
                    --button-fg: white;
                    --button-border-color: rgba(0, 0, 0, 0);
                }
    
                .button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    text-align: center;
                    color: var(--button-fg);
                    background-color: var(--button-bg);
                    font-family: Arial;
                    border: solid thin var(--button-border-color);
                    border-radius: 5px;
                    padding: var(--button-padding);
                    overflow:hidden;
                }
       
    
                .color-pulse-button:hover {
                    animation: color-pulse 0.9s linear alternate infinite;
                }
                @keyframes color-pulse {
                    100% {color: var(--button-bg); background-color: var(--button-fg);}
                }
    
                </pre>
                <h3>HTML</h3>
                <pre>
&lt;div class = "button-wrapper">
    &lt;div class="button color-theme-blue   button-big" >
        &lt;div class = "circle hidden">&lt;/div>
        &lt;span>&lt;/span>
    &lt;/div>
&lt;/div>               
                </pre>
                `
                
            },


            'dark-sample-button': {
                doNotWrapp: true,
                innerCode: `
                <p>This button is based on article showing how to imitate neons with css: 
                    <a href = "https://css-tricks.com/how-to-create-neon-text-with-css/">link</a>, so for exploanation why there 
                    are that many shadows needed and why keyframes are used please refer to source article.
                </p>
                <pre>
                .color-theme-blue{
                    box-shadow:
                        0 0 10px  white,
                        0 0 20px  white,
                        0 0 40px  #ddf,
                        0 0 80px  #aaf,
                        0 0 90px  #77f,
                        0 0 100px #00f,
                        0 0 150px #00f,
                        0 0 170px #00f,
                        0 0 200px #00f,
                        inset 0 0 10px  white,
                        inset 0 0 20px  white,
                        inset 0 0 40px  #ddf,
                        inset 0 0 80px  #aaf,
                        inset 0 0 90px  #77f,
                        inset 0 0 100px #00f,
                        inset 0 0 150px #00f,
                        inset 0 0 170px #00f,
                        inset 0 0 200px #00f;
                    z-index: 130;
                }
                .color-theme-blue{
                    text-shadow:
                        0 0 10px  white,
                        0 0 20px  white,
                        0 0 40px  #ddf,
                        0 0 80px  #aaf,
                        0 0 90px  #77f,
                        0 0 100px #00f,
                        0 0 150px #00f,
                        0 0 170px #00f,
                        0 0 200px #00f;
                    z-index: 130;
                }
                </pre>
                `
            },

            'circle-where-clicked-button': {
                innerCode: `
                .circle {
                    position: absolute;
                    border-radius: 50%;
                    width: 0;
                    height: 0;
                    background-color: var(--button-fg);
                    transform: translate(-50%, -50%);
                    overflow: hidden;
                }
                .circle>span{
                    color: var(--button-bg);
                    position: absolute;
                }
                `,
                codeBefore: `
                <b>JS</b>
                <pre>
                    class CircleWhereClickedButton{
                        constructor(){
                            this.button = document.querySelector('#button')
                        }
        
                        animateOnClick(event){
                            if (this.wasClickEventTriggered) return false;
                            this.wasClickEventTriggered = true;
                            this.drawACircleInsideElement(event)
                        }
                    
                        drawACircleInsideElement(event){
                            let mouseCords = this.getClickPointInElementRelativeToButton(event)
                            let createAndPlaceCircleInsideButton_returnCircle = function(){
                                let circle = document.createElement('div');
                                circle.classList.add('circle');
                                this.button.appendChild(circle);
                                circle.style.left = mouseCords.x + 'px';
                                circle.style.top = mouseCords.y + 'px';    
                                return circle;
                            }.bind(this)
                            let createPlaceLabelToCircle_returnLabel = function (){
                                let label = document.createElement('span');
                                label.innerText = this.button.querySelector('span').innerText;
                                circle.appendChild(label);    
                                return label
                            }.bind(this)
                            let calculateMaxCircleRadius = function(){
                                let {width, height} = this.getElementsSize(this.button)
                                let sumOfPowers = Math.pow(width, 2) + Math.pow(height, 2);
                                return 2 * Math.sqrt(sumOfPowers)
                            }.bind(this)
                    
                            let circle = createAndPlaceCircleInsideButton_returnCircle();
                            let label = createPlaceLabelToCircle_returnLabel();
                            this.growCircleAndDestroyIt(circle, calculateMaxCircleRadius(), this.getElementPosition(label));
                        }
                    
                        growCircleAndDestroyIt(circleElement, maxRadius){
                            this.setElementInlineSize(circleElement, {width: 0, height: 0})
                            let circleInnerText = circleElement.querySelector('span');
                            let clickPoint = this.getElementPositionRelativeToTargetElement(circleElement, this.button)
                            let circleMiddlePosition = {
                                x: parseFloat(circleElement.style.left),
                                y: parseFloat(circleElement.style.top)
                            }
                            let labelPosition = this.claculateLabelPositionInCircleElement(circleMiddlePosition);
                            this.setElementPosition(circleInnerText, labelPosition) 
                    
                            let interval = setInterval(() => {
                                this.setElementInlineSize(circleElement, {
                                    width: parseFloat(circleElement.style.width) + 2, 
                                    height: parseFloat(circleElement.style.height) + 2
                                })
                                this.setElementPosition(circleInnerText, {
                                    x: parseFloat(circleInnerText.style.left) + 1 + 'px',
                                    y: parseFloat(circleInnerText.style.top) + 1 + 'px'
                                })
                                if (parseFloat(circleElement.style.width) > maxRadius) {
                                    clearInterval(interval);
                                    circleElement.remove();
                                    this.wasClickEventTriggered = false;
                                }
                            }, 5)
                        }
                    
                        getElementPositionRelativeToTargetElement(queredElement, referenceElement){
                            let referenceElementCords = this.substractCordinates(
                                this.getElementsPositionRelativeToPage(queredElement), 
                                this.getElementsPositionRelativeToPage(referenceElement)
                            );
                            let queredElementChords = this.substractCordinates(
                                this.getElementsPositionRelativeToPage(queredElement), 
                                this.getElementsPositionRelativeToPage(referenceElement)
                            );
                            return {x: queredElementChords.x - referenceElementCords.x, y: queredElementChords.y - referenceElementCords.y}       
                        }
                    
                        getElementsPositionRelativeToPage(element){
                            let {left, top} = this.getElementPosition(element)
                            return {
                                x: parseFloat(window.scrollX) + left,
                                y: parseFloat(window.scrollY) + top
                            }
                        }
                    
                    
                        getClickPointInElementRelativeToButton(event){
                            let clickedPositionRelativePage =  {x: event.pageX, y: event.pageY}
                            let buttonPositionRelativePage = this.getElementPosition(this.button)
                            return this.substractCordinates(clickedPositionRelativePage, buttonPositionRelativePage)
                        }
                    
                        claculateLabelPositionInCircleElement(circleMiddlePosition){
                            let positionOfMouseClick = circleMiddlePosition
                            let parentLabelCords = this.getLabelPositionRelativeToParent()
                            let circleLabelPosition = this.substractCordinates( parentLabelCords, positionOfMouseClick);
                            return circleLabelPosition
                        }
                    
                        getLabelPositionRelativeToParent(){
                            let labelPosition = this.getElementPosition(this.button.querySelector('span'));
                            let buttonPosition = this.getElementPosition(this.button)
                            return this.substractCordinates(labelPosition, buttonPosition)
                        }
                    
                        substractCordinates(a, b) {
                            return {
                                x: a.x - b.x,
                                y: a.y - b.y
                            }
                        }
                    
                        getElementPosition(element) {
                            let descriptor = element.getBoundingClientRect();
                            return {
                                x: parseFloat(descriptor.left),
                                y: parseFloat(descriptor.top)
                            }
                        }
                    
                        getElementsSize(element) {
                            let {width: widthAsString, height: heightAsString} = element.getBoundingClientRect();
                            return {
                                width: parseFloat(widthAsString),
                                height: parseFloat(heightAsString)
                            }
                        }
                    
                        setElementInlineSize(element, {width, height}){
                            element.style.width = parseFloat(width) + 'px';
                            element.style.height = parseFloat(height) + 'px';
                        }
                    
                        setElementPosition(element, {x, y}) {
                            element.style.left = parseFloat(x) + 'px';
                            element.style.top = parseFloat(y) + 'px';
                        }
                    }
                </pre>
                `
            }

        }
        

        return dbObject[key]
    }

    static getDescriptorWithCommonCode_buttons(differentCodePart, buttonType){
        return `
        <b>CSS</b>
        <pre>
        *{
            position: relative;
        }
        .color-theme-blue{
            --button-bg: blue;
            --button-fg: white;
            --button-hover-bg: rgb(120, 120, 255);
            --button-hover-fg: white;
            --button-active-bg: rgb(200, 200, 255);
            --button-active-fg: black;
            --button-border-color: rgba(0, 0, 0, 0);
        }

        .color-theme-green{
            --button-bg: GreenYellow;
            --button-fg: DarkGreen;
            --button-hover-bg: DarkGreen;
            --button-hover-fg: GreenYellow;
            --button-active-bg: rgb(200, 200, 255);
            --button-active-fg: black;
            --button-border-color: DarkGreen;
        }
        .color-theme-red{
            --button-bg: rgb(220, 0, 0);
            --button-fg: white;
            --button-hover-bg: rgb(150, 0, 0);
            --button-hover-fg: white;
            --button-active-bg: rgb(200, 200, 255);
            --button-active-fg: black;
            --button-border-color: rgba(0, 0, 0, 0);
        }
        .color-theme-inactive{
            --button-bg: gray;
            --button-fg: DarkGray;
            --button-hover-bg: gray;
            --button-hover-fg: DarkGray;
            --button-active-bg: gray;
            --button-active-fg: DarkGray; 
            --button-border-color: rgba(0, 0, 0, 0);
        }
        .button-wrapper{
            display: inline-block
        }
        .center{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .button{
            color: white;
            background-color: blue;
            font-family: Arial;
            border-radius: 5px;
            padding: 5px;
            transition: 0.2s;

            ${differentCodePart}
        }
        </pre>
        <b>HTML</b>

        <pre>
        &lt;div class = "button-wrapper">
            &lt;div class="button center ${buttonType}  " >
                &lt;span>&lt;/span>
            &lt;/div>
        &lt;/div>    
        </pre>
        `
    }
    static getEndingMessage_buttons(){
        return `
        <b>Note</b>  js code is a bit too complex to show here, as custom web component is used. When <code>data-color-theme</code> is changed, 
        <code>div.button</code> class related to color theme is switched, and in that way new css variable values are loaded.</br>
        Switching data-button-type to change hoover and active properties work in similar way, but for simplicity it is introduced in this 
        code snipped in a different way. To analize original code please visit <a target="_blank" href = "https://github.com/gudmar/reusableWidgets/">gitHub repo</a>
        
        `
}

}

