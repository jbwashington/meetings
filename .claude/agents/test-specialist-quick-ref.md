---
name: test-specialist-quick-ref
description: Quick reference guide for the test specialist agent with common patterns and commands
---

# Test Specialist Agent - Quick Reference

## 🚀 Quick Start Commands

```bash
# Invoke the test specialist agent
@test-specialist create tests for [feature]
@test-specialist fix failing test in [file]
@test-specialist improve coverage for [module]
```

## 📋 Common Tasks

### Create New Test Suite
```
@test-specialist create comprehensive tests for the user authentication flow including database RLS policies and integration tests
```

### Fix Failing Tests
```
@test-specialist the billing test is failing with TypeError, help me fix it
```

### Improve Coverage
```
@test-specialist analyze and improve test coverage for the team management module
```

### Mock External Service
```
@test-specialist create mocks for Stripe subscription endpoints
```

## 🎯 Test Types by Layer

| Layer | Tool | When to Use | Example |
|-------|------|-------------|---------|
| Database | pgTAP | RLS policies, triggers, functions | `CREATE OR REPLACE FUNCTION test_*` |
| Unit | Vitest | Pure functions, utilities | `describe('utility', () => {})` |
| Integration | Vitest + Mocks | API routes, workflows | `mockSupabase.from()` |
| E2E | Playwright | Critical user paths only | `page.goto('/login')` |

## 🔧 Essential Mocking Patterns

### Supabase Mock
```typescript
const mockSupabase = {
  auth: { getUser: vi.fn() },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn()
  }))
};
```

### Stripe Mock
```typescript
const mockStripe = {
  customers: { create: vi.fn() },
  subscriptions: { create: vi.fn() },
  checkout: {
    sessions: { create: vi.fn() }
  }
};
```

## 🏃 Quick Test Commands

```bash
# Run specific test file
bun test path/to/test.ts

# Run with coverage
bun test --coverage

# Run in watch mode
bun test --watch

# Run database tests
psql -f supabase/tests/01_auth.sql

# Run integration tests only
bun test __tests__/integration --run
```

## ⚡ Performance Tips

1. **Use `test.concurrent`** for independent tests
2. **Mock at boundaries** (DB, API, external services)
3. **Share expensive setup** with `beforeAll`
4. **Use test builders** for complex data
5. **Avoid `setTimeout`**, use `waitFor` instead

## 🐛 Debug Checklist

- [ ] Check mock return values
- [ ] Verify async operations resolve
- [ ] Confirm test isolation (no shared state)
- [ ] Review environment variables
- [ ] Check for timing issues
- [ ] Validate mock call counts

## 📊 Coverage Goals

- **Unit Tests**: > 80% coverage
- **Integration Tests**: Critical paths covered
- **Database Tests**: All RLS policies tested
- **E2E Tests**: Main user journeys only

## 🚫 Anti-patterns to Avoid

❌ Testing implementation details
❌ Mocking internal modules
❌ Snapshot testing for dynamic content
❌ Hardcoded wait times
❌ Shared state between tests
❌ Testing third-party libraries

## ✅ Best Practices

✅ Test behavior, not structure
✅ Use descriptive test names
✅ One logical assertion per test
✅ Clean up after tests (ROLLBACK, afterEach)
✅ Use realistic test data
✅ Test error scenarios

## 📝 Test Naming Convention

```typescript
describe('[Feature]', () => {
  describe('[Component/Function]', () => {
    it('should [expected behavior] when [condition]', () => {
      // Arrange
      // Act  
      // Assert
    });
    
    it('should handle [error] when [invalid condition]', () => {
      // Test error case
    });
  });
});
```

## 🔍 Finding What to Test

1. **Critical User Paths**: Login, payment, core features
2. **Business Logic**: Calculations, validations, transformations
3. **Security Boundaries**: Auth, permissions, data access
4. **Error Handling**: Network failures, invalid input
5. **Edge Cases**: Limits, empty states, concurrent operations

## 🎭 Test Doubles Hierarchy

1. **Dummy**: Placeholder with no behavior
2. **Stub**: Returns preset values
3. **Spy**: Records interactions
4. **Mock**: Verifies expectations
5. **Fake**: Simplified working implementation

## 🔗 Useful Resources

- [pgTAP Documentation](https://pgtap.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Supabase Testing Guide](https://supabase.com/docs/guides/testing)

## 💡 Pro Tips

1. **Start with the hardest test** - If it's testable, the rest will be easier
2. **Test from the user's perspective** - Focus on outcomes, not internals
3. **Use the AAA pattern** - Arrange, Act, Assert
4. **Keep tests focused** - One concept per test
5. **Make tests readable** - They're documentation too

## 🆘 When to Call the Agent

- Setting up new test infrastructure
- Complex mocking scenarios
- Database test design
- CI/CD pipeline configuration
- Test performance optimization
- Debugging flaky tests
- Coverage improvement strategies