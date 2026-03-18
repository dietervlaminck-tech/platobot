export default function Header() {
  return (
    <header className="w-full border-b bg-primary">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-primary-foreground" data-testid="text-app-name">
            Platobot
          </div>
          <div className="hidden text-sm text-primary-foreground/80 md:block" data-testid="text-tagline">
            Data Analytics & Business AI
          </div>
        </div>
      </div>
    </header>
  );
}
