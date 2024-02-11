import { IbookData, ICart } from '@/components/shared/Types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для состояния аутентификации
interface AuthState {
  token: string | null;
  email: string | null;
  error: string | null;
  cart: ICart[]; // Поле для корзины с книгами
  isLogged: boolean;
}

// Инициализируем начальное состояние
const initialState: AuthState = {
  token: null,
  email: null,
  error: null,
  cart: [], // Инициализируем пустую корзину
  isLogged: false,
};

// Создаем срез состояния для аутентификации
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state: AuthState, action: PayloadAction<{ token: string, email: string }>) => {
      state.token = action.payload.token;
      state.email = action.payload.email; // Сохраняем email пользователя
      state.error = null;
      state.isLogged = true;

      // Восстанавливаем корзину из localStorage при входе пользователя
      const storedCart = localStorage.getItem(`cart_${action.payload.email}`);
      if (storedCart) {
        state.cart = JSON.parse(storedCart);
      }
    },
    loginFailure: (state: AuthState, action: PayloadAction<string>) => {
      state.token = null;
      state.email = null; // Сбрасываем email в случае ошибки входа
      state.error = action.payload;
      state.isLogged = false;
    },
    logOut: (state: AuthState) => {
      // сбрасываем данные после выхода из профиля
      state.token = null;
      state.email = null; 
      state.error = null;
      state.isLogged = false;
      // Удаляем корзину из localStorage при выходе из профиля
      localStorage.removeItem(`cart_${state.email}`);
      // Очищаем корзину в состоянии
      state.cart = [];
    },
    addToCart: (state: AuthState, action: PayloadAction<ICart>) => {
      if (state.isLogged) { // Проверяем авторизацию
        state.cart = state.cart || [];
        state.cart.push(action.payload);
        // Сохраняем корзину в localStorage
        localStorage.setItem(`cart_${state.email}`, JSON.stringify(state.cart));
      } else {
        // В случае, если пользователь не авторизован
        console.log('Log In to add books in the cart');
      }
    },
    updateCartQuantity: (state: AuthState, action: PayloadAction<{ book: IbookData, quantity: number }>) => {
      const { book, quantity } = action.payload;
      const index = state.cart.findIndex(item => item.book.id === book.id);
      if (index !== -1) {
        if (quantity > 0) {
          state.cart[index].quantity = quantity;
        } else {
          // Если количество стало 0, удаляем книгу из корзины
          state.cart.splice(index, 1);
        }
        // Сохраняем корзину в localStorage
        localStorage.setItem(`cart_${state.email}`, JSON.stringify(state.cart));
      }
    }
  },
});

// Экспортируем экшены и редьюсер
export const { loginSuccess, loginFailure, logOut, addToCart } = authSlice.actions;
export const { updateCartQuantity } = authSlice.actions;

// Селекторы для получения данных из состояния
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectEmail = (state: { auth: AuthState }) => state.auth.email; 
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectCart = (state: { auth: AuthState }) => state.auth.cart;
export const selectLogged = (state: { auth: AuthState }) => state.auth.isLogged;

// Экспортируем редьюсер
export default authSlice.reducer;