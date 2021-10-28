
// // TO BE DELETED AFTER TESTING ATTRIBUTE CHANGES ON ELEMENT IN PRESETER FOLDER

// class SingleElementPresenter extends HTMLElement{
//     constructor(){
//         super();
//         this.wrappedElementType = this.getAttributeOrDefault('data-element-type', 'custom-button');
//         this.wrappedElementSubtype = this.getAttributeOrDefault('data-element-subtype', 'sample-button')
//         this.presenterDarkLightTheme = this.getAttributeOrDefault('data-presenter-light-dark-theme', 'light')
//         this.addTemplate();
//         this.presenterWrapper = this.shadowRoot.querySelector('.wrapper')
//         this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
//         this.labelInput = this.shadowRoot.querySelector('input')
//         this.content = this.shadowRoot.querySelector('.content')
//         this.acitivatingSwitch = this.shadowRoot.querySelector('#acitveButtonSwitchId')
//         this.colorChoser = this.shadowRoot.querySelector('#colorChoserId')
//         this.sizeChoser = this.shadowRoot.querySelector('#sizeChoserId')
//         this.wrappedElement = this.shadowRoot.querySelector("#wrapped-element-id");
//         this.optionsMenuCloseButton = this.shadowRoot.querySelector('.close-button');
//         this.optionsMenu = this.shadowRoot.querySelector('.options');
//         this.optionsMenuOpenButton = this.shadowRoot.querySelector('.menu-oppener-button')
//         this.wrappedElementTitleHolder = this.shadowRoot.querySelector('.type-label')
//         this.updatePresentedElementType();

//         this.wholeElement = this.shadowRoot.querySelector('.wrapper')
//     }

//     getAttributeOrDefault(attirbuteName, defaultValue){
//         let attr = this.getAttribute(attirbuteName);
//         return attr == null || attr == undefined || attr == '' ? defaultValue : attr;
//     }

//     static get observedAttributes() {
//         return ['data-element-type', 'data-element-subtype', 'data-presenter-light-dark-theme']
//     }

//     attributeChangedCallback(attrName, oldVal, newVal){
//         if (attrName == 'data-element-type') this.changeElementType(newVal);
//         if (attrName == 'data-presenter-light-dark-theme') this.changePresenterColorTheme(oldVal, newVal);
//         if (attrName == 'data-element-subtype') this.changeWrappedElementSubtype(newVal);
//     }

//     changeElementType(){
//         // window.alert('Changing presenters wrapped element type is not implemented')
//     }

//     changePresenterColorTheme(oldVal, newVal){
//         let wrapper = this.shadowRoot.querySelector('.wrapper');
//         wrapper.classList.remove(oldVal);
//         wrapper.classList.add(newVal);
//     }

//     changeWrappedElementSubtype(newVal){
//         this.wrappedElement.setAttribute('data-element-subtype', newVal)
//     }

//     addTemplate(){
//         let template = document.createElement('template');
//         template.innerHTML = this._getTemplate();
//         let sh = this.attachShadow({mode: 'open'});
//         sh.appendChild(template.content.cloneNode(true))
//     }

//     connectedCallback() {
//         if (this.wrappedElementType == 'waiting-circle'){
//             this.wrappedElement.setAttribute('onclick', `SingleElementPresenter.openModalWithContent('${this.wrappedElementType}', '${this.wrappedElementSubtype}')`)
//         } 
//         if (this.wrappedElementType == "custom-button") {
//             this.wrappedElement.setAttribute('onclick', `SingleElementPresenter.openModalOnButtonClick('${this.wrappedElementType}', '${this.wrappedElementSubtype}')`)
//         }
//         if (this.wrappedElementType == "custom-button-1") {
//             this.wrappedElement.setAttribute('onclick', `SingleElementPresenter.openModalOnButtonClick('custom-button', '${this.wrappedElementSubtype}')`)
//         }
//         this.setEventsOnWrappedElement();
//         this.addCloseButtonAction();
//         this.addWrappedElementTitle();
//     }

//     addWrappedElementTitle() {
//         this.wrappedElementTitleHolder.innerHTML = this.wrappedElementSubtype;
//     }

//     addCloseButtonAction(){
//         let hideOptionsMenu = function(){this.optionsMenu.classList.add('do-not-display')}.bind(this)
//         let showOptionsMenu = function(){this.optionsMenu.classList.remove('do-not-display')}.bind(this)
//         this.optionsMenuCloseButton.addEventListener('click', hideOptionsMenu);
//         this.optionsMenuOpenButton.addEventListener('click', showOptionsMenu);
//     }

//     updatePresentedElementType(){
//         this.wrappedElementSubtype = this.getAttribute('data-element-subtype')
//         this.wrappedElementSubtype = this.wrappedElementSubtype == undefined || this.wrappedElementSubtype == null ? '' : this.wrappedElementSubtype;
//         this.wrappedElement.setAttribute('data-element-subtype', this.wrappedElementSubtype) 
//     }

//     setEventsOnWrappedElement() {
//         if (this.wrappedElementType == 'waiting-circle'){this.sizeChoser.addEventListener('click', this.setSize.bind(this))}
//         if (this.wrappedElementType == 'custom-button'){
//             this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
//             this.labelInput.addEventListener('input', this.setLabelChange.bind(this))
//         }

//         if (this.wrappedElementType == 'custom-button-1'){
//             this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
//             this.labelInput.addEventListener('input', this.setLabelChange.bind(this))
//         }
//         if (this.wrappedElementType == 'line-gauge'){
//             let sizeControllingSlider = this.shadowRoot.querySelector('#size-controlling-slider')
//             let valueControllingSlider = this.shadowRoot.querySelector('#value-controlling-slider')
//             this.acitivatingSwitch.addEventListener('click', this.activateDisactivateButton.bind(this))
//             sizeControllingSlider.addEventListener('linear-gauge-changed-value', this.changeWrappedElementWidth.bind(this))
//             valueControllingSlider.addEventListener('linear-gauge-changed-value', this.changeWrappedElementValue.bind(this))
//             this.wrappedElement.addEventListener('linear-gauge-changed-value', this.changeTargetElementsValue.bind(this, valueControllingSlider))
//         }

//         if (this.wrappedElementType == 'percentage-gauge' || this.wrappedElementType == "degree-gauge"){
//             let controller = this.shadowRoot.querySelector('#wrapped-element-controller-id');
//             controller.addEventListener('linear-gauge-changed-value', this.changeWrappedElementValue.bind(this));
//             this.wrappedElement.addEventListener('gauge-changed-value', this.changeTargetElementsValue.bind(this, controller))
//         }

//         this.colorChoser.addEventListener('click', this.setColorTheme.bind(this))
//     }

//     changeTargetElementsValue(targetElement){
//         let newValue = this.wrappedElement.getAttribute('data-value');
//         targetElement.setAttribute('data-value', newValue)
//     }

//     changeWrappedElementWidth(e){
//         let newWidth = e.target.getAttribute('data-value');
//         this.wrappedElement.setAttribute('data-size', newWidth);
//     }
//     changeWrappedElementValue(e){
//         let newValue = e.target.getAttribute('data-value');
//         this.wrappedElement.setAttribute('data-value', newValue);
//     }

//     activateDisactivateButton() {
//         let isActivatingSwitchOn = this._stringOrBooleanToBoolean(this.acitivatingSwitch.getAttribute('data-is-on'))
//         let getActivationSwitchLabel = function () { return isActivatingSwitchOn ? 'disactivate' : 'activate' }
//         this.wrappedElement.setAttribute('data-is-active', isActivatingSwitchOn)
//         this.acitivatingSwitch.setAttribute('data-label', getActivationSwitchLabel())
//     }

//     setColorTheme() {
//         let colorTheme = this.colorChoser.getAttribute('data-position');
//         this.wrappedElement.setAttribute('data-color-theme', colorTheme)
//     }

//     setSize() {
//         let size = this.sizeChoser.getAttribute('data-position');
//         this.wrappedElement.setAttribute('data-size', size)
//         this.changePresenterElementSize(size)
//     }

//     changePresenterElementSize(newSize){
//         this.changePartOfClassNameInElement('size-', newSize)
//     }

//     changePartOfClassNameInElement(classNamePattern, newPartOfClassToBeInserted){
//         let oldClass = '';
//         Array.from(this.presenterWrapper.classList).forEach((item, index) => {    
//             if (item.indexOf(classNamePattern) != -1){oldClass = item}
//         })
//         if (oldClass != '') {this.presenterWrapper.classList.remove(oldClass)}
//         this.presenterWrapper.classList.add(classNamePattern + newPartOfClassToBeInserted)
//     }


//     setLabelChange() {
//         this.wrappedElement.setAttribute('data-label', this.labelInput.value)
//     }

//     static openModalOnButtonClick(elementType, elementSubtype) {
//         let openModalAfterDelay = function(){
//             setTimeout(()=>{
//                 SingleElementPresenter.openModalWithContent(elementType, elementSubtype)
//             }, 300);
//         }
//         openModalAfterDelay();
//     }
//     static openModalWithContent(elementType, elementSubtype) {
//         let content = null;
//         let modal = document.createElement('killable-modal');
//         if (elementType == 'waiting-circle') {
//             content = new CodePresentationCustomWebElement(WaitngCircleDetailsDB.getDetailsAbout(elementSubtype))

//             modal.insertElementToKillableModal(content);
//         }
//         if (elementType == 'custom-button') {
//             content = new CodePresentationCustomWebElement(ButtonDetailsDB.getDetailsAbout(elementSubtype))
//             modal.insertElementToKillableModal(content);
        
//         }
//         if (elementType == 'speed-gauge') {
//             content = this.stringToElement('Speed gauge description')
//             modal.insertElementToKillableModal(content)
//         }
//         if (elementType == 'degree-gauge' || elementType == 'percentage-gauge' || elementType == 'line-gauge' || elementType == 'speed-gauge') {
//             content = this.stringToElement('gauge description')
//             modal.insertElementToKillableModal(content)
//         }
//         document.querySelector('body').appendChild(modal)
//     }

//     static stringToElement (content){
//         let template = document.createElement('template');
//         template.innerHTML = this.content;
//         return template.content.cloneNode(true)
//     }
//     _getTemplate(){
//         return `
//             <style>
//             ::-webkit-scrollbar {
//                 width: 5px;
//               }
              
//               /* Track */
//               ::-webkit-scrollbar-track {
//                 box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.25); 
//                 border-radius: 20px 0 0 20px;
//               }
               
//               /* Handle */
//               ::-webkit-scrollbar-thumb {
//                 background: rgba(150, 150, 150, 0.5); 
//                 box-shadow: inset 0px 0px 5px -4px black; 
//                 -webkit-box-shadow: inset 0px 0px 5px -4px black; 
//                 border-radius: 3px 0 0 3px;
//               }
              
//               /* Handle on hover */
//               ::-webkit-scrollbar-thumb:hover {
//                 background:rgba(100, 100, 100, 0.5); 
//                 box-shadow: inset 0px 0px 15px -4px black;
//                 // -webkit-box-shadow: inset 0px 0px 15px -4px black; 
//                 // border-radius: 20px;
//               }

//                 .center{
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                 }
//                 :host{
//                     display: inline-block;
//                     margin: 20px;
//                 }
//                 .wrapper{
//                     display: flex;
//                     flex-direction: column;
//                     position: relative;
//                     border-radius: 5px;
//                     align-items: center;
//                 }
//                 .light{
//                     background-color: rgba(255, 255, 255, 0.5);
//                 }
//                 .light>.type-label{
//                     color: black;
//                 }
//                 .light>.menu-oppener-button{
//                     color: black;
//                 }
//                 .dark{
//                     background-color: rgba(0, 0, 0, 0.5);
//                 }
//                 .dark>.type-label{
//                     color: white;
//                 }
//                 .dark>.menu-oppener-button{
//                     color: white;
//                 }
//                 .size-small{
//                     width: 200px;
//                     height: 100px;
//                 }
//                 .size-medium{
//                     width: 200px;
//                     height: 150px;
//                 }
//                 .size-big{
//                     width: 200px;
//                     height: 200px;
//                 }


//                 .options{
//                     flex-direction: column;
//                     position: absolute;
//                     background-color: rgba(240, 240, 240, 0.9);
//                     border-radius: 5px;
//                     box-shadow: 7px 10px 6px 0px rgba(0,0,0,0.71);             
//                     z-index: 100;
//                     top: -4rem;
//                     height: 20rem;
                    
//                 }
//                 .options-content > *{
//                     margin-bottom:20px;
//                     margin-top:20px;
                    
//                 }
//                 .content{
//                     display: flex;
//                     flex-direction: column;
//                     position: relative;
//                     width: 100%;
//                     height: 100%;
//                 }
//                 .content>*{
//                     cursor: pointer;
//                     margin-top: 0.5rem;
//                     margin-bottom: 0.5rem;
//                 }
//                 .content>degree-gauge, .content>percentage-gauge, .content>speed-gauge, .content>line-gauge{
//                     cursor: default;
//                 }
//                 .close-button{
//                     position: relative;
//                     left: 90%;
//                     align-self: flex-end;
//                     align-self: end;
//                     margin: 0;
//                     margin-top: 0.5rem;
//                     cursor: pointer;
//                     width: 1rem;
//                     height: 1rem;
//                     color: white;
//                     background-color: rgb(220, 0, 0);
//                     border-radius: 50%;
//                     font-weight: bold;
//                     transition: 200ms;
//                 }
//                 .close-button:hover{
//                     transform: scale(1.5);
//                     transition: 200ms;
//                 }
//                 .close-button:active{
//                     transition: 200ms;
//                     transform: rotate(180deg);
//                     background-color: rgba(100, 100, 100);
//                     background-color: green;
//                 }

//                 input{
//                     height: 1.5rem;
//                     border-radius: 0.75rem;
//                     background: white;
//                     padding: 5px;
//                 }
//                 input:focus{
//                     outline: none;
//                     background-color: rgb(200, 250, 200);
//                 }

//                 .do-not-display{
//                     width: 0px;
//                     height: 0px;
//                     overflow: hidden;
//                     padding: 0;
//                     margin: 0;
//                 }
//                 .menu-oppener-button {
//                     width: 1.5rem;
//                     height: 1.5rem;
//                     position: absolute;
//                     line-height: 1.5rem;
//                     font-size: 1.5rem;
//                     z-index: 50;
//                 }
//                 .menu-oppener-placeholder {
//                     position: relative;
//                     align-self: flex-start;
//                     border-radius: 50%;
//                 }
//                 .endless-rotate{
//                     align-self: flex-start;
//                     left: 0px;
//                     top: 0px;
//                     border-radius: 50%;
//                     transition: 200ms;
//                     animation: infinite-rotation 1.5s linear infinite;
//                 }
//                 .menu-oppener-button:hover{
//                     cursor: pointer;
//                     font-size: 2.3rem;
//                     transform: scale(2);
//                     transition: 200ms;
//                 }
//                 @keyframes infinite-rotation{
//                     0% {transform: rotate(0);}
//                     100% {transform: rotate(360deg);}
//                 }

//                 .type-label{
//                     position: absolute;
//                     font-style: italic;
//                     font-family: Arial;
//                     bottom: 5px;
//                 }
//                 waiting-circe {
//                     z-index: 25;
//                     cursor: pointer;
//                 }
//                 .close-button-placeholder{
//                     position: relative;
//                     height: 1.5rem;
//                     margin: 0px;
//                 }
//                 .options-content{
//                     display: flex;
//                     align-items: center;
//                     flex-direction: column;
//                     position: relative;
//                     max-height: 18rem;
//                     overflow: auto;
//                     margin: 0px;
//                 }
//                 ${this.wrappedElementType == 'speed-gauge' ? '.menu-oppener-button {display: none;}':''}
//                 ${this.wrappedElementType == 'percentage-gauge' ? '.menu-oppener-button {display: none;}':''}
//                 ${this.wrappedElementType == 'degree-gauge' ? '.menu-oppener-button {display: none;}':''}
//             </style>

//             <div class = "wrapper size-${this.getPresenterElementSize()} ${this.presenterDarkLightTheme}">
//                 <div class = "center menu-oppener-button  endless-rotate">&#9881</div>
//                 <div class = "options do-not-display">
//                     <div class = "close-button-placeholder"><div class = "close-button center">&times;</div></div>
//                     <div class = 'options-content'>
//                         ${this.wrappedElementType == 'custom-button' ? this.getCustomButtonOptionsHtml() : ''}
//                         ${this.wrappedElementType == 'custom-button-1' ? this.getCustomButtonOptionsHtml() : ''}
//                         ${this.wrappedElementType == 'waiting-circle' ? this.getWaitingCircleOptionsHtml() : ''}
//                         ${this.wrappedElementType == 'line-gauge' ? this.getLineGaugeOptionsHtml() : ''}
//                         ${this.wrappedElementType == 'speed-gauge' ? this.getWaitingCircleOptionsHtml() : ''}
//                         ${this.wrappedElementType == 'degree-gauge' ? this.getWaitingCircleOptionsHtml() : ''}
//                         ${this.wrappedElementType == 'percentage-gauge' ? this.getWaitingCircleOptionsHtml() : ''}
//                     </div>
//                 </div>
//                 <div class = "content center">
//                     ${this.getWrappedElementAsStirng()}
//                 </div>
//                 <div class = "type-label"></div>
//             </div>
//             `
//     }

//     getPresenterElementSize(){
//         if (this.wrappedElementType == 'degree-gauge') return 'big'
//         if (this.wrappedElementType == 'percentage-gauge') return 'big'
//         if (this.wrappedElementType == 'speed-gauge') return 'big'
//         return 'small'
//     }

//     getWrappedElementAsStirng(){
//         if (this.wrappedElementType == 'custom-button') return `
//             <custom-button id = "wrapped-element-id" data-element-subtype = '${this.wrappedElementSubtype}' data-color-theme = 'blue'>Button</custom-button>
//         `
//         if (this.wrappedElementType == 'waiting-circle') return `
//             <waiting-circle id = "wrapped-element-id" data-element-subtype = '${this.wrappedElementSubtype}' data-color-theme = 'blue' data-size = 'small'></waiting-circle>
//         `
//         if (this.wrappedElementType == 'custom-button-1') return `
//         <custom-button-1 id = "wrapped-element-id" data-element-subtype = '${this.wrappedElementSubtype}' data-color-theme = 'blue'>Button</custom-button-1>
//         `
//         if (this.wrappedElementType == 'line-gauge') return `
//         <line-gauge id = "wrapped-element-id" data-label = "line-gauge" data-size= "150" data-color-theme = "blue" data-min-val = "30", data-max-val = "100", data-value = "50"></line-gauge>
//         `
//         if (this.wrappedElementType == 'speed-gauge') return `
//         <speed-gauge id = "wrapped-element-id"></speed-gauge>
//         `
//         if (this.wrappedElementType == 'degree-gauge') return `
//         <degree-gauge id = "wrapped-element-id"  data-label = "angle-gauge" data-approximate='1'></degree-gauge>
//         <line-gauge id = "wrapped-element-controller-id" data-label = "Gauge controller" data-size= "150" data-color-theme = "blue" data-min-val = "0", data-max-val = "360", data-value = "1"></line-gauge>
//         `
//         if (this.wrappedElementType == 'percentage-gauge') return `
//         <percentage-gauge id = "wrapped-element-id" data-value="85" data-label = "percentage-gauge" data-approximate='0'></percentage-gauge>
//         <line-gauge id = "wrapped-element-controller-id" data-label = "Gauge controller" data-size= "150" data-color-theme = "blue" data-min-val = "0", data-max-val = "100", data-value = "85"></line-gauge>
//         `
//         throw new Error(`${this.constructor.name} : ${this.wrappedElementType} is not supported.`)
//     }

//     getWaitingCircleOptionsHtml(){
//         return `
//             <multi-switch id="colorChoserId" data-label-set="blue,green,gray"></multi-switch>
//             <multi-switch id="sizeChoserId" data-label-set="small,medium,big"></multi-switch>
//         `
//     }
//     getCustomButtonOptionsHtml(){
//         return `
//             <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
//             <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
//             <input type = "text" placeholder = "Button caption..." value = ''></input>
//         `
//     }
//     getCustomGaugeOptionsHtml(){
//         return`
//             <div id="colorChoserId" data-label-set="blue,green,red">
//                 Option stylig is not supported by this component, just this id='colorChoserId' element is significant to avoid error
//             </div>
//         `
//     }
//     getLineGaugeOptionsHtml(){
//         return `
//             <multi-switch id="colorChoserId" data-label-set="blue,green,red"></multi-switch>
//             <slide-box id="acitveButtonSwitchId" data-is-on = 'true' data-label="disactivate"></slide-box>
//             <line-gauge id="size-controlling-slider" data-size= "100" data-label="Change size" data-color-theme = "blue", data-min-val = "100", data-max-val = "150", data-value = "140"></line-gauge>
//             <line-gauge id="value-controlling-slider" data-size= "100" data-label="Change value" data-color-theme = "blue", data-min-val = "30", data-max-val = "100", data-value = "50"></line-gauge>

//         `
//     }

//     _stringOrBooleanToBoolean(val) {
//         let output = val
//         if (typeof(val) == 'string') {
//             output = val == "false"?false:true;
//         }  
//         return output
//     }
// }

// window.customElements.define('single-element-presenter', SingleElementPresenter)