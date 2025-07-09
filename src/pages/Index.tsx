
import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, Menu, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import ProductModal from '@/components/ProductModal';
import { products, categories } from '@/data/mockData';

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.filter(product => product.featured).slice(0, 6);

  const addToCart = (product, size = 'M', quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId, size, quantity) => {
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

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
              🦈 Tubarão Fashion
            </h1>
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
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold text-lg px-8 py-4 hover-scale"
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Categorias
              </Button>
            </div>
          </div>
        </div>
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
                  setSelectedCategory(category.slug);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isFavorite={favorites.includes(product.id)}
                onFavoriteToggle={() => toggleFavorite(product.id)}
                onAddToCart={(size) => addToCart(product, size)}
                onProductClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="py-16 px-4">
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
                onFavoriteToggle={() => toggleFavorite(product.id)}
                onAddToCart={(size) => addToCart(product, size)}
                onProductClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
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
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">🦈 Tubarão Fashion</h3>
              <p className="text-gray-400">
                Sua loja de moda online com as melhores tendências e qualidade incomparável.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Masculino</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feminino</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Infantil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Acessórios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Entregas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
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
          onFavoriteToggle={() => toggleFavorite(selectedProduct.id)}
        />
      )}
    </div>
  );
};

export default Index;
