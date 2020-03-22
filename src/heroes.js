
import { html, render } from '../web_modules/lit-html.js';
import { getAll } from './hero.data.js';

class View extends HTMLElement { 


    constructor() { 
        super();
        this.root = this.attachShadow({mode:"open"});
        this.heroes = [];
        
        this.load();
        this.router = document.querySelector('h-router');
    }

    connectedCallback() { 
        this.render();
    
    }
    render() { 
        const template = html`
        <style>
            h2{
                color: red;
            }
            .hero-list{
                display: flex;
                flex-direction: column;
                width: 50%
            }
        </style>
        <h2>All Heroes</h2> 
       <div class="hero-list">
            ${this.heroes.map(h => this.heroDetail(h))}
       </div>
       <div><button @click="${_ => this.addHero()}">Add</button></div>
        `;

        render(template,this.root);
    }
  
    addHero(){
        this.router.navigate('/heroes/create');
    }

    heroDetail(hero){
        return html`
        <h-hero-widget hero="${JSON.stringify(hero)}"></h-hero-widget>
        `
    }

    async load() { 
        this.heroes = await getAll();
        this.render();
    }
}
customElements.define('h-root',View);
