export type LinksConfig = {
  whatsappNumber: string;
  instagramUrl: string | null;
  locationUrl: string | null;
  locationLabel: string;
};

export const config: LinksConfig = {
  whatsappNumber: '5521989358048',
  instagramUrl: null,
  locationUrl: null,
  locationLabel: 'Rio das Pedras, RJ',
};

export function buildWhatsAppMessage(serviceName?: string): string {
  const request = serviceName ? `agendar ${serviceName}` : 'agendar um horário';
  return `Olá, Taty! Vim pelo link da bio e gostaria de ${request}. Pode me informar os horários disponíveis?`;
}

export function formatWhatsAppLink(serviceName?: string): string {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(serviceName))}`;
}
