---
name: agents-readme
description: Documentation for Claude Code specialized agents directory and usage guidelines
---

# Claude Code Specialized Agents

This directory contains specialized agent configurations for Claude Code to handle specific development tasks with expert-level knowledge.

## Available Agents

### 🧪 Test Specialist (`test-specialist`)

A comprehensive testing expert for Next.js + Supabase applications using pgTAP and Vitest.

#### Capabilities
- **Database Testing**: pgTAP tests for RLS policies, triggers, and migrations
- **Application Testing**: Vitest unit and integration tests with proper mocking
- **CI/CD Setup**: GitHub Actions workflows for automated testing
- **Test Debugging**: Identify and fix flaky or failing tests
- **Coverage Analysis**: Improve test coverage strategically

#### How to Use

1. **Direct Invocation** (when this feature is available):
   ```
   @test-specialist create tests for user authentication
   ```

2. **Manual Context Loading**:
   ```
   Please act as the test specialist agent defined in .claude/agents/test-specialist.md
   and help me create tests for [feature]
   ```

3. **Specific Task Requests**:
   - "Create pgTAP tests for the profiles table RLS policies"
   - "Write Vitest integration tests for the billing workflow"
   - "Fix the failing authentication test"
   - "Improve test coverage for team management"

#### Key Files
- `test-specialist.md` - Full agent specification and knowledge base
- `test-specialist-config.json` - Agent configuration and triggers
- `test-specialist-examples.md` - Usage examples and patterns
- `test-specialist-quick-ref.md` - Quick reference guide

## Creating Your Own Specialized Agent

### 1. Define the Agent Specification
Create a markdown file with:
- Purpose and competencies
- Specialized knowledge
- Task execution patterns
- Best practices
- Common patterns and anti-patterns

### 2. Create Configuration
Add a JSON config with:
- Triggers (keywords that activate the agent)
- Capabilities and tools
- Context requirements
- Output preferences

### 3. Provide Examples
Include real-world examples:
- Common prompts and responses
- Code templates
- Problem-solving patterns

### 4. Quick Reference
Create a quick reference with:
- Common commands
- Cheat sheets
- Debugging guides
- Performance tips

## Agent Development Guidelines

### Principles
1. **Specialized Expertise**: Each agent should be an expert in its domain
2. **Consistent Patterns**: Follow established patterns for the technology stack
3. **Practical Focus**: Provide working code, not just theory
4. **Best Practices**: Enforce industry best practices automatically
5. **Learning Examples**: Include examples that teach while solving

### Structure Template
```
agents/
├── [agent-name].md           # Full specification
├── [agent-name]-config.json  # Configuration
├── [agent-name]-examples.md  # Usage examples
└── [agent-name]-quick-ref.md # Quick reference
```

## Roadmap for Additional Agents

### 🔐 Security Specialist
- Security audits
- Vulnerability scanning
- Authentication/authorization
- Data encryption
- OWASP compliance

### 🎨 UI/UX Specialist
- Component architecture
- Accessibility (a11y)
- Performance optimization
- Responsive design
- Animation patterns

### 📊 Database Specialist
- Query optimization
- Index strategies
- Migration planning
- Data modeling
- Backup strategies

### 🚀 Performance Specialist
- Bundle optimization
- Core Web Vitals
- Caching strategies
- Load testing
- Monitoring setup

### 📱 Mobile Specialist
- React Native development
- PWA optimization
- Offline capabilities
- Push notifications
- App store deployment

## Contributing

To add a new specialized agent:

1. Create the agent files following the template
2. Test the agent with real scenarios
3. Document limitations and edge cases
4. Add to this README
5. Submit a PR with examples of the agent in action

## Best Practices for Using Agents

1. **Be Specific**: Provide context about your project structure
2. **Show Examples**: Include code snippets of existing patterns
3. **State Constraints**: Mention any limitations or requirements
4. **Iterative Refinement**: Start with simple requests, then add complexity
5. **Verify Output**: Always review and test generated code

## Troubleshooting

### Agent Not Responding as Expected
- Ensure you're using the correct trigger keywords
- Provide more context about your specific setup
- Reference the agent explicitly if needed

### Generated Code Doesn't Match Style
- Share your existing code patterns
- Point to your style guide or linting rules
- Request specific formatting preferences

### Tests Failing
- Provide full error messages
- Share relevant code being tested
- Include environment details

## Version History

### test-specialist v1.0.0
- Initial release with pgTAP and Vitest support
- Comprehensive mocking patterns
- CI/CD workflow templates
- Database and application testing strategies

## Feedback and Improvements

To improve these agents:
1. Document common issues you encounter
2. Share successful patterns you develop
3. Suggest new agent types needed
4. Report any incorrect or outdated information

## License

These agent configurations are part of your project and follow your project's license.