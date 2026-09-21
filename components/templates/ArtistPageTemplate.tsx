import React from 'react';

interface ArtistPageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ArtistPageTemplate = ({ title, subtitle, children }: ArtistPageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold capitalize">{title}</h1>
        {subtitle && <p className="mt-2 text-lg opacity-80">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
};
