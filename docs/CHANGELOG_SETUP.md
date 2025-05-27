# Changelog Configuration Guide

This document explains the changelog and release management setup for the API-CEPOL project.

## Overview

The project uses an automated changelog system based on:

- **[Conventional Commits](https://www.conventionalcommits.org/)** for standardized commit messages
- **[standard-version](https://github.com/conventional-changelog/standard-version)** for automated changelog generation
- **[Semantic Versioning](https://semver.org/)** for version management
- **[commitlint](https://commitlint.js.org/)** for commit message validation
- **[Husky](https://typicode.github.io/husky/)** for Git hooks

## Files Created/Modified

### Configuration Files

- `commitlint.config.js` - Commitlint configuration
- `.versionrc.json` - standard-version configuration
- `.husky/commit-msg` - Git hook for commit message validation
- `CHANGELOG.md` - Auto-generated changelog
- `CONTRIBUTING.md` - Contributing guidelines

### Scripts and Helpers

- `scripts/commit-helper.js` - Interactive commit message helper
- `.github/workflows/release.yml` - Automated release workflow

### Package.json Scripts

```json
{
  "scripts": {
    "commit": "node scripts/commit-helper.js",
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major", 
    "release:patch": "standard-version --release-as patch",
    "release:prerelease": "standard-version --prerelease",
    "release:dry-run": "standard-version --dry-run",
    "prepare": "husky install || true"
  }
}
```

## How to Use

### 1. Making Commits

#### Option A: Use the Interactive Helper

```bash
npm run commit
```

This will guide you through creating a properly formatted commit message.

#### Option B: Manual Commit Messages

Follow the conventional commits format:

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve database connection timeout"
git commit -m "docs: update API documentation"
```

### 2. Creating Releases

#### Automatic Releases

Releases are automatically created when you push to the main branch with conventional commits.

#### Manual Releases

```bash
# Automatic version bump based on commits
npm run release

# Specific version bumps
npm run release:patch  # 1.0.0 → 1.0.1
npm run release:minor  # 1.0.0 → 1.1.0
npm run release:major  # 1.0.0 → 2.0.0

# Preview what would be released
npm run release:dry-run
```

#### GitHub Actions Release

You can also trigger releases from the GitHub Actions tab using the "Release" workflow with manual dispatch.

## Commit Types and Versioning

| Commit Type       | Version Bump | Description              |
| ----------------- | ------------ | ------------------------ |
| `feat`            | Minor        | New feature              |
| `fix`             | Patch        | Bug fix                  |
| `perf`            | Patch        | Performance improvement  |
| `BREAKING CHANGE` | Major        | Breaking change          |
| `docs`            | None         | Documentation only       |
| `style`           | None         | Code style changes       |
| `refactor`        | None         | Code refactoring         |
| `test`            | None         | Test changes             |
| `build`           | None         | Build system changes     |
| `ci`              | None         | CI configuration changes |
| `chore`           | None         | Other changes            |

## Changelog Sections

The generated changelog includes these sections with emojis:

- ✨ **Features** (`feat`)
- 🐛 **Bug Fixes** (`fix`)
- ⚡ **Performance Improvements** (`perf`)
- 🔧 **Maintenance** (`chore`)
- 📚 **Documentation** (`docs`)
- 💄 **Style** (`style`)
- ♻️ **Code Refactoring** (`refactor`)
- ✅ **Tests** (`test`)
- 👷 **Build System** (`build`)
- 🔄 **Continuous Integration** (`ci`)

## Breaking Changes

To indicate breaking changes:

```bash
# Method 1: Add ! after type
git commit -m "feat!: remove deprecated API endpoints"

# Method 2: Include BREAKING CHANGE in footer
git commit -m "feat: new authentication system

BREAKING CHANGE: The old authentication API has been removed."
```

## GitHub Integration

### Release Workflow

The `.github/workflows/release.yml` workflow:

1. Runs on push to main branch or manual dispatch
2. Performs quality checks (lint, format, build, test)
3. Generates changelog and bumps version
4. Creates Git tag and pushes changes
5. Creates GitHub release with changelog content

### Manual Trigger

You can manually trigger releases from GitHub Actions with different release types:
- patch
- minor  
- major
- prerelease

## Validation

### Commit Message Validation

Husky runs commitlint on every commit to ensure messages follow the conventional format. Invalid commits will be rejected.

### Pre-commit Checks

The setup includes validation for:
- Commit message format
- Code formatting (Prettier)
- Linting (ESLint)
- Type checking (TypeScript)
- Tests (Jest)

## Troubleshooting

### Common Issues

1. **Commit rejected**: Ensure your commit message follows the conventional format
2. **Release fails**: Check that all tests pass and code is properly formatted
3. **Version not bumped**: Make sure you have commits that trigger version changes (`feat`, `fix`, `perf`, or breaking changes)

### Debug Commands

```bash
# Check what would be released
npm run release:dry-run

# Validate commit message format
npx commitlint --from HEAD~1 --to HEAD --verbose

# Check current version
node -p "require('./package.json').version"
```

## Best Practices

1. **Use descriptive commit messages**: Be clear about what changed
2. **Group related changes**: Make atomic commits for related changes
3. **Test before committing**: Ensure your changes don't break anything
4. **Use scopes**: Add scopes to provide more context (e.g., `feat(auth): add login`)
5. **Document breaking changes**: Always explain breaking changes clearly

## Migration from Manual Changelog

If you were maintaining a manual changelog:

1. The existing `CHANGELOG.md` content is preserved
2. New entries will be automatically generated above existing content
3. You can still manually edit the `[Unreleased]` section if needed

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [standard-version Documentation](https://github.com/conventional-changelog/standard-version)
- [commitlint Documentation](https://commitlint.js.org/) 