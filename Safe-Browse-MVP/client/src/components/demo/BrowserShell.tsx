import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Shield, ShieldAlert, ArrowRight, X, Lock, RefreshCw, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BrowserShellProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSearch: (term: string) => void;
  children: React.ReactNode;
  isSecure?: boolean;
}

export function BrowserShell({ url, onUrlChange, onSearch, children, isSecure = true }: BrowserShellProps) {
  const [inputValue, setInputValue] = useState(url);

  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-black/5">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border-b border-border">
        <div className="flex gap-1.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
        </div>
        
        <div className="flex gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex-1 relative group">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            {isSecure ? <Lock className="h-3.5 w-3.5 text-emerald-500" /> : <ShieldAlert className="h-3.5 w-3.5 text-red-500" />}
          </div>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 pl-8 pr-3 text-sm bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white dark:bg-zinc-950 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function AICoachOverlay({ 
  isVisible, 
  message, 
  onProceed, 
  onCancel 
}: { 
  isVisible: boolean; 
  message: string; 
  onProceed: () => void; 
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute bottom-8 right-8 max-w-sm z-50"
        >
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-primary/20 p-5 rounded-2xl shadow-xl ring-1 ring-primary/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary/10 p-2.5 rounded-xl">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="font-heading font-semibold text-lg text-foreground">Wait a second...</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {message}
                </p>
                <div className="flex gap-2 mt-4 pt-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={onCancel}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Go Back
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={onProceed}
                    className="flex-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    Proceed Anyway
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
