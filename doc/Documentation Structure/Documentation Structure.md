# Documentation Structure

<cite>
**Referenced Files in This Document**   
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [survivex/basic/v2.md](file://pages/docs/survivex/basic/v2.md)
- [survivex/deploy/v1.md](file://pages/docs/survivex/deploy/v1.md)
- [survivex/deploy/v2.md](file://pages/docs/survivex/deploy/v2.md)
- [survivex/guide/v1.md](file://pages/docs/survivex/guide/v1.md)
- [survivex/question/v1.md](file://pages/docs/survivex/question/v1.md)
- [survivex/download.md](file://pages/docs/survivex/download.md)
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [verifymc/command/v1.md](file://pages/docs/verifymc/command/v1.md)
- [verifymc/file/v1.md](file://pages/docs/verifymc/file/v1.md)
- [verifymc/file/v2.md](file://pages/docs/verifymc/file/v2.md)
- [verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [verifymc/guide/default.md](file://pages/docs/verifymc/guide/default.md)
- [verifymc/question/v1.md](file://pages/docs/verifymc/question/v1.md)
- [zh/docs/survivex/basic/v1.md](file://pages/zh/docs/survivex/basic/v1.md)
- [zh/docs/survivex/basic/v2.md](file://pages/zh/docs/survivex/basic/v2.md)
- [zh/docs/survivex/deploy/v1.md](file://pages/zh/docs/survivex/deploy/v1.md)
- [zh/docs/survivex/deploy/v2.md](file://pages/zh/docs/survivex/deploy/v2.md)
- [zh/docs/survivex/guide/v1.md](file://pages/zh/docs/survivex/guide/v1.md)
- [zh/docs/survivex/question/v1.md](file://pages/zh/docs/survivex/question/v1.md)
- [zh/docs/survivex/download.md](file://pages/zh/docs/survivex/download.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)
- [zh/docs/verifymc/command/v1.md](file://pages/zh/docs/verifymc/command/v1.md)
- [zh/docs/verifymc/file/v1.md](file://pages/zh/docs/verifymc/file/v1.md)
- [zh/docs/verifymc/file/v2.md](file://pages/zh/docs/verifymc/file/v2.md)
- [zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md)
- [zh/docs/verifymc/guide/v1.md](file://pages/zh/docs/verifymc/guide/v1.md)
- [zh/docs/verifymc/guide/default.md](file://pages/zh/docs/verifymc/guide/default.md)
- [zh/docs/verifymc/question/v1.md](file://pages/zh/docs/verifymc/question/v1.md)
- [zh/index.md](file://pages/zh/index.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project-Based Organization](#project-based-organization)
3. [Content Type Categories](#content-type-categories)
4. [Versioning Strategy](#versioning-strategy)
5. [Content Categories and Examples](#content-categories-and-examples)
6. [Download Pages and Resource Distribution](#download-pages-and-resource-distribution)
7. [Multi-Language Content Management](#multi-language-content-management)
8. [Documentation Contribution Guidelines](#documentation-contribution-guidelines)
9. [Quality Assurance and Review Process](#quality-assurance-and-review-process)
10. [Conclusion](#conclusion)

## Introduction
The documentation structure within the repository is systematically organized to support two primary projects: SurviveX and VerifyMC. Each project maintains its own documentation hierarchy categorized by content type, including basic features, deployment guides, user guides, FAQs, and downloadable resources. The structure supports versioned documentation through v1.md, v2.md naming conventions, enabling evolutionary content updates while preserving historical versions. Additionally, comprehensive multi-language support is implemented through the /zh directory, ensuring accessibility for Chinese-speaking users. This documentation system emphasizes clarity, maintainability, and user-centric organization to facilitate effective knowledge transfer and community engagement.

## Project-Based Organization
The documentation is hierarchically organized by project, with separate directories for SurviveX and VerifyMC under the main docs path. This project-centric structure allows for focused documentation that aligns with each project's unique features, requirements, and user base. SurviveX documentation centers around a comprehensive Minecraft server distribution with extensive plugin integration, while VerifyMC documentation focuses on a specialized whitelist management system with web-based administration capabilities. Each project directory contains consistent subdirectories for different content types, creating a predictable navigation pattern across both projects. This organizational approach enables users to quickly locate relevant information based on their specific project interest, while maintaining separation between distinct software ecosystems.

**Section sources**
- [survivex/index.md](file://pages/docs/survivex/index.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)

## Content Type Categories
The documentation structure categorizes content by type, with standardized subdirectories across both projects: basic, deploy, guide, question, and download. The "basic" directory contains foundational information about core components and commands, providing users with essential knowledge for initial setup and operation. The "deploy" directory offers step-by-step installation and configuration tutorials for different environments, addressing platform-specific considerations. The "guide" directory provides comprehensive overviews of features, architecture, and usage scenarios, serving as the primary user manual. The "question" directory is reserved for frequently asked questions and troubleshooting content, though currently marked as incomplete in both projects. Finally, the "download" pages facilitate resource distribution through integrated components that connect to external repositories.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [survivex/deploy/v1.md](file://pages/docs/survivex/deploy/v1.md)
- [survivex/guide/v1.md](file://pages/docs/survivex/guide/v1.md)
- [survivex/question/v1.md](file://pages/docs/survivex/question/v1.md)
- [survivex/download.md](file://pages/docs/survivex/download.md)
- [verifymc/command/v1.md](file://pages/docs/verifymc/command/v1.md)
- [verifymc/file/v1.md](file://pages/docs/verifymc/file/v1.md)
- [verifymc/front/v1.md](file://pages/docs/verifymc/front/v1.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [verifymc/guide/default.md](file://pages/docs/verifymc/guide/default.md)
- [verifymc/question/v1.md](file://pages/docs/verifymc/question/v1.md)

## Versioning Strategy
The documentation employs a clear versioning strategy using v1.md, v2.md file naming conventions to indicate evolutionary stages of content. This approach allows for iterative improvements while maintaining access to previous versions, supporting backward compatibility for users on different software versions. The versioning system is consistently applied across all content types and projects, creating a uniform pattern that users can easily recognize and navigate. For example, SurviveX maintains both v1.md and v2.md versions for its basic and deploy documentation, indicating updated content while preserving the original material. Similarly, VerifyMC uses this convention across its file, command, and front-end documentation. This versioning strategy supports documentation evolution without disrupting existing user workflows that may depend on earlier documentation formats.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [survivex/basic/v2.md](file://pages/docs/survivex/basic/v2.md)
- [survivex/deploy/v1.md](file://pages/docs/survivex/deploy/v1.md)
- [survivex/deploy/v2.md](file://pages/docs/survivex/deploy/v2.md)
- [verifymc/file/v1.md](file://pages/docs/verifymc/file/v1.md)
- [verifymc/file/v2.md](file://pages/docs/verifymc/file/v2.md)

## Content Categories and Examples
The documentation encompasses several key content categories, each serving a specific user need. Basic features documentation provides comprehensive lists of plugins and their functionalities, as seen in SurviveX's basic/v1.md which details 32 different Minecraft plugins with descriptions, use cases, and links. Deployment guides offer environment-specific setup instructions, such as SurviveX's Windows and Linux server setup tutorials that include Java installation and startup procedures. User guides deliver holistic overviews of system capabilities, exemplified by VerifyMC's guide/v1.md which explains its whitelist management features, technical stack, and configuration options. FAQ sections are designated for common questions, though currently marked as incomplete in both projects. Each category follows a consistent structure across projects, ensuring users can apply familiar navigation patterns regardless of the specific documentation they are consulting.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [survivex/deploy/v1.md](file://pages/docs/survivex/deploy/v1.md)
- [survivex/guide/v1.md](file://pages/docs/survivex/guide/v1.md)
- [survivex/question/v1.md](file://pages/docs/survivex/question/v1.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [verifymc/question/v1.md](file://pages/docs/verifymc/question/v1.md)

## Download Pages and Resource Distribution
The download.md pages serve as dedicated interfaces for resource distribution, implementing a specialized component that connects to external repositories. These pages utilize a ClientOnly wrapper with a DownloadPage component that specifies the GitHub owner and repository parameters, enabling dynamic content loading from external sources. For example, both SurviveX and VerifyMC have download.md files that reference their respective GitHub repositories (KiteMC/SurviveX and presumably a VerifyMC repository), providing users with direct access to the latest software releases. This approach centralizes download functionality while maintaining separation between documentation and binary distribution. The implementation leverages script setup syntax with Vue components, indicating integration with a modern web framework that supports dynamic content rendering and external API connections for repository information.

**Section sources**
- [survivex/download.md](file://pages/docs/survivex/download.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)

## Multi-Language Content Management
The documentation system implements comprehensive multi-language support through a dedicated /zh directory that mirrors the entire English documentation structure. This parallel hierarchy contains translated versions of all documentation files, maintaining identical organization and naming conventions across languages. The translation management strategy appears to be file-based rather than content-integrated, with separate Markdown files for each language variant. This approach simplifies maintenance by allowing translators to work on isolated files without affecting the original content. The presence of language-specific configuration files in VerifyMC's i18n directory (messages_en.properties and messages_zh.properties) suggests a systematic approach to internationalization that extends beyond documentation to the application interface itself. This structure enables efficient translation workflows while ensuring parity between language versions through consistent file organization.

**Section sources**
- [zh/docs/survivex/basic/v1.md](file://pages/zh/docs/survivex/basic/v1.md)
- [zh/docs/survivex/basic/v2.md](file://pages/zh/docs/survivex/basic/v2.md)
- [zh/docs/survivex/deploy/v1.md](file://pages/zh/docs/survivex/deploy/v1.md)
- [zh/docs/survivex/deploy/v2.md](file://pages/zh/docs/survivex/deploy/v2.md)
- [zh/docs/survivex/guide/v1.md](file://pages/zh/docs/survivex/guide/v1.md)
- [zh/docs/survivex/question/v1.md](file://pages/zh/docs/survivex/question/v1.md)
- [zh/docs/survivex/download.md](file://pages/zh/docs/survivex/download.md)
- [zh/docs/survivex/index.md](file://pages/zh/docs/survivex/index.md)
- [zh/docs/verifymc/command/v1.md](file://pages/zh/docs/verifymc/command/v1.md)
- [zh/docs/verifymc/file/v1.md](file://pages/zh/docs/verifymc/file/v1.md)
- [zh/docs/verifymc/file/v2.md](file://pages/zh/docs/verifymc/file/v2.md)
- [zh/docs/verifymc/front/v1.md](file://pages/zh/docs/verifymc/front/v1.md)
- [zh/docs/verifymc/guide/v1.md](file://pages/zh/docs/verifymc/guide/v1.md)
- [zh/docs/verifymc/guide/default.md](file://pages/zh/docs/verifymc/guide/default.md)
- [zh/docs/verifymc/question/v1.md](file://pages/zh/docs/verifymc/question/v1.md)
- [zh/index.md](file://pages/zh/index.md)

## Documentation Contribution Guidelines
New documentation pages should follow the established structural patterns of project-based organization and content type categorization. Contributors should create new files with versioned naming conventions (v1.md, v2.md) to maintain consistency with the existing versioning strategy. When adding content, contributors should place files in the appropriate project directory (survivex or verifymc) and within the correct content type subdirectory (basic, deploy, guide, question, or download). The structure suggests that new versions should increment the version number rather than overwrite existing files, preserving documentation history. For multi-language contributions, translations should be added to the corresponding path within the /zh directory, mirroring the English documentation structure exactly. Configuration files like those in VerifyMC's system indicate that documentation should include comprehensive examples and parameter descriptions to aid user understanding.

**Section sources**
- [survivex/basic/v1.md](file://pages/docs/survivex/basic/v1.md)
- [survivex/deploy/v1.md](file://pages/docs/survivex/deploy/v1.md)
- [survivex/guide/v1.md](file://pages/docs/survivex/guide/v1.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)
- [verifymc/file/v2.md](file://pages/docs/verifymc/file/v2.md)

## Quality Assurance and Review Process
The documentation quality assurance process is indicated by the placeholder content in question/v1.md files for both projects, which contain a consistent note stating "This post has not been supplemented yet." This standardized messaging suggests a formal review process where documentation completeness is monitored and incomplete sections are clearly marked. The versioning system itself serves as a quality control mechanism, allowing for iterative improvements while maintaining stable reference points. The detailed configuration examples in VerifyMC's documentation, complete with extensive comments and parameter descriptions, indicate an emphasis on thoroughness and user comprehension. The separation of help documentation into dedicated files (config_help_en.yml and config_help_zh.yml) further demonstrates a commitment to comprehensive user support. While the current state shows some documentation gaps, the structural consistency and standardized messaging reflect an organized approach to content quality management.

**Section sources**
- [survivex/question/v1.md](file://pages/docs/survivex/question/v1.md)
- [verifymc/question/v1.md](file://pages/docs/verifymc/question/v1.md)
- [verifymc/file/v2.md](file://pages/docs/verifymc/file/v2.md)
- [verifymc/guide/v1.md](file://pages/docs/verifymc/guide/v1.md)

## Conclusion
The documentation structure demonstrates a well-organized, scalable approach to technical documentation management that effectively supports multiple projects, content types, and languages. By implementing a consistent hierarchical organization based on project and content type, the system provides intuitive navigation and predictable file locations. The versioning strategy using v1.md, v2.md conventions enables evolutionary content development while preserving access to historical information. Comprehensive multi-language support through the /zh directory ensures accessibility for Chinese-speaking users, following the same structural patterns as the English documentation. The presence of dedicated download pages, detailed configuration examples, and standardized quality indicators reflects a mature documentation ecosystem designed for both user accessibility and maintainability. This structure serves as an effective model for organizing technical documentation in multi-project environments with diverse content requirements.