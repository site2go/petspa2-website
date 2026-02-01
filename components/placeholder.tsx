/**
 * Placeholder component for sections that haven't been generated yet.
 * This file can be deleted once all components are generated.
 */

interface PlaceholderProps {
  section: string;
  height?: string;
}

export default function Placeholder({
  section,
  height = "h-64",
}: PlaceholderProps) {
  return (
    <section
      className={`${height} flex items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/25`}
    >
      <div className="text-center text-muted-foreground">
        <p className="text-lg font-medium">{section}</p>
        <p className="text-sm">Component placeholder</p>
      </div>
    </section>
  );
}
