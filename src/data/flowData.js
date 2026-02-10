/**
 * Flowchart Data - Special Education Intervention Process
 *
 * This defines the nodes and edges for the interactive flowchart.
 * Each node has content for 3 zoom levels:
 * - minimal: Just the title (for zoomed out view)
 * - summary: Title + key info
 * - detailed: Full description with timelines, personnel, legal refs
 *
 * LAYOUT GUIDELINES:
 * - Neighboring tiles in the same row should be at least 350 units apart (x-axis)
 * - This ensures adequate spacing when tiles expand on hover
 * - Vertical spacing (y-axis) should be ~260+ units between rows
 */

// Node type categories for styling
export const NODE_CATEGORIES = {
    RECOGNITION: 'recognition',
    MTSS: 'mtss',
    REFERRAL: 'referral',
    EVALUATION: 'evaluation',
    IEP: 'iep',
    PLAN_504: '504',
    FBA_BIP: 'fba-bip',
    DECISION: 'decision',
    ENDPOINT: 'endpoint',
    PHASE_LABEL: 'phase-label',
};

// Phase label nodes (visible when zoomed out) - positioned LEFT of tiles
const phaseLabels = [
    {
        id: 'phase-tier1',
        type: 'phaseLabelNode',
        position: { x: -200, y: -20 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '1. TIER 1',
            description: 'Universal supports & screening',
        },
    },
    {
        id: 'phase-intervention',
        type: 'phaseLabelNode',
        position: { x: -200, y: 340 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '2. INTERVENTION',
            description: 'Tiered supports (MTSS/RTI)',
        },
    },
    {
        id: 'phase-referral',
        type: 'phaseLabelNode',
        position: { x: -200, y: 1350 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '3. REFERRAL',
            description: 'Formal evaluation request',
        },
    },
    {
        id: 'phase-evaluation',
        type: 'phaseLabelNode',
        position: { x: -200, y: 2100 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '4. EVALUATION',
            description: '60-day comprehensive assessment',
        },
    },
    {
        id: 'phase-eligibility',
        type: 'phaseLabelNode',
        position: { x: -200, y: 2450 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '5. ELIGIBILITY',
            description: 'Determine services pathway',
        },
    },
    {
        id: 'phase-iep',
        type: 'phaseLabelNode',
        position: { x: -300, y: 3100 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '6A. IEP PATHWAY',
            description: 'Individualized Education Program',
        },
    },
    {
        id: 'phase-504',
        type: 'phaseLabelNode',
        position: { x: 1450, y: 3100 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '6B. 504 PLAN',
            description: 'Section 504 Accommodations',
        },
    },
    {
        id: 'phase-fba-bip',
        type: 'phaseLabelNode',
        position: { x: 600, y: 3100 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: 'BEHAVIOR SUPPORT',
            description: 'Behavior Assessment & Intervention',
        },
    },
];

// Initial nodes for the flowchart - INCREASED SPACING
export const initialNodes = [
    // Phase labels
    ...phaseLabels,

    // ===== MTSS TIER 1 (Universal - All Students Start Here) =====
    {
        id: 'tier-1',
        type: 'processNode',
        position: { x: 400, y: 0 },
        data: {
            category: NODE_CATEGORIES.MTSS,
            label: 'Tier 1: Universal Supports',
            summary: 'High-quality core instruction for all students',
            detail: `**Tier 1** is the foundation of MTSS - research-based instruction and supports
provided to ALL students in general education.

**Key Components:**
• Differentiated instruction
• Positive behavioral expectations
• Universal screening (3x/year)
• Progress monitoring

**Duration:** Ongoing
**Setting:** General education classroom
**Intensity:** Standard instruction

**Universal Screening:**
All students are screened 3x/year to identify those who may need additional support.

**Expected Outcome:**
~80-85% of students will succeed with Tier 1 alone.`,
        },
    },

    // ===== CONCERN IDENTIFICATION =====
    {
        id: 'concern-identified',
        type: 'processNode',
        position: { x: 400, y: 260 },
        data: {
            category: NODE_CATEGORIES.RECOGNITION,
            label: 'Concern Identified',
            summary: 'Screening or observation flags a student need',
            detail: `A student is flagged when universal screening or observation indicates they may
need more than Tier 1 supports.

**How Concerns Are Identified:**
• Universal screening data (3x/year benchmarks)
• Teacher observations
• Parents/Guardians (home concerns)
• Progress monitoring data

**Common Indicators:**
• Not meeting grade-level benchmarks
• Academic struggles despite differentiated instruction
• Behavioral patterns affecting learning
• Social/emotional difficulties
• Attendance or engagement issues`,
        },
    },

    {
        id: 'tier-1-check',
        type: 'decisionNode',
        position: { x: 400, y: 540 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'T1: Adequate Progress?',
            summary: 'Is the student responding to Tier 1 supports?',
            detail: `The team reviews data to determine if the student is making adequate progress 
with universal supports.

**Data Sources:**
• Classroom assessments
• Universal screening results
• Teacher observations
• Behavioral data

**Decision Criteria:**
• Meeting grade-level benchmarks?
• Closing the gap with peers?
• Rate of improvement sufficient?`,
        },
    },

    // ===== MTSS TIER 2 =====
    {
        id: 'tier-2',
        type: 'processNode',
        position: { x: 750, y: 540 },
        data: {
            category: NODE_CATEGORIES.MTSS,
            label: 'Tier 2: Targeted Interventions',
            summary: 'Small group, evidence-based interventions',
            detail: `**Tier 2** provides additional targeted support for students who need more 
than core instruction.

**Key Components:**
• Small group instruction (3-6 students)
• Evidence-based interventions
• Progress monitoring (weekly/bi-weekly)
• Standardized intervention protocols

**Duration:** 8-12 weeks typically
**Setting:** General education + intervention time
**Intensity:** 30+ min, 3-5x/week

**Examples:**
• Reading intervention groups
• Check-In Check-Out (CICO)
• Social skills groups`,
        },
    },

    {
        id: 'tier-2-check',
        type: 'decisionNode',
        position: { x: 750, y: 820 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'T2: Adequate Progress?',
            summary: 'Is the student responding to Tier 2 interventions?',
            detail: `Team reviews intervention data to determine response.

**Progress Monitoring:**
• Data collected weekly or bi-weekly
• Compared to peer growth
• Analyzed for trends

**Possible Outcomes:**
• Return to Tier 1 (successful)
• Continue Tier 2 (making progress)
• Escalate to Tier 3 (needs more support)
• Consider special education referral`,
        },
    },

    // ===== MTSS TIER 3 =====
    {
        id: 'tier-3',
        type: 'processNode',
        position: { x: 1100, y: 820 },
        data: {
            category: NODE_CATEGORIES.MTSS,
            label: 'Tier 3: Intensive Interventions',
            summary: 'Individualized, high-intensity support',
            detail: `**Tier 3** provides the most intensive level of support within general education.

**Key Components:**
• Individualized or very small groups (1-3)
• Highly intensive interventions
• Frequent progress monitoring (2x+/week)
• Problem-solving team involvement

**Duration:** Extended period, data-driven
**Setting:** May include specialized settings
**Intensity:** 60+ min daily

**Important Note:**
Students do NOT need to "fail" through all tiers before a special education 
referral. Parents can request an evaluation at any time.

**Legal Requirement:**
Schools cannot delay a special education evaluation due to a student's 
participation in the MTSS/RTI process.`,
        },
    },

    {
        id: 'tier-3-check',
        type: 'decisionNode',
        position: { x: 1100, y: 1100 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'T3: Adequate Progress?',
            summary: 'Is intensive intervention sufficient?',
            detail: `Final review before potential special education referral.

**Key Questions:**
• Has the student responded to intensive intervention?
• Is the gap closing with appropriate rate?
• Are there signs of a disability?

**Options:**
• Continue Tier 3 (working but needs more time)
• Return to Tier 2 (significant progress)
• Refer for special education evaluation
• Consider 504 plan for accommodations`,
        },
    },

    // ===== REFERRAL =====
    {
        id: 'referral',
        type: 'processNode',
        position: { x: 800, y: 1280 },
        data: {
            category: NODE_CATEGORIES.REFERRAL,
            label: 'Formal Referral',
            summary: 'Written request for special education evaluation',
            detail: `A **formal referral** initiates the special education evaluation process.

**Who Can Refer:**
• Parents/Guardians (at any time)
• Teachers
• School personnel
• Outside agencies

**Required Elements:**
• Written request preferred
• Specific concerns documented
• Intervention data (if applicable)

**Parent Rights:**
• Can request evaluation at ANY time
• School cannot delay due to MTSS
• Must respond within 14 school days (IL)

**School Response:**
District has **14 school days** to provide a written response deciding whether 
to evaluate. They must either:
1. Agree to evaluate (and request consent)
2. Deny the request (and provide written explanation)`,
        },
    },

    {
        id: 'consent',
        type: 'processNode',
        position: { x: 800, y: 1560 },
        data: {
            category: NODE_CATEGORIES.REFERRAL,
            label: 'Parental Consent',
            summary: 'Written consent required before evaluation',
            detail: `The school must obtain **written parental consent** before conducting 
any evaluation for special education.

**Parent Rights:**
• Consent is voluntary
• Can revoke consent at any time
• Refusal does not affect other services

**Timeline Trigger:**
The 60-school-day evaluation timeline begins on the date the school **receives** 
the signed written consent.

**If Parent Refuses:**
• School may request due process (rare)
• Cannot evaluate without consent
• Document attempts to obtain consent`,
        },
    },

    // ===== DOMAIN MEETING =====
    {
        id: 'domain-meeting',
        type: 'processNode',
        position: { x: 800, y: 1760 },
        data: {
            category: NODE_CATEGORIES.EVALUATION,
            label: 'Domain Meeting',
            summary: 'Team determines evaluation areas',
            meetingRequired: true,
            detail: `The **Domain Meeting** determines what areas will be assessed in the evaluation.

**Purpose:**
Identify all areas of suspected disability that need to be evaluated.

**Team Reviews:**
• Existing data (grades, assessments, observations)
• Parent input and concerns
• Teacher observations
• Previous interventions and results

**Domains May Include:**
• Cognitive/Intellectual
• Academic Achievement
• Communication/Speech-Language
• Social/Emotional/Behavioral
• Motor/Physical
• Adaptive Behavior
• Health/Medical

**Outcome:**
Written evaluation plan specifying:
• Areas to be assessed
• Evaluation methods
• Professionals responsible

**Timeline:** Typically held shortly after consent is received.`,
        },
    },

    // ===== EVALUATION =====
    {
        id: 'evaluation',
        type: 'processNode',
        position: { x: 800, y: 2040 },
        data: {
            category: NODE_CATEGORIES.EVALUATION,
            label: 'Comprehensive Evaluation',
            summary: '60 school days to complete full evaluation',
            detail: `A **comprehensive evaluation** assesses all areas of suspected disability.

**Timeline:** **60 school days** from receipt of consent to complete evaluation AND hold eligibility meeting.
(Note: If <60 days left in school year, must be done by first day of next year)

**Assessment Areas:**
• Cognitive/intellectual functioning
• Academic achievement
• Social/emotional/behavioral
• Communication
• Motor skills
• Health & developmental history

**Key Requirements:**
• Use **variety of assessment tools** — no single measure determines eligibility
• Assess in **all areas of suspected disability**
• Conducted by qualified professionals
• Non-discriminatory procedures
• Technically sound instruments

**Exclusionary Factors (Must Rule Out):**
The team must determine that poor performance is NOT primarily due to:
• **Lack of appropriate instruction** in reading or math
• **Limited English proficiency** (EL/ELL status)
• **Environmental, cultural, or economic factors**

**Team Members May Include:**
• School psychologist
• Special education teacher
• General education teacher
• Speech-language pathologist
• Social worker
• Other specialists as needed

**Reference:** ISBE Part 226.110`,
        },
    },

    // ===== ELIGIBILITY =====
    {
        id: 'eligibility-meeting',
        type: 'processNode',
        position: { x: 800, y: 2380 },
        data: {
            category: NODE_CATEGORIES.EVALUATION,
            label: 'Eligibility Determination',
            meetingRequired: true,
            summary: 'Team reviews data to determine eligibility',
            detail: `The team meets to determine if the student is **eligible for special education**.

**Three-Prong IDEA Eligibility Test:**
1. **Disability:** Student has one of 14 IDEA disability categories
2. **Adverse Effect:** Disability adversely affects educational performance
3. **Need for SDI:** Student requires specially designed instruction

⚠️ **All three prongs must be met.** If a student has a disability but it does NOT adversely affect educational performance, they are not eligible for an IEP — consider 504 Plan instead.

**14 IDEA Disability Categories:**
• Autism • Deaf-Blindness • Deafness
• Developmental Delay (ages 3-9) • Emotional Disability
• Hearing Impairment • Intellectual Disability
• Multiple Disabilities • Orthopedic Impairment
• Other Health Impairment • Specific Learning Disability
• Speech/Language • Traumatic Brain Injury
• Visual Impairment

**Required Notices:**
• Must provide copies of all reports/eligibility drafts (typically 3 days prior)
• Must provide written notice of eligibility determination within **10 school days** of meeting

**If NOT Eligible for IEP:**
Consider 504 Plan eligibility — 504 has a broader definition of disability and does not require specially designed instruction.`,
        },
    },

    {
        id: 'eligibility-decision',
        type: 'decisionNode',
        position: { x: 800, y: 2700 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'Eligible?',
            summary: 'Does student qualify for special education?',
            detail: `Team determines eligibility pathway.

**Decision Options:**
• **Eligible for IEP:** Meets IDEA criteria
• **Not Eligible for IEP:** Does not meet criteria
• **Consider 504:** Has impairment but doesn't need specialized instruction`,
        },
    },

    // ===== IEP PATHWAY =====
    {
        id: 'iep-development',
        type: 'processNode',
        position: { x: 200, y: 3000 },
        data: {
            category: NODE_CATEGORIES.IEP,
            label: 'IEP Development',
            meetingRequired: true,
            summary: 'Team develops Individualized Education Program',
            detail: `If eligible, the team develops an **Individualized Education Program (IEP)**.

**Timeline:** Meeting must be held within **30 calendar days** of eligibility determination

**IEP Team Must Include:**
• Parent(s)
• General education teacher
• Special education teacher
• LEA representative
• Person to interpret evaluation
• Student (when appropriate)
• Others as needed

**IEP Components:**
• Present Levels (PLAAFP)
• Annual Goals (measurable)
• Special Education Services
• Related Services
• Accommodations & Modifications
• Assessment Participation
• Transition (age 14.5+)
• Least Restrictive Environment (LRE)`,
        },
    },

    {
        id: 'behavior-concern',
        type: 'decisionNode',
        position: { x: 700, y: 3300 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'Behavior Impacting Learning?',
            summary: 'Does behavior impede student or others\' learning?',
            detail: `If behavior is a concern, the IEP team must address it.

**Consider:**
• Is behavior impacting the student's learning?
• Is behavior impacting others' learning?
• Are current interventions ineffective?

**Mandatory FBA If:**
• Student removed for >10 school days (pattern of behavior)
• Manifestation Determination finds behavior is disability-related
• Student placed in Interim Alternative Educational Setting (IAES)

**If Yes:** FBA and BIP required`,
        },
    },

    // ===== FBA/BIP PATHWAY =====
    {
        id: 'fba',
        type: 'processNode',
        position: { x: 700, y: 3600 },
        data: {
            category: NODE_CATEGORIES.FBA_BIP,
            label: 'Functional Behavior Assessment',
            summary: 'Systematic analysis of behavior function',
            detail: `An **FBA** identifies WHY a behavior is occurring.

⚠️ **Parent Consent Required:** An FBA is considered an evaluation and requires written parental consent before conducting, regardless of whether the student has an IEP, 504 plan, or is in general education. (ISBE Part 226.75)

**Purpose:**
Understand the function of behavior to develop effective interventions

**Key Questions:**
• What is the specific behavior?
• When/where does it occur?
• What triggers the behavior?
• What maintains the behavior?

**Data Collection Methods:**

*Indirect Methods:*
• Interviews (teacher, parent, student)
• Review of records and existing data
• Rating scales and checklists

*Direct Methods:*
• Structured observations
• ABC data (Antecedent-Behavior-Consequence)
• Scatterplot analysis
• Functional Analysis (controlled conditions)

**Functions of Behavior (SEAT):**
• **S**ensory/Automatic — internal stimulation
• **E**scape/Avoidance — get away from task/person/setting
• **A**ttention — gain response from others
• **T**angible — obtain object, activity, or preferred item

**Reference:** ISBE Part 226.75`,
        },
    },

    {
        id: 'bip',
        type: 'processNode',
        position: { x: 700, y: 3950 },
        data: {
            category: NODE_CATEGORIES.FBA_BIP,
            label: 'Behavior Intervention Plan',
            summary: 'Written plan to address behavior based on FBA',
            detail: `A **BIP** is developed based on FBA findings to reduce challenging behaviors
and teach replacement skills.

**BIP Components:**
• Target behavior defined (observable, measurable)
• Hypothesis statement (function from FBA)
• Prevention/antecedent strategies
• Teaching replacement behaviors
• Response strategies (reinforcement & consequences)
• Data collection plan
• **Crisis/safety plan** (if behavior poses risk)

**Skill vs. Performance Deficit:**
• **Skill Deficit:** Student doesn't know HOW — teach the skill
• **Performance Deficit:** Student knows but doesn't DO — increase motivation/reinforcement

**Replacement Behavior Requirement:**
Must teach a functionally equivalent replacement behavior that:
• Serves the same function as problem behavior
• Is more socially appropriate
• Is easier/more efficient for the student

**Implementation:**
• All staff trained on the plan
• **Caregiver coordination** — share strategies with parents for consistency
• Consistent implementation across settings
• Regular data review (progress monitoring)
• Adjust based on data

**Key Principles:**
• Based on FBA data — function-matched interventions
• Positive and proactive, not punitive
• Environmentally focused — modify setting events and antecedents`,
        },
    },

    {
        id: 'iep-implementation',
        type: 'endpointNode',
        position: { x: 200, y: 3350 },
        data: {
            category: NODE_CATEGORIES.IEP,
            label: 'IEP Implementation',
            summary: 'Services delivered as written in IEP',
            detail: `The IEP is implemented and progress is monitored.

**Implementation Requirements:**
• Services begin as soon as possible
• All staff informed of responsibilities
• Accommodations in place
• Related services scheduled

**Progress Monitoring:**
• Goals tracked regularly
• Progress reports to parents (with report cards)
• Data-based decision making
• Adjust instruction as needed

**FAPE Requirement:**
Student must receive Free Appropriate Public Education 
in the Least Restrictive Environment (LRE)`,
        },
    },

    {
        id: 'annual-review',
        type: 'processNode',
        position: { x: 200, y: 3700 },
        data: {
            category: NODE_CATEGORIES.IEP,
            label: 'Annual Review',
            meetingRequired: true,
            summary: 'IEP reviewed at least once per year',
            detail: `The IEP must be reviewed **at least annually**.

**Annual Review Purpose:**
• Review progress on goals
• Develop new annual goals
• Revise services as needed
• Update present levels

**Reevaluation:**
Every 3 years (or sooner if requested)
• Determine continued eligibility
• Update evaluation data

**Parent Rights:**
• Can request IEP meeting anytime
• Can request reevaluation
• Receive progress reports`,
        },
    },

    // ===== 504 PATHWAY =====
    {
        id: '504-eligibility',
        type: 'processNode',
        position: { x: 1200, y: 3000 },
        data: {
            category: NODE_CATEGORIES.PLAN_504,
            label: '504 Eligibility',
            summary: 'Broader eligibility than IDEA',
            detail: `**Section 504** of the Rehabilitation Act protects students with disabilities.

**504 Eligibility:**
Student has a physical or mental impairment that **substantially limits** 
one or more major life activities.

**Major Life Activities Include:**
• Learning • Reading • Concentrating
• Thinking • Communicating • Walking
• Breathing • Working • Sleeping

**Key Difference from IEP:**
• Broader definition of disability
• No need for specialized instruction
• Provides accommodations for equal access

**Common 504 Conditions:**
• ADHD • Diabetes • Asthma
• Allergies • Anxiety • Depression
• Chronic health conditions`,
        },
    },

    {
        id: '504-plan',
        type: 'processNode',
        position: { x: 1200, y: 3350 },
        data: {
            category: NODE_CATEGORIES.PLAN_504,
            label: '504 Plan Development',
            meetingRequired: true,
            summary: 'Team develops accommodations plan',
            detail: `A **504 Plan** outlines accommodations to provide equal access.

**504 Team:**
• Individuals knowledgeable about the student
• Not as strictly defined as IEP team

**Plan Components:**
• Disability/condition description
• How it impacts learning
• Specific accommodations
• Implementation responsibilities
• Review schedule

**Common Accommodations:**
• Extended time on tests
• Preferential seating
• Breaks during class
• Modified assignments
• Assistive technology
• Health/medical accommodations

**Review:**
Annually (or as needed)`,
        },
    },

    {
        id: '504-implementation',
        type: 'endpointNode',
        position: { x: 1200, y: 3700 },
        data: {
            category: NODE_CATEGORIES.PLAN_504,
            label: '504 Plan Implementation',
            summary: 'Accommodations provided, plan reviewed annually',
            detail: `504 Plan is implemented and monitored.

**Teacher Responsibilities:**
• Implement all accommodations
• Document implementation
• Report concerns to 504 coordinator

**Annual Review:**
• Review effectiveness
• Update accommodations as needed
• Reevaluate eligibility periodically`,
        },
    },

    // ===== SUCCESS OUTCOMES =====
    {
        id: 'gen-ed-success',
        type: 'endpointNode',
        position: { x: 50, y: 540 },
        data: {
            category: NODE_CATEGORIES.ENDPOINT,
            label: 'Continue General Ed',
            summary: 'Student successful with universal supports',
            detail: `Student continues in general education with Tier 1 supports.
Progress monitoring continues to ensure ongoing success.`,
        },
    },

    // ===== COMPLEX SCENARIO NODES =====
    {
        id: 'referral-denied',
        type: 'endpointNode',
        position: { x: 1200, y: 1380 },
        data: {
            category: NODE_CATEGORIES.ENDPOINT,
            label: 'Evaluation Denied',
            summary: 'School declines to evaluate',
            detail: `**Prior Written Notice (PWN) Required**
Schools must provide written explanation of why they are refusing to evaluate.

**Parent Options:**

**1. Independent Educational Evaluation (IEE) at Public Expense**
Parents have the right to request an IEE at school district expense if they disagree with the school's evaluation (or refusal to evaluate). The district must either:
• Pay for the IEE, OR
• File for due process to prove their evaluation was appropriate
(ISBE Part 226.180)

**2. Dispute Resolution Options:**
• **Mediation** — voluntary, facilitated meeting (free to parents)
• **State Complaint** — file with ISBE within 1 year
• **Due Process Hearing** — formal legal proceeding within 2 years

**3. Other Paths:**
• Request meeting to review data/reasons
• Pursue 504 Plan if appropriate
• Obtain private evaluation (parent expense)
• Return to MTSS interventions`,
            scenario: 'complex',
        },
    },
    {
        id: 'parent-request',
        type: 'processNode',
        position: { x: 950, y: 0 },
        data: {
            category: NODE_CATEGORIES.REFERRAL,
            label: 'Parent Request',
            summary: 'Direct request for evaluation',
            detail: `Parents can request a special education evaluation **at any time**.

⚠️ **Schools CANNOT delay evaluation due to MTSS/RTI.**
A parent's written request for evaluation triggers the school's obligation to respond — the student does NOT need to "fail" through intervention tiers first.

**Key Points:**
• Written request is recommended (creates documentation)
• School must respond within **14 school days** (IL)
• School must either agree to evaluate OR provide written explanation of denial
• Parent rights remain throughout the process

**Reference:** ISBE Part 226.110(a)`,
            scenario: 'complex',
        },
    },

    // ===== MANIFESTATION DETERMINATION =====
    {
        id: 'manifestation-determination',
        type: 'decisionNode',
        position: { x: 450, y: 4050 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'Manifestation Determination',
            summary: 'Is behavior a manifestation of disability?',
            meetingRequired: true,
            detail: `**Manifestation Determination Review (MDR)**

Required when student is removed for 10+ school days (cumulative or consecutive).

**The Team Must Determine:**
1. Was the behavior caused by the disability?
2. Was it a direct result of failure to implement IEP?

**If YES (Is Manifestation):**
• Student returns to placement (unless parent/school agree otherwise)
• FBA must be conducted (if not already done)
• BIP developed or reviewed

**If NO (Not Manifestation):**
• Same discipline as non-disabled peers
• Continue FAPE during removal

**Timeline:** Must occur within 10 school days of removal decision.
**Reference:** ISBE Part 226.400`,
            scenario: 'complex',
        },
    },
];

// Edge definitions connecting the nodes
// Solid lines = forward progression
// Dashed lines = return paths (going back to earlier steps)
export const initialEdges = [
    // Tier 1 screening identifies concerns
    { id: 'e-tier1-concern', source: 'tier-1', target: 'concern-identified', animated: true, label: 'Concern Flagged' },

    // Parent request can also trigger concern identification
    { id: 'e-parent-concern', source: 'parent-request', target: 'concern-identified', label: 'Parent Concern', type: 'smoothstep' },

    // Tier 1 flow
    { id: 'e-concern-check', source: 'concern-identified', target: 'tier-1-check' },
    { id: 'e-tier1-success', source: 'tier-1-check', target: 'gen-ed-success', label: 'Yes - Success', type: 'smoothstep' },
    { id: 'e-tier1-tier2', source: 'tier-1-check', target: 'tier-2', label: 'No - More Support' },

    // Tier 2 flow
    { id: 'e-tier2-check', source: 'tier-2', target: 'tier-2-check' },
    { id: 'e-tier2-tier3', source: 'tier-2-check', target: 'tier-3', label: 'No - Intensify' },

    // Tier 2 Return Path (Complex)
    {
        id: 'e-tier2-return',
        source: 'tier-2-check',
        target: 'gen-ed-success',
        label: 'Success - Fade Support',
        type: 'smoothstep',
        animated: true,
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex', type: 'return' }
    },

    // Tier 3 flow
    { id: 'e-tier3-check', source: 'tier-3', target: 'tier-3-check' },

    // Referral paths from tier checks (T1/T2 are Complex, T3 is standard)
    // Order matters for badge display: T1, T2, T3
    {
        id: 'e-tier1-referral',
        source: 'tier-1-check',
        target: 'referral',
        label: 'Request Evaluation',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
    {
        id: 'e-tier2-referral',
        source: 'tier-2-check',
        target: 'referral',
        label: 'Request Evaluation',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
    { id: 'e-tier3-referral', source: 'tier-3-check', target: 'referral', label: 'Evaluate for Services' },

    // Tier 3 Return Path (Complex)
    {
        id: 'e-tier3-return',
        source: 'tier-3-check',
        target: 'tier-2',
        label: 'Success - Fade to T2',
        type: 'smoothstep',
        animated: true,
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex', type: 'return' }
    },

    // Referral flow
    { id: 'e-referral-consent', source: 'referral', target: 'consent', label: 'Request Consent' },

    // Referral Denied (Complex)
    {
        id: 'e-referral-denied',
        source: 'referral',
        target: 'referral-denied',
        label: 'Request Denied',
        type: 'smoothstep',
        data: { scenario: 'complex', type: 'denial' }
    },
    {
        id: 'e-denied-return',
        source: 'referral-denied',
        target: 'tier-3',
        label: 'Return to MTSS',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex', type: 'return' }
    },

    // Parent Request (Complex)
    {
        id: 'e-parent-request',
        source: 'parent-request',
        target: 'referral',
        label: 'Direct Request',
        type: 'smoothstep',
        animated: true,
        data: { scenario: 'complex' }
    },

    { id: 'e-consent-domain', source: 'consent', target: 'domain-meeting', label: 'Schedule Meeting' },
    { id: 'e-domain-eval', source: 'domain-meeting', target: 'evaluation', label: 'Begin Evaluation' },

    // Evaluation flow
    { id: 'e-eval-eligibility', source: 'evaluation', target: 'eligibility-meeting', label: 'Complete Assessment' },
    { id: 'e-eligibility-decision', source: 'eligibility-meeting', target: 'eligibility-decision' },

    // Eligibility decisions
    { id: 'e-eligible-iep', source: 'eligibility-decision', target: 'iep-development', label: 'IEP Eligible', type: 'smoothstep' },
    { id: 'e-eligible-504', source: 'eligibility-decision', target: '504-eligibility', label: '504 Eligible', type: 'smoothstep' },

    // Ineligible (Complex)
    {
        id: 'e-ineligible-return',
        source: 'eligibility-decision',
        target: 'tier-3',
        label: 'Not Eligible',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex', type: 'denial' }
    },

    // IEP flow
    { id: 'e-iep-behavior', source: 'iep-development', target: 'behavior-concern', label: 'Assess Behavior' },
    { id: 'e-behavior-fba', source: 'behavior-concern', target: 'fba', label: 'Yes - Conduct FBA' },
    { id: 'e-behavior-no', source: 'behavior-concern', target: 'iep-implementation', label: 'No - Proceed' },
    { id: 'e-fba-bip', source: 'fba', target: 'bip', label: 'Develop BIP' },
    { id: 'e-bip-iep', source: 'bip', target: 'iep-implementation', label: 'IEP Student' },
    {
        id: 'e-bip-504',
        source: 'bip',
        target: '504-implementation',
        label: '504 Student',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
    {
        id: 'e-bip-gened',
        source: 'bip',
        target: 'gen-ed-success',
        label: 'Gen-Ed Student',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
    { id: 'e-iep-review', source: 'iep-implementation', target: 'annual-review', label: 'Monitor Progress' },
    { id: 'e-review-iep', source: 'annual-review', target: 'iep-development', type: 'smoothstep', style: { strokeDasharray: '5 5' }, label: 'Annual Review' },

    // 504 flow
    { id: 'e-504-elig-plan', source: '504-eligibility', target: '504-plan', label: 'Develop Plan' },
    { id: 'e-504-plan-impl', source: '504-plan', target: '504-implementation', label: 'Implement' },
    { id: 'e-504-review', source: '504-implementation', target: '504-plan', type: 'smoothstep', style: { strokeDasharray: '5 5' }, label: 'Annual Review' },

    // Manifestation Determination pathway (Complex)
    {
        id: 'e-iep-mdr',
        source: 'iep-implementation',
        target: 'manifestation-determination',
        label: 'Discipline 10+ Days',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
    {
        id: 'e-mdr-fba',
        source: 'manifestation-determination',
        target: 'fba',
        label: 'Yes - Is Manifestation',
        type: 'smoothstep',
        data: { scenario: 'complex' }
    },

    // Behavior support paths from MTSS tiers
    // T1 is normal flow, T2/T3 are comprehensive
    { id: 'e-tier1-behavior', source: 'tier-1-check', target: 'behavior-concern', label: 'Behavior Concern', type: 'smoothstep' },
    {
        id: 'e-tier2-behavior',
        source: 'tier-2-check',
        target: 'behavior-concern',
        label: 'Behavior Concern',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
    {
        id: 'e-tier3-behavior',
        source: 'tier-3-check',
        target: 'behavior-concern',
        label: 'Behavior Concern',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },

    // 504 students can also access behavior support (comprehensive)
    {
        id: 'e-504-behavior',
        source: '504-plan',
        target: 'behavior-concern',
        label: 'Behavior Support',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },

    // Triennial Reevaluation loop (Complex)
    {
        id: 'e-review-reeval',
        source: 'annual-review',
        target: 'evaluation',
        label: 'Triennial Reevaluation',
        type: 'smoothstep',
        style: { strokeDasharray: '5 5' },
        data: { scenario: 'complex' }
    },
];

// Color mapping for categories
export const categoryColors = {
    [NODE_CATEGORIES.RECOGNITION]: 'var(--color-recognition)',
    [NODE_CATEGORIES.MTSS]: 'var(--color-mtss)',
    [NODE_CATEGORIES.REFERRAL]: 'var(--color-referral)',
    [NODE_CATEGORIES.EVALUATION]: 'var(--color-evaluation)',
    [NODE_CATEGORIES.IEP]: 'var(--color-iep)',
    [NODE_CATEGORIES.PLAN_504]: 'var(--color-504)',
    [NODE_CATEGORIES.FBA_BIP]: 'var(--color-fba-bip)',
    [NODE_CATEGORIES.DECISION]: 'var(--color-decision)',
    [NODE_CATEGORIES.ENDPOINT]: 'var(--color-primary)',
    [NODE_CATEGORIES.PHASE_LABEL]: 'transparent',
};
