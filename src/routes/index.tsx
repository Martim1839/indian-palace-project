import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { MenuSection } from "@/components/site/MenuSection";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Chatbot } from "@/components/site/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Indian Palace Espinho | Cozinha Indiana Autêntica" },
      {
        name: "description",
        content:
          "Restaurante indiano autêntico em Espinho: curries, biryanis e tandoori. Butter Chicken de assinatura, take away e reserva de mesa online.",
      },
      { property: "og:title", content: "Indian Palace Espinho | Cozinha Indiana Autêntica" },
      {
        property: "og:description",
        content:
          "Especiarias verdadeiras, receitas de família e ambiente acolhedor na Av. 8, 832, Espinho. Reserve a sua mesa.",
      },
      { property: "og:type", content: "restaurant.restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <Toaster position="top-center" />
    </div>
  );
}
