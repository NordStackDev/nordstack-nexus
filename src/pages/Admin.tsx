
import { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminStatsCards } from "@/components/ui/admin/AdminStatsCards";
import { FolderGrid } from "@/components/ui/admin/FolderGrid";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Eye,
  BarChart3,
  Users,
  MessageSquare,
  Folder,
  Image as ImageIcon,
  File as FileIcon,
  User,
  ArrowLeft,
} from "lucide-react";
import React from "react";
import { FileUpload } from "@/components/ui/admin/file-upload";
import { CategoryModal } from "@/components/ui/admin/CategoryModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BackgroundBeams } from "@/components/BackgroundBeams";

interface Document {
  id: string;
  title: string;
  description: string;
  file_name: string;
  file_type: string;
  file_size: number;
  download_count: number;
  is_public: boolean;
  created_at: string;
  category: string;
  file_url: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  is_read: boolean;
  created_at: string;
}

// Minimal Profile interface used for admin user management
interface Profile {
  id: string;
  full_name?: string | null;
  email?: string | null;
  company?: string | null;
  role?: { role: string }[];
  user_id?: string;
}


const Admin = () => {
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeFolderFilter, setActiveFolderFilter] = useState<string | null>(null);
  // Modal / pending upload state
  const [pendingFiles, setPendingFiles] = useState<File[] | null>(null);
  const [pendingCategories, setPendingCategories] = useState<Record<string, string>>({});
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [bulkCategory, setBulkCategory] = useState<string>("");
  // Optional pending metadata for single-file upload (from Upload form)
  const [pendingMeta, setPendingMeta] = useState<{
    title: string;
    description: string;
    isPublic: boolean;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<
    "documents" | "upload" | "messages" | "stats"
  >("documents");
  // Track which file is selected for preview
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Category counts memoized
  const categoryCounts = useMemo(() => {
    return Object.entries(
      documents.reduce((acc: Record<string, number>, d) => {
        const c = d.category || "Andre";
        acc[c] = (acc[c] || 0) + 1;
        return acc;
      }, {})
    );
  }, [documents]);

  // Pagination for folder view
  const [folderPage, setFolderPage] = useState(1);
  const PAGE_SIZE = 10;
  const filesInActiveFolder = useMemo(() => documents.filter((d) => d.category === activeFolderFilter), [documents, activeFolderFilter]);
  const totalPages = Math.max(1, Math.ceil(filesInActiveFolder.length / PAGE_SIZE));
  const pagedFiles = useMemo(() => filesInActiveFolder.slice((folderPage - 1) * PAGE_SIZE, folderPage * PAGE_SIZE), [filesInActiveFolder, folderPage]);

  // Upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  // User management state
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchDocuments();
    fetchMessages();
  }, []);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke hente dokumenter",
        variant: "destructive",
      });
    }
  };

  // Prepare files (single or multiple) for modal confirmation
  const prepareFilesUpload = (files: File[] | FileList | null, meta?: { title?: string; description?: string; isPublic?: boolean }) => {
    if (!files) return;
    const arr = Array.isArray(files) ? files : Array.from(files);
    if (arr.length === 0) return;
    const seeded: Record<string, string> = {};
    arr.forEach((f) => (seeded[f.name] = autoDetectCategory(f)));
    setPendingFiles(arr);
    setPendingCategories(seeded);
    setIsCategoryModalOpen(true);
    if (meta) setPendingMeta({ title: meta.title || "", description: meta.description || "", isPublic: !!meta.isPublic });
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke hente beskeder",
        variant: "destructive",
      });
    }
  };
  

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    // Queue selected files (from Upload form) into modal for confirmation
    if (!selectedFiles || selectedFiles.length === 0) return;
    prepareFilesUpload(selectedFiles, { title, description, isPublic });
  };

  // Helper to detect category from file
  const autoDetectCategory = (file: File) => {
    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();
    if (type.startsWith("image/")) return "Billeder";
    if (name.includes("invoice") || name.includes("faktura") || type === "application/pdf") return "Faktura";
    if (name.includes("contract") || name.includes("kontrakt") || name.includes("agreement")) return "Kontrakt";
    return "Andre";
  };

  // Handle files from the FileUpload component (drag & drop) — open modal to confirm categories
  const uploadFiles = async (files: File[] | undefined) => {
    if (!files || files.length === 0) return;
    // Seed detected categories and open modal for confirmation
    const seeded: Record<string, string> = {};
    files.forEach((f) => {
      seeded[f.name] = autoDetectCategory(f);
    });
    setPendingCategories(seeded);
    setPendingFiles(files);
    setIsCategoryModalOpen(true);
  };

  const cancelPendingUpload = () => {
    setPendingFiles(null);
    setPendingCategories({});
    setIsCategoryModalOpen(false);
    setPendingMeta(null);
  };

  const confirmUpload = async () => {
    if (!pendingFiles || pendingFiles.length === 0) return;
    // Show a small summary toast before starting the upload
    try {
      const summary = pendingFiles.reduce((acc: Record<string, number>, f) => {
        const c = pendingCategories[f.name] || autoDetectCategory(f);
        acc[c] = (acc[c] || 0) + 1;
        return acc;
      }, {});
      const desc = Object.entries(summary).map(([c, n]) => `${c}: ${n}`).join(", ");
      toast({ title: `Uploader ${pendingFiles.length} filer`, description: desc });
    } catch (err) {
      // ignore
    }
    setIsUploading(true);
    try {
      for (const file of pendingFiles) {
        const categoryForFile = pendingCategories[file.name] || autoDetectCategory(file);
        const sanitized = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${sanitized}`;
        const filePath = `documents/${categoryForFile}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("documents")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(filePath);

        const isSingle = pendingFiles && pendingFiles.length === 1 && pendingMeta;
        const { error: dbError } = await supabase.from("documents").insert({
          title: isSingle ? pendingMeta!.title || file.name : file.name,
          description: isSingle ? pendingMeta!.description || "" : "",
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_url: urlData.publicUrl,
          category: categoryForFile,
          is_public: true, // Always public so all admins can see
          uploaded_by: user.id,
        });

        if (dbError) throw dbError;
      }

      toast({ title: "Success", description: "Files uploaded" });
      await fetchDocuments();
      setActiveTab("documents");
      cancelPendingUpload();
    } catch (error: any) {
      toast({ title: "Fejl", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase.from("documents").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Dokument slettet",
      });

      fetchDocuments();
    } catch (error: any) {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: true })
        .eq("id", id);

      if (error) throw error;
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Fejl",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("da-DK");
  };

  return (
    <div className="min-h-screen bg-background">
      <BackgroundBeams className="pointer-events-none fixed top-0 left-0 w-full h-full z-0" />
      {/* Navigation provided by AppShell */}
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-white font-semibold mb-1">
            Velkommen tilbage{user?.user_metadata?.full_name ? ` ${user.user_metadata.full_name}` : user?.email ? `, ${user.email}` : ''}!
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 rounded-lg p-1 bg-muted/">
          {/* Nav tab style ala navLinkClasses */}
          {(() => {
            const tabClasses = (active: boolean) =>
              [
                "relative flex items-center space-x-2 px-3 py-2 rounded-[--radius] text-sm font-medium transition-colors duration-200",
                active ? "text-white" : "text-gray-300 hover:text-white",
                "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[3px] after:rounded after:bg-gradient-to-r after:from-transparent after:via-[#FFD700] after:to-transparent after:opacity-100",
                active
                  ? "after:scale-x-100"
                  : "after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              ].join(" ");
            return (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("documents")}
                  className={tabClasses(activeTab === "documents")}
                >
                  <FileText className="h-4 w-4" />
                  <span>Dokumenter</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("messages")}
                  className={tabClasses(activeTab === "messages")}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Beskeder</span>
                  {messages.filter((m) => !m.is_read).length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {messages.filter((m) => !m.is_read).length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("stats")}
                  className={tabClasses(activeTab === "stats")}
                >
                  <User className="h-4 w-4" />
                  <span>Brugerhåndtering</span>
                </Button>
              </>
            );
          })()}
        </div>

        {/* Documents Tab inkl. statistik */}
        {activeTab === "documents" && (
          <>
            <AdminStatsCards
              totalDocuments={documents.length}
              totalDownloads={documents.reduce((sum, doc) => sum + doc.download_count, 0)}
              unreadMessages={messages.filter((m) => !m.is_read).length}
            />
            <br />
            {/* Dokument under dokumentlisten */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-[#FFD700]">Dokumenter</span>
                </CardTitle>
                <CardDescription>
                  Administrer uploadede dokumenter
                </CardDescription>
              </CardHeader>
              <div className="w-full max-w-5xl mx-auto mt-6">
                <div className=" rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="mx-auto max-w-3xl">

                    
                    <div className="px-6 py-4 mb-8">
                      <FileUpload onChange={uploadFiles} />
                    </div>
                    {/* Extra spacing below upload before folder grid/table */}
                    <div className="h-8" />
                    {/* Category confirmation modal for pending uploads */}
                    <CategoryModal
                      open={isCategoryModalOpen}
                      pendingFiles={pendingFiles}
                      pendingCategories={pendingCategories}
                      bulkCategory={bulkCategory}
                      isUploading={isUploading}
                      onBulkCategoryChange={setBulkCategory}
                      onCategoryChange={(fileName, value) => setPendingCategories((s) => ({ ...s, [fileName]: value }))}
                      onBulkApply={() => {
                        if (!bulkCategory || !pendingFiles) return;
                        const updated: Record<string, string> = { ...pendingCategories };
                        pendingFiles.forEach((f) => (updated[f.name] = bulkCategory));
                        setPendingCategories(updated);
                      }}
                      onCancel={cancelPendingUpload}
                      onConfirm={confirmUpload}
                    />
                  </div>
                </div>
              </div>
              <CardContent>
                {!activeFolderFilter ? (
                  <div className="mt-6">
                    <FolderGrid
                      categoryCounts={categoryCounts}
                      onOpenFolder={(cat) => { setActiveFolderFilter(cat); setFolderPage(1); }}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="mb-6">
                        <Button
                          variant="ghost"
                          onClick={() => setActiveFolderFilter(null)}
                          className="flex items-center space-x-2 text-yellow-400 hover:bg-yellow-900/10 transition-colors px-3 py-2 rounded-full font-medium"
                        >
                          <ArrowLeft className="h-4 w-4 mr-1 text-yellow-400" />
                          <span className="text-yellow-400">Tilbage til mapper</span>
                        </Button>
                      </div>
                      <div className="text-sm text-[#FFD700]">Viser mappe: {activeFolderFilter}</div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titel</TableHead>
                          <TableHead>Preview</TableHead>
                          <TableHead>Størrelse</TableHead>
                          <TableHead>Downloads</TableHead>
                          <TableHead>Oprettet</TableHead>
                          <TableHead>Handlinger</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pagedFiles.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.title}</TableCell>
                            <TableCell>
                              <div className="w-10 h-10 rounded bg-muted/10 flex items-center justify-center">
                                {doc.file_type.startsWith("image/") ? (
                                  // small image thumbnail
                                  // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                  <img src={doc.file_url} alt={`thumb-${doc.title}`} className="w-10 h-10 object-cover rounded" loading="lazy" />
                                ) : (
                                  <FileIcon className="h-5 w-5" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{formatFileSize(doc.file_size)}</TableCell>
                            <TableCell>{doc.download_count}</TableCell>
                            <TableCell>{formatDate(doc.created_at)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                {/* Download button always visible */}
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={async () => {
                                    try {
                                      const response = await fetch(doc.file_url);
                                      const blob = await response.blob();
                                      const url = window.URL.createObjectURL(blob);
                                      const link = document.createElement('a');
                                      link.href = url;
                                      link.download = doc.file_name || 'download';
                                      document.body.appendChild(link);
                                      link.click();
                                      setTimeout(() => {
                                        window.URL.revokeObjectURL(url);
                                        document.body.removeChild(link);
                                      }, 100);
                                    } catch (e) {
                                      alert('Kunne ikke downloade filen.');
                                    }
                                  }}
                                >
                                  <Download className="h-4 w-4 text-yellow-400" />
                                </Button>
                                {/* Preview button only visible if selected */}
                                {selectedDocId === doc.id ? (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => window.open(doc.file_url, "_blank")}
                                  >
                                    <Eye className="h-4 w-4 text-yellow-400" />
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setSelectedDocId(doc.id)}
                                  >
                                    <Eye className="h-4 w-4 text-yellow-400" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-yellow-400" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-muted">Side {folderPage} af {totalPages}</div>
                      <div className="space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => setFolderPage((p) => Math.max(1, p - 1))} disabled={folderPage <= 1}>Forrige</Button>
                        <Button size="sm" onClick={() => setFolderPage((p) => Math.min(totalPages, p + 1))} disabled={folderPage >= totalPages}>Næste</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Beskeder</span>
              </CardTitle>
              <CardDescription>
                Se og administrer kontaktbeskeder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className={!message.is_read ? "border-primary" : ""}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {message.subject || "Ingen emne"}
                          </CardTitle>
                          <CardDescription>
                            Fra: {message.name} ({message.email})
                            {message.company && ` - ${message.company}`}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!message.is_read && (
                            <Badge variant="destructive">Ny</Badge>
                          )}
                          <span className="text-sm text-muted">
                            {formatDate(message.created_at)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground mb-4">{message.message}</p>
                      {!message.is_read && (
                        <Button
                          size="sm"
                          onClick={() => markMessageAsRead(message.id)}
                        >
                          Marker som læst
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div> 
    </div>
  );
};

// Slut her, men husk og ændre til brugerhåndtering. "Under udvikling"
export default Admin;
