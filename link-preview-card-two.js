/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { ref } from "lit/directives/ref.js";

/**
 * `link-preview-card-two`
 * 
 * @demo index.html
 * @element link-preview-card-two
 */
export class LinkPreviewCardTwo extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "link-preview-card-two";
  }

  constructor() {
    super();
    this.title = "";
    this.jsonTitle = "";
    this.description = "";
    this.url = "";
    this.image = "";
    this.input = "";
    this.loading = false;

    this.t = this.t || {};
    this.t = {
      ...this.t,
      // title: "Title",
      // jsonTitle: "JSON Title",
      examineButton: "Examine Website",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/link-preview-card-two.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      jsonTitle: { type: String },
      description: { type: String },
      url: { type: String, reflect: true },
      image: { type: String },
      input: { type: String },
      loading: { type: Boolean },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      /* h3 span {
        font-size: var(--link-preview-card-two-label-font-size, var(--ddd-font-size-s));
      } */
      
    `];
  }

  inputBox(e) {
    this.input = e.target.value;
  }

  async fetch() {
    if(this.input) {
        this.getData(this.input);
    }
  }

  isValidURL(string) {
    try {
      new URL(string);
      return true
    } catch (error) {
      return false;
    }
  }

  async getData(link) {
    const url = `https://open-apis.hax.cloud/api/services/website/metadata?q=${link}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json.data);
      // document.querySelector('#here').innerHTML = JSON.stringify(json.data, null, 2);
      // document.querySelector('#there').innerHTML = json.data["og:site_name"];
      this.title = json.data['og:title'];
      this.jsonTitle = json.data['og:jsonTitle'];
      this.description = json.data['og:description'];
      this.image = json.data['og:image'];
      console.log(json.data.url);
      console.log(this.jsonTitle);
      // if (json.data['twitter:card']) {
        
      // }
      console.log(json.data['url']);
    } catch (error) {
      console.error(error.message);
    }
  }
  
  //getData("https://hax.psu.edu");


  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <textArea
    .value=${this.input}
    @input="${this.inputBox}"
    placeholder="Enter a URL"
    ></textArea>
  <button @click="${this.fetch}">${this.t.examineButton}</button>
  <h3><span>${this.t.title}</span> ${this.title}</h3>
  <h3><span>${this.t.jsonTitle}</span> ${this.jsonTitle}</h3>
  <p>${this.description}</p>
  <img src="${this.image}" alt="${this.title}" />

  <a href="${this.url}" target="_blank">${this.url}</a>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(LinkPreviewCardTwo.tag, LinkPreviewCardTwo);