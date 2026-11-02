/* Batalhas com estudo completo. Posições das unidades são esquemáticas. */
window.CURADAS=[
{id:"lepanto",name:"Lepanto",year:1571,dtg:"07 OUT 1571",tags:["world"],era:"Era das galés",
 lat:38.30,lng:21.12,alt:0.09,conflict:"Guerra Otomano-Veneziana (1570–1573)",
 place:"Golfo de Patras, Mar Jônico (Grécia)",
 a:{name:"Liga Santa",who:"Espanha, Veneza, Estados Pontifícios e aliados",cmd:"D. João de Áustria",force:"Cerca de 206 galés e 6 galeaças",loss:"Cerca de 12 a 17 galés perdidas; cerca de 7.500 mortos"},
 b:{name:"Império Otomano",who:"Frota do Sultão Selim II",cmd:"Müezzinzade Ali Paxá",force:"Cerca de 230 galés e 56 galeotas",loss:"Maior parte da frota capturada ou afundada; cerca de 20 mil baixas"},
 winner:"a",result:"Vitória decisiva da Liga Santa. Foi a última grande batalha de galés a remo e encerrou a fama de invencibilidade otomana no mar.",
 units:[
  {id:"ab",side:"a",label:"Ala esq. (Barbarigo)",track:[[38.47,21.02],[38.40,21.08],[38.37,21.12],[38.37,21.12],[38.37,21.12]]},
  {id:"ac",side:"a",label:"Centro (D. João · Real)",track:[[38.38,20.98],[38.32,21.06],[38.30,21.12],[38.30,21.13],[38.30,21.13]]},
  {id:"ad",side:"a",label:"Ala dir. (Doria)",track:[[38.30,20.94],[38.24,21.02],[38.21,21.06],[38.16,21.08],[38.18,21.10]]},
  {id:"ar",side:"a",label:"Reserva (Santa Cruz)",track:[[38.36,20.92],[38.31,20.99],[38.28,21.04],[38.25,21.08],[38.22,21.12]]},
  {id:"bs",side:"b",label:"Ala dir. (Suluk Paxá)",track:[[38.42,21.40],[38.40,21.22],[38.37,21.14],[38.37,21.13],[38.37,21.13]],sunk:2},
  {id:"bc",side:"b",label:"Centro (Ali Paxá · Sultana)",track:[[38.34,21.42],[38.32,21.24],[38.31,21.15],[38.30,21.14],[38.30,21.14]],sunk:3},
  {id:"bu",side:"b",label:"Ala esq. (Uluç Ali)",track:[[38.24,21.40],[38.22,21.22],[38.19,21.12],[38.20,21.10],[38.24,21.40]]}
 ],
 phases:[
  {t:"Aproximação",h:"Manhã",p:"As duas frotas se formam em linha de frente com três alas e reserva. A Liga Santa posiciona seis galeaças venezianas à frente da linha."},
  {t:"Fogo das galeaças",h:"~10h30",p:"As galeaças, com muito mais canhões que uma galé, abrem fogo e quebram a formação otomana antes do contato.",rings:[[38.33,21.18],[38.38,21.17]]},
  {t:"Choque na ala norte",h:"~11h00",p:"Barbarigo prende a ala de Suluk Paxá contra a costa rasa. Sem espaço para manobrar, a ala otomana é destruída.",rings:[[38.37,21.13]]},
  {t:"Abordagem no centro",h:"~12h00",p:"A Real, de D. João, e a Sultana, de Ali Paxá, se abalroam. Os infantes embarcados decidem a luta corpo a corpo; Ali Paxá morre e a Sultana é tomada.",rings:[[38.30,21.13]]},
  {t:"Manobra de Uluç Ali",h:"Tarde",p:"Uluç Ali tenta envolver a ala de Doria e atacar o centro pela retaguarda. A reserva de Santa Cruz fecha a brecha e ele se retira com parte de suas galés.",rings:[[38.20,21.10]]}
 ],
 lessons:[
  {t:"Poder de fogo antes do contato",d:"As galeaças desorganizaram o inimigo antes da abordagem. Desgastar o adversário à distância reduz o custo do combate aproximado."},
  {t:"Use o terreno contra o inimigo",d:"Na ala norte, a costa rasa tirou da ala otomana a liberdade de manobra."},
  {t:"Mantenha uma reserva",d:"A reserva de Santa Cruz respondeu à manobra de Uluç Ali e evitou um envolvimento pelo flanco sul."}
 ],
 fn:"As galés da Liga Santa levavam milhares de soldados embarcados, entre eles os terços espanhóis da infantaria de marinha. A Infantería de Marina da Espanha, criada em 1537, é considerada o corpo de fuzileiros mais antigo do mundo. Em Lepanto, a vitória veio da abordagem: era a tropa embarcada que tomava o navio inimigo.",
 quiz:[
  {q:"Que tipo de navio abriu fogo e quebrou a linha otomana antes do contato?",o:["Caravelas","Galeaças","Naus de linha","Brigues"],c:1},
  {q:"O que decidiu o combate entre a Real e a Sultana?",o:["Fogo de artilharia de longa distância","Abordagem e combate de infantaria embarcada","Uso de brulotes","Bloqueio do porto"],c:1},
  {q:"Qual elemento evitou o envolvimento da ala de Doria?",o:["A reserva de Santa Cruz","A ala de Barbarigo","Reforços de Veneza","Uma tempestade"],c:0}
 ]},
{id:"trafalgar",name:"Trafalgar",year:1805,dtg:"21 OUT 1805",tags:["world"],era:"Era da vela",
 lat:36.28,lng:-6.35,alt:0.18,conflict:"Guerras Napoleônicas (Guerra da Terceira Coligação)",
 place:"Ao largo do Cabo Trafalgar, costa sudoeste da Espanha",
 a:{name:"Reino Unido",who:"Royal Navy",cmd:"Vice-almirante Horatio Nelson",force:"27 naus de linha",loss:"Nenhum navio perdido; cerca de 1.700 baixas; Nelson morto"},
 b:{name:"França e Espanha",who:"Frota combinada",cmd:"Vice-almirante Pierre de Villeneuve (com Federico Gravina)",force:"33 naus de linha",loss:"22 navios perdidos; mais de 13 mil baixas e prisioneiros"},
 winner:"a",result:"Vitória decisiva britânica. Garantiu a supremacia da Royal Navy por mais de um século e acabou com os planos de Napoleão de invadir a Inglaterra.",
 units:[
  {id:"nel",side:"a",label:"Coluna de Nelson (Victory)",track:[[36.34,-6.85],[36.31,-6.58],[36.29,-6.38],[36.29,-6.33],[36.30,-6.32]]},
  {id:"col",side:"a",label:"Coluna de Collingwood (Royal Sovereign)",track:[[36.18,-6.85],[36.16,-6.58],[36.15,-6.38],[36.15,-6.33],[36.16,-6.31]]},
  {id:"van",side:"b",label:"Vanguarda (Dumanoir)",track:[[36.05,-6.30],[36.40,-6.30],[36.44,-6.31],[36.44,-6.35],[36.30,-6.60]]},
  {id:"cen",side:"b",label:"Centro (Villeneuve · Bucentaure)",track:[[36.20,-6.31],[36.29,-6.31],[36.29,-6.32],[36.29,-6.32],[36.29,-6.32]],sunk:3},
  {id:"ret",side:"b",label:"Retaguarda (Gravina)",track:[[36.38,-6.31],[36.16,-6.31],[36.15,-6.32],[36.15,-6.32],[36.48,-6.25]],sunk:4}
 ],
 phases:[
  {t:"Duas colunas",h:"Amanhecer",p:"Nelson divide a frota em duas colunas e avança contra a linha franco-espanhola, rompendo a doutrina da época de combater em linhas paralelas."},
  {t:"Inversão de rumo",h:"~08h00",p:"Villeneuve manda a frota virar para o norte, rumo a Cádis. A manobra desorganiza a linha, que fica irregular e com intervalos."},
  {t:"Rompimento da linha",h:"~12h00",p:"Collingwood rompe a retaguarda e Nelson o centro. Ao cruzar a linha, cada navio britânico dispara pela popa do inimigo, onde não há canhões para responder.",rings:[[36.29,-6.32],[36.15,-6.32]]},
  {t:"Combate de navio a navio",h:"13h15",p:"O Victory fica preso ao Redoutable. Um atirador francês fere Nelson mortalmente. O centro aliado, isolado, é destruído antes que a vanguarda volte para ajudar.",rings:[[36.29,-6.32]]},
  {t:"Fim e tempestade",h:"Tarde",p:"Dumanoir foge com a vanguarda; Gravina leva o que resta para Cádis. Uma tempestade nos dias seguintes afunda vários dos navios capturados."}
 ],
 lessons:[
  {t:"Concentração no ponto decisivo",d:"Ao romper a linha em dois pontos, Nelson combateu o centro e a retaguarda com superioridade local, enquanto a vanguarda inimiga ficou fora da luta."},
  {t:"Intenção do comandante",d:"O memorando de Nelson explicava a ideia da manobra a todos os comandantes. Cada um pôde agir por iniciativa própria quando os sinais deixaram de ser vistos."},
  {t:"Treino e cadência de tiro",d:"Guarnições britânicas bem treinadas disparavam mais rápido. Treinamento compensou a inferioridade numérica."}
 ],
 fn:"Os Royal Marines estavam embarcados em todos os navios britânicos. Nos cestos de gávea e no convés, atuavam como atiradores e na defesa contra abordagens. Do lado francês, foram os atiradores do Redoutable que atingiram Nelson, mostrando o peso do combate de infantaria mesmo numa batalha de artilharia.",
 quiz:[
  {q:"Qual foi a formação de ataque de Nelson?",o:["Linha paralela ao inimigo","Duas colunas perpendiculares à linha inimiga","Meia-lua","Formação em cunha única"],c:1},
  {q:"Por que disparar pela popa do inimigo era tão eficaz?",o:["A popa tinha a munição","A popa quase não tinha canhões e o tiro varria o convés de ponta a ponta","Os mastros caíam primeiro","Era onde ficava o comandante"],c:1},
  {q:"Quantos navios britânicos foram perdidos?",o:["Nenhum","Três","Sete","Doze"],c:0}
 ]},
{id:"riachuelo",name:"Riachuelo",year:1865,dtg:"11 JUN 1865",tags:["br"],era:"Vapor e encouraçados",
 lat:-27.535,lng:-58.795,alt:0.035,conflict:"Guerra da Tríplice Aliança (Guerra do Paraguai)",
 place:"Rio Paraná, junto à foz do arroio Riachuelo, perto de Corrientes (Argentina)",
 a:{name:"Império do Brasil",who:"Força Naval brasileira",cmd:"Chefe de Divisão Francisco Manuel Barroso da Silva",force:"9 navios a vapor",loss:"1 navio (Jequitinhonha, encalhado); cerca de 100 mortos"},
 b:{name:"Paraguai",who:"Esquadra paraguaia",cmd:"Capitão Pedro Ignacio Meza",force:"8 vapores, 6 chatas com canhão e baterias em terra",loss:"4 vapores e as chatas; centenas de mortos"},
 winner:"a",result:"Vitória brasileira. A esquadra paraguaia deixou de existir como força ofensiva e o Brasil passou a controlar os rios da região. 11 de junho é a Data Magna da Marinha do Brasil.",
 units:[
  {id:"bra",side:"a",label:"Força Naval (Barroso · Amazonas)",track:[[-27.50,-58.815],[-27.505,-58.815],[-27.56,-58.80],[-27.565,-58.795],[-27.55,-58.80]]},
  {id:"jeq",side:"a",label:"Jequitinhonha",track:[[-27.51,-58.818],[-27.51,-58.818],[-27.575,-58.79],[-27.575,-58.79],[-27.575,-58.79]],sunk:3},
  {id:"par",side:"b",label:"Esquadra (Meza · Tacuarí)",track:[[-27.40,-58.84],[-27.585,-58.80],[-27.575,-58.79],[-27.565,-58.792],[-27.45,-58.84]],sunk:4},
  {id:"bat",side:"b",label:"Baterias de Bruguez",fixed:true,track:[[-27.58,-58.775],[-27.58,-58.775],[-27.58,-58.775],[-27.58,-58.775],[-27.58,-58.775]]}
 ],
 phases:[
  {t:"Plano de surpresa",h:"Madrugada",p:"Meza desce o rio vindo de Humaitá para abordar os navios brasileiros fundeados ao amanhecer. Uma avaria atrasa a esquadra e a surpresa se perde."},
  {t:"Emboscada nas baterias",h:"~09h00",p:"Os paraguaios passam pela força brasileira e se posicionam rio abaixo, junto à foz do Riachuelo, sob a proteção das baterias de Bruguez e com chatas armadas.",rings:[[-27.58,-58.78]]},
  {t:"Combate no canal",h:"Manhã",p:"A força brasileira desce o rio e entra no alcance das baterias. O Jequitinhonha encalha; o Parnaíba é abordado e sua guarnição luta no convés, onde morrem o Guarda-Marinha Greenhalgh e o Marinheiro Marcílio Dias.",rings:[[-27.575,-58.79],[-27.565,-58.795]]},
  {t:"A manobra de Barroso",h:"Tarde",p:"Barroso volta rio acima com a fragata Amazonas e usa a proa do navio como aríete. Vários navios paraguaios são afundados ou inutilizados.",rings:[[-27.565,-58.795]]},
  {t:"Retirada paraguaia",h:"Fim do dia",p:"O que resta da esquadra de Meza sobe o rio em retirada. Barroso iça o sinal que ficou famoso: sustentar o fogo, que a vitória é nossa."}
 ],
 lessons:[
  {t:"Surpresa depende de execução",d:"O plano paraguaio era bom, mas o atraso tirou o elemento surpresa. Um plano que depende de horário precisa de margem para falhas."},
  {t:"Combate fluvial é combate de canal",d:"O rio estreito limitou a manobra e deixou os navios expostos às baterias em terra. Conhecer o terreno ribeirinho é tão importante quanto conhecer o inimigo."},
  {t:"Iniciativa do comandante",d:"Barroso mudou a forma de lutar no meio da ação, usando o casco do Amazonas como arma. Adaptar-se é tão decisivo quanto o plano inicial."}
 ],
 fn:"As guarnições embarcadas, incluindo praças do Batalhão Naval, origem do atual Corpo de Fuzileiros Navais, repeliram as abordagens paraguaias no convés. O combate no Parnaíba é o exemplo mais conhecido: a tropa embarcada impediu que o navio fosse tomado. Para o fuzileiro, Riachuelo mostra que o combate naval também se decide com fuzil e baioneta.",
 quiz:[
  {q:"Quem comandou a força naval brasileira em Riachuelo?",o:["Almirante Tamandaré","Francisco Manuel Barroso da Silva","Joaquim Marques Lisboa","Duque de Caxias"],c:1},
  {q:"Qual navio Barroso usou como aríete?",o:["Parnaíba","Jequitinhonha","Amazonas","Belmonte"],c:2},
  {q:"Por que 11 de junho é importante para a Marinha do Brasil?",o:["É a Data Magna da Marinha","É o aniversário do CFN","É o Dia do Marinheiro","É a data da Independência no mar"],c:0}
 ]},
{id:"midway",name:"Midway",year:1942,dtg:"04 JUN 1942",tags:["world"],era:"Era dos porta-aviões",
 lat:30.2,lng:-177.6,alt:0.9,conflict:"Segunda Guerra Mundial · Guerra do Pacífico",
 place:"Atol de Midway, Oceano Pacífico Central",
 a:{name:"Estados Unidos",who:"Frota do Pacífico",cmd:"Alm. Chester Nimitz; no mar, Frank J. Fletcher e Raymond Spruance",force:"3 porta-aviões e aviões baseados em Midway",loss:"1 porta-aviões (Yorktown), 1 contratorpedeiro, cerca de 150 aviões"},
 b:{name:"Japão",who:"Marinha Imperial",cmd:"Alm. Isoroku Yamamoto; força de porta-aviões de Chuichi Nagumo",force:"4 porta-aviões na força de ataque",loss:"4 porta-aviões e 1 cruzador; cerca de 250 aviões e muitos pilotos experientes"},
 winner:"a",result:"Vitória decisiva americana. O Japão perdeu a iniciativa no Pacífico, e a guerra naval passou a ser decidida pela aviação embarcada.",
 units:[
  {id:"kb",side:"b",label:"Força de porta-aviões (Nagumo)",track:[[32.0,-179.8],[30.6,-178.6],[30.6,-178.6],[30.9,-178.7],[31.3,-179.6]],sunk:2},
  {id:"tf16",side:"a",label:"TF 16 (Spruance · Enterprise, Hornet)",track:[[32.0,-175.3],[31.6,-176.0],[31.4,-176.3],[31.3,-176.4],[31.0,-176.6]]},
  {id:"tf17",side:"a",label:"TF 17 (Fletcher · Yorktown)",track:[[31.8,-175.0],[31.5,-175.8],[31.4,-176.0],[31.3,-176.1],[31.2,-176.3]],sunk:3},
  {id:"mid",side:"a",label:"Atol de Midway",fixed:true,track:[[28.21,-177.37],[28.21,-177.37],[28.21,-177.37],[28.21,-177.37],[28.21,-177.37]]}
 ],
 phases:[
  {t:"A armadilha descoberta",h:"Antes de 4 jun",p:"Analistas americanos decifram parte do código naval japonês e descobrem o alvo. Nimitz posiciona seus porta-aviões a nordeste de Midway, fora do alcance da exploração japonesa."},
  {t:"Ataque a Midway",h:"04 jun · 06h30",p:"Aviões de Nagumo atacam o atol. Nagumo decide rearmar seus aviões para um segundo ataque à ilha, quando chega a notícia de navios americanos por perto.",rings:[[28.21,-177.37]]},
  {t:"Os seis minutos",h:"~10h20",p:"Depois de ataques de torpedeiros que fracassam, bombardeiros de mergulho do Enterprise e do Yorktown atingem Akagi, Kaga e Soryu em poucos minutos, com os conveses cheios de aviões e combustível.",rings:[[30.6,-178.6],[30.65,-178.5],[30.55,-178.7]]},
  {t:"O contra-ataque do Hiryu",h:"Tarde",p:"O único porta-aviões japonês restante lança dois ataques e deixa o Yorktown fora de combate. No fim da tarde, aviões americanos encontram e atingem o Hiryu.",rings:[[31.4,-176.0],[30.9,-178.7]]},
  {t:"Retirada japonesa",h:"05–07 jun",p:"Yamamoto cancela a operação. O Yorktown, sob reboque, é afundado por um submarino japonês. O Japão volta para casa sem seus quatro porta-aviões de ataque."}
 ],
 lessons:[
  {t:"Inteligência muda o equilíbrio",d:"Com menos navios, os EUA venceram porque sabiam onde e quando o inimigo atacaria."},
  {t:"Decisões sob incerteza",d:"A troca de armamento ordenada por Nagumo deixou os porta-aviões vulneráveis no pior momento. Planos devem prever a hipótese menos provável."},
  {t:"Persistência no ataque",d:"Os primeiros ataques americanos falharam com grandes perdas, mas mantiveram a defesa japonesa ocupada e abriram caminho para os bombardeiros de mergulho."}
 ],
 fn:"O atol de Midway era defendido por fuzileiros do USMC: o 6º Batalhão de Defesa e uma ala de aviação de fuzileiros. Os pilotos fuzileiros atacaram a frota japonesa com aviões antiquados e sofreram perdas pesadas. A defesa terrestre resistiu ao bombardeio e manteve a pista funcionando, o que tornou a ilha um alvo que Nagumo não podia ignorar.",
 quiz:[
  {q:"O que permitiu aos EUA preparar a emboscada?",o:["Um desertor japonês","Decifração de parte do código naval japonês","Fotos de satélite","Um submarino infiltrado"],c:1},
  {q:"Que tipo de avião afundou três porta-aviões japoneses em poucos minutos?",o:["Torpedeiros","Caças","Bombardeiros de mergulho","Hidroaviões"],c:2},
  {q:"Quem defendeu o atol de Midway em terra?",o:["O Exército dos EUA","Fuzileiros navais do USMC","Tropas britânicas","Guarda Costeira"],c:1}
 ]},
{id:"normandia",name:"Normandia",year:1944,dtg:"06 JUN 1944",tags:["world","amph"],era:"Operações anfíbias",
 lat:49.55,lng:-0.75,alt:0.22,conflict:"Segunda Guerra Mundial · Operação Overlord (fase naval: Operação Neptune)",
 place:"Costa da Normandia, França: praias Utah, Omaha, Gold, Juno e Sword",
 a:{name:"Aliados",who:"EUA, Reino Unido, Canadá, França Livre e outros",cmd:"Gen. Dwight Eisenhower; força naval do Alm. Bertram Ramsay",force:"Cerca de 7.000 embarcações e 156 mil homens desembarcados no Dia D",loss:"Cerca de 10 mil baixas no Dia D (cerca de 4.400 mortos)"},
 b:{name:"Alemanha",who:"Exército alemão no Ocidente",cmd:"Marechais Gerd von Rundstedt e Erwin Rommel",force:"Divisões costeiras da Muralha do Atlântico e reservas blindadas",loss:"Estimativas entre 4 mil e 9 mil baixas no Dia D"},
 winner:"a",result:"Vitória aliada. A cabeça de praia foi mantida e abriu a frente ocidental que levaria à libertação da França.",
 units:[
  {id:"west",side:"a",label:"Força Ocidental (EUA)",track:[[50.25,-1.15],[49.70,-1.05],[49.52,-1.00],[49.40,-1.02],[49.32,-1.02]]},
  {id:"east",side:"a",label:"Força Oriental (RU/Canadá)",track:[[50.30,-0.75],[49.75,-0.55],[49.52,-0.48],[49.36,-0.45],[49.27,-0.45]]},
  {id:"wall",side:"b",label:"Muralha do Atlântico",fixed:true,track:[[49.33,-0.72],[49.33,-0.72],[49.33,-0.72],[49.33,-0.72],[49.33,-0.72]],sunk:4}
 ],
 phases:[
  {t:"Travessia",h:"05–06 jun · noite",p:"A frota se reúne ao sul da Ilha de Wight e cruza o Canal da Mancha por corredores varridos de minas. Tropas paraquedistas descem nos flancos durante a noite."},
  {t:"Bombardeio naval",h:"05h45",p:"Encouraçados, cruzadores e contratorpedeiros abrem fogo sobre as defesas costeiras para cobrir a chegada das lanchas de desembarque.",rings:[[49.42,-1.18],[49.37,-0.88],[49.34,-0.56],[49.34,-0.42],[49.29,-0.30]]},
  {t:"Hora H no setor americano",h:"06h30",p:"Desembarques em Utah e Omaha. Em Utah, as perdas são pequenas; em Omaha, o bombardeio falhou e as tropas ficam presas na praia por horas.",rings:[[49.42,-1.18],[49.37,-0.88]]},
  {t:"Gold, Juno e Sword",h:"07h25–07h45",p:"Britânicos e canadenses desembarcam mais tarde, com a maré mais alta. Comandos dos Royal Marines e do Exército avançam para ligar as praias.",rings:[[49.34,-0.56],[49.34,-0.42],[49.29,-0.30]]},
  {t:"Cabeça de praia",h:"Fim do Dia D",p:"Cerca de 156 mil homens estão em terra. As praias ainda não estão todas ligadas, mas a defesa alemã não consegue empurrar os Aliados de volta ao mar."}
 ],
 lessons:[
  {t:"Apoio de fogo naval é decisivo",d:"Onde o bombardeio funcionou, o desembarque avançou rápido. Em Omaha, os contratorpedeiros que se aproximaram da praia salvaram o ataque."},
  {t:"Maré e hora H andam juntas",d:"Cada praia teve sua hora H por causa da maré e dos obstáculos na areia. Hidrografia é dado tático, não detalhe."},
  {t:"Dissimulação estratégica",d:"A Operação Fortitude fez os alemães esperarem o ataque em Calais e reterem reservas longe da Normandia."}
 ],
 fn:"Os Royal Marines estiveram em toda a operação: guarneciam canhões nos navios, conduziam lanchas de desembarque e formaram Comandos que desembarcaram em Gold, Juno e Sword. O 47º Comando, por exemplo, tomou o porto de Port-en-Bessin. Para o fuzileiro, a Normandia é o caso clássico de desembarque contra costa defendida: assalto, consolidação e ligação entre praias.",
 quiz:[
  {q:"Qual era o nome da fase naval da Operação Overlord?",o:["Torch","Neptune","Husky","Dragoon"],c:1},
  {q:"Por que as praias tiveram horas H diferentes?",o:["Falta de lanchas","Diferenças de maré e obstáculos na praia","Ordem política","Mau tempo em cada setor"],c:1},
  {q:"Em qual praia os americanos ficaram presos por horas?",o:["Utah","Gold","Omaha","Sword"],c:2}
 ]},
{id:"sancarlos",name:"San Carlos",year:1982,dtg:"21 MAI 1982",tags:["world","amph"],era:"Era dos mísseis",
 lat:-51.52,lng:-59.20,alt:0.12,conflict:"Guerra das Malvinas/Falklands · Operação Sutton",
 place:"Baía de San Carlos, Ilha Soledad (Malvinas/Falklands), Atlântico Sul",
 a:{name:"Reino Unido",who:"Força-Tarefa 317",cmd:"Comodoro Michael Clapp (anfíbio) e Brig. Julian Thompson (3ª Brigada de Comandos)",force:"Grupo anfíbio com escoltas; cerca de 4.000 homens no primeiro desembarque",loss:"Fragatas Ardent e Antelope, contratorpedeiro Coventry e navio Atlantic Conveyor afundados entre 21 e 25 de maio"},
 b:{name:"Argentina",who:"Força Aérea e Aviação Naval",cmd:"Comando aéreo a partir do continente",force:"Ataques de A-4 Skyhawk, Dagger e Super Étendard",loss:"Dezenas de aeronaves abatidas"},
 winner:"a",result:"Vitória britânica no desembarque. A cabeça de praia foi mantida e permitiu o avanço por terra até Port Stanley, que se rendeu em 14 de junho.",
 units:[
  {id:"atg",side:"a",label:"Grupo anfíbio (Clapp)",track:[[-51.28,-59.42],[-51.46,-59.17],[-51.50,-59.08],[-51.50,-59.08],[-51.50,-59.08]]},
  {id:"3cdo",side:"a",label:"3ª Brigada de Comandos",track:[[-51.30,-59.42],[-51.47,-59.15],[-51.51,-59.03],[-51.51,-59.02],[-51.42,-58.85]]},
  {id:"ard",side:"a",label:"HMS Ardent",track:[[-51.32,-59.44],[-51.50,-59.25],[-51.62,-59.12],[-51.66,-59.10],[-51.66,-59.10]],sunk:3},
  {id:"faa",side:"b",label:"Aviação argentina",track:[[-51.60,-60.60],[-51.60,-60.60],[-51.58,-60.10],[-51.55,-59.30],[-51.60,-60.60]]}
 ],
 phases:[
  {t:"Entrada noturna",h:"20–21 mai · noite",p:"O grupo anfíbio entra no Estreito de San Carlos pelo norte, no escuro, depois de ataques de distração em outros pontos das ilhas."},
  {t:"Desembarque",h:"Amanhecer",p:"O 40º e o 45º Comandos dos Royal Marines e dois batalhões paraquedistas desembarcam quase sem oposição em praias ao redor da baía.",rings:[[-51.51,-59.03]]},
  {t:"Ataques aéreos",h:"21 mai · dia",p:"Aviões argentinos atacam em voo rasante os navios no estreito, que ganha o apelido de Bomb Alley. Muitas bombas atingem os navios mas não explodem.",rings:[[-51.55,-59.20],[-51.50,-59.08]]},
  {t:"Perdas navais",h:"21–25 mai",p:"A fragata Ardent afunda no dia 21 e a Antelope no dia 23. Os navios de escolta absorvem os ataques e protegem os navios que levam tropas e suprimentos.",rings:[[-51.66,-59.10]]},
  {t:"Saída da cabeça de praia",h:"27 mai",p:"Com a cabeça de praia consolidada, a 3ª Brigada de Comandos sai a pé para o leste, rumo a Port Stanley, e os paraquedistas atacam Goose Green."}
 ],
 lessons:[
  {t:"Escolha da área de desembarque",d:"San Carlos foi escolhida por ser abrigada, pouco defendida e cercada de colinas que dificultavam o ataque aéreo."},
  {t:"Defesa aérea é condição do desembarque",d:"Sem superioridade aérea completa, os britânicos pagaram com navios. Escoltas e mísseis antiaéreos protegeram o essencial: tropas e suprimentos."},
  {t:"Logística decide o avanço",d:"A perda do Atlantic Conveyor e seus helicópteros obrigou a tropa a marchar a pé. Um navio de transporte pode ser tão crítico quanto um de combate."}
 ],
 fn:"A 3ª Brigada de Comandos dos Royal Marines foi a espinha dorsal das forças terrestres. Depois do desembarque, o 45º Comando atravessou a ilha a pé, carregando o próprio equipamento, numa marcha que ficou conhecida como o yomp. É o caso moderno mais estudado de operação anfíbia a grande distância da base.",
 quiz:[
  {q:"Qual apelido os britânicos deram ao Estreito de San Carlos?",o:["Death Valley","Bomb Alley","Iron Bottom Sound","The Slot"],c:1},
  {q:"Por que muitos navios britânicos sobreviveram a bombas que os atingiram?",o:["Blindagem pesada","Muitas bombas não explodiram por causa do voo muito baixo","Escudos de fumaça","Os aviões erraram o alvo"],c:1},
  {q:"Qual unidade formou o núcleo da força terrestre britânica?",o:["1ª Divisão Blindada","3ª Brigada de Comandos","Guarda Real","SAS"],c:1}
 ]}
].concat(window.CURADAS_EXTRA||[]).sort((a,b)=>a.year-b.year);
