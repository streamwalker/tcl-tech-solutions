
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, ChevronDown, Users, Building, MapPin, FileText, MessageCircle, Home, Shield, Smartphone, Database, Cog, BarChart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { handleContactClick } from "@/utils/smoothScroll";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { CompanyPopups, ServicesPopups } from "./NavigationPopups";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    setIsOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
    { name: "Business Plan", href: "/business-plan" },
    { name: "Builder Deck", href: "/builder-deck" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return location.pathname === "/" && location.hash === href.substring(1);
    return location.pathname === href;
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 64;
        const elementPosition = element.offsetTop - navHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                TCL Tech Solutions
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              // Special handling for Company dropdown
              if (item.name === "About") {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="px-3 py-2 text-sm font-medium transition-colors text-gray-700 hover:text-blue-600 flex items-center gap-1">
                      Company
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Building className="w-4 h-4 mr-2" />
                            About Us
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <CompanyPopups.AboutUsPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Users className="w-4 h-4 mr-2" />
                            Our Team
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <CompanyPopups.TeamPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <FileText className="w-4 h-4 mr-2" />
                            Case Studies
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <CompanyPopups.CaseStudiesPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Blog
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <CompanyPopups.BlogPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <CompanyPopups.ContactPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <MapPin className="w-4 h-4 mr-2" />
                            Service Areas
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <CompanyPopups.ServiceAreasPopup />
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              // Special handling for Services dropdown
              if (item.name === "Services") {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="px-3 py-2 text-sm font-medium transition-colors text-gray-700 hover:text-blue-600 flex items-center gap-1">
                      Services
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border border-gray-200 shadow-lg">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Home className="w-4 h-4 mr-2" />
                            Smart Home Automation
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <ServicesPopups.SmartHomePopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Shield className="w-4 h-4 mr-2" />
                            Enterprise Networks
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <ServicesPopups.EnterpriseNetworksPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Database className="w-4 h-4 mr-2" />
                            Home Theater Technology
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <ServicesPopups.HomeTheaterPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Smartphone className="w-4 h-4 mr-2" />
                            AI Logic Integration
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <ServicesPopups.AILogicPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <Cog className="w-4 h-4 mr-2" />
                            Managed Services
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <ServicesPopups.ManagedServicesPopup />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                            <BarChart className="w-4 h-4 mr-2" />
                            Premium Installations
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <ServicesPopups.PremiumInstallationsPopup />
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              // Regular navigation items (excluding "About" and "Services")
              if (item.name === "About" || item.name === "Services") {
                return null;
              }

              return item.href.startsWith("/#") ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) 
                      ? "text-blue-600 border-b-2 border-blue-600" 
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleContactClick}
                >
                  Get Quote
                </Button>
                <Link to="/auth">
                  <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              {navItems.map((item) => (
                item.href.startsWith("/#") ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left px-3 py-2 text-base font-medium ${
                      isActive(item.href) 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium ${
                      isActive(item.href) 
                        ? "text-blue-600 bg-blue-50" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              {user ? (
                <div className="space-y-2 mt-4">
                  <Link 
                    to="/dashboard"
                    className="block w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="outline"
                    className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-2 mt-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      handleContactClick();
                      setIsOpen(false);
                    }}
                  >
                    Get Quote
                  </Button>
                  <Link to="/auth" className="block">
                    <Button 
                      variant="outline" 
                      className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
