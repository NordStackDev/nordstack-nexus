import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ArrowRight, FileText, Shield, Upload, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
  {/* Navigation provided by AppShell */}
      
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto text-center relative">
          <div className="max-w-5xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8 tracking-tight">
                NordStack Nexus
              </h1>
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-primary/10 blur-xl rounded-full"></div>
              </div>
              <p className="text-xl sm:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Din professionelle løsning til salgs- og dokumenthåndtering. 
                Organiser, del og spor dine vigtigste forretningsdokumenter med sikkerhed og kontrol.
              </p>
              {!user && (
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary-glow transition-all duration-300 shadow-glow hover:shadow-elegant hover:scale-105 animate-float"
                  >
                    Kom i gang <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Hvad vi tilbyder
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nordstack leverer moderne løsninger til virksomheder, der ønsker at optimere 
              deres salgsprocesser og dokumenthåndtering med avanceret teknologi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-card border-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:scale-105 group animate-scale-in">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Dokumenthåndtering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  Upload, organiser og del dokumenter sikkert med avanceret adgangskontrol og versionstyring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:scale-105 group animate-scale-in [animation-delay:0.1s]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Sikker adgang</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  Rollebaseret adgangskontrol med enterprise-grade sikkerhed sikrer kun autoriseret adgang.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:scale-105 group animate-scale-in [animation-delay:0.2s]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Let upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  Intuitivt drag-and-drop interface med automatisk kategorisering og metadata-ekstraktion.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-accent/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card hover:scale-105 group animate-scale-in [animation-delay:0.3s]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-xl flex items-center justify-center mb-6 group-hover:animate-float">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold">Analyse & rapporter</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  Avancerede analytics med real-time statistikker og detaljerede performance-rapporter.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%22100%22%20height=%22100%22%20viewBox=%220%200%20100%20100%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23A78BFA%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22M50%2050h50v50H50z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        <div className="container mx-auto relative">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8 animate-fade-in">
              Om Nordstack
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="animate-fade-in [animation-delay:0.1s]">
                Vi er specialister i at udvikle moderne webapplikationer med fokus på 
                brugeroplevelse, sikkerhed og skalerbarhed. Vores Pitch Sales Tracker er bygget til 
                at understøtte virksomheder i deres digitale transformation.
              </p>
              <p className="animate-fade-in [animation-delay:0.2s]">
                Med vores platform kan du centralisere din dokumenthåndtering, 
                forbedre samarbejdet og få bedre kontrol over dine salgsprocesser 
                gennem avanceret analytics og intelligent automatisering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="container mx-auto text-center relative">
            <div className="animate-fade-in">
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                Klar til at komme i gang?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                Kontakt os i dag for at lære mere om, hvordan Nordstack kan transformere 
                din virksomheds dokumenthåndtering og salgsprocesser.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary-glow transition-all duration-300 shadow-glow hover:shadow-elegant hover:scale-105"
                  >
                    Log ind eller registrer dig
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
