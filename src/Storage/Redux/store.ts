import { configureStore } from "@reduxjs/toolkit";
import { menuItemApi, shoppingCartApi, authApi } from "../../api";
import { menuItemReducer } from "./menuItemSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { userAuthReducer, userAuthSlice } from "./userAuthSlice";

const store = configureStore({
    reducer: {
        menuItemStore: menuItemReducer,
        shoppingCartStore: shoppingCartReducer,
        userAuthStore : userAuthReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(menuItemApi.middleware)
            .concat(shoppingCartApi.middleware)
            .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;