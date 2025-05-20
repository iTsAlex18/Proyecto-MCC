export type GalleryType = {
  id: number;
  documentId: string;
  galleryName: string;
  slug: string;
  mainImage: {
    id: number;
    documentId: string;
    name: string;
    url: string;
  };
};