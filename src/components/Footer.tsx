import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = 2026;

  const linkGroups = [
    {
      id: 'group-1',
      links: [
        { id: 'footer-home', label: 'Home', href: '/homepage' },
        { id: 'footer-about', label: 'Who We Are', href: '/about' },
        { id: 'footer-services', label: 'Services', href: '/services' },
      ],
    },
    {
      id: 'group-2',
      links: [
        { id: 'footer-contact', label: 'Contact', href: '/contact' },
        { id: 'footer-calc', label: 'Diagnostic', href: '/calculator' },
      ],
    },
    {
      id: 'group-3',
      links: [
        { id: 'footer-nations', label: 'Friendly Nations List', href: '#' },
        { id: 'footer-resources', label: 'Resources', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { id: 'social-linkedin', name: 'LinkedIn', icon: 'LinkIcon', href: '#' },
    { id: 'social-whatsapp', name: 'WhatsApp', icon: 'ChatBubbleLeftRightIcon', href: '#' },
  ];

  return (
    <footer className="bg-background border-t-2 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        {/* Top Row: Link Groups */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-12">
          {linkGroups.map((group) => (
            <div key={group.id} className="space-y-4">
              {group.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="block text-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Row: Copyright, Social, Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-primary/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>© {currentYear} PTY Tropics Advisors</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Panamá 🇵🇦 + El Mundo 🌍</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                aria-label={social.name}
                className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Icon name={social.icon as any} size={20} />
              </a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-accent transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link href="#" className="hover:text-accent transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}