import { Search, MoreVertical, Globe, ImageIcon, Play, Newspaper, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchResultsProps {
  query: string;
  onResultClick: (url: string) => void;
}

export function SearchResults({ query, onResultClick }: SearchResultsProps) {
  // Mock results generation
  const results = [
    {
      title: `Complete Guide to ${query} - Expert Advice`,
      url: `https://www.expert-guides.com/${query.replace(/\s+/g, '-')}`,
      snippet: `Learn everything you need to know about ${query}. Comprehensive tutorials, safety guidelines, and expert tips for beginners and professionals alike.`,
      date: "2 days ago"
    },
    {
      title: `${query} | Wikipedia`,
      url: `https://en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}`,
      snippet: `${query} is a term that refers to... Read more about the history, usage, and related concepts on Wikipedia, the free encyclopedia.`,
      date: "Oct 12, 2023"
    },
    {
      title: `Top 10 Facts About ${query}`,
      url: `https://www.daily-lists.net/top-10-${query.replace(/\s+/g, '-')}`,
      snippet: `Discover the most interesting facts about ${query} that you probably didn't know. Number 7 will shock you!`,
      date: "1 week ago"
    },
    {
      title: `Latest News on ${query}`,
      url: `https://www.news-daily.com/topics/${query.replace(/\s+/g, '-')}`,
      snippet: `Breaking news, headlines, and updates about ${query}. Stay informed with the latest coverage from around the globe.`,
      date: "3 hours ago"
    },
    {
      title: `Forum: Discussion about ${query}`,
      url: `https://www.community-talk.org/threads/${query.replace(/\s+/g, '-')}`,
      snippet: `Join the discussion. "I tried ${query} yesterday and..." - Read user reviews and community feedback.`,
      date: "Yesterday"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 overflow-y-auto">
      {/* Search Header (Mock) */}
      <div className="border-b border-border sticky top-0 bg-white dark:bg-zinc-950 z-10 px-6 py-3 flex items-center gap-6">
        <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">S</div>
            <span className="font-heading font-bold text-lg hidden sm:inline-block">Safesearch</span>
        </div>
        
        <div className="flex-1 max-w-2xl relative">
            <input 
                type="text" 
                value={query} 
                readOnly
                className="w-full h-10 pl-4 pr-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border-transparent focus:border-primary/50 text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="hidden md:flex gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-36 border-b border-border bg-white dark:bg-zinc-950 sticky top-[65px] z-10 hidden md:block">
        <div className="flex gap-6 text-sm text-muted-foreground">
            <button className="flex items-center gap-2 py-3 border-b-2 border-primary text-primary font-medium">
                <Search className="h-4 w-4" /> All
            </button>
            <button className="flex items-center gap-2 py-3 border-b-2 border-transparent hover:text-foreground transition-colors">
                <ImageIcon className="h-4 w-4" /> Images
            </button>
            <button className="flex items-center gap-2 py-3 border-b-2 border-transparent hover:text-foreground transition-colors">
                <Play className="h-4 w-4" /> Videos
            </button>
            <button className="flex items-center gap-2 py-3 border-b-2 border-transparent hover:text-foreground transition-colors">
                <Newspaper className="h-4 w-4" /> News
            </button>
            <button className="flex items-center gap-2 py-3 border-b-2 border-transparent hover:text-foreground transition-colors">
                <MoreHorizontal className="h-4 w-4" /> More
            </button>
        </div>
      </div>

      {/* Results Area */}
      <div className="px-6 md:px-36 py-6 max-w-5xl space-y-8 animate-in fade-in duration-500">
        <div className="text-xs text-muted-foreground">
            About 1,230,000 results (0.42 seconds)
        </div>

        {/* AI Overview Mock */}
        <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-border/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-5 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                <h3 className="text-sm font-semibold">AI Overview</h3>
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
                <strong>{query}</strong> is a topic that encompasses various aspects. 
                Based on available data, it involves complex interactions between different systems. 
                <span className="opacity-70"> Experts recommend exercising caution and verifying sources when researching this topic online.</span>
            </p>
            <div className="mt-4 flex gap-2">
                 <div className="h-24 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                 <div className="h-24 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                 <div className="h-24 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>
        </div>

        {/* Standard Results */}
        {results.map((result, index) => (
            <div key={index} className="group cursor-pointer" onClick={() => onResultClick(result.url)}>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Globe className="h-3 w-3" />
                    <span>{new URL(result.url).hostname}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-400" />
                    <span>{result.date}</span>
                </div>
                <h3 className="text-xl text-blue-600 dark:text-blue-400 font-medium group-hover:underline mb-1">
                    {result.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {result.snippet}
                </p>
            </div>
        ))}

        {/* Pagination Mock */}
        <div className="py-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map(p => (
                <Button 
                    key={p} 
                    variant={p === 1 ? "default" : "ghost"} 
                    size="sm" 
                    className="w-8 h-8 rounded-full p-0"
                >
                    {p}
                </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
