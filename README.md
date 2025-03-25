# React Visualization Component Library - Take Home Exercise

## Overview

Build two data visualization components using React, TypeScript, and Apollo Client. The exercise should take approximately 2 hours to complete.

## Requirements

1. Create a mini dashboard with these specific components:

   - **Region Bar Chart**: A horizontal bar chart visualization using SVG (no external chart libraries) that shows number of languages spoken by continent. Each continent should be represented as a horizontal bar with:

     - Continent name label on the left
     - Number of spoken languages label on the right
     - Bar length proportional to number of languages
     - Visual indication when a continent is selected

   - **Country Data Table**: A sortable table showing country details with these specific columns:
     - Country name
     - Capital city
     - Number of spoken languages
     - Continent name

   Component scaffolds are provided. Feel free to adapt props signature, types, etc. as needed.

2. Implement GraphQL data fetching using Apollo Client:

   - Use the Countries GraphQL API (https://countries.trevorblades.com/)
   - Display loading indicators while data is being fetched
   - Show appropriate error messages if API requests fail

3. Build specific interactive features:

   - Clicking on a continent bar in the chart should:
     - Highlight that continent visually (change color)
     - Filter the countries table to show only countries in that continent
     - Clicking the same continent again should clear the filter
   - Country table should:
     - Allow sorting by country name (A-Z, Z-A)
     - Allow sorting by number of spoken languages (high-low, low-high)
     - Display the current sort direction with an arrow indicator
     - Update immediately when continent filter changes

4. Add responsive behavior:
   - Components should maintain usability at 768px and 1280px widths
   - Chart should scale proportionally with container width
   - Table should include horizontal scrolling on small screens

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Evaluation Criteria

- **Component Architecture**: How well components are structured, with clean separation of concerns. Consider them as flexible components in a data viz library. When in doubt, lean on established patterns as popularised by D3 and similar libraries.
- **GraphQL Implementation**: Proper use of Apollo Client, query structure, and caching
- **TypeScript Usage**: Appropriate typing of props, state, and GraphQL data
- **Interaction Handling**: Implementation of filters, sorting, and click handlers
- **Loading & Error States**: Clear feedback to users during data fetching
- **Visual Implementation**: Correct implementation of the SVG chart visualization
- **Code Quality**: Readability, maintainability, and adherence to React best practices

## Deliverables

1. Working implementation of the Region Bar Chart and Country Data Table components
2. Functional interactions between components as specified
3. Clean, well-typed TypeScript code
4. Basic styling for usability

## Time Expectation

This exercise is designed to be completed in about 2 hours. Focus on implementing the core functionality rather than perfecting the visual design. If time allows, consider adding:

- Animations for state transitions
- Additional sorting options
- A search filter for countries
