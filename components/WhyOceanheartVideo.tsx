
export function WhyOceanheartVideo({ width = 560, height = 315 }: { width?: number; height?: number; }) {
  return (
    <iframe width={width} height={height} src="https://www.youtube.com/embed/UdShw9CIH9s?si=IHRJdsH8X_v75tds" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  );
}
