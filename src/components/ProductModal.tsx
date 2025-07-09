
import { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'> & {
  sizes: string[];
  colors?: string[];
  features?: string[];
};

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const ProductModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isFavorite, 
  onFavoriteToggle 
}: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  
  // Garantir que o produto tenha um array de tamanhos
  const productSizes = product.sizes || ['M'];
  const productImage = product.image_url || '';
  const productRating = 4.5; // Valor padrão para rating
  const productReviews = 0; // Valor padrão para reviews

  if (!isOpen) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl z-50 overflow-hidden animate-scale-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <Badge variant="outline">{product.category}</Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Image */}
              <div className="relative bg-gray-50">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFavoriteToggle}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    isFavorite 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-6 lg:p-8 space-y-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(productRating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {productRating} ({productReviews} avaliações)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-6">
                    <span className="text-3xl font-bold text-blue-900">
                      R$ {Number(product.price).toFixed(2)}
                    </span>
                    {product.original_price && (
                      <span className="text-xl text-gray-500 line-through">
                        R$ {Number(product.original_price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'Produto de alta qualidade com excelente acabamento e conforto incomparável. Perfeito para o seu dia a dia com muito estilo.'}
                  </p>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tamanho</h3>
                  <div className="flex items-center gap-2">
                    {productSizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSize(size)}
                        className="h-10 w-10 p-0"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Quantidade</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                {product.features && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Características</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add to Cart */}
                <div className="space-y-3 pt-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-6"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho - R$ {(Number(product.price) * quantity).toFixed(2)}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    🚚 Frete grátis para compras acima de R$ 199,00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
