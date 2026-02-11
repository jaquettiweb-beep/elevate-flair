
-- ============================================
-- CMS Tables for Academia Flipper Admin Panel
-- ============================================

-- 1. Site Settings (general config, contact info, social links)
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 2. Page SEO metadata
CREATE TABLE public.page_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text UNIQUE NOT NULL,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  keywords text NOT NULL DEFAULT '',
  og_image text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read page SEO"
  ON public.page_seo FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage page SEO"
  ON public.page_seo FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3. Hero / promotional banners
CREATE TABLE public.hero_banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  cta_text text NOT NULL DEFAULT '',
  cta_link text NOT NULL DEFAULT '',
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active banners"
  ON public.hero_banners FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage banners"
  ON public.hero_banners FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Notifications / announcements
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active notifications"
  ON public.notifications FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage notifications"
  ON public.notifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Gallery images
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Todas',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gallery images"
  ON public.gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage gallery"
  ON public.gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Schedule (class timetable)
CREATE TABLE public.schedule_classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  time_slot text NOT NULL,
  day_of_week text NOT NULL CHECK (day_of_week IN ('mon', 'tue', 'wed', 'thu', 'fri', 'sat')),
  class_name text NOT NULL,
  instructor text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.schedule_classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read schedule"
  ON public.schedule_classes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage schedule"
  ON public.schedule_classes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 7. Testimonials
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  text text NOT NULL,
  rating int NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  modality text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active testimonials"
  ON public.testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 8. Modalities
CREATE TABLE public.modalities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active modalities"
  ON public.modalities FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage modalities"
  ON public.modalities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- User roles for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'admin',
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_page_seo_updated_at BEFORE UPDATE ON public.page_seo FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_hero_banners_updated_at BEFORE UPDATE ON public.hero_banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Anyone can read media files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated users can update media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

CREATE POLICY "Authenticated users can delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');

-- Seed initial data
INSERT INTO public.page_seo (page_slug, title, description, keywords) VALUES
('home', 'Academia Flipper - Natação, Musculação e Fitness em São Paulo | Agende sua Aula', 'A melhor academia de São Paulo! Natação, musculação, pilates, artes marciais e mais de 15 modalidades. Agende sua aula experimental grátis!', 'academia, natação, musculação, são paulo, fitness, pilates'),
('horarios', 'Horários das Aulas - Academia Flipper | Confira Nossa Grade', 'Veja os horários de todas as modalidades da Academia Flipper: natação, musculação, pilates, artes marciais e mais.', 'horários, aulas, grade, academia'),
('galeria', 'Galeria de Fotos - Conheça a Infraestrutura da Academia Flipper', 'Veja fotos da nossa academia: equipamentos modernos, piscina aquecida, espaços amplos.', 'galeria, fotos, infraestrutura, academia'),
('contato', 'Contato - Academia Flipper | Tire suas Dúvidas e Agende sua Aula', 'Entre em contato com a Academia Flipper. WhatsApp, telefone, email e endereço.', 'contato, telefone, endereço, academia');

INSERT INTO public.site_settings (key, value) VALUES
('contact', '{"phone": "(11) 94444-0557", "email": "contato@academiaflipper.com.br", "address": "R. Alcântara, 261 – Vila Mariana, São Paulo – SP", "whatsapp": "5511944440557"}'),
('social', '{"instagram": "https://www.instagram.com/academiaflipper", "facebook": "https://www.facebook.com/academiaflipper", "youtube": "https://www.youtube.com/@academiaflipper", "linkedin": "https://www.linkedin.com/company/academiaflipper"}'),
('hours', '{"weekdays": "6h – 22h", "saturday": "8h – 18h", "sunday": "Fechado"}');
