class WidgetDetailsDB{
    constructor(){

    }


    static getDetailsAbout(widgetDescriptor){
        {if(widgetDescriptor == 'sample-button') {
            let differentCodePart = `
            &:hover {
                cursor: pointer;
                background-color: rgb(120, 120, 255);
                transition: 0.2s;
            }
            &:active{
                background-color: rgb(200, 200, 255);
                color: black;
            }
            `
        return `
            ${WidgetDetailsDB.getDescriptorWithCommonCode_buttons(differentCodePart)}
            ${WidgetDetailsDB.getEndingMessage_buttons()}
        `}
    }


        {if(widgetDescriptor == 'grow-button') {
                let differentCodePart = `
                &:hover {
                    cursor: pointer;
                    transform: scale(1.2);
                    transition: 0.2s;
                }
                &:active{
                    background-color: var(--button-active-bg);
                    transform: scale(0.8);
                    transition: 0.2s;
                }
                `
            return `
                ${WidgetDetailsDB.getDescriptorWithCommonCode_buttons(differentCodePart)}
                ${WidgetDetailsDB.getEndingMessage_buttons()}
            `}
        }


        {if(widgetDescriptor == 'shrink-button') {
            let differentCodePart = `
            &:hover {
                cursor: pointer;
                transform: scale(0.8);
                transition: 0.2s;
            }
            &:active{
                background-color: var(--button-active-bg);
                transform: scale(1);
                transition: 0.2s;
            }
            `
        return `
            ${WidgetDetailsDB.getDescriptorWithCommonCode_buttons(differentCodePart)}
            ${WidgetDetailsDB.getEndingMessage_buttons()}
        `}
    }
    }

        static getDescriptorWithCommonCode_buttons(differentCodePart){
            return `
            <b>CSS</b>
            <pre>
            *{
                position: relative;
            }
            .color-theme-blue{
                --button-bg: blue;
                --button-fg: white;
                --button-hover-bg: rgb(120, 120, 255);
                --button-hover-fg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }

            .color-theme-green{
                --button-bg: GreenYellow;
                --button-fg: DarkGreen;
                --button-hover-bg: DarkGreen;
                --button-hover-fg: GreenYellow;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: DarkGreen;
            }
            .color-theme-red{
                --button-bg: rgb(220, 0, 0);
                --button-fg: white;
                --button-hover-bg: rgb(150, 0, 0);
                --button-hover-fg: white;
                --button-active-bg: rgb(200, 200, 255);
                --button-active-fg: black;
                --button-border-color: rgba(0, 0, 0, 0);
            }
            .color-theme-inactive{
                --button-bg: gray;
                --button-fg: DarkGray;
                --button-hover-bg: gray;
                --button-hover-fg: DarkGray;
                --button-active-bg: gray;
                --button-active-fg: DarkGray; 
                --button-border-color: rgba(0, 0, 0, 0);
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

                ${differentCodePart}
            }
            </pre>
            <b>HTML</b>

            <pre>
            &lt;div class = "button-wrapper">
                &lt;div class="button center position-right-top" >&lt;/div>
            &lt;/div>    
            </pre>
            `
        }
        static getEndingMessage_buttons(){
            return `
            <b>Note</b>  js code is a bit too complex to show here, as custom web component is used. When <code>data-color-theme</code> is changed, 
            <code>div.button</code> class related to color theme is switched, and in that way new css variable values are loaded.</br>
            Switching data-button-type to change hoover and active properties work in similar way, but for simplicity it is introduced in this 
            code snipped in a different way. To analize original code please visit <a target="_blank" href = "https://github.com/gudmar/reusableWidgets/">gitHub repo</a>
            
            `
    }
}