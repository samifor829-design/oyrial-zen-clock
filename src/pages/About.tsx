import FadeUp from "@/components/FadeUp";
import lifestyleClock from "@/assets/lifestyle-clock.jpg";

const About = () => (
  <main className="pt-20 min-h-screen">
    {/* Hero */}
    <section className="bg-oyrial-offwhite py-20 md:py-32">
      <div className="container max-w-3xl text-center">
        <FadeUp>
          <h1 className="font-serif text-4xl md:text-6xl text-oyrial-charcoal">
            Built for People Who Notice.
          </h1>
        </FadeUp>
        <FadeUp delay={150}>
          <p className="mt-6 text-oyrial-muted leading-relaxed">
            Oyrial is a wall clock brand from Bangladesh. We make minimal, handcrafted timepieces for people who treat their space as an extension of their identity.
          </p>
        </FadeUp>
      </div>
    </section>

    {/* Story */}
    <section className="bg-oyrial-charcoal py-20 md:py-32">
      <div className="container max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <h2 className="font-serif text-3xl md:text-4xl text-oyrial-offwhite mb-6">
              Why Oyrial Exists
            </h2>
            <p className="text-oyrial-muted leading-relaxed">
              We looked at the walls of beautiful homes and noticed the clocks didn't match. They were too loud, too cheap, or too ordinary. Oyrial was our answer — a clock that belongs in a quiet luxury space, made right here in Bangladesh.
            </p>
          </FadeUp>
          <FadeUp delay={200}>
            <img
              src={lifestyleClock}
              alt="Oyrial clock on a living room wall"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </FadeUp>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-oyrial-offwhite py-20 md:py-32">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Silent by Design",
              desc: "Our clocks use silent sweep movement. No tick. Just presence.",
            },
            {
              title: "Minimal Always",
              desc: "If it doesn't need to be there, it isn't.",
            },
            {
              title: "Made to Order",
              desc: "Every clock is crafted with intention, not mass produced.",
            },
          ].map((v, i) => (
            <FadeUp key={v.title} delay={i * 150}>
              <div className="text-center">
                <h3 className="font-serif text-2xl text-oyrial-charcoal mb-3">{v.title}</h3>
                <p className="text-sm text-oyrial-muted">{v.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default About;
