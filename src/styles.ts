import {css} from 'lit';

export const inputStyles = css`
/* Label */
label {
  position: relative;
  display: table;
  margin: 0 0 1rem;
}

label > small {
  color: var(--muted);
}

label > small:first-child::after,
label > small:first-child::before {
  content: "\A";
  white-space: pre;
}

label:has(> :is(input, textarea, button)) {
  cursor: pointer;
}

/* Generic input */
input, select, textarea, button {
  display: block;
  box-sizing: border-box;
  border: 1px solid var(--bd-muted);
  border-radius: var(--bd-radius);
  margin-top: .25rem;
  background: var(--bg-default);
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  transition: border-color var(--tr-duration);
}

input, select, textarea {
  width: 100%;
}

/* Text area */
textarea {
  width: calc(100% - 1rem);
  padding: .5rem;
  appearance: none;
  cursor: text;
  resize: none;
}

:is(textarea, select):hover {
  border-color: var(--accent);
}

:is(input, textarea, select):disabled {
  background-color: var(--bg-muted);
  cursor: not-allowed;
}

/* Select */
select {
  width: 100%;
  padding: .35rem .5rem;
  text-transform: none;
}

/* Input */
input {
  appearance: none;
}

input:not(:disabled):hover {
  border-color: var(--accent);
}

input:not([type="radio"],[type="checkbox"]) {
  position: relative;
  min-height: 1.5rem;
  padding: .25rem .5rem;
}

input:is([type="radio"],[type="checkbox"]), input[type="checkbox"]::before {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin: 0 .25rem;
  vertical-align: middle;
}

input[type="checkbox"] {
  border-radius: 0;
}

input[type="radio"] {
  border-width: 2px;
  border-radius: 50%;
}

input[type="radio"]:checked {
  border-width: .25rem;
  border-color: var(--accent);
}

input[type="checkbox"]:checked {
  border-color: var(--accent);
  background: var(--accent);
}

input[type="checkbox"]:checked::before {
  position: absolute;
  margin: 0;
  background: var(--light);
  content: "";
  mask: center center / 75% no-repeat;
  mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOSIgdmlld0JveD0iMCAwIDEyIDkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTEuNzgwMyAwLjIxOTYyNUMxMS45MjEgMC4zNjA0MjcgMTIgMC41NTEzMDUgMTIgMC43NTAzMTNDMTIgMC45NDkzMjEgMTEuOTIxIDEuMTQwMTkgMTEuNzgwMyAxLjI4MUw0LjUxODYgOC41NDA0MkM0LjM3Nzc1IDguNjgxIDQuMTg2ODIgOC43NiAzLjk4Nzc0IDguNzZDMy43ODg2NyA4Ljc2IDMuNTk3NzMgOC42ODEgMy40NTY4OSA4LjU0MDQyTDAuMjAxNjIyIDUuMjg2MkMwLjA2ODkyNzcgNS4xNDM4MyAtMC4wMDMzMDkwNSA0Ljk1NTU1IDAuMDAwMTE2NDkzIDQuNzYwOThDMC4wMDM1NTIwNSA0LjU2NjQzIDAuMDgyMzg5NCA0LjM4MDgxIDAuMjIwMDMyIDQuMjQzMjFDMC4zNTc2NjUgNC4xMDU2MiAwLjU0MzM1NSA0LjAyNjgxIDAuNzM3OTcgNC4wMjMzOEMwLjkzMjU4NCA0LjAxOTk0IDEuMTIwOTMgNC4wOTIxNyAxLjI2MzM0IDQuMjI0ODJMMy45ODc3NCA2Ljk0ODM1TDEwLjcxODYgMC4yMTk2MjVDMTAuODU5NSAwLjA3ODk5MjMgMTEuMDUwNCAwIDExLjI0OTUgMEMxMS40NDg1IDAgMTEuNjM5NSAwLjA3ODk5MjMgMTEuNzgwMyAwLjIxOTYyNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=");
}

input:is([type="radio"],[type="checkbox"]):disabled {
  background-color: var(--bd-muted);
}

input[type="checkbox"]:disabled {
  border-color: transparent;
}

input[type="range"] {
  height: .5rem;
  border: transparent;
  margin: .75rem 0;
  accent-color: var(--accent);
  appearance: auto;
  background: var(--bg-subtle);
}

input[type="file"]::file-selector-button {
  border: 1px solid var(--bd-muted);
  border-radius: var(--bd-radius);
  background: transparent;
  color: var(--accent);
  font: inherit;
}

input[type="file"]:hover::file-selector-button {
  background: var(--accent);
  color: var(--light);
}

/* Buttons */
button, input:is([type="submit"],[type="reset"],[type="button"],[type="image"]) {
  display: inline-block;
  padding: .25rem .75rem;
  margin: .25rem .125rem;
  background: transparent;
  color: var(--accent);
  text-transform: none;
  transition: background var(--tr-duration), color var(--tr-duration), filter var(--tr-duration);
}

input:is([type="image"],[type="file"],[type="color"]) {
  padding: .25rem;
}

:is(button, input:is([type="submit"],[type="reset"],[type="button"],[type="image"])):disabled {
  cursor: not-allowed;
  opacity: .5;
}

:is(button, input)[type="reset"] {
  color: var(--danger);
}

:is(button, input:is([type="submit"],[type="reset"],[type="button"],[type="image"])):not(:disabled):active {
  filter: brightness(80%);
}

button[type]:not([type="button"]), input:is([type="submit"],[type="reset"]) {
  border-color: currentColor;
}

:is(button, input:is([type="submit"],[type="reset"],[type="button"],[type="image"])):not(:disabled):hover,
:is(button, input:is([type="submit"],[type="reset"],[type="button"],[type="image"])):not(:disabled):active {
  border-color: transparent;
  background: var(--accent);
  color: var(--light);
}

:is(button, input)[type="reset"]:not(:disabled):hover,
:is(button, input)[type="reset"]:not(:disabled):active {
  border-color: transparent;
  background: var(--danger);
  color: var(--light);
}`;

export const detailStyles = css`/* Details */
details {
  display: block;
  padding: 1rem;
  border: 1px solid var(--bd-muted);
  border-radius: var(--bd-radius);
  margin: 0 0 1rem;
}

summary {
  display: list-item;
  border-radius: calc(var(--bd-radius) - 1px) calc(var(--bd-radius) - 1px) 0 0;
  color: var(--accent);
  cursor: pointer;
  user-select: none;
}

summary:hover {
  text-decoration: underline;
}

details[open] > summary {
  padding: 1rem;
  border-bottom: 1px solid var(--bd-muted);
  margin: -1rem;
  margin-bottom: 1rem;
  background: var(--bg-muted);
}

summary > :is(h1, h2, h3, h4, h5, h6) {
  display: inline;
}
`;