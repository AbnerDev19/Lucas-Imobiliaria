import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useMovimentoImagem(moldura, imagem) {
  useLayoutEffect(() => {
    const movimento = gsap.matchMedia();
    movimento.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(imagem.current, { scale: 1.015, yPercent: 0 }, {
        scale: 1.115,
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: moldura.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => movimento.revert();
  }, [moldura, imagem]);
}
