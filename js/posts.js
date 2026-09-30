/* ============================================================
   Muskan Gupta — Insights (blog) data
   Source: LinkedIn posts. Edit freely; the site renders this list.
   Body markup: blank line = new block · "- " bullet · "1. " numbered
   · "> " pull quote · "## " sub-heading · **bold**
   ============================================================ */
window.CATEGORIES = {
  climate:    { label: 'Climate Risk',            short: 'Climate' },
  disclosure: { label: 'Disclosure & Regulation', short: 'Disclosure' },
  nature:     { label: 'Nature & Biodiversity',   short: 'Nature' },
  netzero:    { label: 'Net Zero & Supply Chain', short: 'Net Zero' },
  strategy:   { label: 'Strategy & Governance',   short: 'Strategy' },
  community:  { label: 'Community',               short: 'Community' }
};

window.POSTS = [
{
  id: 'ecb-climate-factor-collateral',
  explainer: 'collateral',
  takeaways: [
    'The ECB now adjusts the collateral value of corporate bonds for climate transition risk, using forward-looking scenario analysis rather than historical data.',
    'The methodology weighs sector exposure, company transition plans, disclosure quality and asset-level vulnerability, not just emissions.',
    'Disclosure quality and transition credibility are becoming pricing inputs that shape access to capital and the cost of finance.',
  ],
  title: 'Climate Risk Is Now a Collateral Question',
  deck: 'What the ECB’s new “climate factor” signals about where financial markets are headed.',
  hook: 'Climate risk is no longer just a disclosure issue. It’s starting to influence the value of financial assets.',
  cat: 'climate',
  tags: ['Climate Finance', 'Transition Risk', 'IFRS S2', 'Central Banks', 'Scenario Analysis'],
  date: '2026-07',
  reactions: 18, comments: 0, reposts: 3,
  source: 'Commenting on ESG Today: “ECB Begins Applying Climate Risk Factors in Collateral Framework”',
  body: `Climate risk is no longer just a disclosure issue. It’s starting to influence the value of financial assets.

The European Central Bank’s latest move is a strong signal of where financial markets are headed.

By introducing a “climate factor” into its collateral framework, the ECB can now adjust the value of corporate bonds pledged by banks based on their exposure to climate transition risk.

In simple terms, companies that are more exposed to transition risks, or that have weaker climate disclosures and transition plans, could see those assets receive a lower valuation as collateral.

What’s particularly interesting is how the ECB is approaching this.

Instead of relying only on historical data, it is using forward-looking climate scenario analysis to assess transition risk. That’s a significant shift, because climate change is inherently forward-looking. Past performance alone cannot capture future policy changes, technological disruption, or changing market preferences.

The methodology also goes beyond emissions. It considers:

- Transition exposure by sector
- Company-level emissions and transition plans
- Quality of climate-related disclosures
- Asset-level vulnerability

This reinforces an important message for companies: climate reporting is becoming more than a compliance exercise.

The quality of your climate disclosures, the credibility of your transition strategy, and your preparedness for climate-related risks are increasingly becoming financial considerations.

With the Bank of England moving in a similar direction, it’s clear that central banks are beginning to integrate climate risk into the core of financial risk management, not just sustainability reporting.

The question is no longer whether climate risk matters.

> The real question is: is your organization prepared for a world where climate risk influences access to capital and the cost of finance?`
},
{
  id: 'asset-level-ask-to-see-the-map',
  explainer: 'maplens',
  takeaways: [
    '“Asset-level” is often used for assessments built on regional or country averages.',
    'Three questions expose the difference: can I see the hazard maps, what is the spatial resolution, and how was exposure assessed?',
    'Transparency about method builds more stakeholder confidence than the final risk score does.',
  ],
  title: '“Asset-Level” Climate Risk? Ask to See the Map',
  deck: 'Not every assessment described as asset-level is actually done at the asset level. The methodology matters as much as the score.',
  hook: 'The term “asset-level assessment” gets used very often, but not all assessments are actually done at the asset level.',
  cat: 'climate',
  tags: ['Physical Risk', 'Asset-Level Data', 'Climate Resilience', 'IFRS S2'],
  date: '2026-07',
  reactions: 7, comments: 0, reposts: 1,
  source: 'In response to Elena Maksimovich, PhD, on why “no maps” is a red flag in asset-level climate risk',
  body: `This is exactly what I was trying to say in my last post.

I’ve seen this quite a bit while working on climate risk assessments. The term “asset-level assessment” gets used very often, but not all assessments are actually done at the asset level.

I’ve also come across cases where even big names and experienced consultants present regional or country-level averages as asset-level climate risk. That’s why understanding the underlying methodology is just as important as looking at the final risk score.

As climate risk assessments become more important for business decisions and disclosures, I think it’s worth asking a few basic questions:

- Can I see the hazard maps for my asset?
- What is the spatial resolution of the data?
- How was the asset’s exposure assessed?

This isn’t about saying one approach is right or wrong. Different assessments serve different purposes.

But if something is described as an asset-level climate risk assessment, it’s important that the methodology reflects that.

> The more transparent we are about how these assessments are carried out, the more confidence clients and stakeholders will have in the results.`
},
{
  id: 'the-resolution-gap',
  explainer: 'resolution',
  takeaways: [
    'Most physical risk scores rest on 10–50 km climate-model grid cells that cannot separate a floodplain from higher ground 800 m away.',
    'Disclosure-grade climate data is being used for underwriting-grade lending and investment decisions.',
    'Sub-100 m platforms already exist; what is missing is institutional adoption for credit, insurance and capital allocation.',
  ],
  title: 'The Resolution Gap',
  deck: 'Why a 25 km grid cell can’t tell you whether the facility you just financed sits above or below the flood line.',
  hook: 'A bank can run scenario analysis across 10,000 assets, produce a 40-page TCFD/IFRS S2 report, and still not know whether the facility it just financed sits above or below a flood line.',
  cat: 'climate',
  tags: ['Physical Risk', 'Spatial Resolution', 'IFRS S2', 'Climate Data', 'Credit Risk'],
  date: '2026-07',
  reactions: 42, comments: 5, reposts: 1,
  featured: true,
  body: `A bank can run scenario analysis across 10,000 assets, produce a 40-page TCFD/IFRS S2 report, and still not know whether the facility it just financed sits above or below a flood line.

That’s not a data gap. It’s a resolution gap.

Next time a climate risk score lands in your credit committee, ask one question: what’s the grid cell size behind it? 10 km? 25 km? 50 km?

Most people in that room won’t know. And that single number determines whether the score is useful or decorative.

Most physical climate risk assessments rely on global climate models with grid cells ranging from 10 to 50 km. These outputs are then combined with regional damage functions and presented as “asset-level” climate risk.

But they aren’t truly asset-level.

- A 25 km grid cell cannot distinguish whether a facility is located in a floodplain or on higher ground just 800 metres away.
- Likewise, a regional heat stress score cannot differentiate between an inland site and a naturally cooler coastal location.

The Bank of England captured this challenge well: asset-level financial risk assessment requires much finer spatial granularity than macro climate scenarios typically provide.

> In many cases, we’re using disclosure-grade climate data to make underwriting-grade decisions. That is the real gap.

The encouraging part is that the technology already exists to bridge it. Some of the leading platforms include:

- **Climate Risk Project** – roughly 900 m resolution across all hazards, 25+ perils, global coverage, historical data from 1980 through projections to 2100, and flood data modelled at 10 m. Asset-level intelligence without an enterprise contract, accessible to consultants and market practitioners.
- **Jupiter Intelligence** – 90 m resolution flood data, 22.3 billion locations covered globally, 9 perils, projections to 2100, with built-in adaptation ROI modelling that quantifies avoided losses and CapEx returns. Built for large banks and institutions with in-house analytical teams.
- **XDI** – Engineering-based physical risk modelling with asset-component analysis. Best for infrastructure-heavy portfolios and central bank stress tests.
- **Climate X** – Asset-level physical risk assessment combined with adaptation ROI modelling, supporting TCFD, IFRS S2, and adaptation finance.

The data exists. The tools exist. What’s still missing is the institutional shift from using climate data solely for disclosure to using it for investment, lending, insurance, and risk management decisions.

The next time a physical climate risk score appears on a slide, don’t just ask “What is the risk?” Ask “What is the grid cell size behind that number?”

That answer may tell you more than the score itself.`
},
{
  id: 'sbti-v2-era-of-implementation',
  explainer: 'hierarchy',
  takeaways: [
    'V2 introduces a hierarchy: direct value-chain engagement first, collaborative initiatives second, sector-wide decarbonization where structural constraints exist.',
    'It formally recognises that airlines, food companies and others cannot build markets or transform supply sheds alone.',
    'The strategic question shifts from “what can we control” to “how do we decarbonize the systems we depend on”.',
  ],
  title: 'SBTi Net-Zero Standard V2: The Era of Implementation Has Begun',
  deck: 'The proposed standard finally acknowledges a reality sustainability teams have wrestled with for years: most emissions sit where companies have the least control.',
  hook: 'For many companies, the majority of emissions sit in Scope 3. Yet they are expected to reduce emissions they often do not directly control.',
  cat: 'netzero',
  tags: ['SBTi', 'Net Zero', 'Scope 3', 'Supply Chain', 'Decarbonization'],
  date: '2026-06',
  reactions: 16, comments: 1, reposts: 0,
  body: `A few weeks ago, I wrote about how supply chains are perhaps the biggest challenge in sustainability.

And that is why I find the proposed SBTi Corporate Net-Zero Standard V2 so significant.

For many companies, the majority of emissions sit in Scope 3. Yet they are expected to reduce emissions they often do not directly control.

For example, an airline cannot create a sustainable aviation fuel market on its own, and a food company cannot transform agricultural practices across thousands of farms overnight. Yet these are often the emissions that matter most.

That is why SBTi V2 stands out. It acknowledges a reality that sustainability professionals have been grappling with for years.

What I find particularly interesting is the hierarchy of action embedded within the proposed standard.

1. **First, companies should focus on direct engagement.** Work with suppliers. Engage customers. Improve procurement practices. Support renewable energy adoption. Drive emissions reductions where influence is strongest. This remains the preferred pathway.
2. **Second, companies can support broader value-chain initiatives.** This includes collaborative efforts within sourcing regions, agricultural landscapes, commodity supply sheds, or industry-led programs that accelerate emissions reductions.
3. **Third, where structural constraints exist, companies may support sector-wide decarbonization.** And this, in my view, is the most important shift.

The proposed standard recognizes that some sectors face barriers that individual companies cannot overcome alone. In many cases, technology is still scaling, infrastructure is limited, supply is constrained, or markets are not yet mature. These are what SBTi refers to as “structural constraints.”

The framework acknowledges that where such constraints exist, companies may need to contribute to broader sector-level solutions alongside direct value-chain action. Importantly, this does not replace the expectation to reduce emissions directly wherever possible. It complements it.

Another notable development is the recognition that certain “high-integrity mitigation projects” may support climate action under defined conditions.

For me, the biggest takeaway is not about accounting methodologies, certificates, or project eligibility. It is about a fundamental shift in mindset.

For years, companies have asked: “What emissions can we directly control?” The more important question may now be: “How can we help decarbonize the systems, sectors, and value chains that our business depends upon?”

That is where the next decade of climate action will be won or lost. Because climate transition extends beyond organizational boundaries.

> The era of target setting is maturing. The era of implementation has begun.`
},
{
  id: 'double-materiality-sounds-simple',
  explainer: 'materiality',
  takeaways: [
    'Assessments rarely fail by missing topics; they fail by naming too many and diluting focus.',
    'Materiality needs finance, risk, legal, procurement and operations in the room, which is harder than the scoring itself.',
    'The output is management attention, not a heat map.',
  ],
  title: 'Double Materiality Sounds Simple. Getting It Right Is Not.',
  deck: 'The methodology isn’t the hard part. The hard part is that it forces organizations to answer uncomfortable questions.',
  hook: 'One of the biggest misconceptions is that materiality assessments fail because companies miss topics. In reality, they often struggle because they identify too many.',
  cat: 'disclosure',
  tags: ['Double Materiality', 'CSRD', 'ESRS', 'Governance', 'Sustainability Reporting'],
  date: '2026-06',
  reactions: 26, comments: 1, reposts: 0,
  body: `Double materiality sounds simple. But getting it right is one of the biggest challenges in sustainability reporting today.

On paper, the concept sounds straightforward: understand the sustainability issues that matter to both your business and your stakeholders. In practice, however, double materiality is often one of the most challenging exercises an organization undertakes.

Not because the methodology is complex. But because it forces organizations to answer uncomfortable questions:

- Which impacts are significant enough to be considered material?
- How much evidence is enough to justify a materiality conclusion?
- Where should companies draw the line between an “important” issue and a “material” one?
- How should conflicting views from management, business units, and stakeholders be reconciled?
- How far into the value chain should organizations look when assessing impacts, risks, and opportunities?
- What happens when stakeholder expectations point in one direction while business priorities point in another?

One of the biggest misconceptions is that materiality assessments fail because companies miss topics. In reality, they often struggle because they identify too many. The fear of excluding an issue frequently results in lengthy material topic lists that dilute focus and make strategic prioritization difficult.

Another challenge is data. Many organizations are expected to assess impacts and risks across complex global value chains despite limited visibility into suppliers, customers, contractors, and indirect business relationships.

Then comes the challenge of governance. Materiality is not purely a sustainability decision. It requires input from finance, risk, legal, procurement, HR, operations, strategy, and leadership teams. Achieving alignment across these functions is often far more difficult than the assessment itself.

And perhaps the biggest challenge of all: organizations frequently treat double materiality as a reporting exercise rather than a business exercise.

The objective is not to create a heat map. The objective is to understand where the business creates its most significant impacts, where sustainability-related risks and opportunities exist, and where management attention should be directed.

The strongest double materiality assessments are rarely the most complex. They are the ones built on sound judgment, robust stakeholder engagement, credible evidence, and the courage to make difficult prioritization decisions.

> Materiality is not about documenting everything. It is about identifying what truly matters.`
},
{
  id: 'esg-for-the-business-with-no-investors',
  explainer: 'exposure',
  takeaways: [
    'Listed customers push ESG obligations upstream, so private suppliers are being scored without ever being told.',
    'Brand, talent and regulatory exposure are at stake even without shareholders or mandatory reporting.',
    'ESG protects the market, brand and people a business has already built; it was never only an investor conversation.',
  ],
  title: '“Why Should We?” ESG for the Business With No Investors to Answer To',
  deck: 'A private company with no shareholders, no ratings and no mandatory reporting asked why it should move faster on ESG. Here is what I would have said.',
  hook: 'You don’t need ESG to raise money. You need ESG to keep what you’ve already built.',
  cat: 'strategy',
  tags: ['ESG Strategy', 'Business Resilience', 'Supply Chain', 'Corporate Governance', 'Leadership'],
  date: '2026-06',
  reactions: 15, comments: 0, reposts: 0,
  body: `Last week, someone told me about a conversation they had with the owner of a large, successful business.

At one point, they asked: “You are a big name. ESG really matters now. Why are you not moving faster on it?”

The owner was honest. “We do what the law requires. We have no investors to answer to, no obligations beyond compliance. So honestly, why should we?”

When they told me the story, they asked for my view. Because on paper, the owner had a point. No investors. No mandatory ESG reporting. No ratings to protect. Legally, nothing was forcing their hand.

And I found myself thinking about what I would have said. Probably this:

> You don’t need ESG to raise money. You need ESG to keep what you’ve already built.

Your biggest customers, the hotels, the corporates, the export partners, are publicly listed. Their ESG obligations are now flowing upstream into their supply chains. You are already getting scored by people who will never tell you they’re scoring you. When they quietly drop you for a more compliant supplier, you won’t get a warning. You’ll just lose the contract.

Your brand has taken decades to build. One regulatory notice, one greenwashing complaint, one viral story can undo in 72 hours what took 30 years to create.

Your best people are watching what this company stands for. Not loudly. But quietly, in the decisions they make about whether to stay or go.

And regulations such as CSRD, supply-chain due diligence laws, carbon-border reporting requirements, and emerging sustainability disclosure frameworks are already changing how large companies select, assess, and manage suppliers. Those expectations are moving through supply chains far faster than many private businesses realise.

The question isn’t whether ESG is mandatory for you today. The question is whether you can afford to wait until it is.

That’s when something became clear to me.

For years, we’ve framed ESG as an investor conversation. We’ve talked about ratings, disclosures, shareholder expectations, and access to capital because those were the loudest voices in the room. In doing so, we may have unintentionally convinced many privately held businesses that ESG is somebody else’s problem.

It is not. ESG is not about who owns your shares. It is about whether you will still own your market, your brand, and your people in ten years.

Every business has something to lose. And every business has something worth protecting. That is reason enough.`
},
{
  id: 'slide-deck-vs-balance-sheet',
  explainer: 'funnel',
  takeaways: [
    '88% of S&P 500 firms disclose climate governance, yet only 27% have a transition plan and 11% align capex to it.',
    'The gap persists because sustainability, finance, operations and the board work in separate rooms.',
    'Fix it by pricing climate risk in the CFO’s register, giving transition plans a budget line and making governance cross-functional.',
  ],
  title: 'The Gap Between the Slide Deck and the Balance Sheet',
  deck: 'Nine in ten large companies can say who owns climate risk. Fewer than three in ten can say what they will do about it, or what it costs.',
  hook: '88% of S&P 500 companies now disclose how they govern climate risk. But only 27% have an actual transition plan.',
  cat: 'strategy',
  tags: ['Transition Plans', 'Climate Governance', 'CFO Agenda', 'ISSB', 'Capital Allocation'],
  date: '2026-06',
  reactions: 14, comments: 2, reposts: 0,
  body: `Most companies know they have a climate problem. Very few are actually doing anything about it. And the numbers prove it.

The State of Corporate Sustainability Disclosure 2025 found that 88% of S&P 500 companies now disclose how they govern climate risk. But only 27% have an actual transition plan.

Nearly 9 in 10 companies can tell you who is responsible for climate risk. But less than 3 in 10 can tell you what they are specifically going to do about it.

It gets worse.

A 2025 study by the London School of Economics analysed over 2,000 publicly listed companies across high-emitting sectors. It found that 98% have not disclosed any plan to shift their spending away from carbon-intensive assets, and only 17% can tell you what climate risk will actually cost them.

The rest assess the risk; they just don’t quantify it. Which means boards and investors are reading climate disclosures with no price tag attached.

And only 11% of companies disclose capital expenditure that is actually aligned with their transition strategy. The rest have targets without budgets. Goals without money behind them.

> This is the real climate crisis inside business right now. Not a lack of awareness. Not a lack of frameworks. A gap between the slide deck and the balance sheet.

So why is the gap still so wide? Because disclosure and strategy live in different rooms.

The sustainability team writes the report. The CFO owns the budget. The operations team runs the supply chain. The board signs off on risk. And almost nobody is sitting in a room together, connecting the dots.

Only 22.9% of companies have board-level oversight specifically for their climate transition plans. Only 7% of board directors globally have any environmental expertise at all. You cannot implement what your leadership does not understand. And you cannot fund what is not on the balance sheet.

## What actually needs to change?

**First, climate risk needs to move out of the sustainability report and into the CFO’s risk register, with actual numbers.** What does a 2°C scenario cost this business? What does a flood in our key supplier region do to our margins? If it has no price, it has no urgency.

**Second, transition plans need a budget line.** A net-zero commitment without capital allocation is a press release, not a strategy. The companies pulling ahead are the ones where the sustainability roadmap and the finance roadmap are the same document.

**Third, governance has to be cross-functional.** When sustainability sits in one silo and operations sits in another, nothing changes at scale. The companies making real progress have climate embedded in procurement decisions, product design, hiring, and capital planning, not just in the annual report.

The frameworks are there. TCFD, ISSB, CSRD, SBTi: the guidance exists. What is missing is not knowledge. It is internal wiring.

Disclosure was always supposed to be the beginning of the conversation. Not the end of it.`
},
{
  id: 'judging-cosenco-sbsc',
  explainer: 'rubric',
  takeaways: [
    'Students framed sustainability as a business problem to solve, not a competition topic to present.',
    'Case competitions surface the research depth and pragmatism the field needs.',
    'Engaging the next cohort is part of building the profession, not a break from it.',
  ],
  title: 'Judging Cosenco: Sustainability Business Cases at Shaheed Bhagat Singh College',
  deck: 'Notes from an inter-college sustainability business case competition at the University of Delhi.',
  hook: 'What I loved the most was how naturally students were thinking beyond the obvious, not just building ideas for the sake of competition, but trying to solve meaningful problems.',
  cat: 'community',
  tags: ['Mentoring', 'Business Case', 'University of Delhi', 'Sustainability'],
  date: '2026-05',
  reactions: 81, comments: 7, reposts: 0,
  body: `Carrying forward some great energy from Shaheed Bhagat Singh College, University of Delhi.

Recently I had the privilege of being invited to judge Cosenco, an inter-college sustainability business case competition, and it turned out to be a deeply engaging experience.

What I loved the most was how naturally students were thinking beyond the obvious. They were not just building ideas for the sake of competition, but actually trying to solve meaningful problems that matter. You could see the effort, research, and heart behind every presentation.

Experiences like these are always special. They leave you feeling a little more hopeful, a little more inspired, and remind you why conversations around sustainability matter so much right now.

Big thanks to the team at Shaheed Bhagat Singh College for putting together such a well-organised and thoughtful event. Truly grateful to be a part of it.`
},
{
  id: 'every-problem-leads-to-the-supply-chain',
  explainer: 'scopes',
  takeaways: [
    'Data, transparency, regulation and reporting burden all trace back to Tier 2 and Tier 3 suppliers.',
    'Scope 3 is 70–90% of most footprints, yet only about 23% of companies have fully verified Scope 3 data.',
    'Progress means building supplier relationships and capacity, which software alone cannot deliver.',
  ],
  title: 'Every Sustainability Problem Leads Back to the Supply Chain',
  deck: 'Data, transparency, regulation, greenwashing. Follow any of them far enough and you arrive at the same place.',
  hook: 'If we call it a data problem, we invest in tools. If we call it a reporting problem, we build teams. All necessary. None sufficient on their own.',
  cat: 'netzero',
  tags: ['Scope 3', 'Supply Chain', 'Traceability', 'Due Diligence', 'Biodiversity'],
  date: '2026-05',
  reactions: 18, comments: 3, reposts: 0,
  body: `I’ve asked this question to a lot of people over the years: “What’s the biggest problem in sustainability right now?”

The answers are always data, transparency, regulation, greenwashing, poor disclosure quality. All real. All valid.

But then I ask one more thing: “Where does that problem actually live?” And almost every time, if you follow the thread far enough, you end up in the same place.

The supply chain. Every single time.

- **We say we don’t have good data.** But we can measure Scope 1. Scope 2 shows up on a utility bill. Scope 3, everything across the supply chain, is 70% to 90% of total emissions for most companies. And only about 23% of companies have fully verified Scope 3 data (CDP). That’s not just a data problem. That’s a supply chain data problem.
- **We say there’s not enough transparency.** But even today, companies often don’t have full visibility beyond their Tier 1 suppliers. Deep-tier operations, where a significant share of environmental and social risk sits, remain largely opaque. At the same time, around 50 million people are estimated to be living in modern slavery, and most of that risk exists within supply chains.
- **We say regulation is getting complicated.** But look closely at what regulation is actually targeting. CS3D, the German LkSG, CBAM, the UK Modern Slavery Act, the EU Deforestation Regulation, and so on. Almost all of them are, in different ways, asking companies to understand and take responsibility for their supply chains.
- **We say reporting is too burdensome.** But most of that burden comes from chasing Tier 2 and Tier 3 suppliers who have never tracked GHG emissions, don’t have systems in place, and often don’t even speak the same ESG language.
- **Take biodiversity.** Many companies talk about “no deforestation” or “nature positive” commitments. But the real impact isn’t happening at headquarters. It’s happening in palm oil plantations, soy farms, cattle ranches, timber sourcing regions. Several tiers down, often in geographies where traceability is weak.

And this pattern keeps repeating. Different issues. Same root.

This matters more than it seems, because how we define the problem shapes how we try to solve it.

If we call it a data problem, we invest in tools. If we call it a reporting problem, we build teams. If we call it a compliance problem, we strengthen the governance. All necessary. But none sufficient on their own.

Because the real work sits outside the organisation, in relationships that are harder to build, slower to scale, and more complex to manage. Understanding suppliers. Supporting them. Building capacity. Creating alignment.

That’s not as easy as buying software. But it’s where the change actually happens.

> So maybe the question isn’t “how do we report better?” Maybe it’s “how well do we actually understand our supply chain?”

Because once that question shifts, everything else starts to look different.`
},
{
  id: 'offsets-compensate-they-dont-manage',
  explainer: 'naturevar',
  takeaways: [
    'Offsets neutralise discrete emissions; they cannot manage correlated, portfolio-wide nature risk.',
    'One ecosystem failure hits water-intensive industry, agriculture, coastal real estate and consumer sectors at the same time.',
    'Treat nature as a core risk factor next to duration, credit and inflation, and shape blended-finance instruments to fund solutions.',
  ],
  title: 'Offsets Compensate for Risk. They Don’t Manage It.',
  deck: 'A $2.4B portfolio, $8M in nature offsets, and a CIO who believes the risk is handled. Why project-level tools cannot manage system-level exposure.',
  hook: 'A $2.4B portfolio. $8M in nature offsets. And a CIO who genuinely believes the risk is managed. It isn’t.',
  cat: 'nature',
  tags: ['TNFD', 'Nature Risk', 'Systemic Risk', 'Blended Finance', 'Institutional Investing'],
  date: '2026-04',
  reactions: 18, comments: 0, reposts: 0,
  body: `A $2.4B portfolio. $8M in nature offsets. And a CIO who genuinely believes the risk is managed.

It isn’t.

This pattern shows up again and again in institutional boardrooms. A polished ESG supplement. A dozen offset projects: mangroves in Indonesia, reforestation in the Congo Basin, kelp restoration in California. Everything audited, verified, and retired. And gradually, a sense of comfort settles in.

But here’s the uncomfortable truth.

> Offsets were never designed to manage systemic risk. They were designed to compensate for it.

The entire offset architecture, from registries to verification standards and project-level accounting, was built to neutralize specific emissions. It prices discrete units of nature. It does not capture how nature loss transmits financial risk across an entire portfolio. And those are fundamentally different problems.

When ecosystems degrade, the impact doesn’t arrive neatly. A single watershed failure can hit water-intensive industries, agricultural supply chains, coastal real estate, and consumer sectors at the same time. The shock is correlated across holdings. Offsets don’t capture that kind of interconnected risk. They don’t work that way.

This is where things break down. We are trying to manage a system-wide risk using tools built for isolated, project-level impacts. No amount of offset purchasing changes how exposed a portfolio is to ecosystem disruption. It improves disclosure optics, not underlying risk.

## So what does better integration look like?

**Start by mapping how sectors depend on ecosystem services.** Tools like ENCORE and frameworks like TNFD help structure this, but they don’t yet translate those dependencies into financial risk or connect them to existing portfolio factors. That gap still exists.

**Next, treat nature as a core risk factor.** It should sit alongside duration, credit, and inflation in how portfolios are constructed and stress-tested. Understanding how a decline in pollinators affects food sector earnings is far more meaningful than noting an offset program.

**Finally, the capital itself needs to evolve.** Nature-based solutions struggle to scale because the instruments don’t fit institutional needs; they are often too small, too illiquid, too short-term. Blended finance models, where early risk is absorbed and institutional capital can enter with clear return profiles, are essential. And that requires investors to shape the instruments, not just allocate to them.

Because at its core, this isn’t about ambition. It’s about alignment. We are trying to manage portfolio-level exposure with tools that were never built for it.

And until that changes, the risk remains exactly where it started: inside the portfolio.`
},
{
  id: 'the-leaders-tax-omnibus',
  explainer: 'omnibus',
  takeaways: [
    'The Omnibus cut CSRD scope by 80–90% and ESRS data points by about 61%.',
    'Early movers now carry the cost of systems built for a standard that was scaled back.',
    'Investor and supply-chain demand for data has not fallen, so the rules now under-serve how value chains work.',
  ],
  title: 'The Leaders’ Tax: What the Omnibus Means for CSRD Early Movers',
  deck: 'Scope narrowed, data points cut by 61%, and the companies that invested first are carrying the most weight.',
  hook: 'When the rules change this much, the people who moved first end up adjusting the most.',
  cat: 'disclosure',
  tags: ['CSRD', 'ESRS', 'Omnibus', 'IFRS S2', 'Supply Chain'],
  date: '2026-04',
  reactions: 21, comments: 3, reposts: 0,
  body: `There’s something I’ve been noticing in sustainability reporting lately. The companies that moved early, put in the effort, and tried to stay ahead of regulation seem to be carrying more weight today.

A few years back, when CSRD first came in, the signal was strong. Nearly 49,000 companies were expected to fall under its scope. That pushed businesses to act. Teams were built, systems were set up, and reporting processes started taking shape.

Then things shifted. With the EU’s Omnibus update in 2026, the scope narrowed quite a bit. It now applies to companies with more than 1,000 employees and €450 million in turnover, pushing around 80 to 90% of originally covered companies out of scope.

At the same time, ESRS data points were cut by about 61%, going from over a thousand to roughly 320. Alongside this, the global push toward IFRS S1 and S2 is accelerating, with 36+ jurisdictions already moving in that direction.

On paper, it feels like simplification and alignment. But for early movers, it doesn’t really feel that way.

These companies invested in systems, built capabilities, and aligned with frameworks like TCFD, GRI, and CDP. In many cases, they were already covering much of what IFRS S2 requires, especially through ESRS E1. So in a way, they built for something that has now been scaled back.

At the same time, many peers don’t need to report anymore. But the pressure hasn’t gone anywhere. Investors still want ESG data. Banks still ask for disclosures. Large companies still depend on supplier data to meet their own requirements.

So even companies now out of scope are still part of the system, just without clear structure. This shows up most in the supply chain. Large companies still need to report Scope 3 emissions and value chain impacts. But with smaller companies no longer required to provide structured data, collecting that information has become harder.

So while regulation looks simpler on paper, the real challenge hasn’t reduced. It points to a deeper issue: the system doesn’t fully match how supply chains actually work.

Early movers are still operating with higher costs and more complex setups, while others have stepped out. It creates an odd incentive. If moving early means more cost and complexity, and waiting reduces both, companies will naturally hold back. And that’s not the outcome anyone intended.

The shift toward global standards like IFRS S1 and S2 is a step forward. But stability matters just as much as alignment.

> When the rules change this much, the people who moved first end up adjusting the most. Over time, it starts to feel like a “leaders’ tax.”

If we want companies to lead on sustainability, not just respond to regulation, early action should feel like an advantage. Right now, it feels slightly the other way around.`
},
{
  id: 'two-nbs-projects-only-one-holds-value',
  explainer: 'durability',
  takeaways: [
    'Identical carbon claims can diverge on permanence, species choice and climate sensitivity.',
    'Test NbS through five lenses: biophysics, climate uncertainty, risk linkage, financial relevance and long-term stability.',
    'The market already prices durability over volume: weak-permanence credits sit unretired.',
  ],
  title: 'Two NbS Projects Look Identical on Paper. Only One Holds Its Value.',
  deck: 'A five-step way to test whether a nature-based solution will still be delivering in twenty years.',
  hook: 'Scale may look impressive, but stability is what actually determines value.',
  cat: 'nature',
  tags: ['Nature-based Solutions', 'Carbon Markets', 'TNFD', 'Permanence', 'Scenario Analysis'],
  date: '2026-04',
  reactions: 22, comments: 2, reposts: 0,
  body: `Two nature-based solutions projects can look identical on paper: the same hectares, the same carbon claims, the same narrative. Yet over time, one holds value and the other quietly loses it.

The difference usually comes down to how deeply the system is understood and tested.

Most NbS outcomes are still presented using simplified assumptions.

A project may report carbon sequestration, but the real question is whether that carbon remains stored over decades, or starts declining once soils reach saturation or face disturbance.

A tree plantation may look successful at the outset, but its long-term performance depends on species selection, local ecology, and how it responds to rising temperatures and changing rainfall patterns.

An intervention may claim to reduce risk, but unless it is clearly linked to specific exposures such as flooding, heat stress, or water scarcity at a location level, it is difficult to validate what risk is actually being reduced.

Such questions help us define whether the impact actually holds or not. I have started looking at NbS as a structured five-step journey.

1. **Biophysical reality.** Every NbS intervention is built on processes such as soil carbon dynamics, vegetation growth, and water cycles. These are measurable and modelled using established tools like RothC, DNDC, DayCent, and InVEST.
2. **Climate uncertainty.** The effectiveness of NbS depends on how the climate evolves. A 1.5°C and a 3°C pathway lead to very different outcomes in rainfall patterns, soil moisture, and ecosystem stability. Scenario analysis using IPCC and NGFS pathways helps test this.
3. **Risk linkage.** An NbS intervention needs to demonstrate how it reduces actual business risks such as flooding, heat stress, water scarcity, or carbon cost exposure. Without this, the impact remains disconnected from resilience.
4. **Financial relevance.** The key question is whether the benefit is durable enough to hold value over time. Tools such as marginal abatement cost curves and internal carbon pricing allow this comparison to be made more rigorously.
5. **Long-term stability.** This is where outcomes become visible in the market. In the voluntary carbon market, not all credits see sustained demand. Projects with weak permanence or unclear baselines often remain unretired, while higher-integrity credits continue to be used.

The distinction between volume and durability is already being priced in, which leads to a simple but important insight.

> Scale may look impressive, but stability is what actually determines value.`
},
{
  id: 'quantifying-climate-risk-start-with-your-numbers',
  explainer: 'propagation',
  takeaways: [
    'Start from existing cost and revenue lines, not from climate models.',
    'Financial impact is a function of current exposure, magnitude of change and likelihood, and it propagates across lines through pass-through.',
    'Most companies already hold 70–80% of the data they need; the work is connecting it.',
  ],
  title: 'Quantifying Climate Risk: Start With Your Numbers, Not the Climate Models',
  deck: 'You are not predicting the future. You are stress-testing the financials you already have against how they might move.',
  hook: 'Most companies already have 70 to 80% of the data needed to do this. What is missing is not data, but how it is connected.',
  cat: 'climate',
  tags: ['Climate Risk Quantification', 'Transition Risk', 'Financial Impact', 'IFRS S2', 'Scenario Analysis'],
  date: '2026-04',
  reactions: 21, comments: 3, reposts: 1,
  body: `Quantifying climate risk sounds complex. And honestly, it is. But the way to start is actually quite simple.

Don’t begin with climate models. Begin with your numbers.

Every business already knows where its money goes: energy, procurement, operations, capex. These are not new. What changes is how these numbers behave under transition.

So the real question becomes: which of these cost or revenue lines are sensitive to climate drivers?

Take energy as an example. You already have a base cost today. Now layer in what transition is likely to do to it: higher electricity tariffs, carbon-linked pricing, fuel volatility. That creates a potential unfavourable impact on operating costs.

Now flip the same lens. If the business invests early in efficiency or renewables, that same line item could stabilise over time. That becomes a favourable impact.

This is the core of quantification. You are not predicting the future. You are stress-testing your existing financials against how they might move.

> Financial Impact = f (Current Exposure, Magnitude of Change, Likelihood of Occurrence)

And it is never just one variable.

- When energy costs move, the impact does not stay contained; it flows through to supply chain costs as well.
- When carbon prices increase, they are gradually reflected in electricity pricing through cost pass-through mechanisms.
- When customer expectations shift, it begins to influence revenue patterns, affecting demand and pricing power.

So what looks like a single risk often flows through multiple parts of the business.

That is why the exercise is not about building a perfect model. It is about building a clear line of sight between climate drivers and financial outcomes. Where could costs increase? Where could margins tighten? Where could early action create stability or advantage?

The interesting part is this. Most companies already have 70 to 80% of the data needed to do this. What is missing is not data, but how it is connected.

And once that connection is made, climate risk stops being abstract. It becomes something very tangible: numbers that can go up, margins that can shrink, or opportunities that can be captured early.

That shift is what makes quantification powerful.`
},
{
  id: 'is-csrd-still-a-priority',
  explainer: 'priority',
  takeaways: [
    'The Omnibus moved 80–85% of companies out of scope and cut required disclosures by more than 60%.',
    'The underlying pressures have not changed: climate impacts, water stress and investor demand for comparable data.',
    'What companies do now reveals whether the work was compliance-driven or strategy-driven.',
  ],
  title: 'Is CSRD Still a Priority After the Omnibus?',
  deck: 'The regulation narrowed. The reality it was built around did not.',
  hook: 'CSRD may no longer be mandatory for everyone, but the expectations it represents have not gone away.',
  cat: 'disclosure',
  tags: ['CSRD', 'Omnibus', 'Double Materiality', 'ESG Reporting', 'Business Strategy'],
  date: '2026-04',
  reactions: 14, comments: 0, reposts: 0,
  body: `The Omnibus update has changed the role CSRD plays for many companies.

Just a few months ago, CSRD was a clear priority. It was expected to apply to nearly 50,000 companies, and organisations were actively investing time and resources into preparing for it. Teams were being built, systems were being set up, and double materiality assessments were underway.

Today, that picture looks very different. With the recent changes, close to 80 to 85% of companies are now expected to fall out of scope. The number of required disclosures has been reduced by more than 60%, and timelines have become less pressing. What was once an immediate requirement now feels, for many, optional.

But the reality CSRD was built around has not changed.

Climate risk continues to intensify. Water stress and supply chain disruptions are becoming more frequent. Investors are still asking for reliable, comparable sustainability data. Global sustainable assets remain above $30 trillion, and expectations around transparency are only increasing.

This is where the situation becomes more interesting.

CSRD was never just about reporting more information. It was meant to bring consistency to sustainability data, to make companies comparable, and to link environmental and social issues directly to financial risk. It was trying to move sustainability from broad narratives to something that could actually inform decisions.

That need still exists, regardless of whether the regulation applies or not. What has changed is the source of pressure. Earlier, companies moved because they had to. Now, they have a choice.

Some will continue building their capabilities because they understand where the market is heading. Others may slow down because the immediate requirement is no longer there.

In the short term, there is no obvious downside to stepping back. Nothing breaks, and there is no immediate consequence. However, over time, the difference becomes visible. It shows up in investor conversations, in access to capital, and in how companies are compared to their peers. It builds gradually, but it is difficult to ignore once it appears.

> CSRD may no longer be mandatory for everyone, but the expectations it represents have not gone away.

So perhaps the more honest question is this: is CSRD still a priority, or has it quietly slipped down the list now that the pressure has eased? And if it has, what does that say about what was really driving the work in the first place?`
},
{
  id: 'ppwr-packaging-market-access',
  explainer: 'ppwr',
  takeaways: [
    'PPWR applies from August 2026 and defines packaging by function, assigning single-point responsibility for design and for waste.',
    'Minimisation, recyclability and PFAS restrictions must be demonstrated through technical documentation, not principles.',
    'For non-EU exporters, packaging compliance becomes a condition of market access.',
  ],
  title: 'PPWR: Packaging Is No Longer a Waste Issue. It’s a Market-Access Issue.',
  deck: 'Europe’s Packaging and Packaging Waste Regulation moves packaging upstream into design, materials and eligibility to sell.',
  hook: 'What used to be a question of optimisation is now a question of eligibility.',
  cat: 'disclosure',
  tags: ['PPWR', 'Circular Economy', 'EPR', 'EU Regulation', 'Supply Chain'],
  date: '2026-04',
  reactions: 11, comments: 0, reposts: 0,
  body: `We’ve usually seen packaging as a waste issue. The EU is starting to treat it as a design and market access issue.

With the Packaging and Packaging Waste Regulation (PPWR), Europe is not just adding new rules. It is changing how packaging is defined, designed, and regulated. The regulation entered into force in 2025 and applies from August 2026.

Packaging is now assessed based on its function, meaning the same item can qualify as packaging or not depending on how it is used. Responsibility is not shared but clearly assigned, with one manufacturer responsible for design and compliance, and one producer responsible for waste management obligations in each market.

The EU is targeting a 15% reduction in packaging waste per person by 2040, but the bigger change lies in how companies will need to respond. While recyclability applies from 2026, stricter design-for-recycling requirements begin to take effect around 2030, ensuring packaging can be collected, sorted, and recycled at scale.

At the same time, packaging must be reduced to the minimum necessary, cannot rely on excess material for marketing purposes, and must avoid restricted substances like PFAS (per- and polyfluoroalkyl substances). Non-compliant food-contact packaging cannot be placed on the market after August 2026, with no transition period for existing stock. These are not just principles. They must be demonstrated through technical documentation, conformity assessments, and clear accountability under EPR frameworks.

What is interesting is how this shifts the centre of gravity. Packaging is no longer something to be dealt with after a product is made. It is moving upstream into design, material choice, and even business models. In a way, the regulation is asking a more fundamental question: does this packaging justify its existence?

For companies, especially those operating outside the EU, this is not a distant policy shift. These requirements apply to any product entering the EU market. Compliance is not about disclosure; it is about eligibility. Packaging, often treated as secondary, is becoming a condition for participation.

The impact does not stop at borders. Supply chains will begin to align, and standards set in one region will influence decisions in others. Over time, this may not remain a European framework. It may become a global reference point.

All of this points to a deeper shift. Packaging is no longer just a design or operational decision sitting at the end of the value chain. It is becoming a regulated interface between the product and the market.

> What used to be a question of optimisation is now a question of eligibility. The question is no longer whether packaging is sustainable. It is whether it is compliant enough to compete.`
},
{
  id: 'double-materiality-identified-but-used',
  explainer: 'usage',
  takeaways: [
    'Materiality assessments narrow the topic list, but material topics rarely show up in risk and performance decisions.',
    'Indicator volume has outgrown decision usefulness, with shifting definitions and weak comparability.',
    'Value arrives when a few well-defined topics are applied consistently in risk and performance assessment.',
  ],
  title: 'Double Materiality: Identified, But Is It Used?',
  deck: 'We are getting better at finding what matters. The open question is whether it consistently shapes what we do.',
  hook: 'If a topic is financially material, it should, in some form, show up in how we think about risk and performance.',
  cat: 'disclosure',
  tags: ['Double Materiality', 'ESG Integration', 'Risk', 'DMA', 'ESG Reporting'],
  date: '2026-03',
  reactions: 15, comments: 0, reposts: 0,
  body: `Something about the way we approach double materiality today feels slightly incomplete.

We often say ESG is financially material. We also talk about double materiality and the need to look at both financial risks and broader impacts on society and the environment. The thinking is solid.

In practice, this usually leads to a materiality assessment. Topics are scored, thresholds are applied, and we arrive at a final list of what is considered “material”. And to be fair, that’s exactly what it is meant to do. It helps narrow down the list of topics and focus on what actually matters the most.

But then what?

If a topic is financially material, it should, in some form, show up in how we think about risk and performance. Not always directly. Not always immediately. And not always labelled as ESG. But it should be visible somewhere in how decisions are made.

In many cases, that connection is still hard to see.

Part of this is expected. Some ESG risks are long-term, uncertain, and difficult to isolate. Many are already embedded within traditional analysis, in assumptions on demand, costs, management quality, or operational resilience, just not explicitly called out.

But there is also a more practical challenge. The volume of indicators has grown quickly, while their usefulness for decisions has not always kept pace. Definitions evolve, methodologies shift, and comparability over time becomes difficult. And when the pathway from an ESG signal to a financial outcome is not clearly understood, even genuinely material topics struggle to move beyond interpretation into consistent use.

What seems to matter more is how we bridge the two, and being thoughtful about what moves from identification into actual use. It means recognising the complexity of these issues, while also ensuring that selected topics are defined clearly, applied consistently over time, and can meaningfully inform risk and performance assessment.

> That is where the shift happens. Not when ESG is reported better, but when it is used more intentionally.

Double materiality is a powerful concept. The impact lens brings visibility to externalities and long-term system risks. The financial lens is where these risks begin to influence decisions. The real question is how often that connection is actually visible in practice.

Otherwise, we may be getting better at identifying what matters, without it consistently shaping what we do.`
},
{
  id: 'we-learned-to-measure-carbon-first',
  explainer: 'threshold',
  takeaways: [
    'Nature risk moves in thresholds, not curves, and remains largely unpriced in portfolio stress tests.',
    'More than half of global GDP depends moderately or highly on nature.',
    'ENCORE, IBAT, WWF’s Biodiversity Risk Filter and new satellite datasets are closing the measurement gap.',
  ],
  title: 'We Learned to Measure Carbon First. Nature Is Everything It Depends On.',
  deck: 'Climate risk is one part of a much larger system. Nature risk moves in thresholds, not curves, and the tools to see it are finally arriving.',
  hook: 'Nature risk is not a parallel issue. It is deeply interconnected with climate. Climate is just the part we learned to measure first.',
  cat: 'nature',
  tags: ['TNFD', 'Nature Risk', 'Biodiversity', 'ENCORE', 'IBAT'],
  date: '2026-03',
  reactions: null, comments: 0, reposts: 0,
  body: `We have spent years building a strong language around climate risk. We built frameworks for it. Disclosure standards. Scenario analysis. We even got reasonably good at pricing a tonne of carbon.

But climate risk is only one part of a much larger system, and we have been staring at it so closely that we forgot to look at what it is woven into.

Nature risk, including biodiversity loss, ecosystem degradation, water stress, soil depletion, and pollinator decline, is not a parallel issue. It is deeply interconnected with climate. Climate is just the part we learned to measure first.

Consider how financial institutions approach risk today. A portfolio may be stress-tested against a 2°C scenario, but what about the loss of mangroves protecting coastal assets? Or agricultural borrowers affected by declining water availability due to upstream deforestation? Or soil degradation silently eroding long-term productivity? These risks are already material, yet often remain unpriced.

More than half of the world’s GDP is moderately or highly dependent not on a stable climate but on nature.

Climate models can project temperature, but they cannot project the moment an ecosystem tips. And that is the uncomfortable part. Nature risk does not move in smooth curves. It moves in thresholds. Ecosystems can shift abruptly, such as forests turning from carbon sinks to sources, or fisheries collapsing within a season. These threshold effects are harder to predict.

I think the reason nature risk still sits in a different room from climate risk in most institutions is not because people do not see the connection. They do. It is because the infrastructure for measuring it has been missing. You cannot manage what you cannot see.

Tools like ENCORE (by UNEP-WCMC and UNEP FI) allow financial institutions to map sector-level dependencies and impacts on nature. IBAT provides location-specific biodiversity risk insights using global datasets. WWF’s Biodiversity Risk Filter links corporate activities with ecosystem sensitivities. Meanwhile, newer open-source platforms such as the Ecosystem Integrity Index by the Landbanking Group, Global Nature Watch, and enhanced satellite-based vegetation data from NASA are rapidly strengthening the underlying data infrastructure.

Unlike climate, nature risk is inherently local, complex, and less suited to a single universal metric. A coral reef and a grassland face very different pressures, and their risks cannot be reduced to one number. That complexity makes it harder to manage, but also more important to address.

> We got good at measuring carbon. The question is whether we will learn to value everything it depends on before those risks become irreversible.`
}
];

/* Threads: essays that build on each other, in reading order */
window.SERIES = {
  'physical-risk':   { label: 'Physical risk, at the right resolution', posts: ['the-resolution-gap', 'asset-level-ask-to-see-the-map'] },
  'disclosure-to-decisions': { label: 'From disclosure to decisions', posts: ['quantifying-climate-risk-start-with-your-numbers', 'slide-deck-vs-balance-sheet', 'ecb-climate-factor-collateral'] },
  'double-materiality': { label: 'Double materiality in practice', posts: ['double-materiality-identified-but-used', 'double-materiality-sounds-simple'] },
  'csrd-omnibus':    { label: 'CSRD after the Omnibus', posts: ['is-csrd-still-a-priority', 'the-leaders-tax-omnibus'] },
  'nature-finance':  { label: 'Nature, offsets and finance', posts: ['we-learned-to-measure-carbon-first', 'two-nbs-projects-only-one-holds-value', 'offsets-compensate-they-dont-manage'] },
  'supply-chain':    { label: 'Supply chains and net zero', posts: ['every-problem-leads-to-the-supply-chain', 'sbti-v2-era-of-implementation'] }
};

/* Glossary: hover any dotted term inside an essay. First occurrence per essay is annotated. */
window.GLOSSARY = {
  'CSRD': 'Corporate Sustainability Reporting Directive: the EU law requiring large companies to report sustainability information using the ESRS.',
  'ESRS': 'European Sustainability Reporting Standards: the detailed disclosure standards companies apply under CSRD.',
  'IFRS S1': 'ISSB standard for general sustainability-related financial disclosures.',
  'IFRS S2': 'ISSB standard for climate-related disclosures, built on the TCFD framework.',
  'ISSB': 'International Sustainability Standards Board, the IFRS Foundation body that issues IFRS S1 and S2.',
  'TCFD': 'Task Force on Climate-related Financial Disclosures. Its four pillars (governance, strategy, risk management, metrics and targets) underpin IFRS S2.',
  'TNFD': 'Taskforce on Nature-related Financial Disclosures: a framework for reporting nature-related dependencies, impacts, risks and opportunities.',
  'NGFS': 'Network for Greening the Financial System: the central-bank network whose climate scenarios (orderly, disorderly, hot house world) are widely used for scenario analysis.',
  'SSP': 'Shared Socioeconomic Pathways: IPCC scenario families such as SSP1-2.6 or SSP3-8.5 that pair socioeconomic assumptions with emissions trajectories.',
  'IPCC': 'Intergovernmental Panel on Climate Change, the UN body that assesses climate science.',
  'PCAF': 'Partnership for Carbon Accounting Financials: the standard for measuring financed emissions, with data-quality scores from 1 (best) to 5.',
  'SBTi': 'Science Based Targets initiative, which validates corporate emissions targets against climate science.',
  'GHG': 'Greenhouse gas. The GHG Protocol is the most widely used corporate carbon accounting standard and defines Scope 1, 2 and 3.',
  'Scope 1': 'Direct emissions from sources a company owns or controls, such as fuel burned on site or in its vehicles.',
  'Scope 2': 'Indirect emissions from purchased electricity, steam, heating and cooling.',
  'Scope 3': 'All other indirect emissions across the value chain, upstream and downstream. Usually the largest share of a footprint.',
  'DNSH': 'Do No Significant Harm: the EU Taxonomy test that an activity does not undermine other environmental objectives.',
  'PAI': 'Principal Adverse Impact indicators: the sustainability metrics financial market participants report under SFDR.',
  'SFDR': 'Sustainable Finance Disclosure Regulation: the EU regime for sustainability disclosures by financial market participants.',
  'EU Taxonomy': 'The EU classification system defining which economic activities count as environmentally sustainable.',
  'EUDR': 'EU Deforestation Regulation: requires proof that commodities such as soy, palm oil, cattle, timber, cocoa, coffee and rubber are deforestation-free and legally produced.',
  'PPWR': 'Packaging and Packaging Waste Regulation: EU rules on packaging design, minimisation, recyclability and producer responsibility.',
  'CBAM': 'Carbon Border Adjustment Mechanism: the EU carbon price applied to imports such as steel, cement, aluminium and fertilisers.',
  'CS3D': 'Corporate Sustainability Due Diligence Directive: EU rules requiring companies to address human rights and environmental impacts in their value chains.',
  'LkSG': 'Germany’s Supply Chain Due Diligence Act (Lieferkettensorgfaltspflichtengesetz).',
  'GRI': 'Global Reporting Initiative: the most widely used impact-focused sustainability reporting standards.',
  'SASB': 'Sustainability Accounting Standards Board standards: industry-specific, financially material disclosure topics, now maintained by the ISSB.',
  'CDP': 'The global environmental disclosure platform (formerly the Carbon Disclosure Project) used by investors and large buyers.',
  'BRSR': 'Business Responsibility and Sustainability Report: India’s SEBI-mandated ESG disclosure for listed companies. BRSR Core adds assured KPIs.',
  'ASRS': 'Australian Sustainability Reporting Standards: Australia’s climate disclosure standards, aligned with the ISSB.',
  'DMA': 'Double Materiality Assessment: the CSRD process for identifying topics that are material from an impact and a financial perspective.',
  'Double Materiality': 'Assessing sustainability topics from two angles: the company’s impact on people and planet, and the financial effect on the company.',
  'Double materiality': 'Assessing sustainability topics from two angles: the company’s impact on people and planet, and the financial effect on the company.',
  'double materiality': 'Assessing sustainability topics from two angles: the company’s impact on people and planet, and the financial effect on the company.',
  'NbS': 'Nature-based Solutions: protecting, restoring or managing ecosystems to address challenges such as climate change and flooding.',
  'VCM': 'Voluntary Carbon Market: where companies buy carbon credits outside compliance schemes.',
  'ENCORE': 'Exploring Natural Capital Opportunities, Risks and Exposure: a tool that maps how economic sectors depend on and affect nature.',
  'IBAT': 'Integrated Biodiversity Assessment Tool: location-specific biodiversity data such as protected areas and threatened species.',
  'ECB': 'European Central Bank.',
  'Verra': 'The non-profit that runs the Verified Carbon Standard (VCS), the largest voluntary carbon crediting programme.',
  'VM0042': 'Verra’s methodology for improved agricultural land management, used to credit soil carbon and farm emission reductions.',
  'Omnibus': 'The European Commission’s simplification package that narrowed the scope and content of CSRD, ESRS and related sustainability rules.',
  'EPR': 'Extended Producer Responsibility: making producers financially responsible for the end of life of their products and packaging.',
  'PFAS': 'Per- and polyfluoroalkyl substances, persistent “forever chemicals” now restricted in food-contact packaging.',
  'ESG': 'Environmental, social and governance: the non-financial factors used to assess a company’s sustainability and conduct.',
  'ISO 14064': 'International standard for quantifying, reporting and verifying greenhouse gas emissions.',
  'PESTEL': 'Political, economic, social, technological, environmental and legal analysis of external drivers.'
};
