# Contributing to API-CEPOL

Thank you for your interest in contributing to API-CEPOL! This document provides guidelines for contributing to the project.

## Table of Contents

- [Development Setup](#development-setup)
- [Commit Message Convention](#commit-message-convention)
- [Changelog](#changelog)
- [Release Process](#release-process)
- [Pull Request Process](#pull-request-process)

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Start development server: `npm run dev`

## Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. All commit messages must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```bash
feat: add user authentication
fix: resolve database connection timeout
docs: update API documentation
style: format code with prettier
refactor: simplify user validation logic
perf: optimize database queries
test: add unit tests for user service
build: update webpack configuration
ci: add automated testing workflow
chore: update dependencies
```

### Scope (Optional)

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

### Breaking Changes

To indicate a breaking change, add `!` after the type/scope:

```bash
feat!: remove deprecated API endpoints
```

Or include `BREAKING CHANGE:` in the footer:

```bash
feat: new authentication system

BREAKING CHANGE: The old authentication API has been removed.
```

## Changelog

Our changelog is automatically generated from commit messages using [standard-version](https://github.com/conventional-changelog/standard-version). The changelog follows the [Keep a Changelog](https://keepachangelog.com/) format.

### How it works

1. Commit messages following the conventional commits format are automatically categorized
2. Version numbers are incremented based on the types of changes:
   - **BREAKING CHANGE**: major version (1.0.0 → 2.0.0)
   - **feat**: minor version (1.0.0 → 1.1.0)
   - **fix**, **perf**: patch version (1.0.0 → 1.0.1)
3. The changelog is updated with new entries
4. A git tag is created for the new version

### Manual Changelog Entries

If you need to add something to the changelog that isn't captured by commit messages, you can manually edit the `CHANGELOG.md` file under the `[Unreleased]` section.

## Release Process

### Automatic Releases

Releases are automated through GitHub Actions. When you push to the main branch with properly formatted commit messages, a new release will be created automatically.

### Manual Releases

You can also trigger releases manually:

```bash
# Create a patch release (1.0.0 → 1.0.1)
npm run release:patch

# Create a minor release (1.0.0 → 1.1.0)
npm run release:minor

# Create a major release (1.0.0 → 2.0.0)
npm run release:major

# Create a prerelease (1.0.0 → 1.0.1-0)
npm run release:prerelease

# Dry run to see what would be released
npm run release:dry-run
```

### GitHub Workflow Dispatch

You can also trigger releases from the GitHub Actions tab using the "Release" workflow with manual dispatch.

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes following the coding standards
4. Write or update tests as needed
5. Ensure all tests pass: `npm test`
6. Check code formatting: `npm run format:check`
7. Run linting: `npm run lint`
8. Commit your changes using conventional commit messages
9. Push to your fork: `git push origin feat/your-feature-name`
10. Create a pull request

### Pull Request Guidelines

- **Title**: Use conventional commit format for the PR title
- **Description**: Provide a clear description of the changes
- **Tests**: Include tests for new features or bug fixes
- **Documentation**: Update documentation if needed
- **Breaking Changes**: Clearly document any breaking changes

### Code Review Process

1. All PRs require at least one approval
2. All CI checks must pass
3. Code should follow the existing style and conventions
4. Tests should have good coverage
5. Documentation should be updated as needed

## Getting Help

If you have questions or need help:

1. Check existing issues on GitHub
2. Create a new issue with a clear description
3. Join our community discussions

Thank you for contributing to API-CEPOL! 🚀 