import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string;
  schema?: Record<string, any>;
}

const BASE_URL = "https://www.academiaflipper.com.br";
const DEFAULT_OG_IMAGE = "/og-flipper-default.jpg";

export default function SEOHead({ title, description, path = "/", image, keywords, schema }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large");
    setMeta("author", "Academia Flipper");
    if (keywords) {
      setMeta("keywords", keywords);
    }

    // OG
    setMeta("og:type", "website", true);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", `${BASE_URL}${path}`, true);
    setMeta("og:site_name", "Academia Flipper", true);
    setMeta("og:locale", "pt_BR", true);
    setMeta("og:image", image || DEFAULT_OG_IMAGE, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image || DEFAULT_OG_IMAGE);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);

    // JSON-LD Schema
    if (schema) {
      const existingSchema = document.querySelector('script[data-seo-schema]');
      if (existingSchema) {
        existingSchema.remove();
      }
      const scriptEl = document.createElement("script");
      scriptEl.setAttribute("type", "application/ld+json");
      scriptEl.setAttribute("data-seo-schema", "true");
      scriptEl.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptEl);

      return () => {
        const el = document.querySelector('script[data-seo-schema]');
        if (el) el.remove();
      };
    }
  }, [title, description, path, image, keywords, schema]);

  return null;
}
