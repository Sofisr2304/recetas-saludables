// Claves de almacenamiento
const RECIPES_KEY = 'recetas';
const USERS_KEY = 'usuarios';
const SESSION_KEY = 'sesion';

// ----------------------
// 🥗 Recetas
// ----------------------

export const saveRecipe = (receta) => {
  const recetas = getRecipes();
  recetas.push(receta);
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recetas));
};

export const getRecipes = () => {
  return JSON.parse(localStorage.getItem(RECIPES_KEY)) || [];
};

export const deleteRecipe = (id) => {
  const recetas = getRecipes().filter(r => r.id !== id);
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recetas));
};


// ----------------------
// 👤 Usuarios
// ----------------------

export const registerUser = (usuario) => {
  const usuarios = getUsers();
  usuarios.push(usuario);
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const loginUser = ({ email, password }) => {
  const users = getUsers();
  const match = users.find(u => u.email === email && u.password === password);
  if (match) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(match));
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
};

export const isLoggedIn = () => {
  return !!getCurrentUser();
};

// ----------------------
// ❤️ Favoritos
// ----------------------

export const toggleFavorite = (recetaId) => {
  const user = getCurrentUser();
  if (!user) return;

  let favoritos = getFavorites();
  if (favoritos.includes(recetaId)) {
    favoritos = favoritos.filter(id => id !== recetaId);
  } else {
    favoritos.push(recetaId);
  }

  localStorage.setItem(`favoritos_${user.email}`, JSON.stringify(favoritos));
};

export const getFavorites = () => {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(`favoritos_${user.email}`)) || [];
};

export const isFavorite = (recetaId) => {
  return getFavorites().includes(recetaId);
};

