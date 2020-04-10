
import { html, render } from '../../web_modules/lit-html.js';
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
            .hero-list{
                display: flex;
                flex-direction: column;
                width: 100%
            }
        </style>

        <article>
        <h1>All Heroes</h1> 
        
        <section class="hero-list">
                ${this.heroes.map(h => this.heroDetail(h))}
        </section>

       <p><button @click="${_ => this.addHero()}">Add</button></p>
       <article>
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
