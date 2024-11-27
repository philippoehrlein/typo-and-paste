export async function loadCharacters() {
  return window.panel.api.get("typo-and-paste/characters");
}
