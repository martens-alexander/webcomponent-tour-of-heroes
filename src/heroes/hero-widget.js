
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
    a {
        background-color: var(--primary);
        padding: 5px;

        margin-bottom: 3px;
        display: inline-block;
      text-decoration: underline;
    }
    a:hover{
      text-decoration: none;
    }
    .hero-description{
        line-height: 1.6;
        text-indent: 10px;
    }
    
        </style>
            <article>
                <h3>${this.hero?.name}</h3>
                <p class="hero-description">${this.hero.description}</p>
                <p><a href="#/heroes/${this.hero.id}">Edit</a></p>
            </article>     
    `;
    render(template, this.root);
}

navigateToHero(hero){
    this.router.navigate('/heroes/' + hero.id);
}

}
customElements.define('h-hero-widget', HeroWidgetView);

