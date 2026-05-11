import type { Course } from "./types";

export const accounting: Course = {
  slug: "accounting-i",
  title: "Accounting I",
  subtitle: "Financial & Managerial Accounting Fundamentals",
  description:
    "An entry-level college accounting course built for business owners and operators. Covers why accounting matters, the four financial statements, the balance sheet equation, double-entry bookkeeping, accrual accounting, cash flow, ratio analysis, and managerial performance measurement.",
  icon: "📒",
  accent: "from-amber-500 to-yellow-700",
  sourceNotes: [
    { label: "Original notes — Performance Measurement (PDF)", href: "/academy/source-notes/Business_School_Notes_001.pdf" },
    { label: "Original notes — Financial Analysis & Ratios (PDF)", href: "/academy/source-notes/Business_School_Notes_002_ECON.pdf" },
    { label: "Reference — Wharton 'Introduction to Financial Accounting' (Coursera)", href: "https://www.coursera.org/learn/wharton-accounting" },
  ],
  chapters: [
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch1-why-accounting",
      number: 1,
      title: "Why Accounting Matters & the Reporting Ecosystem",
      summary: "Why every business owner needs accounting, financial vs. managerial, GAAP/SEC/FASB, and the four financial statements at a glance.",
      built: true,
      lessons: [
        {
          slug: "why-business-owners-need-accounting",
          title: "Why Every Business Owner Needs Accounting",
          body: `## You can't manage what you can't measure

Every founder eventually meets the same painful surprise: the bank account looks healthy on Friday, payroll runs Monday, a vendor invoice clears Tuesday, and suddenly the business is "profitable" but cash-poor. Accounting exists to keep that surprise from killing your company.

**Accounting is the language of business.** It is how you translate every job, every invoice, every payroll run, every loan, and every piece of equipment into numbers that can be compared, analyzed, and acted on. Without it you are flying a plane with no instruments — you can feel altitude and bank, but you cannot tell anyone else where you are, and you cannot prove to a lender, an investor, or the IRS that the plane is real.

## What an accountant actually does

There are three distinct professionals you will hear about. They are not the same.

| Role | Typical work | When you hire them |
| ---- | ------------ | ------------------ |
| **Bookkeeper** | Records day-to-day transactions, reconciles bank/credit-card accounts, runs payroll, sends invoices. | From day one — even part-time. |
| **Accountant / CPA** | Closes the books monthly, prepares financial statements, files tax returns, advises on entity structure, represents you in audits. | Once you have revenue, employees, or outside money. |
| **Fractional CFO** | Builds budgets and forecasts, designs KPIs, evaluates capital decisions, manages lender and investor relationships. | Once decisions cost more than your time to make them — usually $1M+ revenue. |

A common, expensive mistake is to treat all three as one. A bookkeeper is not qualified to give you tax strategy. A CPA is not paid to forecast your cash for the next 13 weeks. A CFO without a clean bookkeeper underneath has nothing to forecast *from*.

## What accounting buys you

1. **Tax compliance without panic.** Clean books mean a one-week tax season, not a three-month nightmare.
2. **Credit and capital.** Lenders, the SBA, vendors offering net-30 terms, and equity investors all want financial statements before they will say yes.
3. **Real pricing.** When you know your true cost per job — labor, materials, overhead, owner's time — you can quote with confidence and walk away from work that loses money.
4. **Owner discipline.** A monthly P&L forces you to confront where your money actually went. It is the single highest-ROI hour a small-business owner spends.
5. **A sellable business.** No buyer will pay a premium for a company whose financials live in a checkbook and a shoebox.

## The bottom line for this course

You don't need to *be* an accountant. You need to be able to **read** what your accountant produces, **ask the right questions**, and **make decisions** from it. That is what the next seven chapters will teach you.`,
        },
        {
          slug: "financial-vs-managerial",
          title: "Financial Accounting vs. Managerial Accounting",
          body: `## Two audiences, two playbooks

The single most useful framework in accounting is the split between **financial accounting** and **managerial accounting**. They use much of the same raw data, but they answer different questions for different people.

| Dimension | Financial Accounting | Managerial Accounting |
| --------- | -------------------- | --------------------- |
| **Audience** | External — investors, lenders, regulators, IRS | Internal — owners, managers, department heads |
| **Rule book** | GAAP (or IFRS); strictly enforced | Whatever helps the manager decide; no rules |
| **Time orientation** | Historical — reports what already happened | Forward-looking — budgets, forecasts, what-ifs |
| **Granularity** | Whole company, summarized | By segment, product, job, region, customer |
| **Frequency** | Quarterly / annually | Daily, weekly, monthly — as needed |
| **Precision** | Audited, must reconcile to the penny | Estimates and ranges are fine |
| **Examples** | 10-K, 10-Q, audited financial statements, tax return | Job costing, break-even analysis, ROI by division, KPI dashboards |

## Why both exist

A bank evaluating a loan needs to compare your business to other businesses on a standard basis — that requires GAAP financial accounting. The same numbers, formatted the same way, audited the same way.

But a project manager deciding whether to bid a $40,000 install at 18% margin or hold capacity for a possible $90,000 retrofit cannot wait for an audited annual report. They need a costed estimate, an opportunity-cost analysis, and a decision today. That is managerial accounting.

## The "counterpart" framing

Think of managerial accounting as the **counterpart** to financial accounting:

- **Financial accounting** keeps score and reports it to the outside world.
- **Managerial accounting** uses that score (plus a lot more internal data) to choose what plays to run next.

A healthy business runs both systems off the same general ledger. The bookkeeper enters each transaction once; the financial side rolls it into GAAP statements, while the managerial side slices it by job, customer, and department to drive decisions.

## What this means for you

When you ask your accountant for "the numbers," be specific about which playbook you need:

- **"I need our P&L for the bank"** → financial accounting, GAAP, year-to-date.
- **"I need to know if the smart-home division is making money"** → managerial accounting, segment P&L, this month.

The same ledger, two completely different reports. Both are accounting.`,
        },
        {
          slug: "reporting-ecosystem",
          title: "The Reporting Ecosystem: GAAP, FASB, SEC, and the Auditors",
          body: `## Who makes the rules?

Financial accounting only works because everybody plays by the same rule book. Otherwise an investor could not compare two companies, and a lender could not trust a borrower's statements. The rule book in the United States is called **GAAP**.

| Acronym | Stands for | What they do |
| ------- | ---------- | ------------ |
| **GAAP** | Generally Accepted Accounting Principles | The actual rules — how to recognize revenue, value inventory, depreciate assets, etc. |
| **FASB** | Financial Accounting Standards Board | The private body that *writes* GAAP. |
| **SEC** | Securities and Exchange Commission | The federal agency that *requires* public companies to follow GAAP and file financial statements. |
| **PCAOB** | Public Company Accounting Oversight Board | Regulates the auditors of public companies. |
| **IRS** | Internal Revenue Service | Enforces the *tax* code, which is **not** GAAP — it is its own separate rule set. |
| **IFRS** | International Financial Reporting Standards | The international counterpart to GAAP, used in most of the world outside the U.S. |

## The 10-K and 10-Q

Public companies must file:

- **10-K** — annual report, audited, comprehensive. Includes financial statements, MD&A (Management's Discussion & Analysis), risk factors, and disclosures.
- **10-Q** — quarterly report, *unaudited* (reviewed only), shorter.
- **8-K** — material events as they happen (acquisitions, executive changes, etc.).

You can read any public company's 10-K free at sec.gov. It is the single best free education in accounting available.

## Auditors

A **CPA firm** independent of the company examines the books and issues an **audit opinion** — typically "unqualified" (clean) or one of several flavors of qualified opinion. An audit does **not** guarantee the statements are correct; it provides *reasonable assurance* that they are free of material misstatement.

Private companies are not legally required to be audited, but lenders, investors, franchisors, and large customers often demand it.

## Why a small private business should care

You are not a public company. You will never file a 10-K. So why does this matter?

1. **Your statements still have to be GAAP-compliant** if you want a bank loan, an SBA loan, or outside investment.
2. **Your tax return is not your financial statement.** They are computed on different rules and will not match.
3. **The principles** — revenue recognition, matching, accrual, conservatism — apply to every business of every size. Ignore them and you will lie to yourself about how the business is doing.

The ecosystem exists so the language stays standardized. Even if no regulator forces you to use it, *you* should — because that is the language your bank, your buyer, and your future self will speak.`,
        },
        {
          slug: "four-financial-statements",
          title: "The Four Financial Statements at a Glance",
          body: `## The four reports every business produces

A complete set of financial statements has four parts. Each answers a different question and they are all linked together — change one and the others move.

| Statement | Question it answers | Time frame |
| --------- | ------------------- | ---------- |
| **Balance Sheet** | What does the company own and owe *right now*? | A single point in time (a snapshot) |
| **Income Statement** (P&L) | Did the company make a profit *over a period*? | Period (month, quarter, year) |
| **Statement of Cash Flows** | Where did the cash actually come from and go? | Period |
| **Statement of Stockholders' Equity** | How did the owners' stake change? | Period |

## How they link together

The four statements are not independent — they roll into each other:

\`\`\`
   Income Statement
   ────────────────
   Net Income  ────────┐
                       ▼
        Statement of Stockholders' Equity
        ────────────────────────────────
        Beginning Equity
        + Net Income
        − Dividends
        = Ending Equity ──────────┐
                                  ▼
                          Balance Sheet
                          ─────────────
                          Assets = Liabilities + Equity

   Statement of Cash Flows
   ───────────────────────
   Beginning Cash
   ± Operating, Investing, Financing
   = Ending Cash  ──────────► matches Cash on Balance Sheet
\`\`\`

Net income from the income statement flows into retained earnings on the balance sheet via the equity statement. Cash from the cash-flow statement must match the cash line on the balance sheet. If those don't tie out, the books are wrong.

## Why all four — why isn't the P&L enough?

Because **profit is an opinion, cash is a fact**. Two companies with identical net income can have wildly different cash positions, debt loads, and asset bases. You need:

- The **income statement** to see if you made money on the work you did.
- The **balance sheet** to see what you own, owe, and what's left for the owners.
- The **cash flow statement** to see if the money is actually showing up.
- The **equity statement** to see how the owners' stake changed (new investment, dividends paid, retained earnings).

Reading only the P&L is one of the most common — and most expensive — mistakes a small-business owner makes.

## What's coming

The next four chapters take each piece in turn:

- **Chapter 2** — the balance sheet and the equation that holds it together.
- **Chapter 3** — how transactions get *into* the books in the first place (debits and credits).
- **Chapter 4** — the income statement and accrual accounting.
- **Chapter 5** — the statement of cash flows.

By the end of Chapter 5 you will be able to pick up any company's annual report and read it.`,
        },
      ],
      quiz: [
        { id: "q1", type: "mcq", prompt: "Who writes GAAP in the United States?", choices: ["The SEC", "The IRS", "The FASB", "The PCAOB"], answer: "2", explanation: "FASB (Financial Accounting Standards Board) writes GAAP. The SEC requires public companies to follow it." },
        { id: "q2", type: "mcq", prompt: "Which statement is a snapshot at a single point in time?", choices: ["Income Statement", "Balance Sheet", "Statement of Cash Flows", "Statement of Stockholders' Equity"], answer: "1", explanation: "The balance sheet is a point-in-time snapshot. The other three cover a period." },
        { id: "q3", type: "mcq", prompt: "Managerial accounting is primarily aimed at:", choices: ["External investors", "The IRS", "Internal managers and owners", "Auditors"], answer: "2", explanation: "Managerial accounting is internal — for managers making decisions. Financial accounting is for external users." },
        { id: "q4", type: "mcq", prompt: "Which is NOT bound by GAAP?", choices: ["A 10-K filing", "An audited annual report", "An internal management dashboard", "Financial statements given to a bank for a loan"], answer: "2", explanation: "Internal managerial reports follow whatever format helps managers decide. GAAP applies to external financial reporting." },
        { id: "q5", type: "mcq", prompt: "Net income from the income statement flows into which line on the balance sheet?", choices: ["Cash", "Accounts Receivable", "Retained Earnings (within Equity)", "Long-Term Debt"], answer: "2", explanation: "Net income increases retained earnings (after subtracting dividends), which is part of stockholders' equity." },
        { id: "q6", type: "short", prompt: "In one sentence: why is profit not the same as cash?", answer: "accrual", explanation: "Accrual accounting recognizes revenue when earned and expenses when incurred — not when cash moves. So a profitable company can be cash-poor (and vice versa)." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch2-balance-sheet",
      number: 2,
      title: "The Balance Sheet & the Accounting Equation",
      summary: "The equation that holds every balance sheet together, plus the composition of assets, liabilities, and equity.",
      built: true,
      lessons: [
        {
          slug: "accounting-equation",
          title: "Assets = Liabilities + Equity",
          body: `## The single most important equation in business

\`\`\`
Assets = Liabilities + Equity
\`\`\`

That is the **accounting equation**, and it is true of every company on Earth at every moment in time. Walmart, your neighbor's lawn-care LLC, Apple, and the corner taqueria all balance to it.

## What the equation actually says

Read it in plain English:

> **Everything the company owns** (Assets) was paid for either with **money it borrowed** (Liabilities) or **money the owners put in or left in** (Equity). There is no third source of funding.

If a company buys a $50,000 truck:

- It either took out a $50,000 loan (Liabilities go up $50,000),
- Or wrote a check from cash the owners had contributed or earned (Cash goes down $50,000, but that's still on the asset side — assets are reshuffled, equity unchanged),
- Or some combination.

There is no fourth option. Every dollar of assets was funded by one of the two right-hand sources.

## Why "balance" sheet

Because the two sides must always balance. If they don't, somebody made an error. The discipline of double-entry bookkeeping (Chapter 3) is what guarantees they always do.

## Working the equation

You can rearrange it to solve for any unknown:

\`\`\`
Equity = Assets − Liabilities         (this is the owners' "book value" stake)
Liabilities = Assets − Equity
Assets = Liabilities + Equity
\`\`\`

### Worked example

A company has:
- Assets: $1,200,000
- Liabilities: $750,000

Equity = 1,200,000 − 750,000 = **$450,000**

That $450,000 is what the owners would receive if every asset sold at book value and every debt was paid off. (In real life, a sale would be at market value, not book value — but the equation tells you the accounting baseline.)

## The equation in motion

Every transaction touches at least two accounts and keeps the equation in balance. A few examples:

| Transaction | Effect on equation |
| ----------- | ------------------ |
| Owner contributes $20,000 cash | +20,000 Assets / +20,000 Equity |
| Buy $5,000 inventory on credit | +5,000 Assets / +5,000 Liabilities |
| Pay $5,000 to vendor | −5,000 Assets / −5,000 Liabilities |
| Sell inventory for $8,000 cash (cost was $5,000) | +8,000 Assets, −5,000 Assets / +3,000 Equity (profit) |
| Owner takes $10,000 distribution | −10,000 Assets / −10,000 Equity |

Notice how the equation never breaks. That is the discipline that keeps accounting honest.`,
        },
        {
          slug: "asset-composition",
          title: "Asset Composition — What a Company Owns",
          body: `## What counts as an asset?

An **asset** is a resource the company controls that is expected to produce future economic benefit. To make the balance sheet, an asset must be:

1. **Owned or controlled** by the company.
2. **Measurable** in dollars with reasonable reliability.
3. **Likely to produce future benefit** (cash, savings, or use).

That third rule excludes a lot of things people *think* are assets — your loyal customer base, your brand reputation, your hard-working team. They generate value, but GAAP doesn't let you put them on the balance sheet (with rare exceptions).

## Current vs. non-current

The balance sheet groups assets by how quickly they convert to cash:

- **Current assets** — cash or convertible to cash within one year (or one operating cycle, if longer).
- **Non-current (long-term) assets** — everything else.

## Common current assets

| Account | What it is |
| ------- | ---------- |
| **Cash & cash equivalents** | Checking, savings, money-market funds, T-bills under 90 days. |
| **Accounts Receivable (AR)** | Money customers owe you for work already invoiced. |
| **Inventory** | Goods held for sale (or raw materials and WIP for manufacturers). |
| **Prepaid expenses** | Cash already paid for future benefit — insurance, rent, subscriptions. |
| **Short-term investments** | Marketable securities expected to be sold within a year. |

## Common non-current assets

| Account | What it is |
| ------- | ---------- |
| **Property, Plant & Equipment (PP&E)** | Land, buildings, vehicles, machinery, computers — recorded at cost, depreciated over time. |
| **Intangible assets** | Patents, trademarks, software, customer lists — usually only on the books if purchased. |
| **Goodwill** | The premium paid above book value when acquiring another company. |
| **Long-term investments** | Stakes in other companies held for >1 year. |
| **Deferred tax assets** | Tax overpayments that will reduce future tax bills. |

## Tangible vs. intangible

- **Tangible** — physical: trucks, buildings, inventory.
- **Intangible** — non-physical but still owned: patents, trademarks, software, goodwill.

The distinction matters because tangible assets are usually **depreciated** (cost spread over useful life) and intangibles are **amortized** (same idea, different word). Land is the famous exception — it is tangible but not depreciated.

## A real integrator-company example

A small AV/smart-home integrator's current asset section might look like:

\`\`\`
Cash                                $  85,000
Accounts Receivable (AR)              210,000
Inventory (in-stock equipment)         95,000
Prepaid insurance                       6,500
─────────────────────────────────────────────
Total current assets                $ 396,500

Service vans                        $  78,000
Tools & test equipment                 22,000
Office build-out                       18,000
Less: accumulated depreciation       (35,000)
─────────────────────────────────────────────
Total PP&E, net                     $  83,000

Goodwill (from acquisition)         $  40,000
─────────────────────────────────────────────
Total assets                        $ 519,500
\`\`\`

Notice how AR ($210k) is more than twice the cash. That tells you a lot already — this business has cash tied up in unpaid customer invoices. Reading the balance sheet is mostly about asking *why* the numbers look the way they do.`,
        },
        {
          slug: "liabilities-and-equity",
          title: "Liabilities & Equity — How the Company Was Funded",
          body: `## Liabilities — what the company owes

A **liability** is a present obligation arising from a past event that will require the company to give up resources to settle. Same current/non-current split as assets.

### Common current liabilities

| Account | What it is |
| ------- | ---------- |
| **Accounts Payable (AP)** | Bills from vendors not yet paid. |
| **Accrued expenses** | Expenses incurred but not yet billed (wages owed, utilities, interest). |
| **Short-term debt / line of credit** | Loans due within one year. |
| **Current portion of long-term debt** | The next 12 months of principal on a multi-year loan. |
| **Customer deposits / unearned revenue** | Cash collected for work not yet done. |
| **Taxes payable** | Sales tax, payroll tax, income tax owed but not yet remitted. |

### Common non-current liabilities

| Account | What it is |
| ------- | ---------- |
| **Long-term debt** | Term loans, bonds, mortgages with >1 year remaining. |
| **Deferred tax liabilities** | Taxes that will be owed in future periods. |
| **Lease liabilities** | Long-term lease obligations (capitalized under current GAAP). |

## Equity — what belongs to the owners

Stockholders' equity is the residual claim — what the owners have after all liabilities are paid. It has two main sources:

1. **Money put into the business by owners** (contributed capital).
2. **Money earned by the business and not yet distributed** (retained earnings).

### Common equity accounts

| Account | What it is |
| ------- | ---------- |
| **Common stock** | Par value of shares issued to owners. |
| **Additional Paid-In Capital (APIC)** | Amount paid by investors above par value. |
| **Retained Earnings** | Cumulative net income minus cumulative dividends paid. |
| **Treasury stock** | Shares the company has bought back (a *contra*-equity, reducing total equity). |
| **Accumulated Other Comprehensive Income (AOCI)** | Items like FX translation and unrealized gains/losses. |

For an LLC or sole proprietorship, equity is usually just **Member's / Owner's Capital** and **Owner's Draws** (instead of common stock and dividends), but the concept is identical.

## The retained-earnings engine

Retained earnings is the link between the income statement and the balance sheet:

\`\`\`
Beginning Retained Earnings
+ Net Income (from this year's income statement)
− Dividends / Distributions paid
= Ending Retained Earnings
\`\`\`

Every dollar of profit you do not distribute increases retained earnings — and therefore equity — and therefore the book value of the business. That is how a company "grows wealth" on paper.

## Worked example: solving for equity

A company shows:

- Total Assets: $850,000
- Current Liabilities: $180,000
- Long-Term Debt: $300,000

Total Liabilities = 180,000 + 300,000 = **$480,000**
Equity = 850,000 − 480,000 = **$370,000**

Of that $370,000, perhaps $50,000 was the owner's original contribution (common stock + APIC) and $320,000 is retained earnings the business generated and held onto.

## What this tells the owner

Look at the right side of the balance sheet to see **how the company is funded**:

- **Heavy on debt** → high interest expense, less flexibility, lender covenants.
- **Heavy on equity, low retained earnings** → owners have been pulling distributions; not building book value.
- **Heavy on retained earnings** → mature, profitable, self-funded — what most healthy businesses look like.`,
        },
        {
          slug: "reading-a-balance-sheet",
          title: "Reading a Real Balance Sheet",
          body: `## A small integrator's balance sheet

Here is a complete classified balance sheet for "TCL Integrators, LLC" at year-end:

\`\`\`
ASSETS
─────────────────────────────────────────────
Current assets
  Cash & equivalents                $  85,000
  Accounts Receivable                 210,000
  Inventory                            95,000
  Prepaid expenses                      6,500
                                    ─────────
  Total current assets                396,500

Non-current assets
  Property, Plant & Equipment, net     83,000
  Goodwill                             40,000
                                    ─────────
  Total non-current assets            123,000
                                    ─────────
Total Assets                       $ 519,500
═════════════════════════════════════════════

LIABILITIES & EQUITY
─────────────────────────────────────────────
Current liabilities
  Accounts Payable                  $  72,000
  Accrued wages & payroll tax          18,000
  Customer deposits                    45,000
  Line of credit                       60,000
  Current portion of long-term debt    24,000
                                    ─────────
  Total current liabilities           219,000

Non-current liabilities
  Long-term debt (truck loans, SBA)    96,000
                                    ─────────
  Total liabilities                   315,000

Equity
  Member's capital                     50,000
  Retained earnings                   154,500
                                    ─────────
  Total equity                        204,500
                                    ─────────
Total Liabilities & Equity         $ 519,500
═════════════════════════════════════════════
\`\`\`

Total assets ($519,500) = Total liabilities + equity ($315,000 + $204,500 = $519,500). ✓ The equation holds.

## What the owner should notice

**Working capital** = Current Assets − Current Liabilities = 396,500 − 219,000 = **$177,500**.

That is the cushion between what's owed in the next 12 months and what's available to pay it. Positive working capital is good. A *current ratio* of 396,500 / 219,000 = **1.81** means the company has $1.81 of short-term assets for every $1.00 of short-term obligations. (More on ratios in Chapter 7.)

**AR concentration.** $210,000 in receivables is 40% of total assets. If a major customer goes bad, this company is in serious trouble. The owner should be looking at AR aging weekly.

**Customer deposits** of $45,000 is a *liability* — it is cash collected for work not yet done. If those projects get cancelled, the company has to refund the money. It is real cash, but it is not the company's to spend on growth.

**Debt-to-equity** = 315,000 / 204,500 = **1.54**. The company has more debt than equity. Not necessarily bad for an asset-light service business, but a banker will notice.

## What the balance sheet does NOT tell you

This is just as important as what it does tell you:

1. **Market value.** Assets are recorded at historical cost, not fair-market value. The vans on the books at $43,000 (after depreciation) might fetch $25,000 at auction — or $55,000 if used vans are scarce.
2. **Customer relationships, brand, team.** The most valuable assets in many small businesses are nowhere on the balance sheet.
3. **Off-balance-sheet obligations.** Some operating leases, warranties, and contingent liabilities don't appear here.
4. **Quality of earnings.** A balance sheet shows the result of past decisions — not whether the business model is durable.

The balance sheet is a *snapshot of position*. To understand *performance*, you need the income statement (Chapter 4). To understand *liquidity*, you need the cash-flow statement (Chapter 5). All three together — that is the picture.`,
        },
      ],
      quiz: [
        { id: "q1", type: "numeric", prompt: "A company has Assets of $640,000 and Liabilities of $390,000. Equity = ?", answer: 250000, tolerance: 1, explanation: "Equity = Assets − Liabilities = 640,000 − 390,000 = 250,000." },
        { id: "q2", type: "mcq", prompt: "Which is a current asset?", choices: ["Goodwill", "Long-term debt", "Accounts Receivable", "Building"], answer: "2", explanation: "AR is collected within a year — it's current. Goodwill and buildings are non-current; long-term debt is a liability." },
        { id: "q3", type: "mcq", prompt: "Customer deposits for projects not yet completed are recorded as:", choices: ["Revenue", "Equity", "A liability (unearned revenue)", "An asset"], answer: "2", explanation: "Cash received for work not yet done is owed back to the customer until earned — it is a liability." },
        { id: "q4", type: "mcq", prompt: "Retained earnings increases when:", choices: ["The company takes a loan", "The company earns net income and does not pay it out as dividends", "The owners contribute more capital", "Inventory is purchased"], answer: "1", explanation: "Retained earnings = beginning RE + net income − dividends. Loans, contributions, and inventory don't touch RE." },
        { id: "q5", type: "mcq", prompt: "The accounting equation is:", choices: ["Revenue = Expenses + Profit", "Assets = Liabilities + Equity", "Cash = Income − Expenses", "Equity = Assets + Liabilities"], answer: "1", explanation: "Assets = Liabilities + Equity. Always." },
        { id: "q6", type: "numeric", prompt: "Total Assets $900k, Current Liabilities $200k, Long-Term Debt $300k. Equity = ?", answer: 400000, tolerance: 1, explanation: "Total liabilities = 500k. Equity = 900k − 500k = 400k." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch3-debits-credits",
      number: 3,
      title: "Recording Transactions: Debits, Credits, Journals",
      summary: "Double-entry bookkeeping, T-accounts, journal entries, the ledger, and the trial balance.",
      built: true,
      lessons: [
        {
          slug: "double-entry",
          title: "Double-Entry Bookkeeping & the Debit/Credit Rules",
          body: `## Why double-entry exists

In the 1400s, a Franciscan friar named Luca Pacioli wrote down a system Venetian merchants were already using: every transaction is recorded twice — once as a **debit** and once as an equal **credit**. The two sides must balance.

That single discipline is the reason the accounting equation can never get out of balance, and the reason errors are catchable. It is the foundation of every accounting system in the world today, including QuickBooks, Xero, NetSuite, and SAP.

## Debit and credit are not "good" and "bad"

This is the part that confuses everyone the first time. Debit (Dr) and credit (Cr) are just **left** and **right** in a T-account. They are directional, not value judgments.

What they *do* depends on which type of account they touch:

| Account type | Debit (Dr) | Credit (Cr) | Normal balance |
| ------------ | ---------- | ----------- | -------------- |
| **Assets** | Increase ↑ | Decrease ↓ | Debit |
| **Liabilities** | Decrease ↓ | Increase ↑ | Credit |
| **Equity** | Decrease ↓ | Increase ↑ | Credit |
| **Revenue** | Decrease ↓ | Increase ↑ | Credit |
| **Expense** | Increase ↑ | Decrease ↓ | Debit |

A trick to remember it: **DEAL** accounts have a normal **D**ebit balance — **D**ividends, **E**xpenses, **A**ssets, **L**osses. Everything else (Liabilities, Equity, Revenue, Gains) is normal **credit**.

## Why it always balances

Look at the equation again:

\`\`\`
Assets  =  Liabilities  +  Equity
(Dr)        (Cr)           (Cr)
\`\`\`

The left side is naturally a debit balance; the right side is naturally a credit balance. Every transaction adjusts both sides equally. If you increase an asset (Dr), you must either:

- Increase a liability or equity (Cr) — funded from the right side, or
- Decrease another asset (Cr) — reshuffled within the left side.

Either way, total debits = total credits. Always.

## Worked example

A consultant invoices a client $4,000 for completed work, on net-30 terms.

\`\`\`
                         Dr        Cr
Accounts Receivable    4,000
   Service Revenue              4,000
\`\`\`

- AR (asset) increased → debit it.
- Revenue increased → credit it.

Total debits ($4,000) = total credits ($4,000). ✓ Equation stays in balance: assets ↑ $4,000, equity ↑ $4,000 (revenue flows to equity via retained earnings).

When the client pays 30 days later:

\`\`\`
                         Dr        Cr
Cash                   4,000
   Accounts Receivable           4,000
\`\`\`

- Cash (asset) increased → debit.
- AR (asset) decreased → credit.

Two assets reshuffled. Equity unchanged. Equation still balances. ✓

## The takeaway

You do not need to memorize every Dr and Cr — your bookkeeper or accounting software does that for you. But you do need to understand the **logic**: every transaction has two sides, both equal, both keeping the books in balance. When something doesn't reconcile, it is almost always because somebody recorded one side and forgot the other.`,
        },
        {
          slug: "t-accounts-journals",
          title: "T-Accounts, Journal Entries, and the Ledger",
          body: `## Three views of the same data

Accountants look at transactions in three forms. They are the same information, organized differently.

1. **Journal entry** — the chronological record of a transaction, in Dr/Cr form.
2. **T-account** — a single account's history, with debits on the left and credits on the right.
3. **Ledger / Trial balance** — every account's running balance at a point in time.

## The journal entry format

\`\`\`
Date       Account                         Dr          Cr
─────────────────────────────────────────────────────────
01-Mar-26  Cash                         50,000
              Member's Capital                      50,000
           (Owner contributed cash to start LLC)
\`\`\`

Always: debit accounts first, credit accounts indented underneath. A short narration explains the transaction.

## A T-account

For an account named "Cash":

\`\`\`
            Cash
    ─────────┬─────────
       Dr    │    Cr
    ─────────┼─────────
    50,000   │
    20,000   │   8,000
             │   3,500
    ─────────┼─────────
    Bal:    58,500
\`\`\`

You add the debits, add the credits, and the difference is the balance. For an asset, the natural balance is on the debit (left) side.

## Worked example: a startup's first week

"NorthStar Audio LLC" opens for business. Five transactions, recorded as journal entries:

**Day 1.** Owner contributes $50,000 cash.

\`\`\`
Cash                          50,000
   Member's Capital                       50,000
\`\`\`

**Day 2.** Buys $12,000 of inventory on net-30 from a distributor.

\`\`\`
Inventory                     12,000
   Accounts Payable                       12,000
\`\`\`

**Day 3.** Buys a $20,000 service van for cash.

\`\`\`
Vehicles                      20,000
   Cash                                   20,000
\`\`\`

**Day 4.** Sells $8,000 of equipment to a customer on net-15. Cost of those goods was $5,000.

\`\`\`
Accounts Receivable            8,000
   Service Revenue                         8,000

Cost of Goods Sold             5,000
   Inventory                               5,000
\`\`\`

**Day 5.** Pays $3,500 on the AP balance.

\`\`\`
Accounts Payable               3,500
   Cash                                    3,500
\`\`\`

## The ledger after the week

After posting all five transactions, the running balances are:

| Account | Debit | Credit | Balance |
| ------- | -----:| ------:| -------:|
| Cash | 50,000 | 23,500 | **26,500 Dr** |
| Accounts Receivable | 8,000 | — | **8,000 Dr** |
| Inventory | 12,000 | 5,000 | **7,000 Dr** |
| Vehicles | 20,000 | — | **20,000 Dr** |
| Accounts Payable | 3,500 | 12,000 | **8,500 Cr** |
| Member's Capital | — | 50,000 | **50,000 Cr** |
| Service Revenue | — | 8,000 | **8,000 Cr** |
| Cost of Goods Sold | 5,000 | — | **5,000 Dr** |

**Total debits**: 50,000 + 8,000 + 12,000 + 20,000 + 3,500 + 5,000 = **98,500**
**Total credits**: 5,000 + 12,000 + 50,000 + 8,000 + 23,500 = **98,500** ✓

The books balance. Every modern accounting system runs exactly this loop, just much faster and with prettier reports.`,
        },
        {
          slug: "trial-balance",
          title: "The Trial Balance — Catching Errors Before the Statements",
          body: `## What a trial balance is

The **trial balance** is a worksheet listing every account in the general ledger with its current balance, separated into a debit column and a credit column. The two columns must total to the same number.

If they don't, you have an error and you cannot prepare financial statements until you find it.

## Example trial balance

For NorthStar Audio LLC after Week 1:

\`\`\`
Account                         Debit       Credit
─────────────────────────────────────────────────
Cash                          26,500
Accounts Receivable            8,000
Inventory                      7,000
Vehicles                      20,000
Accounts Payable                            8,500
Member's Capital                           50,000
Service Revenue                             8,000
Cost of Goods Sold             5,000
─────────────────────────────────────────────────
TOTALS                        66,500       66,500   ✓
\`\`\`

Both columns hit 66,500. The trial balance is in balance.

## What a trial balance does NOT catch

The trial balance only proves that **debits equal credits**. It cannot catch errors where both sides are wrong by the same amount, or where the wrong account was used. Specifically:

- ❌ Posting to the wrong account (e.g., debiting "Office Supplies" instead of "Inventory") — totals still balance.
- ❌ Posting both sides at the wrong amount (recording $1,800 as $1,000 on both sides) — still balances.
- ❌ Forgetting to record a transaction at all — still balances.
- ❌ Recording the same transaction twice — still balances.

What it *does* catch:

- ✓ Recording one side and not the other.
- ✓ Recording different amounts on the two sides.
- ✓ Posting Dr as Cr or vice versa.

## From trial balance to financial statements

Once the trial balance is clean, you can build the financial statements directly from it:

1. Revenue and expense accounts → **Income Statement** (revenue − expenses = net income).
2. Net income flows into Retained Earnings on the **Statement of Equity**.
3. Asset, liability, and equity accounts (with updated retained earnings) → **Balance Sheet**.
4. Cash account changes are analyzed and classified → **Statement of Cash Flows**.

That is the full bookkeeping cycle, every period:

\`\`\`
Transactions → Journal → Ledger → Trial Balance → Financial Statements
\`\`\`

Modern software collapses these steps into invisible automation, but the logic underneath is exactly what Pacioli described in 1494.`,
        },
      ],
      quiz: [
        { id: "q1", type: "mcq", prompt: "Which group of accounts has a normal DEBIT balance?", choices: ["Liabilities, Equity, Revenue", "Assets, Expenses, Dividends", "Revenue, Gains, Equity", "Liabilities, Assets, Revenue"], answer: "1", explanation: "DEAL: Dividends, Expenses, Assets, Losses have normal debit balances." },
        { id: "q2", type: "mcq", prompt: "An owner contributes $25,000 cash to the business. The journal entry debits ______ and credits ______.", choices: ["Cash / Revenue", "Cash / Member's Capital", "Member's Capital / Cash", "Revenue / Cash"], answer: "1", explanation: "Cash (asset) increases — debit. Member's Capital (equity) increases — credit." },
        { id: "q3", type: "mcq", prompt: "If you record only the debit side of a transaction and forget the credit side, the trial balance will:", choices: ["Still balance", "Be out of balance", "Show negative cash", "Crash the software"], answer: "1", explanation: "Trial balance compares total debits to total credits. A missing credit will make them unequal." },
        { id: "q4", type: "mcq", prompt: "Which error WILL the trial balance catch?", choices: ["Posting to the wrong account", "Forgetting a transaction entirely", "Recording $500 as $5,000 on both sides", "Recording the debit as $400 and the credit as $40"], answer: "3", explanation: "Unequal Dr and Cr amounts make the columns disagree. The other errors keep totals balanced." },
        { id: "q5", type: "short", prompt: "A company sells $1,200 of services for cash. Name the account that should be DEBITED.", answer: "cash", explanation: "Cash increases (an asset increase) — debit Cash. The credit side is Service Revenue." },
        { id: "q6", type: "short", prompt: "A company pays $800 of an outstanding bill. Name the account that should be CREDITED.", answer: "cash", explanation: "Cash decreases — credit Cash. The debit side is Accounts Payable (the liability is reduced)." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch4-income-statement",
      number: 4,
      title: "The Income Statement & Accrual Accounting",
      summary: "Revenue recognition, the matching principle, the multi-step income statement, and adjusting/closing entries.",
      built: true,
      lessons: [
        {
          slug: "accrual-vs-cash",
          title: "Accrual Accounting & the Matching Principle",
          body: `## Cash basis vs. accrual basis

There are two ways to keep score:

**Cash basis.** Record revenue when cash arrives. Record expenses when cash leaves. Simple, intuitive, and how your checkbook works.

**Accrual basis.** Record revenue when it is *earned* (work done, goods delivered) regardless of when the cash arrives. Record expenses when they are *incurred* (resources consumed) regardless of when the cash leaves.

GAAP requires accrual. So does any serious lender or investor. The IRS allows cash basis only for small businesses (generally under $30M average revenue) — and most small business owners use cash basis for tax purposes while keeping accrual books for management.

## Why accrual is better at telling the truth

A simple example. In December, an integrator finishes a $40,000 install. The customer's net-30 invoice doesn't get paid until late January.

| | Cash basis | Accrual basis |
| --- | --- | --- |
| December revenue | $0 | $40,000 |
| January revenue | $40,000 | $0 |

Cash basis says December was a terrible month and January was a great one. Accrual basis correctly attributes the $40,000 to December — when the work was actually done. If the technician's wages, materials, and truck fuel were paid in December, accrual matches the revenue and the costs in the same period and shows the true profit on that job.

## The matching principle

The single most important idea on the income statement:

> **Expenses must be matched to the revenues they helped produce, in the period that revenue is recognized.**

If you sell $100,000 of equipment in March, the $60,000 cost of that equipment must hit March's income statement — even if you paid the supplier in February or you'll pay them in April. That is what makes accrual gross profit meaningful.

## Revenue recognition (a one-paragraph summary of a 700-page rule)

GAAP's revenue recognition standard (ASC 606) says revenue is recognized when **control of the good or service transfers to the customer** — which usually happens when the work is done or the goods are delivered, *not* when cash changes hands. For a service business, that often means revenue is earned over time as the work is performed; for a product business, at the point of sale or shipment.

## What changes with accrual

Two major things appear on the balance sheet that don't exist in pure cash accounting:

- **Accounts Receivable** — revenue earned but not yet collected.
- **Accounts Payable / Accrued Expenses** — expenses incurred but not yet paid.

These two accounts are the *bridge* between the income statement (which is on accrual) and the cash flow statement (which is on cash). Chapter 5 covers how that bridge is built.`,
        },
        {
          slug: "income-statement-composition",
          title: "Composition of the Income Statement",
          body: `## The multi-step income statement

A multi-step income statement breaks the calculation into intermediate subtotals so you can see *where* profit is being made (or lost). It is the standard format for any serious business.

\`\`\`
                                              $
─────────────────────────────────────────────────
Revenue (Sales)                          1,800,000
  Less: Sales returns and allowances       (30,000)
─────────────────────────────────────────────────
Net Revenue                              1,770,000

Less: Cost of Goods Sold (COGS)          (980,000)
─────────────────────────────────────────────────
GROSS PROFIT                               790,000     ← gross margin = 44.6%

Operating Expenses
  Selling, general & administrative       (420,000)
  Depreciation & amortization              (45,000)
  Research & development                   (60,000)
─────────────────────────────────────────────────
OPERATING INCOME (EBIT)                    265,000     ← operating margin = 15.0%

Other income / (expense)
  Interest expense                         (28,000)
  Gain on sale of equipment                  4,000
─────────────────────────────────────────────────
PRE-TAX INCOME                             241,000

  Income tax expense                       (60,250)
─────────────────────────────────────────────────
NET INCOME                                 180,750     ← net margin = 10.2%
═════════════════════════════════════════════════
\`\`\`

## What each subtotal tells you

**Gross Profit = Revenue − COGS.** Tells you whether the *core product or service* is profitable before any overhead. Falling gross margin is one of the earliest warning signs in any business.

**Operating Income (EBIT) = Gross Profit − Operating Expenses.** Tells you whether the *operating business* makes money — independent of how it is financed (interest) or taxed. This is the number investors compare across companies.

**Pre-Tax Income.** Operating income adjusted for non-operating items (interest, gains/losses on side activities).

**Net Income.** The bottom line. What's left for the owners — the number that flows into retained earnings on the balance sheet.

## Single-step vs. multi-step

A **single-step** income statement just lists all revenues, then all expenses, and computes one number — net income. It is acceptable under GAAP but tells you almost nothing diagnostic. Always use multi-step internally.

## Why the income statement is not enough

Net income is on accrual basis. It includes:

- Revenue you have earned but not yet collected (sitting in AR).
- Expenses like depreciation that are non-cash.
- Inventory build-ups that ate cash but didn't hit the P&L.

That is why a company can post a healthy net income and still run out of cash. Chapter 5 — the cash flow statement — is the antidote.

## Margins are more diagnostic than dollars

Compare a company against itself across periods, or against a competitor of any size, by using **margin percentages**:

\`\`\`
Gross Margin     = Gross Profit ÷ Revenue
Operating Margin = Operating Income ÷ Revenue
Net Margin       = Net Income ÷ Revenue
\`\`\`

A company growing revenue 20% per year while gross margin slips from 45% to 38% is in trouble. A company with flat revenue but expanding margins is winning quietly. The income statement tells both stories — but only if you read the percentages, not just the dollars.`,
        },
        {
          slug: "adjusting-closing-entries",
          title: "Adjusting & Closing Entries",
          body: `## What adjusting entries are for

During the period, the bookkeeper records transactions as they happen. But at period-end, several things are *true* about the business that haven't been recorded yet, because no document triggered them:

- Wages have been earned by employees but not yet paid.
- A month of rent has been used up from the prepaid balance.
- A month of depreciation has happened on the trucks.
- A month of interest has accrued on the loan.

**Adjusting entries** bring the books to accrual basis before the financial statements are produced. There are four classic types.

## Type 1 — Accrued expenses

Expense incurred but not yet paid or invoiced.

> Employees earned $4,200 of wages in the last 3 days of December but won't be paid until the January 7 payroll.

\`\`\`
Wage Expense                   4,200
   Wages Payable                            4,200
\`\`\`

December's P&L now correctly includes those wages.

## Type 2 — Accrued revenue

Revenue earned but not yet billed.

> The integrator completed work on December 30 worth $9,000 but won't invoice until January 2.

\`\`\`
Accounts Receivable            9,000
   Service Revenue                          9,000
\`\`\`

## Type 3 — Deferred (prepaid) expenses

Cash paid in advance, used up over time.

> Paid $12,000 in October for a 12-month insurance policy. By December 31, three months ($3,000) have been "used."

\`\`\`
Insurance Expense              3,000
   Prepaid Insurance                        3,000
\`\`\`

The Prepaid Insurance asset balance drops from $12,000 to $9,000.

## Type 4 — Deferred revenue (unearned revenue)

Cash collected in advance for work not yet done.

> Customer paid $15,000 deposit in November for a January installation. By year-end, the integrator has done $5,000 of design and pre-wire.

\`\`\`
Unearned Revenue               5,000
   Service Revenue                          5,000
\`\`\`

The unearned revenue *liability* drops from $15,000 to $10,000 as it is earned.

## Depreciation: the most common adjusting entry

PP&E doesn't get expensed all at once when purchased — it is **depreciated** over its useful life, matching the cost to the periods that benefit from it.

> The $20,000 service van has a 5-year useful life. Annual depreciation (straight-line) = $20,000 ÷ 5 = $4,000. Monthly = $333.

\`\`\`
Depreciation Expense             333
   Accumulated Depreciation                  333
\`\`\`

Accumulated Depreciation is a *contra-asset* — it sits on the balance sheet under PP&E and reduces the asset's net book value.

## Closing entries

At the end of the year, the **temporary accounts** (revenues, expenses, dividends/distributions) are closed to retained earnings, then reset to zero so the next year starts fresh. Permanent accounts (assets, liabilities, equity) carry their balances forward.

\`\`\`
Service Revenue            1,770,000
   Income Summary                       1,770,000

Income Summary             1,589,250
   COGS                                   980,000
   SG&A                                   420,000
   Depreciation                            45,000
   R&D                                     60,000
   Interest Expense                        28,000
   Tax Expense                             60,250
   (... and so on)

Income Summary               180,750
   Retained Earnings                      180,750
\`\`\`

After closing, the income statement accounts are all zero, and retained earnings has absorbed the year's net income. The books are now ready for January 1.

## Why an owner cares about the close

A clean, on-time monthly close is the difference between an accountant who tells you what happened *last quarter* and an accountant who tells you what happened *last week*. Push your bookkeeping function to close every month within 10 business days. Faster information beats prettier reports.`,
        },
      ],
      quiz: [
        { id: "q1", type: "mcq", prompt: "Under accrual accounting, revenue is recognized when:", choices: ["Cash is received", "The contract is signed", "The good or service is delivered to the customer", "The invoice is sent"], answer: "2", explanation: "Revenue is recognized when control transfers — typically when the work is done or the good is delivered." },
        { id: "q2", type: "numeric", prompt: "Revenue $500,000; COGS $300,000. Gross Profit = ?", answer: 200000, tolerance: 1, explanation: "Gross Profit = Revenue − COGS = 500k − 300k = 200k." },
        { id: "q3", type: "numeric", prompt: "Revenue $500,000; COGS $300,000; Operating expenses $120,000. Operating margin (%) = ?", answer: 16, tolerance: 0.5, explanation: "Operating Income = 500 − 300 − 120 = 80. Operating margin = 80 / 500 = 16%." },
        { id: "q4", type: "mcq", prompt: "Cash collected for work that hasn't been done yet is:", choices: ["Revenue", "Accounts receivable", "Unearned revenue (a liability)", "An expense"], answer: "2", explanation: "Cash received before earning it creates a liability — you owe the customer either the work or a refund." },
        { id: "q5", type: "mcq", prompt: "Depreciation expense is recorded because:", choices: ["The asset has lost market value", "GAAP requires matching the asset's cost to the periods that benefit from it", "The IRS requires it for tax", "The asset was sold"], answer: "1", explanation: "Depreciation is the matching principle applied to long-lived assets — spread the cost over the useful life." },
        { id: "q6", type: "mcq", prompt: "Closing entries do which of the following?", choices: ["Zero out asset accounts", "Move temporary account balances (revenues, expenses) into Retained Earnings", "Adjust the bank reconciliation", "Reverse depreciation"], answer: "1", explanation: "Closing entries clear revenues, expenses, and dividends to Retained Earnings so the next period starts at zero." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch5-cash-flows",
      number: 5,
      title: "The Statement of Cash Flows",
      summary: "Why cash differs from profit, the three sections (operating/investing/financing), the indirect method, and EBITDA vs. Free Cash Flow.",
      built: true,
      lessons: [
        {
          slug: "cash-vs-profit",
          title: "Why Cash ≠ Profit (and Why It Kills Companies)",
          body: `## The most common founder failure

Most small businesses don't fail because they aren't profitable. They fail because they run out of cash *while* being profitable. There is even a name for it: **growing broke**.

## How a profitable company runs out of cash

Imagine a fast-growing AV integrator. Things going well:

- Revenue: $100,000/month, growing 10% per month.
- Net margin: 12% — so $12,000 of profit per month.
- Customer terms: net-45.
- Vendor terms: net-30.
- Inventory needed in advance: roughly 1 month of sales.

By month 6, revenue is $177,000 and "profit" is $21,000. The owner feels great. But:

- AR balance: ≈ 1.5 months of sales = $265,000 of cash *not yet collected*.
- Inventory: ≈ $90,000 sitting on the shelf.
- AP: ≈ $50,000 owed to vendors.

Cash tied up in working capital has grown by hundreds of thousands of dollars in 6 months — far more than the cumulative profit. The owner now needs a line of credit to make payroll, despite the company being profitable on paper.

This is the textbook case for why the income statement is not enough.

## Three places profit hides without becoming cash

1. **Accounts Receivable.** Revenue earned, cash not collected.
2. **Inventory.** Cash spent, expense not yet recognized (sits as an asset until sold).
3. **Capital Expenditures (CapEx).** Cash spent on PP&E, expensed slowly via depreciation.

And three places cash leaves without hitting profit:

1. **Loan principal payments.** The principal portion isn't an expense — only interest is.
2. **Owner distributions / dividends.** Reduce equity, not the income statement.
3. **CapEx purchases.** Up-front cash, depreciation later.

## Three places profit appears without cash leaving

1. **Depreciation & amortization.** Non-cash expense that lowers reported profit but doesn't touch cash.
2. **Stock-based compensation.** Expensed but never paid in cash.
3. **Bad debt provisions.** Estimated, not yet written off.

## The fix: the cash flow statement

The Statement of Cash Flows takes net income and systematically reverses every accrual-basis adjustment to arrive at the actual cash that moved through the company during the period. It then categorizes that cash flow into three buckets — operating, investing, and financing — so you can see where the money came from and where it went.

Read it every month. It is the single best early-warning system you have.`,
        },
        {
          slug: "scf-three-sections",
          title: "Operating, Investing, Financing — and the Indirect Method",
          body: `## The three sections

Every cash flow statement has the same three sections, in the same order:

**1. Cash Flows from Operating Activities (CFO).** Cash from the day-to-day business — collecting from customers, paying suppliers and employees, paying interest and taxes. This should be positive in any healthy ongoing business.

**2. Cash Flows from Investing Activities (CFI).** Cash spent on or received from long-term assets — buying or selling PP&E, acquiring other companies, buying or selling investments. Healthy growing companies usually show *negative* CFI (they are buying assets).

**3. Cash Flows from Financing Activities (CFF).** Cash from or to lenders and owners — borrowing or repaying loans, issuing stock or buying it back, paying dividends/distributions.

## What goes in each bucket

| Activity | Section |
| -------- | ------- |
| Cash collected from customers | Operating |
| Cash paid to vendors and employees | Operating |
| Interest paid | Operating |
| Taxes paid | Operating |
| Buy a service van for cash | Investing |
| Sell old equipment | Investing |
| Buy another business | Investing |
| Take out a bank loan | Financing |
| Repay loan principal | Financing |
| Owner contributes capital | Financing |
| Owner distributes profit | Financing |

## The indirect method

Under the indirect method (used by ~99% of companies), Operating Cash Flow is calculated by *starting with net income* and working backward to actual cash:

\`\`\`
Net Income                                       180,750
  + Depreciation & amortization (non-cash)        45,000
  + Stock-based compensation (non-cash)            8,000
  − Increase in Accounts Receivable              (40,000)   (more revenue not yet collected)
  + Decrease in Inventory                         15,000   (sold from stock without replacing it)
  + Increase in Accounts Payable                  12,000   (delayed paying vendors)
  − Decrease in Unearned Revenue                  (5,000)
─────────────────────────────────────────────────────────
Cash from Operating Activities                  215,750
\`\`\`

The logic:

- **Add back non-cash expenses** (depreciation, amortization, stock comp) — they reduced net income but didn't reduce cash.
- **Adjust for changes in working capital**: increases in current assets (AR, inventory, prepaids) *use* cash; decreases free up cash. Increases in current liabilities (AP, accrued) *provide* cash; decreases use cash.

## A complete example

\`\`\`
CASH FLOWS FROM OPERATING ACTIVITIES
   Net Income                                    180,750
   Depreciation                                   45,000
   Increase in AR                                (40,000)
   Decrease in Inventory                          15,000
   Increase in AP                                 12,000
   Decrease in Unearned Revenue                   (5,000)
   Stock-based comp                                8,000
                                              ──────────
   Net cash from operating                       215,750

CASH FLOWS FROM INVESTING ACTIVITIES
   Purchase of equipment (CapEx)                 (78,000)
   Sale of old van                                 6,000
                                              ──────────
   Net cash from investing                       (72,000)

CASH FLOWS FROM FINANCING ACTIVITIES
   Proceeds from bank loan                        50,000
   Repayment of long-term debt                   (40,000)
   Owner distributions                           (60,000)
                                              ──────────
   Net cash from financing                       (50,000)
                                              ──────────
NET INCREASE IN CASH                              93,750
Cash at beginning of period                      120,000
                                              ──────────
CASH AT END OF PERIOD                            213,750
\`\`\`

That ending cash number must match the cash line on the balance sheet. If it doesn't, something is wrong.

## What pattern looks healthy?

- **CFO**: strongly positive — the business itself generates cash.
- **CFI**: moderately negative — investing in growth (CapEx).
- **CFF**: moderately negative — paying down debt and returning capital to owners.

If CFO is negative and CFF is positive (i.e., borrowing to keep the lights on), that is a flashing red light.`,
        },
        {
          slug: "ebitda-vs-fcf",
          title: "Earnings, EBITDA, and Free Cash Flow",
          body: `## Three different "profit" numbers

You will hear three different numbers used as "earnings" depending on who is talking. They are all useful — for different things.

| Metric | What it is | What it's good for |
| ------ | ---------- | ------------------ |
| **Net Income** | The bottom line of the income statement | GAAP profit; what flows into retained earnings |
| **EBITDA** | Earnings Before Interest, Taxes, Depreciation, & Amortization | Comparing operating performance across companies with different debt and asset bases |
| **Free Cash Flow (FCF)** | Cash from Operations − Capital Expenditures | What's actually left for the owners after running and maintaining the business |

## EBITDA — what it is and isn't

\`\`\`
EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization

       (or, equivalently, starting from Operating Income)
EBITDA = Operating Income + Depreciation + Amortization
\`\`\`

EBITDA strips out:

- **Interest** — so it's independent of how the business is financed.
- **Taxes** — so it's independent of jurisdiction and tax structure.
- **Depreciation & Amortization** — so it's independent of asset base and accounting choices.

That makes it useful for comparing the *underlying operating performance* of different businesses. Buyers use EBITDA multiples (e.g., "the business sold for 6× EBITDA") because it normalizes for those structural differences.

**The danger:** EBITDA is *not* cash flow. It ignores working capital changes and CapEx. A company that needs $500k of CapEx every year to maintain its trucks and equipment is materially different from one that doesn't, even at the same EBITDA. Charlie Munger called EBITDA "bullsh*t earnings" for exactly this reason.

## Free Cash Flow — the truest measure

\`\`\`
Free Cash Flow = Cash from Operations − Capital Expenditures
\`\`\`

This is cash genuinely available to owners, lenders, and investors after running the business *and* maintaining its asset base. It is what serious valuation work uses (the discounted-cash-flow model is built on FCF).

A variant — **FCF to equity** — also subtracts loan principal repayments to show what's actually free for the equity owners.

## Worked example

From the prior lesson:

- Net Income: $180,750
- Depreciation: $45,000
- Interest expense: $28,000
- Tax expense: $60,250
- Cash from Operations: $215,750
- CapEx: $78,000

\`\`\`
EBITDA = 180,750 + 28,000 + 60,250 + 45,000 = 314,000
FCF    = 215,750 − 78,000 = 137,750
\`\`\`

EBITDA looks twice as big as FCF — a *huge* spread. The cause is the $78k of CapEx and the working-capital changes baked into operating cash flow. That spread is the kind of thing a smart owner wants to understand before celebrating an EBITDA number.

## Which one matters when

- **Bank covenants** — usually written against EBITDA.
- **Sale price of a small business** — usually a multiple of EBITDA (or "Seller's Discretionary Earnings," a related concept).
- **Dividend / distribution capacity** — driven by FCF, not EBITDA.
- **Tax** — driven by Net Income.
- **Owner's *take-home capacity*** — FCF, full stop.

Track all three. Don't let anyone — including yourself — use EBITDA as a proxy for cash without understanding what it leaves out.`,
        },
      ],
      quiz: [
        { id: "q1", type: "mcq", prompt: "Buying a $50,000 service van for cash appears in which section of the cash flow statement?", choices: ["Operating", "Investing", "Financing", "It doesn't appear"], answer: "1", explanation: "CapEx is in the Investing section. Operating is day-to-day; Financing is loans and owner activity." },
        { id: "q2", type: "mcq", prompt: "Under the indirect method, depreciation is:", choices: ["Subtracted from net income", "Added back to net income", "Ignored", "Recorded in financing"], answer: "1", explanation: "Depreciation reduced net income but didn't reduce cash, so it's added back in computing operating cash flow." },
        { id: "q3", type: "mcq", prompt: "An INCREASE in Accounts Receivable, in the operating section, is:", choices: ["Added to net income", "Subtracted from net income", "Recorded in investing", "Recorded in financing"], answer: "1", explanation: "Higher AR means more revenue went uncollected — that's cash you didn't get, so subtract it." },
        { id: "q4", type: "numeric", prompt: "Net Income $200k; Interest $30k; Taxes $50k; Depreciation $40k. EBITDA = ?", answer: 320000, tolerance: 1, explanation: "EBITDA = 200 + 30 + 50 + 40 = 320." },
        { id: "q5", type: "numeric", prompt: "Cash from Operations $250k; CapEx $80k. Free Cash Flow = ?", answer: 170000, tolerance: 1, explanation: "FCF = CFO − CapEx = 250 − 80 = 170." },
        { id: "q6", type: "mcq", prompt: "Which is the BIGGEST risk of relying on EBITDA?", choices: ["It includes one-time gains", "It ignores CapEx and working capital — so it overstates true cash", "It's not used by banks", "It can't be calculated for service businesses"], answer: "1", explanation: "EBITDA ignores the cash needed to maintain assets and fund growth. Heavy-CapEx businesses look much better on EBITDA than on FCF." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch6-statement-analysis",
      number: 6,
      title: "Financial Statement Analysis",
      summary: "Vertical, horizontal, common-size, and trend analysis — and which lines actually matter for an integrator-style services business.",
      built: true,
      lessons: [
        {
          slug: "vertical-horizontal",
          title: "Vertical vs. Horizontal Analysis",
          body: `## The two lenses on financial statements

Every financial statement can be read two ways:

**Vertical analysis** focuses on relationships *among accounts at a single point in time*. Each line is expressed as a percentage of a base figure — for the income statement, the base is **Sales**; for the balance sheet, the base is **Total Assets**. The result is a **common-sized statement**.

**Horizontal analysis** examines *changes over time* between years, expressed in both dollars and percentages.

## Calculating change

The dollar change is straightforward:

\`\`\`
Dollar change = Current year figure − Base year figure
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
        {
          slug: "owner-key-lines",
          title: "Putting Analysis to Work for a Small-Business Owner",
          body: `## The five lines that matter most

In a services business (integrator, contractor, agency), most of the diagnostic value is in just five lines. Track these monthly and you will catch 90% of problems early.

### 1. Revenue growth %
Month-over-month and trailing-twelve-months. Sustained growth >0% with stable seasonality is what you want. A surprise drop is your first signal.

### 2. Gross margin %
\`Gross Profit ÷ Revenue\`. For most service/install businesses this should be 35–55%. *Falling* gross margin means rising materials cost, more discounting, or scope creep on jobs — fix it before SG&A swallows the difference.

### 3. SG&A as % of revenue
\`Selling, General & Admin ÷ Revenue\`. Should be flat or falling as you scale (operating leverage). If it's rising while revenue grows, you're hiring overhead faster than you're growing.

### 4. Days Sales Outstanding (DSO)
\`(AR ÷ Revenue) × 365\`. How many days of revenue is sitting in unpaid invoices. Target depends on industry but for net-30 terms, DSO under 45 is healthy. Over 60 means your billing or collections is broken.

### 5. Cash on hand in months of operating expense
\`Cash ÷ (monthly operating expenses)\`. Three months is the floor for a healthy small business; six is where you want to be. Less than one month means you are one bad week from layoffs.

## The 15-minute monthly review

Every month, before you do anything else with the financials:

1. Pull a vertical/common-size income statement.
2. Compare each major line's % of revenue against the prior 6 months.
3. Anything that moved more than 2 percentage points — investigate.
4. Compute the five lines above and put them on one row of a spreadsheet.
5. Trend the five lines visually — that one chart is your dashboard.

That is what a fractional CFO would do for you. The discipline is more important than the sophistication.`,
        },
      ],
      quiz: [
        { id: "q1", type: "mcq", prompt: "Vertical analysis is best described as…", choices: ["Comparing this year's numbers to last year's", "Expressing each line as a % of a base figure on the same statement", "Forecasting future cash flows", "Reconciling cash to the bank statement"], answer: "1", explanation: "Vertical analysis is a single-period snapshot expressing each line as a percentage of a base (sales for income; total assets for balance sheet)." },
        { id: "q2", type: "numeric", prompt: "Sales rose from $200,000 to $260,000. What is the % change? (enter as a number, e.g. 30 for 30%)", answer: 30, tolerance: 0.5, explanation: "(260,000 − 200,000) / 200,000 = 0.30 = 30%." },
        { id: "q3", type: "mcq", prompt: "On a common-size income statement, the base figure is:", choices: ["Net Income", "Total Assets", "Sales", "Equity"], answer: "2", explanation: "Income statement common-sizing uses Sales as the base." },
        { id: "q4", type: "numeric", prompt: "AR = $90,000; Annual Revenue = $720,000. Days Sales Outstanding = ?", answer: 45.625, tolerance: 1, explanation: "DSO = (AR / Revenue) × 365 = (90,000/720,000) × 365 ≈ 45.6 days." },
        { id: "q5", type: "mcq", prompt: "If gross margin is falling while revenue is rising, the most likely cause is:", choices: ["Reduced advertising", "Higher materials cost or discounting on new work", "Lower depreciation", "Higher tax rate"], answer: "1", explanation: "Gross margin = (Revenue − COGS)/Revenue. Pressure on COGS or selling price is what moves it." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch7-ratio-analysis",
      number: 7,
      title: "Ratio Analysis",
      summary: "Activity, profitability, market, liquidity, and solvency ratios — what they mean and when to use them.",
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
        {
          slug: "liquidity-solvency",
          title: "Liquidity & Solvency Ratios",
          body: `## Liquidity ratios — can you pay your bills?

Liquidity ratios measure short-term financial health: can the company meet obligations coming due within the next year?

### Current Ratio
\`\`\`
Current Ratio = Current Assets ÷ Current Liabilities
\`\`\`

> 1.0 means current assets cover current liabilities. 1.5–2.0 is generally healthy. Below 1.0 is a flashing yellow light. Wildly above 3.0 may mean cash is being hoarded instead of deployed.

### Quick Ratio (Acid Test)
\`\`\`
Quick Ratio = (Cash + Marketable Securities + AR) ÷ Current Liabilities
\`\`\`

Same idea but excludes inventory (which can be slow to convert). For an inventory-heavy business this is the more honest measure. > 1.0 is healthy.

### Worked example

From Chapter 2's TCL Integrators:
- Current Assets: 396,500
- Current Liabilities: 219,000
- Cash + AR: 85,000 + 210,000 = 295,000

\`\`\`
Current Ratio = 396,500 / 219,000 = 1.81
Quick Ratio   = 295,000 / 219,000 = 1.35
\`\`\`

Both healthy. The gap (1.81 vs 1.35) tells you a meaningful chunk of current assets is in inventory.

## Solvency ratios — can you survive long-term?

Solvency ratios measure how the company is *financed* and whether the debt load is sustainable.

### Debt-to-Equity
\`\`\`
Debt-to-Equity = Total Liabilities ÷ Total Equity
\`\`\`

Tells you how much of every $1 of equity is matched by $X of debt. Industry-dependent — utilities run >2.0; software companies run <0.5. For a services business, 0.5–1.5 is typical.

### Times Interest Earned (Interest Coverage)
\`\`\`
Interest Coverage = EBIT ÷ Interest Expense
\`\`\`

How many times over the operating profit covers the interest bill. Below 2.0 is dangerous; above 4.0 is comfortable. Lenders watch this number closely — it is a common loan covenant.

### Worked example

EBIT = $265,000; Interest Expense = $28,000.

\`\`\`
Interest Coverage = 265,000 / 28,000 = 9.5×
\`\`\`

Operating profit covers interest 9.5 times over. The company has plenty of room.

## Putting the ratios together

No single ratio tells the whole story. A small business should track at minimum:

| Health dimension | Ratio | Target (typical) |
| ---------------- | ----- | ---------------- |
| Short-term liquidity | Current Ratio | > 1.5 |
| Stricter liquidity | Quick Ratio | > 1.0 |
| Leverage | Debt / Equity | < 1.5 |
| Debt safety | Interest Coverage | > 4× |
| Collection speed | Days Sales Outstanding | < 45 |
| Profitability | Gross / Operating / Net Margin | trended monthly |

Watch the *trend* more than the *level*. A current ratio drifting from 2.0 down to 1.2 over six months is far more informative than a single snapshot at any value.`,
        },
      ],
      quiz: [
        { id: "q1", type: "numeric", prompt: "Sales on account $120,000; average AR $15,000. AR turnover = ?", answer: 8, tolerance: 0.1, explanation: "120,000 / 15,000 = 8 times." },
        { id: "q2", type: "numeric", prompt: "Inventory turnover is 5. Average sale period in days = ?", answer: 73, tolerance: 1, explanation: "365 / 5 = 73 days." },
        { id: "q3", type: "mcq", prompt: "Which ROE driver does NOT appear in the DuPont equation?", choices: ["Net profit margin", "Asset turnover", "Equity multiplier", "Current ratio"], answer: "3", explanation: "DuPont = margin × turnover × leverage (equity multiplier). The current ratio is a liquidity measure." },
        { id: "q4", type: "numeric", prompt: "Current Assets $300,000; Current Liabilities $150,000. Current ratio = ?", answer: 2, tolerance: 0.05, explanation: "300,000 / 150,000 = 2.0." },
        { id: "q5", type: "numeric", prompt: "EBIT $80,000; Interest Expense $20,000. Interest Coverage = ?", answer: 4, tolerance: 0.1, explanation: "80,000 / 20,000 = 4 times." },
        { id: "q6", type: "mcq", prompt: "The Quick Ratio differs from the Current Ratio by:", choices: ["Adding goodwill", "Excluding inventory", "Excluding cash", "Including long-term debt"], answer: "1", explanation: "Quick ratio strips out inventory (and prepaid expenses) — the less-liquid current assets." },
      ],
    },
    // ─────────────────────────────────────────────────────────────────────
    {
      slug: "ch8-managerial-performance",
      number: 8,
      title: "Managerial Accounting & Performance Measurement",
      summary: "ROI, Residual Income, MCE & the Balanced Scorecard, plus CVP and break-even — the managerial counterpart to financial accounting.",
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
        {
          slug: "cvp-break-even",
          title: "CVP & Break-Even Analysis",
          widget: "break-even",
          body: `## Cost-Volume-Profit (CVP) analysis

CVP analysis answers the question: **how many units (or dollars of revenue) do we need to sell to cover costs and start making a profit?** It is the most-used managerial accounting tool in small business.

## Fixed vs. variable costs

The starting point is splitting every cost into two buckets:

- **Variable costs** — change in proportion to sales volume. Materials, sales commissions, hourly install labor, credit card fees.
- **Fixed costs** — stay constant regardless of volume (within a relevant range). Rent, salaried staff, insurance, software subscriptions, depreciation.

## Contribution margin

\`\`\`
Contribution Margin per unit = Selling Price − Variable Cost per unit

Contribution Margin Ratio    = Contribution Margin ÷ Selling Price
                             = (Sales − Variable Costs) ÷ Sales
\`\`\`

Contribution margin is the dollars (or %) from each sale that goes to cover fixed costs and then become profit.

## The break-even formulas

\`\`\`
Break-Even (units)   = Fixed Costs ÷ Contribution Margin per unit

Break-Even ($ sales) = Fixed Costs ÷ Contribution Margin Ratio
\`\`\`

### Worked example — units

Smart-home control unit sells for $1,200; variable cost per unit = $700; monthly fixed costs = $40,000.

- Contribution Margin per unit = 1,200 − 700 = **$500**
- Break-Even units = 40,000 ÷ 500 = **80 units / month**

The company must sell 80 units before it starts making a profit. Unit 81 generates $500 of operating profit; unit 82 another $500; and so on.

### Worked example — dollars

A services business has variable costs that average 60% of revenue and monthly fixed costs of $36,000.

- Contribution Margin Ratio = 1 − 0.60 = **0.40**
- Break-Even $ Sales = 36,000 ÷ 0.40 = **$90,000 / month**

## Target profit

To find the sales needed to achieve a *target* profit:

\`\`\`
Target Sales (units) = (Fixed Costs + Target Profit) ÷ CM per unit
Target Sales ($)     = (Fixed Costs + Target Profit) ÷ CM Ratio
\`\`\`

### Example
Same services business, target profit $20,000/month:

- Required sales = (36,000 + 20,000) ÷ 0.40 = **$140,000 / month**

## Margin of safety

\`\`\`
Margin of Safety = Actual Sales − Break-Even Sales
% Margin of Safety = Margin of Safety ÷ Actual Sales
\`\`\`

How far sales can drop before the company starts losing money. A 30% margin of safety means revenue can fall 30% before red ink appears.

## Why this is the most useful tool

CVP gives an owner a real, actionable answer to questions like:

- *Can we afford to hire one more salaried employee?* (How much does break-even rise?)
- *Should we cut prices 10% to win a bid?* (What happens to CM ratio and required volume?)
- *What's the impact of switching subs to in-house?* (Variable costs become fixed.)

Use the calculator below to play with the numbers.`,
        },
      ],
      quiz: [
        { id: "q1", type: "numeric", prompt: "NOI = 540,000; AOA = 3,000,000. ROI as a percent (e.g. 18 for 18%) = ?", answer: 18, tolerance: 0.1, explanation: "540,000 / 3,000,000 = 0.18 = 18%." },
        { id: "q2", type: "numeric", prompt: "NOI = 42,000; AOA = 300,000; min required return = 12%. Residual Income $ = ?", answer: 6000, tolerance: 1, explanation: "42,000 − (300,000 × 0.12) = 42,000 − 36,000 = 6,000." },
        { id: "q3", type: "mcq", prompt: "Which time component adds value to the product?", choices: ["Queue", "Move", "Process", "Inspection"], answer: "2", explanation: "Only process time adds value. The rest is non-value-added waste." },
        { id: "q4", type: "numeric", prompt: "Selling price $200; variable cost $120; fixed costs $24,000/month. Break-even in units = ?", answer: 300, tolerance: 1, explanation: "CM = 80. BE = 24,000 / 80 = 300 units." },
        { id: "q5", type: "numeric", prompt: "Variable costs are 70% of revenue; fixed costs $30,000. Break-even $ sales = ?", answer: 100000, tolerance: 100, explanation: "CM ratio = 0.30. BE = 30,000 / 0.30 = 100,000." },
        { id: "q6", type: "mcq", prompt: "A manager evaluated only on ROI is most likely to:", choices: ["Accept any project above the cost of capital", "Reject a profitable project that would lower their average ROI", "Always pursue growth", "Build the lowest-cost product"], answer: "1", explanation: "ROI-only evaluation creates an incentive to reject good projects that drag down the average — exactly what Residual Income corrects." },
      ],
    },
  ],
  finalExam: [
    { id: "fe1", type: "mcq", prompt: "Who writes GAAP in the U.S.?", choices: ["SEC", "FASB", "IRS", "PCAOB"], answer: "1", explanation: "FASB writes GAAP; the SEC requires it for public companies." },
    { id: "fe2", type: "mcq", prompt: "The accounting equation is:", choices: ["Revenue − Expenses = Profit", "Assets = Liabilities + Equity", "Cash = Profit", "Equity = Assets + Liabilities"], answer: "1", explanation: "Assets = Liabilities + Equity is the foundation of every balance sheet." },
    { id: "fe3", type: "mcq", prompt: "Which has a normal CREDIT balance?", choices: ["Cash", "Inventory", "Accounts Payable", "Cost of Goods Sold"], answer: "2", explanation: "Liabilities (like AP) have normal credit balances. Assets and expenses have normal debit balances." },
    { id: "fe4", type: "mcq", prompt: "Under accrual accounting, revenue is recognized when:", choices: ["Cash is received", "The good or service is delivered", "The contract is signed", "The customer requests an invoice"], answer: "1", explanation: "Accrual recognizes revenue when earned — typically at delivery — not when cash moves." },
    { id: "fe5", type: "mcq", prompt: "Buying a service van for cash appears in which cash-flow section?", choices: ["Operating", "Investing", "Financing", "Equity"], answer: "1", explanation: "CapEx is an Investing activity." },
    { id: "fe6", type: "mcq", prompt: "Residual Income equals…", choices: ["NOI ÷ AOA", "NOI − (AOA × min rate)", "Sales ÷ AOA", "Margin × Turnover"], answer: "1", explanation: "RI = NOI minus the dollar minimum required return on operating assets." },
    { id: "fe7", type: "numeric", prompt: "Assets $700,000; Liabilities $420,000. Equity = ?", answer: 280000, tolerance: 1, explanation: "Equity = Assets − Liabilities = 700,000 − 420,000 = 280,000." },
    { id: "fe8", type: "numeric", prompt: "Revenue $1,000,000; COGS $600,000; Operating expenses $250,000. Operating margin (%) = ?", answer: 15, tolerance: 0.5, explanation: "Operating Income = 1,000 − 600 − 250 = 150. Margin = 150/1,000 = 15%." },
    { id: "fe9", type: "numeric", prompt: "Net Income $120k; Interest $20k; Taxes $30k; Depreciation $40k. EBITDA = ?", answer: 210000, tolerance: 1, explanation: "EBITDA = NI + Int + Tax + D&A = 120 + 20 + 30 + 40 = 210." },
    { id: "fe10", type: "numeric", prompt: "AR turnover = 7.3. Average collection period (days) = ?", answer: 50, tolerance: 1, explanation: "365 / 7.3 ≈ 50 days." },
    { id: "fe11", type: "numeric", prompt: "Selling price $150; variable cost $90; fixed costs $24,000. Break-even units = ?", answer: 400, tolerance: 1, explanation: "CM = 60. BE = 24,000/60 = 400 units." },
    { id: "fe12", type: "short", prompt: "In one word: what kind of accounting is used for INTERNAL management decisions?", answer: "managerial", explanation: "Managerial accounting is internal, flexible, and decision-oriented — the counterpart to financial (external, GAAP-bound) accounting." },
  ],
};
