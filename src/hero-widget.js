
import { html, render } from '../web_modules/lit-html.js';
export default class HeroDetail extends HTMLElement {

constructor(){
    super();
    this.root = this.attachShadow({mode: "closed"})
    this.router = document.querySelector('h-router');
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
            <div><span>ID: ${this.hero?.id} Name: ${this.hero?.name}</span>
            <button @click="${_ => this.navigateToHero(this.hero)}">go to</button>
            </div>     
    `;
    render(template, this.root);
}

navigateToHero(hero){
    this.router.navigate('hero/' + hero.id);
}

}
customElements.define('h-hero-widget', HeroDetail);

