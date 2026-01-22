/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a SEO-friendly URL for projects
 * @param id - Project ID
 * @param title - Project title
 * @returns SEO-friendly project URL
 */
export function generateProjectUrl(id: number, title: string): string {
  const slug = slugify(title);
  return `/project/${id}/${slug}`;
}

/**
 * Generate a SEO-friendly URL for certifications
 * @param id - Certification ID
 * @param title - Certification title
 * @returns SEO-friendly certification URL
 */
export function generateCertificationUrl(id: number, title: string): string {
  const slug = slugify(title);
  return `/certification/${id}/${slug}`;
}

/**
 * Extract ID from a URL path
 * @param path - URL path like "/project/1/project-title" or "/certification/2/cert-title"
 * @returns The ID number or null if not found
 */
export function extractIdFromPath(path: string): number | null {
  const match = path.match(/\/(?:project|certification)\/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}