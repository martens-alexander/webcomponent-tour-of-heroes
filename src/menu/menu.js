import { html, render } from '../../web_modules/lit-html.js';
import { reset } from '../heroes/hero.data.js';

class View extends HTMLElement { 


    constructor() { 
        super();
        this.root = this.attachShadow({mode:"closed"});
        this.router = document.querySelector('h-router');
    }

    connectedCallback() { 
        this.render();
    
    }
    render() { 
        const template = html`
        <style>
        li {
            list-style: none;
          }
          ul {
            padding-left: 0;
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
        </style>
        <h2>Menu</h2>
        <ul>
        <li><a href="#/heroes" @click="${_ => this.routeToHeroes()}">All Heroes</a></li>
        <li><a href="#/heroes/create" @click="${_ => this.routeToCreate()}">Create a Hero</a></li>
        <li><a href="" @click="${_ => this.resetHeroes()}">Reset Hero List</a></li>
        </ul>
       
        `;

        render(template,this.root);
    }

routeToHeroes(){
    this.router.navigate('/heroes');
}
routeToCreate(){
    this.router.navigate('/heroes/create');
}
resetHeroes(){
  reset();
  this.router.navigate('/heroes');
}

}
customElements.define('h-menu',View);
