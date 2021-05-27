class NavigatorStyleApplier {
    constructor(){
        this.nrOfScreans = document.querySelectorAll('.widgets-container').length
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
                .movable-${i}{
                    transition: 1s;
                    left: ${100 * -i}vw;
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