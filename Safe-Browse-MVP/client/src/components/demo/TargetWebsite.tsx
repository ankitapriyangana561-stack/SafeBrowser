import { ArrowLeft, Share2, Bookmark, MoreHorizontal, ThumbsUp, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TargetWebsiteProps {
  url: string;
  onBack: () => void;
}

export function TargetWebsite({ url, onBack }: TargetWebsiteProps) {
  // Extract a "topic" from the URL for the mock content
  let topic = "Modern Technology";
  try {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    if (searchParams.get("q")) {
        topic = searchParams.get("q") || topic;
    } else {
        // Fallback for direct URLs
        topic = urlObj.pathname.split('/').pop()?.replace(/-/g, ' ') || "Technology Trends";
    }
  } catch (e) {
    // ignore invalid urls
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-50 overflow-y-auto font-serif">
      {/* Website Header */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <h1 className="font-heading font-bold text-xl tracking-tight text-zinc-900">The Daily Insight</h1>
            <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-zinc-500">
                <span className="text-black cursor-pointer">News</span>
                <span className="hover:text-black cursor-pointer transition-colors">Culture</span>
                <span className="hover:text-black cursor-pointer transition-colors">Tech</span>
                <span className="hover:text-black cursor-pointer transition-colors">Science</span>
            </nav>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
                <SearchIcon className="h-4 w-4" />
            </Button>
            <Button variant="default" size="sm" className="rounded-full px-4 bg-black text-white hover:bg-black/90">
                Subscribe
            </Button>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 w-full">
        <div className="mb-8">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-3 block">Featured Story</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-zinc-900 leading-[1.1] mb-6 capitalize">
                {topic}: A Comprehensive Guide To Understanding The Future
            </h1>
            <p className="text-xl text-zinc-500 leading-relaxed mb-6">
                Everything you need to know about {topic}, explained by industry experts and analyzed for the modern era.
            </p>
            
            <div className="flex items-center justify-between border-y border-zinc-100 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Author" alt="Author" />
                    </div>
                    <div>
                        <div className="font-bold text-sm text-zinc-900">Sarah Jenkins</div>
                        <div className="text-xs text-zinc-500">Published 2 hours ago · 5 min read</div>
                    </div>
                </div>
                <div className="flex gap-2 text-zinc-400">
                    <Share2 className="h-5 w-5 cursor-pointer hover:text-zinc-900" />
                    <Bookmark className="h-5 w-5 cursor-pointer hover:text-zinc-900" />
                </div>
            </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-80 bg-zinc-100 rounded-xl mb-12 overflow-hidden relative">
            <img 
                src={`https://placehold.co/800x400/e2e8f0/1e293b?text=${encodeURIComponent(topic)}`} 
                alt="Article Hero" 
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
            />
            <div className="absolute bottom-4 right-4 text-[10px] text-zinc-500 bg-white/50 px-2 py-1 rounded">
                Image: Editorial Source
            </div>
        </div>

        {/* Body Text */}
        <article className="prose prose-zinc prose-lg max-w-none">
            <p>
                Lorum ipsum dolor sit amet, consectetur adipiscing elit. As we dive deeper into the world of <strong>{topic}</strong>, 
                it becomes increasingly clear that the implications are far-reaching. Experts have long debated the impact of these changes on our daily lives.
            </p>
            <p>
                "It's a paradigm shift," says Dr. Alan Grant, a leading researcher in the field. "We are seeing data points that we never imagined possible just a decade ago."
            </p>
            <h3>The Turning Point</h3>
            <p>
                Recent studies indicate that adoption rates are soaring. This isn't just a trend; it's a fundamental restructuring of how we interact with technology. 
                Consider the following key factors:
            </p>
            <ul>
                <li>Increased accessibility to advanced tools</li>
                <li>Shift in consumer behavior patterns</li>
                <li>Regulatory changes adapting to new realities</li>
            </ul>
            <p>
                However, with great power comes great responsibility. Critics argue that we are moving too fast, without stopping to consider the ethical ramifications.
                Safety advocates suggest that a balanced approach is necessary to ensure long-term stability.
            </p>
            <div className="my-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-blue-900 font-medium m-0 italic">
                    "The future isn't just about what we can build, but what we should build."
                </p>
            </div>
            <h3>Looking Ahead</h3>
            <p>
                As we move forward, staying informed is crucial. <strong>{topic}</strong> will continue to evolve, and keeping up with the latest developments 
                will be essential for anyone looking to stay ahead of the curve.
            </p>
        </article>

        {/* Footer / Comments Area */}
        <div className="mt-16 pt-8 border-t border-zinc-100">
            <h3 className="font-bold text-lg mb-6">Discussion (24)</h3>
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                        <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div className="flex-1">
                            <div className="bg-zinc-50 p-4 rounded-2xl rounded-tl-none">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="font-bold text-sm">User_{924 * i}</span>
                                    <span className="text-xs text-zinc-400">1h ago</span>
                                </div>
                                <p className="text-sm text-zinc-600">
                                    This is a really insightful article about {topic}. I hadn't considered the ethical angle before. Thanks for sharing!
                                </p>
                            </div>
                            <div className="flex gap-4 mt-2 ml-2 text-xs text-zinc-400 font-medium">
                                <span className="flex items-center gap-1 cursor-pointer hover:text-zinc-600"><ThumbsUp className="h-3 w-3" /> 12</span>
                                <span className="cursor-pointer hover:text-zinc-600">Reply</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}

function SearchIcon(props: any) {
    return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      )
}
