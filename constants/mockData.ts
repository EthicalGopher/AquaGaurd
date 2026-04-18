import {
  ActivityItem,
  CategoryOption,
  FeedItem,
  FormData,
  Hotspot,
  ImpactOption,
  ReportDetail,
  TabLayoutType,
} from "./types";

export const TAB_LAYOUT: TabLayoutType[] = [
  {
    name: "index",
    title: "Home",
    shape: "home",
  },
  {
    name: "report",
    title: "My Reports",
    shape: "file-text",
  },
  {
    name: "createReport",
    title: "",
    shape: "plus",
  },
  {
    name: "map",
    title: "Map",
    shape: "map",
  },
  {
    name: "profile",
    title: "Profile",
    shape: "user",
  },
];

export const INITIAL_FORM_DATA: FormData = {
  location: "Koramangala, Bengaluru",
  latitude: 12.9352, // Default Bengaluru coords
  longitude: 77.6245,
  category: "",
  ph: "",
  turbidity: "",
  tds: "",
  source: "Residential Tap",
  waterColor: "Clear / Colorless",
  odor: "",
  description: "",
  impact: "Low",
  media: [],
};

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: "Discoloration", icon: "palette", color: "#83e881" },
  { label: "Bad Smell", icon: "air", color: "#60e9da" },
  { label: "Low Pressure", icon: "speed", color: "#2dbcfe" },
  { label: "Leakage", icon: "water-damage", color: "#fb5151" },
  { label: "Other", icon: "more-horiz", color: "#abadaf" },
];

export const IMPACT_OPTIONS: ImpactOption[] = [
  { label: "Low", color: "#83e881" },
  { label: "Medium", color: "#ffc107" },
  { label: "High", color: "#ff9800" },
  { label: "Critical", color: "#f44336" },
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "1",
    title: "River Turbidity Reported",
    location: "Hudson River",
    time: "2 hours ago",
    status: "Verified",
    icon: "opacity",
    iconColor: "#006b1b",
    statusColorClass: "text-on-tertiary-fixed",
    containerColorClass: "bg-tertiary-fixed",
  },
  {
    id: "2",
    title: "Broken Pipe Notification",
    location: "4th Avenue",
    time: "Yesterday",
    status: "In Progress",
    icon: "plumbing",
    iconColor: "#00675f",
    statusColorClass: "text-primary-dim",
    containerColorClass: "bg-primary-container/20",
  },
  {
    id: "3",
    title: "New Alert: Water Level High",
    location: "Silver Creek",
    time: "3 days ago",
    status: "Archived",
    icon: "add-circle",
    iconColor: "#747779",
    statusColorClass: "text-on-surface-variant",
    containerColorClass: "bg-surface-container-high",
  },
  {
    id: "4",
    title: "Chemical Runoff Suspected",
    location: "Industrial Park",
    time: "5 days ago",
    status: "Action Taken",
    icon: "warning",
    iconColor: "#b31b25",
    statusColorClass: "text-error-dim",
    containerColorClass: "bg-error-container/20",
  },
];

export const MOCK_HOTSPOTS: Hotspot[] = [
  {
    id: "1",
    title: "Blue Basin Reserve",
    location: "Portland, Oregon",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbigU6viwt3PfzvV6J5du_W_rv9SgeS2Y00SLXP8Dan56wqZJOZMOKpswyEqNxwsL8-dn3zsf-Zfj6BMX0k8aTWY0hrGvgak3FVqh2xrIUUA2W9_D97vUT-Ml5Js9SP9A1A3ICIB71-157Qi5Ghk5e7zeCaS4QDuvgcfy55MY4FeKWWjwWbxZznfNX2MMXL5DqPKq_nDN28iUx6qILKGGepmtH97An-bDEQb-0eEz0jcgNIFgwR78SmsnjWWdBPgH5HfzCShqnyw",
    quality: "Good Quality",
    qualityColorClass: "bg-tertiary-container/80",
  },
  {
    id: "2",
    title: "Lower Hudson Basin",
    location: "Jersey City, NJ",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYSm50ZGz8WFd41Pw5ZvK23DXnDW5dq0n55o9kAydbjmopyzs77qLH_1HvhGyvFAtwGauiFb4GE4Xv4VGN8TDlKXEdJpc3_fxIOYtNRjpZWj_y8Y0uOSESMmioXVwazfcIu3OKMkdiaYH4_8vzq3oda-UmLBeO4ZbsWiFUtqyEkF27SY6VSgC66n73Y72Zm2JToi7pUfaneGoozcVA1TDt7l95zFvBv7Sn2lwYgfOEI0dg4ppDAyKfo3nQpMkwMyAAB1Dn592bQg",
    quality: "Severe Alert",
    qualityColorClass: "bg-error-container/80",
  },
  {
    id: "3",
    title: "Emerald Cove",
    location: "Monterey Bay, CA",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2UV6oI5PiW5x7KMTgia0SHhFCM5boxHEXvk_tfYp2aO1ytD8bDy--nbSIhSxPqoOcA8rjqxseLhAhP331ZkEHjTNkNQyMCAYVWTE7kjvAsB7YMDjgLV033pLeR97useUJh_r_6MKqUkAq5Cl7XliBg9DavFjOKyntZPC62Rn--i1vGBQdkVxe1BQouiFX25NuXH6icjBfGxI-aAIJedzfNFLGkilD8TD2AuQeNpji5IboP2_gQ4X0rFYecmAvA1aTjMlS_M0A_Q",
    quality: "Moderate",
    qualityColorClass: "bg-secondary-container/80",
  },
];

export const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: "1",
    author: "Elena Brooks",
    authorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjI4VyVSejckQXjRTSHp4AADNVWQDar5YxqFjla0oiHrYw9bd-ncWICerqIbCXcUGZRT8Nu48nzmwO8tzuqyYrseti5f0x4J3iQdlvyBS9i9KypKb8wqgBmUdcpAynmjQMviaY2ZEYUoE8ujzpLTpB5dWs308UnFL5l-FDzPysCF-hADfIYALcw5ZLWIjC5qoNrGxRf-P7UAPM-jhetUIwkAQjDgzH_v4zCGLQ-l4x_LPFIcgs0V9dH2aoR7X1Fk-eeNj1N0YKSQ",
    location: "Highland Creek • 2h ago",
    time: "2h ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0_LTEtVQ1h9x7Hd5igvjqwqvRH2X31Cz2zodsoi4sE2WJeYM8uXsDt2VfBvziEsQX4Bf1JqljitA86ElGU8cNFKeu9hADoWZWx9_9_ywBZhGjuqbyGRGBR7MXNq5wp2Uk6bP8Q6ji3Lrjgd5_VJXqMcwHZiqC1nqZdp-doSjf9JVvSJwac_SibyJFk6Wgqj8oI3slOBI76SLDjU4BnKxJOS3aoG-BanZK-v_gaPK87zlFRUepdHvKdHX-UwzxL9KSzzkzbUNQyw",
    ph: "7.2",
    turbidity: "5 NTU",
    quality: "Good Quality",
    qualityColorClass: "bg-tertiary",
    description:
      "Water clarity is exceptional today after the light rain. Observed local fauna returning to the banks. All metrics within healthy range.",
    supportCount: 124,
    commentCount: 18,
    isVerified: true,
  },
  {
    id: "2",
    author: "Marcus Vance",
    authorImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8U_EbNhovbII8bFj0rnCLNkuoy7Z-xTxFa8WkJ1JL_d7Yhv9pVH61vnj4Rdsvcz2itsVOKViW2TCUTX5IWoAlTIYpDDcYvrUUB8Ivmx-0ys4CygZ3h0nDSo59VtiEmVyZds3qc6uC3bH9H6exAYoNiC2pdqFb5uHtxzutMgXGGb7UzTxdP5C41asIFrrWYwfGhb4S4-0uYbA5YKrVcD1JLhdcA6jEJd7fF0IsUxQOvkNEkFK0FeQbS8fwuRJYiIWup64te3ny3g",
    location: "East Side Tap • 5h ago",
    time: "5h ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACS3PUEQ-bZ7KvtdIQlwAD2B8LMgFSIhjmEhBVlFLXhvVDyWFLZ60s3dVuV3gp996hymIGNf4SsAA3f66JAPNTX13fsOBomjZtJiZ34g7IJcMj9mgllyjNZYGF-GBddHwq96sss3m7cmqyLv_rpsskbhrr3gFwRfmMIzcY8jnkTqMp9qKZknbaYajse2ZgJKh2JIfJyzzXrLUt6_ggCF318Rbn0t2d_pBAiG9xskDH0QXegY3BsjASp5m-wr4bhiHcoCdpgi5NNQ",
    ph: "Iron 0.5mg/L",
    turbidity: "",
    quality: "Moderate",
    qualityColorClass: "bg-secondary",
    description:
      "Noticeable discoloration in tap water this morning at the community center. Seems to be isolated to the north wing.",
    supportCount: 45,
    commentCount: 32,
    isVerified: false,
  },
];

export const MOCK_REPORT_DETAILS: ReportDetail[] = [
  {
    id: "1",
    title: "River Turbidity Reported",
    location: "Hudson River, New York",
    latitude: 40.7128,
    longitude: -74.006,
    category: "Discoloration",
    impact: "Medium",
    status: "Verified",
    ph: "7.2",
    turbidity: "15 NTU",
    tds: "150 PPM",
    description:
      "The water near the main pier appears significantly more turbid than usual following the storm last night. Local residents have reported a brownish tint.",
    media: [
      {
        uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0_LTEtVQ1h9x7Hd5igvjqwqvRH2X31Cz2zodsoi4sE2WJeYM8uXsDt2VfBvziEsQX4Bf1JqljitA86ElGU8cNFKeu9hADoWZWx9_9_ywBZhGjuqbyGRGBR7MXNq5wp2Uk6bP8Q6ji3Lrjgd5_VJXqMcwHZiqC1nqZdp-doSjf9JVvSJwac_SibyJFk6Wgqj8oI3slOBI76SLDjU4BnKxJOS3aoG-BanZK-v_gaPK87zlFRUepdHvKdHX-UwzxL9KSzzkzbUNQyw",
        type: "image",
      },
    ],
    time: "2 hours ago",
    author: "Elena Brooks",
    comments: [
      {
        id: "c1",
        author: "John Doe",
        text: "I noticed this too! It was much clearer yesterday.",
        time: "1 hour ago",
      },
      {
        id: "c2",
        author: "Sarah Smith",
        text: "Thanks for reporting. I've notified the local council.",
        time: "30 mins ago",
      },
    ],
  },
  {
    id: "2",
    title: "Broken Pipe Notification",
    location: "4th Avenue, Brooklyn",
    latitude: 40.6833,
    longitude: -73.9781,
    category: "Leakage",
    impact: "High",
    status: "In Progress",
    description: "Main water line burst under the sidewalk. Significant flooding on the street.",
    media: [],
    time: "Yesterday",
    author: "Marcus Vance",
    comments: [],
  },
  {
    id: "3",
    title: "Low Water Pressure",
    location: "Indiranagar, Bengaluru",
    latitude: 12.9784,
    longitude: 77.6408,
    category: "Low Pressure",
    impact: "Low",
    status: "Verified",
    description:
      "Consistent low pressure reported across multiple residential blocks since morning.",
    media: [],
    time: "5 hours ago",
    author: "Amit Kumar",
    comments: [],
  },
  {
    id: "4",
    title: "Sewage Leak Detected",
    location: "Koramangala 4th Block, Bengaluru",
    latitude: 12.9317,
    longitude: 77.6227,
    category: "Leakage",
    impact: "Critical",
    status: "Action Taken",
    description:
      "Major sewage overflow near the community park. Health hazard warning issued.",
    media: [],
    time: "1 day ago",
    author: "Suresh Rao",
    comments: [],
  },
];
