
export function IntroVideo({ width = 560, height = 315 }: { width?: number; height?: number; }) {
  return (
    <iframe width={width} height={height} src="https://www.youtube.com/embed/a-9-SqhJmD8?si=2FD_FAyt9Wak20xe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
  );
}
