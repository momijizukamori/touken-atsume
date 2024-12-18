import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { DEFAULT_LIST, LISTS, saveLists } from "./store";
import { inputStyles } from "./styles";


@customElement("drop-title")
export class DropListTitle extends LitElement {
  static override styles = [
    inputStyles,
    css`
      select {
        display: inline;
        width: 75%;
      }
    `,
  ];

  @property()
  current = DEFAULT_LIST;

  @property({ type: Array })
  lists: string[] = LISTS;

  @query("select")
  _select: HTMLSelectElement | undefined;

  override render() {
    return html`
      <h1>${this.current}</h1>
      ${this.lists.length && this.lists.length > 1
        ? html`<select id="sel" @change=${this._changeList}>
            ${this.lists.map(
              (list, i) =>
                html` <option value=${i} .selected=${this.current == list}>
                  ${list}
                </option>`
            )}
          </select>`
        : html``}
      <button @click=${this._addList}>Add List</button>
    `;
  }

  private _addList() {
    let newList = prompt("Enter a new list name");
    if (!(newList === null)) {
      this.current = newList || "New List";
      this.lists = [...this.lists, this.current];
      saveLists(this.lists);
      this.dispatchEvent(
        new CustomEvent("list-added", {
          detail: newList,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private _changeList() {
    let listId = this._select?.value || "0";
    let list = this.lists[parseInt(listId)];
    this.current = list;
    this.dispatchEvent(
      new CustomEvent("list-changed", {
        detail: list,
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "drop-title": DropListTitle;
  }
}
