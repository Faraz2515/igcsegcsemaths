import { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { MainContainer } from '@/components/layout/MainContainer'
import { ContactForm } from '@/components/contact'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mail, MessageCircle, Clock, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for GCSE and IGCSE Maths tutoring. Book a free introductory session or send a message.',
}

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@igcsegcsemaths.com',
    href: 'mailto:contact@igcsegcsemaths.com',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: 'Message on WhatsApp',
    href: 'https://wa.me/message',
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
  {
    icon: Globe,
    title: 'Available For',
    value: 'UK, UAE, Qatar, GCC, Asia',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <MainContainer>
      <PageHeader
        title="Get in Touch"
        description="Ready to start your journey to better grades? Book a free introductory session or send me a message with any questions."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Tabs defaultValue="intro" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="intro">Book Intro Session</TabsTrigger>
                  <TabsTrigger value="contact">General Enquiry</TabsTrigger>
                </TabsList>
                <TabsContent value="intro" className="mt-6">
                  <CardTitle>Book a Free Intro Session</CardTitle>
                  <CardDescription className="mt-2">
                    Schedule a free 15-minute introductory session to discuss your goals and see how I can help.
                  </CardDescription>
                  <div className="mt-6">
                    <ContactForm type="intro-session" />
                  </div>
                </TabsContent>
                <TabsContent value="contact" className="mt-6">
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription className="mt-2">
                    Have a question? Send me a message and I will get back to you within 24 hours.
                  </CardDescription>
                  <div className="mt-6">
                    <ContactForm type="contact" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What to Expect</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Free 15-minute intro call</li>
                <li>Discussion of your goals</li>
                <li>Assessment of current level</li>
                <li>Personalized study plan</li>
                <li>No obligation to continue</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Lesson Times</h3>
              <p className="text-sm text-muted-foreground mb-4">
                I offer flexible scheduling to accommodate students in different time zones.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>UK Time</span>
                  <span className="text-muted-foreground">9am - 9pm</span>
                </div>
                <div className="flex justify-between">
                  <span>Gulf Time</span>
                  <span className="text-muted-foreground">12pm - 12am</span>
                </div>
                <div className="flex justify-between">
                  <span>Pakistan Time</span>
                  <span className="text-muted-foreground">2pm - 2am</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainContainer>
  )
}
