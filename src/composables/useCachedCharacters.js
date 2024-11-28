let characters;

export async function useCachedCharacters() {
  if (characters) return characters;

  try {
    characters = await window.panel.api.get("typo-and-paste/characters");
  } catch (error) {
    console.error("Error loading characters:", error);
    characters = [];
  }

  return characters;
}
