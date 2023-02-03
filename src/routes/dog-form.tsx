import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DogBreedPicker from "../components/dog-breed-picker";
import { addDog } from '../hooks/dog-store'
import useDogStore, { Dog } from "../hooks/use-dog-store";

export default function DogForm() {

  const { 
    register, 
    control, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm<Dog>({
    defaultValues: {
      id: Date.now(),
    }
  });

  const navigate = useNavigate();

  // const addDog = useDogStore(state => state.addDog);
  

  const onSubmit = handleSubmit(dog => {
    addDog(dog);
    navigate(`/`);
  });

  console.log(watch("name"));

  return (
    <div class="py-24 px-3">
      <form onSubmit={onSubmit} class="flex flex-col space-y-3 max-w-sm mx-auto text-lg text-white">

        <div class="flex flex-col">
          <div class="flex justify-between">
            <label htmlFor="name">Name:</label>
            {errors.name && <span class="text-red-300">This field is required</span>}
          </div>
          <input id="name" class="bg-slate-700" autocomplete="off" {...register("name", { required: true })} />
        </div>

        <div class="flex flex-col">
          <div class="flex justify-between">
            <label htmlFor="breed">Breed:</label>
            {errors.breed && <span class="text-red-300">This field is required</span>}
          </div>
          <DogBreedPicker id="breed" name="breed" control={control} rules={{ required: true }} />
        </div>

        <input type="submit" />

      </form>
    </div>
  )
}
