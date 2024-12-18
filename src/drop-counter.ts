import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { totalContext } from "./drop-list.js";
import { inputStyles } from "./styles.js";
import {query} from 'lit/decorators/query.js';
import { mdiClose, mdiStarOutline, mdiStar } from '@mdi/js';

@customElement("drop-counter")
export class DropCounterElement extends LitElement {
  static override styles = [
    inputStyles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      .box {
        width: 12rem;
        height: 12rem;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: var(--bd-radius);
      }

      .remove {

        left: 0;
      }

      svg {
        fill: currentColor;
        opacity: 0.3;
        transition: all var(--tr-duration) ease-out;
      }

      svg:hover {
        opacity: 1;
        transition: all var(--tr-duration) ease-in;
        cursor: pointer;
      }

      .remove, .fave {
        position: absolute;
        top: 0;
        height: 2rem;
        width: 2rem;
      }

      .fave {
        right: 0;
      }

      h2 {
        font-size: 1.5rem;
        padding: 0;
        margin: auto 0;
  line-height: 1.25;

      }
      .title {
        width: 11rem;
        height: 4rem;
        margin: 0.5rem;
      }
      .controls {
        font-size: 1.25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        margin-top: auto;
      }
      button {
        padding: 0.5rem 1rem;
        font-weight: bold;
        font-size: 1.5rem;
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

  @query('h2')
  _title!: HTMLElement;

  @property({ type: String, attribute: false })
  name = "";

  @property()
  rarity = "R1";

  @property({ type: String, attribute: false })
  swordId = "0";

  @property({ type: Boolean, attribute: false })
  star = false;

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
      <!-- <div class="remove"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${mdiClose}" /></svg></div> -->
      <div class="fave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click=${() => {
                  this.toggleStar(this.swordId);
                }}>
        <path d="${this.star ? mdiStar : mdiStarOutline}" />
      </svg>
      </div>
        <div class="title"><h2>${this.name}</h2></div>
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

  private toggleStar(id: string) {
    this.dispatchEvent(
      new CustomEvent("toggle-star", { detail: {'id': id, 'add': !this.star}, bubbles: true, composed: true })
    );
  }

resizeText() {
  const el = this._title;
    let i = 0.5;
    const parent = el.parentNode as HTMLElement;
    let overflow = el.clientWidth > parent.clientWidth;


    while (!overflow && i < 1.75 && parent) {
        el.style.fontSize = `${i}rem`
        overflow = parent.scrollWidth > parent.clientWidth;

      if (!overflow) i += 0.25
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - 0.25}rem`
  }

firstUpdated() {

  this.resizeText();

}

}

declare global {
  interface HTMLElementTagNameMap {
    "drop-counter": DropCounterElement;
  }
}
