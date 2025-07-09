
export const categories = [
  {
    id: 1,
    name: 'Masculino',
    slug: 'masculino',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=300&fit=crop',
    icon: '👔',
    productCount: 127
  },
  {
    id: 2,
    name: 'Feminino',
    slug: 'feminino',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=300&fit=crop',
    icon: '👗',
    productCount: 184
  },
  {
    id: 3,
    name: 'Infantil',
    slug: 'infantil',
    image: 'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=300&fit=crop',
    icon: '🧸',
    productCount: 92
  },
  {
    id: 4,
    name: 'Acessórios',
    slug: 'acessorios',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    icon: '👜',
    productCount: 68
  }
];

export const products = [
  // Masculino
  {
    id: 1,
    name: 'Camiseta Premium Algodão Pima',
    price: 89.90,
    originalPrice: 119.90,
    category: 'Masculino',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 124,
    featured: true,
    discount: 25,
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Camiseta confeccionada em algodão Pima peruano, oferecendo maciez incomparável e durabilidade.',
    features: ['100% Algodão Pima', 'Corte Regular', 'Anti-pilling', 'Lavagem a máquina']
  },
  {
    id: 2,
    name: 'Jeans Skinny Stretch Masculino',
    price: 159.90,
    originalPrice: 199.90,
    category: 'Masculino',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 89,
    featured: true,
    discount: 20,
    sizes: ['38', '40', '42', '44', '46'],
    description: 'Calça jeans com tecnologia stretch para maior conforto e mobilidade.',
    features: ['Tecido Stretch', 'Modelagem Skinny', '5 Bolsos', 'Lavagem Stone']
  },
  {
    id: 3,
    name: 'Polo Piquet Clássica',
    price: 79.90,
    category: 'Masculino',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
    rating: 4.5,
    reviews: 156,
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Polo em piquet de algodão com acabamento refinado e corte clássico.',
    features: ['100% Algodão Piquet', 'Gola Canelada', 'Botões Reforçados', 'Corte Clássico']
  },
  {
    id: 4,
    name: 'Camisa Social Slim Fit',
    price: 129.90,
    category: 'Masculino',
    image: 'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 73,
    sizes: ['38', '40', '42', '44'],
    description: 'Camisa social em algodão egípcio com modelagem slim fit para um look moderno.',
    features: ['Algodão Egípcio', 'Modelagem Slim', 'Colarinho Italiano', 'Anti-rugas']
  },

  // Feminino
  {
    id: 5,
    name: 'Vestido Midi Floral Primavera',
    price: 149.90,
    originalPrice: 199.90,
    category: 'Feminino',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    rating: 4.9,
    reviews: 201,
    featured: true,
    discount: 25,
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    description: 'Vestido midi em crepe com estampa floral exclusiva, perfeito para ocasiões especiais.',
    features: ['Tecido Crepe', 'Estampa Exclusiva', 'Forro Interno', 'Zíper Invisível']
  },
  {
    id: 6,
    name: 'Blusa Básica Decote V',
    price: 59.90,
    category: 'Feminino',
    image: 'https://images.unsplash.com/photo-1551488831-00b8d0c5b7ac?w=400&h=500&fit=crop',
    rating: 4.4,
    reviews: 312,
    featured: true,
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    description: 'Blusa básica em viscose com decote V, essencial para o guarda-roupa feminino.',
    features: ['100% Viscose', 'Decote V', 'Corte Feminino', 'Cores Variadas']
  },
  {
    id: 7,
    name: 'Calça Jeans Cintura Alta',
    price: 139.90,
    category: 'Feminino',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 187,
    sizes: ['36', '38', '40', '42', '44'],
    description: 'Calça jeans cintura alta com modelagem que valoriza a silhueta feminina.',
    features: ['Cintura Alta', 'Modelagem Skinny', 'Elastano', 'Lavagem Especial']
  },
  {
    id: 8,
    name: 'Blazer Alfaiataria Feminino',
    price: 219.90,
    category: 'Feminino',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 94,
    featured: true,
    sizes: ['PP', 'P', 'M', 'G'],
    description: 'Blazer de alfaiataria em tecido nobre, ideal para looks executivos e sociais.',
    features: ['Alfaiataria Premium', 'Forro Completo', 'Botões Especiais', 'Corte Elegante']
  },

  // Infantil
  {
    id: 9,
    name: 'Conjunto Moletom Tubarão Kids',
    price: 89.90,
    category: 'Infantil',
    image: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 145,
    featured: true,
    sizes: ['2', '4', '6', '8', '10'],
    description: 'Conjunto de moletom com estampa de tubarão, super confortável para os pequenos.',
    features: ['100% Algodão', 'Estampa Tubarão', 'Elástico na Cintura', 'Lavagem Fácil']
  },
  {
    id: 10,
    name: 'Vestido Infantil Unicórnio',
    price: 69.90,
    category: 'Infantil',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 89,
    sizes: ['2', '4', '6', '8'],
    description: 'Vestido infantil com estampa de unicórnio e detalhes em glitter.',
    features: ['Estampa Unicórnio', 'Detalhes Glitter', 'Saia Rodada', 'Alças Ajustáveis']
  },
  {
    id: 11,
    name: 'Bermuda Jeans Infantil',
    price: 49.90,
    category: 'Infantil',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
    rating: 4.5,
    reviews: 67,
    sizes: ['2', '4', '6', '8', '10', '12'],
    description: 'Bermuda jeans confortável e resistente para brincadeiras ao ar livre.',
    features: ['Jeans Resistente', 'Bolsos Funcionais', 'Elástico na Cintura', 'Lavagem Stone']
  },

  // Acessórios
  {
    id: 12,
    name: 'Bolsa Transversal Couro Sintético',
    price: 79.90,
    originalPrice: 99.90,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
    rating: 4.6,
    reviews: 203,
    featured: true,
    discount: 20,
    sizes: ['Único'],
    description: 'Bolsa transversal em couro sintético com acabamento premium e múltiplos compartimentos.',
    features: ['Couro Sintético', 'Múltiplos Bolsos', 'Alça Ajustável', 'Fecho Magnético']
  },
  {
    id: 13,
    name: 'Óculos de Sol Aviador',
    price: 129.90,
    category: 'Acessórios',  
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop',
    rating: 4.4,
    reviews: 156,
    sizes: ['Único'],
    description: 'Óculos de sol estilo aviador com proteção UV400 e armação em metal.',
    features: ['Proteção UV400', 'Armação Metal', 'Lentes Polarizadas', 'Estojo Incluso']
  },
  {
    id: 14,
    name: 'Relógio Digital Esportivo',
    price: 199.90,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
    rating: 4.7,
    reviews: 98,
    sizes: ['Único'],
    description: 'Relógio digital esportivo à prova d\'água com múltiplas funções.',
    features: ['À Prova D\'água', 'Cronômetro', 'Alarme', 'Luz de Fundo']
  },
  {
    id: 15,
    name: 'Carteira Masculina Couro',
    price: 89.90,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=500&fit=crop',
    rating: 4.8,
    reviews: 234,
    sizes: ['Único'],
    description: 'Carteira masculina em couro legítimo com porta-cartões e porta-moedas.',
    features: ['Couro Legítimo', 'Múltiplos Compartimentos', 'Porta-moedas', 'Acabamento Premium']
  }
];
