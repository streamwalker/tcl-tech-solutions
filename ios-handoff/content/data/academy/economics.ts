import type { Course } from "./types";

export const economics: Course = {
  slug: "principles-of-economics",
  title: "Principles of Economics",
  subtitle: "Microeconomics for Business Decision-Making",
  description:
    "An entry-level microeconomics course covering supply and demand, revenue concepts, costs of production, and market structures — everything you need for a college Econ 101 final.",
  icon: "📈",
  accent: "from-emerald-500 to-teal-700",
  sourceNotes: [
    { label: "Original notes — Econ & Revenue (PDF)", href: "/academy/source-notes/Business_School_Notes_002_ECON.pdf" },
    { label: "Original notes — Econ supplement (PDF)", href: "/academy/source-notes/Business_School_ECON_004.pdf" },
  ],
  chapters: [
    {
      slug: "ch1-supply-demand",
      number: 1,
      title: "Supply, Demand & Equilibrium",
      summary: "How prices are set in competitive markets.",
      built: true,
      lessons: [
        {
          slug: "law-of-demand",
          title: "The Law of Demand",
          widget: "supply-demand",
          body: `## The downward-sloping demand curve

The **law of demand** says: holding other things constant, when the price of a good rises, the quantity demanded falls. This produces a curve that slopes downward from upper-left to lower-right when graphed with **price on the vertical axis** and **quantity on the horizontal axis**.

Two reasons:

1. **Substitution effect** — at higher prices, consumers buy alternatives.
2. **Income effect** — a higher price reduces real purchasing power.

## Movement *along* vs. shift *of* the curve

- A change in **price** moves you *along* the same curve (a change in *quantity demanded*).
- A change in **anything else** (income, tastes, price of substitutes, expectations, number of buyers) **shifts** the entire curve (a change in *demand*).`,
        },
        {
          slug: "supply-equilibrium",
          title: "Supply & Market Equilibrium",
          body: `## The law of supply

Higher prices motivate producers to supply more — the supply curve slopes upward.

## Equilibrium

The market clears where supply equals demand: **equilibrium price** and **equilibrium quantity**. Above equilibrium price → surplus → downward pressure on price. Below → shortage → upward pressure.

## Shifters of supply

- Input prices
- Technology
- Number of sellers
- Expectations
- Taxes & subsidies`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "mcq",
          prompt: "When the price of a substitute good rises, the demand curve for the original good will…",
          choices: ["Shift left", "Shift right", "Stay the same", "Become vertical"],
          answer: "1",
          explanation: "If the substitute is more expensive, consumers shift to the original good — demand shifts right.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "A surplus exists when…",
          choices: [
            "Quantity demanded > quantity supplied",
            "Price is below equilibrium",
            "Quantity supplied > quantity demanded",
            "There are no buyers",
          ],
          answer: "2",
          explanation: "Surplus = excess supply, which happens when price sits above equilibrium.",
        },
      ],
    },
    {
      slug: "ch2-revenue-elasticity",
      number: 2,
      title: "Revenue & Elasticity",
      summary: "Total revenue, marginal revenue, and price elasticity.",
      built: true,
      lessons: [
        {
          slug: "tr-mr",
          title: "Total Revenue & Marginal Revenue",
          body: `## Total Revenue

\`\`\`
TR = Price per unit × Quantity sold
\`\`\`

## Marginal Revenue

The change in total revenue from selling one more unit:

\`\`\`
MR = ΔTR ÷ ΔQ
\`\`\`

### Example

If selling one more unit raises TR by **$65** and the unit increase ΔQ = 2 units, then **MR = 65 ÷ 2 = $32.50** per unit.

## Why MR matters

Profit-maximizing firms produce up to the point where **MR = MC** (marginal cost). Beyond that, the next unit costs more to make than it earns.`,
        },
        {
          slug: "elasticity",
          title: "Price Elasticity of Demand",
          body: `## Definition

\`\`\`
Ed = |% change in Quantity demanded ÷ % change in Price|
\`\`\`

| Ed value | Label                | Total revenue when price rises |
| -------- | -------------------- | ------------------------------ |
| > 1      | Elastic              | Falls                          |
| = 1      | Unit elastic         | Unchanged                      |
| < 1      | Inelastic            | Rises                          |

## Determinants

- Availability of substitutes (more substitutes → more elastic)
- Necessity vs. luxury (luxuries more elastic)
- Share of income spent on the good (bigger share → more elastic)
- Time horizon (longer → more elastic)`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "numeric",
          prompt: "Selling 4 more units raises TR by $200. MR = ?",
          answer: 50,
          tolerance: 0.1,
          explanation: "200 / 4 = $50 per unit.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "Demand for insulin is best described as…",
          choices: ["Highly elastic", "Highly inelastic", "Unit elastic", "Perfectly elastic"],
          answer: "1",
          explanation: "Insulin is a necessity with no good substitutes — demand is highly inelastic.",
        },
      ],
    },
    {
      slug: "ch3-costs-structures",
      number: 3,
      title: "Costs of Production & Market Structures",
      summary: "Fixed/variable costs, perfect competition, monopoly, oligopoly.",
      built: true,
      lessons: [
        {
          slug: "cost-structure",
          title: "Fixed, Variable, and Marginal Costs",
          body: `## Three cost categories

- **Fixed costs (FC)** — don't change with output (rent, salaries, insurance).
- **Variable costs (VC)** — scale with output (raw materials, hourly labor).
- **Total cost (TC)** = FC + VC.

## Marginal Cost

\`\`\`
MC = ΔTC ÷ ΔQ
\`\`\`

The cost of producing one additional unit. Profit is maximized where **MR = MC**.

## Average costs

- Average Fixed Cost = FC ÷ Q (always falling)
- Average Variable Cost = VC ÷ Q
- Average Total Cost = TC ÷ Q (typically U-shaped due to economies then diseconomies of scale)`,
        },
        {
          slug: "market-structures",
          title: "Four Market Structures",
          body: `| Structure              | # of firms     | Product            | Price control     | Example               |
| ---------------------- | -------------- | ------------------ | ----------------- | --------------------- |
| Perfect competition    | Many           | Identical          | None (price-taker)| Wheat, corn           |
| Monopolistic competition| Many          | Differentiated     | Some              | Restaurants, salons   |
| Oligopoly              | Few            | Identical/diff.    | Significant       | Airlines, smartphones |
| Monopoly               | One            | Unique             | Substantial       | Local utility         |

## Key takeaway

The fewer the competitors and the more differentiated the product, the more **pricing power** the firm has — and the further price can deviate from marginal cost.`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Rent on a factory is which type of cost?",
          choices: ["Variable", "Fixed", "Marginal", "Opportunity"],
          answer: "1",
          explanation: "Rent doesn't change with output — it's a fixed cost.",
        },
        {
          id: "q2",
          type: "mcq",
          prompt: "A profit-maximizing firm produces where…",
          choices: ["MR > MC", "MR = MC", "MR < MC", "TR is largest"],
          answer: "1",
          explanation: "MR = MC is the profit-maximizing rule.",
        },
      ],
    },
    ...placeholder("ch4-macro-intro", 4, "Macroeconomics Intro"),
    ...placeholder("ch5-gdp-inflation", 5, "GDP & Inflation"),
    ...placeholder("ch6-monetary", 6, "Monetary Policy"),
    ...placeholder("ch7-fiscal", 7, "Fiscal Policy"),
    ...placeholder("ch8-trade", 8, "International Trade"),
  ],
  finalExam: [
    {
      id: "fe1",
      type: "mcq",
      prompt: "When a substitute's price falls, the demand curve for the original good…",
      choices: ["Shifts right", "Shifts left", "Stays put", "Becomes flat"],
      answer: "1",
      explanation: "Cheaper substitute pulls buyers away — demand for the original shifts left.",
    },
    {
      id: "fe2",
      type: "numeric",
      prompt: "Selling 5 more units raises TR by $125. MR = ?",
      answer: 25,
      tolerance: 0.1,
      explanation: "125 / 5 = $25.",
    },
    {
      id: "fe3",
      type: "mcq",
      prompt: "Which structure has the most pricing power?",
      choices: ["Perfect competition", "Monopolistic competition", "Oligopoly", "Monopoly"],
      answer: "3",
      explanation: "A monopoly faces no direct competition.",
    },
    {
      id: "fe4",
      type: "mcq",
      prompt: "If Ed > 1, raising price will cause TR to…",
      choices: ["Rise", "Fall", "Stay the same", "Become zero"],
      answer: "1",
      explanation: "Elastic demand: % drop in Q exceeds % rise in P, so revenue falls.",
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