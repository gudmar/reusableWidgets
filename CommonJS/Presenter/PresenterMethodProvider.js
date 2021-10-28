class PresenterMethodProvider {
    constructor(context){
        this.context = context
        this.specyficStylingElement = null;
        this.optionsMenuOpenButton = this.context.shadowRoot.querySelector('.menu-oppener-button')
    }
setOnclick(stringToCall){
    // debugger
    
    this.wrappedElement.setAttribute('onclick', stringToCall)
}

addWrappedElement(id = 'wrapped-element-id'){
    // this.context.shadowRoot.appendChild(this.stringToElement(this.getElementSpecyficStyling()));
    let elementToAdd = this.stringToElement(this.getElementSpecyficTemplate(id))
    this.context.addWrappedElement(elementToAdd)
    this.addMenuToContext();
}


addCloseOpenMenu(){
    let hideOptionsMenu = function(){this.optionsMenu.classList.add('do-not-display')}.bind(this)
    let showOptionsMenu = function(){this.optionsMenu.classList.remove('do-not-display')}.bind(this)
    this.optionsMenuCloseButton.addEventListener('click', hideOptionsMenu);
    this.optionsMenuOpenButton.addEventListener('click', showOptionsMenu);
}

activateDisactivateButton() {
    let isActivatingSwitchOn = this._stringOrBooleanToBoolean(this.acitivatingSwitch.getAttribute('data-is-on'))
    let getActivationSwitchLabel = function () { return isActivatingSwitchOn ? 'disactivate' : 'activate' }
    this.wrappedElement.setAttribute('data-is-active', isActivatingSwitchOn)
    this.acitivatingSwitch.setAttribute('data-label', getActivationSwitchLabel())
}

changeWrappedElementValue(e){
    let newValue = e.target.getAttribute('data-value');
    this.wrappedElement.setAttribute('data-value', newValue);
}

changeTargetElementsValue(targetElement){
    let newValue = this.wrappedElement.getAttribute('data-value');
    targetElement.setAttribute('data-value', newValue)
}

changeWrappedElementWidth(e){
    let newWidth = e.target.getAttribute('data-value');
    this.wrappedElement.setAttribute('data-size', newWidth);
}

setColorTheme() {
    let colorTheme = this.colorChoser.getAttribute('data-position');
    this.wrappedElement.setAttribute('data-color-theme', colorTheme)
}

setLabelChange() {
    this.wrappedElement.setAttribute('data-label', this.labelInput.value)
}


addMenuToContext(){
    let menuTemplate = `
    <div class = "options do-not-display">
    <div class = "close-button-placeholder"><div class = "close-button center">&times;</div></div>
    <div class = 'options-content'>
        ${this.getMenuContentAsStirng()}
    </div>
</div>

    `
    this.context.addMenu(this.stringToElement(menuTemplate))
}


stringToElement (content){
    let template = document.createElement('template');
    template.innerHTML = content;
    return template.content.cloneNode(true)
}

_stringOrBooleanToBoolean(val) {
    let output = val
    if (typeof(val) == 'string') {
        output = val == "false"?false:true;
    }  
    return output
}
}