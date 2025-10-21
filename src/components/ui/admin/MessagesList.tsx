import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface MessagesListProps {
  messages: ContactMessage[];
  formatDate: (date: string) => string;
  toggleReadMessage: (id: string, isRead: boolean) => void;
  deleteMessage: (id: string) => void;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  formatDate,
  toggleReadMessage,
  deleteMessage,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <MessageSquare className="h-5 w-5" />
        <span>Beskeder</span>
      </CardTitle>
      <CardDescription>Se og administrer kontaktbeskeder</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {messages.map((message) => {
          console.log("[MessagesList] Rendering message:", { id: message.id, name: message.name });
          return (
          <Card
            key={message.id}
            className={!message.is_read ? "border-primary" : ""}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{message.name}</CardTitle>
                  <CardDescription>
                    Email: {message.email}
                    {message.phone && (
                      <>
                        {" | Tlf.: "}
                        {message.phone}
                      </>
                    )}
                    <br />
                    <span className="text-xs font-mono">ID: {message.id}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {!message.is_read && <Badge variant="destructive">Ny</Badge>}
                  <span className="text-sm text-muted">
                    {formatDate(message.created_at)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 whitespace-pre-line text-base text-foreground">
                {message.message}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={message.is_read ? "outline" : "secondary"}
                  onClick={() => toggleReadMessage(message.id, message.is_read)}
                >
                  {message.is_read ? "Markér som ulæst" : "Markér som læst"}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    console.log("[MessagesList] Delete button clicked for ID:", message.id);
                    deleteMessage(message.id);
                  }}
                >
                  Slet
                </Button>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </CardContent>
  </Card>
);
