
import { useState } from 'react';
import { ShoppingCart, Search, Menu, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { User as UserType } from '@supabase/supabase-js';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  user?: UserType | null;
  onAuthClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick, onSearch, searchQuery, user, onAuthClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erro ao sair');
    } else {
      toast.success('Logout realizado com sucesso!');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-900">
              🦈 <span className="hidden sm:inline">Tubarão Fashion</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-900">
                    <User className="h-4 w-4 mr-2" />
                    Olá, {user.user_metadata?.full_name || 'Usuário'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" className="text-gray-700 hover:text-blue-900" onClick={onAuthClick}>
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            )}
            <Button variant="ghost" className="text-gray-700 hover:text-blue-900">
              <Heart className="h-4 w-4 mr-2" />
              Favoritos
            </Button>
            <Button 
              variant="ghost" 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-blue-900"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              onClick={onCartClick}
              className="relative p-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Olá, {user.user_metadata?.full_name || 'Usuário'}
                  </div>
                  <Button variant="ghost" className="justify-start text-gray-700 hover:text-blue-900" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <Button variant="ghost" className="justify-start text-gray-700 hover:text-blue-900" onClick={onAuthClick}>
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
              )}
              <Button variant="ghost" className="justify-start text-gray-700 hover:text-blue-900">
                <Heart className="h-4 w-4 mr-2" />
                Favoritos
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
