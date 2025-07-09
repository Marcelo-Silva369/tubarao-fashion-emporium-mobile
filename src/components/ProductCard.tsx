
import { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;

interface ProductCardProps {
  product: Product;
  index: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onAddToCart: (size: string) => void;
  onProductClick: () => void;
}

const ProductCard = ({ 
  product, 
  index, 
  isFavorite, 
  onFavoriteToggle, 
  onAddToCart,
  onProductClick 
}: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale cursor-pointer animate-fade-in border-0 shadow-md"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden" onClick={onProductClick}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
              ⭐ Destaque
            </Badge>
          )}
          {product.discount && product.discount > 0 && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(selectedSize);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      <CardContent className="p-4" onClick={onProductClick}>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-900 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews_count || 0})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-blue-900">
                R$ {Number(product.price).toFixed(2)}
              </span>
              {product.original_price && (
                <span className="text-sm text-gray-500 line-through">
                  R$ {Number(product.original_price).toFixed(2)}
                </span>
              )}
            </div>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>

          {/* Size Selection */}
          <div className="flex gap-1 pt-1">
            {product.sizes?.slice(0, 4).map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className="text-xs px-2 py-1 h-7"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
