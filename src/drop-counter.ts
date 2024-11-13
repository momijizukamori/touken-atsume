import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { totalContext } from "./drop-list.js";
import { inputStyles } from "./styles.js";

@customElement("drop-counter")
export class DropCounterElement extends LitElement {
  static override styles = [
    inputStyles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      div {
        width: 15em;
        height: 15em;
        text-align: center;
        border-radius: var(--bd-radius);
      }
      .controls {
        font-size: 2rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
      }
      button {
        padding: 0.5rem 1rem;
        font-weight: bold;
        font-size: 2rem;
      }
      .R5 {
        border: 10px solid var(--attention);
      }
      .R4 {
        border: 10px solid var(--active);
      }
      .R3 {
        border: 10px solid var(--blue);
      }
      .R2 {
        border: 10px solid var(--success);
      }
      .R1 {
        border: 10px solid var(--muted);
      }
      .R0 {
        border: 10px solid var(--default);
      }
    `,
  ];

  @property({ type: String, attribute: false })
  name = "";

  @property()
  rarity = "R1";

  @property({ type: String, attribute: false })
  swordId = "0";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number, attribute: false })
  count = 0;

  @consume({ context: totalContext, subscribe: true })
  @property({ attribute: false })
  total?: any;

  override render() {
    return html`
      <div class="box ${this.rarity}">
        <h2>${this.name}</h2>
        ${this.count && ((this.count / this.total) * 100).toPrecision(4)}%
        <span class="controls">
          <button @click=${this._decrement} part="button">-</button>
          ${this.count}
          <button @click=${this._increment} part="button">+</button>
        </span>
      </div>
    `;
  }

  private _increment() {
    this.count++;
    this.dispatchEvent(
      new CustomEvent("count-increase", { bubbles: true, composed: true })
    );
  }

  private _decrement() {
    if (this.count > 0) {
      this.count--;
      this.dispatchEvent(
        new CustomEvent("count-decrease", { bubbles: true, composed: true })
      );
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "drop-counter": DropCounterElement;
  }
}
