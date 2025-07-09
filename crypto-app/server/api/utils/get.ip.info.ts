import { IPGeoData } from "../../@types/ipdata";

export async function getIPGeoData(ip: string): Promise<IPGeoData | null> {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`
    );
    const data = await res.json();

    if (data.status !== "success") return null;

    const countryEmoji = getFlagEmoji(data.countryCode);

    return {
      country: data.country,
      countryCode: data.countryCode,
      city: data.city,
      countryEmoji,
    };
  } catch (err) {
    return null;
  }
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
