import { ZolloPetWordmark } from "@/components/zollopet-wordmark";

// Site logo. Renders the text wordmark - crisp at any size, no image asset
// needed. When real logo files land in /public (zollopet.png, plus optional
// per-vertical lockups like zollopet-fresh-dog-food.png), swap this back to an
// image cascade with the wordmark as the final fallback.
export function HubLogo({ vertical: _vertical }: { vertical: string }) {
  return <ZolloPetWordmark />;
}
