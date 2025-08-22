import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download, MessageSquare } from "lucide-react";

interface AdminStatsCardsProps {
  totalDocuments: number;
  totalDownloads: number;
  unreadMessages: number;
}

export const AdminStatsCards: React.FC<AdminStatsCardsProps> = ({
  totalDocuments,
  totalDownloads,
  unreadMessages,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#FFD700]">
          Total dokumenter
        </CardTitle>
        <FileText className="h-4 w-4 text-muted" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{totalDocuments}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#FFD700]">
          Total downloads
        </CardTitle>
        <Download className="h-4 w-4 text-muted" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{totalDownloads}</div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#FFD700]">
          Ulæste beskeder
        </CardTitle>
        <MessageSquare className="h-4 w-4 text-muted" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{unreadMessages}</div>
      </CardContent>
    </Card>
  </div>
);
