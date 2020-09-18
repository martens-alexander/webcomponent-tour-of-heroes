import { html, render } from 'lit-html';
import * as heroService from '../shared/hero.data.js';

export default class HeroWidgetView extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
    this.router = document.querySelector('h-router');
  }

  static get observedAttributes() {
    return ['hero'];
  }

  connectedCallback() {
    this.render();

    const form = this.root.getElementById('delete');
    form.addEventListener('click', function (event) {
      event.preventDefault();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'hero') {
      this.hero = JSON.parse(newValue);
    }
    this.render();
  }

  render() {
    const template = html`
      <style>
        @import '../../../styles.css';

        .hero-description {
          line-height: 1.6;
          text-indent: 10px;
        }
      </style>
      <article>
        <h3>${this.hero?.name}</h3>
        <p class="hero-description">${this.hero.description}</p>
        <p>
          <a href="#/heroes/${this.hero.id}">Edit</a>
          <a id="delete" href="" @click="${_ => this.deleteHero(this.hero)}"
            >Delete</a
          >
        </p>
      </article>
    `;
    render(template, this.root);
  }

  navigateToHero(hero) {
    this.router.navigate('/heroes/' + hero.id);
  }

  async deleteHero(hero) {
    const confirm = window.confirm(
      'Do you really want to delete ' + hero.name + '?'
    );
    if (confirm) {
      await heroService.deleteHero(hero);
      this.parentElement.removeChild(this);
    }
  }
}
customElements.define('h-hero-element', HeroWidgetView);
