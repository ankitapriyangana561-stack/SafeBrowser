import { motion, AnimatePresence } from "framer-motion";
import { Bell, Wifi, Battery, Signal, ShieldAlert, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  time: string;
}

interface ParentPhoneProps {
  notifications: Notification[];
  activeAlert?: {
    title: string;
    description: string;
    level: 'warning' | 'critical';
  } | null;
}

export function ParentPhone({ notifications, activeAlert }: ParentPhoneProps) {
  return (
    <div className="relative w-[320px] h-[650px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-4 border-zinc-800 ring-4 ring-zinc-950/50 select-none">
      {/* Screen */}
      <div className="w-full h-full bg-zinc-50 dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden relative flex flex-col">
        
        {/* Status Bar */}
        <div className="h-12 px-6 flex items-end justify-between pb-2 text-xs font-medium text-zinc-900 dark:text-zinc-100 z-20">
          <span>9:41</span>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-28 h-6 bg-black rounded-b-2xl"></div>
          <div className="flex gap-1.5 items-center">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3 w-3" />
          </div>
        </div>

        {/* Dynamic Island / Alert Area */}
        <div className="relative flex-1 bg-zinc-100 dark:bg-black/95 overflow-hidden">
            {/* Background Image / Wallpaper */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-50" />
            
            <div className="relative z-10 p-4 space-y-6 pt-8">
                {/* Header */}
                <div className="flex justify-between items-center px-2">
                    <div>
                        <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Tuesday, 12 Dec</h2>
                        <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">Dashboard</h1>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                        <div className="h-full w-full rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px]">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Parent" className="rounded-full bg-white h-full w-full" />
                        </div>
                    </div>
                </div>

                {/* Active Alert Card */}
                <AnimatePresence>
                    {activeAlert && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            className="overflow-hidden"
                        >
                            <div className={cn(
                                "p-4 rounded-2xl border shadow-lg relative overflow-hidden",
                                activeAlert.level === 'critical' 
                                    ? "bg-red-500 text-white border-red-600" 
                                    : "bg-amber-500 text-white border-amber-600"
                            )}>
                                <div className="absolute -right-4 -top-4 opacity-20">
                                    <ShieldAlert className="h-24 w-24" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertTriangle className="h-5 w-5 fill-current" />
                                        <span className="font-bold uppercase tracking-wider text-xs">
                                            {activeAlert.level === 'critical' ? 'Critical Alert' : 'Warning'}
                                        </span>
                                    </div>
                                    <h3 className="font-heading font-bold text-lg leading-tight mb-1">{activeAlert.title}</h3>
                                    <p className="text-sm opacity-90">{activeAlert.description}</p>
                                    
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
                                            View Details
                                        </button>
                                        <button className="flex-1 bg-white text-red-600 text-xs font-semibold py-2 rounded-lg shadow-sm hover:bg-zinc-50 transition-colors">
                                            Block Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notifications List */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Activity Feed</h3>
                        <span className="text-xs text-blue-500 font-medium">View All</span>
                    </div>
                    
                    <ScrollArea className="h-[340px] pr-2 -mr-2">
                        <div className="space-y-3 pb-4">
                            <AnimatePresence initial={false}>
                                {notifications.map((notif) => (
                                    <motion.div
                                        key={notif.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-sm p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800 shadow-sm flex gap-3 items-start"
                                    >
                                        <div className={cn(
                                            "mt-1 h-2 w-2 rounded-full flex-shrink-0",
                                            notif.type === 'critical' ? "bg-red-500" :
                                            notif.type === 'warning' ? "bg-amber-500" :
                                            notif.type === 'success' ? "bg-emerald-500" : "bg-blue-500"
                                        )} />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-0.5">
                                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{notif.title}</h4>
                                                <span className="text-[10px] text-zinc-400 whitespace-nowrap ml-2">{notif.time}</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">{notif.message}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {notifications.length === 0 && (
                                    <div className="text-center py-10 text-zinc-400">
                                        <CheckCircle2 className="h-10 w-10 mx-auto mb-2 opacity-20" />
                                        <p className="text-xs">All caught up</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-900/20 dark:bg-white/20 rounded-full z-20" />
      </div>
    </div>
  );
}
