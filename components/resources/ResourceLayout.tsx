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
    Continuidad: 'bg-red-100 text-red-800 border-red-200',
    Memoria: 'bg-blue-100 text-blue-800 border-blue-200',
    Automatización: 'bg-purple-100 text-purple-800 border-purple-200',
    Escalamiento: 'bg-orange-100 text-orange-800 border-orange-200',
    Research: 'bg-amber-100 text-amber-800 border-amber-200',
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
        <div className="min-h-screen bg-[#fffef9] text-[#1a1a1a] font-sans selection:bg-amber-100">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 h-16 flex items-center justify-between px-6 lg:px-12">
                <a href="/recursos" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
                    <ArrowLeft size={20} />
                    <span className="font-medium hidden sm:inline">Hub de Recursos</span>
                </a>
                <a href="/" className="flex items-center gap-2 text-xl font-bold font-poppins tracking-tight">
                    <span className="text-2xl">🐈</span>
                    <span>CloserCat</span>
                </a>
                <a
                    href="/?mode=presentation&presentationId=prodemo"
                    className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    Ver Demo
                </a>
            </nav>

            <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <main className="flex-1 max-w-[800px] mx-auto lg:mx-0">
                    <header className="mb-10">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${CATEGORY_COLORS[category]}`}>
                            {category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold font-serif leading-[1.1] mb-6 text-black">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xl text-gray-600 font-serif leading-relaxed mb-6">
                                {subtitle}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-inter border-y border-gray-100 py-4">
                            <span className="font-semibold text-gray-900">{author}</span>
                            {date && <span>• {date}</span>}
                            {readTime && <span>• {readTime}</span>}
                        </div>
                    </header>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-800 prose-p:leading-loose prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 prose-blockquote:p-4 prose-blockquote:not-italic prose-li:text-gray-800">
                        {children}
                    </div>
                </main>

                {/* Sidebar (Desktop only for now, could be accordion on mobile) */}
                <aside className="lg:w-80 shrink-0 space-y-8 hidden lg:block">
                    {keyTakeaways && keyTakeaways.length > 0 && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-28">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                💡 Key Takeaways
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                {keyTakeaways.map((item, idx) => (
                                    <li key={idx} className="flex gap-2 text-justify">
                                        <span className="text-amber-500 font-bold">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sticky top-[30rem]">
                        <h3 className="font-bold text-blue-900 mb-2">
                            ¿Te identificas con esta falla?
                        </h3>
                        <p className="text-sm text-blue-800/80 mb-4">
                            CloserCat está diseñado específicamente para resolver problemas estructurales, no superficiales.
                        </p>
                        <a href="/?mode=presentation&presentationId=prodemo" className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            Ver Solución
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    );
}
