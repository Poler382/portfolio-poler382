export interface Profile {
  name: string;
  image: string | null;
  socialMedia: {
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}
