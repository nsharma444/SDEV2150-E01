const template = document.createElement("template");
template.innerHTML = `
<header class="mb-4">
      <div class="d-flex flex-wrap justify-content-between align-items-end gap-2">
        <div>
           <h1 class="h3 mb-1">NAIT Resource Directory</h1>
          <p class="text-body-secondary mb-0">
            Find student support services, labs, and campus resources.
          </p>
        </div>
      </div>
    </header>
    `


class ResourceHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("resource-header", ResourceHeader);
  