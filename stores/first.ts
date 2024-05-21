import {create} from 'zustand'

type Store = { count: number, increasePopulation: () => void, decreasePopulation: () => void }
export const useFirstStore = create<Store>((set) => ({
  count: 0,
  increasePopulation: () => set((state: any) => ({count: state.count + 1})),
  decreasePopulation: () => set((state: any) => ({count: state.count - 1})),
}))