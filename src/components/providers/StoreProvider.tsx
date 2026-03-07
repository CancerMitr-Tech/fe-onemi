"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { setToken, setUserName } from "@/store/authSlice";
import { setCart, setProductDetails } from "@/store/cartSlice";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    // Hydrate store from localStorage on first render (client only)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) storeRef.current.dispatch(setToken(token));
      const userName = localStorage.getItem("auth_name");
      if (userName) storeRef.current.dispatch(setUserName(userName));

      try {
        const cartStr = localStorage.getItem("mhr_cart");
        if (cartStr) {
          const cart = JSON.parse(cartStr);
          if (cart.cartId) {
            storeRef.current.dispatch(
              setCart({ cartId: cart.cartId, cartType: cart.cartType ?? "BUY_NOW" })
            );
          }
          if (cart.product) {
            storeRef.current.dispatch(
              setProductDetails({
                id: cart.product.id ?? 0,
                name: cart.product.name,
                mrp: cart.product.mrp,
                price: cart.product.price,
              })
            );
          }
        }
      } catch {
        // ignore malformed cart data
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
