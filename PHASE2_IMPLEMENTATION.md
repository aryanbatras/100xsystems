# Phase 2 Implementation: HTML to Quill Editor Conversion System

## Overview
Phase 2 implements a bidirectional content management system that allows converting published HTML back to Quill editor format for editing, with proper image management and article updating capabilities.

## New Features

### 1. Parser Page (`/parser`)
- **Endpoint**: `http://localhost:3000/parser`
- **Purpose**: Test HTML to Quill conversion
- **Features**:
  - Paste HTML content from published articles
  - Extract metadata and content automatically
  - Load content into Quill editor for editing
  - Real-time conversion logging

### 2. Enhanced Admin Component
- **Edit Mode**: Support for editing existing articles
- **Create Mode**: Original functionality for new articles
- **Dynamic UI**: Shows "Save" button for edits, "Publish" button for new articles
- **Article Loading**: Automatically loads existing article data when in edit mode

### 3. HTML to Delta Conversion
- **Service**: `HtmlToDeltaConverter`
- **Features**:
  - Extracts content from `<article class="ql-editor">` tags
  - Parses metadata from script tags
  - Converts HTML back to Quill Delta format
  - Preserves formatting, links, images, and structure

### 4. Article Update System
- **Service**: `ArticleUpdater`
- **Features**:
  - Compare images between old and new versions
  - Upload new images to GitHub
  - Remove stale images from GitHub
  - Update existing articles (PUT vs POST)

### 5. API Endpoints
- **`/api/load-html`**: Load existing article HTML
- **`/api/delete-file`**: Delete stale images from GitHub

## File Structure

```
src/
├── pages/
│   ├── parser/
│   │   ├── index.tsx              # New parser testing page
│   │   └── Parser.module.css      # Parser styles
│   └── admin/
│       └── edit/
│           └── [slug].tsx         # Dynamic edit page
├── core/infrastructure/
│   ├── HtmlToDeltaConverter.ts    # HTML to Delta conversion
│   ├── ArticleUpdater.ts          # Article update service
│   └── publisher.ts               # Enhanced with load/delete methods
├── hooks/
│   └── useArticleUpdate.ts        # Update hook
└── components/
    ├── admin/
    │   ├── Admin.tsx              # Enhanced with edit mode
    │   └── Admin.module.css       # Updated styles
    └── editor/
        ├── CustomQuillEditor.tsx  # Enhanced with save functionality
        └── components/
            └── EditorControls.tsx # Updated for save/publish modes
```

## Usage

### Testing HTML Conversion
1. Navigate to `http://localhost:3000/parser`
2. Paste published HTML content
3. Click "Edit" to convert and load into Quill
4. Review conversion logs and extracted metadata

### Editing Existing Articles
1. Navigate to `http://localhost:3000/admin/edit/[slug]`
2. Article loads automatically with existing content
3. Make changes to content
4. Click "Save" to update the existing article
5. Images are managed automatically (new uploads, stale deletions)

### Creating New Articles
1. Navigate to `http://localhost:3000/admin`
2. Create content as before
3. Click "Publish" to create new article

## Image Management

### Update Process
1. **Comparison**: System compares current vs existing images
2. **Upload**: New images are uploaded to GitHub
3. **Cleanup**: Stale images are removed from GitHub
4. **Metadata**: Image references are updated in article metadata

### Image Storage
- **Path**: `images/[slug]/[slug]-[number].webp`
- **Format**: WebP for compression
- **Naming**: Sequential numbering (001, 002, etc.)

## Technical Details

### HTML Structure Requirements
Published HTML must include:
```html
<script type="application/json" id="article-metadata">
  {"title":"Article Title","slug":"article-slug","date":"2025-01-03","images":["url1","url2"]}
</script>
<article class="ql-editor">
  <!-- Article content here -->
</article>
```

### Conversion Process
1. **Parse HTML**: Extract metadata and content
2. **Clean Content**: Remove custom styling, keep Quill-compatible HTML
3. **Convert to Delta**: Transform HTML to Quill Delta operations
4. **Load Editor**: Populate Quill editor with converted content

### Error Handling
- Graceful fallbacks for missing metadata
- Robust error logging throughout conversion process
- User-friendly error messages in parser interface

## Testing

### Sample HTML
Use `test-article-sample.html` for testing the parser functionality.

### Manual Testing
1. Create an article and publish it
2. Copy the generated HTML
3. Paste it into the parser
4. Verify conversion accuracy
5. Test the edit workflow

## Future Enhancements

- **Batch Operations**: Support for updating multiple articles
- **Version History**: Track article changes over time
- **Preview Mode**: Show changes before saving
- **Image Optimization**: Better compression and format selection
- **Collaborative Editing**: Real-time collaboration features

## Dependencies

The implementation uses existing dependencies:
- `react-quill-new`: Quill editor integration
- `quill-delta-to-html`: Delta to HTML conversion
- `turndown`: HTML to text conversion (available)
- `browser-image-compression`: Image optimization

## Notes

- All existing functionality is preserved
- Backward compatible with Phase 1 articles
- Clean separation between custom HTML and Quill content
- Comprehensive logging for debugging
- Responsive design for mobile devices
