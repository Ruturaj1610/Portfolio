import type { ProjectMediaItem } from '../types/portfolio';

const DB_NAME = 'RuturajPortfolioMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_files';

interface StoredMediaRecord {
  id: string;
  projectId: string;
  name: string;
  type: 'image' | 'video';
  mimeType: string;
  size: number;
  blob: Blob;
  createdAt: number;
}

// In-memory cache of object URLs created from IndexedDB blobs
const objectUrlCache = new Map<string, string>();

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('projectId', 'projectId', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });

  return dbPromise;
}

/**
 * Save a binary file (Image or Video) to IndexedDB
 */
export async function saveMediaFile(
  id: string,
  projectId: string,
  file: File
): Promise<ProjectMediaItem> {
  const db = await getDB();
  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|ogg|mov)$/i.test(file.name);
  const type: 'image' | 'video' = isVideo ? 'video' : 'image';

  const record: StoredMediaRecord = {
    id,
    projectId,
    name: file.name,
    type,
    mimeType: file.type || (isVideo ? 'video/mp4' : 'image/jpeg'),
    size: file.size,
    blob: file,
    createdAt: Date.now()
  };

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(record);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });

  // Create persistent in-session object URL
  const objectUrl = URL.createObjectURL(file);
  objectUrlCache.set(id, objectUrl);

  return {
    id,
    type,
    url: objectUrl,
    name: file.name,
    size: file.size,
    source: 'indexeddb',
    isCover: false
  };
}

/**
 * Retrieve blob URL from IndexedDB or memory cache
 */
export async function getMediaUrl(id: string): Promise<string | null> {
  if (objectUrlCache.has(id)) {
    return objectUrlCache.get(id)!;
  }

  try {
    const db = await getDB();
    const record = await new Promise<StoredMediaRecord | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => resolve(req.result as StoredMediaRecord | undefined);
      req.onerror = () => reject(req.error);
    });

    if (record && record.blob) {
      const url = URL.createObjectURL(record.blob);
      objectUrlCache.set(id, url);
      return url;
    }
  } catch (err) {
    console.warn(`Failed to retrieve media ${id} from IndexedDB:`, err);
  }

  return null;
}

/**
 * Delete a media item from IndexedDB
 */
export async function deleteMediaFile(id: string): Promise<void> {
  if (objectUrlCache.has(id)) {
    URL.revokeObjectURL(objectUrlCache.get(id)!);
    objectUrlCache.delete(id);
  }

  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`Failed to delete media ${id} from IndexedDB:`, err);
  }
}

/**
 * Format bytes into human-readable string (KB, MB)
 */
export function formatBytes(bytes?: number): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Parse an external video/image URL (YouTube, Vimeo, direct MP4, CDN image)
 */
export function parseExternalMediaUrl(
  inputUrl: string,
  caption?: string
): ProjectMediaItem {
  const trimmed = inputUrl.trim();
  const id = `ext-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // YouTube match: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/\s]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      id,
      type: 'video',
      url: trimmed,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
      name: caption || `YouTube Video (${videoId})`,
      source: 'external',
      externalProvider: 'youtube',
      caption: caption || ''
    };
  }

  // Vimeo match: vimeo.com/123456789
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/i);
  if (vimeoMatch && (vimeoMatch[3] || vimeoMatch[1])) {
    const videoId = vimeoMatch[3] || vimeoMatch[1];
    return {
      id,
      type: 'video',
      url: trimmed,
      embedUrl: `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`,
      name: caption || `Vimeo Video (${videoId})`,
      source: 'external',
      externalProvider: 'vimeo',
      caption: caption || ''
    };
  }

  // Direct video file link
  const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed);
  if (isDirectVideo) {
    const filename = trimmed.split('/').pop()?.split('?')[0] || 'External Video';
    return {
      id,
      type: 'video',
      url: trimmed,
      name: caption || filename,
      source: 'external',
      externalProvider: 'direct',
      caption: caption || ''
    };
  }

  // Otherwise treat as external image URL
  const filename = trimmed.split('/').pop()?.split('?')[0] || 'External Image';
  return {
    id,
    type: 'image',
    url: trimmed,
    name: caption || filename,
    source: 'external',
    externalProvider: 'direct',
    caption: caption || ''
  };
}
