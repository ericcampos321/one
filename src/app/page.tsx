import Image from "next/image";
import React from "react";
import { WorldMap } from "@/components/ui/world-map";

export default function Home() {
   return (
      <div className="min-h-screen w-full bg-[#1e1e1e] text-white pt-16">
         <header className="fixed top-0 left-0 w-full z-50 p-4 h-16 flex justify-between items-center shadow-md bg-[#1e1e1e] border-b border-[#2f2f2f]">
            <Image src="/logo.png" width={100} height={100} alt="Logo" className="shrink-0" />
            <nav className="flex gap-4">
               <a href="#inicio" className="hover:underline text-white">Início</a>
               <a href="#servicos" className="hover:underline text-white">Serviços</a>
               <a href="#sobre" className="hover:underline text-white">Sobre</a>
               <a href="#contato" className="hover:underline text-white">Contato</a>
            </nav>
         </header>

         <WorldMap />
         <section id="servicos" className="px-10 py-20 bg-[#2c2c2c]">
            <h3 className="text-3xl font-bold mb-8 text-center text-[#00d0ff]">Nossos Serviços</h3>

            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-5">
                  <h4 className="text-xl font-semibold mb-2 text-white">Squad as a Service</h4>
                  <p className="text-gray-300">
                     Monte um time sob demanda e acelere suas entregas com qualidade, agilidade e foco no produto.
                  </p>
               </div>

               <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-5">
                  <h4 className="text-xl font-semibold mb-2 text-white">Desenvolvimento Web</h4>
                  <p className="text-gray-300">
                     Construção de sistemas, portais e landing pages modernas com foco em usabilidade e performance.
                  </p>
               </div>

               <div className="bg-[#1e1e1e] border border-[#333] rounded-xl p-5">
                  <h4 className="text-xl font-semibold mb-2 text-white">Consultoria Técnica</h4>
                  <p className="text-gray-300">
                     Apoio especializado em decisões técnicas, arquitetura de software e boas práticas de engenharia.
                  </p>
               </div>
            </div>

         </section>
         <section id="sobre" className="px-10 py-20 bg-[#1e1e1e]">
            <h3 className="text-3xl font-bold mb-6 text-center text-[#00d0ff]">Sobre a ONE CLICK</h3>
            <p className="max-w-3xl mx-auto text-center text-lg text-gray-300">
               Somos uma empresa especializada em <strong>Engenharia de Software</strong>, oferecendo soluções completas para acelerar o crescimento das empresas.
               Com foco em eficiência, inovação e entrega de valor, ajudamos negócios a crescerem com tecnologia.
            </p>
         </section>

         <footer id="contato" className="p-10 bg-[#121212] text-white text-center border-t border-[#2f2f2f]">
            <h4 className="text-xl font-semibold mb-2">Vamos transformar sua ideia em software?</h4>
            <p className="text-gray-400">Fale com a gente e descubra como podemos colaborar com seu projeto.</p>
            <p className="mt-4 text-sm text-gray-500">
               © {new Date().getFullYear()} ONE CLICK | Engenharia de Software
            </p>
         </footer>

      </div>
   );
}

