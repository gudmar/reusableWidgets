class WaitngCircleGeneralClass {
    constructor(){
       this.supportedThemes = ['gray', 'blue', 'green'];
       console.log(this)
    }


    checkIfColorThemeIsSupported(colorThemeName){
        return this.supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
    }

    changeElementSize(newSize){
        console.dir(this)
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
        console.log(classNamePattern + newPartOfClassToBeInserted)
    }


}