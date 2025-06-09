'use client'

import * as React from 'react'

export function TypographyShowcase() {
  return (
    <div className="space-y-8">
      {/* Headings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Headings</h3>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-bold">Heading 2</h2>
          <h3 className="text-2xl font-bold">Heading 3</h3>
          <h4 className="text-xl font-bold">Heading 4</h4>
          <h5 className="text-lg font-bold">Heading 5</h5>
          <h6 className="text-base font-bold">Heading 6</h6>
        </div>
      </div>

      {/* Paragraph */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Paragraph</h3>
        <div>
          <p>This is a regular paragraph text. It demonstrates the default styling of paragraph elements in our design system. The text has proper line height and spacing for optimal readability.</p>
        </div>
      </div>

      {/* Text Styles */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Text Styles</h3>
        <div className="space-y-2">
          <p>Regular text</p>
          <p className="font-bold">Bold text</p>
          <p className="italic">Italic text</p>
          <p className="underline">Underlined text</p>
          <p className="line-through">Strikethrough text</p>
          <p className="text-sm text-muted-foreground">Muted text</p>
          <p className="text-xs">Small text</p>
          <p className="text-lg">Large text</p>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Links</h3>
        <div>
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">This is a link</a>
        </div>
      </div>

      {/* Lists */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Lists</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-medium mb-2">Ordered List</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ol>
          </div>
          <div>
            <p className="font-medium mb-2">Unordered List</p>
            <ul className="list-disc list-inside space-y-1">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Blockquote */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Blockquote</h3>
        <blockquote className="border-l-4 border-muted-foreground pl-4 italic">
          "This is a blockquote. It's used to highlight important text or quotes from other sources."
        </blockquote>
      </div>

      {/* Code */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Code</h3>
        <div className="space-y-2">
          <p>Inline code: <code className="bg-muted px-1 py-0.5 rounded text-sm">const example = true</code></p>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`function example() {
  return "Hello, World!"
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
} 