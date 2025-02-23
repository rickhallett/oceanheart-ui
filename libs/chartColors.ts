export const CHART_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#F39C12",
  "#808080"
];

export const PRACTICE_TYPES = [
  "Meditation",
  "Energy movements",
  "Sitting in the rain",
  "Water of life",
  "The tones",
  "High Guard",
  "Projection",
  "Jumping"
];

export const PRACTICE_TYPES_COLORS = PRACTICE_TYPES.map((type, index) => ({
  type,
  color: CHART_COLORS[index % CHART_COLORS.length]
}));

