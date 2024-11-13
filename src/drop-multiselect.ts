/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { Sword, swords } from './swords';
import { inputStyles } from './styles';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('drop-multiselect')
export class DropMultiselectElement extends LitElement {
  static override styles = [inputStyles,
  css`
    .checkbox-multiselect {
      border: 0.1em solid;
      max-height: 15em;
      overflow: auto;
      margin-bottom: 1rem;
    }

    .checkbox-multiselect-item {
      width: 100%;
      display: flex;
      align-items: stretch;
      position: relative;
    }

    .checkbox-multiselect-item:first-child {
      padding: 0.5rem;
    }

    input {
      z-index: 2;
      flex: 0 0 auto;
      margin: 0.5rem;
    }

    input[type='checkbox'] + label {
      padding: 0.5rem;
      width: 100%;
      margin: 0;
    }

    // TODO: Someday, in the far future from July 2023, hopefully
    // we will have :has() in all browsers. Until then, this hack
    // puts a background color behind the checkbox when it's checked.
    input:checked ~ label::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      content: '';
      z-index: 1;
      width: 2em;
      height: 100%;
    }

    .filtered {
      display: none !important;
    }

    .checkbox-multiselect .checkbox-multiselect-item:has(:checked) {
      background-color: var(--bg-contrast);
      color: var(--bg-default);
    }

    .checkbox-multiselect :checked + label,
    .checkbox-multiselect input:checked ~ label::before {
      background-color: var(--bg-contrast);
      color: var(--bg-default);
    }

  `];

  
@property({type: Boolean})
selectAll = false;

@property({type: Object}) selection: Set<Sword> = new Set<Sword>();

  override render() {
    return html`
        <span id="swords_label" class="label">Swords</span>
        <div
          role="group"
          aria-labelledby="swords_label"
          tabindex="0"
          id="swords"
          class="checkbox-multiselect"
        >
          <span class="checkbox-multiselect-item  show-on-focus">
            <a href="#swords-multiselect-skip" class="show-on-focus">Skip</a>
          </span>
          <span
            class="checkbox-multiselect-item"
            style="background-color: #ddd"
          >
            <input
              type="checkbox"
              id="select-all"
              name="select-all"
              .checked=${this.selectAll}
              @change=${this.toggleSelectAll}
            />
            <label for="select-all">Select All</label>
          </span>
          ${swords.map(
            (sword) =>
              html` <span class="checkbox-multiselect-item input-row">
                <label>
                <input
                  type="checkbox"
                  id="${sword.id}"
                  .checked=${this.selection.has(sword)}
                  @change=${() => {
                    this.toggleSelection(sword);
                  }}
                />
                ${sword.name}</label>
              </span>`
          )}
        </div>
        <span id="swords-multiselect-skip"></span>
    `;
  }


  private toggleSelectAll() {
    this.selectAll = !this.selectAll;
  }

  private toggleSelection(sword: Sword) {
    const eventName = this.selection.has(sword) ? "selection-removed" : "selection-added";
    this.dispatchEvent(new CustomEvent(eventName, {detail: [sword.id], bubbles: true, composed: true}));
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'drop-multiselect': DropMultiselectElement;
  }
}
