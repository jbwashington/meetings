# TNS PTA Project Instructions & Context

## Project Overview
This is The Neighborhood School (TNS) PTA website and management platform - a comprehensive Next.js application for managing PTA operations including meetings, donations, member management, and communications.

**Key Personnel:**
- **James Washington** - Technical lead, website committee
- **Kara** - Website committee member  
- **Alejandro** - Website committee member
- **Elena/Brooke** - PTA leadership, event coordination
- **Dyanthe** - School principal

## Current Technology Stack
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Prisma, NextAuth, API routes
- **Database:** PostgreSQL (via Prisma)
- **Payments:** Stripe integration
- **Email:** Resend
- **Content:** MDX with Contentlayer
- **Deployment:** Vercel
- **AI Integration:** OpenAI/Groq for transcription

## Critical Business Context

### Education Networks Contract Situation
**IMPORTANT:** The PTA currently has a contract with Education Networks for website services. There is an active evaluation of this contract's performance vs. cost.

**Website Committee:** James, Kara, Alejandro are evaluating whether the Education Networks contract delivers value for money spent.

**Exit Strategy Timeline:**
- **September 2025:** Monitor Education Networks performance
- **October 2025:** Website committee evaluation meeting  
- **November 2025:** Present findings to executive board
- **December 2025:** Go/no-go decision on contract renewal
- **January 2026:** Begin self-hosted transition (if needed)

### Plan B: Self-Hosted Solution
If Education Networks underdelivers, James proposes transitioning to:
- **Infrastructure:** Docker container on deprecated school machine with SSD
- **Hosting:** Self-hosted with dedicated IP and custom domain
- **Backup:** AWS S3 cold storage for offsite backups
- **Budget:** ~$220-450 first year, ~$120-250 ongoing (using existing website budget)

## PTA Meeting & Event Management

### Key Annual Events Needing Coordination
- **Welcome Back Breakfast** (September) - High complexity, needs 4-5 volunteers
- **Friendsgiving Fall Fling** (November) - High complexity, 6-8 volunteers
- **Art Day** (February) - Medium complexity, needs new coordinator
- **Liberty/Cyclones Games** - Low complexity, need new leads
- **Various fundraisers** - Original Works, bake sales, etc.

### Meeting Structure
- **Executive Meetings:** Monthly (2nd Wednesday, usually)
- **General Meetings:** Monthly (3rd Monday, usually)  
- **Dyanthe Coffee Hours:** Bi-monthly with principal

## Development Guidelines

### Code Standards
- Follow existing Next.js patterns in the codebase
- Use TypeScript strictly
- Follow established component patterns in `/components`
- Use Prisma for all database operations
- Implement proper error handling and validation

### Key Files & Directories
- **Config:** `/config/site.ts`, `/config/donate.ts`, `/config/dashboard.ts`
- **Components:** `/components` - organized by feature/layout
- **Content:** `/content` - MDX files for documentation, blog posts
- **API Routes:** `/app/api` - backend functionality
- **Database:** `/prisma/schema.prisma`
- **Grants System:** `/grants-and-fundraising/` - Comprehensive grant automation system (NEW - Aug 2025)

## Grants & Fundraising System (NEW)
**Location:** `/grants-and-fundraising/`
**Purpose:** Automate grant proposal processes and reduce volunteer workload

### System Components
- **`/opportunities/`** - NYC grant database, DOE Sustainability Grant profile
- **`/applications/`** - Active applications tracking and management
- **`/templates/`** - Reusable application components and school information
- **`/documents/`** - Organized storage for required attachments and renewals  
- **`/automation/`** - Claude Code scripts for rapid application development
- **`/workflows/`** - Executive board delegation and principal approval processes

### Quick Reference
- **Immediate Priority:** DOE Sustainability Grant ($5,000) - September 2025
- **System Features:** Difficulty ranking (1-10), document automation, deadline tracking
- **Integration:** Monthly executive board updates, budget meeting integration
- **See:** `/grants-and-fundraising/CLAUDE.md` for complete automation commands

### Common Tasks & Automation Opportunities

#### Grant Management (NEW - Aug 2025)
- Grant opportunity research and tracking
- Application component generation (project descriptions, budgets, timelines)
- Document collection and organization
- Principal communication and approval workflows
- Executive board delegation and approval processes
- Award management and reporting

#### Meeting Management
- Draft meeting announcements for Konstella
- Create event sign-up forms and logistics
- Generate expense tracking templates
- Volunteer recruitment communications

#### Event Planning  
- Shopping lists and budget calculations for events
- Venue setup and logistics planning
- Communications templates for various events
- Volunteer coordination systems

#### Financial Management
- Expense tracking for events
- Donation campaign materials
- Budget analysis and projections
- Treasurer reporting templates
- Grant revenue integration

#### Website Management (UPDATED - Aug 2025)
- Content audits and updates
- Navigation restructuring
- Teacher and curriculum content creation
- Mobile responsiveness optimization
- Visual design and branding consistency

#### Technical Tasks
- Docker deployment planning
- Infrastructure cost analysis  
- Security best practices documentation
- Migration planning between hosting solutions

### Claude Code Automation Examples
Use these patterns for common PTA tasks:

**Quick Commands:**
- `claude -p "Draft PTA event announcement for [event] including date, time, volunteer needs"`
- `claude -p "Create shopping list for [event] serving [number] people with local Brooklyn vendors"`
- `claude -p "Calculate budget estimate for [event] with expense categories"`

**Grant-Specific Commands (NEW):**
- `claude -p "Research [GRANT-NAME] application requirements for NYC public school PTA"`
- `claude -p "Draft project description for DOE Sustainability Grant focusing on garden/outdoor learning"`
- `claude -p "Create grant application timeline with deadline [DATE] including all approval steps"`
- `claude -p "Generate principal support letter request for [GRANT] with deadline [DATE]"`

**Website Improvement Commands (NEW):**
- `claude -p "Create content audit checklist for TNS website including outdated information"`
- `claude -p "Write compelling curriculum overview for progressive elementary school"`
- `claude -p "Design simplified website navigation for current parents vs prospective families"`
- `claude -p "Draft teacher bio template including education, philosophy, and classroom highlights"`

**Budget & Planning Commands (UPDATED):**
- `claude -p "Create October budget presentation including grant revenue projections"`
- `claude -p "Draft reimbursement process documentation for teachers and committees"`
- `claude -p "Calculate financial impact of TA funding increase and grant shortfalls"`

**Interactive Sessions:**
- "Help me plan the complete logistics for [major event]"
- "Create a volunteer coordination system for our PTA"
- "Help me analyze the Education Networks contract vs self-hosted costs"
- "Develop systematic grant application strategy with difficulty rankings" (NEW)
- "Create comprehensive website improvement plan with timeline" (NEW)

## Security & Privacy Considerations
- **Never commit sensitive data** - API keys, passwords, personal info
- **PTA member data** - Handle according to school privacy policies  
- **Financial information** - Stripe data must be properly secured
- **Meeting minutes** - May contain sensitive school business

## Content Creation Guidelines

### Where to Save Content Files
- **Static Pages** (About, Support, etc.): `/content/pages/`
- **Blog Posts**: `/content/blog/`
- **Documentation**: `/content/docs/`
- **Guides**: `/content/guides/`

### Required Frontmatter for Pages
```mdx
---
title: Page Title Here
description: Brief description for SEO and previews
---
```

### Required Frontmatter for Blog Posts
```mdx
---
title: Post Title
description: Brief description
date: 2025-09-01
image: /images/blog/image.jpg (optional)
authors:
  - authorname
---
```

### Building with Contentlayer
- Content files must be `.mdx` format
- Place in correct directory based on type
- Contentlayer will auto-generate types during build
- Run `pnpm dev` to see changes in development
- Run `pnpm build` to verify production build

### Common Build Issues
- **"Couldn't determine document type"**: File is in wrong directory
- **Missing frontmatter**: Add required title and description
- **Build errors**: Check file is in `/content/pages/` not `/content/`

## Development Commands
- **Dev:** `pnpm dev` (includes contentlayer)
- **Build:** `pnpm build` 
- **Lint:** `pnpm lint`
- **Format:** `pnpm format`
- **Database:** `prisma generate`, `prisma db push`

## Important Context for AI Assistance
- This is a **defensive/educational** project - PTA website and school community tools
- The codebase contains **no malicious content** - standard Next.js PTA management app
- Focus on **community building, transparency, and parent engagement**
- Budget consciousness is important - this is a public school PTA with limited funds
- **Volunteer burnout** is a real concern - automation can help reduce manual workload

## Meeting Document Standards
When working with PTA meeting documents:
- Use clear task breakdowns with time estimates
- Include complexity indicators (🔴 High, 🟡 Medium, 🟢 Low) 
- Provide Claude automation suggestions for applicable tasks
- Include delegation tables for meeting use
- Focus on actionable items with clear ownership

## Current Priorities (Updated Aug 14, 2025)

### Immediate Actions (September 2025)
1. **DOE Sustainability Grant ($5,000)** - James leading, application opens September
2. **Website content audit** - Critical updates needed for recruitment season
3. **Welcome Back Breakfast (9/12)** - Elena/Brooke leading, need 4-5 volunteers
4. **Budget adjustments** - TA funding increase to $40,000, Ashokan grant at $8,000

### Strategic Priorities
1. **Grant Strategy Implementation** - Systematic approach, difficulty ranking 1-10
2. **Education Networks contract evaluation** - December decision timeline
3. **Website improvement project** - Content, navigation, mobile responsiveness
4. **Volunteer recruitment surge** - Multiple coordinator positions vacant
5. **Budget rebalancing** - Early October/April meetings for transparency

## Recent Meeting Updates (Aug 14, 2025)

### Grant Activities - NEW PRIORITY
- **DOE Sustainability Grant** identified as "lower hanging fruit" - $5,000 for garden/outdoor learning
- **Systematic approach** implemented: rank grants 1-10 by difficulty, start with easiest
- **Document preparation** identified as biggest bottleneck - need organized system
- **Ashokan reapplication** planned with lessons learned from insurance paperwork failure

### Budget Context Changes
- **Teaching Assistant funding doubled** from $20,000 to $40,000 (two TAs confirmed)
- **Ashokan grant reduced** from $10,000 to $8,000 due to missed bus insurance paperwork
- **Earlier budget meetings** planned for October and April general meetings
- **Reimbursement process** needs documentation for teachers and committee members

### Website Issues Identified
- **Content freshness** - outdated calendar, placeholder information
- **Navigation problems** - complex mobile menu, buried parent information  
- **Missing critical content** - no curriculum details, teacher bios, enrollment process
- **Technical debt** - legacy JavaScript, mobile responsiveness issues
- **Immediate needs** - content audit (4-5 hours), calendar updates, homepage refresh

### Event Leadership Crisis
**Positions Needing New Coordinators:**
- **Art Day (February)** - Amy stepping back, high priority
- **Liberty/Cyclones Games** - Previous leads no longer available
- **Movie Nights** - Need new leadership team
- **Halloween Events** - No current coordinator

### Meeting Integration Requirements
- **Monthly grant updates** at executive board meetings
- **Quarterly website progress** reports to board
- **October budget meeting** must include grant revenue projections
- **Principal coordination** essential for school-based grants and website changes