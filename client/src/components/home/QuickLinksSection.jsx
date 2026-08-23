import React from 'react';
import { 
  LayoutGrid, 
  Download,
  MoreVertical
} from 'lucide-react';
import { WhatsAppIcon } from '../common/SocialIcons';

const mainLinks = [
  {
    title: 'PORTFOLIO MATRIX',
    url: 'https://docs.google.com/spreadsheets/d/1_MfLKeuOTyJ7o6DvlhX7PX2uVqy_yCWT--sLlqufl84/edit?gid=0#gid=0',
    icon: LayoutGrid
  },
  {
    title: 'Join our WhatsApp Channel',
    url: 'https://www.whatsapp.com/channel/0029VbBYYvMLCoX1fkEsGC40',
    icon: WhatsAppIcon
  },
  {
    title: 'Download Brochure',
    url: '/brochure.pdf',
    icon: Download
  }
];

export default function QuickLinksSection() {
  return (
    <section className="py-8 bg-ivory border-b border-border-light/60">
      <div className="container-wide px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Links arranged horizontally */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {mainLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3.5 bg-navy text-white rounded-xl shadow-[4px_4px_0px_0px_#94a3b8] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#94a3b8]"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white text-navy flex items-center justify-center rounded-lg">
                  <IconComponent size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-grow px-3 text-left">
                  <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase leading-tight block">
                    {link.title}
                  </span>
                </div>
                <div className="flex-shrink-0 text-white/40">
                  <MoreVertical size={18} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
