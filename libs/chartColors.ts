export const CHART_COLORS = [
  // Pinks and purples
  "#FF00FF", // Neon pink
  "#E779C1", // Bright pink (original)
  "#DF4CCE", // Deep pink
  "#B967FF", // Electric purple
  "#9D81E6", // Purple (original)
  "#7B68EE", // Medium slate blue

  // Blues
  "#58C7F3", // Light blue (original)
  "#36ADFF", // Bright blue
  "#0088FF", // Deep blue
  "#007BFF", // Azure blue

  // Teals and cyans
  "#00FFFF", // Cyan
  "#71EAD2", // Teal (original)
  "#00FFCC", // Bright teal
  "#1AFFD5", // Electric teal

  // Oranges, yellows, reds
  "#EACE6C", // Yellow (original)
  "#FFC261", // Golden
  "#FF9649", // Orange
  "#EC8C78", // Salmon (original)
  "#FF5277", // Red (original)
  "#FF2A6D", // Hot pink

  // Additional colors to complete the set
  "#01EFE6", // Bright turquoise
  "#FC1BFD", // Magenta
];

export const PRACTICE_TYPES = [
  "Meditation",
  "Sitting In The Rain",
  "Energy Movements",
  "High Guard",
  "Feels Like",
  "Surrender",
  "Tonglen",
  "Scanning",
  "Manifestation",
  "The Tones",
  "Mind Projection",
  "Koan Meditation",
  "Conversations with God",
  "Time Stepping",
  "Brain Wiggle",
  "The White Fire",
  "Energise Water",
  "Aums",
  "Seeing Auras",
  "Watching Static",
  "Prana Walking",
  "Cloud Busting"
];

export const PRACTICE_TYPES_COLORS = PRACTICE_TYPES.map((type, index) => ({
  type,
  color: CHART_COLORS[index % CHART_COLORS.length]
}));