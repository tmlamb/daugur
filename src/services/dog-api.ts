import { z } from "zod";

export type Breed = {
  name: string;
  subBreeds?: string[];
}

const DogBreedsApiResponse = z.object({
  message: z.record(z.string(), z.array(z.string()))
});

export const fetchBreeds = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const body = await response.json()

  const breeds = DogBreedsApiResponse.parse(body).message;

  return Object.keys(breeds)
    .map((name) => ({
      name,
      subBreeds: breeds[name].length > 0
        ? breeds[name]
        : undefined
    } as Breed))
}
