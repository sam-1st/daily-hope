"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

type ToastItem = { id: number; message: string; type: "success" | "error" };
type ToastContextValue = { notify: (message: string, type?: "success" | "error") => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const notify = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={
                "pointer-events-auto flex items-center gap-2 rounded-xl2 border px-4 py-3 text-sm shadow-soft " +
                (t.type === "success"
                  ? "border-emerald-200 bg-white text-emerald-700 dark:bg-[#182521] dark:text-emerald-200"
                  : "border-red-200 bg-white text-red-700 dark:bg-[#251818] dark:text-red-300")
              }
              role="status"
            >
              {t.type === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>{t.message}</span>
              <button
                onClick={() => setToasts((list) => list.filter((x) => x.id !== t.id))}
                aria-label="Dismiss notification"
                className="ml-1 text-current/60 hover:text-current"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
