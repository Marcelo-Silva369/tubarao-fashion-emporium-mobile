
-- Criar tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  discount INTEGER DEFAULT 0,
  sizes TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de pedidos
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de itens do pedido
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products NOT NULL,
  quantity INTEGER NOT NULL,
  size TEXT,
  price DECIMAL(10,2) NOT NULL
);

-- Criar tabela de favoritos
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  product_id UUID REFERENCES public.products NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Usuários podem ver próprio perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Usuários podem inserir próprio perfil" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas para produtos (público para leitura)
CREATE POLICY "Qualquer um pode ver produtos" ON public.products FOR SELECT USING (true);

-- Políticas para pedidos
CREATE POLICY "Usuários podem ver próprios pedidos" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar próprios pedidos" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para itens do pedido
CREATE POLICY "Usuários podem ver itens dos próprios pedidos" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Usuários podem criar itens dos próprios pedidos" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Políticas para favoritos
CREATE POLICY "Usuários podem ver próprios favoritos" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem gerenciar próprios favoritos" ON public.favorites FOR ALL USING (auth.uid() = user_id);

-- Inserir produtos de exemplo
INSERT INTO public.products (name, description, price, original_price, category, image_url, rating, reviews_count, featured, discount, sizes, stock) VALUES
('Camiseta Shark Premium', 'Camiseta premium com estampa exclusiva de tubarão', 89.90, 129.90, 'masculino', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 4.8, 124, true, 31, ARRAY['P', 'M', 'G', 'GG'], 50),
('Vestido Ocean Blue', 'Vestido elegante inspirado no azul do oceano', 149.90, 199.90, 'feminino', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', 4.9, 89, true, 25, ARRAY['P', 'M', 'G'], 30),
('Bermuda Shark Wave', 'Bermuda confortável para o verão', 79.90, null, 'masculino', 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400', 4.5, 67, false, 0, ARRAY['P', 'M', 'G', 'GG'], 75),
('Blusa Coral Fashion', 'Blusa feminina moderna e estilosa', 69.90, 89.90, 'feminino', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', 4.7, 156, true, 22, ARRAY['P', 'M', 'G'], 40),
('Jaqueta Ocean Storm', 'Jaqueta resistente e fashion', 199.90, 299.90, 'masculino', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 4.6, 92, false, 33, ARRAY['M', 'G', 'GG'], 25),
('Saia Sea Breeze', 'Saia leve e confortável', 59.90, null, 'feminino', 'https://images.unsplash.com/photo-1583496661160-fb5886a13d17?w=400', 4.4, 73, false, 0, ARRAY['P', 'M', 'G'], 60);

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
