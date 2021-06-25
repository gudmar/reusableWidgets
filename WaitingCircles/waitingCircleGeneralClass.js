class WaitingCircleGeneralClass {
    constructor(){
       this.supportedThemes = ['gray', 'blue', 'green', 'red'];
    }

    startWaitingCircle(size, colorTheme){
        this.size = size;
        this.colorTheme = colorTheme;
        this.addStringContentToShadowRoot(this._getTemplate())
    }


    changeColorTheme(newColorTheme) {
        this.changeElementsColorThemeClassIfColorSupported(newColorTheme)
    }

    changeSize(newSize){
        this.changeElementSize(newSize)
    }

    stopWaitingCircle(){
        this.emptyShadowRoot();
        this.context.shadowRoot.innerHtml = '';
    }


    getElementFromHTML(htmlString){
        let template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.cloneNode(true)
    }

    getStylingForElementsLocatedOnCircle(nrOfElements, animationDelayDelta){
        let angleBetweenElements = 360 / nrOfElements;
        let output = '';
        for (let i = 0; i < nrOfElements; i++){
            output = output + `
            .element-located-on-circle-${i} {
                transform: translate(-50%, -50%) rotate(${angleBetweenElements * i}deg) translate(calc( 0.5 * var(--circle-diameter))) rotate(-${angleBetweenElements * 1}deg); 
                animation-delay: ${animationDelayDelta * i}ms;
            } `
        }
        return output;
    }

    getElementsToBeLocadetOnCircle(nrOfElements){
        let output = '';
        for (let i = 0; i < nrOfElements; i++){
            output = output + `<div class = 'element-located-on-circle element-located-on-circle-${i}'></div>`
        }
        return output;
    }

    getElement() {
        return this.context.shadowRoot.querySelector('.circle')
    }


    checkIfColorThemeIsSupported(colorThemeName){
        return this.supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
    }

    changeElementSize(newSize){
        this.changePartOfClassNameInElement('size-', newSize)
    }

    changeElementsColorThemeClassIfColorSupported(newColorTheme){
        if (!this.checkIfColorThemeIsSupported(newColorTheme)) {
            throw new Error(`${this.constructor.name}: ${newColorTheme} is not supported. Try one of ${this.supportedThemes}`)
        }
        this.changePartOfClassNameInElement('color-theme-', newColorTheme)
    }

    changePartOfClassNameInElement(classNamePattern, newPartOfClassToBeInserted){
        let oldClass = '';
        Array.from(this.getElement().classList).forEach((item, index) => {    
            if (item.indexOf(classNamePattern) != -1){oldClass = item}
        })
        if (oldClass != '') {this.getElement().classList.remove(oldClass)}
        this.getElement().classList.add(classNamePattern + newPartOfClassToBeInserted)
    }

    emptyShadowRoot(){
        let children = this.context.shadowRoot.children;
        Array.from(children).forEach((element, index) => {
            this.removeElement(element)
        })
    }

    removeElement(element){
        element.remove()
    }

    addStringContentToShadowRoot(stringContent){
        let template = document.createElement('template');
        template.innerHTML = stringContent;
        let elementToAdd = template.content.cloneNode(true)
        this.context.shadowRoot.appendChild(template.content.cloneNode(true))
    }


}