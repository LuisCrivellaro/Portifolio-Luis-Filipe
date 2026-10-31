import { existsSync } from "node:fs";
import path from "node:path";

// Server-only: lets sections show photos, screenshots and the CV only once the file is in public/.
export function publicAssetExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), "public", src));
}
