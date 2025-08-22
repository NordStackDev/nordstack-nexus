'use client'

import React from "react";
// Category color mapping for label backgrounds and text
const CATEGORY_COLORS: Record<string, string> = {
  Billeder: 'bg-blue-600/80 text-white',
  Faktura: 'bg-[#FFD700]/90 text-black',
  Kontrakt: 'bg-green-600/80 text-white',
  Andre: 'bg-gray-500/80 text-white',
};
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryModalProps {
  open: boolean;
  pendingFiles: File[] | null;
  pendingCategories: Record<string, string>;
  bulkCategory: string;
  isUploading: boolean;
  onBulkCategoryChange: (value: string) => void;
  onCategoryChange: (fileName: string, value: string) => void;
  onBulkApply: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  open,
  pendingFiles,
  pendingCategories,
  bulkCategory,
  isUploading,
  onBulkCategoryChange,
  onCategoryChange,
  onBulkApply,
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span className="text-[#FFD700] drop-shadow-sm">Bekræft kategorier</span>
        </DialogTitle>
        <DialogDescription>
          <span className="text-white/80">Vælg kategori for hver fil før den uploades til mappen.</span>
        </DialogDescription>
      </DialogHeader>


  <div className="flex flex-col gap-8 mt-4">
          {/* Bulk category chooser */}
          <p className="text-[#FFD700] font-medium">Vælg kategori:</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
            <div className="flex-1 flex gap-2 items-center">
              <Select value={bulkCategory} onValueChange={onBulkCategoryChange}>
              <SelectTrigger className="bg-muted/10 text-white rounded h-10 px-4 w-full max-w-xs border border-white/40 focus:ring-2 focus:ring-primary/60">
                <SelectValue placeholder="Vælg kategori..." />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={12}
                avoidCollisions={true}
                className="bg-transparent text-white z-[1200] shadow-2xl border border-white/40 rounded-lg min-w-[160px] max-w-xs backdrop-blur-sm"
              >
                <SelectItem value="Billeder">Billeder</SelectItem>
                <SelectItem value="Faktura">Faktura</SelectItem>
                <SelectItem value="Kontrakt">Kontrakt</SelectItem>
                <SelectItem value="Andre">Andre</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" className="h-10 px-4 text-white hover:bg-[#FFD700]/10" onClick={onBulkApply}>
              Anvend på alle
            </Button>
          </div>
        </div>

        {/* File list with category selectors */}
  <div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto pr-2">
          {pendingFiles && pendingFiles.length > 0 ? (
            pendingFiles.map((f) => (
              <div
                key={f.name}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 bg-muted/5 rounded-lg px-5 py-4 border border-[#FFD700] shadow-sm transition-all hover:border-[#FFD700]/80"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm truncate font-medium text-white/90">{f.name}</span>
                  {pendingCategories[f.name] && (
                    <span
                      className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold border border-white/10 shadow-sm ${CATEGORY_COLORS[pendingCategories[f.name]] || 'bg-gray-500/80 text-white'}`}
                      style={pendingCategories[f.name] === 'Faktura' ? { color: '#222', background: '#fff' } : {}}
                    >
                      {pendingCategories[f.name]}
                    </span>
                  )}
                </div>
                <div className="flex-1 sm:flex-none min-w-[180px]">
                  <Select
                    value={pendingCategories[f.name]}
                    onValueChange={(val) => onCategoryChange(f.name, val)}
                  >
                    <SelectTrigger className="bg-muted/10 text-white rounded h-12 px-6 w-full max-w-xs border border-white/40 focus:ring-2 focus:ring-primary/60 text-base">
                      <SelectValue placeholder="Vælg kategori..." />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      sideOffset={12}
                      avoidCollisions={true}
                      className="bg-transparent text-white z-[1200] shadow-2xl border border-white/40 rounded-lg min-w-[180px] max-w-xs backdrop-blur-sm"
                    >
                      <SelectItem value="Billeder">Billeder</SelectItem>
                      <SelectItem value="Faktura">Faktura</SelectItem>
                      <SelectItem value="Kontrakt">Kontrakt</SelectItem>
                      <SelectItem value="Andre">Andre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground px-2 py-4 text-center">
              Ingen filer valgt
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="mt-6">
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-white hover:bg-[#FFD700]/10" onClick={onCancel}>
            Annuller
          </Button>
          <Button
            className="bg-[#FFD700] text-black font-bold hover:bg-[#FFD700]/90"
            onClick={onConfirm}
            disabled={isUploading || !(pendingFiles && pendingFiles.length > 0)}
          >
            {isUploading ? <span className="text-black/80">Uploader...</span> : <span>Bekræft og upload</span>}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);