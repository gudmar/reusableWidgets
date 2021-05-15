class WidgetDetailsDB{
    constructor(){

    }


    static getDetailsAbout(widgetDescriptor){
        {if(widgetDescriptor == 'sample-button') return `
        <pre>
            &lt;style>
            *{
                position: relative;
            }
            .button-wrapper{
                display: inline-block
            }
            .center{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .button{
                color: white;
                background-color: blue;
                font-family: Arial;
                border-radius: 5px;
                padding: 5px;
                transition: 0.2s;

                &:hover {
                    cursor: pointer;
                    background-color: rgb(120, 120, 255);
                    transition: 0.2s;
                }
                &:active{
                    background-color: rgb(200, 200, 255);
                    color: black;
                }
            }
            &lt;/style>
            &lt;div class = "button-wrapper">
                &lt;div class="button center position-right-top" >&lt;/div>
            &lt;/div>
        </pre>
        `}



        
    }
}