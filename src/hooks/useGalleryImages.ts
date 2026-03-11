import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-gym.jpg";
import swimmingImg from "@/assets/swimming.jpg";
import yogaImg from "@/assets/yoga.jpg";
import martialImg from "@/assets/martial-arts.jpg";
import pilatesImg from "@/assets/pilates.jpg";
import musculacaoImg from "@/assets/musculacao.jpg";
import fachadaImg from "@/assets/fachada-flipper.jpg";

const LOCAL_ASSET_MAP: Record<string, string> = {
  "/src/assets/hero-gym.jpg": heroImg,
  "/src/assets/swimming.jpg": swimmingImg,
  "/src/assets/yoga.jpg": yogaImg,
  "/src/assets/martial-arts.jpg": martialImg,
  "/src/assets/pilates.jpg": pilatesImg,
  "/src/assets/musculacao.jpg": musculacaoImg,
  "/src/assets/fachada-flipper.jpg": fachadaImg,
};

export function resolveImageUrl(url: string) {
  return LOCAL_ASSET_MAP[url] || url;
}

export function useGalleryImages(category?: string) {
  return useQuery({
    queryKey: ["gallery-images", category],
    queryFn: async () => {
      let query = supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []).map((img) => ({
        ...img,
        image_url: resolveImageUrl(img.image_url),
      }));
    },
  });
}
