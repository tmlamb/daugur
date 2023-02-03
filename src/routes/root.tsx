import { Listbox } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "preact/hooks";
import { Link, Outlet } from "react-router-dom";
import { dogStore } from '../hooks/dog-store'
import useDogStore, { Dog } from "../hooks/use-dog-store";
import { fetchAge } from "../services/agify-api";
import { fetchGender } from "../services/genderize-api";
import { fetchCountryId } from "../services/nationalize-api";

export default function Root() {

  const dogs = dogStore.useState(state => state.dogs)

  const [selectedDog, setSelectedDog] = useState<Dog>()

  const { data: age } = useQuery({
    queryKey: [
      'dog-age',
      selectedDog?.name
    ],
    queryFn: () => fetchAge(selectedDog?.name || ''),
    enabled: !!selectedDog?.name
  })

  const { data: gender } = useQuery({
    queryKey: [
      'dog-gender',
      selectedDog?.name
    ],
    queryFn: () => fetchGender(selectedDog?.name || ''),
    enabled: !!selectedDog?.name
  })

  const { data: countryId } = useQuery({
    queryKey: [
      'dog-country',
      selectedDog?.name
    ],
    queryFn: () => fetchCountryId(selectedDog?.name || ''),
    enabled: !!selectedDog?.name
  })

  const regionNames = useMemo(() => new Intl.DisplayNames(['en'], { type: "region" }), [])

  return (
    <div class="flex h-full">
      <div id="sidebar" class="flex flex-col justify-between py-12 px-3 basis-1/3 bg-gray-300 text-gray-900 text-lg">

        <div class="mb-8">
          <h1 class="text-2xl font-bold mb-2">Welcome To Daugur!</h1>
          <p class="mb-8">Select a dog to ask the augers about, or <Link class="text-sky-800 font-bold" to={`dog`}>add a dog</Link></p>
          <div class="relative">

            <Listbox defaultValue={selectedDog} onChange={setSelectedDog}>
              <Listbox.Button class="bg-white w-full">{selectedDog?.name || 'Select Dog'}</Listbox.Button>
              <div class="absolute bg-white w-full">
                <Listbox.Options>
                  {dogs.filter(dog => dog.id !== selectedDog?.id).map(dog => (
                    <Listbox.Option
                      key={dog.id}
                      value={dog}
                    >
                      {dog.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

          </div>
        </div>

        {selectedDog && (
          <div>

            <h2 class="text-xl font-bold mb-2">
              The augers say {selectedDog.name} is...
            </h2>

            <div class="px-14">
              <div class="flex justify-between">
                <span>Breed</span>
                <span>{selectedDog.breed}</span>
              </div>

              <div class="flex justify-between">
                <span>Age</span>
                <span>{age ? (Math.floor(age / 7)) : 'Searching...'}</span>
              </div>

              <div class="flex justify-between">
                <span>Gender</span>
                <span>{gender || 'Searching...'}</span>
              </div>

              <div class="flex justify-between">
                <span>Country</span>
                <span>{countryId ? regionNames.of(countryId) : 'Searching...'}</span>
              </div>
            </div>

          </div>
        )}

      </div>

      <div class="flex-grow bg-slate-800">
        <Outlet />
      </div>

    </div>
  )
}

