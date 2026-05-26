type ContentType = "imagen" | "video";

export interface AudiovisualContent {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: ContentType;
  category: string;
  date: string;
  location: string;
  image: string;
  videoUrl?: string;
  featured: boolean;
}
