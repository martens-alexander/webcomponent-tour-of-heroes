import { html, render } from 'lit-html';
import * as heroService from '../heroes/shared/hero.data.js';

class View extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
    this.router = document.querySelector('h-router');
  }

  connectedCallback() {
    this.render();

    const resetLink = this.root.getElementById('reset-heroes-link');
    resetLink.addEventListener('click', event => event.preventDefault());
  }
  render() {
    const template = html`
      <style>
        @import '../../styles.css';
        li {
          list-style: none;
        }
        ul {
          padding-left: 0;
        }
      </style>
      <h2>Menu</h2>
      <ul>
        <li>
          <a href="#/heroes" @click="${_ => this.routeToHeroes()}"
            >All Heroes</a
          >
        </li>
        <li>
          <a href="#/heroes/create" @click="${_ => this.routeToCreate()}"
            >Create a Hero</a
          >
        </li>
        <li>
          <a id="reset-heroes-link" href="" @click="${_ => this.resetHeroes()}"
            >Reset Hero List</a
          >
        </li>
      </ul>
    `;

    render(template, this.root);
  }

  routeToHeroes() {
    this.router.navigate('/heroes');
  }
  routeToCreate() {
    this.router.navigate('/heroes/create');
  }
  resetHeroes() {
    heroService.reset();
    this.router.navigate('/heroes');
  }
}
customElements.define('h-menu', View);
