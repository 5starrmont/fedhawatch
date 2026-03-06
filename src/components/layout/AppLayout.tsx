import { TopNav } from "./TopNav";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-card py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p className="font-display font-bold text-foreground mb-1">FedhaWatch </p>
          <p>Civic accountability through transparent political finance tracking.</p>
          <p className="mt-1">All data sourced from public filings and shadow observation networks.</p>
        </div>
      </footer>
    </div>
  );
}
