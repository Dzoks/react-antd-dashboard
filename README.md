React dashboard layout solution created using AntD and permission based navigation. Supports theming with Less, parameterized routes and private routing.
Contains useful components for dashboard application.

## Required libraries:
 * React v16.13.1 or newer
 * Ant Design v4.2.3 or newer
 * React Router DOM v5.1.2 or newer (if using BasicLayout component)


## BasicLayout
Core component of layout. Includes side menu, header with configurable application name, configurable header elements, configurable header dropdown menu, and main area for page content.

## Useful components:

Header - Component for displaying headers, with title on left and other components (native support for buttons via separate buttons prop) on right.

TooltipButton - Simple component for displaying small circle buttons with tooltip text.

Datatable - Custom version of Antd Table with premade sorters for numbers and strings, and filters for strings, numbers (supports comparison operators >,<,>=,<=), selection and multiple selection. More features (date sorting and filtering, server side pagination, easy actions) coming soon.

withModal HOC - HOC for wrapping Antd Modal component with properties needed for controlling
visibility of modal. Offers showDialog/closeDialog methods with possibility to pass data through method parameter.

FormModal - Modal component created using withModal HOC. Offers showDialog/closeDialog. Offers automatic form validation. Form items are supplied to component as children.

## Installation

```
npm install react-antd-dashboard
```

## Demo application

You can see demo application with examples [here](https://github.com/Dzoks/react-antd-dashboard-demo)