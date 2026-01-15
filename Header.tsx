import { useNavigate } from 'react-router-dom';
import { Youtube, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
            <Youtube className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">YT Boost</h1>
            <p className="text-xs text-muted-foreground">Real-Time Analytics</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">මුල් පිටුව</a>
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">සේවා</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">මිල ගණන්</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">අමතන්න</a>
        </nav>
        
        {user ? (
          <Button
            onClick={() => navigate('/dashboard')}
            className="gradient-bg hover:opacity-90 transition-opacity"
          >
            <User className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        ) : (
          <Button
            onClick={() => navigate('/auth')}
            className="gradient-bg hover:opacity-90 transition-opacity"
          >
            ආරම්භ කරන්න
          </Button>
        )}
      </div>
    </header>
  );
}
