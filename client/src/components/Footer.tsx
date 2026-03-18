export default function Footer() {
  return (
    <footer className="w-full bg-primary py-8">
      <div className="container px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-lg font-bold text-primary-foreground" data-testid="text-footer-brand">
            Platobot
          </div>
          
          <p className="text-sm text-primary-foreground/80" data-testid="text-footer-description">
            Groepsoefening: Data Analytics & Business AI
          </p>
          
          <p className="text-xs text-primary-foreground/60" data-testid="text-copyright">
            © {new Date().getFullYear()} Platobot. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
