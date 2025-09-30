# Multi-Language Management

<cite>
**Referenced Files in This Document**   
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)
- [verifymc/index.md](file://pages/docs/verifymc/index.md)
- [zh/docs/verifymc/index.md](file://pages/zh/docs/verifymc/index.md)
- [survivex/download.md](file://pages/docs/survivex/download.md)
- [zh/docs/survivex/download.md](file://pages/zh/docs/survivex/download.md)
- [verifymc/download.md](file://pages/docs/verifymc/download.md)
- [zh/docs/verifymc/download.md](file://pages/zh/docs/verifymc/download.md)
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [zh/docs/survivex/basic/v1.md](file://pages/zh/docs/survivex/basic/v1.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [zh/docs/verifymc/guide/v1.md](file://pages/zh/docs/verifymc/guide/v1.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure and Language Mirroring](#project-structure-and-language-mirroring)
3. [Synchronization Process Between Language Versions](#synchronization-process-between-language-versions)
4. [Navigation Between Language Versions](#navigation-between-language-versions)
5. [Adaptation of Language-Specific Content](#adaptation-of-language-specific-content)
6. [Workflow for Adding New Translations](#workflow-for-adding-new-translations)
7. [Maintaining Version Alignment Across Language Variants](#maintaining-version-alignment-across-language-variants)
8. [Best Practices for Localization of Technical Content](#best-practices-for-localization-of-technical-content)
9. [Conclusion](#conclusion)

## Introduction

The documentation system for the KiteMC projects (SurviveX and VerifyMC) implements a comprehensive multi-language management strategy, with full support for both English and Chinese documentation. The structure is designed to ensure parity between language versions while allowing for regional adaptations where necessary. This document details the architecture, synchronization mechanisms, and best practices for maintaining high-quality localized documentation across multiple versions and product lines.

**Section sources**
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)

## Project Structure and Language Mirroring

The documentation tree follows a mirrored structure between English and Chinese versions, with the `/docs` directory containing the primary English documentation and the `/zh/docs` directory housing the complete Chinese translation. Both directories maintain identical subdirectory hierarchies for each product (SurviveX and VerifyMC), including versioned documentation (v1.md, v2.md), guides, deployment instructions, and feature documentation.

This mirroring ensures that users accessing either language version experience consistent navigation and content organization. The structure supports multiple products and versions simultaneously, with parallel paths for each documentation type across both languages.

```mermaid
graph TB
A[/pages] --> B[/docs]
A --> C[/zh/docs]
B --> D[survivex/]
B --> E[verifymc/]
C --> F[survivex/]
C --> G[verifymc/]
D --> H[guide/v1.md]
D --> I[deploy/v1.md]
F --> J[guide/v1.md]
F --> K[deploy/v1.md]
E --> L[guide/v1.md]
G --> M[guide/v1.md]
```

**Diagram sources**
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)

**Section sources**
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)

## Synchronization Process Between Language Versions

The synchronization process between English and Chinese documentation is maintained through a structured workflow that ensures content parity. When updates are made to the English documentation, they trigger a translation workflow for the corresponding Chinese files. The versioned documentation files (v1.md, v2.md) are synchronized independently, allowing for targeted updates to specific versions without affecting others.

The system uses identical file names and paths across both language trees, enabling automated comparison tools to identify discrepancies and track translation progress. This approach minimizes the risk of content drift between language versions and facilitates efficient review processes.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [zh/docs/survivex/basic/v1.md](file://pages/zh/docs/survivex/basic/v1.md)

## Navigation Between Language Versions

Users can seamlessly navigate between language versions through the localized home pages of each product. The English documentation home pages (e.g., survivex/index.md) provide product information, features, and action links in English, while the Chinese counterparts (zh/docs/survivex/index.md) offer identical content in Chinese with localized terminology and cultural adaptations.

The navigation structure remains consistent across languages, with equivalent links and pathways to documentation, downloads, and GitHub repositories. This consistency ensures that users switching between languages can easily find the same information without relearning the navigation paradigm.

**Section sources**
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)
- [verifymc/index.md](file://pages/docs/verifymc/index.md)
- [zh/docs/verifymc/index.md](file://pages/zh/docs/verifymc/index.md)

## Adaptation of Language-Specific Content

While most documentation is directly translated, certain content is adapted to meet regional needs. The download.md files in both English and Chinese versions use the same component-based implementation (<DownloadPage>) but are maintained in parallel to allow for potential regional download server configurations or localization of user interface elements within the download component.

Technical terms and product names remain consistent across languages to maintain accuracy, while explanatory text and examples are fully localized for cultural relevance. The system supports language-specific features such as different email domain whitelists or region-appropriate examples while preserving the core technical functionality.

**Section sources**
- [survivex/download.md](file://pages/docs/survivex/download.md)
- [zh/docs/survivex/download.md](file://pages/zh/docs/survivex/download.md)
- [verifymc/download.md](file://pages/docs/verifymc/download.md)
- [zh/docs/verifymc/download.md](file://pages/zh/docs/verifymc/download.md)

## Workflow for Adding New Translations

The workflow for adding new translations begins with creating the English version of a document, followed by translation into Chinese while maintaining identical file paths and names. Translators work with the versioned documentation files (v1.md, v2.md) to ensure that each version receives appropriate localization.

The process includes terminology consistency checks to ensure that technical terms are translated uniformly across all documents. Reviewers verify both linguistic accuracy and technical correctness, with special attention to code examples, configuration parameters, and command references that must remain identical across languages.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [zh/docs/survivex/basic/v1.md](file://pages/zh/docs/survivex/basic/v1.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [zh/docs/verifymc/guide/v1.md](file://pages/zh/docs/verifymc/guide/v1.md)

## Maintaining Version Alignment Across Language Variants

Maintaining version alignment between language variants presents challenges, particularly with versioned files like v1.md and v2.md. The system addresses this by treating each version file as an independent translation unit, allowing updates to specific versions without requiring simultaneous updates to all language versions.

Version synchronization is tracked through file modification dates and content comparison tools that highlight differences between corresponding files in different languages. This enables maintainers to identify and prioritize translation updates for recently modified English documentation, ensuring that critical updates are promptly available in both languages.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [zh/docs/survivex/basic/v1.md](file://pages/zh/docs/survivex/basic/v1.md)

## Best Practices for Localization of Technical Content

The localization process emphasizes technical accuracy while ensuring linguistic naturalness. Code examples, command references, and configuration documentation are preserved exactly as in the original, with only explanatory text being translated. This approach prevents errors that could arise from mistranslating technical syntax.

Terminology consistency is maintained through a shared glossary of technical terms that are translated uniformly across all documentation. The system supports inline code blocks and configuration examples that remain unchanged between language versions, ensuring that users can copy and paste commands or configuration snippets with confidence.

For complex technical concepts, additional explanatory text may be added in the Chinese version to provide cultural context or clarify concepts that may be less familiar to the target audience, while preserving the original technical meaning.

**Section sources**
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [zh/docs/verifymc/guide/v1.md](file://pages/zh/docs/verifymc/guide/v1.md)

## Conclusion

The multi-language documentation system for KiteMC projects demonstrates a robust approach to managing parallel English and Chinese content. By implementing a mirrored directory structure, consistent synchronization processes, and clear workflows for translation and version management, the system ensures that users in different language regions can access high-quality, technically accurate documentation. The balance between content parity and regional adaptation allows for both consistency and cultural relevance, supporting the global user base of SurviveX and VerifyMC.