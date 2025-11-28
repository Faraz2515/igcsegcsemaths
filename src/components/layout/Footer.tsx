import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  tutoring: [
    { name: 'GCSE Maths', href: '/tutoring/gcse' },
    { name: 'IGCSE Maths', href: '/tutoring/igcse' },
    { name: 'Group Classes', href: '/group-classes' },
  ],
  resources: [
    { name: 'Past Papers', href: '/past-papers' },
    { name: 'Predicted Papers', href: '/predicted-papers' },
    { name: 'Worksheets', href: '/worksheets' },
    { name: 'Free Resources', href: '/free-resources' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold text-primary">
              IGCSE GCSE Maths
            </Link>
            <p className="text-sm text-muted-foreground">
              Expert GCSE and IGCSE Maths tutoring for students in the UK, UAE, Qatar, GCC, and Asia. 
              Achieve your best grades with personalized 1-to-1 lessons and comprehensive resources.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contact@igcsegcsemaths.com" className="hover:text-foreground">
                  contact@igcsegcsemaths.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="https://wa.me/message" className="hover:text-foreground">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Online Worldwide</span>
              </div>
            </div>
          </div>

          {/* Tutoring Links */}
          <div>
            <h3 className="font-semibold mb-4">Tutoring</h3>
            <ul className="space-y-2">
              {footerLinks.tutoring.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IGCSE GCSE Maths. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Edexcel & Cambridge Specialist</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
