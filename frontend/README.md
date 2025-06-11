# 🚀 Canary Frontend Boilerplate

A modern, production-ready React frontend boilerplate featuring the latest web technologies and best practices. This template provides a solid foundation for building fast, scalable, and maintainable web applications.

## ✨ Features

- **⚡ Vite** - Lightning-fast build tool and dev server
- **⚛️ React 18** - Latest React with concurrent features
- **📘 TypeScript** - Full type safety and better DX
- **🎨 Tailwind CSS v4** - Utility-first CSS framework with the latest features
- **🧩 shadcn/ui** - Beautiful, accessible, and customizable components
- **🎯 Lucide React** - Modern, consistent icon library
- **📏 ESLint** - Code linting with React and TypeScript rules
- **🔧 Path Aliases** - Clean imports with `@/` prefix

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.3.1 | UI Library |
| TypeScript | ~5.8.3 | Type Safety |
| Vite | ^6.3.5 | Build Tool |
| Tailwind CSS | ^4.1.8 | Styling |
| shadcn/ui | Latest | Component Library |
| Lucide React | ^0.513.0 | Icons |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/canarymail/canary-frontend-boilerplate.git
   cd canary-frontend-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── assets/             # Static assets
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Styling

This project uses **Tailwind CSS v4** with shadcn/ui components for styling:

- **Tailwind CSS v4** - Latest version with native CSS features
- **CSS Variables** - For consistent theming
- **shadcn/ui** - Pre-built, accessible components
- **Responsive Design** - Mobile-first approach

### Theme Configuration

The project is configured with the "New York" style variant of shadcn/ui components. You can customize the theme by editing:

- `src/index.css` - CSS variables and global styles
- `components.json` - shadcn/ui configuration

## 🧩 Components

### Available shadcn/ui Components

- **Button** - Various variants and sizes
- **Input** - Form inputs with validation states
- **Card** - Content containers with header/footer
- **Badge** - Status and category indicators
- **Separator** - Visual content dividers

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

## 🔧 Configuration

### Path Aliases

The project includes pre-configured path aliases:

```typescript
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

### TypeScript

- Strict type checking enabled
- Path mapping configured
- React types included

### ESLint

- React and React Hooks rules
- TypeScript ESLint integration
- Modern JavaScript standards

## 📦 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🌟 What's Included

The boilerplate includes a demo application showcasing:

- **Interactive Form** - Email/password form with validation
- **Component Showcase** - All button variants and form components
- **Responsive Layout** - Mobile-first design
- **Icon Integration** - Lucide React icons throughout
- **Type Safety** - Full TypeScript coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or run into issues, please:

1. Check the [documentation](https://vitejs.dev/guide/)
2. Review [shadcn/ui docs](https://ui.shadcn.com/)
3. Open an issue in this repository

---

**Happy coding!** 🎉
