// 1. start with an immutable template for the HTML
const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">

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

// 2. create a component extending from an HTMLElement base class
//     a) create a shadow root in the construtor
//     b) put any on-load behaviour we want in the connectedCallback() (N/A in this example)
class ResourceHeader extends HTMLElement {
    constructor() {
        super();  // call the constructor of the parent class (i.e. HTMLElement)
        // we want to override the constructor to attach the shadow root,
        // which means we're overriding the constructor of HTMLElement,
        // yet we still want all the initialisation behaviour for an HTMLElement to happen (first).
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// 3. create a custom element, specifying the HTML element name and the class definition
customElements.define("resource-header", ResourceHeader)
