# Flowchart Content Enhancement — Revised Plan

Based on source document analysis and user feedback.

---

## Changes Overview

### A. New Pathways (via edges to existing nodes)

#### A1. Gen-Ed FBA/BIP via MTSS
Add edges from **T2/T3 decision nodes** → existing **FBA** → **BIP** nodes, representing the MTSS behavioral pathway that doesn't require an IEP.

- New edge: `tier-2-check` → `fba` (label: "Behavior Concern — Conduct FBA")
- New edge: `tier-3-check` → `fba` (label: "Behavior Concern — Conduct FBA")
- These edges marked as `scenario: 'complex'` to show in comprehensive view

#### A2. Manifestation Determination → FBA/BIP
Add a **new node** `manifestation-determination` (decision type) connected:
- From `iep-implementation` → `manifestation-determination` (label: "Discipline — 10+ Days Removal")
- From `manifestation-determination` → `fba` (label: "Yes — Is Manifestation")
- This is a genuinely new decision point that doesn't exist yet
- Marked `scenario: 'complex'`

#### A3. Reevaluation Loop
Add edge from `annual-review` → `evaluation` (label: "Triennial Reevaluation")
- Reuses existing evaluation node
- Dashed line style, marked `scenario: 'complex'`

#### A4. Parent Request Emphasis
The `parent-request` node already exists. Enhance its detail text to emphasize that parents can bypass MTSS, and schools **cannot delay** evaluation to complete tiers.

---

### B. Content Improvements (existing nodes)

#### B1. Eligibility Determination — Add 3-step process
Clarify: (1) qualifying disability, (2) adverse effect, (3) needs specialized instruction. Note that no adverse effect = consider 504.

#### B2. Comprehensive Evaluation — Add exclusionary factors & multi-measure requirement

#### B3. FBA Node — Add methods (indirect/direct), consent requirement, function identification

#### B4. BIP Node — Add skill vs performance deficit, replacement behaviors, crisis plan, caregiver coordination

#### B5. 504 Plan — Add behavioral accommodations as a component

#### B6. All Terminal Nodes — Enhance detail text
- `gen-ed-success` — Add ongoing monitoring info
- `referral-denied` — Enhance IEE rights (public expense), due process options
- `504-implementation` — Already has good detail, minor enhancements

#### B7. IEP Development — Add transition at 14.5, translation requirements

---

### C. UI Changes

#### C1. Auto-activate Comprehensive Flow beyond overview zoom
In [App.jsx](file:///Users/paul/Github/just_vibing/IEP_504_FBA_BIP_Explainer/src/App.jsx): When zoom level reaches Standard (80%+), automatically enable `showComplexFlows`. At overview zoom, keep it user-controlled.

#### C2. Move Experiments Panel up
In [ExperimentPanel.css](file:///Users/paul/Github/just_vibing/IEP_504_FBA_BIP_Explainer/src/components/ui/ExperimentPanel.css): Change `bottom: 20px` → `bottom: 60px` to avoid blocking React Flow controls.

#### C3. Remove dangling edge from lowest node
Check for any edge sourcing from a terminal node that goes nowhere, and remove it.

---

### D. New Nodes (only when truly needed)

| Node | Type | Rationale |
|------|------|-----------|
| `manifestation-determination` | decision | Genuinely new decision — "Is behavior a manifestation of disability?" No existing node captures this. |

All other pathways (Gen-Ed FBA/BIP, reevaluation, 504 behavioral) are handled by **new edges to existing nodes**.

---

## File Changes Summary

| File | Changes |
|------|---------|
| [flowData.js](file:///Users/paul/Github/just_vibing/IEP_504_FBA_BIP_Explainer/src/data/flowData.js) | 1 new node, ~5 new edges, content updates to ~10 existing nodes |
| [App.jsx](file:///Users/paul/Github/just_vibing/IEP_504_FBA_BIP_Explainer/src/App.jsx) | Auto-enable comprehensive flow at Standard+ zoom |
| [ExperimentPanel.css](file:///Users/paul/Github/just_vibing/IEP_504_FBA_BIP_Explainer/src/components/ui/ExperimentPanel.css) | Move panel up from bottom |

## Verification
- `npm run build` for syntax check
- Browser test: verify all edges connect, no overlaps, auto-comprehensive works
- Cross-reference content with ISBE source docs
