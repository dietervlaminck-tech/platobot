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
              Ontdek de menselijke rol in AI
            </h1>
            <p className="mb-6 text-lg text-muted-foreground" data-testid="text-hero-subtitle">
              Platobot is jullie Socratische gesprekspartner over AI en data analytics.
              Ga in gesprek, denk kritisch na, en ontdek hoe menselijke keuzes AI vormgeven.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <p className="text-base text-foreground">Is generatieve AI inductief of deductief?</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <p className="text-base text-foreground">Wat is de waarde van menselijk oordeelsvermogen?</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <p className="text-base text-foreground">Hoe kan AI helpen in bedrijfsprocessen?</p>
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
