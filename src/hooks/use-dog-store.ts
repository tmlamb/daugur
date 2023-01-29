import produce from 'immer';
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type Dog = {
  id: number;
  name: string;
  breed: string;
}

type State = {
  dogs: Dog[];
}

type Actions = {
  addDog: (dog: Dog) => void;
}

const useDogStore = create(
  immer<State & Actions>((set) => ({
    dogs: [],
    addDog: (dog) => {
      set(
        produce((state: State) => {
          state.dogs.push(dog)
        })
      )
    },
  }))
)

// without immer
// const useDogStore = create<State & Actions>((set) => ({
//   dogs: [],
//   addDog: (dog) => {
//     set(({dogs}) => ({
//       dogs: [...dogs, dog]   
//     }))
//   },
// }))

export default useDogStore;
