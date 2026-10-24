export type Service = {
  id: string;
  label: string;
  image?: string;
};

export type ServiceCategory = {
  id: string;
  label: string;
  description: string;
  items: Service[];
};

export const services: ServiceCategory[] = [
  {
    "id": "alongamentos",
    "label": "Alongamentos",
    "description": "Molde F1, Acrigel e Fibra de vidro",
    "items": [
      {
        "id": "molde-f1",
        "label": "Molde F1"
      },
      {
        "id": "acrigel",
        "label": "Acrigel",
        "image": "/assets/services/acrigel-real.webp"
      },
      {
        "id": "fibra-de-vidro",
        "label": "Fibra de vidro",
        "image": "/assets/services/fibra-de-vidro-real.webp"
      },
      {
        "id": "decoracao",
        "label": "Decoração simples"
      }
    ]
  },
  {
    "id": "manutencao-cuidados",
    "label": "Manutenção e cuidados",
    "description": "Manutenção, banho de gel e blindagem",
    "items": [
      {
        "id": "manutencao-acrigel",
        "label": "Manutenção Acrigel"
      },
      {
        "id": "manutencao-fibra",
        "label": "Manutenção Fibra de vidro"
      },
      {
        "id": "banho-gel",
        "label": "Banho de gel"
      },
      {
        "id": "blindagem",
        "label": "Blindagem"
      }
    ]
  },
  {
    "id": "pes-extras",
    "label": "Pés e extras",
    "description": "Pés e spa",
    "items": [
      {
        "id": "pe",
        "label": "Pé"
      },
      {
        "id": "pe-mao",
        "label": "Pé e mão simples"
      },
      {
        "id": "spa",
        "label": "Spa dos pés"
      }
    ]
  }
];
