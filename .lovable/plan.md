

## Plano: Adicionar 6 fotos de Yoga + executar plano unificado pendente

Este plano adiciona as 6 novas fotos de Yoga ao plano unificado já aprovado (41 fotos em 6 modalidades + fix do build error). Total: **47 fotos em 7 modalidades**.

O vídeo enviado (MP4) não será utilizado pois o carrossel suporta apenas imagens.

---

### Yoga (6 fotos novas)
- `WhatsApp_Image_2026-03-11_at_08.45.34.jpeg` → `yoga-flipper-1.jpg`
- `WhatsApp_Image_2026-03-11_at_08.45.35_1.jpeg` → `yoga-flipper-2.jpg`
- `WhatsApp_Image_2026-03-11_at_08.45.35_2.jpeg` → `yoga-flipper-3.jpg`
- `WhatsApp_Image_2026-03-11_at_08.46.03.jpeg` → `yoga-flipper-4.jpg`
- `WhatsApp_Image_2026-03-11_at_08.46.03_3.jpeg` → `yoga-flipper-5.jpg`
- `WhatsApp_Image_2026-03-11_at_08.46.04.jpeg` → `yoga-flipper-6.jpg`

### Resumo completo (plano unificado + yoga)

| Modalidade | Fotos | Ação |
|---|---|---|
| Jiu Jitsu | 6 | Adicionar |
| Judô (Infantil) | 9 | Substituir |
| Aikidô | 9 | Substituir |
| Ballet Infantil | 10 | Adicionar |
| Ginástica | 4 | Substituir (corrige build error) |
| Programa 60+ | 3 | Adicionar |
| Yoga | 6 | Adicionar às existentes |

### Etapas

1. Copiar 47 fotos para `src/assets/`
2. Corrigir build error: substituir `ginasticaImg` (linha 271) pelas fotos reais de ginástica
3. Importar todas as novas fotos em `src/pages/Modalidade.tsx`
4. Atualizar `galleryImgs` de cada modalidade com as fotos correspondentes
5. Na entrada `yoga`: adicionar as 6 novas fotos (`yoga-flipper-1` a `6`) ao array existente (yogaNew1-6)

### Arquivo editado
- `src/pages/Modalidade.tsx`

