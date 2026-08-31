import Link from "next/link";
import { ArrowBigUp, MessageSquare } from "lucide-react";

// ───── Verified Reddit community feedback ─────
// Single source of truth for real Reddit material, shared by the review pages
// (stacked thread layout) and the battle pages (carousel). Every field renders
// only when the source screenshot captured it - never estimated. Add a
// provider here only when real source material exists. All excerpts were
// captured against a specific vertical's offers, so callers gate rendering to
// that vertical.

export type RedditReply = { author: string; body: string };
export type RedditThread = {
  subreddit?: string; // "r/telehealth" - omit if the screenshot didn't show it
  author: string; // reddit username without the u/ prefix
  age?: string; // "6mo ago"
  title?: string; // post title; absent for standalone comments
  upvotes?: number; // only when visible in the source screenshot
  commentCount?: number; // only when visible in the source screenshot
  body: string[]; // real excerpt paragraphs
  replies?: RedditReply[];
};

export const REDDIT_COMMUNITY_FEEDBACK: Record<
  string,
  // `themes`: a 1-2 sentence human summary of what keeps coming up in this
  // provider's threads - rendered as the "What we found" synthesis on battle
  // pages. Write it from the displayed threads only, good and bad alike.
  { intro: string; threads: RedditThread[]; takeaway: string; themes?: string }
> = {};

export function RedditMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FF4500" />
      <g fill="#fff">
        <ellipse cx="20" cy="23.5" rx="10.5" ry="7" />
        <circle cx="8.8" cy="21" r="2.6" />
        <circle cx="31.2" cy="21" r="2.6" />
        <circle cx="26.5" cy="9.5" r="2.2" />
        <path d="M20.6 16.9l1.2-6.6 5.3 1.1-.4 1.6-3.8-.8-1 5z" />
      </g>
      <g fill="#FF4500">
        <circle cx="15.8" cy="22.3" r="1.7" />
        <circle cx="24.2" cy="22.3" r="1.7" />
      </g>
      <path d="M15.5 26.6c1.3 1.1 2.8 1.6 4.5 1.6s3.2-.5 4.5-1.6" stroke="#FF4500" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ───── Reddit thread carousel (battle pages) ─────
// One thread per scroll-snap card, styled like the Reddit post it excerpts:
// r/ identity line, title, body excerpt, top reply, vote/comment footer. On a
// two-provider page each card is tagged with the provider it's about. Cards
// keep to the first two excerpt paragraphs - the full threads live on each
// provider's review page, which the section links to.

function ThreadCard({
  thread,
  providerName,
  reviewHref,
}: {
  thread: RedditThread;
  providerName: string;
  reviewHref: string;
}) {
  return (
    <div className="flex w-[320px] shrink-0 snap-start flex-col rounded-xl border border-gray-200 bg-[#FCFCFC] p-4 sm:w-[350px]">
      {/* Identity line - nowrap with a truncating author so the provider tag
          never drops to a second row on long usernames */}
      <div className="mb-2 flex items-center gap-x-1.5 text-[12px]">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4500] text-[10px] font-bold text-white">
          r/
        </span>
        <span className="shrink-0 font-bold text-[#22362A]">{thread.subreddit ?? "Reddit"}</span>
        <span className="text-gray-400">·</span>
        <span className="min-w-0 truncate text-gray-500">u/{thread.author}</span>
        {thread.age && (
          <>
            <span className="text-gray-400">·</span>
            <span className="shrink-0 text-gray-500">{thread.age}</span>
          </>
        )}
        <span className="ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10.5px] font-semibold text-gray-500">
          about {providerName}
        </span>
      </div>

      {thread.title && (
        <p className="mb-1.5 text-[14px] font-bold leading-snug text-[#22362A]">{thread.title}</p>
      )}

      <div className="space-y-2">
        {thread.body.slice(0, 2).map((p, i) => (
          <p key={i} className="text-[13px] leading-relaxed text-gray-700">
            {p}
          </p>
        ))}
      </div>

      {thread.replies && thread.replies.length > 0 && (
        <div className="mt-3 border-l-2 border-gray-200 pl-3">
          <p className="text-[11.5px] font-semibold text-gray-500">u/{thread.replies[0].author}</p>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-gray-600">{thread.replies[0].body}</p>
        </div>
      )}

      {/* Footer - counts only when the screenshot captured them */}
      <div className="mt-auto flex items-center gap-4 pt-3 text-[12px] font-semibold text-gray-500">
        {typeof thread.upvotes === "number" && (
          <span className="flex items-center gap-1">
            <ArrowBigUp className="h-4 w-4 text-[#FF4500]" strokeWidth={2} />
            {thread.upvotes}
          </span>
        )}
        {typeof thread.commentCount === "number" && (
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
            {thread.commentCount}
          </span>
        )}
        <Link href={reviewHref} className="ml-auto font-semibold text-[#1F4A33] hover:underline">
          Full thread in review
        </Link>
      </div>
    </div>
  );
}

export function RedditThreadCarousel({
  providers,
  reviewHrefFor,
}: {
  providers: { id: string; name: string }[];
  reviewHrefFor: (providerId: string) => string;
}) {
  const withData = providers.filter((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);
  if (withData.length === 0) return null;

  // Interleave the providers' threads so both brands appear within the first
  // couple of cards instead of one provider's whole list running first.
  const lists = withData.map((p) =>
    REDDIT_COMMUNITY_FEEDBACK[p.id].threads.map((t) => ({ provider: p, thread: t }))
  );
  const cards: { provider: { id: string; name: string }; thread: RedditThread }[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) {
    for (const l of lists) if (i < l.length) cards.push(l[i]);
  }
  const names = withData.map((p) => p.name).join(" and ");

  return (
    <div className="mb-14">
      <div className="mb-2 flex items-center gap-2.5">
        <RedditMark className="h-7 w-7 shrink-0" />
        <h2 className="text-[20px] font-bold text-[#22362A]">What Reddit says about {names}</h2>
      </div>
      <p className="mb-5 max-w-[640px] text-[14.5px] leading-relaxed text-gray-600">
        Excerpts from real public Reddit posts and comments - the strengths and the caveats, in
        users&rsquo; own words.
        {withData.length < providers.length &&
          " We only show providers with verified Reddit material, so not every contender appears here."}
      </p>

      <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
        {cards.map(({ provider, thread }, i) => (
          <ThreadCard
            key={i}
            thread={thread}
            providerName={provider.name}
            reviewHref={reviewHrefFor(provider.id)}
          />
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-gray-400">
        Excerpts from public Reddit posts, lightly trimmed; vote and comment counts shown as
        captured at the time of review. Reddit is a trademark of Reddit, Inc. and is not affiliated
        with this site.
      </p>
    </div>
  );
}
