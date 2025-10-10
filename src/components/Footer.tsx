export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-lg font-bold">AmiticIA</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} AmiticIA. Data & AI Ops.
          </p>
        </div>
      </div>
    </footer>
  );
};
