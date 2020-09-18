import { html, render } from 'lit-html';
import * as heroService from '../shared/hero.data.js';

export default class HeroEditView extends HTMLElement {
  set nameInput(value) {
    this.root.getElementById('name').value = value;
  }

  set idInput(value) {
    this.root.getElementById('id').value = value;
  }

  set descriptionInput(value) {
    this.root.getElementById('description').value = value;
  }

  get nameInput() {
    return this.root.getElementById('name').value;
  }

  get idInput() {
    return this.root.getElementById('id').value;
  }

  get descriptionInput() {
    return this.root.getElementById('description').value;
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.hero = undefined;
    this.router = document.querySelector('h-router');
  }

  static get observedAttributes() {
    return ['id'];
  }

  connectedCallback() {
    this.render();
    const name = this.root.getElementById('name');

    name.addEventListener('input', function (event) {
      if (name.validity.valueMissing) {
        name.setCustomValidity('Please provide a name for the hero!');
      } else {
        name.setCustomValidity('');
      }
    });

    const form = this.root.getElementById('form');
    form.addEventListener(
      'submit',
      function (event) {
        event.preventDefault();
        this.save();
      }.bind(this)
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'id' && newValue > 0) {
      this.loadHero(newValue);
    }
  }

  async loadHero(id) {
    const result = await heroService.findById(id);
    this.hero = result;
    this.render();
    if (this.hero && this.hero.id > 0) {
      this.idInput = this.hero.id;
      this.nameInput = this.hero.name;
      this.descriptionInput = this.hero.description;
    }
  }

  render() {
    const template = html`
      <style>
        @import '../../../styles.css';
      </style>

      <form id="form">
        <article>
          <h1>
            ${this.hero?.id ? 'Edit' : 'Create a new Hero'} ${this.hero?.name}
          </h1>
          <section>
            <p>
              <label for="id">ID:</label>
              <input type="text" name="id" id="id" readonly />
            </p>
            <p>
              <label for="name">Name:</label>
              <input type="text" name="name" id="name" required />
            </p>
            <p>
              <label for="description">Description:</label>
              <textarea
                name="description"
                id="description"
                rows="5"
                cols="30"
                placeholder="Describe your Hero..."
              ></textarea>
            </p>
          </section>
          <p>
            <button type="submit">Save</button>
            <button type="button" @click="${_ => this.goBack()}">Cancel</button>
          </p>
        </article>
      </form>
    `;
    render(template, this.root);
  }

  goBack() {
    this.router.navigate('/heroes');
  }

  async save() {
    this.hero = await heroService.save({
      name: this.nameInput,
      id: this.idInput,
      description: this.descriptionInput,
    });
    this.idInput = this.hero.id;
    this.nameInput = this.hero.name;
    this.descriptionInput = this.hero.description;

    this.goBack();
  }
}
customElements.define('h-hero', HeroEditView);
