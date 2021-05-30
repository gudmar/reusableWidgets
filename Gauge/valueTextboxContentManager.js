class ValueTextboxContentManager{
    constructor(managedBoxContext, maxLabelLength, minValue, maxValue){
        this.fullValueBoxContent = '';
        this.maxLabelLength = maxLabelLength;
        this.managedBoxContext = managedBoxContext;
        this.valueTooLong = this.isLabelTooLong();
        this.previousBoxValue = '';   
        this.maxValue = maxValue;
        this.minValue = minValue;
    }

    addEventsToManagedBox(){
        let startInputtingValue = function(){
            this.managedBoxContext.innerText = this.fullValueBoxContent;
            this.changeBoxContentElementToEditable();
            this.previousBoxValue = this.managedBoxContext.innerText
        }.bind(this)
        let stopInputtingValue = function(event){
            let newValue = this.managedBoxContext.innerText;
            this.changeBoxContentElementToNotEditable();
            console.log(this.validateValue(newValue))
            if (this.validateValue(newValue)) {
                this.fullValueBoxContent = parseFloat(newValue);
                this.previousBoxValue = newValue;
                this.managedBoxContext.innerText = this.prepareLabelToDisplay(newValue)
            } else {
                this.managedBoxContext.innerText = this.prepareLabelToDisplay(this.previousBoxValue)
                this.updateFullLableTooltipValue();
            }
        }.bind(this)
        let showFullLabelTooltip = function(){
            if (this.isLabelTooLong()){
                this.managedBoxContext.parentNode.querySelector('.full-value-tooltip').classList.remove('display-none')
            }
        }.bind(this)
        let hideFullLabelTooltip = function(){this.managedBoxContext.parentNode.querySelector('.full-value-tooltip').classList.add('display-none')}.bind(this)
        this.managedBoxContext.addEventListener('focus', startInputtingValue);
        this.managedBoxContext.addEventListener('input', this.displayUnvlidIfNeeded.bind(this));
        this.managedBoxContext.addEventListener('blur', stopInputtingValue);
        this.managedBoxContext.addEventListener('input', this.onValueChange.bind(this))
        this.managedBoxContext.addEventListener('mouseenter', this.addFullLabelTooltip.bind(this))
        this.managedBoxContext.addEventListener('mouseleave', this.removeFullLabelTooltip.bind(this))
    }

    updateFullLableTooltipValue(){
        debugger;
        this.managedBoxContext.parentNode.querySelector('.full-value-tooltip').innerText = this.fullValueBoxContent;
    }

    addFullLabelTooltip(){
        let template = `<div class = "full-value-tooltip">${this.fullValueBoxContent}</div>`
        let element = this.stringToElement(template);
        this.managedBoxContext.appendChild(element);
    }

    removeFullLabelTooltip(){
        try{
            this.managedBoxContext.querySelector('.full-value-tooltip').remove();
        } catch(err){

        }
    }

    stringToElement(htmlString){
        let template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.cloneNode(true)
    }

    onValueChange(){
        let newValue = this.managedBoxContext.innerText;
        if (!this.validateValue(newValue)) {this.showThatValueNotValid();}
        else {this.stopShowingThatValueNotValid()}
    }

    displayUnvlidIfNeeded(){
        let presentBoxValue = this.managedBoxContext.innerText;
        if (!this.validateValue(presentBoxValue)) this.showThatValueNotValid();
        else this.stopShowingThatValueNotValid();
    }

    validateValue(value){
        let parsedValue = parseFloat(value)
        if (isNaN(parsedValue)) return false;
        if (parsedValue < this.minValue) return false;
        if (parsedValue > this.maxValue) return false;
        return true;
    }

    showThatValueNotValid(){
        this.managedBoxContext.classList.add('input-not-valid');
    }

    stopShowingThatValueNotValid(){
        this.managedBoxContext.classList.remove('input-not-valid')
    }

    changeBoxContentElementToEditable(){
        // this.managedBoxContext.setAttribute('contenteditable', true);
        this.memorizeClasses();
        this.removeClassStyling();
        this.addStylingClassesToElement(this.managedBoxContext, ['editable-content']);
        this.managedBoxContext.innerText = this.fullValueBoxContent;
    }

    changeBoxContentElementToNotEditable(){
        this.removeClassStyling();
        this.restoreClassStyling();
        // this.fullValueBoxContent = this.managedBoxContext.innerText;
        // this.managedBoxContext.innerText = this.prepareLabelToDisplay(this.fullValueBoxContent);
        // this.managedBoxContext.setAttribute('contenteditable', false)
    }

    isManagedBoxEditable(){
        return this.managedBoxContext.classList.contains('editable-content')
    }

    addStylingClassesToElement(element, listOfClasses){
        for(let classItem of listOfClasses){
            element.classList.add(classItem)
        }
    }

    memorizeClasses(element = this.managedBoxContext){
        this.memorizedClasses = Array.from(element.classList)
    }

    restoreClassStyling(element = this.managedBoxContext){
        for (let classItem of this.memorizedClasses){
            element.classList.add(classItem)
        }
    }

    removeClassStyling(element = this.managedBoxContext){
        let classList = Array.from(element.classList)
        for (let classItem of classList) {
            element.classList.remove(classItem);
        }
    }

    prepareLabelToDisplay(label){
        let labelNotStartingFrom0 = parseFloat(label) + '';
        if (this.isLabelTooLong()) return labelNotStartingFrom0.slice(0, 2) + '..';
        return labelNotStartingFrom0;
    }

    isLabelTooLong(){
        let convetedFullBoxContent = this.fullValueBoxContent + '';
        return convetedFullBoxContent.length > this.maxLabelLength ? true : false;
    }
}