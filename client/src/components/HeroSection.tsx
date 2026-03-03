// Background image removed — asset not in repo

export default function HeroSection() {
  const scrollToChat = () => {
    const chatSection = document.getElementById('chat');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary/5 to-background">
      <div className="container px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground" data-testid="text-hero-title">
              Ontwikkel je leiderschapsvaardigheden
            </h1>
            <p className="mb-6 text-lg text-muted-foreground" data-testid="text-hero-subtitle">
              Platobot is je persoonlijke AI-coach voor professionele ontwikkeling. 
              Werk aan zelfreflectie, samenwerking, ethisch handelen, presentatievaardigheden en besluitvorming.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <p className="text-base text-foreground">STARR-methode en Korthagen model voor zelfreflectie</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <p className="text-base text-foreground">Socratische dialoog voor ethisch handelen</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <p className="text-base text-foreground">Retorische driehoek voor presentatievaardigheden</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div
              className="w-full max-w-lg rounded-lg bg-muted shadow-lg aspect-video flex items-center justify-center"
              data-testid="img-hero"
            >
              <p className="text-muted-foreground">Platobot</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
