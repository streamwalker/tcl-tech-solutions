import type { Course } from "./types";

export const management: Course = {
  slug: "business-management",
  title: "Business Management",
  subtitle: "Foundations, Quantitative Tools & Decision-Making",
  description:
    "An entry-level college business management course: management functions, quantitative tools managers actually use, and how to make decisions under risk.",
  icon: "🏢",
  accent: "from-rose-500 to-red-700",
  sourceNotes: [
    { label: "Original notes — Simple Interest (PDF)", href: "/academy/source-notes/Business_School_Notes_003_Simple_Interest.pdf" },
    { label: "Original notes — Probability (PDF)", href: "/academy/source-notes/Business_School_Notes_003_Probability.pdf" },
  ],
  chapters: [
    {
      slug: "ch1-foundations",
      number: 1,
      title: "Foundations of Management",
      summary: "The four functions of management and SWOT analysis.",
      built: true,
      lessons: [
        {
          slug: "four-functions",
          title: "Planning, Organizing, Leading, Controlling",
          body: `## The four functions of management

Every manager — from a shift lead to a Fortune 500 CEO — performs four core functions:

1. **Planning** — setting goals and the strategy to reach them.
2. **Organizing** — structuring people, work, and resources to execute the plan.
3. **Leading** — motivating and directing people.
4. **Controlling** — monitoring performance and correcting deviations.

These are *cyclical*, not linear. Controlling feeds new information back into planning.

## Levels of management

- **Top managers** (CEO, CFO) — set strategic direction.
- **Middle managers** (department heads) — translate strategy into tactics.
- **First-line managers** (supervisors) — direct day-to-day work.

## Mintzberg's roles

Managers wear three families of hats: **interpersonal** (figurehead, leader, liaison), **informational** (monitor, disseminator, spokesperson), and **decisional** (entrepreneur, disturbance handler, resource allocator, negotiator).`,
        },
        {
          slug: "swot",
          title: "SWOT Analysis",
          body: `## The SWOT framework

|                | Helpful       | Harmful       |
| -------------- | ------------- | ------------- |
| **Internal**   | Strengths     | Weaknesses    |
| **External**   | Opportunities | Threats       |

- **Strengths** are internal capabilities the firm controls.
- **Weaknesses** are internal limitations.
- **Opportunities** are favorable external trends.
- **Threats** are unfavorable external forces.

## How to use it

SWOT isn't a list — it's a **strategy generator**. Pair quadrants:

- **S × O** → leverage strengths to capture opportunities (offensive moves).
- **W × O** → fix weaknesses to access opportunities.
- **S × T** → use strengths to defend against threats.
- **W × T** → mitigate or exit.`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Which is NOT one of the four functions of management?",
          choices: ["Planning", "Organizing", "Auditing", "Controlling"],
          answer: "2",
          explanation: "The four functions are planning, organizing, leading, and controlling.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "In SWOT, 'opportunities' are…",
          choices: ["Internal capabilities", "External favorable trends", "Internal weaknesses", "Competitor moves"],
          answer: "1",
          explanation: "Opportunities are external favorable factors.",
        },
      ],
    },
    {
      slug: "ch2-quantitative-tools",
      number: 2,
      title: "Quantitative Tools for Managers",
      summary: "Simple interest, break-even, and basic algebraic problem-solving.",
      built: true,
      lessons: [
        {
          slug: "simple-interest",
          title: "The Simple Interest Formula",
          widget: "simple-interest",
          body: `## The future-value formula

\`\`\`
A = P(1 + rt)
\`\`\`

- **A** = future value (amount)
- **P** = principal
- **r** = annual interest rate as a *decimal* (15% → 0.15)
- **t** = time in *years*

## Worked example — solve for time

How long does it take **$550** at **15%** simple interest to grow to **$715**?

\`\`\`
715 = 550(1 + 0.15t)
715 = 550 + 82.5t
165 = 82.5t
  t = 2 years
\`\`\`

## Solving for the rate

\`\`\`
I = Prt   →   r = I ÷ (P × t)
\`\`\`

Always convert days to years (e.g., 90 days = 90 ÷ 360 in banker's year, or 90 ÷ 365 in exact year).`,
        },
        {
          slug: "break-even",
          title: "Break-Even Algebra",
          widget: "break-even",
          body: `## The break-even point

Break-even is where **revenue = cost**:

\`\`\`
Cost(x)    = (variable cost per unit) × x + fixed costs
Revenue(x) = (price per unit) × x
\`\`\`

Set them equal and solve for x.

## Worked example — CDs

- Cost: C(x) = 6.20x + 24,000
- Revenue: R(x) = 8.70x

\`\`\`
8.70x = 6.20x + 24,000
2.50x = 24,000
    x = 9,600 CDs to break even
\`\`\`

## Worked example — golf clubs

Renting clubs costs **$52 per round**. Buying clubs costs **$272** plus **$44/round** of greens fee.

\`\`\`
52x = 272 + 44x
 8x = 272
  x = 34 rounds — buy after 34 rounds
\`\`\``,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "numeric",
          prompt: "P = $1,000, r = 8%, t = 3 years. Future value A = ?",
          answer: 1240,
          tolerance: 1,
          explanation: "1000 × (1 + 0.08 × 3) = 1000 × 1.24 = 1,240.",
        },
        {
          id: "q2",
          type: "numeric",
          prompt: "Fixed cost $40,000; variable $80/unit; price $100/unit. Break-even units = ?",
          answer: 2000,
          tolerance: 1,
          explanation: "Contribution margin = 100 − 80 = 20. 40,000 / 20 = 2,000.",
        },
      ],
    },
    {
      slug: "ch3-decision-risk",
      number: 3,
      title: "Decision Making & Risk",
      summary: "Probability, expected value, and decision trees.",
      built: true,
      lessons: [
        {
          slug: "probability-basics",
          title: "Probability Basics",
          body: `## Definition

Probability is a number between **0 and 1** that expresses how likely an outcome is.

\`\`\`
P(event) = (favorable outcomes) ÷ (total possible outcomes)
\`\`\`

## Rules

- **Complement:** P(not A) = 1 − P(A)
- **Addition (mutually exclusive):** P(A or B) = P(A) + P(B)
- **Multiplication (independent):** P(A and B) = P(A) × P(B)

### Example — coin & die

P(heads on coin AND a 6 on a die) = 0.5 × (1/6) = **1/12 ≈ 8.3%**.`,
        },
        {
          slug: "expected-value",
          title: "Expected Value & Decision Trees",
          body: `## Expected Value

\`\`\`
EV = Σ (probability of outcome × payoff of outcome)
\`\`\`

### Example — launch decision

- 60% chance product earns $200,000
- 40% chance it loses $50,000

\`\`\`
EV = 0.60 × 200,000 + 0.40 × (−50,000)
   = 120,000 − 20,000
   = $100,000
\`\`\`

A risk-neutral manager launches if EV > 0.

## Decision trees

Branches represent decisions (squares) and chance events (circles). Compute EV at each chance node, working *right to left*, then choose the decision branch with the highest EV. Trees force you to surface assumptions instead of guessing.`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "numeric",
          prompt: "70% chance of +$10,000; 30% chance of −$5,000. EV = ?",
          answer: 5500,
          tolerance: 1,
          explanation: "0.70 × 10,000 + 0.30 × (−5,000) = 7,000 − 1,500 = 5,500.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "P(A) = 0.4, P(B) = 0.5, independent. P(A and B) = ?",
          choices: ["0.9", "0.2", "0.45", "0.1"],
          answer: "1",
          explanation: "Independent events: multiply. 0.4 × 0.5 = 0.20.",
        },
      ],
    },
    ...placeholder("ch4-org-behavior", 4, "Organizational Behavior"),
    ...placeholder("ch5-hr", 5, "HR Fundamentals"),
    ...placeholder("ch6-operations", 6, "Operations Management"),
    ...placeholder("ch7-marketing", 7, "Marketing Basics"),
    ...placeholder("ch8-strategy", 8, "Strategic Management"),
  ],
  finalExam: [
    {
      id: "fe1",
      type: "mcq",
      prompt: "Which is NOT one of the four functions of management?",
      choices: ["Planning", "Organizing", "Leading", "Outsourcing"],
      answer: "3",
      explanation: "The four are planning, organizing, leading, controlling.",
    },
    {
      id: "fe2",
      type: "numeric",
      prompt: "P = $2,000, r = 6%, t = 4 years. Future value A = ?",
      answer: 2480,
      tolerance: 1,
      explanation: "2000 × (1 + 0.06 × 4) = 2000 × 1.24 = 2,480.",
    },
    {
      id: "fe3",
      type: "numeric",
      prompt: "Fixed cost $30,000; CM per unit $15. Break-even units = ?",
      answer: 2000,
      tolerance: 1,
      explanation: "30,000 / 15 = 2,000 units.",
    },
    {
      id: "fe4",
      type: "numeric",
      prompt: "50% chance of +$20k; 50% chance of −$8k. EV = ?",
      answer: 6000,
      tolerance: 1,
      explanation: "0.5 × 20,000 + 0.5 × (−8,000) = 10,000 − 4,000 = 6,000.",
    },
  ],
};

function placeholder(slug: string, number: number, title: string) {
  return [
    {
      slug,
      number,
      title,
      summary: "Coming soon — full chapter in development.",
      built: false,
      lessons: [],
      quiz: [],
    },
  ];
}