
import { html, render } from '../web_modules/lit-html.js';
export default class HeroDetail extends HTMLElement {

constructor(){
    super();
    this.root = this.attachShadow({mode: "open"})
}

connectedCallback(){
    this.render();
}

render(){
    const template = html`
            <div>HERO-DETAIL-PLACEHOLDER</div>
    `;
    render(template, this.root)
}


}
customElements.define('h-hero-detail', HeroDetail);

