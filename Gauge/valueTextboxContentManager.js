class ValueTextboxContentManager{
    constructor(managedBoxContext, maxLabelLength, minValue, maxValue){
        this.fullValueBoxContent = '';
        this.maxLabelLength = maxLabelLength;
        this.managedBoxContext = managedBoxContext;
        this.valueTooLong = this.isLabelTooLong();
        this.previousBoxValue = '';   
        this.maxValue = maxValue;
        this.minValue = minValue;
        this.nrOfDititsToApproximation = 0;
        this.observer = new MutationObserver(this.innerHtmlChangeHandler.bind(this));
        this.observer.observe(this.managedBoxContext, {characterData: true, subtree: true})
    }

    innerHtmlChangeHandler(mutations){
        let handleSingleMutation = function(singleMutation){
            if (singleMutation.type == 'characterData'){
                this.onValueChange();
            }
        }.bind(this)
        mutations.forEach(handleSingleMutation)
    }

    setValue(value){
        if (value == this.previousBoxValue) return false;
        if (this.validateValue(value)){
            this.previousBoxValue = value;
            this.fullValueBoxContent = value;
            this.displayValue(value)
        }
    }

    changeApproximation(nrOfDititsToApproximation){
        this.nrOfDititsToApproximation = nrOfDititsToApproximation;
        this.previousBoxValue = this.approximate(this.previousBoxValue);
        this.fullValueBoxContent = this.approximate(this.fullValueBoxContent);
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
            
            if (this.validateValue(newValue)) {
                newValue = this.approximate(newValue)
                this.fullValueBoxContent = parseFloat(newValue);
                this.previousBoxValue = newValue;
                this.displayValue(newValue)
                this.emitValueBoxChangeEvent(newValue)
            } else {
                if ((this.previousBoxValue + '').trim() == "") {
                    this.managedBoxContext.innerText = '';
                    return false;
                }
                this.displayValue(this.previousBoxValue)
                // this.updateFullLableTooltipValue();
            }
        }.bind(this)
        let stopInputtingValueOnEnter = function(e){
            if (e.key == "Enter") {
                e.preventDefault();
                stopInputtingValue.call(this, e);
            }
        }.bind(this)
        this.managedBoxContext.addEventListener('focus', startInputtingValue);
        this.managedBoxContext.addEventListener('change', this.displayUnvlidIfNeeded.bind(this));
        this.managedBoxContext.addEventListener('blur', stopInputtingValue);
        this.managedBoxContext.addEventListener('input', this.onValueChange.bind(this))
        this.managedBoxContext.addEventListener('mouseenter', this.addFullLabelTooltip.bind(this))
        this.managedBoxContext.addEventListener('mouseleave', this.removeFullLabelTooltip.bind(this))
        this.managedBoxContext.addEventListener('keydown', stopInputtingValueOnEnter.bind(this))
    }

    displayValue(value){
        this.managedBoxContext.innerText = this.prepareLabelToDisplay(this.approximate(value))
    }

    emitValueBoxChangeEvent(value){
        let event = new CustomEvent('valueTextBoxChanged', {
            detail: {newValue: value}
        })
        this.managedBoxContext.dispatchEvent(event)
    }

    updateFullLableTooltipValue(){
        this.managedBoxContext.parentNode.querySelector('.full-value-tooltip').innerText = this.fullValueBoxContent;
    }

    addFullLabelTooltip(){
        if (this.isLabelTooLong()){
            let template = `<div class = "full-value-tooltip">${this.fullValueBoxContent}</div>`
            let element = this.stringToElement(template);
            this.managedBoxContext.appendChild(element);
        }
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
        console.log(convetedFullBoxContent.length)
        console.log(convetedFullBoxContent.length > this.maxLabelLength)
        return convetedFullBoxContent.length > this.maxLabelLength
    }

    approximate(value, nrOfDitits = this.nrOfDititsToApproximation){
        let multiplier = Math.pow(10, nrOfDitits);
        return Math.round(value * multiplier) / multiplier
    }
}