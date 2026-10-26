import { useState, useEffect } from 'react';
import type { ProjectMediaItem } from '../types/portfolio';
import { getMediaUrl } from '../utils/mediaStorage';

export function useMediaGallery(gallery?: ProjectMediaItem[]) {
  const [resolvedGallery, setResolvedGallery] = useState<ProjectMediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function resolveUrls() {
      if (!gallery || gallery.length === 0) {
        if (isMounted) setResolvedGallery([]);
        return;
      }

      setLoading(true);
      const items: ProjectMediaItem[] = [];

      for (const item of gallery) {
        if (item.source === 'indexeddb') {
          try {
            const resolvedUrl = await getMediaUrl(item.id);
            items.push({
              ...item,
              url: resolvedUrl || item.url
            });
          } catch {
            items.push(item);
          }
        } else {
          items.push(item);
        }
      }

      if (isMounted) {
        setResolvedGallery(items);
        setLoading(false);
      }
    }

    resolveUrls();

    return () => {
      isMounted = false;
    };
  }, [gallery]);

  return { resolvedGallery, loading };
}
