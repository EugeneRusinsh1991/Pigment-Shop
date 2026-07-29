import * as fs from 'fs';
import * as path from 'path';
import { ArtifactWriter } from './ArtifactWriter';

export class FilesystemWriter implements ArtifactWriter {
  constructor(private outputDir: string) {}

  write(filename: string, content: string | Buffer): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    const outputPath = path.join(this.outputDir, filename);
    fs.writeFileSync(outputPath, content);
  }
}
