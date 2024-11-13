import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { swordGroups } from "./swords";
import { inputStyles } from "./styles";

@customElement("drop-filter")
export class DropFilterElement extends LitElement {
  static override styles = [
    inputStyles,
    css`
      :host {
        display: block;
      }
      div {
        display: flex;
        flex-wrap: wrap;
      }
    `,
  ];

  /**
   * The list of drops to create counters for
   */
  @property({ type: Array }) groups: number[] = [];

  override render() {
    return html`
      <div>
        ${swordGroups.map(
          (group, i) =>
            html` <label>
              <input
                type="checkbox"
                .checked=${this.groups.includes(i)}
                @change=${() => {
                  this.toggleGroups(i);
                }}
              />
              ${group.name}
            </label>`
        )}
      </div>
    `;
  }

  private toggleGroups(id: number) {
    const groupIndex = this.groups.indexOf(id);
    let eventName = "";
    if (groupIndex >= 0) {
      this.groups = this.groups.toSpliced(groupIndex, 1);
      this.requestUpdate();
      eventName = "selection-removed";
    } else {
      this.groups.push(id);
      eventName = "selection-added";
    }
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: swordGroups[id].drops,
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "drop-filter": DropFilterElement;
  }
}
