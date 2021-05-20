

class Navigator{
    constructor(menuElement, controlledElement){
        this.menu = menuElement;
        this.controlledElement = controlledElement;
        this.displayWindow = document.querySelector('.content-display')
        this.adjustAllContainersInControlledElement();
        window.addEventListener('resize', this.adjustAllContainersInControlledElement.bind(this))
        this.addEventsToAllNavButtons();
    }

    addEventsToAllNavButtons(){
        let navButtons = this.getMenuButtons();
        let addSingleEventListener = function(button) {
            button.addEventListener('click', this.onButtonClick.bind(this))
        }.bind(this);
        navButtons.forEach(addSingleEventListener)
    }

    adjustAllContainersInControlledElement(){
        let allContainers = this.controlledElement.querySelectorAll('.widgets-container');
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;
        Array.from(allContainers).forEach((item, index, arr) => {
            item.style.width = screenWidth + 'px';
            item.style.height = screenHeight + 'px';
            this.controlledElement.style.width = parseFloat(screenWidth) * arr.length;
        })
    }


    onButtonClick(e){
        let clickedButton = e.target;
        let bindedElement = document.getElementById(clickedButton.getAttribute('data-bind-with-id'));
        if (bindedElement == null) return null;
        let currentPosition = this.getCurrentPosition();
        let targetElementPosition = this.getElementsPositionRelativeToDisplayWindow(bindedElement)
        this.navigateWithAnimation(targetElementPosition)
    }

    getCurrentPosition(){return this.getElementsPositionRelativeToDisplayWindow(this.controlledElement)}

    navigateWithAnimation(targetPosition, nrOfFrames = 26, timeLimit = 350){
        let step = 0;
        let startPosition = this.getCurrentPosition();
        let delta = this.substractPositions(targetPosition, {x: 0, y: 0})
        let deltaStep = this.divPositionByScalar(delta, nrOfFrames);
        let moveWhileEndPosition = function(){
            step = step + 1;
            if  (step >= nrOfFrames) {clearInterval(interval)}
            if (step > 50) clearInterval(interval)
            let newPosition = this.substractPositions(startPosition, this.multiplyPositionByScalar(deltaStep, step))
            this.setNewPositionToElement(newPosition, this.controlledElement)
        }
        let interval = setInterval(moveWhileEndPosition.bind(this), timeLimit/nrOfFrames)
    }

    getElementsPositionRelativeToDisplayWindow(element){
        return this.getApositionRelativeToB(element, this.displayWindow)
    }


    getApositionRelativeToB(Aelement, Belement){
        let aPosition = this.getElementPosition(Aelement);
        let bPosition = this.getElementPosition(Belement);
        return this.substractPositions(aPosition, bPosition)
    }


    getElementPosition(element){
        let {left, top} = element.getBoundingClientRect();
        return {
            x: parseFloat(left), 
            y: parseFloat(top)
        }
    }

    divPositionByScalar(a, scalar)  {return this.takeScalarActionOnPosition(a, scalar, (a, scalar) => a / scalar)}

    multiplyPositionByScalar(a, scalar) {return this.takeScalarActionOnPosition(a, scalar, (a, scalar) => a * scalar)}

    addPosition(a, b) {return this.takeActionOnPositions(a, b, (a, b) => a + b)}

    substractPositions(a, b) {return this.takeActionOnPositions(a, b, (a, b) => a - b)}

    takeScalarActionOnPosition(a, scalar, actionFunction){
        return {
            x: actionFunction(parseFloat(a.x), scalar),
            y: actionFunction(parseFloat(a.y), scalar)
        }
    }

    takeActionOnPositions(a, b, actionFunction){
        return {
            x: actionFunction(parseFloat(a.x), parseFloat(b.x)),
            y: actionFunction(parseFloat(a.y), parseFloat(b.y))
        }
    }

    setNewPositionToElement(position, element){
        element.style.left = position.x + 'px';
        element.style.top = position.y + 'px';
    }

    getMenuButtons(){
        return Array.from(this.menu.querySelectorAll('.nav-button'))
    }
}


let navigator = new Navigator(document.querySelector('nav'), document.querySelector('.widget-container-wrapper'))