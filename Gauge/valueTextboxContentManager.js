class ValueTextboxContentManager{
    constructor(managedBoxContext, maxLabelLength, maxValue, minValue){
        this.fullValueBoxContent = '';
        this.maxLabelLength = maxLabelLength;
        this.managedBoxContext = managedBoxContext;
        this.valueTooLong = this.isLabelTooLong();
        this.previousBoxValue = '';   
        this.maxValue = maxValue;
        this.minValue = minValue;
    }

    addEventsToManagedBox(){
        this.managedBoxContext.addEventListener('click', this.changeBoxContentElementToEditable.bind(this));
        document.querySelector('body').addEventListener('click', this.changeBoxContentElementToNotEditable(this));
        this.managedBoxContext.addEventListener('input', this.onValueChange.bind(this))
    }

    onValueChange(){
        let newValue = this.managedBoxContext.innerText;
        if (!this.validateValue(newValue)) {
            this.showThatValueNotValid();
            this.managedBoxContext.innerText = this.previousBoxValue;
            return false
        }
        this.previousBoxValue = newValue
    }

    validateValue(value){
        let parsedValue = parseFloat(value)
        if (isNaN(parsedValue)) return false;
        if (parsedValue < this.minValue) return false;
        if (parsedValue > this.maxValue) return false;
        return true;
    }

    showThatValueNotValid(){
        let onTimeout = function(){this.managedBoxContext.classList.remove('input-not-valid')}.bind(this)
        this.managedBoxContext.classList.add('input-not-valid');
        this.setTimeout(onTimeout, 300);
    }

    changeBoxContentElementToEditable(){
        if (this.isManagedBoxEditable()) return false;
        this.fullValueBoxContent.setAttribute('contenteditable', true);
        this.memorizeClasses();
        this.removeClassStyling();
        this.addStylingClassesToElement['editable-content'];
        this.managedBoxContext.innerText = this.fullValueBoxContent;
    }

    changeBoxContentElementToNotEditable(){
        if (!this.isManagedBoxEditable()) return false;
        this.removeClassStyling();
        this.restoreClassStyling();
        this.fullValueBoxContent = this.managedBoxContext.innerText;
        this.managedBoxContext.innerText = this.prepareLabelToDisplay(this.fullValueBoxContent);
        this.fullValueBoxContent.setAttribute('contenteditable', false)
    }

    isManagedBoxEditable(){
        return this.managedBoxContext.classList.contains('editable-content')
    }

    addStylingClassesToElement(element, listOfClasses){
        for(let classItem of listOfClasses){
            element.classList.add(classItem)
        }
    }

    memorizeClasses(element){
        this.memorizedClasses = classList = Array.from(element.classList)
    }

    restoreClassStyling(element){
        for (let classItem of this.memorizedClasses){
            element.classList.add(classItem)
        }
    }

    removeClassStyling(element){
        let classList = Array.from(element.classList)
        for (let classItem of classList) {
            element.classList.remove(classItem);
        }
    }

    prepareLabelToDisplay(label){
        if (this.isLabelTooLong) return label.slice(0, 2) + '..';
        return label;
    }

    isLabelTooLong(){
        return this.fullValueBoxContent.length > this.maxLabelLength ? true : false;
    }
}