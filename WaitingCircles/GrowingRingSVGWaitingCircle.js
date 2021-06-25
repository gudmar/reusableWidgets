class GrowingRingSVGWaitingCircle extends WaitingCircleGeneralClass{
    // depends on ArcDrawer.js from Gauge
    constructor(context){
        super();
        this.context = context;
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

        this.mutationOberver = new MutationObserver(this.onColorChange.bind(this))
    }

    onColorChange(mutationsList, observer){
        let colorClassOwnerElement = this.context.shadowRoot.querySelector('.circle')
        for (const mutation of mutationsList){
            if (mutation.type == 'attributes'){
                if (!colorClassOwnerElement.classList.contains(`color-theme-${this.colorTheme}`)){
                    this.colorTheme = this.context.getAttribute('data-color-theme');
                    this.arc.setAttributeNS(null, 'stroke', this.colorTheme)
                }
            }
        }
    }

    startWaitingCircle(size, colorTheme){
        this.size = size;
        this.colorTheme = colorTheme;
        this.addStringContentToShadowRoot(this._getTemplate());
        this.insertInitialSVGStartArc();
        this.arc = this.context.shadowRoot.querySelector('svg>path');
        this.animate();
        this.mutationOberver.observe(this.context.shadowRoot.querySelector('.circle'), 
             {attributes: true, childList: true, subtree: true })
    }

    //createArc(radius, positionXY, startAngle, endAngle, width, color, id)
    insertInitialSVGStartArc(){
        let svgElement = this.arcCreator.createArc(this.radius, {x: this.arcMiddlePoint.x, y: this.arcMiddlePoint.y}, 
        this.startAngle, this.deltaEndAngleMin, this.strokeWidth, this.colorTheme, this.id)
        this.context.shadowRoot.querySelector('.circle').appendChild(svgElement);
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
        .color-theme-red{
            --color-dark: red;
            --color-light: rgb(255, 180, 180) ;
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
          

        </style>

        
        <div class = "positioning-circle center">
            <div class="growing-ring-waiting-circle size-small circle color-theme-${this.colorTheme}"></div>
        </div>
        `

    }

}