import { Combobox, Listbox } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'preact/hooks'
import { useController, UseControllerProps } from 'react-hook-form';
import { Dog } from '../hooks/use-dog-store';
import { Breed, fetchBreeds } from '../services/dog-api';

type Props = {
  id: string
} & UseControllerProps<Dog>

export default function DogBreedPicker(props: Props) {

  const {
    field: { onChange, ref }
  } = useController(props);

  const [selectedBreed, setSelectedBreed] = useState<Breed>();
  const [selectedSub, setSelectedSub] = useState<string>();

  useEffect(() => {
    if (selectedBreed && (!selectedBreed.subBreeds || selectedSub)) {
      onChange(`${selectedSub ? `${selectedSub} ` : ''}${selectedBreed.name}`)
    }
  }, [selectedBreed, selectedSub, onChange])

  const [query, setQuery] = useState<string>()

  const { data: breeds } = useQuery({
    queryKey: ['dog-breeds'],
    queryFn: fetchBreeds
  })

  if (!breeds) {
    return (
      <p>Loading...</p>
    )
  }

  const filteredBreeds = !query ? breeds : breeds.filter((breed) => {
    return breed.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div class="flex">

      <div class="flex-grow">
        <Combobox defaultValue={selectedBreed} onChange={setSelectedBreed}>
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(breed) => {
              return (breed as any as Breed).name
            }}
            id={props.id}
            ref={ref}
            class="w-full bg-slate-700"
            autocomplete="off"
          />
          <Combobox.Options>
            {filteredBreeds.map((breed) => (
              <Combobox.Option
                key={breed.name}
                value={breed}
                class="w-full bg-slate-700"
              >
                {breed.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>

      {!!selectedBreed && selectedBreed.subBreeds &&
        <div class="basis-1/2 ml-1">
          <Listbox defaultValue={selectedSub} onChange={setSelectedSub}>
            <Listbox.Button class="w-full bg-slate-700">{selectedSub || "Select sub-breed"}</Listbox.Button>
            <Listbox.Options>
              {selectedBreed.subBreeds.map((subBreed) => (
                <Listbox.Option
                  key={subBreed}
                  value={subBreed}
                  class="w-full bg-slate-700"
                >
                  {subBreed}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      }

    </div>
  )

}
