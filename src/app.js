
import { html, render } from '../web_modules/lit-html.js';

class View extends HTMLElement { 

    constructor() { 
        super();
        this.root = this.attachShadow({mode:"open"});
        this.heroes = ['spiderman', 'antman', 'batman']
        this.state = 'empty';
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
        </style>
        <h2>hello ${this.state}</h2>
       
        <h-hero-detail></h-hero-detail>
        <h-hero-detail></h-hero-detail>
        <button @click="${_ => this.load()}">change tile with hero from fetch</button>
        
        ${this.heroes.map(h => this.heroeDetail(h))}
        <button @click="${_ => this.addHero()}">add hero</button>
        `;

        render(template,this.root);
    }

    addHero(){
        this.heroes = [...this.heroes, 'thor'];
        this.render();
    }

    heroeDetail(hero){
        return html`
        <div>HERO: ${hero}</div>
        `
    }

    async load() { 
        const response = await fetch('src/heroes.json');
        const json = await response.json();
        const { name } = json;
        this.state = name;
        this.render();
    }
}
customElements.define('h-root',View);
