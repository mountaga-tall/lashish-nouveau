import { getCloudflareContext } from "@opennextjs/cloudflare";

const PLACE_ID = "ChIJH_1DNLTswQ8RGDapIiJHCn4";
const MAPS_URI = "https://www.google.com/maps/search/?api=1&query=La%20Shish%20Abidjan&query_place_id=" + PLACE_ID;
const WRITE_REVIEW_URI = "https://search.google.com/local/writereview?placeid=" + PLACE_ID;

type GoogleReview = {
  rating?: number;
  text?: { text?: string | null };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
};

function localeToLanguage(value: string | null) {
  if (value === "en" || value === "ar") return value;
  return "fr";
}

function json(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=86400",
      "Vary": "Accept-Language",
    },
  });
}

export async function GET(request: Request) {
  const locale = localeToLanguage(new URL(request.url).searchParams.get("locale"));

  let apiKey = "";
  try {
    apiKey = String(getCloudflareContext().env.GOOGLE_PLACES_API_KEY || "").trim();
  } catch {
    apiKey = "";
  }

  const base = {
    configured: Boolean(apiKey),
    placeName: "LA SHISH",
    rating: null as number | null,
    reviewCount: null as number | null,
    googleMapsUri: MAPS_URI,
    writeReviewUri: WRITE_REVIEW_URI,
    reviews: [] as Array<{
      rating: number;
      text: string;
      relativeTime: string;
      author: { name: string; uri: string; photoUri: string };
      googleMapsUri: string;
    }>,
  };

  if (!apiKey) return json(base);

  const url = new URL("https://places.googleapis.com/v1/places/" + PLACE_ID);
  url.searchParams.set("languageCode", locale);
  url.searchParams.set("regionCode", "CI");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    });

    if (!response.ok) return json(base, 502);

    const place = await response.json() as {
      displayName?: { text?: string };
      rating?: number;
      userRatingCount?: number;
      reviews?: GoogleReview[];
      googleMapsUri?: string;
    };

    return json({
      ...base,
      configured: true,
      placeName: place.displayName?.text || "LA SHISH",
      rating: typeof place.rating === "number" ? place.rating : null,
      reviewCount: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
      googleMapsUri: place.googleMapsUri || MAPS_URI,
      reviews: (place.reviews || []).slice(0, 5).map((review) => ({
        rating: typeof review.rating === "number" ? review.rating : 0,
        text: review.text?.text || "",
        relativeTime: review.relativePublishTimeDescription || "",
        author: {
          name: review.authorAttribution?.displayName || "Google user",
          uri: review.authorAttribution?.uri || MAPS_URI,
          photoUri: review.authorAttribution?.photoUri || "",
        },
        googleMapsUri: review.googleMapsUri || MAPS_URI,
      })).filter((review) => review.text),
    });
  } catch {
    return json(base, 502);
  }
}
