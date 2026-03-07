import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductDetails {
  id: number;
  name: string;
  mrp: number;
  price: number;
}

interface CartState {
  cartId: string | null;
  cartType: "BUY_NOW" | "REGULAR";
  paymentId: string | null;
  razorpayKey: string | null;
  productDetails: ProductDetails | null;
}

const initialState: CartState = {
  cartId: null,
  cartType: "BUY_NOW",
  paymentId: null,
  razorpayKey: null,
  productDetails: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(
      state,
      action: PayloadAction<{ cartId: string | null; cartType: "BUY_NOW" | "REGULAR" }>
    ) {
      state.cartId = action.payload.cartId;
      state.cartType = action.payload.cartType;
    },
    setPaymentInfo(
      state,
      action: PayloadAction<{ paymentId: string; razorpayKey: string }>
    ) {
      state.paymentId = action.payload.paymentId;
      state.razorpayKey = action.payload.razorpayKey;
    },
    setProductDetails(state, action: PayloadAction<ProductDetails>) {
      state.productDetails = action.payload;
    },
    clearCart(state) {
      state.cartId = null;
      state.cartType = "BUY_NOW";
      state.paymentId = null;
      state.razorpayKey = null;
      state.productDetails = null;
    },
  },
});

export const { setCart, setPaymentInfo, setProductDetails, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
