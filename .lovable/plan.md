

## Plano Unificado: Adicionar fotos em 8 modalidades + corrigir build error

Este plano consolida todas as solicitações pendentes de fotos em um único passo de implementação.

---

### Resumo das mudanças

| Modalidade | Fotos novas | Ação |
|---|---|---|
| Jiu Jitsu | 6 fotos | Adicionar ao gallery |
| Judô (Infantil) | 9 fotos | Substituir gallery |
| Aikidô | 9 fotos | Substituir gallery |
| Ballet Infantil | 10 fotos | Adicionar ao gallery |
| Ginástica | 4 fotos | Substituir gallery (corrige build error) |
| Programa 60+ | 3 fotos | Adicionar ao gallery |
| Muay Thai | 1 foto (já adicionada em mensagem anterior) | Verificar |
| Pilates (junção Studio+Solo) | 8 fotos (já adicionada em mensagem anterior) | Verificar |

---

### Etapa 1 — Copiar 41 fotos para `src/assets/`

**Jiu Jitsu (6):**
- `jiu-jitsu-real-1.jpg` a `jiu-jitsu-real-6.jpg`

**Judô (9):**
- `judo-real-1.jpg` a `judo-real-9.jpg`

**Aikidô (9):**
- `aikido-real-1.jpg` a `aikido-real-9.jpg`

**Ballet Infantil (10):**
- `ballet-new-1.jpg` a `ballet-new-10.jpg`

**Ginástica (4):**
- `ginastica-real-1.jpg` a `ginastica-real-4.jpg`

**Programa 60+ (3):**
- `programa60-real-1.jpg` a `programa60-real-3.jpg`

---

### Etapa 2 — Atualizar `src/pages/Modalidade.tsx`

1. **Importar** as 41 novas fotos
2. **Corrigir build error** na linha 271: substituir `ginasticaImg` pelas 4 fotos reais de ginástica
3. **Atualizar galleryImgs** de cada modalidade:
   - `jiu-jitsu`: adicionar 6 fotos reais
   - `judo-infantil`: substituir por 9 fotos reais de judô
   - `aikido`: substituir por 9 fotos reais de aikidô
   - `ballet-infantil`: adicionar 10 fotos novas às existentes
   - `ginastica`: usar 4 fotos reais
   - `programa-60-saude`: adicionar 3 fotos às existentes

### Etapa 3 — Atualizar `src/components/home/Modalities.tsx`

- Importar fotos-destaque das novas para os cards do grid na homepage (opcional, se necessário atualizar thumbnails)

---

### Arquivo principal editado
- `src/pages/Modalidade.tsx`

