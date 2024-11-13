const LISTS_KEY = "drop_counter_lists";
export const DEFAULT_LIST = "Drop List"
let storage = window.localStorage;

let loadedLists = storage.getItem(LISTS_KEY);
export const LISTS = loadedLists ? JSON.parse(loadedLists) : [DEFAULT_LIST];

export function getList(list_name: string) {
	// restore from string
	const data = storage.getItem(list_name) || "";
	return JSON.parse(data);
}

export function saveList(list_name: string, state: object){
	storage.setItem(list_name, JSON.stringify(state));
}

export function saveLists(lists: string[]) {
	storage.setItem(LISTS_KEY, JSON.stringify(lists));
}
