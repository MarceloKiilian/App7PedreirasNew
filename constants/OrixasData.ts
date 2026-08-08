export interface Orixa {
  id: string;
  nome: string;
  descricao: string;
  dia: string;
  cores: string;
  comida?: string;
  reino?: string;
  bebida?: string;
  flores?: string;
  lenda?: string;
}

export const ORIXAS: Orixa[] = [
  {
    id: 'oxala',
    nome: 'Oxalá',
    descricao: "Pai de todos os orixás, rei da criação, comanda todos os outros orixás, para que nada fuja do seu controle, tudo passa por sua mão, sincretizado com JESUS CRISTO. Oxalá é representado pela cor branca, que também é associada a tudo o que se refere a Umbanda. Para Oxalá, o branco significa a serenidade, a calma, o silêncio, indicando que ele não gosta de violência, disputas ou barulho, assim como não gosta de cores fortes. Oxalá é homenageado por todos os praticantes e cultuado como a figura do pai, demonstrando sabedoria e autoridade, mas também é sensível e tem a capacidade de demonstrar sua força, poder e conhecimentos sem usar de violência através da argumentação. Na Umbanda não há a incorporação desta linha, devido a sua pureza, a sua grandiosidade e tratar-se sua linha serem anjos, porem tudo passa por Oxalá e é onde encontramos nosso ponto de equilíbrio, onde reequilibramos nossa forças.",
    dia: "Domingo",
    cores: "Branco",
    comida: "Canjica branca com mel, Canjica branca com mel e clara de ovo, Inhame amassado com mel, Uvas, Mamão, Pêra, Maça, pão.",
    reino: "Campos abertos",
    bebida: "Vinho tinto, Água, Leite, etc.",
    flores: "Todas na tonalidade branca sempre."
  },
  {
    id: 'oxossi',
    nome: 'Oxóssi',
    descricao: "É o caçador da mata fechada, o caçador de almas, o médico do espaço, o abre caminho, sincretizado com São Sebastião.\nSua energia vem da flora e da fauna do planeta, onde existe o verde é lá que encontramos Oxossi. As entidades que pertencem a esta linha apresentam-se como caboclos e caboclas.\nSenhor das matas e da caça. Oxossi é chefe na linha dos caboclos. Detentor da sabedoria nas folhas da Jurema, Oxossi é o orixá do trabalho (empregos) e da linha da cura. Muitos caboclos trabalham nessa linha, pelos seus conhecimentos contra as doenças terrenas. Por ser caçador, também é conhecido por suas vitórias contra as demandas.",
    dia: "Quinta-feira",
    cores: "Verde",
    comida: "frutas (todas não acidas), raízes (todas), Axoxô, Milho, feijão fradinho...",
    reino: "Matas",
    bebida: "Sumo de suas ervas, vinho tinto suave, vinho licoroso."
  },
  {
    id: 'ogum',
    nome: 'Ogum',
    descricao: "Senhor do ferro e da guerra, considerado por todos o Guerreiro da Umbanda, sicretizado com SÃO JORGE.\nEle é o Senhor da guerra, indomável e imbatível defensor da lei e da ordem, defende os fracos e os que estão em demanda.\nOgum também é considerado o Senhor dos caminhos. Ele protege as pessoas em locais perigosos, dominando a rua com o auxílio de Exu.\nSua energia vem dos caminhos (todos), portanto onde há caminho encontramos Ogum.",
    dia: "Terça-feira",
    cores: "Vermelho e Branco (ou Azul)",
    comida: "Inhame cozido ou assado, feijão preto, fava rajada (vermelha), miúdos de boi, miúdos de porco.",
    reino: "Estradas, mar, rio, cachoeira, ao redor do cemitério, astros, pedreiras, matas.",
    bebida: "Cerveja branca, sumo de espada de São Jorge (só para entrega)."
  },
  {
    id: 'xango',
    nome: 'Xangô',
    descricao: "Deus dos trovões, e dos raios, justiceiro, odeia a injustiça, e a falsidade – sincretizado com SÃO JERÔNIMO, SÃO JOÃO BATISTA E SÃO PEDRO.\nÉ o portador de imensa sabedoria, equilíbrio e principalmente de justiça. É a ele que os ofendidos, os humilhados, recorrem em busca de reparo, aqueles que procuram descobrir a verdade recorrem a XANGÔ, favorece a promoções e a procura de trabalho. Nos casos de calúnia e falsidades faz justiça.\nTodos os nossos pedidos (pra qualquer linha), antes passa pelas mãos de Xangô.",
    dia: "Quarta-feira",
    cores: "Marrom e Branco",
    reino: "Pedreiras, cachoeiras, campo aberto.",
    comida: "Amalá (farinha amarela, quiabo, dendê), Agebô (quiabo batido na água ou no vinho branco), Quiabo frito ou misturado no dendê, cara (cozido ou cru), Camarão na moranga.",
    bebida: "Cerveja preta, sumo de suas ervas, vinho branco."
  },
  {
    id: 'iemanja',
    nome: 'Iemanjá',
    descricao: "Rainha dos mares, mãe acolhedora, sincretizada com NOSSA SENHORA.\nA extensão do carinho e afeto de Iemanjá é enorme, igualado a extensão do reino que mora e ocupa: o mar. Iemanjá representa a força materna da proteção, o balsamo, a limpeza, o conforto, o equilíbrio.\nDona de todos os Oris, é Iemanjá quem entrega os filhos aos respectivos orixás. Seu nome em Ioruba é Yamanju, mãe dos peixes.",
    dia: "Sábado",
    cores: "Azul claro e Branco",
    reino: "Mar",
    bebida: "Champanhe branca, Água pura, Sumo de suas ervas.",
    comida: "Todos os peixes de água salgada, Canjica branca com mel ou azeite doce, arroz papa puro ou com mel e coco ralado (apade) ou com camarão seco e azeite doce, Manjar branco com mel, frutas doces como mamão, uvas, maças, morangos etc."
  },
  {
    id: 'iansa',
    nome: 'Iansã',
    descricao: "Senhora dos Raios e Tempestades, sincretizada com SANTA BÁRBARA.\nDe todas as Iabás, Iansã é a orixá mais guerreira, a que parte pra luta, que trás mudanças rápidas, tira o carrego, é a que possue as mesmas energias tanto de Oxossi, como Ogum e Xangô e ainda consegue ser feminina, forte, segura e determinada.\nTem sob seu comando os Eguns, que são por ela dirigidos, guiados, orientados. É muito conhecida como Oyá.",
    dia: "Quarta-feira",
    cores: "Amarelo ou Vermelho",
    reino: "Bambuzal, Cruzeiro do cemitério, Alto de cachoeiras.",
    bebida: "Champanhe branca, água de chuva, sumo de suas ervas.",
    comida: "Acarajé, feijão fradinho com dendê, fava rajada com dendê, Cebola em rodelas no dendê, inhame cozido, pipoca estourada no dendê."
  },
  {
    id: 'oxum',
    nome: 'Oxum',
    descricao: "Deusa do amor, protetora das crianças, rainha das águas doces, e das cachoeiras, onde usa suas energias para limpeza de nossos corpos energeticamente. sincretizada com Nossa Senhora da Aparecida e nossa Senhora da Conceição.\nÉ a mãe dos sentimentos, sua força está no equilíbrio dos nossos sentimentos, além de ser a deusa do ouro (material e espiritual).",
    dia: "Sábado",
    cores: "Amarelo e Ouro",
    reino: "Cachoeiras, Rios, Lagos.",
    bebida: "Champanhe branca, Sumo de suas ervas.",
    comida: "Omulucum, Batata doce, Arroz papa, Melão, banana ouro, banana prata."
  },
  {
    id: 'omolu',
    nome: 'Omulu / Obaluaê',
    descricao: "Senhores das doenças e donos da terra (solo), sincretizados com SÃO LÁZARO e São Cipriano. Omulu rege os cemitérios e Obaluaiê as praias. Sempre que nos dirigirmos a eles devemos pedir que levem nossas doenças embora e nunca devemos pedir a cura, pois eles são donos da doença e não da cura que é posse de oxossi.",
    dia: "Segunda-feira",
    cores: "Preto, Branco e Vermelho",
    reino: "Cemitério (Omulu) e Praias (Obaluaê)",
    bebida: "Aruá, pinga, vinho, água.",
    comida: "Pipoca estourada na areia, feijão preto torrado."
  }
];
