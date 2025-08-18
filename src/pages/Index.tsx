import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, FileText, Shield, Upload, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={!!user} 
        isAdmin={isAdmin} 
        onLogout={signOut} 
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-primary-foreground mb-6">
              Nordstack
            </h1>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-4">
              Pitch Sales Tracker
            </p>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Din professionelle løsning til salgs- og dokumenthåndtering. 
              Organiser, del og spor dine vigtigste forretningsdokumenter med sikkerhed og kontrol.
            </p>
            {!user && (
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="shadow-primary">
                  Kom i gang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Hvad vi tilbyder
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nordstack leverer moderne løsninger til virksomheder, der ønsker at optimere 
              deres salgsprocesser og dokumenthåndtering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Dokumenthåndtering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Upload, organiser og del dokumenter sikkert med avanceret adgangskontrol.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Sikker adgang</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Rollebaseret adgangskontrol sikrer at kun autoriserede brugere får adgang.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Let upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Drag-and-drop interface gør det nemt at uploade og kategorisere filer.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Analyse & rapporter</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Få indsigt i download-statistikker og dokumentbrug gennem detaljerede rapporter.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Om Nordstack
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vi er specialister i at udvikle moderne webapplikationer med fokus på 
              brugeroplevelse og sikkerhed. Vores Pitch Sales Tracker er bygget til 
              at understøtte virksomheder i deres digitale transformation.
            </p>
            <p className="text-lg text-muted-foreground">
              Med vores platform kan du centralisere din dokumenthåndtering, 
              forbedre samarbejdet og få bedre kontrol over dine salgsprocesser.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              Klar til at komme i gang?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Kontakt os i dag for at lære mere om, hvordan Nordstack kan hjælpe din virksomhed.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="shadow-primary">
                Log ind eller registrer dig
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
