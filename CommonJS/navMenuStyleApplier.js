class NavigatorStyleApplier {
    constructor(){
        this.nrOfScreans = document.querySelectorAll('.widgets-container').length;
        this.backgroundMoveStepFactor = 0.1;
        this.backgroundCanvasScaleFactor = 1.5;
    }

    reattachStyle(){
        document.querySelector('#navigatorStyleId').remove;
        this.attachStyle();
    }

    attachStyle(){
        document.querySelector('head').appendChild(this.elementFromText(this.getStyleElement()))
    }

    getStyleElement(){
        return `
            <style id='navigatorStyleId'>
                .background-effect-cover{
                    width: ${this.nrOfScreans * this.backgroundCanvasScaleFactor *100}vw;
                }
                .movable {
                    position: relative;
                    
                }
                ${this.getAllMovableClasses()}
            </style>
        `
    }



    getAllMovableClasses(){
        let output = '';
        for (let i = 0; i < this.nrOfScreans; i++){
            output = output + `
                .movable-content-${i}{
                    transition: left 1s, width 0s;
                    left: ${100 * -i}vw;
                }
                .movable-background-${i}{
                    transition: left 1s, width 0s;
                    left: ${(100 * -i) * this.backgroundMoveStepFactor - 2}vw;
                }
            `
        }
        return output;
    }

    elementFromText(text){
        let template = document.createElement('template');
        template.innerHTML = text
        return template.content.cloneNode(true)
    }
}

let applier = new NavigatorStyleApplier()
applier.attachStyle()