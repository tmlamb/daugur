import { z } from "zod";

const NationalizeApiResponse = z.object({
  country: z.array(z.object({ country_id: z.string() }))
});

export const fetchCountryId = async (name: string) => {
  const response = await fetch(`https://api.nationalize.io?name=${name}`);


  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const body = await response.json()

  return NationalizeApiResponse.parse(body).country[0]?.country_id;
}
