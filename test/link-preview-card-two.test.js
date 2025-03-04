import { html, fixture, expect } from '@open-wc/testing';
import "../link-preview-card-two.js";

describe("LinkPreviewCardTwo test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <link-preview-card-two
        title="title"
      ></link-preview-card-two>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
