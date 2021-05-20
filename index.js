

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
        // console.log(screenWidth)
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
        console.log(currentPosition)
        let targetElementPosition = this.getElementsPositionRelativeToDisplayWindow(bindedElement)
        console.log(targetElementPosition)
        // console.log(currentPosition); console.log(targetElementPosition)
        let deltaPosition = this.substractPositions(currentPosition, targetElementPosition)
        this.navigateWithAnimation(targetElementPosition)
    }

    getCurrentPosition(){return this.getElementsPositionRelativeToDisplayWindow(this.controlledElement)}

    navigateWithAnimation(targetPosition, nrOfFrames = 26, timeLimit = 1000){
        let step = 0;
        let startPosition = this.getCurrentPosition();
        let delta = this.divPositionByScalar(this.substractPositions(targetPosition, startPosition), nrOfFrames)
        // console.log(delta)
        // debugger;
        // let moveWhileEndPosition = function(){
        //     if  (step >= nrOfFrames) {clearInterval(interval)}
        //     if (step > 50) clearInterval(interval)
        //     step = step + 1;
        //     let newPosition = this.substractPositions(startPosition, this.multiplyPositionByScalar(delta, step))
        //     // console.log(newPosition)
        //     this.setNewPositionToElement(newPosition, this.controlledElement)
        //     // debugger;
        // }.bind(this)
        delta = this.substractPositions(targetPosition, {x: 0, y: 0})
        let deltaStep = this.divPositionByScalar(delta, nrOfFrames);
        let moveWhileEndPosition = function(){
            step = step + 1;
            if  (step >= nrOfFrames) {clearInterval(interval)}
            if (step > 50) clearInterval(interval)
            
            let newPosition = this.substractPositions(startPosition, this.multiplyPositionByScalar(deltaStep, step))
            // console.log(newPosition)
            this.setNewPositionToElement(newPosition, this.controlledElement)
            // debugger;       
        }
        let interval = setInterval(moveWhileEndPosition.bind(this), timeLimit/nrOfFrames)
    }

    getElementsPositionRelativeToDisplayWindow(element){
        return this.getApositionRelativeToB(element, this.displayWindow)
    }

    divPositionByScalar(a, scalar) {
        return {
            x: parseFloat(a.x) / scalar,
            y: parseFloat(a.y) / scalar
        }       
    }

    multiplyPositionByScalar(a, scalar) {
        return {
            x: parseFloat(a.x) * scalar,
            y: parseFloat(a.y) * scalar
        }               
    }

    addPosition(a, b) {
        return {
            x: parseFloat(a.x) + parseFloat(b.x),
            y: parseFloat(a.y) + parseFloat(b.y)
        }
    }

    getApositionRelativeToB(Aelement, Belement){
        let aPosition = this.getElementPosition(Aelement);
        let bPosition = this.getElementPosition(Belement);
        return {
            x: parseFloat(aPosition.x) - parseFloat(bPosition.x),
            y: parseFloat(aPosition.y) - parseFloat(bPosition.y)
        }
    }


    getLeftTopAttribs(element){
        let isEmpty = function(val) {return val == "" || val == undefined || val == null ? true : false}
        let left = isEmpty(element.style.left) ? 0 : element.style.left;
        let top = isEmpty(element.style.top) ? 0 : element.style.top;
        // debugger;
        return {x: parseFloat(left), y: parseFloat(top)}
    }

    positionToFloat(position){
        if (position == undefined) return undefined;
        return {
            x: parseFloat(position.x),
            y: parseFloat(position.y)
        }
    }

    getElementsPositionById(id){
        return this.getElementPosition(document.getElementById(id))
    }

    getElementPosition(element){
        let {left, top} = element.getBoundingClientRect();
        return {
            x: parseFloat(left), 
            y: parseFloat(top)
        }
    }

    substractPositions(a, b) {
        let _a = this.positionToFloat(a)
        let _b = this.positionToFloat(b)
        return {
            x: a.x - b.x,
            y: a.y - b.y
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