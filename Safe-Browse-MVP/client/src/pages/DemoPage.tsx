import { useState } from "react";
import { BrowserShell, AICoachOverlay } from "@/components/demo/BrowserShell";
import { SearchResults } from "@/components/demo/SearchResults";
import { TargetWebsite } from "@/components/demo/TargetWebsite";
import { ParentPhone } from "@/components/demo/ParentPhone";
import { Search, ArrowRight, ShieldCheck, Zap, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import appIcon from "@assets/generated_images/minimalist_blue_shield_icon_with_a_leaf_for_safebrowser.png";

export default function DemoPage() {
  // State
  const [url, setUrl] = useState("https://safesearch.engine");
  const [searchQuery, setSearchQuery] = useState("");
  const [pageState, setPageState] = useState<'IDLE' | 'SEARCH_RESULTS' | 'TARGET_WEBSITE' | 'BLOCKED_CONTENT' | 'SAFE_CONTENT'>('IDLE');
  const [showCoach, setShowCoach] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([
    { id: '1', title: 'System Active', message: 'Safebrowser is monitoring browsing activity.', type: 'success', time: 'Now' }
  ]);
  const [activeAlert, setActiveAlert] = useState<any>(null);

  // Actions
  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setUrl(`https://safesearch.engine/search?q=${encodeURIComponent(term)}`);
    
    // Simulate logic
    const riskyTerms = ['weapon', 'gambling', 'hack', 'drug', 'adult'];
    const isRisky = riskyTerms.some(t => term.toLowerCase().includes(t));

    setPageState('SEARCH_RESULTS');

    if (isRisky) {
      // Trigger AI Coach after delay
      setTimeout(() => {
        setShowCoach(true);
      }, 1500); // Slightly longer delay to let them see the results first
    }
  };

  const handleResultClick = (resultUrl: string) => {
      setUrl(resultUrl);
      setPageState('TARGET_WEBSITE');
  };

  const handleCoachProceed = () => {
    setShowCoach(false);
    // Trigger Critical Alert on Parent Phone
    const newAlert = {
      title: "Risky Content Accessed",
      description: `Child overrode AI warning for search: '${searchQuery}'`,
      level: 'critical'
    };
    setActiveAlert(newAlert);
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: 'Safety Override',
      message: 'User bypassed the AI safety coaching.',
      type: 'critical',
      time: 'Just now'
    }, ...prev]);

    setPageState('BLOCKED_CONTENT');
  };

  const handleCoachCancel = () => {
    setShowCoach(false);
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: 'Threat Avoided',
      message: 'User accepted AI coaching and left the page.',
      type: 'success',
      time: 'Just now'
    }, ...prev]);
    setUrl("https://safesearch.engine");
    setPageState('IDLE');
    setSearchQuery("");
  };

  // Render Content based on state
  const renderBrowserContent = () => {
    if (pageState === 'IDLE') {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-zinc-950 text-center p-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
            >
                <img src={appIcon} alt="SafeBrowser" className="w-24 h-24 mb-4 mx-auto drop-shadow-xl" />
                <h1 className="text-4xl font-heading font-bold text-primary mb-2">Safebrowser</h1>
                <p className="text-muted-foreground">The internet, reimagined for safety.</p>
            </motion.div>

            <div className="w-full max-w-md relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
                <input 
                    type="text" 
                    placeholder="Search the web..."
                    className="w-full h-14 pl-12 pr-4 rounded-full border border-zinc-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch((e.target as HTMLInputElement).value);
                    }}
                />
            </div>
            
            <div className="mt-12 flex gap-4 text-sm text-zinc-400">
                <div className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Real-time Protection</div>
                <div className="flex items-center gap-1"><Zap className="h-4 w-4" /> AI Powered</div>
            </div>
        </div>
      );
    }

    if (pageState === 'SEARCH_RESULTS') {
        return (
            <SearchResults query={searchQuery} onResultClick={handleResultClick} />
        );
    }

    if (pageState === 'TARGET_WEBSITE') {
        return (
            <TargetWebsite 
                url={url} 
                onBack={() => {
                    setPageState('SEARCH_RESULTS');
                    setUrl(`https://safesearch.engine/search?q=${encodeURIComponent(searchQuery)}`);
                }} 
            />
        );
    }

    if (pageState === 'BLOCKED_CONTENT') {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-red-50/50 dark:bg-red-950/20 text-center p-8 animate-in zoom-in-95 duration-300">
                 <div className="h-24 w-24 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-6 text-red-600 dark:text-red-400">
                    <ShieldAlert className="h-12 w-12" />
                 </div>
                 <h2 className="text-3xl font-heading font-bold text-red-700 dark:text-red-400 mb-2">Access Restricted</h2>
                 <p className="text-red-600/80 dark:text-red-400/80 max-w-md mb-8">
                    The content you are trying to access has been flagged as unsafe by your family's safety settings.
                 </p>
                 <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={handleCoachCancel}>
                    Return to Safety
                 </Button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
            Safe Content Loaded
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans overflow-hidden">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <img src={appIcon} className="w-8 h-8 rounded-lg shadow-sm" alt="Logo" />
            <span className="font-heading font-bold text-xl tracking-tight">Safebrowser <span className="text-primary text-xs uppercase bg-primary/10 px-2 py-0.5 rounded-full ml-2">Live Demo</span></span>
        </div>
        <div className="flex gap-4">
             <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Reset Demo</Button>
        </div>
      </header>

      {/* Main Stage */}
      <main className="relative z-10 flex-1 flex items-center justify-center gap-12 p-8 max-w-[1600px] mx-auto w-full">
        
        {/* Left Stage: Child's Browser */}
        <div className="flex-1 h-[700px] max-w-4xl w-full relative">
            <div className="absolute -top-12 left-0 text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Child's View (Desktop)
            </div>
            
            <BrowserShell 
                url={url} 
                onUrlChange={setUrl} 
                onSearch={handleSearch}
                isSecure={pageState !== 'BLOCKED_CONTENT'}
            >
                {renderBrowserContent()}
                
                <AICoachOverlay 
                    isVisible={showCoach}
                    message="We noticed you're searching for content that might be harmful. Are you sure you want to proceed?"
                    onProceed={handleCoachProceed}
                    onCancel={handleCoachCancel}
                />
            </BrowserShell>
        </div>

        {/* Right Stage: Parent's Phone */}
        <div className="flex-shrink-0 relative">
             <div className="absolute -top-12 left-0 text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                Parent's View (App)
            </div>
            <ParentPhone notifications={notifications} activeAlert={activeAlert} />
        </div>

      </main>
    </div>
  );
}
