# Papino Village SMM Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal Claude Code skill `papino-smm` that writes and analyzes VK posts / Stories / clips / Telegram posts for the Papino Village glamping, grounded in researched marketing mechanics, real object facts, and evidence-based quality criteria.

**Architecture:** Hard-ordered pipeline — (1) deep web research via parallel agents → (2) derive post-type taxonomy + quality criteria + format rules + playbook + object profile from findings → (3) author the skill (SKILL.md + references/ + templates/ + examples/) per the writing-skills canon → (4) validate each of the 4 working modes against the criteria rubric. Criteria are NEVER written before research completes.

**Tech Stack:** Markdown skill files at `~/.claude/skills/papino-smm/` (Windows: `C:\Users\kulle\.claude\skills\papino-smm\`); WebSearch/WebFetch + Agent (parallel research); existing source `docs/papinovillage/smm-content-plan.md` (v4, 947 lines, committed). No Python, no pytest — verification is the writing-skills validation procedure plus the skill's own `post-criteria.md` rubric.

**Constraints (project rules):**
- Brand voice: **only Михаил or impersonal "мы"**. Яна is NEVER mentioned anywhere; guest reviews citing her are anonymized ("хозяева", "нас встретили"). This is a hard blocker criterion.
- No git commit/push without explicit user command (CLAUDE.md §1). Commit steps below are real steps but the executor MUST get user authorization before running them.
- `~/.claude/skills/` is not version-controlled → Task 13 creates a versioned backup so the skill can't be silently lost.

**Spec:** `docs/smm/2026-05-17-papino-smm-skill-design.md` (papinovillage repo; spec+plan relocated out of ChatAdmin for session isolation — ChatAdmin is READ-ONLY here)

---

## File Structure

**Skill (authoritative, active):** `C:\Users\kulle\.claude\skills\papino-smm\`
| File | Responsibility |
|---|---|
| `SKILL.md` | Entry point: frontmatter+trigger description, when-to-use, the 4 working modes, self-check checklist, pointers to references |
| `references/papino-profile.md` | Object facts, USP, brand tone (Михаил/impersonal), GAP-list "нужно от владельца" |
| `references/guest-insights.md` | Guest scenarios, emotional triggers, guest phrasings; the Яна-anonymization rule |
| `references/marketing-playbook.md` | Distilled research: hooks, headlines, emotional triggers, VK 2026 viral mechanics, what works in the niche |
| `references/format-rules.md` | Per-channel constraints: VK post / VK Stories / VK clip / Telegram |
| `references/content-pillars.md` | Content pillars + post-type taxonomy (посыл), each with intent and example |
| `references/post-criteria.md` | Universal baseline criteria + per-посыл overlays + stop-lists (Яна, clichés) |
| `templates/vk-post.md`, `templates/vk-story.md`, `templates/vk-clip.md`, `templates/tg-post.md` | Format skeletons |
| `examples/*.md` | 1–2 reference posts per format (before/after + why-it-worked breakdown) |

**Research artifacts (git-tracked, papinovillage repo):** `docs/smm/smm-research-2026-05-17.md`. The existing `smm-content-plan.md` is **READ-ONLY** in ChatAdmin at `C:\Users\kulle\IdeaProjects\ChatAdmin\docs\papinovillage\smm-content-plan.md` — this plan never writes to the ChatAdmin repo.

**Versioned backup of the skill (git-tracked, papinovillage repo):** `C:\Users\kulle\IdeaProjects\papinovillage\docs\skills\papino-smm\` (snapshot copy — safety net, Task 13).

---

## Task 0: Skill skeleton + research scratch file

**Files:**
- Create dir: `C:\Users\kulle\.claude\skills\papino-smm\references\`
- Create dir: `C:\Users\kulle\.claude\skills\papino-smm\templates\`
- Create dir: `C:\Users\kulle\.claude\skills\papino-smm\examples\`
- Create: `C:\Users\kulle\IdeaProjects\papinovillage\docs\smm\smm-research-2026-05-17.md`

- [ ] **Step 1: Create directory tree**

Run (PowerShell):
```powershell
New-Item -ItemType Directory -Force "C:\Users\kulle\.claude\skills\papino-smm\references" | Out-Null
New-Item -ItemType Directory -Force "C:\Users\kulle\.claude\skills\papino-smm\templates"  | Out-Null
New-Item -ItemType Directory -Force "C:\Users\kulle\.claude\skills\papino-smm\examples"   | Out-Null
```
Expected: three directories exist (verify with `Test-Path`).

- [ ] **Step 2: Create the research scratch file with fixed section skeleton**

Write `docs/smm/smm-research-2026-05-17.md` with exactly these headings (bodies empty, filled by Task 1–2):
```markdown
# Papino Village SMM — Research Notes (2026-05-17)

## A. VK 2026 viral mechanics & smart-feed
## B. RU glamping / short-term-rental SMM best practices
## C. Competitor teardown (3–5 VK glamping accounts)
## D. Format trends — Stories & clips (hooks, lengths, structures)
## E. Papino Village factura (from smm-content-plan.md + site + VK)
## F. Distilled conclusions → which post types & criteria are evidence-supported
```

- [ ] **Step 3: Verify skeleton**

Run: `Test-Path C:\Users\kulle\.claude\skills\papino-smm\references` → `True`; confirm the research file has all 6 headings A–F.

---

## Task 1: Deep research — dispatch 5 parallel agents

**Files:**
- Modify: `docs/smm/smm-research-2026-05-17.md` (fill sections A–E)

Read `docs/papinovillage/smm-content-plan.md` fully BEFORE dispatching (it is the primary factura source and tone reference).

- [ ] **Step 1: Read the existing content plan**

Read `C:\Users\kulle\IdeaProjects\ChatAdmin\docs\papinovillage\smm-content-plan.md` in full. Extract into notes: prices (5900/8900/чан 3900), акции, owner-story voice, the two houses (Зелёный = печь-камин+винил; Синий = электро+проектор), emerging post types, statuses vocabulary.

- [ ] **Step 2: Dispatch 5 research agents in ONE message (parallel)**

Use the Agent tool, `general-purpose`, 5 calls in a single message. Exact prompts:

- **Agent A — VK 2026 mechanics:** "Research how the VK (ВКонтакте) smart feed / recommendation algorithm rewards content in 2025–2026. What signals drive reach for a community page: reposts, saves, watch time, comments, clip completion, posting cadence, post length. Cite sources (URLs, dates). Return a structured summary with concrete, actionable levers for a 10K-subscriber community with ~0.3% ER. No fluff."
- **Agent B — RU glamping/rental SMM:** "Research SMM best practices for Russian glamping / посуточная аренда / загородный отдых in 2025–2026: which post intents (информационный, развлекательный, атмосферный, продающий, вовлекающий) and content types actually drive engagement and bookings. Find documented cases/numbers. Cite sources. Return a ranked list of post types with why-they-work evidence."
- **Agent C — Competitor teardown:** "Find and analyze 3–5 active Russian glamping / А-фрейм / загородные домики VK communities with strong engagement. For each: content mix, post types, posting frequency, what visibly virals (reposts/comments), tone. Return a comparison table + 5 transferable tactics. Cite the community URLs."
- **Agent D — Format trends:** "Research current (2025–2026) best practices for VK Stories and VK Клипы and Telegram channel posts in the travel/leisure niche: hook timing, optimal lengths, on-cover text, interactive stickers/polls, clip retention structure, Telegram post structure (no algorithm). Cite sources. Return per-format concrete rules."
- **Agent E — Papino factura sweep:** "Source factual material about Papino Village glamping. Read `C:\Users\kulle\IdeaProjects\ChatAdmin\docs\papinovillage\smm-content-plan.md` and `C:\Users\kulle\IdeaProjects\papinovillage\index.html` and any pages under `C:\Users\kulle\IdeaProjects\papinovillage\`. Also fetch public info from vk.com/papino_village if reachable. Extract: location, the two houses & their distinct features, prices, акции, amenities (чан, баня, проектор, винил, печь-камин, кошка), guest scenarios, owner-story facts. Brand voice is ONLY Михаил or impersonal — flag any Яна mentions for anonymization. Return a facts table + a GAP-list of unknowns needing the owner."

- [ ] **Step 3: Write findings into sections A–E**

Paste each agent's structured result into the matching section (A→A, B→B, C→C, D→D, E→E) of `smm-research-2026-05-17.md`. Keep source URLs/dates inline.

- [ ] **Step 4: Verify**

Each of sections A–E is non-empty, has ≥3 concrete points, and carries at least one cited source (except E which cites local files). Яна occurrences in section E are explicitly flagged for anonymization.

---

## Task 2: Distill findings → evidence base for taxonomy & criteria

**Files:**
- Modify: `docs/smm/smm-research-2026-05-17.md` (fill section F)

- [ ] **Step 1: Synthesize section F**

In section F write, with each claim referencing the A–E evidence that supports it:
1. **Post-type taxonomy** — the final list of посылы (e.g., атмосферно-эмоциональный / информационный / развлекательный / продающий / вовлекающий-UGC) that the evidence actually supports for this niche; drop or merge any not evidence-backed.
2. **Per-type success signal** — for each посыл, the one measurable thing that means "it worked" (e.g., informational → saves; вовлекающий → comments).
3. **Universal levers** — cross-cutting findings that apply to every post (hook timing, length, cadence, repost/save triggers).
4. **Format rules digest** — condensed per-channel constraints from section D.
5. **Open gaps** — anything the research could NOT establish (feeds the GAP-list).

- [ ] **Step 2: Verify**

Section F's taxonomy and every per-type criterion trace to a specific A–E citation. No criterion is asserted without evidence. If a posed type lacks support, it is explicitly marked "not evidence-backed — excluded".

- [ ] **Step 3: Commit research artifact (REQUIRES USER AUTHORIZATION)**

```bash
git -C C:/Users/kulle/IdeaProjects/papinovillage add docs/smm/smm-research-2026-05-17.md
git -C C:/Users/kulle/IdeaProjects/papinovillage commit -m "docs(smm): research notes for papino-smm skill"
```
Note: papinovillage repo, branch `main`. Per project git rules prefer a feature branch and never push to main directly; pause for explicit user authorization before running (no commit without command).

---

## Task 3: `references/papino-profile.md`

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\references\papino-profile.md`
- Source: `docs/papinovillage/smm-content-plan.md`, research section E

- [ ] **Step 1: Write the profile with this exact structure**

Sections (fill from content-plan + research E, facts only — no invention):
```markdown
# Papino Village — профиль объекта

## Что это           # глэмпинг, 2 А-фрейм, 65 км от Москвы, Калужское ш.
## Домики            # Зелёный (печь-камин, винил) / Синий (электро, проектор) — таблица отличий
## Цены и акции      # 5900 вс–чт / 8900 пт–сб / чан 3900; акции из v4
## Удобства          # чан, баня, проектор, винил, печь-камин, кошка, ...
## Owner-story        # факты для повествования от лица Михаила
## Тон бренда        # тёплый, от Михаила или "мы"; ЗАПРЕТ: Яна, канцелярит, инфоцыганщина
## GAP-лист          # нужно от владельца — bullet-список незакрытых фактов
```

- [ ] **Step 2: Verify**

Every fact is traceable to the content-plan or research E. No invented numbers. The Тон-бренда section states the Яна prohibition explicitly. GAP-list is non-empty and concrete (each item is a specific question, not "уточнить детали").

---

## Task 4: `references/guest-insights.md`

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\references\guest-insights.md`
- Source: content-plan (guest scenarios), research E, papinovillage repo anonymized reviews (commit `4d9be1a`)

- [ ] **Step 1: Write with this structure**

```markdown
# Гостевые инсайты

## Сценарии гостей      # свадьба/медовый месяц, ДР, постоянные (4 раза), пара на выходные...
## Эмоциональные триггеры # что цепляет: винил, треск печи, тишина, кошка...
## Формулировки гостей   # дословные фразы-зацепки ("скандинавский мини-домик" и т.п.)
## Правило обезличивания # Яна → "хозяева"/"нас встретили"; примеры до/после
```

- [ ] **Step 2: Verify**

The обезличивание section contains at least 2 before/after rewrite examples removing "Яна". All scenarios trace to content-plan or research.

---

## Task 5: `references/marketing-playbook.md`

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\references\marketing-playbook.md`
- Source: research sections A, B, C, F

- [ ] **Step 1: Write with this structure**

```markdown
# Маркетинг-плейбук (доказательный, из ресерча)

## VK 2026 — рычаги охвата   # из A: что алгоритм вознаграждает + как применять
## Хуки                      # типы первых строк, по нише; примеры
## Заголовки/структуры       # форматы лонгрида/опроса/карусели, что заходит (B,C)
## Эмоциональные триггеры    # из B/E
## Что виралит у конкурентов # из C: переносимые тактики
## Антипаттерны              # что глушит охват/реакции в нише
```
Every subsection cites the research section it came from.

- [ ] **Step 2: Verify**

No tactic without a research citation. "Антипаттерны" is non-empty.

---

## Task 6: `references/format-rules.md`

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\references\format-rules.md`
- Source: research section D + F format digest

- [ ] **Step 1: Write — one section per channel, each with the same sub-shape**

```markdown
# Форматные правила

## VK пост      # длина, структура, фото/карусель, где обрыв "ещё", хэштеги, CTA
## VK Stories   # число кадров, длительность, текст-оверлей, интерактив (опрос/вопрос)
## VK Клип      # хук в первые N сек, длина, текст на обложку, структура удержания
## Telegram     # длина, стиль, отсутствие алгоритма, форматирование, CTA
```
Each: a "Правила" bullet list + a "Чек перед публикацией" mini-list. Numbers come from research D, not guessed.

- [ ] **Step 2: Verify**

All 4 channels present; each has concrete numeric constraints traceable to research D (no "оптимальная длина" without a number).

---

## Task 7: `references/content-pillars.md`

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\references\content-pillars.md`
- Source: research section F taxonomy + content-plan post types

- [ ] **Step 1: Write taxonomy + pillars**

```markdown
# Контент-столпы и типы постов

## Посылы (типы постов)
<taxonomy from research F — one block per посыл:>
### <Посыл N>
- Когда применять
- Сигнал успеха (из F)
- Пример темы для Papino Village

## Тематические столпы
<pillars: атмосфера/природа, гости и сценарии, закулисье хозяев (Михаил),
 польза/гайды, сезон/события, оффер/акции, вовлечение — each: что входит,
 какие посылы уместны, 2–3 примера тем>
```

- [ ] **Step 2: Verify**

Every посыл matches Task 2/section F (same names, no extras). Each pillar lists which посылы fit it. "Закулисье" never references Яна.

---

## Task 8: `references/post-criteria.md` (the heart)

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\references\post-criteria.md`
- Source: research section F + spec Section 5

- [ ] **Step 1: Write the two-layer criteria + stop-lists**

```markdown
# Критерии качества поста

## Слой 1 — универсальная база (любой пост)
- [ ] Хук в первой строке (≤ обрыв VK), цепляет за ~1.5 сек
- [ ] Одна мысль на пост
- [ ] Тон: Михаил/мы, без канцелярита/инфоцыганщины
- [ ] Только подтверждённые профилем факты; пробел → пометка, не выдумка
- [ ] Яна НЕ упомянута; цитируемые отзывы обезличены        # БЛОКЕР
- [ ] CTA под цель поста
- [ ] Формат-комплаенс канала (см. format-rules)
- [ ] Приложен визуал-бриф
- [ ] Прошёл стоп-лист клише

## Слой 2 — оверлей по посылу
<one checklist block per посыл from content-pillars, criterion = its success signal>

## Стоп-лист (мгновенный блок)
- Любое упоминание/намёк на Яну
- <clichés/инфоцыган phrases from marketing-playbook антипаттерны>
```

- [ ] **Step 2: Verify**

Layer-2 has exactly one block per посыл defined in `content-pillars.md` (names match 1:1). Stop-list includes the Яна blocker as the first item. No criterion contradicts the playbook.

---

## Task 9: `SKILL.md` (per writing-skills canon)

**Files:**
- Create: `C:\Users\kulle\.claude\skills\papino-smm\SKILL.md`

- [ ] **Step 1: Invoke the writing-skills skill and follow its frontmatter/description rules**

Use `superpowers:writing-skills` for the canonical structure (frontmatter, trigger-word description, conciseness).

- [ ] **Step 2: Write SKILL.md with this content**

Frontmatter:
```markdown
---
name: papino-smm
description: Use when writing, planning, analyzing, or improving social posts/Stories/clips/Telegram for Papino Village (Папино Виладж) glamping — VK content, контент-план, разбор поста, оценка статистики SMM. Trigger on "пост для Papino", "сторис Папино", "контент-план", "разбери пост", "оцени статистику группы".
---
```
Body sections:
- **When to use / when NOT** (NOT: other objects; not media generation)
- **Hard rules** (Михаил/мы only; Яна never; facts only)
- **The 4 modes** — for each: inputs, step list, output shape:
  1. Одиночный пост → ask gaps → fix (столп,посыл,формат) → pick mechanic from playbook → draft → self-check vs post-criteria → output: текст + визуал-бриф + альт-хук + почему сработает
  2. Батч/контент-план → period/count/mix → spread over pillars+поводы → N posts → write to `C:\Users\kulle\IdeaProjects\papinovillage\docs\smm\YYYY-MM-DD-content-plan.md` (mirror the existing smm-content-plan.md v4 format & statuses)
  3. Анализ поста → text/URL → score vs criteria → diagnose weak ER → rewrite
  4. Оценка статистики → metrics by post/pillar → interpret → what to amplify + cadence
- **Self-check checklist** — inline copy of `post-criteria.md` Layer-1 + "load post-criteria.md for Layer-2"
- **References map** — one line per `references/*.md` saying when to read it

- [ ] **Step 3: Verify**

`description` contains concrete RU trigger phrases. All 4 modes have explicit step lists and named output artifacts. Mode 2 path and the requirement to mirror the v4 status vocabulary are stated. SKILL.md body stays focused (the heavy detail lives in references/, loaded on demand).

---

## Task 10: Templates (4 files)

**Files:**
- Create: `templates\vk-post.md`, `templates\vk-story.md`, `templates\vk-clip.md`, `templates\tg-post.md`

- [ ] **Step 1: Write each template as a fill-in skeleton**

Each template = the structural skeleton implied by `format-rules.md` for that channel, with bracketed slots and inline reminders, e.g. `vk-post.md`:
```markdown
[ХУК — 1 строка, до обрыва, цепляет за 1.5 сек]

[ОДНА мысль, развёрнута; сенсорика; тон Михаил/мы]

[CTA под цель: бронь / сохрани / напиши в комменты]

—
Визуал-бриф: [что на фото/карусели и почему]
Альт-хук: [запасной первый рядок]
Посыл: [тип] · Столп: [тематика] · Статус: [ГОТОВ/НУЖНО ФОТО/НУЖНА СЪЁМКА/НУЖНО UGC/ШАБЛОН]
```
`vk-story.md` (per-кадр), `vk-clip.md` (хук-сек + сценарий удержания + текст на обложку), `tg-post.md` (no-algorithm structure) follow their own format-rules sections analogously.

- [ ] **Step 2: Verify**

Each template's slots match its `format-rules.md` section (no slot the rules don't require; no required element missing). Status vocabulary matches the v4 content-plan.

---

## Task 11: Examples (1–2 per format)

**Files:**
- Create: `examples\vk-post-example.md`, `examples\vk-story-example.md`, `examples\vk-clip-example.md`, `examples\tg-post-example.md`

- [ ] **Step 1: Build each example as before/after + breakdown**

Source raw material from `smm-content-plan.md` (e.g., POST-001 owner-story, POST-002 опрос). Each example file:
```markdown
# Пример: <формат>
## До (слабый вариант)         # short weak draft
## После (по критериям)        # the strong version
## Разбор                      # which criteria/mechanics made it work, with refs
```
The "После" must itself pass `post-criteria.md` (incl. no Яна).

- [ ] **Step 2: Verify**

Each "После" passes Layer-1 criteria when checked by hand. Breakdown cites specific criteria/playbook mechanics. No Яна anywhere.

---

## Task 12: Validate the skill (writing-skills canon)

**Files:** none (validation run; fixes go back into Tasks 3–11 files)

- [ ] **Step 1: Mode-1 dry run**

Invoke the skill mentally/in a fresh subagent on: "Напиши VK-пост, атмосферный, про печь-камин и винил в Зелёном домике." Check the output against `post-criteria.md` Layer-1 + the атмосферный overlay. Record pass/fail per criterion.

- [ ] **Step 2: Mode-2 dry run**

Request: "Контент-план на 2 недели, 6 постов, микс форматов." Verify it produces the artifact at the Mode-2 path, mirrors v4 status vocabulary, spreads across pillars, no Яна.

- [ ] **Step 3: Mode-3 dry run**

Feed a deliberately weak post (a flat "приезжайте к нам, у нас уютно, бронируйте" blurb). Verify the skill diagnoses missing hook / no single idea / weak CTA and returns a criteria-passing rewrite.

- [ ] **Step 4: Mode-4 dry run**

Feed fake metrics (e.g., атмосферные посты охват 1800/ER 0.5%, продающие 600/0.1%). Verify interpretation + cadence recommendation references pillars/посылы correctly.

- [ ] **Step 5: Fix gaps**

For every failed criterion in Steps 1–4, edit the responsible reference/template/SKILL.md file. Re-run only the failed mode. Done when all 4 modes pass Layer-1 and their overlay with zero Яна leaks.

---

## Task 13: Versioned backup + commit docs (REQUIRES USER AUTHORIZATION)

**Files:**
- Create: `C:\Users\kulle\IdeaProjects\papinovillage\docs\skills\papino-smm\` (snapshot copy of the skill)

- [ ] **Step 1: Snapshot the skill into the version-controlled repo**

Run (PowerShell):
```powershell
$dst = "C:\Users\kulle\IdeaProjects\papinovillage\docs\skills\papino-smm"
New-Item -ItemType Directory -Force $dst | Out-Null
Copy-Item -Recurse -Force "C:\Users\kulle\.claude\skills\papino-smm\*" $dst
```
Rationale: `~/.claude/skills/` is not git-tracked; this snapshot is the safety net (directly motivated by the smm-content-plan scare). State in the snapshot README that the authoritative copy lives in `~/.claude/skills/papino-smm` and this is a backup.

- [ ] **Step 2: Commit (pause for user authorization first)**

```bash
git -C C:/Users/kulle/IdeaProjects/papinovillage add docs/skills/papino-smm docs/smm
git -C C:/Users/kulle/IdeaProjects/papinovillage commit -m "docs(smm): papino-smm skill snapshot + spec/plan/research"
```
All artifacts live in the papinovillage repo (default branch `main`). Per project git rules prefer a feature branch and never push to main directly. Do NOT run without explicit user "yes". ChatAdmin is never modified by this plan.

- [ ] **Step 3: Verify**

Snapshot dir contains SKILL.md + references/ + templates/ + examples/. After (authorized) commit, `git -C ...papinovillage log -1 --stat` shows the snapshot + spec/plan/research. ChatAdmin remains untouched (`git -C ...ChatAdmin status` shows no papino-smm files).

---

## Self-Review (performed during planning)

**1. Spec coverage:** Spec §3 structure → Tasks 0,3–11. §4 four modes → Task 9 + validated Task 12. §5 two-layer criteria → Task 8 (+ derived in Task 2). §6 research → Tasks 1–2. §7 hard ordering → task order (research 1–2 → derive 3–8 → build 9–11 → validate 12). §8 YAGNI/out-of-scope → no calendar/state tasks present. §9 gaps → Task 3 GAP-list + Task 2 section F gaps. Яна constraint → Tasks 3,4,8,9,11,12 explicit checks. No uncovered requirement.

**2. Placeholder scan:** No "TBD/TODO/handle edge cases". Content tasks specify exact file, exact section skeleton, exact source, and a concrete acceptance check — the document body is intentionally research-derived (spec forbids pre-writing criteria), which is a sourcing instruction, not a placeholder.

**3. Type/name consistency:** "посыл" taxonomy is defined once in Task 2/§F, consumed identically in Tasks 7→8→9→12 ("names match 1:1" checks enforce this). Status vocabulary `ГОТОВ/НУЖНО ФОТО/НУЖНА СЪЁМКА/НУЖНО UGC/ШАБЛОН` is used consistently in Tasks 9,10,12. Mode-2 output path identical in Task 9 and Task 12.

**4. Existing-test updates:** No existing automated test suite covers skill markdown (not code). The analog — the existing `smm-content-plan.md` v4 — is treated as primary source and its v4 status format is explicitly mirrored (Tasks 9,10,12) rather than diverged from.

**5. Pattern conformance:** SKILL.md follows the writing-skills canon explicitly (Task 9 Step 1). References/templates/examples folder layout matches the established skill structure seen across installed skills (SKILL.md + references/). Output content-plan mirrors the existing v4 file's format and statuses rather than inventing a new schema.
