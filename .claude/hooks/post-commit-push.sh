#!/bin/bash
# Claude Code hook to automatically lint, fix, and push to remote after commit

# Get the current branch name
current_branch=$(git branch --show-current)

# Check if we're on a feature branch or main branches
if [[ "$current_branch" == "main" ]] || [[ "$current_branch" == "preview" ]] || [[ "$current_branch" == "staging" ]] || [[ "$current_branch" == feature/* ]] || [[ "$current_branch" == fix/* ]] || [[ "$current_branch" == cursor/* ]]; then
    echo "🔧 Running linter and fixing issues..."
    
    # Run linter with auto-fix
    bun lint:fix
    lint_exit_code=$?
    
    if [ $lint_exit_code -ne 0 ]; then
        echo "⚠️  Linting found issues that couldn't be auto-fixed"
        echo "📝 Attempting to fix TypeScript errors..."
        
        # Run TypeScript compiler to check for errors
        bun tsc --noEmit
        tsc_exit_code=$?
        
        if [ $tsc_exit_code -ne 0 ]; then
            echo "❌ TypeScript errors found. Please fix them manually before pushing."
            echo "💡 Run 'bun tsc --noEmit' to see the errors"
            exit 1
        fi
    fi
    
    # Check if linter made any changes
    if ! git diff --quiet; then
        echo "📝 Linter fixed some issues. Adding changes..."
        git add -A
        git commit --amend --no-edit
        echo "✅ Amended commit with linter fixes"
    fi
    
    echo "🚀 Auto-pushing to remote branch: $current_branch"
    git push origin "$current_branch"
    
    # Check if push was successful
    if [ $? -eq 0 ]; then
        echo "✅ Successfully pushed to $current_branch"
    else
        echo "❌ Failed to push to $current_branch"
        echo "You may need to pull changes first or resolve conflicts"
        echo "💡 Try: git pull origin $current_branch --rebase"
    fi
else
    echo "📝 Committed to local branch: $current_branch"
    echo "ℹ️  Auto-push is only enabled for main, preview, staging, and feature/fix/cursor branches"
fi
