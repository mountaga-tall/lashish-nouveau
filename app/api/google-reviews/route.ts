import { getCloudflareContext } from "@opennextjs/cloudflare";

const FALLBACK_MAPS_URI = "https://www.google.com/maps/search/?api=1&query=La%20Shish+Riviera+Bonoumin+Abidjan";

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
  let placeId = "";
  try {
    apiKey = String(getCloudflareContext().env.GOOGLE_PLACES_API_KEY || "").trim();
    placeId = String(getCloudflareContext().env.GOOGLE_PLACE_ID || "").trim();
  } catch {
    apiKey = "";
    placeId = "";
  }

  const base = {
    configured: Boolean(apiKey),
    placeName: "LA SHISH",
    rating: null as number | null,
    reviewCount: null as number | null,
    googleMapsUri: FALLBACK_MAPS_URI,
    writeReviewUri: FALLBACK_MAPS_URI,
    reviews: [] as Array<{
      rating: number;
      text: string;
      relativeTime: string;
      author: { name: string; uri: string; photoUri: string };
      googleMapsUri: string;
    }>,
  };

  if (!apiKey || !placeId) return json(base);

  const url = new URL("https://places.googleapis.com/v1/places/" + encodeURIComponent(placeId));
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
      googleMapsUri: place.googleMapsUri || FALLBACK_MAPS_URI,
      writeReviewUri: "https://search.google.com/local/writereview?placeid=" + encodeURIComponent(placeId),
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
