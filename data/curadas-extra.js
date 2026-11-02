/* Batalhas com estudo completo (parte 2). Posições das unidades são esquemáticas. */
window.CURADAS_EXTRA=[
{id:"quatro-de-maio",name:"Combate de 4 de Maio",year:1823,dtg:"04 MAI 1823",tags:["br"],era:"Era da vela",
 lat:-13.15,lng:-38.40,alt:0.16,conflict:"Guerra da Independência do Brasil",
 place:"Ao largo de Salvador, Bahia",
 a:{name:"Império do Brasil",who:"Armada Imperial",cmd:"Primeiro-Almirante Lord Thomas Cochrane",force:"Nau Pedro I e alguns navios menores",loss:"Danos leves"},
 b:{name:"Reino de Portugal",who:"Esquadra portuguesa na Bahia",cmd:"Chefe de Divisão João Félix Pereira de Campos",force:"Cerca de 13 navios, incluindo a nau Dom João VI",loss:"Danos leves"},
 winner:null,result:"Combate indeciso. Cochrane reorganizou as guarnições e bloqueou Salvador; em 2 de julho de 1823 as tropas portuguesas deixaram a Bahia, e a esquadra brasileira perseguiu o comboio.",
 units:[
  {id:"ped",side:"a",label:"Nau Pedro I (Cochrane)",track:[[-13.30,-38.30],[-13.12,-38.36],[-13.12,-38.36],[-13.30,-38.70],[-12.70,-38.10]]},
  {id:"bra2",side:"a",label:"Demais navios brasileiros",track:[[-13.34,-38.34],[-13.24,-38.36],[-13.27,-38.42],[-13.33,-38.75],[-12.78,-38.18]]},
  {id:"por",side:"b",label:"Esquadra portuguesa",track:[[-13.02,-38.48],[-13.10,-38.38],[-13.06,-38.44],[-13.02,-38.48],[-12.40,-37.70]]}
 ],
 phases:[
  {t:"A esquadra portuguesa sai",h:"Manhã",p:"A esquadra portuguesa deixa a Baía de Todos os Santos. Cochrane, com a nau Pedro I à frente, avança para o combate."},
  {t:"Corte da linha",h:"Meio do dia",p:"Cochrane atravessa a linha portuguesa para isolar os navios da retaguarda, a mesma ideia que Nelson usou em Trafalgar.",rings:[[-13.11,-38.37]]},
  {t:"Navios que não acompanham",h:"Tarde",p:"Parte dos navios brasileiros não segue a manobra. Muitos marinheiros eram portugueses de nascimento e não queriam lutar contra Portugal. A Pedro I fica isolada e se retira.",rings:[[-13.12,-38.36]]},
  {t:"Reorganização em Morro de São Paulo",h:"Maio–junho",p:"Cochrane leva a força ao Morro de São Paulo, troca guarnições de confiança e passa a bloquear Salvador por mar, cortando o abastecimento da cidade."},
  {t:"2 de Julho",h:"02 JUL 1823",p:"Sem suprimentos e cercadas por terra, as tropas portuguesas embarcam e deixam Salvador. A esquadra brasileira persegue o comboio pelo Atlântico e captura vários navios."}
 ],
 lessons:[
  {t:"Uma força só é tão forte quanto suas guarnições",d:"A melhor manobra falhou porque parte das tripulações não era confiável. Moral e lealdade da tropa são fatores de combate."},
  {t:"O bloqueio vence sem batalha decisiva",d:"Cortar o abastecimento marítimo de Salvador obrigou o inimigo a sair, sem um grande combate naval."},
  {t:"Ação conjunta mar e terra",d:"O cerco por terra e o bloqueio por mar atuaram juntos. Nenhum dos dois, sozinho, teria expulsado a guarnição portuguesa."}
 ],
 fn:"A tropa embarcada da Armada Imperial vinha da Brigada Real da Marinha, que chegou ao Brasil em 1808 com a família real e deu origem ao Corpo de Fuzileiros Navais. Na Guerra da Independência, essas tropas guarneciam a artilharia dos navios e davam segurança a bordo, papel decisivo numa esquadra com marinheiros de lealdade duvidosa.",
 quiz:[
  {q:"Quem comandava a esquadra brasileira no combate de 4 de maio de 1823?",o:["Almirante Barroso","Lord Thomas Cochrane","Almirante Tamandaré","John Pascoe Grenfell"],c:1},
  {q:"Qual foi o principal problema da esquadra brasileira nesse combate?",o:["Falta de canhões","Tripulações que não acompanharam a manobra","Mau tempo","Falta de carvão"],c:1},
  {q:"O que levou os portugueses a deixar Salvador em 2 de julho de 1823?",o:["Uma grande vitória naval","O bloqueio por mar somado ao cerco por terra","Um acordo de paz","Uma epidemia"],c:1}
 ]},
{id:"juncal",name:"Juncal",year:1827,dtg:"08–09 FEV 1827",tags:["br"],era:"Era da vela",
 lat:-33.94,lng:-58.40,alt:0.05,conflict:"Guerra da Cisplatina",
 place:"Rio Uruguai, junto à ilha de Juncal (atual fronteira Argentina–Uruguai)",
 a:{name:"Império do Brasil",who:"3ª Divisão da esquadra",cmd:"Capitão de Fragata Jacinto Roque de Sena Pereira",force:"Cerca de 17 navios pequenos",loss:"Quase toda a divisão capturada ou queimada; comandante aprisionado"},
 b:{name:"Províncias Unidas do Rio da Prata",who:"Esquadra argentina",cmd:"Almirante Guillermo Brown",force:"Cerca de 15 navios pequenos",loss:"Leves"},
 winner:"b",result:"Vitória argentina e uma das piores derrotas da Marinha brasileira. A divisão que operava no rio Uruguai foi destruída, mas o Brasil manteve o bloqueio do Rio da Prata.",
 units:[
  {id:"div3",side:"a",label:"3ª Divisão (Sena Pereira)",track:[[-33.88,-58.38],[-33.92,-58.39],[-33.93,-58.40],[-33.94,-58.40],[-33.94,-58.40]],sunk:3},
  {id:"brown",side:"b",label:"Esquadra de Brown",track:[[-34.05,-58.36],[-33.97,-58.39],[-33.95,-58.40],[-33.945,-58.40],[-34.00,-58.38]]}
 ],
 phases:[
  {t:"Divisão isolada no rio",h:"Início de fev",p:"Uma divisão brasileira de navios pequenos sobe o rio Uruguai para apoiar operações em terra, longe do grosso da esquadra que bloqueia o Rio da Prata."},
  {t:"Brown entra no rio",h:"08 FEV",p:"Brown leva sua esquadra rio acima e ataca. O vento fraco e as correntes limitam a manobra, e o primeiro dia termina sem decisão.",rings:[[-33.93,-58.40]]},
  {t:"O combate decisivo",h:"09 FEV",p:"Com vento favorável, Brown concentra os ataques sobre os navios brasileiros um a um. Vários são abordados e capturados.",rings:[[-33.94,-58.40],[-33.935,-58.395]]},
  {t:"Destruição da divisão",h:"09 FEV · tarde",p:"Os navios restantes são capturados ou queimados por suas tripulações para não caírem em mãos inimigas. Sena Pereira é feito prisioneiro."},
  {t:"Consequência",h:"Depois",p:"A derrota tira do Brasil o controle do rio Uruguai, mas não muda o bloqueio do Rio da Prata, que continua até o fim da guerra, em 1828."}
 ],
 lessons:[
  {t:"Forças divididas são batidas em detalhe",d:"Uma divisão isolada, longe do apoio, foi alvo fácil para uma esquadra concentrada."},
  {t:"Ambiente fluvial favorece quem o conhece",d:"Brown conhecia o rio e usou vento e corrente a seu favor. Conhecimento do ambiente operacional é vantagem tática."},
  {t:"Estudar as derrotas",d:"Juncal entra no estudo justamente por ser uma derrota: mostra o custo de missões sem apoio mútuo."}
 ],
 fn:"Os combates no rio foram decididos em grande parte por abordagem, em que a tropa embarcada de cada navio enfrenta a do inimigo no convés. Em navios pequenos, com poucos homens, perder a luta de convés significa perder o navio. Para o fuzileiro, Juncal mostra a importância do efetivo e do adestramento da tropa embarcada em operações ribeirinhas.",
 quiz:[
  {q:"Quem comandou a esquadra argentina em Juncal?",o:["José de San Martín","Guillermo Brown","Lucio Mansilla","Justo José de Urquiza"],c:1},
  {q:"Qual foi o principal erro do lado brasileiro?",o:["Atacar à noite","Manter uma divisão isolada, sem apoio","Usar navios grandes demais","Falta de munição"],c:1},
  {q:"Em que guerra ocorreu Juncal?",o:["Guerra do Paraguai","Guerra da Cisplatina","Guerra do Prata","Revolução Farroupilha"],c:1}
 ]},
{id:"tonelero",name:"Passo de Tonelero",year:1851,dtg:"17 DEZ 1851",tags:["br","amph"],era:"Vapor e vela",
 lat:-33.55,lng:-59.88,alt:0.05,conflict:"Guerra do Prata (contra Oribe e Rosas)",
 place:"Rio Paraná, Punta del Tonelero, província de Buenos Aires (Argentina)",
 a:{name:"Império do Brasil",who:"Força naval brasileira",cmd:"Almirante John Pascoe Grenfell",force:"Navios a vapor e a vela transportando tropas do Exército",loss:"Poucas baixas"},
 b:{name:"Confederação Argentina",who:"Forças de Juan Manuel de Rosas",cmd:"General Lucio Norberto Mansilla",force:"Baterias de artilharia na barranca e infantaria",loss:"Leves"},
 winner:"a",result:"Vitória brasileira. A esquadra forçou a passagem e levou as tropas rio acima para se juntar ao exército aliado, que derrotou Rosas em Caseros, em 3 de fevereiro de 1852.",
 units:[
  {id:"gren",side:"a",label:"Esquadra de Grenfell",track:[[-33.66,-59.62],[-33.58,-59.80],[-33.55,-59.88],[-33.51,-59.97],[-33.45,-60.08]]},
  {id:"mans",side:"b",label:"Baterias de Mansilla",fixed:true,track:[[-33.555,-59.895],[-33.555,-59.895],[-33.555,-59.895],[-33.555,-59.895],[-33.555,-59.895]]}
 ],
 phases:[
  {t:"Missão de transporte",h:"Dez 1851",p:"A esquadra de Grenfell precisa levar uma divisão do Exército rio acima, passando por posições fortificadas de Rosas no rio Paraná."},
  {t:"Aproximação",h:"17 DEZ",p:"Os navios a vapor rebocam os veleiros para manter velocidade e formação contra a correnteza."},
  {t:"Sob o fogo das baterias",h:"17 DEZ",p:"Na Punta del Tonelero, as baterias de Mansilla abrem fogo do alto da barranca. A esquadra responde e segue em frente sem parar.",rings:[[-33.555,-59.89]]},
  {t:"Passagem forçada",h:"17 DEZ",p:"Os navios passam pelo trecho batido pelo fogo com danos e baixas pequenas. A tropa embarcada chega intacta."},
  {t:"Rumo a Caseros",h:"Fev 1852",p:"As tropas desembarcam rio acima e se unem ao exército aliado. Em Caseros, Rosas é derrotado."}
 ],
 lessons:[
  {t:"A missão é a tropa, não o combate",d:"O objetivo era transportar a divisão. Grenfell não se deteve para duelar com as baterias: passou e cumpriu a missão."},
  {t:"Velocidade reduz a exposição",d:"Rebocar os veleiros com vapores diminuiu o tempo sob fogo, o fator que mais reduz perdas numa passagem forçada."},
  {t:"Projeção de força pelos rios",d:"Os rios da Bacia do Prata foram as estradas da guerra. Quem controla o rio leva tropas aonde precisa."}
 ],
 fn:"Tonelero é uma operação de transporte de tropas sob fogo, o primeiro passo de qualquer projeção anfíbia. Além da divisão do Exército, os navios levavam suas guarnições de artilharia de marinha, antecessoras do CFN, que guarneciam os canhões que responderam às baterias da barranca.",
 quiz:[
  {q:"Qual era o objetivo principal da esquadra em Tonelero?",o:["Destruir a esquadra de Rosas","Transportar tropas rio acima","Bloquear Buenos Aires","Tomar as baterias"],c:1},
  {q:"Quem comandou a força naval brasileira?",o:["John Pascoe Grenfell","Cochrane","Barroso","Tamandaré"],c:0},
  {q:"Qual batalha terrestre a passagem de Tonelero tornou possível?",o:["Tuiuti","Caseros","Ituzaingó","Curupaiti"],c:1}
 ]},
{id:"humaita",name:"Passagem de Humaitá",year:1868,dtg:"19 FEV 1868",tags:["br"],era:"Vapor e encouraçados",
 lat:-27.05,lng:-58.52,alt:0.045,conflict:"Guerra da Tríplice Aliança (Guerra do Paraguai)",
 place:"Rio Paraguai, diante da Fortaleza de Humaitá (Paraguai)",
 a:{name:"Império do Brasil",who:"Divisão de encouraçados",cmd:"Capitão de Mar e Guerra Delfim Carlos de Carvalho",force:"3 encouraçados e 3 monitores",loss:"Navios avariados, nenhum perdido"},
 b:{name:"Paraguai",who:"Fortaleza de Humaitá",cmd:"Comando paraguaio da fortaleza",force:"Dezenas de canhões em baterias ao longo da curva do rio e correntes atravessadas no canal",loss:"Perdeu o controle do rio"},
 winner:"a",result:"Vitória brasileira. A passagem rompeu o principal ponto de bloqueio do rio Paraguai e abriu caminho até Assunção. Humaitá foi abandonada pelos paraguaios em agosto de 1868.",
 units:[
  {id:"par1",side:"a",label:"Barroso + Rio Grande",track:[[-27.12,-58.55],[-27.08,-58.53],[-27.055,-58.515],[-27.02,-58.51],[-26.95,-58.50]]},
  {id:"par2",side:"a",label:"Bahia + Alagoas",track:[[-27.13,-58.555],[-27.09,-58.535],[-27.06,-58.52],[-27.03,-58.512],[-26.96,-58.505]]},
  {id:"par3",side:"a",label:"Tamandaré + Pará",track:[[-27.14,-58.56],[-27.10,-58.54],[-27.065,-58.525],[-27.04,-58.515],[-26.97,-58.51]]},
  {id:"fort",side:"b",label:"Fortaleza de Humaitá",fixed:true,track:[[-27.055,-58.505],[-27.055,-58.505],[-27.055,-58.505],[-27.055,-58.505],[-27.055,-58.505]]}
 ],
 phases:[
  {t:"Preparação",h:"Madrugada",p:"Cada encouraçado é amarrado a um monitor, menor, para que um proteja o outro e para que o conjunto não pare se uma máquina falhar."},
  {t:"Entrada na curva",h:"~03h30",p:"Os pares sobem o rio contra a correnteza e entram na curva de Humaitá, onde as baterias concentram o fogo no canal estreito.",rings:[[-27.055,-58.51]]},
  {t:"Sob o fogo da fortaleza",h:"Madrugada",p:"Os navios recebem dezenas de impactos. O Alagoas perde a amarração e passa sozinho, atingido muitas vezes, mas segue rio acima.",rings:[[-27.055,-58.51],[-27.045,-58.512]]},
  {t:"Passagem concluída",h:"Amanhecer",p:"Os seis navios passam a fortaleza. A blindagem resistiu, e nenhum navio foi perdido."},
  {t:"Rumo a Assunção",h:"Fev–ago 1868",p:"Com navios brasileiros acima de Humaitá, a fortaleza perde o abastecimento pelo rio. Os paraguaios a abandonam em agosto."}
 ],
 lessons:[
  {t:"Tecnologia muda o que é possível",d:"Navios de madeira não passariam por Humaitá. A blindagem tornou viável uma passagem antes impossível."},
  {t:"Redundância na formação",d:"Amarrar navios em pares protegia contra falha de máquinas e de leme no pior trecho."},
  {t:"Isolar em vez de assaltar",d:"A passagem cortou o abastecimento da fortaleza, que caiu sem um assalto frontal custoso."}
 ],
 fn:"A operação no rio Paraguai foi uma campanha conjunta: a Marinha abriu o rio e o Exército atacou por terra. O Batalhão Naval, origem do CFN, participou da campanha em operações ribeirinhas e desembarques ao longo dos rios. Humaitá mostra ao fuzileiro como o controle de um rio decide o destino de uma posição em terra.",
 quiz:[
  {q:"Como os navios brasileiros foram organizados para a passagem?",o:["Em linha única","Em pares, encouraçado amarrado a um monitor","Em comboio com transportes","Em duas colunas paralelas"],c:1},
  {q:"Por que a passagem foi decisiva?",o:["Destruiu a fortaleza","Cortou o abastecimento de Humaitá pelo rio","Capturou o comandante paraguaio","Encerrou a guerra"],c:1},
  {q:"Qual navio se soltou e passou sozinho?",o:["Bahia","Alagoas","Barroso","Tamandaré"],c:1}
 ]},
{id:"u199",name:"Afundamento do U-199",year:1943,dtg:"31 JUL 1943",tags:["br"],era:"Guerra antissubmarino",
 lat:-23.85,lng:-42.95,alt:0.35,conflict:"Segunda Guerra Mundial · Batalha do Atlântico",
 place:"Atlântico Sul, ao largo do litoral do Rio de Janeiro",
 a:{name:"Brasil e Estados Unidos",who:"Força Aérea Brasileira e Marinha dos EUA",cmd:"Tripulações da FAB e do esquadrão VP-74 da US Navy",force:"Um PBM Mariner americano, um A-28 Hudson e um PBY Catalina da FAB",loss:"Nenhuma"},
 b:{name:"Alemanha",who:"Kriegsmarine",cmd:"Kapitänleutnant Hans-Werner Kraus",force:"Submarino U-199",loss:"Submarino afundado; cerca de 50 mortos e uma dúzia de sobreviventes capturados"},
 winner:"a",result:"O U-199 foi o primeiro submarino afundado com participação direta da FAB. A ação mostrou o peso do Brasil na proteção das rotas do Atlântico Sul.",
 units:[
  {id:"u",side:"b",label:"U-199",track:[[-23.60,-43.30],[-23.80,-43.00],[-23.85,-42.95],[-23.85,-42.95],[-23.85,-42.95]],sunk:3},
  {id:"pbm",side:"a",label:"PBM Mariner (VP-74)",track:[[-23.00,-43.20],[-23.75,-43.00],[-23.82,-42.97],[-23.80,-42.90],[-23.60,-43.10]]},
  {id:"fab",side:"a",label:"Hudson e Catalina da FAB",track:[[-22.90,-43.17],[-23.30,-43.10],[-23.80,-42.98],[-23.85,-42.95],[-23.70,-43.05]]}
 ],
 phases:[
  {t:"O submarino no litoral",h:"Jul 1943",p:"O U-199 opera na rota de navios que entram e saem do Rio de Janeiro, uma das mais movimentadas do Atlântico Sul."},
  {t:"Detecção e primeiro ataque",h:"31 JUL · manhã",p:"Um hidroavião PBM Mariner americano avista o submarino na superfície e ataca com cargas de profundidade, danificando-o.",rings:[[-23.80,-43.00]]},
  {t:"Ataque da FAB",h:"31 JUL",p:"Um Hudson da FAB ataca em seguida. Sem conseguir submergir, o U-199 combate na superfície com sua artilharia antiaérea.",rings:[[-23.84,-42.96]]},
  {t:"O Catalina Arará",h:"31 JUL",p:"O PBY Catalina da FAB, batizado Arará em memória de um navio brasileiro afundado em 1942, lança as cargas que afundam o submarino.",rings:[[-23.85,-42.95]]},
  {t:"Resgate dos sobreviventes",h:"31 JUL · tarde",p:"Os sobreviventes, entre eles o comandante, são recolhidos por um navio americano e feitos prisioneiros."}
 ],
 lessons:[
  {t:"Patrulha aérea marítima",d:"A aviação de patrulha foi a arma mais eficaz contra submarinos na superfície. Cobertura constante das rotas obriga o inimigo a submergir e perder velocidade."},
  {t:"Cooperação entre aliados",d:"Três aeronaves, de dois países, atacaram em sequência. Procedimentos comuns tornaram isso possível."},
  {t:"Proteção do tráfego marítimo",d:"Sem rotas seguras, nenhuma força sai do porto. A guerra antissubmarino é a base de todas as outras operações navais."}
 ],
 fn:"Esta é uma ação aeronaval, sem tropa de fuzileiros envolvida. Ela entra no estudo pela proteção do tráfego marítimo: uma força anfíbia depende de rotas livres para chegar à área do desembarque. Durante a guerra, o CFN guarneceu bases navais e pontos do litoral brasileiro contra ameaças vindas do mar.",
 quiz:[
  {q:"Qual aeronave da FAB deu o golpe final no U-199?",o:["P-47 Thunderbolt","PBY Catalina Arará","B-25 Mitchell","Lockheed Hudson"],c:1},
  {q:"Em que contexto ocorreu o afundamento do U-199?",o:["Guerra das Malvinas","Batalha do Atlântico, na 2ª Guerra","Primeira Guerra Mundial","Guerra Fria"],c:1},
  {q:"Qual é a lição central desta ação?",o:["Defesa de praias","Proteção do tráfego marítimo","Assalto anfíbio","Combate ribeirinho"],c:1}
 ]},
{id:"salamina",name:"Salamina",year:-480,dtg:"SET 480 a.C.",tags:["world"],era:"Antiguidade",
 lat:37.955,lng:23.56,alt:0.035,conflict:"Guerras Médicas (Greco-Persas)",
 place:"Estreito entre a ilha de Salamina e a Ática (Grécia)",
 a:{name:"Cidades gregas",who:"Atenas, Esparta, Corinto, Égina e aliadas",cmd:"Temístocles (Atenas) e Euribíades (Esparta)",force:"Cerca de 370 trirremes",loss:"Cerca de 40 trirremes"},
 b:{name:"Império Persa",who:"Frota de Xerxes I, com navios fenícios, egípcios e jônios",cmd:"Rei Xerxes I",force:"Estimativas modernas de 600 a 800 navios",loss:"Cerca de 200 navios"},
 winner:"a",result:"Vitória decisiva grega. Xerxes voltou à Ásia com parte do exército, e a ameaça persa à Grécia terminou no ano seguinte, em Plateias e Mícale.",
 units:[
  {id:"gre",side:"a",label:"Frota grega (Temístocles)",track:[[37.965,23.515],[37.965,23.53],[37.96,23.55],[37.955,23.565],[37.95,23.58]]},
  {id:"per",side:"b",label:"Frota persa",track:[[37.925,23.62],[37.94,23.59],[37.952,23.57],[37.955,23.567],[37.93,23.63]],sunk:3},
  {id:"egi",side:"b",label:"Esquadra egípcia",track:[[37.95,23.40],[37.97,23.43],[37.97,23.43],[37.97,23.43],[37.95,23.38]]},
  {id:"psy",side:"a",label:"Hoplitas de Aristides",fixed:true,track:[[37.945,23.585],[37.945,23.585],[37.945,23.585],[37.945,23.585],[37.945,23.585]]}
 ],
 phases:[
  {t:"A armadilha",h:"Noite anterior",p:"Temístocles envia uma mensagem falsa a Xerxes dizendo que os gregos vão fugir. Os persas passam a noite remando para fechar as saídas do estreito."},
  {t:"Persas entram no estreito",h:"Amanhecer",p:"A frota persa, cansada, entra no canal estreito. A esquadra egípcia bloqueia a saída oeste."},
  {t:"Choque no canal",h:"Manhã",p:"No espaço apertado, os navios persas não conseguem usar a vantagem numérica e se chocam uns com os outros. As trirremes gregas atacam com o esporão.",rings:[[37.955,23.565],[37.95,23.57]]},
  {t:"Desastre persa",h:"Tarde",p:"As primeiras linhas persas recuam contra as que ainda entram. Hoplitas de Aristides desembarcam em Psitália e matam a guarnição persa da ilha.",rings:[[37.945,23.585]]},
  {t:"Retirada",h:"Dias seguintes",p:"A frota persa se retira. Xerxes volta à Ásia temendo perder a rota de retorno pelo Helesponto."}
 ],
 lessons:[
  {t:"Escolha o terreno que anula o número",d:"No estreito, a superioridade numérica persa virou desvantagem. O ambiente escolhido pelos gregos igualou a luta."},
  {t:"Dissimulação",d:"A mensagem falsa de Temístocles levou o inimigo a agir como os gregos queriam."},
  {t:"Fadiga é fator de combate",d:"Os remadores persas passaram a noite remando e chegaram exaustos ao combate."}
 ],
 fn:"Cada trirreme grega levava epibatai, soldados embarcados equipados como hoplitas, considerados um dos primeiros exemplos de infantaria naval. Eles defendiam o navio contra abordagens e combatiam no convés. Em Psitália, os hoplitas de Aristides fizeram um desembarque durante a batalha, uma ação anfíbia em apoio direto ao combate naval.",
 quiz:[
  {q:"Por que o estreito de Salamina favorecia os gregos?",o:["Águas profundas","Espaço apertado que anulava a superioridade numérica persa","Ventos favoráveis","Proximidade de Atenas"],c:1},
  {q:"Como se chamavam os soldados embarcados nas trirremes gregas?",o:["Epibatai","Legionários","Hoplomachoi","Marinarii"],c:0},
  {q:"Qual foi o estratagema de Temístocles?",o:["Atacar à noite","Enviar uma mensagem falsa a Xerxes","Usar brulotes","Fingir rendição"],c:1}
 ]},
{id:"gravelines",name:"Gravelines (Armada Invencível)",year:1588,dtg:"08 AGO 1588",tags:["world"],era:"Era da vela",
 lat:51.12,lng:2.25,alt:0.32,conflict:"Guerra Anglo-Espanhola (1585–1604)",
 place:"Canal da Mancha, ao largo de Gravelines (França) e dos bancos da Zelândia",
 a:{name:"Inglaterra",who:"Marinha de Elizabeth I",cmd:"Lord Howard de Effingham, com Francis Drake",force:"Cerca de 200 navios ao longo da campanha",loss:"Nenhum navio perdido em combate"},
 b:{name:"Espanha",who:"Grande Armada de Filipe II",cmd:"Duque de Medina Sidonia",force:"Cerca de 130 navios com cerca de 18 mil soldados",loss:"Alguns navios em Gravelines; cerca de um terço da Armada perdido na volta, por tempestades"},
 winner:"a",result:"Vitória inglesa. A invasão da Inglaterra foi cancelada e a Armada, forçada a voltar contornando a Escócia e a Irlanda, perdeu muitos navios em tempestades.",
 units:[
  {id:"arm",side:"b",label:"Grande Armada (Medina Sidonia)",track:[[50.98,1.80],[51.00,1.92],[51.05,2.15],[51.30,2.75],[52.40,3.10]],sunk:4},
  {id:"eng",side:"a",label:"Frota inglesa (Howard e Drake)",track:[[50.95,1.55],[50.97,1.72],[51.02,2.08],[51.25,2.60],[52.20,2.80]]},
  {id:"bru",side:"a",label:"Brulotes",track:[[50.97,1.70],[50.98,1.79],[50.98,1.79],[50.98,1.79],[50.98,1.79]],sunk:2}
 ],
 phases:[
  {t:"Ancorada em Calais",h:"06–07 AGO",p:"A Armada ancora em Calais esperando o exército do Duque de Parma, que deveria embarcar em Flandres para invadir a Inglaterra."},
  {t:"Os brulotes",h:"Noite 07–08 AGO",p:"Os ingleses lançam oito navios incendiados contra a Armada ancorada. Para escapar, os espanhóis cortam as amarras e a formação se desfaz.",rings:[[50.98,1.80]]},
  {t:"Combate de Gravelines",h:"08 AGO",p:"Com a Armada dispersa, os ingleses atacam de perto pela primeira vez. A artilharia inglesa, mais rápida, causa grandes danos sem permitir abordagens.",rings:[[51.05,2.15],[51.07,2.20]]},
  {t:"Bancos da Zelândia",h:"09 AGO",p:"O vento empurra a Armada para os bancos de areia da costa flamenga. Uma mudança do vento a salva do encalhe, mas não há como voltar ao Canal."},
  {t:"A volta pelo norte",h:"Ago–out 1588",p:"Sem caminho de volta, a Armada contorna a Escócia e a Irlanda. Tempestades destroem muitos navios na costa irlandesa."}
 ],
 lessons:[
  {t:"Coordenação entre forças é ponto crítico",d:"O plano dependia de juntar a Armada com o exército de Parma. Sem um porto de águas profundas para o encontro, o plano era frágil desde o início."},
  {t:"Recuse o combate que favorece o inimigo",d:"Os espanhóis queriam abordar; os ingleses lutaram a distância com artilharia, onde eram superiores."},
  {t:"Uma arma barata pode desfazer uma formação",d:"Os brulotes quase não causaram danos diretos, mas desmancharam a formação que protegia a Armada."}
 ],
 fn:"A Armada levava cerca de 18 mil soldados embarcados, além dos que esperava receber de Parma: era, na prática, uma força anfíbia de invasão. A tática espanhola contava com abordagem e combate de infantaria, mas os ingleses nunca deixaram os navios se aproximarem. Para o fuzileiro, a lição é que a tropa de assalto só vale se a força naval conseguir colocá-la em posição.",
 quiz:[
  {q:"O que desfez a formação da Armada em Calais?",o:["Uma tempestade","Brulotes, navios incendiados lançados à noite","Um ataque de galés","Falta de água"],c:1},
  {q:"Qual era o objetivo final da Armada?",o:["Bloquear Londres","Escoltar o exército de Parma para invadir a Inglaterra","Atacar a Holanda","Proteger a frota das Américas"],c:1},
  {q:"Onde a Armada perdeu mais navios?",o:["Em Gravelines","Em Calais","Nas tempestades da volta pela Escócia e Irlanda","No Canal da Mancha"],c:2}
 ]},
{id:"tsushima",name:"Tsushima",year:1905,dtg:"27–28 MAI 1905",tags:["world"],era:"Encouraçados",
 lat:34.40,lng:130.20,alt:0.65,conflict:"Guerra Russo-Japonesa",
 place:"Estreito de Tsushima, entre a Coreia e o Japão",
 a:{name:"Japão",who:"Frota Combinada",cmd:"Almirante Tōgō Heihachirō",force:"4 encouraçados, 27 cruzadores e dezenas de torpedeiros",loss:"3 torpedeiros; cerca de 120 mortos"},
 b:{name:"Rússia",who:"2ª e 3ª Esquadras do Pacífico",cmd:"Almirante Zinovy Rozhestvensky",force:"38 navios, incluindo 11 encouraçados",loss:"21 navios afundados, 7 capturados; mais de 4.000 mortos"},
 winner:"a",result:"Vitória japonesa esmagadora. A Rússia perdeu quase toda a frota e aceitou negociar a paz, assinada em Portsmouth (EUA) em setembro de 1905.",
 units:[
  {id:"rus",side:"b",label:"Esquadra russa (Rozhestvensky)",track:[[33.70,129.30],[34.10,129.80],[34.35,130.05],[34.70,130.40],[37.20,131.80]],sunk:4},
  {id:"tog",side:"a",label:"Encouraçados de Tōgō",track:[[35.10,128.70],[34.60,129.90],[34.45,130.20],[34.80,130.60],[37.10,131.95]]},
  {id:"kam",side:"a",label:"Cruzadores de Kamimura",track:[[35.00,128.90],[34.50,130.00],[34.30,130.25],[34.60,130.50],[37.00,131.70]]}
 ],
 phases:[
  {t:"Detecção",h:"27 MAI · madrugada",p:"Depois de navegar meio mundo desde o Báltico, a esquadra russa tenta passar pelo estreito rumo a Vladivostok. Um cruzador auxiliar japonês a avista e informa Tōgō por rádio."},
  {t:"Cruzando o T",h:"~14h00",p:"Tōgō faz uma volta arriscada à frente da coluna russa. Assim, todos os seus canhões disparam contra a cabeça da linha inimiga, que só pode responder com os navios da frente.",rings:[[34.35,130.05]]},
  {t:"Fogo concentrado",h:"Tarde",p:"Os japoneses concentram o fogo nos navios-capitânia. O Oslyabya afunda em menos de uma hora e o Suvorov, com Rozhestvensky ferido, fica fora de combate.",rings:[[34.35,130.05],[34.40,130.15]]},
  {t:"Ataques noturnos",h:"Noite",p:"Torpedeiros e contratorpedeiros japoneses caçam os navios russos dispersos no escuro, afundando vários."},
  {t:"Rendição",h:"28 MAI",p:"Os navios restantes, sob o Almirante Nebogatov, são cercados perto das rochas de Liancourt e se rendem. Poucos navios russos chegam a Vladivostok."}
 ],
 lessons:[
  {t:"Cruzar o T",d:"Colocar a própria linha perpendicular à frente do inimigo permite usar todos os canhões contra poucos. É a manobra clássica da era dos encouraçados."},
  {t:"Prontidão e adestramento",d:"A frota japonesa estava treinada e descansada; a russa chegava depois de sete meses de viagem. Prontidão pesa tanto quanto o número de navios."},
  {t:"Comunicações e reconhecimento",d:"O rádio permitiu a Tōgō saber cedo onde estava o inimigo. Informação antecipada deu a ele a iniciativa."}
 ],
 fn:"Em Tsushima o combate foi decidido pela artilharia, mas os navios da época mantinham destacamentos de infantaria naval para segurança, abordagem de navios rendidos e guarnição de prêmios capturados. Para o fuzileiro, Tsushima mostra o momento em que a abordagem perde lugar para o canhão, e a infantaria naval passa a se especializar na guerra anfíbia.",
 quiz:[
  {q:"Qual manobra Tōgō executou em Tsushima?",o:["Linha de frente","Cruzar o T","Envolvimento duplo","Retirada simulada"],c:1},
  {q:"De onde partiu a esquadra russa antes da batalha?",o:["Vladivostok","Port Arthur","Mar Báltico","Mar Negro"],c:2},
  {q:"Que tecnologia ajudou Tōgō a localizar o inimigo cedo?",o:["Radar","Rádio","Aviões","Sonar"],c:1}
 ]},
{id:"jutlandia",name:"Jutlândia",year:1916,dtg:"31 MAI 1916",tags:["world"],era:"Encouraçados",
 lat:56.70,lng:5.90,alt:0.75,conflict:"Primeira Guerra Mundial",
 place:"Mar do Norte, a oeste da península da Jutlândia (Dinamarca)",
 a:{name:"Reino Unido",who:"Grande Frota",cmd:"Almirante John Jellicoe; cruzadores de batalha de David Beatty",force:"151 navios, incluindo 28 encouraçados",loss:"14 navios, incluindo 3 cruzadores de batalha; cerca de 6.100 mortos"},
 b:{name:"Alemanha",who:"Frota de Alto-Mar",cmd:"Almirante Reinhard Scheer; cruzadores de batalha de Franz Hipper",force:"99 navios, incluindo 16 encouraçados",loss:"11 navios; cerca de 2.550 mortos"},
 winner:"a",result:"Resultado tático favorável à Alemanha, que afundou mais navios. Estrategicamente, os britânicos mantiveram o controle do Mar do Norte e a frota alemã quase não voltou a sair até o fim da guerra.",
 units:[
  {id:"bea",side:"a",label:"Cruzadores de Beatty",track:[[56.40,4.20],[56.75,5.40],[56.40,6.10],[56.90,5.80],[56.80,5.60]]},
  {id:"jel",side:"a",label:"Grande Frota (Jellicoe)",track:[[57.40,4.30],[57.10,5.00],[57.05,5.70],[56.90,6.00],[56.60,6.40]]},
  {id:"hip",side:"b",label:"Cruzadores de Hipper",track:[[56.70,6.40],[56.85,5.70],[56.50,6.05],[56.85,6.10],[56.20,6.70]]},
  {id:"sch",side:"b",label:"Frota de Alto-Mar (Scheer)",track:[[55.80,6.60],[56.20,6.30],[56.70,6.00],[56.80,6.30],[55.60,7.40]]}
 ],
 phases:[
  {t:"Corrida para o sul",h:"~15h45",p:"Os cruzadores de Beatty encontram os de Hipper, que recua para o sul atraindo os britânicos para a frota de Scheer. Indefatigable e Queen Mary explodem.",rings:[[56.75,5.50]]},
  {t:"Corrida para o norte",h:"~16h40",p:"Ao avistar a frota inteira de Scheer, Beatty inverte o rumo e atrai os alemães para o norte, na direção de Jellicoe, que eles não sabem estar ali."},
  {t:"Jellicoe cruza o T",h:"~18h15",p:"Jellicoe desdobra a Grande Frota em linha à frente dos alemães. O cruzador de batalha Invincible explode, mas Scheer se vê diante de toda a frota britânica.",rings:[[56.95,5.95],[56.85,6.05]]},
  {t:"A volta de Scheer",h:"~18h35–19h15",p:"Scheer manda toda a linha virar de uma vez e some na névoa. Tenta passar de novo, enfrenta outra vez o fogo britânico e vira novamente.",rings:[[56.80,6.20]]},
  {t:"Fuga noturna",h:"Noite",p:"No escuro, a frota alemã atravessa a retaguarda britânica e chega ao canal de Horns Reef, de volta à base."}
 ],
 lessons:[
  {t:"Proteção dos paióis",d:"Três cruzadores de batalha britânicos explodiram por falhas no manuseio de pólvora e proteção das torres. Procedimentos de segurança são vida ou morte."},
  {t:"Comunicação entre comandantes",d:"Jellicoe recebeu informações incompletas sobre a posição alemã. Relatórios de contato claros e frequentes decidem batalhas."},
  {t:"Vitória estratégica sem vitória tática",d:"Perder mais navios não impediu os britânicos de manter o bloqueio. O objetivo estratégico pesa mais que o placar."}
 ],
 fn:"Na Royal Navy, os Royal Marines guarneciam uma das torres principais de cada encouraçado e cruzador. No HMS Lion, o Major Francis Harvey, dos Royal Marines, mortalmente ferido, mandou alagar o paiol da torre atingida e evitou que o navio explodisse. Recebeu a Victoria Cross. É um exemplo de que o fuzileiro embarcado é, antes de tudo, parte da guarnição do navio.",
 quiz:[
  {q:"Qual oficial dos Royal Marines salvou o HMS Lion ao alagar o paiol?",o:["Francis Harvey","David Beatty","John Jellicoe","Horatio Nelson"],c:0},
  {q:"Qual foi o resultado estratégico de Jutlândia?",o:["A Alemanha rompeu o bloqueio","O Reino Unido manteve o controle do Mar do Norte","A frota britânica foi destruída","A guerra terminou"],c:1},
  {q:"Como a frota alemã escapou na noite de 31 de maio?",o:["Passando pela retaguarda britânica no escuro","Rendendo-se","Por um canal na Noruega","Escoltada por submarinos"],c:0}
 ]},
{id:"leyte",name:"Golfo de Leyte",year:1944,dtg:"23–26 OUT 1944",tags:["world"],era:"Era dos porta-aviões",
 lat:13.5,lng:125.0,alt:1.6,conflict:"Segunda Guerra Mundial · Guerra do Pacífico",
 place:"Mares das Filipinas: Sibuyan, Estreito de Surigao, ao largo de Samar e Cabo Engaño",
 a:{name:"Estados Unidos e Austrália",who:"3ª Frota (Halsey) e 7ª Frota (Kinkaid)",cmd:"Almirantes William Halsey e Thomas Kinkaid",force:"Mais de 300 navios, incluindo 34 porta-aviões",loss:"1 porta-aviões leve, 2 porta-aviões de escolta, 3 contratorpedeiros e escoltas"},
 b:{name:"Japão",who:"Marinha Imperial",cmd:"Almirantes Takeo Kurita, Jisaburō Ozawa, Shōji Nishimura e Kiyohide Shima",force:"Cerca de 70 navios, incluindo 4 porta-aviões e 9 encouraçados",loss:"4 porta-aviões, 3 encouraçados, 10 cruzadores e outros; mais de 10 mil mortos"},
 winner:"a",result:"Vitória americana decisiva, na maior batalha naval da história. A Marinha Imperial japonesa deixou de existir como força capaz de grandes operações.",
 units:[
  {id:"kur",side:"b",label:"Força Central (Kurita)",track:[[11.50,119.50],[12.80,122.60],[12.60,124.30],[11.80,126.10],[12.50,124.20]]},
  {id:"nis",side:"b",label:"Força Sul (Nishimura)",track:[[9.50,121.50],[9.60,123.80],[10.20,125.35],[10.20,125.35],[10.20,125.35]],sunk:2},
  {id:"oza",side:"b",label:"Isca: porta-aviões de Ozawa",track:[[22.50,127.50],[20.50,126.50],[19.80,126.00],[19.30,125.80],[19.30,125.80]],sunk:4},
  {id:"hal",side:"a",label:"3ª Frota (Halsey)",track:[[13.50,126.50],[13.20,126.20],[16.00,126.20],[19.00,126.20],[17.00,126.40]]},
  {id:"kin",side:"a",label:"7ª Frota (Kinkaid)",track:[[10.80,125.50],[10.60,125.40],[10.40,125.35],[11.00,125.70],[11.00,125.60]]}
 ],
 phases:[
  {t:"Desembarque e plano japonês",h:"20–23 OUT",p:"Tropas americanas desembarcam em Leyte. O Japão lança três forças: uma isca de porta-aviões ao norte e duas forças de encouraçados para atacar os navios de desembarque."},
  {t:"Mar de Sibuyan",h:"24 OUT",p:"Aviões americanos atacam a força de Kurita e afundam o encouraçado Musashi. Kurita recua por algumas horas.",rings:[[12.80,122.60]]},
  {t:"Estreito de Surigao",h:"Noite 24–25 OUT",p:"A força de Nishimura entra no estreito e encontra a linha de encouraçados de Kinkaid, que cruza o T. É a última batalha entre linhas de encouraçados da história.",rings:[[10.20,125.35]]},
  {t:"Halsey morde a isca",h:"25 OUT",p:"Halsey leva a 3ª Frota para o norte atrás dos porta-aviões de Ozawa, que são afundados em Cabo Engaño. A saída do Estreito de San Bernardino fica sem vigilância.",rings:[[19.30,125.80]]},
  {t:"Samar",h:"25 OUT · manhã",p:"Kurita surge diante de pequenos porta-aviões de escolta e contratorpedeiros. A defesa desesperada desse grupo convence Kurita a recuar, e os navios de desembarque são salvos.",rings:[[11.80,126.10]]}
 ],
 lessons:[
  {t:"Não abandone a missão principal",d:"Ao perseguir a isca, Halsey deixou desprotegida a força de desembarque, que era o centro de gravidade da operação."},
  {t:"Unidade de comando",d:"As duas frotas americanas tinham chefes diferentes, e cada uma achou que a outra cobria San Bernardino. Comando unificado evita lacunas."},
  {t:"Ação agressiva de forças pequenas",d:"Em Samar, contratorpedeiros atacando um inimigo muito mais forte fizeram Kurita acreditar que enfrentava forças maiores."}
 ],
 fn:"Leyte é uma batalha naval travada para proteger uma operação anfíbia. Todo o plano japonês mirava os navios de desembarque e de apoio às tropas em terra. Para o fuzileiro, a lição é que a cabeça de praia depende da força naval que a protege: se a cobertura falha, a tropa em terra fica sem apoio e sem suprimentos.",
 quiz:[
  {q:"Qual era o alvo principal do plano japonês em Leyte?",o:["Os porta-aviões de Halsey","Os navios de desembarque e apoio às tropas","A base de Pearl Harbor","A frota australiana"],c:1},
  {q:"O que aconteceu no Estreito de Surigao?",o:["Batalha de porta-aviões","Última batalha entre linhas de encouraçados","Desembarque anfíbio","Ataque de submarinos"],c:1},
  {q:"Qual foi o erro de Halsey?",o:["Atacar à noite","Perseguir a isca e deixar San Bernardino sem vigilância","Dividir a frota em três","Recuar cedo demais"],c:1}
 ]},
{id:"gallipoli",name:"Galípoli",year:1915,dtg:"25 ABR 1915",tags:["world","amph"],era:"Operações anfíbias",
 lat:40.15,lng:26.30,alt:0.2,conflict:"Primeira Guerra Mundial · Campanha dos Dardanelos",
 place:"Península de Galípoli e Estreito dos Dardanelos (Turquia)",
 a:{name:"Aliados",who:"Reino Unido, França, Austrália, Nova Zelândia, Índia e Terra Nova",cmd:"Gen. Ian Hamilton; força naval do Alm. John de Robeck",force:"Cerca de 75 mil homens no primeiro desembarque",loss:"Em toda a campanha, cerca de 250 mil baixas"},
 b:{name:"Império Otomano",who:"5º Exército otomano",cmd:"Gen. Otto Liman von Sanders; Coronel Mustafa Kemal",force:"Cerca de 60 mil homens no início",loss:"Em toda a campanha, cerca de 250 mil baixas"},
 winner:"b",result:"Vitória otomana. Os Aliados não conseguiram sair das praias e evacuaram a península em janeiro de 1916. A campanha se tornou o principal estudo de caso do que não fazer numa operação anfíbia.",
 units:[
  {id:"fleet",side:"a",label:"Frota aliada (de Robeck)",track:[[40.05,26.10],[40.08,26.30],[40.03,26.12],[40.05,26.10],[39.95,25.95]]},
  {id:"anzac",side:"a",label:"ANZAC",track:[[40.22,26.15],[40.22,26.15],[40.24,26.28],[40.245,26.29],[40.22,26.15]]},
  {id:"helles",side:"a",label:"29ª Divisão (Helles)",track:[[40.00,26.10],[40.00,26.10],[40.05,26.18],[40.07,26.21],[40.00,26.10]]},
  {id:"otto",side:"b",label:"Defesa otomana",fixed:true,track:[[40.18,26.32],[40.18,26.32],[40.18,26.32],[40.18,26.32],[40.18,26.32]]}
 ],
 phases:[
  {t:"Ataque naval aos Dardanelos",h:"18 MAR 1915",p:"Encouraçados aliados tentam forçar o estreito só com a frota. Um campo de minas não detectado afunda três encouraçados e o ataque é cancelado.",rings:[[40.10,26.35]]},
  {t:"Preparação e alerta ao inimigo",h:"Mar–abr",p:"Os Aliados decidem desembarcar tropas. As semanas de preparação dão aos otomanos tempo para reforçar a península."},
  {t:"Desembarques",h:"25 ABR",p:"Britânicos desembarcam no Cabo Helles e o ANZAC na enseada que levaria seu nome. Em algumas praias, as tropas são massacradas na saída das lanchas e do navio River Clyde.",rings:[[40.05,26.18],[40.24,26.28]]},
  {t:"Impasse",h:"Mai–ago",p:"As tropas ficam presas em estreitas faixas de terra. Ataques e contra-ataques terminam em guerra de trincheiras. Um novo desembarque em Suvla, em agosto, também não avança.",rings:[[40.07,26.21],[40.245,26.29]]},
  {t:"Evacuação",h:"Dez 1915 – jan 1916",p:"Os Aliados retiram todas as tropas à noite, com sigilo e quase sem baixas. É a parte mais bem executada da campanha."}
 ],
 lessons:[
  {t:"Surpresa não pode ser desperdiçada",d:"O ataque naval de março alertou os otomanos, que tiveram semanas para preparar a defesa antes do desembarque."},
  {t:"Desembarque precisa de doutrina",d:"Faltavam lanchas apropriadas, apoio de fogo coordenado e planos para avançar além da praia."},
  {t:"Planeje a saída da praia",d:"Tomar a praia não basta. Sem objetivos claros em terra e reservas para explorar o sucesso, a força fica presa."}
 ],
 fn:"Batalhões dos Royal Marines, dentro da Royal Naval Division, combateram em Galípoli desde os primeiros desembarques. Depois da guerra, o Corpo de Fuzileiros dos EUA estudou a campanha a fundo para criar a doutrina anfíbia moderna, que orientou os desembarques da Segunda Guerra. Para o fuzileiro, Galípoli é a origem da doutrina de assalto anfíbio.",
 quiz:[
  {q:"O que fez fracassar o ataque naval de 18 de março de 1915?",o:["Mau tempo","Um campo de minas não detectado","Submarinos alemães","Falta de munição"],c:1},
  {q:"Qual parte da campanha foi a mais bem executada?",o:["O desembarque em Helles","O desembarque em Suvla","A evacuação","O ataque naval"],c:2},
  {q:"Qual corpo estudou Galípoli para criar a doutrina anfíbia moderna?",o:["Exército Francês","Corpo de Fuzileiros dos EUA","Marinha Japonesa","Royal Air Force"],c:1}
 ]},
{id:"iwojima",name:"Iwo Jima",year:1945,dtg:"19 FEV 1945",tags:["world","amph"],era:"Operações anfíbias",
 lat:24.77,lng:141.32,alt:0.025,conflict:"Segunda Guerra Mundial · Guerra do Pacífico (Operação Detachment)",
 place:"Ilha de Iwo Jima, Ilhas Vulcano (Japão)",
 a:{name:"Estados Unidos",who:"V Corpo Anfíbio (3ª, 4ª e 5ª Divisões de Fuzileiros)",cmd:"Alm. Raymond Spruance; Gen. Holland Smith; Gen. Harry Schmidt",force:"Cerca de 70 mil fuzileiros",loss:"Cerca de 26 mil baixas, com cerca de 6.800 mortos"},
 b:{name:"Japão",who:"Guarnição da ilha",cmd:"Gen. Tadamichi Kuribayashi",force:"Cerca de 21 mil homens em túneis e casamatas",loss:"Quase toda a guarnição morta; poucas centenas de prisioneiros"},
 winner:"a",result:"Vitória americana ao custo mais alto da história do USMC. As pistas da ilha serviram de pouso de emergência para bombardeiros, salvando milhares de tripulantes.",
 units:[
  {id:"tf",side:"a",label:"Força-tarefa naval",track:[[24.70,141.40],[24.72,141.36],[24.73,141.35],[24.73,141.35],[24.73,141.36]]},
  {id:"m5",side:"a",label:"5ª Div. Fuzileiros",track:[[24.74,141.33],[24.74,141.33],[24.752,141.30],[24.752,141.29],[24.80,141.31]]},
  {id:"m4",side:"a",label:"4ª Div. Fuzileiros",track:[[24.745,141.335],[24.745,141.335],[24.762,141.31],[24.775,141.31],[24.80,141.33]]},
  {id:"jp",side:"b",label:"Defesa de Kuribayashi",fixed:true,track:[[24.785,141.32],[24.785,141.32],[24.785,141.32],[24.785,141.32],[24.785,141.32]],sunk:4},
  {id:"sur",side:"b",label:"Monte Suribachi",fixed:true,track:[[24.751,141.289],[24.751,141.289],[24.751,141.289],[24.751,141.289],[24.751,141.289]],sunk:3}
 ],
 phases:[
  {t:"Bombardeio preparatório",h:"16–18 FEV",p:"Três dias de bombardeio naval e aéreo. Como os japoneses estavam enterrados em túneis, o efeito sobre a defesa foi pequeno.",rings:[[24.78,141.32],[24.751,141.289]]},
  {t:"Desembarque",h:"19 FEV · 09h00",p:"Fuzileiros desembarcam na costa sudeste. A areia vulcânica solta prende veículos e homens. Kuribayashi espera a praia lotar para abrir fogo.",rings:[[24.76,141.31]]},
  {t:"A ilha é cortada",h:"19 FEV",p:"No primeiro dia, os fuzileiros atravessam a parte mais estreita da ilha e isolam o Monte Suribachi do resto da defesa."},
  {t:"Suribachi",h:"23 FEV",p:"O 28º Regimento de Fuzileiros chega ao topo do Monte Suribachi e hasteia a bandeira, na cena da foto mais famosa da guerra.",rings:[[24.751,141.289]]},
  {t:"Avanço ao norte",h:"Fev–26 MAR",p:"Semanas de combate casamata por casamata no norte da ilha. A resistência organizada termina em 26 de março."}
 ],
 lessons:[
  {t:"Bombardeio não substitui a infantaria",d:"Defesas enterradas sobreviveram ao fogo preparatório. Avaliar o efeito real do bombardeio é parte do planejamento."},
  {t:"Conheça o terreno da praia",d:"A areia vulcânica não estava prevista nos planos de movimento. Reconhecimento hidrográfico e de praia evita surpresas."},
  {t:"Defesa em profundidade",d:"Kuribayashi abriu mão de defender a praia e lutou no interior. O atacante deve planejar para uma defesa que não está onde se espera."}
 ],
 fn:"Iwo Jima é uma batalha do Corpo de Fuzileiros dos EUA: três divisões de fuzileiros executaram o assalto e o combate em terra. Um terço de todas as Medalhas de Honra dadas a fuzileiros na Segunda Guerra veio desta batalha. A frase do Almirante Nimitz sobre os fuzileiros em Iwo Jima, de que o valor incomum era uma virtude comum, resume o caráter da luta.",
 quiz:[
  {q:"Por que o bombardeio preparatório teve pouco efeito?",o:["Durou pouco","Os japoneses estavam em túneis e casamatas","Usou munição errada","O tempo estava ruim"],c:1},
  {q:"Em que dia a bandeira foi hasteada no Suribachi?",o:["19 de fevereiro","23 de fevereiro","1º de março","26 de março"],c:1},
  {q:"Quem comandou a defesa japonesa?",o:["Isoroku Yamamoto","Tadamichi Kuribayashi","Takeo Kurita","Hideki Tojo"],c:1}
 ]},
{id:"inchon",name:"Inchon",year:1950,dtg:"15 SET 1950",tags:["world","amph"],era:"Operações anfíbias",
 lat:37.47,lng:126.70,alt:0.12,conflict:"Guerra da Coreia (Operação Chromite)",
 place:"Porto de Incheon e ilha de Wolmido, Coreia do Sul",
 a:{name:"Nações Unidas",who:"X Corpo dos EUA (1ª Div. de Fuzileiros e 7ª Div. de Infantaria) com forças sul-coreanas",cmd:"Gen. Douglas MacArthur; Gen. Edward Almond; Gen. Oliver P. Smith (fuzileiros)",force:"Cerca de 75 mil homens e mais de 200 navios",loss:"Cerca de 3.500 baixas até a retomada de Seul"},
 b:{name:"Coreia do Norte",who:"Exército Popular da Coreia",cmd:"Guarnição de Incheon",force:"Poucos milhares de homens na área",loss:"Guarnição destruída; cerca de 35 mil baixas na campanha"},
 winner:"a",result:"Vitória decisiva das Nações Unidas. Seul foi retomada em poucos dias e o exército norte-coreano, cercado no sul, desmoronou.",
 units:[
  {id:"flt",side:"a",label:"Força anfíbia (Struble)",track:[[37.30,126.40],[37.44,126.56],[37.46,126.58],[37.46,126.58],[37.46,126.58]]},
  {id:"mar",side:"a",label:"1ª Div. de Fuzileiros",track:[[37.32,126.42],[37.47,126.595],[37.48,126.62],[37.53,126.75],[37.57,126.98]]},
  {id:"kpa",side:"b",label:"Guarnição norte-coreana",fixed:true,track:[[37.475,126.63],[37.475,126.63],[37.475,126.63],[37.475,126.63],[37.475,126.63]],sunk:2}
 ],
 phases:[
  {t:"Um alvo considerado impossível",h:"Planejamento",p:"Marés de quase 10 metros, canal estreito e muralhas no cais faziam de Incheon um péssimo lugar para desembarcar. Por isso mesmo, o inimigo não o esperava."},
  {t:"Wolmido",h:"15 SET · maré da manhã",p:"Um batalhão de fuzileiros toma a ilha de Wolmido, que controla o porto, aproveitando a maré cheia da manhã.",rings:[[37.475,126.598]]},
  {t:"Red e Blue Beach",h:"15 SET · maré da tarde",p:"Na maré cheia seguinte, fuzileiros escalam a muralha do cais com escadas em Red Beach e desembarcam em Blue Beach, ao sul.",rings:[[37.48,126.62],[37.44,126.64]]},
  {t:"Aeroporto de Gimpo",h:"17–18 SET",p:"Os fuzileiros avançam e tomam o aeroporto de Gimpo, que passa a receber aviões aliados."},
  {t:"Retomada de Seul",h:"25–28 SET",p:"Depois de combates de rua, Seul é retomada. As linhas de abastecimento do exército norte-coreano no sul ficam cortadas."}
 ],
 lessons:[
  {t:"Atacar onde o inimigo não espera",d:"As dificuldades de Incheon garantiram a surpresa. Um risco calculado pode render resultado estratégico."},
  {t:"Hidrografia comanda o horário",d:"O ataque teve de seguir duas janelas de maré no mesmo dia. Sem dados precisos de maré, a operação seria impossível."},
  {t:"Manobra pelo mar",d:"Desembarcar atrás das linhas inimigas cortou seu abastecimento e desfez a ofensiva norte-coreana sem enfrentá-la de frente."}
 ],
 fn:"A 1ª Divisão de Fuzileiros dos EUA executou o assalto. A escalada da muralha de Red Beach com escadas, sob fogo, virou exemplo clássico de desembarque contra área urbana. Incheon também mostrou o valor de uma força anfíbia pronta: poucas semanas depois de ser reunida, a divisão fez um dos desembarques mais difíceis da história.",
 quiz:[
  {q:"Qual característica de Incheon tornava o desembarque tão difícil?",o:["Águas muito profundas","Marés de quase 10 metros e muralhas no cais","Gelo no porto","Falta de praias"],c:1},
  {q:"Qual objetivo foi tomado primeiro, na maré da manhã?",o:["Seul","A ilha de Wolmido","O aeroporto de Gimpo","Red Beach"],c:1},
  {q:"Qual foi o efeito estratégico do desembarque?",o:["Abriu uma nova frente no norte","Cortou o abastecimento do exército norte-coreano no sul","Encerrou a guerra","Destruiu a marinha norte-coreana"],c:1}
 ]}
];
