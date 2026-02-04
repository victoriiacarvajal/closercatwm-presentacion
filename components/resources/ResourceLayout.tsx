import React from 'react';
import { Share2, ArrowLeft } from 'lucide-react';

interface ResourceLayoutProps {
    title: string;
    subtitle?: string;
    author?: string;
    date?: string;
    readTime?: string;
    keyTakeaways?: string[];
    children: React.ReactNode;
    category?: 'Continuidad' | 'Memoria' | 'Automatización' | 'Escalamiento' | 'Research';
}

const CATEGORY_COLORS = {
    Continuidad: 'bg-brand-gray-smoke text-red-600 border-red-100',
    Memoria: 'bg-brand-gray-smoke text-brand-blue-primary border-brand-blue-primary/30',
    Automatización: 'bg-brand-gray-smoke text-brand-purple-closer border-brand-purple-closer/30',
    Escalamiento: 'bg-brand-gray-smoke text-orange-600 border-orange-100',
    Research: 'bg-brand-gray-smoke text-brand-purple-closer border-brand-purple-closer/30',
};

export default function ResourceLayout({
    title,
    subtitle,
    author = "CloserCat Research Team",
    date,
    readTime,
    keyTakeaways,
    children,
    category = 'Research'
}: ResourceLayoutProps) {
    return (
        <div className="min-h-screen bg-white text-brand-black font-inter selection:bg-brand-blue-primary/20">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 h-16 flex items-center justify-between px-6 lg:px-12">
                <a href="/recursos" className="flex items-center gap-2 text-gray-500 hover:text-brand-purple-closer transition-colors font-poppins text-sm font-medium">
                    <ArrowLeft size={18} />
                    <span className="hidden sm:inline">Hub de Recursos</span>
                </a>
                <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <img
                        src="/logo-closercat.png"
                        alt="CloserCat Pro"
                        className="h-10 w-auto"
                    />
                </a>
                <a
                    href="/?mode=presentation&presentationId=prodemo"
                    className="text-sm font-poppins font-semibold text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    style={{
                        background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)',
                    }}
                >
                    Ver Demo
                </a>
            </nav>

            {/* Breadcrumbs */}
            <div className="pt-20 pb-4 px-6 max-w-7xl mx-auto">
                <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
                    <a href="/" className="hover:text-brand-purple-closer transition-colors">Home</a>
                    <span>›</span>
                    <a href="/recursos" className="hover:text-brand-purple-closer transition-colors">Recursos</a>
                    <span>›</span>
                    <span className="text-brand-black font-medium">{category}</span>
                </nav>
            </div>

            <div className="pt-8 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <main className="flex-1 max-w-[800px] mx-auto lg:mx-0">
                    <header className="mb-10">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${CATEGORY_COLORS[category]}`}>
                            {category}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold leading-[1.1] mb-6 text-brand-black tracking-tight">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xl text-gray-600 font-serif border-l-4 border-brand-blue-primary pl-6 leading-relaxed mb-6">
                                {subtitle}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-inter border-y border-gray-100 py-4 uppercase tracking-widest font-bold">
                            <span className="text-brand-purple-closer">{author}</span>
                            {date && <span>• {date}</span>}
                            {readTime && <span>• {readTime}</span>}
                        </div>
                    </header>

                    <div className="prose prose-lg md:prose-xl max-w-none 
                        prose-headings:font-poppins prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-24 prose-headings:mb-12
                        prose-h2:text-3xl md:prose-h2:text-4xl 
                        prose-h3:text-2xl md:prose-h3:text-3xl
                        prose-p:text-gray-600 prose-p:leading-10 prose-p:mb-12 prose-p:text-lg
                        prose-a:text-brand-purple-closer hover:prose-a:text-brand-purple-deep prose-a:font-semibold
                        prose-blockquote:border-l-4 prose-blockquote:border-brand-blue-primary prose-blockquote:bg-brand-gray-smoke prose-blockquote:p-10 prose-blockquote:my-16 prose-blockquote:not-italic prose-blockquote:rounded-r-xl 
                        prose-li:text-gray-600 prose-li:my-4 prose-li:text-lg prose-li:leading-9 prose-ul:my-12 prose-ol:my-12
                        prose-strong:text-brand-black prose-strong:font-bold">
                        {children}
                    </div>
                </main>

                {/* Sidebar (Desktop only for now, could be accordion on mobile) */}
                <aside className="lg:w-80 shrink-0 space-y-8 hidden lg:block">
                    {keyTakeaways && keyTakeaways.length > 0 && (
                        <div className="bg-brand-gray-smoke border border-gray-200 rounded-xl p-6 sticky top-28 shadow-sm">
                            <h3 className="font-poppins font-bold text-brand-black mb-4 flex items-center gap-2">
                                💡 Key Takeaways
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-600 font-inter">
                                {keyTakeaways.map((item, idx) => (
                                    <li key={idx} className="flex gap-2">
                                        <span className="text-brand-blue-primary font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-gradient-brand-subtle border border-brand-purple-closer/20 rounded-xl p-8 sticky top-[30rem] shadow-sm">
                        <h3 className="font-poppins font-bold text-brand-black mb-4">
                            ¿Te identificas con esta falla?
                        </h3>
                        <p className="text-sm text-gray-600 mb-6 font-inter leading-relaxed">
                            CloserCat está diseñado específicamente para resolver problemas estructurales, no superficiales.
                        </p>
                        <a
                            href="/?mode=presentation&presentationId=prodemo"
                            className="block w-full text-center py-3 rounded-xl font-poppins font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #08C4F4 0%, #8336FF 100%)' }}
                        >
                            Ver Solución
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    );
}
