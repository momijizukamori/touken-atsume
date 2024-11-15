import { LitElement, html, css } from "lit";
import { createContext, provide } from "@lit/context";
import { customElement, property, queryAll } from "lit/decorators.js";
import { swords, Sword } from "./swords";
import { getList, saveList, DEFAULT_LIST } from "./store";
import { DropCounterElement } from "./drop-counter";
import { detailStyles, inputStyles } from "./styles";

export const totalContext = createContext<number>("total");

@customElement("drop-list")
export class DropListElement extends LitElement {
  static override styles = [
    inputStyles,
    detailStyles,
    css`
      #counters {
        display: flex;
        flex-wrap: wrap;
        gap: 1em 1em;
      }

      drop-filter,
      drop-multiselect {
        width: 48%;
        display: inline-block;
        vertical-align: top;
      }
    `,
  ];

  @provide({ context: totalContext })
  @property({ attribute: false })
  total = 0;

  // Offset so we always have unique ids for custom elements
  @property({ type: Number })
  customOffset = 1000;

  @property({ type: String })
  listName = DEFAULT_LIST;

  @property({ type: Object })
  countData: { [key: string]: number } = {};

  @queryAll("drop-counter")
  _counters!: NodeListOf<DropCounterElement>;
  /**
   * The list of drops to create counters for
   */
  @property({ type: Object }) selection: Set<Sword> = new Set<Sword>();

  override render() {
    return html`
      <div
        @count-increase=${this._increment}
        @count-decrease=${this._decrement}
        @selection-removed=${this._remove}
        @selection-added=${this._add}
        @list-added=${this._addList}
        @list-changed=${this._changeList}
      >
        <div id="header">
          <drop-title></drop-title>
          <h1>Total: ${this.total}</h1>
        </div>
        <details id="filters">
          <summary>Filters</summary>
          <drop-filter></drop-filter>
          <drop-multiselect .selection=${this.selection}></drop-multiselect>
        </details>

        <div id="counters">
          ${[...this.selection].map((sword) => {
            return html` <drop-counter
              rarity=${sword.rarity}
              .total=${this.total}
              .swordId=${sword.id.toString()}
              .name=${sword.name}
              .count=${this.countData[sword.id.toString()] ?? 0}
            ></drop-counter>`;
          })}
          <drop-counter
            rarity="R0"
            .total=${this.total}
            .swordId="${"0"}"
            .name="${"Other"}"
            .count=${this.countData["0"] ?? 0}
          ></drop-counter>
          <button @click=${this.addCustom}>Add custom</button>
        </div>
      </div>
    `;
  }

  private _increment() {
    this.total++;
    this.dispatchEvent(new CustomEvent("count-increase"));
  }

  private _decrement() {
    this.total--;
    this.dispatchEvent(new CustomEvent("count-decrease"));
  }

  private _add(e: CustomEvent) {
    const newSelection = swords.filter((sword) => e.detail.includes(sword.id));
    this.selection = this.selection.union(new Set(newSelection));
  }

  private _remove(e: CustomEvent) {
    const removeSelection = swords.filter((sword) =>
      e.detail.includes(sword.id)
    );
    this.selection = this.selection.difference(new Set(removeSelection));
  }

  private addCustom() {
    let name = prompt("Enter a custom category name");
    const newCounter = {
      name: name || "Custom",
      rarity: "R0",
      type: "Other",
      id: this.customOffset,
    };
    this.selection = this.selection.union(new Set([newCounter]));
    this.customOffset = this.customOffset++;
  }

  private _saveList() {
    let countData: { [key: string]: number } = {};
    let customData: { [key: string]: string } = {};

    this._counters.forEach((counter) => {
      let id: string = counter.swordId;
      countData[id as keyof typeof countData] = counter.count;
      if (parseInt(id) > 999) {
        customData[id as keyof typeof customData] = counter.name;
      }
    });

    saveList(this.listName, { counts: countData, customs: customData });
  }

  private _addList(e: CustomEvent) {
    this._saveList();
    this.listName = e.detail;
    this.selection = new Set();
    this.total = 0;
    this.countData = {};
  }

  private _changeList(e: CustomEvent) {
    this._saveList();
    this.listName = e.detail;
    let data = getList(this.listName);
    let keys = Object.keys(data.counts).map((key) => parseInt(key));
    let selected = swords.filter((sword) => keys.includes(sword.id));
    let customs = Object.entries<string>(data.customs).map(([key, val]) => {
      return { name: val, rarity: "R0", type: "Other", id: parseInt(key) };
    });
    let total = 0;
    Object.values<number>(data.counts).forEach((count) => {
      total = total + count;
    });
    this.total = total;
    this.selection = new Set([...selected, ...customs]);
    this.countData = data.counts;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "drop-list": DropListElement;
  }
}
