export interface ImageFile {
  file: File;
  previewUrl: string;
  base64: string;
}

export interface FashionFeatureProps {
  title: string;
  description: string;
  label1: string;
  label2: string;
  actionLabel: string;
  promptTemplate: string;
}
