export const siteConfig = {
  name: import.meta.env.PUBLIC_SITE_NAME || "GTD Agency",
  logoText: import.meta.env.PUBLIC_SITE_LOGO_TEXT || "GTD",
  tagline: import.meta.env.PUBLIC_SITE_TAGLINE || "Galeria audiovisual",
  description:
    import.meta.env.PUBLIC_SITE_DESCRIPTION ||
    "Galeria audiovisual de entrenamientos, marchas, desfiles y actividades militares en Republica Dominicana.",
  location: import.meta.env.PUBLIC_SITE_LOCATION || "Republica Dominicana",
  url: (import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321").replace(/\/$/, ""),
  defaultImage: import.meta.env.PUBLIC_OG_IMAGE || "/og-image.jpg",
  homeHeroSlug: import.meta.env.PUBLIC_HOME_HERO_SLUG || "home-hero",
  homePresentationSlug:
    import.meta.env.PUBLIC_HOME_PRESENTATION_SLUG || "home-presentation",
  homeOverviewPageSlug:
    import.meta.env.PUBLIC_HOME_OVERVIEW_PAGE_SLUG || "home-overview",
  homeFeaturedPageSlug:
    import.meta.env.PUBLIC_HOME_FEATURED_PAGE_SLUG || "home-featured",
  homeRecentPageSlug:
    import.meta.env.PUBLIC_HOME_RECENT_PAGE_SLUG || "home-recent",
};

export function getAbsoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
