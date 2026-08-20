type HighlightProps = {
  /** Full sentence. */
  text: string;
  /** Substring inside `text` to emphasise. Rendered as <strong>. */
  emphasis: string;
};

/**
 * Renders `text` with the first occurrence of `emphasis` wrapped in <strong>.
 * Keeps the emphasised phrase in the copy data instead of splitting sentences
 * across JSX fragments. Falls back to plain text when the phrase is absent.
 */
export function Highlight({ text, emphasis }: HighlightProps) {
  if (!emphasis) return <>{text}</>;
  const start = text.indexOf(emphasis);
  if (start === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, start)}
      <strong>{emphasis}</strong>
      {text.slice(start + emphasis.length)}
    </>
  );
}
