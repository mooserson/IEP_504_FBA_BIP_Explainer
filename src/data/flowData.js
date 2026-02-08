/**
 * Flowchart Data - Special Education Intervention Process
 * 
 * This defines the nodes and edges for the interactive flowchart.
 * Each node has content for 3 zoom levels:
 * - minimal: Just the title (for zoomed out view)
 * - summary: Title + key info
 * - detailed: Full description with timelines, personnel, legal refs
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
        id: 'phase-recognition',
        type: 'phaseLabelNode',
        position: { x: -200, y: -20 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '1. RECOGNITION',
            description: 'Student concern identified',
        },
    },
    {
        id: 'phase-mtss',
        type: 'phaseLabelNode',
        position: { x: -200, y: 280 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '2. MTSS / RTI',
            description: 'Multi-Tiered System of Supports',
        },
    },
    {
        id: 'phase-referral',
        type: 'phaseLabelNode',
        position: { x: -200, y: 1050 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '3. REFERRAL',
            description: 'Formal evaluation request',
        },
    },
    {
        id: 'phase-evaluation',
        type: 'phaseLabelNode',
        position: { x: -200, y: 1550 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '4. EVALUATION',
            description: '60-day comprehensive assessment',
        },
    },
    {
        id: 'phase-eligibility',
        type: 'phaseLabelNode',
        position: { x: -200, y: 1950 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '5. ELIGIBILITY',
            description: 'Determine services pathway',
        },
    },
    {
        id: 'phase-iep',
        type: 'phaseLabelNode',
        position: { x: -300, y: 2500 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '6A. IEP PATHWAY',
            description: 'Individualized Education Program',
        },
    },
    {
        id: 'phase-504',
        type: 'phaseLabelNode',
        position: { x: 1450, y: 2500 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '6B. 504 PLAN',
            description: 'Section 504 Accommodations',
        },
    },
    {
        id: 'phase-fba-bip',
        type: 'phaseLabelNode',
        position: { x: -300, y: 2950 },
        data: {
            category: NODE_CATEGORIES.PHASE_LABEL,
            label: '6C. FBA / BIP',
            description: 'Behavior Assessment & Intervention',
        },
    },
];

// Initial nodes for the flowchart - INCREASED SPACING
export const initialNodes = [
    // Phase labels
    ...phaseLabels,

    // ===== RECOGNITION PHASE =====
    {
        id: 'concern-identified',
        type: 'processNode',
        position: { x: 400, y: 0 },
        data: {
            category: NODE_CATEGORIES.RECOGNITION,
            label: 'Concern Identified',
            summary: 'Teacher, parent, or data identifies a student need',
            detail: `A student is flagged when they display academic, behavioral, social, or emotional 
concerns that differ significantly from their peers.

**Who Can Identify:**
• Teachers (classroom observations)
• Parents/Guardians (home concerns)
• Screening data (universal assessments)
• Other school personnel

**Common Indicators:**
• Academic struggles despite classroom support
• Behavioral patterns affecting learning
• Social/emotional difficulties
• Attendance or engagement issues`,
        },
    },

    // ===== MTSS TIER 1 =====
    {
        id: 'tier-1',
        type: 'processNode',
        position: { x: 400, y: 200 },
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

**Expected Outcome:**
~80-85% of students will succeed with Tier 1 alone.`,
        },
    },

    {
        id: 'tier-1-check',
        type: 'decisionNode',
        position: { x: 400, y: 420 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'Adequate Progress?',
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
        position: { x: 800, y: 420 },
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
        position: { x: 800, y: 640 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'Adequate Progress?',
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
        position: { x: 1200, y: 640 },
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
        position: { x: 1200, y: 860 },
        data: {
            category: NODE_CATEGORIES.DECISION,
            label: 'Adequate Progress?',
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
        position: { x: 800, y: 1000 },
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
        position: { x: 800, y: 1220 },
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

    // ===== EVALUATION =====
    {
        id: 'evaluation',
        type: 'processNode',
        position: { x: 800, y: 1500 },
        data: {
            category: NODE_CATEGORIES.EVALUATION,
            label: 'Comprehensive Evaluation',
            summary: '60 school days to complete full evaluation',
            detail: `A **comprehensive evaluation** assesses all areas of suspected disability.

**Timeline:** 60 school days from receipt of consent to complete evaluation AND hold eligibility meeting.
(Note: If <60 days left in school year, must be done by first day of next year)

**Assessment Areas:**
• Cognitive/intellectual functioning
• Academic achievement
• Social/emotional/behavioral
• Communication
• Motor skills
• Health & developmental history

**Key Requirements:**
• Use variety of assessment tools
• No single measure determines eligibility
• Assess in all areas of suspected disability
• Conducted by qualified professionals
• Non-discriminatory procedures

**Team Members May Include:**
• School psychologist
• Special education teacher
• General education teacher
• Speech-language pathologist
• Social worker
• Other specialists as needed`,
        },
    },

    // ===== ELIGIBILITY =====
    {
        id: 'eligibility-meeting',
        type: 'processNode',
        position: { x: 800, y: 1780 },
        data: {
            category: NODE_CATEGORIES.EVALUATION,
            label: 'Eligibility Determination',
            summary: 'Team reviews data to determine eligibility',
            detail: `The team meets to determine if the student is **eligible for special education**.

**IDEA Eligibility Requires BOTH:**
1. Student has one of 13 disability categories
2. Disability adversely affects educational performance
3. Student needs specially designed instruction

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
Consider 504 Plan eligibility`,
        },
    },

    {
        id: 'eligibility-decision',
        type: 'decisionNode',
        position: { x: 800, y: 2050 },
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
        position: { x: 400, y: 2300 },
        data: {
            category: NODE_CATEGORIES.IEP,
            label: 'IEP Development',
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
        position: { x: 200, y: 2550 },
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
        position: { x: -100, y: 2800 },
        data: {
            category: NODE_CATEGORIES.FBA_BIP,
            label: 'Functional Behavior Assessment',
            summary: 'Systematic analysis of behavior function',
            detail: `An **FBA** identifies WHY a behavior is occurring.

**Purpose:**
Understand the function of behavior to develop effective interventions

**Key Questions:**
• What is the specific behavior?
• When/where does it occur?
• What triggers the behavior?
• What maintains the behavior?

**Data Collection Methods:**
• Direct observation
• Interviews (teacher, parent, student)
• Review of records
• ABC data (Antecedent-Behavior-Consequence)
• Functional Analysis (sometimes)

**Functions of Behavior (SEAT):**
• Sensory/Automatic
• Escape/Avoidance
• Attention
• Tangible`,
        },
    },

    {
        id: 'bip',
        type: 'processNode',
        position: { x: -100, y: 3100 },
        data: {
            category: NODE_CATEGORIES.FBA_BIP,
            label: 'Behavior Intervention Plan',
            summary: 'Written plan to address behavior based on FBA',
            detail: `A **BIP** is developed based on FBA findings to reduce challenging behaviors 
and teach replacement skills.

**BIP Components:**
• Target behavior defined
• Hypothesis statement (function)
• Prevention strategies
• Teaching replacement behaviors
• Response strategies
• Data collection plan
• Crisis plan (if needed)

**Key Principles:**
• Based on FBA data
• Positive, not punitive
• Teach "replacement" behaviors
• Function-based interventions

**Implementation:**
• All staff trained
• Consistent implementation
• Regular data review
• Adjust as needed`,
        },
    },

    {
        id: 'iep-implementation',
        type: 'processNode',
        position: { x: 400, y: 3000 },
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
        position: { x: 400, y: 3280 },
        data: {
            category: NODE_CATEGORIES.IEP,
            label: 'Annual Review',
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
        position: { x: 1200, y: 2300 },
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
        position: { x: 1200, y: 2580 },
        data: {
            category: NODE_CATEGORIES.PLAN_504,
            label: '504 Plan Development',
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
        position: { x: 1200, y: 2860 },
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
        position: { x: 50, y: 420 },
        data: {
            category: NODE_CATEGORIES.ENDPOINT,
            label: 'Continue General Ed',
            summary: 'Student successful with universal supports',
            detail: `Student continues in general education with Tier 1 supports.
Progress monitoring continues to ensure ongoing success.`,
        },
    },
];

// Edge definitions connecting the nodes
// Solid lines = forward progression
// Dashed lines = return paths (going back to earlier steps)
export const initialEdges = [
    // Recognition to MTSS - initial flow
    { id: 'e-concern-tier1', source: 'concern-identified', target: 'tier-1', animated: true, label: 'Enter MTSS' },

    // Tier 1 flow
    { id: 'e-tier1-check', source: 'tier-1', target: 'tier-1-check' },
    { id: 'e-tier1-success', source: 'tier-1-check', target: 'gen-ed-success', label: 'Yes - Success', type: 'smoothstep' },
    { id: 'e-tier1-tier2', source: 'tier-1-check', target: 'tier-2', label: 'No - More Support' },

    // Tier 2 flow
    { id: 'e-tier2-check', source: 'tier-2', target: 'tier-2-check' },
    { id: 'e-tier2-tier3', source: 'tier-2-check', target: 'tier-3', label: 'No - Intensify' },

    // Tier 3 flow
    { id: 'e-tier3-check', source: 'tier-3', target: 'tier-3-check' },
    { id: 'e-tier3-referral', source: 'tier-3-check', target: 'referral', label: 'Evaluate for Services' },

    // Referral flow
    { id: 'e-referral-consent', source: 'referral', target: 'consent', label: 'Request Consent' },
    { id: 'e-consent-eval', source: 'consent', target: 'evaluation', label: 'Begin Evaluation' },

    // Evaluation flow
    { id: 'e-eval-eligibility', source: 'evaluation', target: 'eligibility-meeting', label: 'Complete Assessment' },
    { id: 'e-eligibility-decision', source: 'eligibility-meeting', target: 'eligibility-decision' },

    // Eligibility decisions
    { id: 'e-eligible-iep', source: 'eligibility-decision', target: 'iep-development', label: 'IEP Eligible', type: 'smoothstep' },
    { id: 'e-eligible-504', source: 'eligibility-decision', target: '504-eligibility', label: '504 Eligible', type: 'smoothstep' },

    // IEP flow
    { id: 'e-iep-behavior', source: 'iep-development', target: 'behavior-concern', label: 'Assess Behavior' },
    { id: 'e-behavior-fba', source: 'behavior-concern', target: 'fba', label: 'Yes - Conduct FBA' },
    { id: 'e-behavior-no', source: 'behavior-concern', target: 'iep-implementation', label: 'No - Proceed' },
    { id: 'e-fba-bip', source: 'fba', target: 'bip', label: 'Develop BIP' },
    { id: 'e-bip-iep', source: 'bip', target: 'iep-implementation', label: 'Include in IEP' },
    { id: 'e-iep-review', source: 'iep-implementation', target: 'annual-review', label: 'Monitor Progress' },
    { id: 'e-review-iep', source: 'annual-review', target: 'iep-development', type: 'smoothstep', style: { strokeDasharray: '5 5' }, label: 'Annual Review' },

    // 504 flow
    { id: 'e-504-elig-plan', source: '504-eligibility', target: '504-plan', label: 'Develop Plan' },
    { id: 'e-504-plan-impl', source: '504-plan', target: '504-implementation', label: 'Implement' },
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
