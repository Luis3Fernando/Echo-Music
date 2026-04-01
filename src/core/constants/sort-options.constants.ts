export type SortOptionType = 
  | "Por nombre (A-Z)" 
  | "Por nombre (Z-A)" 
  | "Más recientes" 
  | "Por artista" 
  | "Por duración";

export interface SortMenuItem {
  label: SortOptionType;
  icon: string;
}

export const TRACK_SORT_OPTIONS: SortMenuItem[] = [
  { label: "Por nombre (A-Z)", icon: "text-outline" },
  { label: "Por nombre (Z-A)", icon: "text-outline" },
  { label: "Más recientes", icon: "time-outline" },
  { label: "Por artista", icon: "person-outline" },
  { label: "Por duración", icon: "hourglass-outline" },
];