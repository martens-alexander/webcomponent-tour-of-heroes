import { html, render } from '../../web_modules/lit-html.js';

class View extends HTMLElement{
    constructor() { 
        super();
        this.root = this.attachShadow({mode:"closed"});
     
    }

    connectedCallback() { 
        this.render();
    }

    render() { 
        const template = html`
        <style>
        @import "../../../src/styles.css";
        nav{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding-left: 5px;
            padding-right: 5px;
        }
    </style>
    <nav>
        <div class="navbar-title">
        <a href="/">Tour of Heroes</a>
      </div>
      <div class="navbar-links">
        <a href='https://github.com/almartens/webcomponent-tour-of-heroes' title="Source Code" target="_blank">Github</a>
      </div>
      </nav>
        `;

        render(template,this.root);
    }
}
customElements.define('h-navbar-info', View);