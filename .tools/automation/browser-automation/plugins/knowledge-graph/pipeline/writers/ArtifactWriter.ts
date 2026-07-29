export interface ArtifactWriter {
  write(filename: string, content: string | Buffer): void;
}
