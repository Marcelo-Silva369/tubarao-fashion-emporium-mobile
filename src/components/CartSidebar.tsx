
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, size: string, quantity: number) => void;
  onRemoveItem: (productId: number, size: string) => void;
  total: number;
}

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  total 
}: CartSidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Carrinho ({cartItems.length})
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Carrinho vazio</h3>
                <p className="text-gray-600 mb-4">Adicione alguns produtos incríveis!</p>
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Tam: {item.size}
                        </Badge>
                        <span className="text-sm font-semibold text-blue-900">
                          R$ {item.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.size, item.quantity - 1)}
                            className="h-7 w-7 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                            className="h-7 w-7 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id, item.size)}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-blue-900">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Finalizar Compra
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={onClose}
                  >
                    Continuar Comprando
                  </Button>
                </div>
                
                <p className="text-xs text-gray-600 text-center">
                  Frete grátis para compras acima de R$ 199,00
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
