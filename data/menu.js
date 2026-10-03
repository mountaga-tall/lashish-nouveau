/* La Shish — catalogue centralisé. Chaque catégorie reste dans son propre fichier. */
window.MENU_ALL = [
  ...(window.MENU_PETIT_DEJEUNER || []),
  ...(window.MENU_ENTREES || []),
  ...(window.MENU_SNACKS || []),
  ...(window.MENU_PLATS || []),
  ...(window.MENU_SPECIALITES || []),
  ...(window.MENU_PIZZAS || []),
  ...(window.MENU_TACOS || []),
  ...(window.MENU_BOISSONS || []),
  ...(window.MENU_DESSERTS || []),
  ...(window.MENU_COCKTAILS || []),
  ...(window.MENU_VINS || [])
].sort((a,b)=>Number(a.id)-Number(b.id));
