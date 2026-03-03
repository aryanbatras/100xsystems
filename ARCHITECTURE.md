# 🏗️ Project Architecture

## 📁 Folder Structure

```
src/
├── 📂 shared/                    # Shared across all features
│   ├── 📂 types/                 # TypeScript interfaces & types
│   │   └── index.ts              # All type definitions
│   └── 📂 utils/                 # Utility functions
│       ├── dateUtils.ts          # SSR-safe date handling
│       ├── logger.ts             # Logging system
│       └── index.ts              # Utility exports
│
├── 📂 core/                      # Business logic & infrastructure
│   ├── 📂 domain/                # Core business logic
│   │   ├── slugGenerator.ts      # SEO-friendly slug generation
│   │   └── index.ts              # Domain exports
│   ├── 📂 infrastructure/        # External integrations
│   │   ├── htmlConverter.ts      # Quill Delta → HTML conversion
│   │   ├── imageProcessor.ts     # Image processing pipeline
│   │   ├── publisher.ts          # GitHub publishing
│   │   └── index.ts              # Infrastructure exports
│   └── 📂 services/              # Business workflows
│       ├── publishingService.ts # Publishing orchestration
│       └── index.ts              # Service exports
│
├── 📂 features/                  # Feature-specific code
│   └── 📂 publishing/            # Article publishing feature
│       ├── useImageProcessing.ts # React hook for images
│       ├── htmlGenerator.ts      # Legacy compatibility layer
│       └── index.ts              # Feature exports
│
├── 📂 components/                # React components
├── 📂 hooks/                     # Global React hooks
├── 📂 lib/                       # Legacy compatibility
├── 📂 pages/                     # Next.js pages
└── 📂 styles/                    # CSS/styling
```

## 🎯 Architecture Principles

### **1. Separation of Concerns**
- **Domain Layer**: Pure business logic (no external dependencies)
- **Infrastructure Layer**: External integrations (GitHub, Quill, etc.)
- **Service Layer**: Workflow orchestration
- **Feature Layer**: UI-specific logic and React hooks

### **2. Dependency Flow**
```
Features → Services → Domain & Infrastructure → Shared Utils/Types
```

### **3. Import Patterns**
```typescript
// ✅ GOOD - Clear dependency direction
import { PublishingService } from '../core/services';
import { HtmlConverter } from '../core/infrastructure';
import { log } from '../shared/utils';

// ❌ BAD - Circular dependencies
import { Something } from '../features/publishing'; // from core layer
```

## 📦 Layer Responsibilities

### **📋 Shared Layer**
- **Types**: All TypeScript interfaces and enums
- **Utils**: Pure functions (date handling, logging, etc.)

### **🏛️ Core Layer**
- **Domain**: Business rules and validation
- **Infrastructure**: External service integrations
- **Services**: Complex business workflows

### **⚡ Features Layer**
- React hooks and UI-specific logic
- Feature-specific state management
- User interaction handling

## 🔄 Data Flow

```
👤 User Input
    ↓
🎯 Feature Layer (React Hook)
    ↓
🏛️ Service Layer (Workflow)
    ↓
📋 Domain Layer (Business Logic)
    ↓
🔧 Infrastructure Layer (External APIs)
    ↓
🌐 External Services (GitHub, etc.)
```

## 🧪 Testing Strategy

### **Unit Tests**
```typescript
// Domain Layer - Pure functions
describe('SlugGenerator', () => {
  it('should generate valid slugs', () => {
    const result = SlugGenerator.generateSlug('My Article Title');
    expect(result).toBe('my-article-title');
  });
});

// Infrastructure Layer - Mock external dependencies
describe('HtmlConverter', () => {
  it('should convert delta to HTML', () => {
    const result = HtmlConverter.convertDeltaToHtml(mockDelta, title, slug, []);
    expect(result.html).toContain('<article>');
  });
});
```

### **Integration Tests**
```typescript
// Service Layer - Test workflows
describe('PublishingService', () => {
  it('should publish complete article', async () => {
    const result = await PublishingService.publishArticle(mockInput);
    expect(result.success).toBe(true);
    expect(result.htmlUrl).toBeDefined();
  });
});
```

## 🚀 Usage Examples

### **Simple Publishing**
```typescript
import { PublishingService } from '../core/services';

const result = await PublishingService.publishArticle({
  delta: quillDelta,
  title: "My Article"
});
```

### **Individual Components**
```typescript
import { SlugGenerator } from '../core/domain';
import { HtmlConverter } from '../core/infrastructure';
import { log } from '../shared/utils';

const slug = SlugGenerator.generateSlug("My Title");
const result = HtmlConverter.convertDeltaToHtml(delta, title, slug, images);
log('Processing complete', 'success');
```

### **React Hook Usage**
```typescript
import { useImageProcessing } from '../features/publishing';

const { extractImages, uploadImages } = useImageProcessing();
const images = extractImages(delta);
const uploaded = await uploadImages(images, slug);
```

## 🔄 Migration Guide

### **From Old Structure**
```typescript
// OLD
import { generateHTML } from '../utils/htmlGenerator';
import { log } from '../lib/logger';

// NEW
import { PublishingService } from '../core/services';
import { log } from '../shared/utils';
```

### **Feature Development**
1. **New Type**: Add to `shared/types/index.ts`
2. **New Utility**: Add to `shared/utils/`
3. **New Business Logic**: Add to `core/domain/`
4. **New External Integration**: Add to `core/infrastructure/`
5. **New Workflow**: Add to `core/services/`
6. **New UI Feature**: Add to `features/[feature-name]/`

## 🛡️ Benefits

1. **Scalability**: Easy to add new features without affecting existing code
2. **Maintainability**: Clear separation makes debugging and modifications easier
3. **Testability**: Each layer can be tested independently
4. **Reusability**: Shared utilities and types across features
5. **Performance**: Better tree-shaking and code splitting
6. **Developer Experience**: Clear import paths and predictable structure

## 📏 Naming Conventions

- **Files**: `PascalCase.ts` for classes, `camelCase.ts` for utilities
- **Folders**: `camelCase` for features, `PascalCase` for layers
- **Exports**: Use `index.ts` files for clean imports
- **Types**: All centralized in `shared/types/`

This architecture provides a solid foundation for scaling the application while maintaining clean code principles and developer productivity.
