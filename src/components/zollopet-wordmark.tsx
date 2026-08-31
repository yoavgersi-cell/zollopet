import { cn } from "@/lib/utils";

// ZolloPet logotype, recreated in text so it stays crisp at any size and needs
// no image asset. "Zollo" in deep navy, "Pet" in the brand blue, a smaller
// ".com". Scales with the wrapping font-size - size it by setting a text size /
// font-size on `className`.
export function ZolloPetWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-extrabold leading-none tracking-[-0.02em] text-[20px] sm:text-[23px] [font-family:var(--font-display),Georgia,serif]",
        className
      )}
    >
      <span className="text-[#17301F]">Zollo</span>
      <span className="text-[#D99E1B]">Pet</span>
      <span className="ml-[0.06em] text-[0.58em] font-bold text-[#17301F]">.com</span>
    </span>
  );
}
