class CubeWaitingCircle_DarkTheme extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context; // this from customWebComponent
        this.animationDuration = 2;
    }


    _getTemplate(){
        return `
        <style>
        *{
            --border-width: 3px;
            font-family: Arial;
        }
        .size-small{
            --cube-side-size: 40px;
        }
        .size-medium{
            --cube-side-size: 60px;
        }
        .size-big{
            --cube-side-size: 100px;
        }

        .color-theme-blue>div>div{
            --cube-border-color: rgb(200, 200, 255);
        }
        .color-theme-green>div>div{
            --cube-border-color: rgb(200, 255, 200);
        }
        .color-theme-red>div>div{
            --cube-border-color: rgb(255, 200, 200);
        }
        .color-theme-gray{
            --cube-border-color: rgb(220, 220, 220);
        }

        .color-theme-green>div>div{
            box-shadow: 
                0 0 7px   #0f7,
                0 0 10px  #0f7,
                0 0 20px  #0f7,
                0 0 40px  #0f7,
                0 0 80px  #0f7,
                0 0 90px  #0f7,
                inset 0 0 7px   #0f7,
                inset 0 0 10px  #0f7,
                inset 0 0 20px  #0f7,
                inset 0 0 50px  #0f7,
                inset 0 0 40px  #0f7;               
            z-index: 130;
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

        .color-theme-blue>div>div{
            box-shadow: 

            z-index: 130;
        }


        .color-theme-red>div>div{
            box-shadow: 
                0 0 7px   #f70,
                0 0 10px  #f70,
                0 0 20px  #f70,
                0 0 40px  #f70,
                0 0 80px  #f70,
                0 0 90px  #f70,
                inset 0 0 7px   #f70,
                inset 0 0 10px  #f70,
                inset 0 0 20px  #f70,
                inset 0 0 50px  #f70,
                inset 0 0 40px  #f70;
            z-index: 130;
        }


        .color-theme-gray>div>div{
            box-shadow: 
                0 0 7px   #aaa,
                0 0 10px  #aaa,
                0 0 20px  #aaa,
                0 0 40px  #aaa,
                0 0 80px  #aaa,
                0 0 90px  #aaa,
                inset 0 0 7px   #aaa,
                inset 0 0 10px  #aaa,
                inset 0 0 20px  #aaa,
                inset 0 0 50px  #aaa,
                inset 0 0 40px  #aaa;
            z-index: 130;
        }


        .center{
            display: flex;
            justify-content: center;
            justify-items: center;
            align-items: center;
            position: relative;
        }
        
        .scene{
            perspective: 600px;
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
        
        <div class="wrapper center size-${this.size}">
            <div class="cube rotate circle color-theme-${this.colorTheme}">
                <div class="placer">
                    <div class="wall center front"></div>
                    <div class="wall center back"></div>
                    <div class="wall center top"></div>
                    <div class="wall center bottom"></div>
                    <div class="wall center left"></div>
                    <div class="wall center right"></div>
                </div>
            </div>
        </div>
        
`
    }
}