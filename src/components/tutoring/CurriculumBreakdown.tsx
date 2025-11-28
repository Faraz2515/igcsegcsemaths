'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Topic {
  name: string
  subtopics: string[]
}

interface CurriculumBreakdownProps {
  title: string
  description: string
  topics: {
    foundation?: Topic[]
    higher?: Topic[]
    core?: Topic[]
    extended?: Topic[]
  }
}

export function CurriculumBreakdown({ title, description, topics }: CurriculumBreakdownProps) {
  const tabs = Object.entries(topics).filter(([, value]) => value && value.length > 0)

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </motion.div>

      <Tabs defaultValue={tabs[0]?.[0]} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
          {tabs.map(([key]) => (
            <TabsTrigger key={key} value={key} className="capitalize">
              {key}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(([key, topicList]) => (
          <TabsContent key={key} value={key} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topicList?.map((topic, index) => (
                <motion.div
                  key={topic.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{topic.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {topic.subtopics.map((subtopic, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {subtopic}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
