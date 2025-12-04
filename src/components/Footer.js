export default function Footer() {
    return (
        <footer className="bg-stone-900 text-white py-12 border-t border-stone-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-2xl font-serif mb-4">AURA BEAUTY</h3>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            Beleza arquitetada. Luxo silencioso.<br />
                            Uma experiência sensorial única.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-serif mb-4 text-stone-300">Contato</h4>
                        <p className="text-stone-400 text-sm">
                            (16) 99370-6612<br />
                            contato@aurabeauty.com.br
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-serif mb-4 text-stone-300">Horários</h4>
                        <p className="text-stone-400 text-sm">
                            Terça a Sábado<br />
                            09:00 - 19:00
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-stone-800 text-center">
                    <p className="text-stone-500 text-xs uppercase tracking-widest">
                        Desenvolvido com ♥ pela Renova Aura — Automação Inteligente
                    </p>
                </div>
            </div>
        </footer>
    );
}
