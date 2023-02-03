
import { Store } from "pullstate";
import { Dog } from './use-dog-store'

// with pullstate
export const dogStore = new Store({
  dogs: [] as Dog[],
})

// updates the given state
export const addDog = (dog: Dog) => {
  dogStore.update(s => {
    s.dogs.push(dog)
  })
}
