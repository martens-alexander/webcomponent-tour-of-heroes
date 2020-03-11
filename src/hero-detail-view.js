

import { html, render } from '../web_modules/lit-html.js';
export default class HeroDetailView extends HTMLElement {

constructor(){
    super();
    this.root = this.attachShadow({mode: "closed"})
    this.hero = undefined;
    this.router = document.querySelector('h-router');
}

static get observedAttributes() {
    return ["id"];
  }

connectedCallback(){
    this.render();
}

attributeChangedCallback(name, oldValue, newValue) {
   if(name === 'id'){
       this.load(newValue)
   }
  }

render(){
    const template = html`
    <style>
    div{
        background-color: var(--primary);
        border-radius: 5px;
        margin: 5px;
        padding-left: 5px;
        height: 100%
       
    }
        </style>
            <div>
            <h2>Edit ${this.hero?.name}</h2>
            <label for="id">ID</label>
             <input type="text" name="id" id="id" value="${this.hero?.id}">
             <label for="name">Name</label>
             <input type="text" name="name" id="name" value="${this.hero?.name}">
             <button @click="${_ => this.save()}">Save</button>
             <button @click="${_ => this.goBack()}">Cancel</button>
            </div>
    `;

    render(template, this.root);
}

goBack(){
    this.router.navigate('/heroes')
}

save(){
    
}

async load(id) { 
    const response = await fetch('../src/heroes.json');
    const json = await response.json();

    this.hero = [...json].find(h => h.id === id);
    this.render();
}

}
customElements.define('h-hero-detail-view', HeroDetailView);

