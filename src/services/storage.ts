import localforage from 'localforage';

export interface MediaItem {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

const STORAGE_KEY = 'stash_media_items';

// Initialize localforage
localforage.config({
  name: 'StashMVP',
  storeName: 'media',
});

export const getMediaItems = async (): Promise<MediaItem[]> => {
  const items = await localforage.getItem<MediaItem[]>(STORAGE_KEY);
  return items || [];
};

export const getMediaItem = async (id: string): Promise<MediaItem | null> => {
  const items = await getMediaItems();
  return items.find((item) => item.id === id) || null;
};

export const addMediaItem = async (
  data: Omit<MediaItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<MediaItem> => {
  const items = await getMediaItems();
  const newItem: MediaItem = {
    ...data,
    id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  items.push(newItem);
  await localforage.setItem(STORAGE_KEY, items);
  return newItem;
};

export const updateMediaItem = async (
  id: string,
  data: Partial<Omit<MediaItem, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<MediaItem | null> => {
  const items = await getMediaItems();
  const index = items.findIndex((item) => item.id === id);
  
  if (index === -1) return null;
  
  items[index] = {
    ...items[index],
    ...data,
    updatedAt: Date.now(),
  };
  
  await localforage.setItem(STORAGE_KEY, items);
  return items[index];
};

export const deleteMediaItem = async (id: string): Promise<boolean> => {
  const items = await getMediaItems();
  const filteredItems = items.filter((item) => item.id !== id);
  
  if (filteredItems.length === items.length) return false;
  
  await localforage.setItem(STORAGE_KEY, filteredItems);
  return true;
};

export const getAllTags = async (): Promise<{ [key: string]: number }> => {
  const items = await getMediaItems();
  const tagCounts: { [key: string]: number } = {};
  
  items.forEach((item) => {
    item.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return tagCounts;
};