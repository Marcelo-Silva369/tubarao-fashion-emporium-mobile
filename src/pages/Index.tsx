import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Search, Menu, Star, Filter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import CartSidebar, { CartItem } from '@/components/CartSidebar';
import ProductModal from '@/components/ProductModal';
import AuthModal from '@/components/AuthModal';

import { categories } from '@/data/mockData';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;

const Index = () => {
  const { user, session } = useAuth();
  const { products, loading: productsLoading } = useProducts();
  const { favorites, toggleFavorite } = useFavorites(user?.id);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  
  // Carrega o carrinho do localStorage ao inicializar
const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
});

// Atualiza o localStorage sempre que o carrinho mudar
useEffect(() => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}, [cartItems]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');


  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Rola até a seção de produtos
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  const addToCart = (product: Product, size = 'M', quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { 
        id: product.id, 
        name: product.name, 
        price: Number(product.price), 
        image_url: product.image_url,
        size, 
        quantity 
      }];
    });
    toast.success('Produto adicionado ao carrinho!');
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleFavoriteToggle = async (productId: string) => {
    if (!user) {
      toast.error('Faça login para adicionar aos favoritos');
      setIsAuthOpen(true);
      return;
    }
    await toggleFavorite(productId);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Vídeo de fundo */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/banner-loja-vendas.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Conteúdo principal */}
        <div className="relative h-full flex flex-col">
          {/* Conteúdo centralizado - Ajustado para subir mais */}
          <div className="flex-1 flex items-start pt-12 sm:pt-16 md:pt-20 justify-center">
            <div className="max-w-7xl w-full mx-auto px-4 text-center mt-6 sm:mt-8 md:mt-10">
              <div className="animate-fade-in">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-32 h-32 md:w-36 md:h-36 mb-4 flex items-center justify-center">
                    <img 
                      src="images/logo-tubarao.png" 
                      alt="Tubarão Fashion Logo" 
                      className="h-full w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    Tubarão Fashion
                  </h1>
                </div>
                <p className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-2xl mx-auto">
                  Mergulhe no estilo. Descubra as últimas tendências da moda com a força de um tubarão!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-900 hover:bg-cyan-50 font-semibold text-lg px-8 py-4 hover-scale"
                    onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Explorar Coleção
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-900 hover:bg-cyan-50 font-semibold text-lg px-8 py-4 hover-scale"
                    onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Ver Categorias
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seta de rolagem - Ajustada para baixar */}
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10">
            <div className="flex justify-center">
              <div className="animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute -bottom-20 -right-20 opacity-10">
          <div className="text-9xl">🦈</div>
        </div>
        <div className="absolute -top-20 -left-20 opacity-10">
          <div className="text-9xl rotate-45">🌊</div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Categorias</h2>
            <p className="text-xl text-gray-600">Encontre exatamente o que você está procurando</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={index}
                onClick={() => {
                  const handleCategoryClick = (category: string) => {
                    setSelectedCategory(category);
                    // Rola até a seção de produtos
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }, 100);
                  };
                  handleCategoryClick(category.slug);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Produtos em Destaque</h2>
            <p className="text-xl text-gray-600">Os mais vendidos da temporada</p>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFavorite={favorites.includes(product.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(product.id)}
                  onAddToCart={(size) => addToCart(product, size)}
                  onProductClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Products */}
      <section id="products" ref={productsSectionRef} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">
              {selectedCategory === 'all' ? 'Todos os Produtos' : categories.find(c => c.slug === selectedCategory)?.name}
            </h2>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="hover-scale"
              >
                Todos
              </Button>
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.slug)}
                  className="hover-scale hidden sm:inline-flex"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isFavorite={favorites.includes(product.id)}
                onFavoriteToggle={() => handleFavoriteToggle(product.id)}
                onAddToCart={(size) => addToCart(product, size)}
                onProductClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && !productsLoading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-600">Tente ajustar seus filtros de busca</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="text-xl mb-8 text-cyan-100">Receba ofertas exclusivas e lançamentos em primeira mão</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Seu melhor e-mail" 
              className="bg-white/10 border-white/20 text-white placeholder:text-cyan-200"
            />
            <Button className="bg-white text-blue-900 hover:bg-cyan-50 font-semibold hover-scale">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Botão flutuante de suporte */}
      <button
        onClick={() => {}}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
        aria-label="Abrir chat de suporte"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="images/logo-tubarao.png" 
                  alt="Tubarão Fashion" 
                  className="h-10 w-auto mr-2"
                />
                <h3 className="text-2xl font-bold text-cyan-400">Tubarão Fashion</h3>
              </div>
              <p className="text-gray-400">
                Sua loja de moda online com as melhores tendências e qualidade incomparável.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => handleCategoryClick('masculino')}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Masculino
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('feminino')}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Feminino
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('infantil')}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Infantil
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('acessorios')}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Acessórios
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => {}}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Central de Ajuda
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      window.open('/trocas-e-devolucoes', '_blank');
                    }}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Trocas e Devoluções
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      window.open('/entregas', '_blank');
                    }}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Entregas
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {}}
                    className="hover:text-white transition-colors text-left w-full"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Tubarão Fashion. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        total={cartTotal}
      />


      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          isFavorite={favorites.includes(selectedProduct.id)}
          onFavoriteToggle={() => handleFavoriteToggle(selectedProduct.id)}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default Index;
