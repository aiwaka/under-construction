/**
 * `alt`, `caption`は両方省略はできず, この場合警告がコンソールに表示される.
 * `alt`を省略した場合自動的に`caption`が用いられる.
 */
export interface BlogImageProps {
  src: string | ImageMetadata | Promise<{ default: ImageMetadata }>;
  width: number;
  height?: number;
  aspectRatio?: string;
  alt?: string;
  caption?: string;
}
