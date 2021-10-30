class WheelControlWrapper extends StateHandlingAbstractComponent {
    constructor(){
        super();
        this.supportedNodeNames = [
            'SPINNING-WHEEL', 
            'SPINNING-WHEEL-INFO', 
            'EDITING-WHEEL-STATE-LIST', 
            'EDITING-WHEEL-STATE-LIST-RESPONSIVE', 
            'WHEEL-ALIKE-COMPONENTS-MEDIATOR',

        ]
        this.localStorageReferenceName = '';
    }

    static get observedAttributes() {
        return ['data-subscribers-ids']
    }

    attributeChangedCallback(attrName, oldVal, newVal){
        if (attrName == 'data-subscribers-ids'){
            this._restartManager();
            // this._state.items = stateFromHtmlAfterChange
            this._recreateThisComponent();
            this._emitEventOnStateChange();
            this._removeEventListenersFromEachSubscriber()
            this._updateEachSubscriberOnThisInnerHtmlChange()
            this._addEventListenersToEachSubscribent();
        }
    }

    connectedCallback(){
        this._getState()
        this.subscribersStates = this._getSubscribersStates()
        if (this.querySelector('ul') == null) return null
        // if (this.querySelector('li') == null) return null
        this._updateEachSubscriberOnThisInnerHtmlChange()
        this._addEventListenersToEachSubscribent();       
        this.setLocalStorageReferenceName();         
        this.fillContentFromLocalStorage();

        this.shadowRoot.querySelector('#saveWaitingCircleButton').addEventListener('click', this.saveContentToLocalStorage.bind(this))
        this.shadowRoot.querySelector('#loadContent').addEventListener('click', this.fillContentFromLocalStorage.bind(this))
        this.shadowRoot.querySelector('#clearContent').addEventListener('click', this.clearLocalStorageContent.bind(this))
    }

    setLocalStorageReferenceName(){
        this.localStorageReferenceName = `spinning-wheel-memory-${this.getAttribute('id')}`
    }

    disconnectedCallback(){
        this._removeManager();
    }


    _onInnerHTMLChange(mutationsList, observer){
        this._getState();
        // if (mutationsList[0].type == 'attributes') {
        //     this._restartManager();
        //     return null
        // }
        // if (this.querySelector('ul') == null) return null
        // if (this.querySelector('li') == null) return null

        let getItemsToCompare = function(arrayOfItems){
            let output = arrayOfItems.map((item) => {
                const {label, isHidden, message} = item
                return {label, isHidden, message}
            })
            return output
        }
        let mutationTarget = mutationsList[0].target;
        let getUlAfterChange = function(){
            return this.querySelector('ul')
            if (mutationTarget.nodeName == "LI") {return mutationTarget.parentNode;}
            else if (mutationTarget.nodeName == "UL") {return mutationTarget}
            else {return mutationTarget.querySelector('ul')}
        }.bind(this)
        let getStateCopyAfterChange = function(){
            return  this._copyArrayOfObjects(this._getListOfEntriesFromInnerHTML.call(getUlAfterChange(mutationTarget)))
        }.bind(this)
        let currnetState = this._copyArrayOfObjects(this._getState().items)
        let stateFromHtmlAfterChange = getStateCopyAfterChange()
        // debugger;
        if (!Comparator.areStatesEqual(getItemsToCompare(currnetState), getItemsToCompare(stateFromHtmlAfterChange))){
            this._state.items = stateFromHtmlAfterChange
            this._recreateThisComponent();
            this._emitEventOnStateChange();
            this._removeEventListenersFromEachSubscriber()
            this._updateEachSubscriberOnThisInnerHtmlChange()
            this._addEventListenersToEachSubscribent();
        }
    }


    _restartManager(){
        this._removeManager()
        this._getState();
        this.subscribersStates = this._getSubscribersStates()
        this._addEventListenersToEachSubscribent();
    }

    _removeManager(){
        this._removeEventListenersFromEachSubscriber();
        this._state = undefined;
        // this._getState();
        this.subscribersStates = undefined;
    }


    // _recreateThisComponent(){
        
    // }


    _addEventListenersToEachSubscribent(){
        for(let subscriber in this.subscribersStates){
            document.getElementById(subscriber).addEventListener(this.COMPONENT_STATE_CHANGED, this.subscribersStates[subscriber].eventListenerCallback)
        }
    }


    _removeEventListenersFromEachSubscriber(){
        for(let subscriber in this.subscribersStates){
            document.getElementById(subscriber).removeEventListener(this.COMPONENT_STATE_CHANGED, this.subscribersStates[subscriber].eventListenerCallback)
        }        
    }



    _getSubscribersStates(){
        let validSubscribers = {};
        let fillSubscribers = function(id) {
            let currentElement = document.getElementById(id);
            if (currentElement == null || currentElement == undefined) {
                console.warn(`${this.constructor.name}: Element with id ${id} not found`)
                return ''
            }
            if (this.supportedNodeNames.includes(currentElement.nodeName)) {
                validSubscribers[id] = (this._getSubscriberDescriptor(currentElement))
                console.log(`${currentElement.nodeName} is supported`)
            } else {
                console.warn(`Element ${currentElement.noteName} not supported by ${this.constructor.name}`)
            }
        }.bind(this)
        this._getListOfSubscriberIds().forEach((id) => fillSubscribers(id));
        return validSubscribers
    }


    _getSubscriberDescriptor(element) {
        return {
            listOfItems: this._getTargetsListOfDescriptors(element),
            eventListenerCallback: this._updateThisInnerHtmlOnSubscribersChange.bind(this),
            isProcessed: false  // is this really needed
        }
    }


    _updateEachSubscriberOnThisInnerHtmlChange() {
        let newUlDescriptor = this._getTargetsListOfDescriptors(this) 
        let updateSingleSubscriber = function(id) {
            let currentElement = document.getElementById(id)
            this._changeTargetElementsUlElement(currentElement, newUlDescriptor)
        }.bind(this)
        Object.keys(this.subscribersStates).forEach((id) => {updateSingleSubscriber(id)})      
    }


    _updateThisInnerHtmlOnSubscribersChange(event) {
        let procedureInitiatorId = event.target.id
        let newUlDescriptor = this._getTargetsListOfDescriptors(event.target)
        let currentDescriptor = this._getTargetsListOfDescriptors(this)
        if (!Comparator.areStatesEqual(newUlDescriptor, currentDescriptor)){
            this._changeTargetElementsUlElement(this, newUlDescriptor)
        }  
    }


    _changeTargetElementsUlElement(targetElement, newUlDescriptor) {
        try{
            this._removeElement.call(targetElement, targetElement.querySelector('ul'))
        } catch(e) {
            // ul element already does not exist
        }
        targetElement.appendChild(this._stringToElement(this._makeUlFromDescirptor(newUlDescriptor)))
    }


    _makeUlFromDescirptor(ulDescriptor){
        try{
            return `<ul>${this._listToHtmlString(ulDescriptor, this._createSingleLiFromStateItemAsString.bind(this))}</ul>`
        } catch(e) {
            return `<ul></ul>`
        }
        
    }


    _getTargetsListOfDescriptors(element){
        let listOfListElements = element.querySelectorAll('li');
        let getLiDescriptor = this._getSingleLiDescriptor.bind(this)
        return Array.from(listOfListElements).map(getLiDescriptor)
    }


    _getSingleLiDescriptor(liElement){
        let _isHidden = liElement.classList.contains('hidden') ? true : false;
        let _label = liElement.getAttribute('data-label');
        _label = (_label == undefined || _label == null) ? this._getNextUniqueLabel() : _label
        let _message = liElement.innerText;
        return {
            label: _label,
            message: _message,
            isHidden: _isHidden
        }
    }


    _getNextUniqueLabel() {
        // console.warn(`${this.constructor.name}: implement getNextUniqueLabel`)
        return ''
    }


    _getListOfSubscriberIds(){
        let subscriberIds = this.getAttribute('data-subscribers-ids');
        if (subscriberIds == null || subscriberIds == undefined) return []
        return subscriberIds.split(',').map((item) => {return item.trim()});
    }


    _getTemplate(){
        return `
            <style>
                :host{
                    // display: none;
                }
                ul {
                    display: none;
                }
            </style>
                <custom-button-1 data-label="save wheel content" id="saveWaitingCircleButton" data-element-subtype="grow-button" data-color-theme="blue"></custom-button-1>
                <custom-button-1 data-label="load content" id="loadContent" data-element-subtype="grow-button" data-color-theme="blue"></custom-button-1>
                <custom-button-1 data-label="clear content" id="clearContent" data-element-subtype="grow-button" data-color-theme="blue"></custom-button-1>
            <ul></ul>
        `
    }

    saveContentToLocalStorage(){
        localStorage.setItem(this.localStorageReferenceName, JSON.stringify(this.getCurrentContet()))
    }

    getContentFromLocalStorage(){
        return JSON.parse(localStorage.getItem(this.localStorageReferenceName))
    }

    fillContentFromLocalStorage(){        
        let contentFromStorage = this.getContentFromLocalStorage();
        let innerUl = this.querySelector('ul');
        let output = '';
        if (contentFromStorage != null && contentFromStorage != undefined){
            for (let item of contentFromStorage){
                output = output + `<li data-label = "${item.label}">${item.content}</li>`
            }
            innerUl.innerHTML = output;
        }
        this._updateEachSubscriberOnThisInnerHtmlChange()
    }
    clearLocalStorageContent(){
        localStorage.clear();
    }


    getCurrentContet(){
        let output = [];
        let contentHandlingElements = this.querySelectorAll('li')
        let getSingleRowContent = function(liDocumentElement){
            let label = liDocumentElement.getAttribute('data-label');
            let content = liDocumentElement.innerText;
            return {
                label: label,
                content: content
            }
        }
        contentHandlingElements.forEach((element, index) => {
            output.push(getSingleRowContent(element))
        })
        return output;
    }
}


window.customElements.define('wheel-alike-components-mediator', WheelControlWrapper)