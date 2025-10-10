import logo from "@/assets/amiticia-logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img src={logo} alt="AmiticIA" className="h-10" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} AmiticIA. Data & AI Ops.
          </p>
        </div>
      </div>
    </footer>
  );
};
