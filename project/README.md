# React Spreadsheet Application

A pixel-perfect React spreadsheet application built with TypeScript, Tailwind CSS, and modern React patterns. This application replicates a Google Sheets/Excel-like experience with advanced spreadsheet functionality.

## 🚀 Features

### Core Functionality
- **Pixel-perfect UI** matching the provided Figma design
- **Interactive spreadsheet grid** with 25 rows and 10 columns
- **Cell selection and editing** with visual feedback
- **Keyboard navigation** using arrow keys, Enter, Escape, and Tab
- **Column resizing** with drag handles
- **Interactive toolbar** with state management
- **Responsive tabs** with hover effects
- **Search functionality** in the navigation bar
- **Notification system** with badge counter

### Spreadsheet Experience
- **Cell Selection**: Click any cell to select it (blue border indicates selection)
- **Cell Editing**: Press Enter or double-click to edit a cell
- **Keyboard Navigation**: 
  - Arrow keys to move between cells
  - Enter to start editing
  - Escape to cancel editing
  - Tab to move to next cell
- **Column Resizing**: Hover over column borders and drag to resize
- **Data Persistence**: Edited cell values are stored in component state

### Interactive Elements
- All toolbar buttons show active/inactive states
- Tab navigation with visual feedback
- Notification badge that clears when clicked
- Search input with real-time logging
- Breadcrumb navigation with click handlers

## 🛠️ Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **Radix UI** components for accessibility
- **Lucide React** for consistent icons
- **Custom hooks** for spreadsheet functionality

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting (if configured)
npm run lint
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components
│   └── spreadsheet/            # Spreadsheet-specific components
├── hooks/                      # Custom React hooks
│   ├── useSpreadsheetNavigation.ts
│   └── useColumnResize.ts
├── screens/
│   └── SpreadsheetStyle/       # Main spreadsheet screen
└── lib/
    └── utils.ts               # Utility functions
```

## 🎯 Key Components

### SpreadsheetCell
A reusable cell component that handles:
- Selection state visualization
- Edit mode with input field
- Keyboard event handling
- Value persistence

### ResizableHeader
Column header component with:
- Drag-to-resize functionality
- Visual resize handles
- Mouse event handling

### Custom Hooks
- `useSpreadsheetNavigation`: Manages cell selection and keyboard navigation
- `useColumnResize`: Handles column width management

## 🎨 Design Implementation

The application achieves pixel-perfect accuracy by:
- Using exact color values from the Figma design
- Implementing precise spacing and typography
- Maintaining consistent component sizing
- Preserving the original layout structure

## 🔧 Trade-offs & Decisions

### State Management
- **Choice**: Local component state instead of Redux/Zustand
- **Rationale**: Simple application scope doesn't require complex state management
- **Trade-off**: Easier to understand but less scalable for larger applications

### Table Implementation
- **Choice**: Custom table implementation with Radix UI primitives
- **Rationale**: Better control over spreadsheet-specific behaviors
- **Trade-off**: More development time but greater customization

### Performance
- **Choice**: React.memo and useCallback for optimization
- **Rationale**: Prevents unnecessary re-renders during cell interactions
- **Trade-off**: Slightly more complex code but better performance

### Accessibility
- **Choice**: Radix UI components for base accessibility
- **Rationale**: Ensures keyboard navigation and screen reader support
- **Trade-off**: Larger bundle size but better user experience

## 🚀 Future Enhancements

- [ ] Cell range selection (Shift+Click)
- [ ] Copy/paste functionality
- [ ] Undo/redo operations
- [ ] Formula support
- [ ] Data validation
- [ ] Export to CSV/Excel
- [ ] Real-time collaboration

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is created as part of a technical assessment and is for demonstration purposes.