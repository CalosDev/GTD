import type { AudiovisualContent } from "../types/content";
import type { ManagedPageContent } from "../types/page";
import { siteConfig } from "../config/site";

const WP_API_URL = import.meta.env.WP_API_URL;
const SHOW_DEMO_CONTENT = import.meta.env.PUBLIC_SHOW_DEMO_CONTENT === "true";
const WORDPRESS_BASE_URL = WP_API_URL?.replace(/\/$/, "") || "";
const HOME_SLOT_SLUGS = [
  siteConfig.homeHeroSlug,
  siteConfig.homePresentationSlug,
].filter(Boolean);

interface GetContentsOptions {
  includeHomeSlots?: boolean;
}

type WordPressPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  date: string;
  acf?: {
    tipo_contenido?: "imagen" | "video";
    url_video?: string;
    fecha_evento?: string;
    ubicacion?: string;
    destacado?: boolean;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
};

type WordPressPage = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
};

function removeHtml(html = "") {
  return html.replace(/<[^>]*>?/gm, "").trim();
}

function normalizeSearchValue(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isDemoContent(item: AudiovisualContent) {
  const values = [item.title, item.slug, item.description]
    .map(normalizeSearchValue)
    .join(" ");

  return (
    values.includes("-de-prueba") ||
    values.includes(" de prueba") ||
    values.includes("contenido audiovisual de prueba") ||
    values.includes("contenido de prueba") ||
    values.includes("validar la conexion entre wordpress y astro")
  );
}

function isHomeSlotContent(item: AudiovisualContent) {
  return HOME_SLOT_SLUGS.includes(item.slug);
}

function getEmbeddedImage(
  entity: Pick<WordPressPost, "_embedded"> | Pick<WordPressPage, "_embedded">,
) {
  return (
    entity._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    siteConfig.defaultImage
  );
}

async function fetchWordPressJson<T>(path: string): Promise<T | null> {
  if (!WORDPRESS_BASE_URL) {
    console.warn("Falta configurar WP_API_URL en el archivo .env");
    return null;
  }

  try {
    const response = await fetch(`${WORDPRESS_BASE_URL}${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`Error obteniendo datos desde WordPress: ${path}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn("No se pudo conectar con WordPress:", error);
    return null;
  }
}

function getCategory(post: WordPressPost) {
  const terms = post._embedded?.["wp:term"]?.flat() || [];
  const category = terms.find((term) => term.taxonomy === "category");

  return category?.name || "Sin categoría";
}

function normalizeContent(post: WordPressPost): AudiovisualContent {
  const description =
    removeHtml(post.excerpt?.rendered) ||
    removeHtml(post.content?.rendered) ||
    "Sin descripción disponible.";

  return {
    id: post.id,
    title: removeHtml(post.title.rendered),
    slug: post.slug,
    description,
    type: post.acf?.tipo_contenido || "imagen",
    category: getCategory(post),
    date: post.acf?.fecha_evento || post.date,
    location: post.acf?.ubicacion || siteConfig.location,
    image: getEmbeddedImage(post),
    videoUrl: post.acf?.url_video || "",
    featured: Boolean(post.acf?.destacado),
  };
}

function normalizeManagedPage(page: WordPressPage): ManagedPageContent {
  return {
    id: page.id,
    slug: page.slug,
    title: removeHtml(page.title.rendered),
    excerpt:
      removeHtml(page.excerpt?.rendered) || removeHtml(page.content?.rendered),
    contentHtml: page.content?.rendered?.trim() || "",
    image: getEmbeddedImage(page),
  };
}

export async function getContents(
  options: GetContentsOptions = {},
): Promise<AudiovisualContent[]> {
  const posts = await fetchWordPressJson<WordPressPost[]>(
    "/wp-json/wp/v2/contenido_audiovisual?_embed&per_page=100",
  );

  if (!posts) {
    return [];
  }

  const contents = posts.map(normalizeContent);

  const visibleContents = SHOW_DEMO_CONTENT
    ? contents
    : contents.filter((item) => !isDemoContent(item));

  if (options.includeHomeSlots) {
    return visibleContents;
  }

  return visibleContents.filter((item) => !isHomeSlotContent(item));
}

export async function getPagesBySlugs(
  slugs: string[],
): Promise<Record<string, ManagedPageContent>> {
  const normalizedSlugs = [...new Set(slugs.map((slug) => slug.trim()).filter(Boolean))];

  if (normalizedSlugs.length === 0) {
    return {};
  }

  const querySlugs = normalizedSlugs.map(encodeURIComponent).join(",");
  const pages = await fetchWordPressJson<WordPressPage[]>(
    `/wp-json/wp/v2/pages?_embed&per_page=${normalizedSlugs.length}&slug=${querySlugs}`,
  );

  if (!pages) {
    return {};
  }

  return Object.fromEntries(
    pages.map((page) => {
      const normalizedPage = normalizeManagedPage(page);
      return [normalizedPage.slug, normalizedPage];
    }),
  );
}

export async function getPageBySlug(slug: string): Promise<ManagedPageContent | null> {
  const pages = await getPagesBySlugs([slug]);
  return pages[slug] || null;
}
