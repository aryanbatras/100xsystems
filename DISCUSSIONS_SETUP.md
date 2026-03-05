# Discussion System Setup Guide

This guide explains how to set up and configure the giscus-based discussion system for 100xSystems articles.

## Overview

The discussion system uses **giscus** - a comments system powered by GitHub Discussions. It's completely free, scalable, and leverages GitHub's infrastructure.

## Features

- ✅ **Zero Cost**: No database or hosting fees
- ✅ **Scalable**: Handles 1000+ articles without performance issues
- ✅ **GitHub Integration**: Uses GitHub OAuth and user management
- ✅ **Performance Optimized**: Lazy loading and caching
- ✅ **Theme Support**: Automatic dark/light mode switching
- ✅ **Moderation**: Built-in GitHub moderation tools

## Setup Instructions

### 1. Create a Discussion Repository

1. **Create a new public GitHub repository** for discussions (e.g., `100xsystems-discussions`)
2. **Enable Discussions** in the repository settings:
   - Go to Settings → General → Features
   - Check "Discussions"
   - Set up discussion categories

### 2. Install giscus App

1. Visit [giscus.app](https://giscus.app/)
2. Click "Install giscus app"
3. Select your discussion repository
4. Grant necessary permissions

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
# Giscus Discussion Configuration
# Get these values from https://giscus.app/
NEXT_PUBLIC_GISCUS_REPO=your-username/your-discussions-repo
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOF1L2fM4B-hVS
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOF1L2fM4B-hVS
```

**How to get the values:**
1. Go to [giscus.app](https://giscus.app/)
2. Enter your discussion repository name
3. Select "Discussion title contains page \<title\>"
4. Choose a discussion category
5. Copy the generated configuration values

### 4. Enable Discussions for Articles

Discussion functionality is controlled through article manifests. To enable discussions for an article:

```json
{
  "discussion": {
    "enabled": true,
    "provider": "giscus"
  }
}
```

### 5. Admin Panel Management

The admin panel includes discussion management:

1. Go to `/admin/manifests`
2. Edit any article manifest
3. Toggle "Enable Discussion" checkbox
4. Select provider (currently only "giscus")
5. Save changes

## Configuration Options

### Giscus Component Props

```typescript
interface GiscusCommentsProps {
  title: string;                    // Article title for discussion mapping
  repo?: string;                    // GitHub repository (owner/repo)
  repoId?: string;                  // Repository ID from giscus.app
  category?: string;                // Discussion category
  categoryId?: string;              // Category ID from giscus.app
  theme?: 'light' | 'dark' | 'preferred_color_scheme';
  lang?: string;                    // Language code
  loading?: 'lazy' | 'eager';       // Loading strategy
  className?: string;               // CSS classes
}
```

### Discussion Mapping Strategy

The system uses **"Discussion title contains page \<title\>"** mapping:
- Each article's HTML `<title>` tag content is used to find/create discussions
- Discussions are automatically created when the first comment is left
- Titles must match exactly for proper discussion association

## Performance Features

### Lazy Loading
- Discussions load only when scrolled into view
- 50px margin before loading for smooth experience
- Placeholder shown during loading

### Theme Support
- Automatic dark/light mode detection
- Respects system preferences
- Smooth theme transitions

### Caching
- Client-side caching for discussion metadata
- Reduced API calls for better performance
- Memoized configuration prevents re-renders

## Styling

### CSS Classes
```css
.discussionSection     /* Main discussion container */
.discussionTitle       /* Discussion heading */
.giscusComments        /* Giscus component wrapper */
.giscus-container      /* Giscus container */
.comments-placeholder  /* Configuration missing placeholder */
.comments-loading-placeholder /* Lazy loading placeholder */
```

### Customization
- Styles are in `src/pages/articles/Articles.module.css`
- Responsive design for mobile and desktop
- Matches site design language

## Troubleshooting

### Common Issues

**Comments not showing:**
1. Check environment variables are set correctly
2. Verify repository is public
3. Ensure giscus app is installed
4. Check discussion category exists

**Discussions not linking:**
1. Verify article titles match discussion titles exactly
2. Check mapping strategy is set to "title"
3. Ensure discussions are enabled in manifest

**Performance issues:**
1. Lazy loading is enabled by default
2. Check for console warnings
3. Verify repo/category IDs are correct

### Environment Variables Missing

If you see "Comments are not configured yet" message:
1. Copy `.env.example` to `.env.local`
2. Fill in the giscus configuration values
3. Restart the development server

### Private Repository Issues

If your content repository is private:
1. Create a separate public repository for discussions
2. Use the public repository in giscus configuration
3. Content can remain private while discussions are public

## Usage Examples

### Basic Usage
```tsx
import GiscusComments from '@/components/discussions/GiscusComments';

<GiscusComments 
  title="My Article Title"
  className="my-comments"
/>
```

### With Custom Configuration
```tsx
<GiscusComments 
  title="My Article Title"
  repo="custom/repo"
  theme="dark"
  loading="eager"
/>
```

### Conditional Rendering
```tsx
{manifest?.discussion?.enabled && (
  <GiscusComments title={articleTitle} />
)}
```

## Migration from Other Systems

If you're migrating from another comment system:
1. Export existing comments if possible
2. Create GitHub Discussions manually if needed
3. Ensure titles match for proper mapping
4. Update article manifests to enable discussions

## Security Considerations

- All authentication handled by GitHub OAuth
- No user data stored on your servers
- GitHub's security policies apply
- Discussions inherit repository permissions

## Analytics and Metrics

The system includes:
- Comment count tracking
- Discussion engagement metrics
- Performance monitoring
- Error tracking and logging

## Support

For issues related to:
- **giscus**: [giscus GitHub](https://github.com/giscus/giscus)
- **GitHub Discussions**: [GitHub Docs](https://docs.github.com/en/discussions)
- **This implementation**: Check the admin panel or contact maintainers

## Future Enhancements

Planned improvements:
- Comment count badges on article listings
- Advanced moderation tools
- Discussion analytics dashboard
- Bulk discussion management
- Custom themes and styling options
