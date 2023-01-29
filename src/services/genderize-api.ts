import { z } from "zod";

const GenderizeApiResponse = z.object({
  gender: z.string()
});

export const fetchGender = async (name: string) => {
  const response = await fetch(`https://api.genderize.io?name=${name}`);


  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const body = await response.json()

  return GenderizeApiResponse.parse(body).gender;
}
