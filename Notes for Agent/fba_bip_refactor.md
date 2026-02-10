# FBA/BIP Refactoring Plan

## Overview
Decouple FBA and BIP nodes from the IEP-specific pathway. FBAs can be conducted for ANY student (general ed, 504, or IEP), not just those on an IEP. This refactor creates a central "Behavioral Supports" branch that multiple pathways can access.

## Current State
- `behavior-concern` (Behavior Impacting Learning?) is positioned in IEP pathway
- `fba` and `bip` nodes are only accessible from IEP Development
- FBA/BIP positioned far left (x: -100) under IEP pathway
- Only IEP students appear to have access to behavioral supports

## Target State
- FBA/BIP nodes positioned in CENTER between IEP (left) and 504 (right) pathways
- Multiple entry points to FBA from different pathways
- Clear visual representation that behavioral supports are available to all students

## Layout Changes Required

### 1. Spread IEP and 504 Pathways Apart
Current approximate x positions:
- IEP pathway: x: 400
- 504 pathway: x: 1200

New positions (spread further apart):
- IEP pathway: x: 200-300 (move LEFT)
- FBA/BIP nodes: x: 700-800 (CENTER)
- 504 pathway: x: 1200-1300 (keep or move RIGHT)

### 2. Nodes to Reposition
- `behavior-concern` (Behavior Impacting Learning?): Move to center
- `fba`: Move to center (currently x: -100)
- `bip`: Move to center (currently x: -100)
- `iep-development`: Move left
- `iep-implementation`: Move left
- `annual-review`: Move left
- `manifestation-determination`: Adjust position

### 3. New Edge Connections to FBA

**Normal Flow (always visible):**
- `tier-1-check` → `fba` (label: "Behavior Concern")
  - Rationale: Gen-ed students can get FBA without IEP/504

**Comprehensive Flow (scenario: 'complex'):**
- `tier-2-check` → `fba` (already exists)
- `tier-3-check` → `fba` (already exists)

**From 504 Pathway:**
- `504-plan` → `fba` (label: "Behavior Support Needed")
  - Rationale: 504 students may need behavioral assessment

**From IEP Pathway:**
- Keep existing `iep-development` → `behavior-concern` → `fba` flow
- OR connect `iep-development` directly to `fba`

### 4. BIP Connections
- `fba` → `bip` (keep existing)
- `bip` should connect back to relevant implementation nodes:
  - `bip` → `iep-implementation` (for IEP students)
  - `bip` → `504-implementation` (for 504 students, comprehensive)
  - `bip` → `gen-ed-success` or new "Gen-Ed with BIP" endpoint (for gen-ed students)

## Content Updates

### FBA Node - Update Detail Text
Add/emphasize:
```
**Parent Consent Required:** An FBA is considered an evaluation and requires written parental consent before conducting, regardless of whether the student has an IEP, 504 plan, or is in general education. (ISBE Part 226.75)
```

### Consider Adding New Decision Node
- "Student Type?" or "Current Services?" decision after FBA/BIP to route back to appropriate pathway

## Phase Labels
May need to update or add phase label for the behavioral supports section:
- Current: "6C. FBA / BIP" positioned at x: -300
- Update position to center, or rename to "BEHAVIORAL SUPPORTS"

## Implementation Order

1. **Phase 1: Reposition IEP nodes left**
   - Move iep-development, behavior-concern to x: 200-300
   - Move iep-implementation, annual-review left
   - Verify build

2. **Phase 2: Reposition FBA/BIP to center**
   - Move fba, bip to x: 700-800
   - Update FBA/BIP phase label position
   - Verify build

3. **Phase 3: Add new edges**
   - Add tier-1-check → fba (normal flow)
   - Add 504-plan → fba (comprehensive)
   - Add bip → 504-implementation (comprehensive)
   - Consider bip → gen-ed endpoint
   - Verify build

4. **Phase 4: Update content**
   - Update FBA detail text about parent consent
   - Review all edge labels for clarity
   - Verify build

5. **Phase 5: Test and adjust**
   - Test at all zoom levels
   - Verify edge routing looks clean
   - Adjust positions as needed for visual clarity

## Visual Sketch (ASCII)

```
                    REFERRAL/EVAL FLOW
                          |
                          v
                    [Eligibility?]
                    /            \
                   /              \
          IEP Eligible        504 Eligible
                 |                  |
                 v                  v
         [IEP Development]    [504 Plan]
                 |                  |
                 |    BEHAVIOR      |
                 |    SUPPORTS      |
                 |        |         |
                 +------->|<--------+
                          v
                 [Behavior Concern?]
                          |
                          v
                       [FBA]
                          |
                          v
                       [BIP]
                          |
            +-------------+-------------+
            |             |             |
            v             v             v
     [IEP Impl]    [504 Impl]    [Gen-Ed]
```

## Notes
- Remember: 350 units minimum horizontal spacing between adjacent nodes
- Test at Overview, Summary, and Detail zoom levels
- Comprehensive flow edges should use `data: { scenario: 'complex' }`
- Dashed lines for optional/complex paths: `style: { strokeDasharray: '5 5' }`

## Files to Modify
- `src/data/flowData.js` - Node positions, edges, content
- Possibly `src/components/nodes/nodes.css` if new styling needed
