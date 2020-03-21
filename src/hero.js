import { html, render } from '../web_modules/lit-html.js';
import * as heroService from './hero.data.js';

export default class HeroView extends HTMLElement {


    set nameInput(value){
        this.root.querySelector('input#name').value = value;
   }
   set idInput(value){
        this.root.querySelector('input#id').value = value;
   }
   
   get nameInput(){
        return this.root.querySelector('input#name').value;
   }
   get idInput(){
        return this.root.querySelector('input#id').value;
   }
   

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
   if(name === 'id' && newValue > 0){
       this.loadHero(newValue);
   }
  }

  async loadHero(id){
    const result = await heroService.findById(id);
    this.hero = result;
    this.render();
    if(this.hero && this.hero.id > 0){
        this.idInput = this.hero.id;
        this.nameInput = this.hero.name;
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
            <h2>${this.hero?.id ? 'Edit' : 'Create'} ${this.hero?.name}</h2>
            <label for="id">ID</label>
            <input type="text" name="id" id="id" disabled></input>
             <label for="name">Name</label>
             <input type="text" name="name" id="name" >
             <button @click="${_ => this.save()}">Save</button>
             <button @click="${_ => this.goBack()}">Cancel</button>
            </div>
    `;

    render(template, this.root);
}

goBack(){
    this.router.navigate('/heroes')
}

async save(){
     this.hero = await heroService.save({name: this.nameInput, id: this.idInput})
     this.idInput = this.hero.id;
     this.nameInput = this.hero.name;

    this.render();
}

}
customElements.define('h-hero', HeroView);

