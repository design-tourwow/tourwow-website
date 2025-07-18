import { ReactNode } from "react";

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500" onClick={onClose} aria-label="ปิด">✕</button>
        {children}
      </div>
    </div>
  );
} 