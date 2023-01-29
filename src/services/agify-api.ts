import { z } from "zod";

const AgifyApiResponse = z.object({
  age: z.number()
});

export const fetchAge = async (name: string) => {
  const response = await fetch(`https://api.agify.io?name=${name}`);


  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const body = await response.json()

  return AgifyApiResponse.parse(body).age;
}
