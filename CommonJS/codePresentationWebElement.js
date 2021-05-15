class CodePresentationCustomWebElement extends HTMLElement{
    constructor(contentAsString){
        super();
        this.createContentFromTemplate(contentAsString)
    }


    createContentFromTemplate(contentAsString){
        let template = document.createElement('template')
        template.innerHTML = this._getTemplate(contentAsString);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }


    _getTemplate(contentAsString){
        return `
            <style>
            </style>
            ${contentAsString}
        `
    }
}
window.customElements.define('code-presentation', CodePresentationCustomWebElement)