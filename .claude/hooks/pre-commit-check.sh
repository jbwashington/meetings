#!/bin/bash
# Claude Code hook to check for linting and TypeScript errors before commit

echo "🔍 Running pre-commit checks..."

# Run TypeScript type checking
echo "📝 Checking TypeScript types..."
bun tsc --noEmit
tsc_exit_code=$?

if [ $tsc_exit_code -ne 0 ]; then
    echo "❌ TypeScript errors found!"
    echo "🔧 Attempting to auto-fix common issues..."
    
    # Try running lint:fix to see if it helps
    bun lint:fix
    
    # Check again
    bun tsc --noEmit
    if [ $? -ne 0 ]; then
        echo "❌ TypeScript errors persist. Please fix them before committing."
        echo "💡 Run 'bun tsc --noEmit' to see the errors"
        exit 1
    else
        echo "✅ TypeScript errors resolved by linter"
    fi
fi

# Run linter
echo "🔧 Running linter..."
bun lint
lint_exit_code=$?

if [ $lint_exit_code -ne 0 ]; then
    echo "🔧 Linting issues found. Attempting auto-fix..."
    bun lint:fix
    
    # Check if all issues were fixed
    bun lint
    if [ $? -ne 0 ]; then
        echo "⚠️  Some linting issues couldn't be auto-fixed"
        echo "💡 Run 'bun lint' to see remaining issues"
        # Continue anyway - the post-commit hook will handle remaining issues
    else
        echo "✅ All linting issues fixed"
    fi
fi

echo "✅ Pre-commit checks completed"
