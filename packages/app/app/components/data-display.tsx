'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

export function DataDisplayShowcase() {
  const t = useTranslations('components')

  return (
    <div className="space-y-8">
      {/* Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Table</h3>
        <Table>
          <TableCaption>A list of users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell className="text-right">28</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell className="text-right">34</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Robert Johnson</TableCell>
              <TableCell>robert@example.com</TableCell>
              <TableCell className="text-right">45</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('data.card.title')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('data.card.title')}</CardTitle>
              <CardDescription>{t('data.card.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('data.card.content')}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">{t('data.card.actions.cancel')}</Button>
              <Button>{t('data.card.actions.action')}</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('data.card.analytics.title')}</CardTitle>
              <CardDescription>{t('data.card.analytics.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>{t('data.card.analytics.visitors')}</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span>{t('data.card.analytics.orders')}</span>
                <span className="font-medium">56</span>
              </div>
              <div className="flex justify-between">
                <span>{t('data.card.analytics.revenue')}</span>
                <span className="font-medium">$5,678</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('data.list.title')}</h3>
        <div className="rounded-md border divide-y">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('data.list.item1.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('data.list.item1.description')}</p>
              </div>
              <Button variant="ghost">{t('data.list.view')}</Button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('data.list.item2.title')}</h4>
                <p className="text-sm text-muted-foreground">{t('data.list.item2.description')}</p>
              </div>
              <Button variant="ghost">{t('data.list.view')}</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('data.badge.title')}</h3>
        <div className="flex gap-2">
          <Badge>{t('data.badge.default')}</Badge>
          <Badge variant="secondary">{t('data.badge.secondary')}</Badge>
          <Badge variant="outline">{t('data.badge.outline')}</Badge>
          <Badge variant="destructive">{t('data.badge.destructive')}</Badge>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('data.tags.title')}</h3>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">{t('data.tags.blue')}</Badge>
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">{t('data.tags.green')}</Badge>
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">{t('data.tags.red')}</Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">{t('data.tags.yellow')}</Badge>
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Accordion</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              Content for accordion item 1. This can contain any content you want to show when expanded.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              Content for accordion item 2. This can contain any content you want to show when expanded.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tabs for Data */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tabs for Data</h3>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="p-4 rounded-md border mt-2">
              <h4 className="text-lg font-medium">Overview</h4>
              <p>This is the overview tab content.</p>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="p-4 rounded-md border mt-2">
              <h4 className="text-lg font-medium">Analytics</h4>
              <p>Analytics content goes here.</p>
            </div>
          </TabsContent>
          <TabsContent value="reports">
            <div className="p-4 rounded-md border mt-2">
              <h4 className="text-lg font-medium">Reports</h4>
              <p>Reports content goes here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 