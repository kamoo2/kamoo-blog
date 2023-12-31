import '../styles/globals.css';
import 'dayjs/locale/ko';

import { Analytics } from '@vercel/analytics/react';
import dayjs from 'dayjs';
import type { Metadata } from 'next';

import KbarContainer from '@/components/KbarContainer';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import ThemeContainer from '@/components/layout/ThemeContainer';
import { fontSans } from '@/lib/fonts';
import SiteConfig from '@/site.config';

dayjs.locale('ko');
export const metadata: Metadata = {
  title: {
    default: SiteConfig.title,
    template: `${SiteConfig.title} | %s`,
  },
  description: '지식 공유로 함께 성장해나가는 프론트엔드 개발자 카무입니다.',
  icons: {
    icon: 'favicon.ico',
  },
  verification: {
    google: SiteConfig.google,
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontSans.className}>
      <body className="no-scrollbar">
        <ThemeContainer>
          <KbarContainer>
            <div className="bg-primary mx-auto flex min-h-screen flex-col">
              <Header />
              <Main>{children}</Main>
              <Footer />
            </div>
          </KbarContainer>
        </ThemeContainer>
        <Analytics />
      </body>
    </html>
  );
}
