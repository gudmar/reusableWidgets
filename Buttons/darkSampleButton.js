class DarkSampleButton extends CustomButtonGeneral{
    constructor(context){
        super(context);
    }

    _getTextShadowFromArrayOfColorsAsString(arrayOfColorsAsStrings){
        let shadows = '';
        arrayOfColorsAsStrings.forEach((element, index) => {
            let lastSeparator = index == arrayOfColorsAsStrings.length - 1? ';': ',';
            shadows = shadows + `0 0 ${(index + 1) * 10}px ${element} ${lastSeparator}`;
        })
        return `text-shadow: ${shadows}`;
    }

    _getBoxShadowFromArrayOfColorsAsString(arrayOfColorsAsStrings){
        let shadows = '';
        let insetShadows = '';
        arrayOfColorsAsStrings.forEach((element, index) => {
            let lastSeparator = index == arrayOfColorsAsStrings.length - 1? ';': ',';
            shadows = shadows + `0 0 ${(index + 1) * 10}px ${element},`;
            insetShadows = insetShadows + `inset 0 0 ${index * 10}px ${element} ${lastSeparator}`
        })
        return `box-shadow: ${shadows} ${insetShadows}`
    }

    _getBoxShadowAsString(colorAsString){
        return this._getBoxShadowFromArrayOfColorsAsString([
                'white', 
                'white',
                colorAsString, 
                colorAsString, 
                colorAsString, 
                colorAsString, 
                colorAsString,
                colorAsString
            ])
    }

    _getTextShadowAsString(colorAsString) {
        return this._getTextShadowFromArrayOfColorsAsString([
            'white',
            'white', 
            colorAsString, 
            colorAsString, 
            colorAsString, 
            colorAsString, 
            colorAsString,
            colorAsString        
        ])
    }

    _getTemplate(){
            return `
                <style>
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
                .button{
                    --button-bg: transparent;
                    --button-border-color: white;
                    --button-text-color: white;
                    --button-hover-color: rgba(255, 255, 255, 0.6);
                    --button-text-hover-color: gray;
                    --button-active-color: rgba(255, 255, 255, 0.8);
                }
                .button>span{
                    color: var(--button-text-color);
                }

                .button:hover{
                    
                }
                .button:hover>span{
                    color: var(--button-text-hover-color);
                }
    
                .color-theme-blue{
                    --button-text-hover-color: #ddf;
                    ${this._getBoxShadowAsString('blue')}
                }
                .color-theme-blue>span{
                    animation: pulsate 0.11s ease-in-out infinite alternate;
                    ${this._getTextShadowAsString('blue')}
                }


                .color-theme-blue:hover>span{
                    animation: none;
                    ${this._getTextShadowFromArrayOfColorsAsString([
                        'white',
                        'white', 
                        'white', 
                        'white', 
                        'white', 
                        'blue', 
                        'blue',
                        'blue'  
                    ])}
                }
                .color-theme-blue:hover{
                    ${this._getBoxShadowFromArrayOfColorsAsString([
                        'white',
                        '#aaf', 
                        '#ddf', 
                        '#00f', 
                        '#00f', 
                        'blue', 
                        'blue',
                        'blue'  
                    ])}
                }

                .color-theme-blue:active{
                    ${this._getBoxShadowFromArrayOfColorsAsString([
                        'white',
                        'white', 
                        '#aaf', 
                        '#ddf', 
                        '#77f', 
                        'blue', 
                        'blue',
                        'blue'  
                    ])}
                }

                @keyframes pulsate {
                    100% {
                            ${this._getTextShadowAsString('blue')}
                        }
                        0% {
                            ${this._getTextShadowFromArrayOfColorsAsString([
                                'white',
                                'white', 
                                'white', 
                                'white', 
                                'white', 
                                '#77f', 
                                '#00f', 
                                'blue', 
                                'blue',
                                'blue'  
                            ])}
                        }
                    
                }
                



                
                .color-theme-green{
                    --button-text-hover-color: #dfd;
                    ${this._getBoxShadowAsString('green')}
                }
                .color-theme-green>span{
                    animation: pulsate-green 0.11s ease-in-out infinite alternate;
                    ${this._getTextShadowAsString('green')}
                }


                .color-theme-green:hover>span{
                    animation: none;
                    ${this._getTextShadowFromArrayOfColorsAsString([
                        'white',
                        'green', 
                        'green',
                        'green', 
                        'green',
                        'green', 
                        'green',
                        'green'  
                    ])}
                }
                .color-theme-green:hover{
                    ${this._getBoxShadowFromArrayOfColorsAsString([
                        'white',
                        '#afa', 
                        '#0f0', 
                        '#0f0', 
                        '#0f0', 
                        '#0f0' 
                    ])}
                }

                .color-theme-green:active{
                    ${this._getBoxShadowFromArrayOfColorsAsString([
                        'white',
                        'white', 
                        '#afa', 
                        '#dfd', 
                        '#7f7', 
                        'green', 
                        'green',
                        'green'  
                    ])}
                }

                @keyframes pulsate-green {
                    100% {
                            ${this._getTextShadowAsString('green')}
                        }
                        0% {
                            ${this._getTextShadowFromArrayOfColorsAsString([
                                'white',
                                'white', 
                                'white', 
                                'white', 
                                'white', 
                                '#7f7', 
                                '#0f0', 
                                '#0f0', 
                                '#0f0',
                                '#0f0'  
                            ])}
                        }
                    
                }


    
                .color-theme-red{
                    --button-text-hover-color: #fdd;
                    ${this._getBoxShadowAsString('red')}
                }
                .color-theme-red>span{
                    animation: pulsate-red 0.11s ease-in-out infinite alternate;
                    ${this._getTextShadowAsString('red')}
                }


                .color-theme-red:hover>span{
                    animation: none;
                    ${this._getTextShadowFromArrayOfColorsAsString([
                        'white',
                        'white', 
                        'red',
                        'red', 
                        'red',
                        'red', 
                        'red',
                        'red'  
                    ])}
                }
                .color-theme-red:hover{
                    ${this._getBoxShadowFromArrayOfColorsAsString([
                        'white',
                        '#faa', 
                        '#dfd', 
                        '#f00', 
                        '#f00', 
                        '#f00', 
                        '#f00',
                        '#f00'  
                    ])}
                }

                .color-theme-red:active{
                    ${this._getBoxShadowFromArrayOfColorsAsString([
                        'white',
                        'white', 
                        '#faa', 
                        '#fdd', 
                        '#f77', 
                        'red', 
                        'red',
                        'red'  
                    ])}
                }

                @keyframes pulsate-red {
                    100% {
                            ${this._getTextShadowAsString('red')}
                        }
                        0% {
                            ${this._getTextShadowFromArrayOfColorsAsString([
                                'white',
                                'white', 
                                'white', 
                                'white', 
                                'white', 
                                '#f87', 
                                '#f00', 
                                '#f00', 
                                '#f00',
                                '#f00'  
                            ])}
                        }
                    
                }





                .color-theme-inactive{
                    --button-border-color: rgba(120, 120, 120, 1);
                    --button-text-color: rgb(120, 120, 120);
                }
    
                .button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    overflow: hidden;
                    text-align: center;
                    color: var(--button-fg);
                    background-color: var(--button-bg);
                    font-family: Arial;
                    border: solid thin var(--button-border-color);
                    border-radius: 5px;
                    padding: var(--button-padding);
                    transition: 0.2s;
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
    
    
    
                .dark-sample-button:hover {
                    cursor: pointer;
                    background-color: var(--button-hover-bg);
                    color: var(--button-hover-fg);
                    transition: 0.2s;
                }
    
                .dark-sample-button:active {
                    background-color: var(--button-active-bg);
                    color: var(--button-active-fg);
                }
    
    
    
                .grow-button:hover {
                    cursor: pointer;
                    transform: scale(1.2);
                    transition: 0.2s;
                }
    
                .grow-button:active {
                    background-color: var(--button-active-bg);
                    transform: scale(1);
                    transition: 0.2s;
                }
    
    
                .shrink-button:hover {
                    cursor: pointer;
                    transform: scale(0.8);
                    transition: 0.2s;
                }
    
                .shrink-button:active {
                    background-color: var(--button-active-bg);
                    transform: scale(1);
                    transition: 0.2s;
                }   
    
                .circle-where-clicked-button:hover {
                    cursor: pointer;
                }
    
                .circle{
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
    
    
                
                </style>
                <div class = "button-wrapper">
                    <div class="button color-theme-blue position-right-top button-big" >
                        <span></span>
                    </div>
                </div>
            `
        }
    
    
}