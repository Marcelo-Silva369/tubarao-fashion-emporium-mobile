
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: () => void;
}

const CategoryCard = ({ category, index, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover-scale animate-fade-in border-0 shadow-md"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="text-3xl mb-2">{category.icon}</div>
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          <p className="text-sm text-gray-200">{category.productCount} produtos</p>
        </div>

        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white text-sm font-medium">Explorar</div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
