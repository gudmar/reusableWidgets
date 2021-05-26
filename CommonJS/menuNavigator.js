

class Navigator{
    constructor(menuElement, controlledElement){
        this.bgScaleFactor = 0.1;
        this.menu = menuElement;
        this.controlledElement = controlledElement;
        this.backgroundCanvas = null;
        this.displayWindow = document.querySelector('.content-display')
        this.lastClickedElement = this.controlledElement.children[0];
        this.adjustAllContainersInControlledElement();
        this.adjustBackgroundCanvasOnResize();
        window.addEventListener('resize', this.adjustAllContainersInControlledElement.bind(this))
        this.addEventsToAllNavButtons();
        this.applyBgEffectIfAvailable();
        
        this.indexOfLastClickedElement = 0;
    }

    applyBgEffectIfAvailable(){
        this.backgroundCanvas = document.querySelector('.background-effect-cover');
        if (this.backgroundCanvas == null) return null;
        let resizeBgCanvas = function(){
            let screenWidth = window.innerWidth;
            let screenHeight = window.innerHeight;
            let nrOfMenuSections = document.querySelectorAll('widgets-container').length;
            let contentContainerWidth = parseFloat(document.querySelector('.widget-container-wrapper').getBoundingClientRect().width);
            let bgCanvasWidth = (1 + (nrOfMenuSections - 1) * this.bgScaleFactor);


        }.bind(this)
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);

    }

    adjustBackgroundCanvasOnResize(){
        this.backgroundCanvas = document.querySelector('.background-effect-cover');
        if (this.backgroundCanvas == null) return null;
        let resizeBgCanvas = function(){
            let screenWidth = window.innerWidth;
            let screenHeight = window.innerHeight;
            let nrOfMenuSections = document.querySelectorAll('widgets-container').length;
            let contentContainerWidth = parseFloat(this.controlledElement.getBoundingClientRect().width);
            let bgCanvasWidth = (1 + (nrOfMenuSections - 1) * this.bgScaleFactor);
            this.backgroundCanvas.style.width = contentContainerWidth * 1.5 + 'px';    /// 1.5 - number unacceptable. Name it
            console.log(contentContainerWidth * this.bgScaleFactor + 'px')
        }.bind(this)
        resizeBgCanvas();
        window.addEventListener('resize', resizeBgCanvas);
        
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
        this.controlledElement.style.left = 
            parseFloat(this.controlledElement.style.left) - parseFloat(this.getElementsPositionRelativeToDisplayWindow(this.lastClickedElement).x) + 'px'
    }


    onButtonClick(e){
        let clickedButton = e.target;
        let clickedButtonsBindWithIdAttribValue = clickedButton.getAttribute('data-bind-with-id');
        let bindedElement = document.getElementById(clickedButtonsBindWithIdAttribValue);
        if (bindedElement == null) return null;
        let currentControlledElementPosition = this.getCurrentControlledElementPosition();
        let currentBackgroundPosition = this.getCurrentBackgroundPosition();
        let targetElementPosition = this.getElementsPositionRelativeToDisplayWindow(bindedElement)
        let targetBackgroundPosition = 
            this.multiplyPositionByScalar((this.substractPositions(targetElementPosition, currentControlledElementPosition)), this.bgScaleFactor);
        console.log(targetBackgroundPosition)
        this.backgroundCanvas.style.left = -targetBackgroundPosition.x + 'px'
        this.removeClickedClassFromEachNavButton();
        clickedButton.classList.add('nav-button-clicked')
        this.memorizeActivePage(clickedButtonsBindWithIdAttribValue);
        this.navigateWithAnimation(targetElementPosition) 
    }

    memorizeActivePage(pageId) {
        this.lastClickedElement = document.getElementById(pageId)
        // let allContainers = this.controlledElement.querySelectorAll('.widgets-container');
        // Array.from(allContainers).forEach((element, index) => {
        //     if (element.getAttribute('data-bind-with-id') == pageId) {
        //         this.indexOfLastClickedElement = index;
        //         return index
        //     }
        // })
        // return this.indexOfLastClickedElement;
    }

    removeClickedClassFromEachNavButton(){
        Array.from(document.querySelectorAll('.nav-button')).forEach((element) => {
            element.classList.remove('nav-button-clicked')
        })
    }

    getCurrentControlledElementPosition(){return this.getElementsPositionRelativeToDisplayWindow(this.controlledElement)}

    getCurrentBackgroundPosition() {
        if (this.backgroundCanvas == null) return null;
        return parseFloat(this.backgroundCanvas.getBoundingClientRect().width)
    }

    navigateWithAnimation(targetPosition, nrOfFrames = 26, timeLimit = 350){
        this.scrollElementWithAnimation({
            startPosition: this.getCurrentControlledElementPosition(),
            endPosition: targetPosition,
            scrolledElement: this.controlledElement,
            _nrOfFrames: nrOfFrames,
            _timeLimit: timeLimit
        })
    }
    animateBackground(targetPosition, nrOfFrames = 26, timeLimit = 350){
        if (this.backgroundCanvas == null) return null;
        this.scrollElementWithAnimation({
            startPosition: this.getCurrentBackgroundPosition(),
            endPosition: targetPosition,
            scrolledElement: this.backgroundCanvas,
            nrOfFrames: _nrOfFrames,
            timeLimit: _timeLimit
        })
    }

    // navigateWithAnimation(targetPosition, nrOfFrames = 26, timeLimit = 350){
    //     let step = 0;
    //     let startPosition = this.getCurrentControlledElementPosition();
    //     let delta = this.substractPositions(targetPosition, {x: 0, y: 0})
    //     let deltaStep = this.divPositionByScalar(delta, nrOfFrames);
    //     let moveWhileEndPosition = function(){
    //         step = step + 1;
    //         if  (step >= nrOfFrames) {clearInterval(interval)}
    //         if (step > 50) clearInterval(interval)
    //         let newPosition = this.substractPositions(startPosition, this.multiplyPositionByScalar(deltaStep, step))
    //         this.setNewPositionToElement(newPosition, this.controlledElement)
    //     }
    //     let interval = setInterval(moveWhileEndPosition.bind(this), timeLimit/nrOfFrames)
    // }

    scrollElementWithAnimation({startPosition, endPosition, scrolledElement, _nrOfFrames, _timeLimit}){
        let step = 0;
        let delta = this.substractPositions(endPosition, {x:0, y:0})
        let deltaStep = this.divPositionByScalar(delta, _nrOfFrames);
        let moveWhileEndPosition = function(){
            step = step + 1;
            if  (step >= _nrOfFrames) {clearInterval(interval)}
            if (step > 50) clearInterval(interval)
            let newPosition = this.substractPositions(startPosition, this.multiplyPositionByScalar(deltaStep, step))
            this.setNewPositionToElement(newPosition, scrolledElement)
        }
        let moveBACKGROUNDWhileEndPosition = function(){
            step = step + 1;
            if  (step >= _nrOfFrames) {clearInterval(intervalBG)}
            if (step > 50) clearInterval(intervalBG)
            let newPosition = this.substractPositions(startPosition, this.multiplyPositionByScalar(deltaStep, step*this.bgScaleFactor))
            this.setNewPositionToElement(newPosition, this.backgroundCanvas)
        }
        let interval = setInterval(moveWhileEndPosition.bind(this), _timeLimit/_nrOfFrames)
        let intervalBG = setInterval(moveBACKGROUNDWhileEndPosition.bind(this), _timeLimit/_nrOfFrames)
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