/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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
    this.href = "";
    this.description = "";
    this.link = "";
    this.image = "";
    this.color = "";
    this.loading = false;


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
      href: { type: String },
      description: { type: String },
      link: { type: String},
      image: { type: String },
      color: { type: String },
      loading: { type: Boolean, reflect: true, attribute: "loading-state" },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
    :root {
      --ddd-primary-0: #000;
      --ddd-primary-1: #333;
      --ddd-primary-2: #005A9C;
      --ddd-primary-25: #FF69B4;
    }

      :host {
        display: inline-block;
        /* color: var(--color); */
        background-color: var(--ddd-color-default-gray);
        border-radius: 10px;
        border: solid white;
        padding: 6px;
        max-width: 400px;
      }

      .preview {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      img {
        display: block;
        max-width: 80%;
        height: auto;
        border-radius: 6px;
        margin: 0px auto;
        border: 4px solid var(--color);
      }

      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }


      .title {
        font-weight: bold;
        font-size: 1em;
        margin: 15px 0px;
        color: var(--ddd-color-primary);

      }

      details {
        border: 4px solid lightsalmon;
        border-radius: 8px;
        text-align: center;
        padding: 8px;
        height: 70px;
        overflow: auto;
      }

      details summary {
        text-align: center;
        font-size: 20px;  
        padding: 8px 0;
      }

      .description {
        text-align: center;
        margin: 10px 10px;
        color: var(--ddd-color-primary);
        border: 4px solid var(--ddd-color-primary);
      }

      .description:hover {
        background-color: var(--ddd-color-default-gray);
      }

      .url {
        padding: 8px 8px;
        margin: 8px auto 8px;
        font-weight: bold;
        color: var(--ddd-color-primary);
        border: 4px solid pink;
        border-radius: 8px;
        transition: background-color 0.5s;
      }

      .url:hover {
        background-color: var(--ddd-color-default-gray);
      }

      .loading-state {
        margin: var(--ddd-spacing-5) auto;
        border: var(--ddd-border-lg);
        border-color: var(--ddd-color-default-white);
        border-top: var(--ddd-border-lg);
        border-top-color: var(--ddd-color-primary);
        border-radius: var(--ddd-radius-xl);
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @media (max-width: 600px) {
        :host {
          max-width: 100%;
          padding: var(--ddd-spacing-3);
        }
        .content {
          flex-direction: column;
        }
      }
      
    `];
  }

  updated(changedProperties) {
    if (changedProperties.has("href") && this.href) {
      this.fetch(this.href);
    }
  }

  async fetch(link) {
    this.loading = true; 
    const url = `https://open-apis.hax.cloud/api/services/website/metadata?q=${link}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
  
      const json = await response.json();
      this.title = json.data['og:title'] || json.data["title"] || "no title";
      this.description = json.data['og:description'] || "no description";
      this.image = json.data["image"] || json.data["logo"] || "no image";
      this.url = json.data['url'] || link;
      this.color = json.data["theme-color"] || this.defaultColor(); 
    } catch (error) {
      console.error("Error:", error);
      this.title = "Error";
      this.description = "";
      this.image = "";
      this.url = "";
      this.color = this.defaultColor();
    } finally {
      this.loading = false;
    }
  }

  defaultColor() {
    if(this.href.includes("psu.edu")){
      return "var(--ddd-primary-2)";
    }
    else {
      const randomColor = Math.floor(Math.random()*26);
      return 'var(--ddd-primary-${randomColor})';
    }
  }

  imageError() {
    console.warn("Image failed to load", this.image);
    this.image = "";
    this.requestUpdate();
  }

  

  // Lit render the HTML
  render() {
    return html`
    <div class="preview" part="preview">
      ${this.loading 
        ? html`<div class="loading-state" part="loading-state"></div>` 
        : html`
          ${this.image ? html`<img src="${this.image}" alt="" @error="${this.imageError}" part="image" />` : ''}
        <div class = "content" part="content">
          <h1 class="title" part="title">${this.title}</h1>
          <details part="details">
            <summary part="summary">Description</summary>
            <p class="description" part="description">${this.description}</p>
          </details>
          <a href="${this.url}" target="_blank" class="url" part="url">Open Site</a>
        </div>
        `} 
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