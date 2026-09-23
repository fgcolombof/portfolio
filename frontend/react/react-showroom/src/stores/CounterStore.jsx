import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,
  action: "reset",
  increment: () =>
    set((state) => ({ count: state.count + 1, action: "increment" })),
  decrement: () =>
    set((state) => ({ count: state.count - 1, action: "decrement" })),
  reset: () => set({ count: 0, action: "reset" }),
}));
