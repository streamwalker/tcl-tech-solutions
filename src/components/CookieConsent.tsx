import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (type: string) => {
    const consentData = {
      type,
      preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookie-consent", JSON.stringify(consentData));
    setVisible(false);
  };

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, functional: true, analytics: true });
    saveConsent("accept-all");
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, functional: false, analytics: false });
    saveConsent("reject-all");
  };

  const handleSavePreferences = () => {
    saveConsent("custom");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Cookie Preferences</h3>
          <button onClick={handleRejectAll} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          We use cookies to ensure our website functions properly and to improve your experience. 
          Some cookies are necessary for core functionality, while others help us understand usage 
          and personalize your experience. Read our{" "}
          <Link to="/cookie-policy" className="text-primary underline hover:text-primary/80">Cookie Policy</Link>{" "}
          for more details.
        </p>

        {showPreferences && (
          <div className="space-y-3 mb-4 border-t border-border pt-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-foreground">Strictly Necessary</span>
                <p className="text-xs text-muted-foreground">Required for the site to function</p>
              </div>
              <input type="checkbox" checked disabled className="h-4 w-4 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-foreground">Functional</span>
                <p className="text-xs text-muted-foreground">Preferences and personalization</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                className="h-4 w-4 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-foreground">Analytics</span>
                <p className="text-xs text-muted-foreground">Usage data to improve our services</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="h-4 w-4 rounded"
              />
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleAcceptAll} size="sm">Accept All</Button>
          <Button onClick={handleRejectAll} variant="outline" size="sm">Reject All</Button>
          {showPreferences ? (
            <Button onClick={handleSavePreferences} variant="secondary" size="sm">Save Preferences</Button>
          ) : (
            <Button onClick={() => setShowPreferences(true)} variant="ghost" size="sm">Manage Preferences</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
