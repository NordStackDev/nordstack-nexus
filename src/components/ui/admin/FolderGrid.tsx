import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, Image as ImageIcon } from "lucide-react";

interface FolderGridProps {
  categoryCounts: [string, number][];
  onOpenFolder: (category: string) => void;
}

export const FolderGrid: React.FC<FolderGridProps> = ({ categoryCounts, onOpenFolder }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {categoryCounts.map(([cat, count]) => (
      <div key={cat} className="bg-muted/5 rounded-lg p-6 flex flex-col justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-muted/10 flex items-center justify-center">
            {cat === "Billeder" ? <ImageIcon /> : <Folder />}
          </div>
          <div>
            <div className="text-2xl font-semibold">{cat}</div>
            <div className="text-sm text-muted">{count} filer</div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenFolder(cat)}>Åben mappe</Button>
        </div>
      </div>
    ))}
  </div>
);
