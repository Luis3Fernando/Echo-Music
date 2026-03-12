import { Playlist } from "@/domain/entities/playlist.entity";

const now = Date.now();

export const USER_PLAYLISTS: Playlist[] = [
  {
    id: "1",
    name: "Avicii Stories",
    artworkUri: "https://www.amoeba.com/sized-images/max/800/800/uploads/albums/covers/other//602547482778.jpg",
    isUserCreated: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "2",
    name: "Kygo",
    artworkUri: "https://i.scdn.co/image/ab67616d00001e02124a6d221e2a68ee6ac2b020",
    isUserCreated: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "3",
    name: "Pedro Suárez Vértiz",
    artworkUri: "https://cdn-images.dzcdn.net/images/cover/5d1905c1a17e884f9f508328420441ac/0x1900-000000-80-0-0.jpg",
    isUserCreated: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "4",
    name: "Shalira hits",
    artworkUri: "https://store.sonymusic.es/cdn/shop/articles/Shakira_560_1.png?v=1708016090",
    isUserCreated: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "5",
    name: "Techno",
    artworkUri: "https://miro.medium.com/0*K2jbty9GAtQeAPc1",
    isUserCreated: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "6",
    name: "Hip Hop Peruano Mas Na",
    artworkUri: "https://i.scdn.co/image/ab6761610000e5eb57d7eb84bed839b92520e7e8",
    isUserCreated: true,
    createdAt: now,
    updatedAt: now,
  },
];

export const SYSTEM_PLAYLISTS: Playlist[] = [
  {
    id: "s1",
    name: "Tus favoritos",
    artworkUri: "https://cdn-images.dzcdn.net/images/cover/c826f0c50a44790792218e7f66fb67c5/0x1900-000000-80-0-0.jpg",
    isUserCreated: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "s2",
    name: "Recién agregadas",
    artworkUri: "https://cdn-images.dzcdn.net/images/cover/3bf0c8c2dde58f17dda729bd641c18da/0x1900-000000-80-0-0.jpg",
    isUserCreated: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "s3",
    name: "Lo más escuchado",
    artworkUri: "https://cdn-images.dzcdn.net/images/cover/4e98a7af653c67d1030a763a20976c57/0x1900-000000-80-0-0.jpg",
    isUserCreated: false,
    createdAt: now,
    updatedAt: now,
  },
];