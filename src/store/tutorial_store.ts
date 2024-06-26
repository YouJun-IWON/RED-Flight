import { create } from "zustand";

type State = {
  count: number;
  increment: () => void;
};

export const useCount = create<State>(set => ({
  count: 1,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
