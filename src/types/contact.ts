export interface SocialPlatformDefinition {
  id: "facebook" | "instagram" | "youtube" | "tiktok";
  label: string;
}

export interface SocialLink extends SocialPlatformDefinition {
  url: string;
}

export interface ContactSettings {
  whatsappPhone: string;
  whatsappUrl: string;
  socialLinks: SocialLink[];
}
