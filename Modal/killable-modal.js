// DEPENDENCIES:
// AbstractComponent -> abstractCustomWebComponent.js


class KillableModal extends AbstractComponent{
    constructor(){
        super()

        this.content = this.shadowRoot.querySelector('.modal-content')

        
    }

    insertElementToKillableModal(element){
        let contentHolder = this.shadowRoot.querySelector('.modal-content')
        contentHolder.innerHTML = '';
        contentHolder.appendChild(element)
    }

    nestChidElement(element){
        this.content.appendChild(element);
    }

    // static get observedAttributes() {
    //     return ['data-visible']
    // }

    connectedCallback(){
        this.closeButton = this.shadowRoot.querySelector('.modal-shut-button');
        this.closeButton.addEventListener('click', this._killMe.bind(this))
    }

    _killMe(){
        this._removeElement(this)
    }


    attributeChangedCallback(attrName, oldVal, newVal) {

    }


    _disableScroll(){
        window.addEventListener('touchmove', this._stopScroll);
        window.addEventListener('scroll', this._stopScroll);   
    }

    _enableScroll(scrollStopperFunction) {
        window.removeEventListener('touchmove', scrollStopperFunction);
        window.removeEventListener('scroll', scrollStopperFunction);
    }

    _stopScroll(){
        let x = window.scrollX;
        let y = window.scrollY;
        return {
            activate: function(e){
                window.scrollTo(x, y)
            }
        }
    }
    _onInnerHTMLChange() {
            this.content.innerHTML = this.innerHTML
    }

    _getTemplate(){
        return `
        <style>
        *{
            box-sizing: border-box;
        }
            .center{
                display: flex;
                justify-content: center;
                align-items: center;
                align-content: center;
            }
            .modal-cover{
                font-family: Arial, Helvetica, sans-serif;
                position: fixed;
                width: 100vw;
                height: 100vh;
                background-color: rgba(250, 250, 250, 0.5);
                top:0;
                left:0;
                z-index: 10000;
            }
            .modal-body{
                position: relative;
                width: 60%;
                max-width: 800px;
                height: 60%;
                background-color: rgb(200,200,200);
                border-radius: 10px;
                transition: 250ms;
            }
            .modal-title-bar{
                display: flex;
                justify-content: flex-end;
                width: 100%;
                height: 2rem;
            }
            .modal-content{
                position: relative;
                height:  calc( 100% - 6rem );
                padding: 1rem;
                padding-top: 0;
                overflow: auto;
            }
            .modal-shut-button{
                width: 2rem;
                height: 2rem;
                font-size: 2rem;
                background-color: red;
                color: white;
            }
            .text-big{
                font-size: 1.5rem;
                text-align: justify;
            }

            .quick-button{
                position: relative;
                width: 1.4rem;
                height: 1.4rem;
                font-size: 1rem;
                font-family: Arial, Helvetica, sans-serif;
                border-radius: 50%;
                color: black;
                background-color: rgb(200,200,200);
                transition: 250ms;
                margin: 1rem;
            }
            .quick-button:hover{
                cursor: pointer;
                background-color: dimgray;
                color: white;
                transition: 250ms;
            }
            .quick-button:active{
                background-color: goldenrod;
                color: black;
                transition: 250ms;
                transform: scale(0.9);
            }
            .modal-shut-button{
                background-color: red;
                color: white;
                z-index: 100;
            }
            .hidden{
                display: none;
            }
            @media (max-width: 750px){
                .modal-body {
                    width: 90%;
                    height: 90%;
                }
                .modal-shut-button{
                    width: 1.3rem;
                    height: 1.3rem;
                    font-size: 1rem;
                }
                .modal-title-bar {
                    height: 2rem;
                }
                .modal-content{
                    height: calc(100% - 9rem);
                }
            }
        </style>
        <div ${(this.id == undefined || this.id == null || this.id.trim() == '') ? '' : 'id=' + this.id} class = "modal-cover center">
            <div class = "modal-body column">
                <div class = "modal-title-bar">
                    <div class="quick-button modal-shut-button center">&times;</div>
                </div>
                <div class = "modal-content">
                    ${this.innerHTML}
                </div>
            
            </div>
        </div>
        `
    }
}

window.customElements.define('killable-modal', KillableModal)