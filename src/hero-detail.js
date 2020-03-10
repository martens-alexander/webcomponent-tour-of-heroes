
import { html, render } from '../web_modules/lit-html.js';
export default class HeroDetail extends HTMLElement {

constructor(){
    super();
    this.root = this.attachShadow({mode: "closed"})
}

static get observedAttributes() {
    return ["hero"];
  }

connectedCallback(){
    this.render();
}

attributeChangedCallback(name, oldValue, newValue) {
   if(name === 'hero'){
       this.hero = JSON.parse(newValue);
   }
   this.render();
  }

render(){
    const template = html`
    <style>
    div{
        background-color: var(--primary);
        border-radius: 5px;
        margin: 5px;
        padding-left: 5px;
       
    }
        </style>
            <div>ID: ${this.hero?.id} Name: ${this.hero?.name}</div>
    `;
    render(template, this.root)
}

}
customElements.define('h-hero-detail', HeroDetail);

