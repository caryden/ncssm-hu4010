#!/bin/bash

# RPIV Course Initializer
# Creates a new course project from template

set -e

usage() {
    echo "Usage: $0 <course-code> [template-repo]"
    echo ""
    echo "Arguments:"
    echo "  course-code    Short identifier for the course (e.g., ap-calc-bc)"
    echo "  template-repo  Git repo to clone from (default: current directory)"
    echo ""
    echo "Examples:"
    echo "  $0 ap-calc-bc"
    echo "  $0 innovation-101 https://github.com/user/course-template.git"
    exit 1
}

COURSE_CODE=${1:-""}
TEMPLATE_REPO=${2:-""}

if [ -z "$COURSE_CODE" ]; then
    usage
fi

echo "🎓 Initializing course: $COURSE_CODE"
echo ""

# Create directory
if [ -d "$COURSE_CODE" ]; then
    echo "❌ Directory $COURSE_CODE already exists"
    exit 1
fi

if [ -n "$TEMPLATE_REPO" ]; then
    echo "📦 Cloning from $TEMPLATE_REPO..."
    git clone "$TEMPLATE_REPO" "$COURSE_CODE"
    cd "$COURSE_CODE"
    rm -rf .git
else
    echo "📁 Creating directory structure..."
    mkdir -p "$COURSE_CODE"
    cd "$COURSE_CODE"
fi

# Create directory structure
echo "📂 Creating directories..."
mkdir -p .claude/skills
mkdir -p src/components/presentation
mkdir -p src/config
mkdir -p src/content
mkdir -p src/layouts
mkdir -p src/pages
mkdir -p public/audio
mkdir -p public/images
mkdir -p shared
mkdir -p research

# Create placeholder files
echo "📝 Creating placeholder files..."

# Package.json
cat > package.json << 'EOF'
{
  "name": "COURSE_CODE_PLACEHOLDER",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^4.0.0"
  }
}
EOF
sed -i '' "s/COURSE_CODE_PLACEHOLDER/$COURSE_CODE/" package.json 2>/dev/null || \
sed -i "s/COURSE_CODE_PLACEHOLDER/$COURSE_CODE/" package.json

# Astro config
cat > astro.config.mjs << 'EOF'
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  base: '/',
});
EOF

# TypeScript config
cat > tsconfig.json << 'EOF'
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
EOF

# .gitignore
cat > .gitignore << 'EOF'
# build output
dist/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# environment variables
.env
.env.production
.env.local

# macOS
.DS_Store

# IDE
.vscode/
.idea/

# Astro
.astro/
EOF

# Initialize git
echo "🔧 Initializing git repository..."
git init
git add -A
git commit -m "Initialize $COURSE_CODE course structure

Generated with RPIV course-init skill.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

echo ""
echo "✅ Course project initialized!"
echo ""
echo "📍 Location: $(pwd)"
echo ""
echo "Next steps:"
echo "  1. cd $COURSE_CODE"
echo "  2. npm install"
echo "  3. Run /course-research to begin RPIV workflow"
