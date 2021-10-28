class CubeWaitingCircle extends WaitingCircleGeneralClass{
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

        .color-theme-blue{
            --cube-border-color: blue;
        }
        .color-theme-green{
            --cube-border-color: green;
        }
        .color-theme-red{
            --cube-border-color: red;
        }
        .color-theme-gray{
            --cube-border-color: gray;
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
        
        <div class="circle wrapper center size-${this.size}">
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