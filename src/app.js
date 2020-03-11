
import { html, render } from '../web_modules/lit-html.js';

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
            }
        </style>
        <h2>All Heroes</h2>
       <div class="hero-list">
            ${this.heroes.map(h => this.heroDetail(h))}
       </div>
        `;

        render(template,this.root);
    }
  

    heroDetail(hero){
        return html`
        <h-hero-detail hero="${JSON.stringify(hero)}"></h-hero-detail>
        `
    }

    async load() { 
        const response = await fetch('src/heroes.json');
        const json = await response.json();
    
        this.heroes = [...json];
        this.render();
    }
}
customElements.define('h-root',View);
