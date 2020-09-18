import { html, render } from 'lit-html';
import { getAll } from '../shared/hero.data.js';

export default class View extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
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
        @import '../../../styles.css';
        .hero-list {
          display: flex;
          flex-direction: column;
        }
        h1 {
          text-align: center;
        }
      </style>

      <article>
        <h1>All Heroes</h1>

        <section class="hero-list">
          ${this.heroes.map(h => this.heroDetail(h))}
        </section>

        <article></article>
      </article>
    `;

    render(template, this.root);
  }

  heroDetail(hero) {
    return html`
      <h-hero-element hero="${JSON.stringify(hero)}"></h-hero-element>
    `;
  }

  async load() {
    this.heroes = await getAll();
    this.render();
  }
}
customElements.define('h-hero-list', View);
