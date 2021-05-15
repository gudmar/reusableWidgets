

function openModalOnButtonClick(contentDescriptor){
    if (this.getAttribute('data-is-active')){
        let modalContent = WidgetDetailsDB.getDetailsAbout(contentDescriptor)
        openModalWithContent(modalContent)    
    }
}

function openModalWithContent(contentAsString){
    let modal = document.createElement('killable-modal');
    // modal.innerHTML = contentAsString;
    let content = new CodePresentationCustomWebElement(contentAsString)
    modal.insertElementToKillableModal(content)
    document.querySelector('body').appendChild(modal)
}

function elementFromString(stringElement){
    let template = document.createElement('template')
    template.innerHTML = stringElement;
    return template.content.cloneNode(true)
}