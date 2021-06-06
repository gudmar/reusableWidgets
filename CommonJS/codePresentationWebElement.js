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
            pre{
                padding: 10px;
                border-radius: 6px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 0.7rem;
                line-height: 1rem;
                background-color: rgb(100, 100, 100);
                color: white;
                white-space: pre-wrap;
            }
            </style>
            ${contentAsString}
        `
    }
}
window.customElements.define('code-presentation', CodePresentationCustomWebElement)