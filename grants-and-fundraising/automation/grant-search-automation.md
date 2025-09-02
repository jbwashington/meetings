# Grant Search Automation Scripts
*Quick commands to find and track new grant opportunities*

## Monthly Grant Search Commands

### 1. Search NYC DOE Grants
```bash
# Run monthly to check for new NYC DOE grants
claude -p "Search the NYC DOE grants website (schools.nyc.gov/about-us/funding/grants) for new grant opportunities for elementary schools and PTAs. Focus on grants opening in the next 90 days. Create a summary with deadlines, amounts, and requirements."
```

### 2. Search NYC Council Discretionary Updates
```bash
# Run in December/January for FY updates
claude -p "Check NYC Council website for FY26 discretionary funding updates. Find the application opening date, deadline, and any changes to requirements from previous years. Include information for council district [YOUR DISTRICT NUMBER]."
```

### 3. Foundation Grant Discovery
```bash
# Quarterly search for foundation opportunities
claude -p "Search for foundation grants available to NYC public school PTAs and progressive elementary schools. Focus on foundations that support: garden programs, STEM education, arts education, equity initiatives, and parent engagement. Include application deadlines and typical award amounts."
```

### 4. Corporate Grant Opportunities
```bash
# Run quarterly
claude -p "Find corporate grants and sponsorship opportunities for NYC public schools from companies like Google, Microsoft, Amazon, Apple, Target, Home Depot, and local NYC businesses. Focus on STEM, technology, and education equity programs."
```

### 5. Federal Grant Monitoring
```bash
# Run monthly during federal grant season (Sept-May)
claude -p "Check for new federal education grants applicable to NYC elementary schools and PTAs on grants.gov and ed.gov. Focus on Title I-IV programs, STEM education, and community engagement grants. Include application deadlines and requirements."
```

---

## Grant Application Assistance Commands

### 6. Quick Grant Proposal Generator
```bash
# Customize with your specific grant and program
claude -p "Help me write a grant proposal for [GRANT NAME] requesting $[AMOUNT] for [PROGRAM NAME]. The program will [BRIEF DESCRIPTION]. Include: executive summary, need statement, program description, evaluation plan, and budget narrative. Make it compelling and aligned with funder priorities."
```

### 7. Budget Generator
```bash
# Creates detailed grant budget
claude -p "Create a detailed budget for a $[AMOUNT] grant for [PROGRAM NAME]. Include: personnel (if allowed), supplies, materials, equipment, professional development, evaluation costs, and indirect costs (10%). Provide budget narrative explaining each line item."
```

### 8. Letter of Support Request
```bash
# Generates customized support letters
claude -p "Draft a letter requesting support from [Principal/Teacher/Community Partner] for our [GRANT NAME] application. The grant will provide $[AMOUNT] for [PROGRAM]. The letter should be professional, brief, and include specific commitments they're making to support the program."
```

### 9. Grant Evaluation Plan
```bash
# Creates measurement framework
claude -p "Develop an evaluation plan for our [PROGRAM NAME] funded by [GRANT NAME]. Include: measurable objectives, data collection methods, timeline, success metrics, and how we'll report impact to the funder. Make it realistic for a volunteer-run PTA."
```

### 10. Application Checklist Generator
```bash
# Creates specific checklist for each grant
claude -p "Create a detailed application checklist for [GRANT NAME] including all required documents, deadlines, approval needed, and preparation timeline. Organize by: documents to gather, items to write, approvals needed, and submission requirements."
```

---

## Status Tracking Commands

### 11. Monthly Grant Status Report
```bash
# Run monthly for board meetings
claude -p "Using the grant information in /grants-and-fundraising/applications/application-tracker-2025.md, create a one-page executive summary of grant activity for the PTA board meeting. Include: applications in progress, submitted applications, awards received, upcoming deadlines, and support needed from board."
```

### 12. Grant Calendar Alert
```bash
# Run weekly to check deadlines
claude -p "Review all grant deadlines in the next 30 days from /grants-and-fundraising/opportunities/comprehensive-grant-database-2025.md. Create urgent action items for any grants with approaching deadlines. Include what needs to be done and who should do it."
```

### 13. Document Readiness Check
```bash
# Run before starting new application
claude -p "Review the document requirements for [GRANT NAME] and check against our document library status. Create a list of missing documents we need to obtain before we can apply, who should get them, and how long it will take."
```

---

## Research Commands

### 14. Grant Success Rate Analysis
```bash
# Run quarterly to improve strategy
claude -p "Analyze successful grant applications for organizations similar to TNS PTA. What are common elements in winning proposals? What mistakes should we avoid? Provide specific recommendations for improving our applications."
```

### 15. Funder Priority Alignment
```bash
# Use when researching new funders
claude -p "Research [FOUNDATION/CORPORATION NAME]'s funding priorities and recent grants. How can TNS PTA align our programs with their interests? What keywords and phrases should we use in our application? What types of programs are they most likely to fund?"
```

### 16. Competitive Analysis
```bash
# Understand the landscape
claude -p "Find information about what grants other NYC public school PTAs have recently received. What funders are actively supporting schools like ours? What programs are getting funded? How can we differentiate our applications?"
```

---

## Writing Assistance Commands

### 17. Need Statement Generator
```bash
# Creates compelling need statements
claude -p "Write a compelling need statement for [PROGRAM NAME] at TNS. Include relevant statistics about our school community, educational challenges we're addressing, and why this program is critical now. Make it data-driven but also tell our story."
```

### 18. Impact Story Creator
```bash
# Turns data into stories
claude -p "Transform these program statistics [INSERT STATS] into a compelling impact story for grant applications. Include specific student/family examples (anonymized), quotes from teachers/parents, and clear outcomes achieved."
```

### 19. Executive Summary Writer
```bash
# Creates powerful opening
claude -p "Write a one-page executive summary for our [GRANT NAME] application. Include: who we are, what we're requesting, the problem we're solving, our solution, expected impact, and why we're the right organization. Make it compelling enough that they want to read more."
```

### 20. Sustainability Plan Developer
```bash
# Shows long-term thinking
claude -p "Develop a sustainability plan for [PROGRAM NAME] showing how we'll continue the program after grant funding ends. Include: other funding sources we'll pursue, how we'll build community support, cost reduction strategies, and integration into regular PTA budget."
```

---

## Quick Reference Commands

### 21. Grant Jargon Translator
```bash
# Understands funder language
claude -p "Explain what this grant requirement means in plain English: [PASTE CONFUSING REQUIREMENT]. How do we address this in our application? What documents or information do we need?"
```

### 22. Deadline Calculator
```bash
# Plans backwards from deadline
claude -p "The [GRANT NAME] is due [DATE]. Create a backwards timeline of everything we need to do to submit a strong application. Include buffer time for reviews and assume we're all volunteers with limited time."
```

### 23. Red Flag Checker
```bash
# Avoids common mistakes
claude -p "Review this grant application draft [PASTE DRAFT] and identify any red flags that might hurt our chances. Check for: missing requirements, budget errors, unclear language, unrealistic promises, and formatting issues."
```

---

## Integration Commands

### 24. Website Grant Page Creator
```bash
# Generates content for website
claude -p "Create website content showcasing TNS PTA's grant successes and current needs. Include: grants received, impact achieved, current grant applications, and how parents can help. Make it engaging and suitable for our school website."
```

### 25. Thank You Letter Generator
```bash
# Maintains funder relationships
claude -p "Write a thank you letter to [FUNDER NAME] for their $[AMOUNT] grant for [PROGRAM]. Include specific impact metrics, student stories, and photos we can share. Express genuine gratitude and keep door open for future funding."
```

---

## Batch Processing Commands

### 26. Multi-Grant Search
```bash
# Comprehensive monthly search
claude -p "Search for all available grants for NYC elementary school PTAs from these sources: NYC DOE, NYC Council, NY State, federal education grants, major foundations, and corporate giving programs. Organize by deadline date and include difficulty rating 1-10."
```

### 27. Application Pipeline Review
```bash
# Weekly status check
claude -p "Review our grant pipeline and create action items for the next week. Check: what's due soon, what documents are missing, who needs to do what, and any blockers we need to resolve. Priority order by deadline."
```

### 28. Document Batch Processor
```bash
# Prepares standard documents
claude -p "Using our organization information, create these standard grant documents: 1) Organization description (100, 250, 500 words), 2) Board list with bios, 3) Standard budget template, 4) Evaluation framework template."
```

---

## Specialized Searches

### 29. Emergency Funding Search
```bash
# For urgent needs
claude -p "Find emergency or rapid response grants available to NYC school PTAs. Focus on grants with quick turnaround times (less than 30 days) and minimal requirements. Include disaster relief, COVID recovery, and urgent need funds."
```

### 30. Capacity Building Grants
```bash
# Strengthens organization
claude -p "Search for capacity building grants that could help TNS PTA improve our operations, such as: volunteer management systems, financial software, training programs, strategic planning support, or fundraising infrastructure."
```

---

## How to Use These Commands

1. **Copy the command** you need
2. **Replace placeholder text** in [BRACKETS] with your specific information
3. **Run in terminal** where Claude Code is installed
4. **Save outputs** to appropriate folders in grants directory
5. **Share results** with grants committee

## Setting Up Automation

### Weekly Routine (Fridays, 30 minutes)
- Run command #12 (Calendar Alert)
- Run command #27 (Pipeline Review)
- Update application tracker

### Monthly Routine (First Monday, 2 hours)
- Run command #1-5 (Grant searches)
- Run command #11 (Status Report)
- Update comprehensive database

### Before Each Application
- Run command #13 (Document Check)
- Run command #10 (Checklist Generator)
- Run command #15 (Funder Alignment)

### For Board Meetings
- Run command #11 (Status Report)
- Run command #24 (Website Content)
- Prepare success stories

---

## Pro Tips

1. **Save successful commands** - Keep a log of commands that produced good results
2. **Customize for TNS** - Always mention "progressive elementary school" and "NYC public school PTA"
3. **Batch similar tasks** - Run multiple searches at once to save time
4. **Version control** - Date all generated documents
5. **Share widely** - Make outputs accessible to all committee members

---

*Remember: These commands help with research and writing, but human review and customization is always needed before submitting any grant application.*

*Last Updated: September 1, 2025*