class WaitingCircleGeneralClass {
    constructor(){
       this.supportedThemes = ['gray', 'blue', 'green'];
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