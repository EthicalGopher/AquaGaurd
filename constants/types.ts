import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export type ImpactLevel = "Low" | "Medium" | "High" | "Critical";

export interface MediaItem {
  uri: string;
  type: "image" | "video";
}

export interface FormData {
  location: string;
  latitude: number | null;
  longitude: number | null;
  category: string;
  ph: string;
  turbidity: string;
  tds: string;
  source: string;
  waterColor: string;
  odor: string;
  description: string;
  impact: ImpactLevel;
  media: MediaItem[];
}

export interface TabLayoutType {
  name: string;
  title: string;
  shape: React.ComponentProps<typeof FontAwesome>["name"];
}

export interface CategoryOption {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export interface ImpactOption {
  label: ImpactLevel;
  color: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  location: string;
  time: string;
  status: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  statusColorClass: string;
  containerColorClass: string;
}

export interface Hotspot {
  id: string;
  title: string;
  location: string;
  image: string;
  quality: string;
  qualityColorClass: string;
}

export interface FeedItem {
  id: string;
  author: string;
  authorImage: string;
  location: string;
  time: string;
  image: string;
  ph: string;
  turbidity: string;
  quality: string;
  qualityColorClass: string;
  description: string;
  supportCount: number;
  commentCount: number;
  isVerified: boolean;
}

export interface Comment {
  id: string;
  author: string;
  authorImage?: string;
  text: string;
  time: string;
}

export interface ReportDetail {
  id: string;
  title: string;
  location: string;
  latitude: number;
  longitude: number;
  category: string;
  impact: ImpactLevel;
  status: string;
  ph?: string;
  turbidity?: string;
  tds?: string;
  description: string;
  media: MediaItem[];
  time: string;
  author: string;
  comments: Comment[];
}
