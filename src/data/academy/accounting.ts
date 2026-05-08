import type { Course } from "./types";

export const accounting: Course = {
  slug: "accounting-i",
  title: "Accounting I",
  subtitle: "Financial & Managerial Accounting Fundamentals",
  description:
    "An entry-level college accounting course covering financial statement analysis, ratio analysis, and managerial performance measurement — the foundation for any business degree.",
  icon: "📒",
  accent: "from-amber-500 to-yellow-700",
  sourceNotes: [
    { label: "Original notes — Performance Measurement (PDF)", href: "/academy/source-notes/Business_School_Notes_001.pdf" },
    { label: "Original notes — Financial Analysis & Ratios (PDF)", href: "/academy/source-notes/Business_School_Notes_002_ECON.pdf" },
  ],
  chapters: [
    {
      slug: "ch1-statement-analysis",
      number: 1,
      title: "Financial Statement Analysis",
      summary: "Vertical, horizontal, common-size, and trend analysis techniques.",
      built: true,
      lessons: [
        {
          slug: "vertical-horizontal",
          title: "Vertical vs. Horizontal Analysis",
          keyTerms: [],
          body: `## The two lenses on financial statements

Every financial statement can be read two ways:

**Vertical analysis** focuses on relationships *among accounts at a single point in time*. Each line is expressed as a percentage of a base figure — for the income statement, the base is **Sales**; for the balance sheet, the base is **Total Assets**. The result is a **common-sized statement**.

**Horizontal analysis** examines *changes over time* between years, expressed in both dollars and percentages.

## Calculating change

The dollar change is straightforward:

\`\`\`
Dollar change = Current year figure - Base year figure
\`\`\`

The percent change is:

\`\`\`
% change = (Dollar change ÷ Base year figure) × 100%
\`\`\`

### Worked example

If sales were **$23,500** last year and **$12,000** this year:

- Dollar change = 12,000 − 23,500 = **−$11,500**
- % change = −11,500 ÷ 23,500 × 100% = **−48.9%**

A nearly 50% drop is a five-alarm fire — the kind of signal vertical analysis alone would miss because it only photographs a single year.`,
        },
        {
          slug: "common-size-trend",
          title: "Common-Size & Trend Analysis",
          body: `## Common-size income statement

Restating each line item as a percentage of sales lets you compare companies of vastly different sizes — or compare one company to itself across years.

## Trend analysis

Trend analysis selects a base year and expresses every subsequent year as a percentage of that base:

\`\`\`
Trend % = (Current year amount ÷ Base year amount) × 100%
\`\`\`

### Multi-year example (sales)

| Year | Amount    | Trend %                       |
| ---- | --------- | ----------------------------- |
| 1    | 1,800,000 | 100%                          |
| 2    | 1,980,000 | 1,980 ÷ 1,800 = **110%**      |
| 3    | 2,070,000 | 2,070 ÷ 1,800 = **115%**      |
| 4    | 2,160,000 | 2,160 ÷ 1,800 = **120%**      |

A clean upward trend like this tells investors the company is growing roughly 5 percentage points per year off its base.`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "mcq",
          prompt: "Vertical analysis is best described as…",
          choices: [
            "Comparing this year's numbers to last year's",
            "Expressing each line as a % of a base figure on the same statement",
            "Forecasting future cash flows",
            "Reconciling cash to the bank statement",
          ],
          answer: "1",
          explanation: "Vertical analysis is a single-period snapshot expressing each line as a percentage of a base (sales for income; total assets for balance sheet).",
        },
        {
          id: "q2",
          type: "numeric",
          prompt: "Sales rose from $200,000 to $260,000. What is the % change? (enter as a number, e.g. 30 for 30%)",
          answer: 30,
          tolerance: 0.5,
          explanation: "(260,000 − 200,000) / 200,000 = 0.30 = 30%.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "On a common-size income statement, the base figure is:",
          choices: ["Net Income", "Total Assets", "Sales", "Equity"],
          answer: "2",
          explanation: "Income statement common-sizing uses Sales as the base.",
        },
      ],
    },
    {
      slug: "ch2-ratio-analysis",
      number: 2,
      title: "Ratio Analysis",
      summary: "Liquidity, activity, profitability, and market ratios.",
      built: true,
      lessons: [
        {
          slug: "activity-ratios",
          title: "Activity Ratios — Turning Assets Over",
          widget: "ratio",
          body: `## Accounts Receivable Turnover

How efficiently the firm collects cash:

\`\`\`
AR Turnover = Sales on Account ÷ Average Accounts Receivable
Average Collection Period = 365 ÷ AR Turnover
\`\`\`

### Example

Sales on account = **$79,000**, beginning AR = $12,300, ending AR = $9,100.

- Average AR = (12,300 + 9,100) ÷ 2 = **10,700**
- AR Turnover = 79,000 ÷ 10,700 = **7.38 times**
- Average Collection Period = 365 ÷ 7.38 = **49.5 days**

## Inventory Turnover

\`\`\`
Inventory Turnover = Cost of Goods Sold ÷ Average Inventory
Average Sale Period = 365 ÷ Inventory Turnover
\`\`\`

With COGS = 52,000 and average inventory = 10,700:
- Turnover = 52,000 ÷ 10,700 = **4.86**
- Average sale period = 365 ÷ 4.86 = **75.1 days**

## Operating Cycle

\`\`\`
Operating Cycle = Average Sale Period + Average Collection Period
              = 75.1 + 49.5 = 124.6 days
\`\`\`

The operating cycle is the *time between investing in inventory and collecting cash from selling it*.`,
        },
        {
          slug: "profitability-market",
          title: "Profitability & Market Ratios",
          body: `## Return on Equity (DuPont decomposition)

\`\`\`
ROE = (NI ÷ Sales) × (Sales ÷ Avg Total Assets) × (Avg Total Assets ÷ Avg Equity)
\`\`\`

Three drivers: **margin × turnover × leverage**.

## Return on Total Assets

\`\`\`
ROA = [Net Income + Interest × (1 − Tax Rate)] ÷ Average Total Assets
\`\`\`

Adding back after-tax interest gives a true measure of asset productivity regardless of how the assets were financed.

## Market ratios

| Ratio            | Formula                                          |
| ---------------- | ------------------------------------------------ |
| EPS              | Net Income ÷ Avg Common Shares Outstanding       |
| Price / Earnings | Market Price per Share ÷ EPS                     |
| Dividend Payout  | Dividends per Share ÷ EPS                        |
| Dividend Yield   | Dividends per Share ÷ Market Price per Share     |
| Book Value/Share | Common Equity ÷ Common Shares Outstanding        |

These let investors compare a company's price-to-earnings against peers without dollar amounts confusing the picture.`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "numeric",
          prompt: "Sales on account $120,000; average AR $15,000. AR turnover = ?",
          answer: 8,
          tolerance: 0.1,
          explanation: "120,000 / 15,000 = 8 times.",
        },
        {
          id: "q2",
          type: "numeric",
          prompt: "Inventory turnover is 5. Average sale period in days = ?",
          answer: 73,
          tolerance: 1,
          explanation: "365 / 5 = 73 days.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which ROE driver does NOT appear in the DuPont equation?",
          choices: ["Net profit margin", "Asset turnover", "Equity multiplier", "Current ratio"],
          answer: "3",
          explanation: "DuPont = margin × turnover × leverage (equity multiplier). The current ratio is a liquidity measure.",
        },
      ],
    },
    {
      slug: "ch3-performance-measurement",
      number: 3,
      title: "Performance Measurement",
      summary: "ROI, Residual Income, MCE, and the Balanced Scorecard.",
      built: true,
      lessons: [
        {
          slug: "roi-residual",
          title: "ROI & Residual Income",
          widget: "roi",
          body: `## Return on Investment

\`\`\`
ROI = Margin × Turnover
    = (Net Operating Income ÷ Sales) × (Sales ÷ Avg Operating Assets)
    = NOI ÷ AOA
\`\`\`

### Example

- NOI = 10,000; Sales = 100,000; AOA = 50,000
- Margin = 10,000 ÷ 100,000 = **10%**
- Turnover = 100,000 ÷ 50,000 = **2.0**
- ROI = 10% × 2 = **20%**

## Residual Income

The dollars of profit *above* a minimum required return on assets:

\`\`\`
Residual Income = NOI − (AOA × Minimum Required Rate of Return)
\`\`\`

### Worked example

- NOI = 24,000; AOA = 200,000; Min rate = 10%
- 24,000 − (200,000 × 10%) = 24,000 − 20,000 = **$4,000 RI**

## Why both?

A manager evaluated on **ROI alone** may *reject* a profitable investment that would lower their average ROI but add positive residual income. A manager on **RI** accepts any project earning above the minimum rate. RI aligns the division with the firm.`,
        },
        {
          slug: "mce-throughput",
          title: "Throughput Time, MCE, & Balanced Scorecard",
          body: `## Throughput (Manufacturing Cycle) Time

\`\`\`
Throughput Time = Process + Inspection + Move + Queue
\`\`\`

Only **process time** adds value. The rest is waste.

## Manufacturing Cycle Efficiency

\`\`\`
MCE = Process Time ÷ Throughput Time
\`\`\`

An MCE of 40% means value-added activities only happen 40% of the time the order is in production. The other 60% is queue, move, and inspection.

## Delivery Cycle Time

\`\`\`
Delivery Cycle Time = Wait Time + Throughput Time
\`\`\`

Example: 17.0 wait days + 8.0 throughput days = **25.0 days** total.

## Balanced Scorecard

An integrated set of performance measures derived from strategy. Top managers translate strategy into measures that lower-level employees can understand and influence — across **financial, customer, internal process, and learning & growth** perspectives. Properly built, the measures are linked on a cause-and-effect basis: a learning improvement enables a process improvement, which improves customer outcomes, which improves financials.`,
        },
      ],
      quiz: [
        {
          id: "q1",
          type: "numeric",
          prompt: "NOI = 540,000; AOA = 3,000,000. ROI as a percent (e.g. 18 for 18%) = ?",
          answer: 18,
          tolerance: 0.1,
          explanation: "540,000 / 3,000,000 = 0.18 = 18%.",
        },
        {
          id: "q2",
          type: "numeric",
          prompt: "NOI = 42,000; AOA = 300,000; min required return = 12%. Residual Income $ = ?",
          answer: 6000,
          tolerance: 1,
          explanation: "42,000 − (300,000 × 0.12) = 42,000 − 36,000 = 6,000.",
        },
        {
          id: "q3",
          type: "mcq",
          prompt: "Which time component adds value to the product?",
          choices: ["Queue", "Move", "Process", "Inspection"],
          answer: "2",
          explanation: "Only process time adds value. The rest is non-value-added waste.",
        },
      ],
    },
    ...placeholder("ch4-cvp", 4, "CVP & Break-Even"),
    ...placeholder("ch5-budgeting", 5, "Master Budgeting"),
    ...placeholder("ch6-standard-costs", 6, "Standard Costs & Variances"),
    ...placeholder("ch7-job-costing", 7, "Job-Order Costing"),
    ...placeholder("ch8-capital-budgeting", 8, "Capital Budgeting"),
  ],
  finalExam: [
    {
      id: "fe1",
      type: "numeric",
      prompt: "NOI = 280,000; AOA = 2,000,000. ROI % = ?",
      answer: 14,
      tolerance: 0.1,
      explanation: "280k / 2M = 14%.",
    },
    {
      id: "fe2",
      type: "numeric",
      prompt: "AR turnover = 7.3. Average collection period (days) = ?",
      answer: 50,
      tolerance: 1,
      explanation: "365 / 7.3 ≈ 50 days.",
    },
    {
      id: "fe3",
      type: "mcq",
      prompt: "Residual income equals…",
      choices: [
        "NOI ÷ AOA",
        "NOI − (AOA × min rate)",
        "Sales ÷ AOA",
        "Margin × Turnover",
      ],
      answer: "1",
      explanation: "RI = NOI minus the dollar minimum required return.",
    },
    {
      id: "fe4",
      type: "mcq",
      prompt: "An MCE of 25% means non-value-added activities consume what share of production time?",
      choices: ["25%", "50%", "75%", "100%"],
      answer: "2",
      explanation: "100% − 25% = 75% non-value-added.",
    },
    {
      id: "fe5",
      type: "mcq",
      prompt: "Trend analysis is most useful for…",
      choices: [
        "Comparing two competitors at one point in time",
        "Spotting multi-year directional change",
        "Auditing the bank reconciliation",
        "Computing depreciation",
      ],
      answer: "1",
      explanation: "Trend analysis tracks one company across multiple periods.",
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