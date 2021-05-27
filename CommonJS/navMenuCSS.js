

class Navigator{
    constructor(menuElement, controlledElement, bgElement){
        this.bgScaleFactor = 0.5;
        this.menu = menuElement;
        this.controlledElement = controlledElement;
        this.backgroundCanvas = bgElement
        this.displayWindow = document.querySelector('.content-display')
        this.lastClickedElement = this.controlledElement.children[0];
        this.menuButtons = this.getMenuButtons();
        this.screenContainers = Array.from(this.controlledElement.querySelectorAll('.widgets-container'))
    }

    addEvents(){
        let addEventToButton = function(button){
            button.addEventListener('click', this.onButtonClick.bind(this))
        }.bind(this)
        this.menuButtons.forEach((button) => {addEventToButton(button)})
    }

    indexOfClickedElement(event){
        return Array.from(this.menuButtons).indexOf(event.target)
    }

    indexOfScreenContainerFromId(id){
        return this.screenContainers.findIndex((element) => {return id == element.id})
    }

    onButtonClick(event){
        let bindedId = event.target.getAttribute('data-bind-with-id');
        let nrOfChosenScreenContainer = this.indexOfScreenContainerFromId(bindedId);
        this.changeNavigationClass(`movable-${nrOfChosenScreenContainer}`)
        this.clearNavButtonsClicked();
        event.target.classList.add('nav-button-clicked')
    }
    changeNavigationClass(newClassName){
        let oldClassName = null;
        Array.from(this.controlledElement.classList).forEach((element, index) => {
            if (element.indexOf('movable-') != -1) {oldClassName = element}
        })
        this.controlledElement.classList.add(newClassName);
        try{
            this.controlledElement.classList.remove(oldClassName);
        } catch {
            // Probably button did not contain this class
        }
    }

    clearNavButtonsClicked(){
        this.menuButtons.forEach((element) => {
            try {
                element.classList.remove('nav-button-clicked')
            } catch {
                // Probably button did not contain this class
            }
        })
    }


    getMenuButtons(){
        return Array.from(this.menu.querySelectorAll('.nav-button'))
    }
}


let navigator = new Navigator(document.querySelector('nav'), document.querySelector('.widget-container-wrapper'))
navigator.addEvents();