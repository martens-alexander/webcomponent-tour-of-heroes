
import { html, render } from '../../web_modules/lit-html.js';
export default class HeroWidgetView extends HTMLElement {

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
        
            <article>
                <h2> ${this.hero?.name}<h3>
                <blockquote>${this.hero.description}</blockquote>
                <button @click="${_ => this.navigateToHero(this.hero)}">Edit</button>
            </article>     
    `;
    render(template, this.root);
}

navigateToHero(hero){
    this.router.navigate('/heroes/' + hero.id);
}

}
customElements.define('h-hero-widget', HeroWidgetView);

