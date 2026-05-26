import { siteConfig } from "../config/site";
import type { ContactSettings, SocialLink, SocialPlatformDefinition } from "../types/contact";
import { getPageBySlug } from "./wordpress";

export const socialPlatforms: SocialPlatformDefinition[] = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
];

const SOCIAL_MATCHERS: Array<{
  id: SocialPlatformDefinition["id"];
  pattern: RegExp;
}> = [
  { id: "facebook", pattern: /facebook\.com/i },
  { id: "instagram", pattern: /instagram\.com/i },
  { id: "youtube", pattern: /(youtube\.com|youtu\.be)/i },
  { id: "tiktok", pattern: /tiktok\.com/i },
];

function normalizeExternalUrl(value = "") {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function extractAnchorHrefs(html = "") {
  const matches = html.matchAll(/<a[^>]+href=(["'])(.*?)\1/gi);
  return Array.from(matches, (match) => normalizeExternalUrl(match[2] || ""));
}

function getSocialLinksFromUrls(urls: string[]): SocialLink[] {
  return socialPlatforms.reduce<SocialLink[]>((accumulator, platform) => {
    const matcher = SOCIAL_MATCHERS.find((item) => item.id === platform.id);
    const url = urls.find((item) => matcher?.pattern.test(item));

    if (!url) {
      return accumulator;
    }

    accumulator.push({
      ...platform,
      url,
    });

    return accumulator;
  }, []);
}

function extractWhatsAppPhone(urls: string[]) {
  for (const value of urls) {
    if (!/(wa\.me|whatsapp\.com|api\.whatsapp\.com|whatsapp:)/i.test(value)) {
      continue;
    }

    try {
      if (/^whatsapp:/i.test(value)) {
        const url = new URL(value);
        const phone = (url.searchParams.get("phone") || "").replace(/\D/g, "");

        if (phone) {
          return phone;
        }
      }

      const url = new URL(value);
      const pathPhone = url.pathname.replace(/\//g, "").replace(/\D/g, "");
      const queryPhone = (url.searchParams.get("phone") || "").replace(/\D/g, "");
      const resolvedPhone = pathPhone || queryPhone;

      if (resolvedPhone) {
        return resolvedPhone;
      }
    } catch {
      const fallbackMatch = value.match(/(\d{8,16})/);

      if (fallbackMatch?.[1]) {
        return fallbackMatch[1];
      }
    }
  }

  return "";
}

export function buildWhatsAppUrl(whatsappPhone: string, message = "") {
  const normalizedPhone = (whatsappPhone || "").replace(/\D/g, "");

  if (!normalizedPhone) {
    return "";
  }

  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${normalizedPhone}${encodedMessage}`;
}

export function getWhatsAppShareUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export async function getContactSettings(): Promise<ContactSettings> {
  const contactPage = await getPageBySlug("contacto");
  const urls = extractAnchorHrefs(contactPage?.contentHtml || "");
  const whatsappPhone = extractWhatsAppPhone(urls);

  return {
    whatsappPhone,
    whatsappUrl: buildWhatsAppUrl(
      whatsappPhone,
      `Hola, quiero informacion sobre ${siteConfig.name}.`,
    ),
    socialLinks: getSocialLinksFromUrls(urls),
  };
}
