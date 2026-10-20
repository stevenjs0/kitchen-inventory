export interface LocationPathParts {
  section: string;
  side?: string | null;
  position?: string | null;
  level: string;
}

export function buildLocationPath(parts: LocationPathParts): string {
  return [parts.section, parts.side, parts.position, parts.level]
    .map((part) => (part ?? '').trim())
    .filter(Boolean)
    .join(' ');
}
