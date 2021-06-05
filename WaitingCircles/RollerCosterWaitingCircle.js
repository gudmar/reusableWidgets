class RollerCosterWaitingCircle extends WaitingCircleGeneralClass{
    constructor(context){
        super();
        this.context = context; // this from customWebComponent
    }


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
            transform: translateX(-50%);
            z-index: 25

        }

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

        <div class="roller-coster-waiting-circle size-small circle color-theme-${this.colorTheme}">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        `
    }
}