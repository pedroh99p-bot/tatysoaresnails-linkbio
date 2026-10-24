import { describe, expect, it } from 'vitest';
import { config, buildWhatsAppMessage, formatWhatsAppLink } from '../config/links';
import { assetUrl } from '../config/assets';
import { services } from '../data/services';
import { prices } from '../data/prices';
import sourceServices from '../../docs/brief/content/services.json';
import sourcePrices from '../../docs/brief/content/prices.json';

const generalMessage = 'Olá, Taty! Vim pelo link da bio e gostaria de agendar um horário. Pode me informar os horários disponíveis?';

describe('mensagens de agendamento', () => {
  it('preserva a mensagem geral completa e o único telefone aprovado', () => {
    expect(config.whatsappNumber).toBe('5521989358048');
    expect(buildWhatsAppMessage()).toBe(generalMessage);
    expect(formatWhatsAppLink()).toBe(`https://wa.me/5521989358048?text=${encodeURIComponent(generalMessage)}`);
  });

  it.each(services.flatMap((category) => category.items))('endereça o serviço $label com a pergunta final', (service) => {
    const message = `Olá, Taty! Vim pelo link da bio e gostaria de agendar ${service.label}. Pode me informar os horários disponíveis?`;
    const link = formatWhatsAppLink(service.label);
    expect(link).toBe(`https://wa.me/5521989358048?text=${encodeURIComponent(message)}`);
    expect(new URL(link).searchParams.get('text')).toBe(message);
  });

  it('codifica acentos, espaços e caracteres que mudariam a query', () => {
    const label = 'Pé & mão + decoração / teste? #1';
    const link = formatWhatsAppLink(label);
    const url = new URL(link);
    expect(url.searchParams.size).toBe(1);
    expect(url.hash).toBe('');
    expect(url.searchParams.get('text')).toBe(`Olá, Taty! Vim pelo link da bio e gostaria de agendar ${label}. Pode me informar os horários disponíveis?`);
    expect(link).toContain('P%C3%A9%20%26%20m%C3%A3o%20%2B%20decora%C3%A7%C3%A3o%20%2F%20teste%3F%20%231');
  });
});

describe('conteúdo aprovado', () => {
  it('mantém categorias, associação de serviços e preços iguais às fontes do pacote', () => {
    expect(services).toEqual(sourceServices);
    expect(prices).toEqual(sourcePrices);
    expect(services.map(({ label }) => label)).toEqual(['Alongamentos', 'Manutenção e cuidados', 'Pés e extras']);
    expect(services.map(({ items }) => items.length)).toEqual([3, 4, 4]);
  });

  it('não usa preço promocional nem inventa redes sociais ou endereço', () => {
    expect(prices).toHaveLength(10);
    expect(prices.some(({ brl }) => brl === 99)).toBe(false);
    expect(config.instagramUrl).toBeNull();
    expect(config.locationUrl).toBeNull();
    expect(config.locationLabel).toMatch(/Rio das Pedras/);
  });

  it('resolve assets sob o subcaminho do GitHub Pages', () => {
    expect(assetUrl('/assets/brand/logo-gold.png')).toBe(`${import.meta.env.BASE_URL}assets/brand/logo-gold.png`);
  });
});
