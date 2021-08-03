class CustomButtonGeneral{
    constructor(context){
        this.context = context;
        this.maxLabelLenght = 8;
        this.fullLabel = '';
        this.displayedLabel = '';
    }

    startButton({buttonType, labelFromAttrib, colorTheme, isActive, onclick}){
        let getShorterLabel = labelFromAttrib;
        let labelToDisplay = this.getShorterLabelIfLabelTooLong(labelFromAttrib);
        this.addStringContentToShadowRoot(this._getTemplate())
        this.setButtonType(buttonType);
        this.setButtonLabel(labelFromAttrib)
        this.addTooltipEvents();
        // this.changeOnclickFunction(onclick)
    }

    stopButton(){
        this.removeTooltipEvents();
        this.emptyShadowRoot();
    }
    

    setButtonType(buttonType){
        this.context.shadowRoot.querySelector('.button').classList.add(buttonType)
    }

    changeButtonColorThemeClass(colorThemeName){
        let targetElement = this.context.shadowRoot.querySelector('.button')
        let colorClassPattern = 'color-theme-'
        let oldThemeClass = '';
        Array.from(targetElement.classList).forEach((item, index) => {                
            if (item.indexOf(colorClassPattern) != -1){oldThemeClass = item}
        })
        if (oldThemeClass != '') {targetElement.classList.remove(oldThemeClass)}
        targetElement.classList.add(colorClassPattern + colorThemeName)
    }

    setButtonLabel(newLabel){
        this.fullLabel = newLabel;
        let shortenedLabel = this.getShorterLabelIfLabelTooLong(this.fullLabel)
        this.displayedLabel = shortenedLabel;
        this.context.shadowRoot.querySelector('.button>span').innerHTML = shortenedLabel;
    }

    getShorterLabelIfLabelTooLong(labelToShorten){
        if (labelToShorten.length <= this.maxLabelLenght) return labelToShorten
        let getShorterLabel = function(label){return label.substring(0, this.maxLabelLenght - 3)}.bind(this)
        return getShorterLabel(labelToShorten) + '...'
    }

    addTooltipEvents(){
        this.createTooltipFunctionInstance = this.createTooltipIfNeeded.bind(this)
        this.removeTooltipFunctionInstance = this.removeTooltipIfExists.bind(this)
        this.context.addEventListener('mouseenter', this.createTooltipFunctionInstance);
        this.context.addEventListener('mouseleave', this.removeTooltipIfExists.bind(this));
    }

    removeTooltipEvents() {
        this.context.removeEventListener('mouseenter', this.createTooltipFunctionInstance);
        this.context.removeEventListener('mouseleave', this.removeTooltipFunctionInstance);
    }

    createTooltipIfNeeded(){
        if (this.fullLabel.length > this.maxLabelLenght){
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = this.fullLabel;
            this.context.shadowRoot.appendChild(tooltip)
        }
    }
    removeTooltipIfExists(){
        let tooltip = this.context.shadowRoot.querySelector('.tooltip');
        if (tooltip != null) {this.context.shadowRoot.removeChild(tooltip)}
    }


    changeColorTheme(newColorTheme) {
        this.changeElementsColorThemeClassIfColorSupported(newColorTheme)
    }

    setButtonToInactiveState({buttonType}){
        this.changeButtonColorThemeClass('inactive')
        this.context.shadowRoot.querySelector('.button').classList.remove(buttonType)
    }

    setButtonToActiveState({colorTheme, buttonType}){
        this.changeButtonColorThemeClass(colorTheme)
        this.context.shadowRoot.querySelector('.button').classList.add(buttonType)
    }


    getElementFromHTML(htmlString){
        let template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.cloneNode(true)
    }

    getElement() {
        return this.context.shadowRoot.querySelector('.button')
    }


    changeElementsColorThemeClassIfColorSupported(newColorTheme){
        if (!this.checkIfColorThemeIsSupported(newColorTheme)) {
            throw new Error(`${this.constructor.name}: ${newColorTheme} is not supported. Try one of ${this.supportedThemes}`)
        }
        this.changePartOfClassNameInElement('color-theme-', newColorTheme)
    }



    checkIfColorThemeIsSupported(colorThemeName){
        let supportedThemes = ['green', 'blue', 'red'];
        return supportedThemes.indexOf(colorThemeName) == -1 ? false : true;
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
        this.context.shadowRoot.appendChild(template.content.cloneNode(true))
    }



}