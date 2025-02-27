import { combineReducers } from 'redux';
import favoritesReducer from './favoritesReducer';
// ... импорт других редьюсеров

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  // ... другие редьюсеры
});

export default rootReducer; 