# CauseIQ PTA Research Script
*Automated data collection for comparable NYC PTAs*

## Manual Research Method (Recommended)

Since CauseIQ doesn't have a public API, here's the most efficient way to gather the data:

### Step 1: Access CauseIQ
1. Go to: https://www.causeiq.com
2. Use their search filters for NYC PTAs
3. Focus on these comparable schools

### Step 2: Target PTAs to Research

#### Progressive Public Schools Similar to TNS:
```
Search these specific PTAs on CauseIQ:

Manhattan:
- PS 87 William Sherman PTA (EIN: 13-3143571)
- PS 199 Jesse Isador Straus PTA  
- PS 9 Sarah Anderson PTA
- PS 163 Alfred E Smith PTA
- PS 84 Lillian Weber PTA

Brooklyn (Progressive Schools):
- PS 321 PTA (Park Slope) 
- Brooklyn New School PTA (PS 146)
- PS 261 PTA (Downtown Brooklyn)
- PS 107 John W Kimball PTA
- PS 133 William Butler PTA

Similar Demographics (40% Free Lunch):
- PS 452 PTA (Upper West Side)
- PS 75 Emily Dickinson PTA
- PS 166 Richard Rogers PTA
```

### Step 3: Data to Collect for Each PTA

Create a spreadsheet with these columns:

| School | Total Revenue | Top 3 Donors | Grant Amounts | Programs Funded | Contact Method |
|--------|---------------|--------------|---------------|-----------------|----------------|
| PS 87 | $XXX,XXX | 1. Foundation Name<br>2. Foundation Name<br>3. Foundation Name | $XX,XXX<br>$XX,XXX<br>$XX,XXX | Arts, STEM, etc | Email/Letter/Online |

### Step 4: Key Information to Extract

For each comparable PTA, note:
1. **Total annual revenue** - How much are they raising?
2. **Revenue sources breakdown** - What % from grants vs events vs donations?
3. **Major institutional funders** - Which foundations give to them?
4. **Grant sizes** - What's the typical grant amount?
5. **Programs funded** - What are foundations interested in?
6. **Fundraising methods** - What works for them?

---

## Web Scraping Alternative (If Needed)

If you want to automate data collection from public sources:

### Option 1: Use NYC OpenData
```bash
# NYC Schools demographic data
curl "https://data.cityofnewyork.us/resource/ihfw-zy9j.json?\$where=meals_percent%20between%2030%20and%2050" > similar_schools.json

# Process with Python script
python analyze_schools.py similar_schools.json
```

### Option 2: IRS 990 Data Mining
```python
# Python script to fetch 990 data
import requests
import pandas as pd

# List of EINs for comparable PTAs
pta_eins = [
    "13-3143571",  # PS 87
    # Add more EINs
]

# Use ProPublica Nonprofit API
for ein in pta_eins:
    url = f"https://projects.propublica.org/nonprofits/api/v2/organizations/{ein}.json"
    response = requests.get(url)
    # Process data...
```

### Option 3: Foundation Center Data
Many foundations list their grantees publicly:

```bash
# Check these foundation websites for grantee lists:
# Robin Hood Foundation
curl "https://www.robinhood.org/what-we-fund/grantees" 

# New York Community Trust  
# Check annual reports for grantee lists

# Altman Foundation
# Download grantee database
```

---

## Manual Research Checklist

### For Each Comparable PTA:

#### A. Revenue Analysis
- [ ] Total annual revenue (from 990)
- [ ] Year-over-year growth
- [ ] Revenue per student
- [ ] Major revenue categories

#### B. Donor Intelligence  
- [ ] List all $5,000+ donors
- [ ] Identify foundation vs corporate vs individual
- [ ] Note any government grants
- [ ] Track DAF platform gifts

#### C. Program Analysis
- [ ] What programs get funded?
- [ ] Which funders support which programs?
- [ ] Multi-year vs one-time grants
- [ ] Restricted vs unrestricted funds

#### D. Contact Research
- [ ] Who signs their grant applications?
- [ ] Do they have a grants committee?
- [ ] Professional grant writer or volunteer?
- [ ] Success rate insights

---

## Data Organization Template

### Create Master Spreadsheet:

**Sheet 1: PTA Comparison**
| PTA Name | Students | % Free Lunch | Annual Revenue | Rev/Student | Top Program |
|----------|----------|--------------|----------------|-------------|-------------|

**Sheet 2: Funder Database**
| Funder Name | Type | PTAs Funded | Avg Grant | Focus Area | Contact |
|-------------|------|-------------|-----------|------------|---------|

**Sheet 3: Opportunity Pipeline**
| Foundation | TNS Fit Score (1-10) | Est. Grant | Deadline | Action Needed |
|------------|---------------------|-----------|----------|---------------|

---

## Quick Research Links

### IRS 990 Lookups:
- ProPublica Nonprofit Explorer: https://projects.propublica.org/nonprofits/
- GuideStar: https://www.guidestar.org/
- Foundation Center: https://foundationcenter.org/

### NYC School Data:
- NYC OpenData: https://opendata.cityofnewyork.us/
- NYC DOE School Quality: https://tools.nycenet.edu/dashboard/
- InsideSchools: https://insideschools.org/

### Foundation Research:
- Foundation Directory: https://fconline.foundationcenter.org/
- Candid: https://candid.org/
- GrantSpace: https://grantspace.org/

---

## Analysis Questions to Answer

After gathering data, answer these strategic questions:

1. **Which foundations appear multiple times across similar PTAs?**
   - These are your best targets

2. **What's the average grant size for PTAs like TNS?**
   - Sets realistic expectations

3. **Which programs get funded most often?**
   - Align your applications

4. **Who are the "unusual" funders?**
   - Hidden opportunities others miss

5. **What are successful PTAs doing that TNS isn't?**
   - Strategic gaps to fill

---

## Action Items from Research

Based on your findings, create:

### 1. Hot List (Apply Immediately)
Foundations that fund 3+ comparable PTAs

### 2. Warm List (Apply This Quarter)  
Foundations that fund 1-2 comparable PTAs

### 3. Cold List (Research Further)
Foundations that fund similar programs but not PTAs yet

### 4. Program Development Ideas
Programs that get funded that TNS doesn't have yet

### 5. Relationship Targets
People to connect with at successful PTAs

---

## Reporting Template

### Executive Summary for Board:
```
COMPARABLE PTA ANALYSIS - KEY FINDINGS

Schools Analyzed: [List]
Average Revenue: $XXX,XXX
TNS Current Revenue: $100,000
Gap to Close: $XX,XXX

TOP 5 FOUNDATION OPPORTUNITIES:
1. [Foundation] - Funds X similar PTAs at $XX,XXX average
2. [Foundation] - Strong arts focus, $XX,XXX typical grant
3. [Continue list...]

RECOMMENDED ACTIONS:
1. Apply to [Foundation] by [Date]
2. Develop [Program] to attract [Funder]
3. Partner with [PTA] on joint application

EXPECTED IMPACT:
If we pursue top 10 opportunities: $XXX,XXX potential
Success rate assumption: 30%
Realistic new revenue: $XX,XXX
```

---

## Manual Process (Start Today)

Since we don't have API access, here's what to do:

1. **Today:** Go to CauseIQ.com and search for PS 87 PTA
2. **Screenshot** their donor list
3. **Repeat** for 5 comparable PTAs
4. **Compile** in spreadsheet
5. **Identify** overlapping funders
6. **Research** those foundations' websites
7. **Add** to your master outreach list

This manual process will take 2-3 hours but will identify $50,000+ in opportunities.

---

*Remember: The PTAs most similar to TNS in values and demographics will have the most relevant funder matches. Focus on progressive schools with diverse populations, not just geographic proximity.*