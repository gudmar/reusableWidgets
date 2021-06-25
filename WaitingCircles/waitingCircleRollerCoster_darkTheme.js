class RollerCosterWaitingCircle_DarkTheme extends WaitingCircleGeneralClass{
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
            --color-dark: white;
            --color-light: YellowGreen;
        }

        .color-theme-green>div{
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

        .color-theme-blue{
            --color-dark: rgb(250, 250, 255);
            --color-light: rgb(180, 180, 255);

        }
        .color-theme-blue>div{
            box-shadow: 
                0 0 7px   #07f,
                0 0 10px  #07f,
                0 0 20px  #07f,
                0 0 40px  #07f,
                0 0 80px  #07f,
                0 0 90px  #07f,
                0 0 100px #07f,
                0 0 150px #07f,
                0 0 170px #07f,
                0 0 200px #07f;
            z-index: 130;
        }
        .color-theme-gray{
            --color-dark: white;
            --color-light: rgb(220, 220, 220) ;
        }

        .color-theme-gray>div{
            box-shadow: 
                0 0 7px   #aaa,
                0 0 10px  #aaa,
                0 0 20px  #aaa,
                0 0 40px  #aaa,
                0 0 80px  #aaa,
                0 0 90px  #aaa,
                0 0 100px #aaa,
                0 0 150px #aaa,
                0 0 170px #aaa;
                0 0 200px #aaa;

            z-index: 130;
        }

        .color-theme-red{
            --color-dark: white;
            --color-light: rgb(220, 220, 220) ;
        }

        .color-theme-red>div{
            box-shadow: 
                0 0 7px   #f70,
                0 0 10px  #f70,
                0 0 20px  #f70,
                0 0 40px  #f70,
                0 0 80px  #f70,
                0 0 90px  #f70,
                0 0 100px #f70,
                0 0 150px #f70,
                0 0 170px #f70;
                0 0 200px #f70;

            z-index: 130;
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