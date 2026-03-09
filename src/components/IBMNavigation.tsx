import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search, ShoppingCart, Globe, MessageCircle, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const IBMNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/VetOwnedLogo.jpg" 
                alt="TCL" 
                className="h-8 w-8 rounded-sm object-cover"
              />
              <span className="text-2xl font-semibold text-foreground">TCL</span>
            </Link>

            {/* Main Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2">
                  <span className="font-medium">Services</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 p-4">
                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Home Solutions</h3>
                      <Link to="/services#smart-home">
                        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                          <div className="font-medium">Smart Home Automation</div>
                          <div className="text-sm text-muted-foreground">Complete automation solutions</div>
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/services#home-theater">
                        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                          <div className="font-medium">Home Theater Technology</div>
                          <div className="text-sm text-muted-foreground">Theater and media systems</div>
                        </DropdownMenuItem>
                      </Link>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Business Solutions</h3>
                      <Link to="/services#enterprise-networks">
                        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                          <div className="font-medium">Enterprise Networks</div>
                          <div className="text-sm text-muted-foreground">Enterprise technology solutions</div>
                        </DropdownMenuItem>
                      </Link>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2">
                  <span className="font-medium">Solutions</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 p-4">
                  <div className="grid gap-4">
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="font-medium">Workforce Management</div>
                      <div className="text-sm text-muted-foreground">AI-powered workforce analytics</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start p-3">
                      <div className="font-medium">OmniCode Platform</div>
                      <div className="text-sm text-muted-foreground">Advanced development tools</div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                to="/business-plan" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors py-2">
                  <span className="font-medium">Support</span>
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80 p-4">
                  <div className="grid gap-2">
                    <DropdownMenuItem className="flex items-start space-x-3 p-3">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Help Center</div>
                        <div className="text-sm text-muted-foreground">Get answers to common questions</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-start space-x-3 p-3">
                      <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Contact Support</div>
                        <div className="text-sm text-muted-foreground">Speak with our experts</div>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                to="/investor-white-paper" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Investor 2026
              </Link>
            </div>
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground">
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-foreground">
                My TCL
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm">Log in</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-4">
              <Link to="/services" className="block text-lg font-medium text-foreground">Services</Link>
              <Link to="/services" className="block text-lg font-medium text-foreground">Solutions</Link>
              <Link to="/business-plan" className="block text-lg font-medium text-foreground">About</Link>
              <Link to="#" className="block text-lg font-medium text-foreground">Support</Link>
              <Link to="/investor-white-paper" className="block text-lg font-medium text-primary">Investor 2026</Link>
            </div>
            <div className="pt-4 border-t border-border space-y-4">
              <Link to="/auth">
                <Button variant="outline" className="w-full">My TCL</Button>
              </Link>
              <Link to="/auth">
                <Button className="w-full">Log in</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default IBMNavigation;