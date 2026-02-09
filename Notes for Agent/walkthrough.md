# Walkthrough - Flowchart Enhancements (Attempted & Reverted)

## Overview
This walkthrough documents the work done to enhance the Special Education Flowchart with new pathways (Gen-Ed FBA/BIP, Manifestation Determination) and detailed content updates.

**Status:** The changes were implemented but subsequently **reverted** to the original state. This document serves as a record of the planned and attempted changes for future reference.

## Planned Changes
The goal was to align the flowchart with ISBE regulations and provide more comprehensive pathways.

### 1. New Pathways
- **Manifestation Determination Review (MDR):** A new decision node was added to handle discipline for 10+ isolation days.
  - *Pathway:* IEP Implementation -> MDR -> FBA (if manifestation) OR Discipline (if not).
- **Gen-Ed FBA/BIP:** New dashed edges from MTSS Tier 2/3 directly to FBA, showing that behavioral supports don't always require an IEP.
- **Reevaluation Loop:** A dashed edge from Annual Review back to Evaluation for triennial reevaluations.

### 2. Content Enhancements
Detailed text updates were drafted for approximately 10 nodes to include specific regulatory info:
- **FBA:** Added "Parent Consent Required", methods (direct/indirect), and functions of behavior.
- **BIP:** Added "Skill vs Performance Deficit", replacement behaviors, and crisis plan components.
- **Evaluation:** Added "Exclusionary Factors" (lack of instruction, EL status) and the 60-day timeline.
- **Eligibility:** Clarified the 3-step criteria (Disability + Adverse Effect + Need for Instruction).
- **504 Plan:** Added a section on "Behavioral Supports" within 504s.
- **Parent Request:** Emphasized the right to request evaluation at any time, bypassing MTSS.

### 3. UI Improvements (Proposed)
- **Auto-Comprehensive Flow:** Logic to automatically check "Comprehensive Flow" when zooming in.
- **Panel Positioning:** Moving the experiments panel up to avoid overlapping controls.

## Implementation & Revert
The changes were initially applied to `flowData.js` and `App.jsx`. However, during the process:
1. **Syntax Errors:** Some template literals in `flowData.js` had syntax issues (doubled backticks/commas).
2. **Crash/Revert:** The application likely crashed or failed to build, leading to a manual revert of the files to their working state.

## Next Steps (If Resuming)
To re-implement these changes successfully:
1. **Use the Implementation Plan:** Refer to `implementation_plan.md` in the "Notes for Agent" folder.
2. ** Careful Syntax Checking:** Ensure template literals in `flowData.js` are clean (avoid `\` characters at end of strings).
3. **Incremental Application:** Apply the new node first, verify, then apply edges, then content updates.

## Artifacts
The full implementation plan has been saved to:
`Notes for Agent/implementation_plan.md`
