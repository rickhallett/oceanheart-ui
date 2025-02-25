export const CHART_COLORS = [
  "#E779C1",
  "#58C7F3",
  "#71EAD2",
  "#EACE6C",
  "#EC8C78",
  "#9D81E6",
  "#FF5277",
];

export const PRACTICE_TYPES = [
  "Meditation",
  "Energy movements",
  "Sitting in the Rain",
  "High Guard",
  "Dimension Walking",
  "The InBetween",
  "Projection"
];

export const PRACTICE_TYPES_COLORS = PRACTICE_TYPES.map((type, index) => ({
  type,
  color: CHART_COLORS[index % CHART_COLORS.length]
}));