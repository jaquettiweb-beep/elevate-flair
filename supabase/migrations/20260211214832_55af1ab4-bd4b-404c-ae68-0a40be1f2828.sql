
-- Tighten write policies to require admin role

-- site_settings
DROP POLICY "Authenticated users can update site settings" ON public.site_settings;
DROP POLICY "Authenticated users can insert site settings" ON public.site_settings;
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- page_seo
DROP POLICY "Authenticated users can manage page SEO" ON public.page_seo;
CREATE POLICY "Admins can manage page SEO" ON public.page_seo FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- hero_banners
DROP POLICY "Authenticated users can manage banners" ON public.hero_banners;
CREATE POLICY "Admins can manage banners" ON public.hero_banners FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- notifications
DROP POLICY "Authenticated users can manage notifications" ON public.notifications;
CREATE POLICY "Admins can manage notifications" ON public.notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- gallery_images
DROP POLICY "Authenticated users can manage gallery" ON public.gallery_images;
CREATE POLICY "Admins can manage gallery" ON public.gallery_images FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- schedule_classes
DROP POLICY "Authenticated users can manage schedule" ON public.schedule_classes;
CREATE POLICY "Admins can manage schedule" ON public.schedule_classes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- testimonials
DROP POLICY "Authenticated users can manage testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- modalities
DROP POLICY "Authenticated users can manage modalities" ON public.modalities;
CREATE POLICY "Admins can manage modalities" ON public.modalities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- storage - tighten to admin role
DROP POLICY "Authenticated users can upload media" ON storage.objects;
DROP POLICY "Authenticated users can update media" ON storage.objects;
DROP POLICY "Authenticated users can delete media" ON storage.objects;
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Auto-assign admin role on first signup (trigger)
CREATE OR REPLACE FUNCTION public.auto_assign_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_admin_role();
