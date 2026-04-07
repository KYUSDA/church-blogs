import { createClient } from "@sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const client = createClient({
  projectId: projectId,
  dataset: dataset,
  apiVersion: "2022-02-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
