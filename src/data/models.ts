export interface MachineModel {
  id: string;
  name: string;
  image: string;
  tags: string[];
  price: string;
  installment: string;
  maxInstallments: string;
  desc: string;
}

export const models: MachineModel[] = [
  {
    id: 't1',
    name: 'Maquininha T1',
    image: '/t1-showcase-new.webp',
    tags: ['Opera com o celular', 'Comprovante por SMS'],
    price: 'R$ 16,80',
    installment: 'ou 12x de R$ 1,40',
    maxInstallments: 'Parcele em até 12x',
    desc: 'A porta de entrada: compacta, conecta com o seu celular e começa a vender no mesmo dia.',
  },
  {
    id: 't2',
    name: 'Maquininha T2',
    image: '/t2-showcase-new.webp',
    tags: ['Chip e Wi-Fi', 'Comprovante por SMS'],
    price: 'R$ 49,88',
    installment: 'ou 12x de R$ 4,16',
    maxInstallments: 'Parcele em até 12x',
    desc: 'Compacta e independente do celular: com chip próprio, cabe no bolso e está sempre pronta.',
  },
  {
    id: 't3',
    name: 'Maquininha T3',
    image: '/t3-showcase-new.webp',
    tags: ['Chip e Wi-Fi', 'Comprovante impresso'],
    price: 'R$ 108,00',
    installment: 'ou 12x de R$ 9,00',
    maxInstallments: 'Parcele em até 21x',
    desc: 'Para quem entrega o comprovante impresso ao cliente, com conexão própria e parcelamento estendido.',
  },
  {
    id: 't3-smart',
    name: 'Maquininha T3 Smart',
    image: '/t3-smart-showcase-new.webp',
    tags: ['Tela Android touchscreen', 'Chip 4G e Wi-Fi', 'Bateria de longa duração'],
    price: 'R$ 191,88',
    installment: 'ou 12x de R$ 15,99',
    maxInstallments: 'Parcele em até 21x',
    desc: 'O modelo mais completo: visor touchscreen, sistema Android, comprovante impresso ou por SMS.',
  },
];
