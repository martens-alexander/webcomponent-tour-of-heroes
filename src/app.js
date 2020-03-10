
import { html, render } from '../web_modules/lit-html.js';

class View extends HTMLElement { 


    constructor() { 
        super();
        this.root = this.attachShadow({mode:"open"});
        this.heroes = [];
        this.state = 'empty';
        this.load();
    }

    connectedCallback() { 
        this.render();
    
    }
    render() { 
        console.log('render ', this.state);
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
        <h2>hello ${this.state}</h2>
       <div class="hero-list">
       ${this.heroes.map(h => this.heroeDetail(h))}
       </div>
       
        <button @click="${_ => this.addHero()}">add hero</button>
        `;

        render(template,this.root);
    }

    addHero(){
        // this.heroes = [...this.heroes, 'thor'];
        this.render();
    }

    heroeDetail(hero){
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
