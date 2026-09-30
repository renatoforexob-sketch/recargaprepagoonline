import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const operators = [
  { slug: 'algar', name: 'Algar' },
  { slug: 'claro', name: 'Claro' },
  { slug: 'correios', name: 'Correios Celular' },
  { slug: 'surf', name: 'Surf Telecom' },
  { slug: 'tim', name: 'TIM' },
  { slug: 'vivo', name: 'Vivo' },
];
const checklist = [
  'Confirme o número com DDD que vai receber a recarga.',
  'Confirme a operadora da linha. Se o número foi portado, a operadora atual pode ser outra.',
  'Veja o valor final antes de pagar e se há taxa de serviço.',
  'Anote a validade do crédito e as condições de qualquer bônus, direto na operadora.',
  'Guarde o comprovante até o crédito aparecer na linha.',
];
const scams = [
  'Nenhum canal legítimo pede senha do banco, código recebido por SMS ou token.',
  'Desconfie de bônus muito acima do normal e de promoções com pressa para pagar.',
  'Confira o endereço do site e quem é o responsável pela empresa (razão social e CNPJ).',
  'Se pagou e o crédito não chegou, guarde o comprovante e contate o canal onde pagou e a operadora.',
];
const articles = [
  { slug: 'como-identificar-golpes-de-recarga', title: 'Como identificar golpes de recarga', intro: 'Golpes com recarga de celular seguem padrões repetidos. Conhecê-los ajuda a parar antes de pagar.', sections: [
    ['Sinais de alerta', ['Promessa de bônus ou desconto muito acima do normal, com prazo curto para aproveitar.', 'Link recebido por WhatsApp, SMS ou redes sociais levando a um site que você não conhece.', 'Pedido de pagamento para "liberar" um prêmio, bônus ou crédito.', 'Pedido de código recebido por SMS, senha ou token, que nenhum canal legítimo solicita.', 'Site sem razão social, CNPJ, endereço ou contato claros.']],
    ['O que fazer antes de pagar', ['Abra o aplicativo oficial da operadora por conta própria, sem usar o link recebido.', 'Pesquise o nome da empresa e o CNPJ e veja se existem reclamações.', 'Desconfie de urgência. Golpes dependem de decisão rápida.']],
    ['Se caiu em um golpe', ['Guarde comprovantes, conversas e o endereço do site.', 'Avise seu banco o quanto antes.', 'Registre boletim de ocorrência e reclamação em consumidor.gov.br.']],
  ]},
  { slug: 'saldo-e-validade-do-credito', title: 'Saldo e validade do crédito pré-pago', intro: 'Saber quanto você tem e até quando vale evita perder crédito sem perceber.', sections: [
    ['Como consultar', ['Pelo aplicativo oficial da sua operadora.', 'Pelo atendimento oficial da operadora, seguindo as instruções dela.', 'Formas e códigos de consulta variam por operadora e podem mudar, então confirme sempre na fonte oficial.']],
    ['O que conferir', ['A data de validade do crédito e o que acontece quando ela vence.', 'Se há regras diferentes para crédito e para pacotes de dados.', 'Se a linha precisa de recarga periódica para continuar ativa.']],
  ]},
  { slug: 'portabilidade-e-recarga', title: 'Portabilidade e recarga: confira a operadora', intro: 'Quem mudou de operadora mantendo o número pode recarregar na operadora errada se não conferir.', sections: [
    ['Por que isso importa', ['Com a portabilidade, o número permanece, mas a operadora da linha muda.', 'Recarregar pelo canal de outra operadora pode não creditar o valor na sua linha.']],
    ['Como conferir', ['Veja a operadora atual no seu aplicativo, fatura, contrato ou chip.', 'Em dúvida, pergunte ao atendimento da operadora que você acredita ser a atual.', 'Confirme o número com DDD antes de qualquer pagamento.']],
  ]},
  { slug: 'glossario-de-recarga-pre-paga', title: 'Glossário da recarga pré-paga', intro: 'Termos que aparecem ao recarregar e o que significam, em linguagem simples.', sections: [
    ['Termos', ['Pré-pago: você paga antes de usar, com créditos adicionados à linha.', 'Controle: plano com valor mensal fixo e limite de uso, em geral com pagamento antes do consumo.', 'Pós-pago: uso mensal cobrado depois, por fatura.', 'Crédito: valor disponível na linha para uso em serviços.', 'Validade: prazo em que o crédito ou pacote pode ser usado.', 'Bônus: benefício extra definido pela operadora, com regras próprias de valor e prazo.', 'Portabilidade: troca de operadora mantendo o número.', 'DDD: código de área do telefone, necessário para identificar a linha.']],
  ]},
];

const homeFaqs = [
  ['Este site faz a recarga?', 'Não. É um guia de consulta. Não vendemos recargas, não recebemos pagamentos e não pedimos o seu número de telefone.'],
  ['Vocês são a operadora ou têm vínculo com ela?', 'Não. O site é independente e não tem parceria, vínculo ou aprovação de nenhuma operadora. Os nomes são citados só para identificar o assunto.'],
  ['Onde eu recarrego, então?', 'Em canais oficiais da sua operadora ou em estabelecimentos e serviços que ela indique. Consulte o aplicativo ou o atendimento oficial para ver as opções atuais.'],
  ['Preciso criar conta?', 'Não. O guia é aberto e não tem cadastro.'],
  ['Os valores e bônus mudam?', 'Sim. Preços, bônus e validades são definidos pelas operadoras e mudam a qualquer momento. Confirme sempre na fonte oficial.'],
];

const path = () => window.location.pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/';
function go(to) { window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }
const toOperators = () => {
  const jump = () => document.getElementById('operadoras')?.scrollIntoView({ behavior: 'smooth' });
  if (path() === '/') jump(); else { go('/'); setTimeout(jump, 60); }
};

function Header() {
  return <header className="topbar">
    <button className="brand" onClick={() => go('/')}><span className="brand-mark">↗</span><span>Guia da <b>Recarga</b></span></button>
    <nav><a href="/#operadoras" onClick={e => { e.preventDefault(); toOperators(); }}>Operadoras</a><a href="/#guias" onClick={e => { e.preventDefault(); go('/'); setTimeout(() => document.getElementById('guias')?.scrollIntoView({ behavior: 'smooth' }), 60); }}>Guias</a><a href="/#duvidas" onClick={e => { e.preventDefault(); go('/'); setTimeout(() => document.getElementById('duvidas')?.scrollIntoView({ behavior: 'smooth' }), 60); }}>Dúvidas</a></nav>
    <button className="header-cta" onClick={toOperators}>Ver operadoras <span>→</span></button>
  </header>;
}

function Notice() {
  return <div className="indep-notice" role="note"><strong>Site informativo e independente.</strong> Não vendemos recargas, não recebemos pagamentos e não temos vínculo com nenhuma operadora de telefonia.</div>;
}

function Footer() {
  return <footer>
    <div>
      <strong>Guia da Recarga</strong>
      <p>Guia gratuito de consulta sobre recarga de celular pré-pago.</p>
      <p>Não vende recargas e não recebe pagamentos.</p>
    </div>
    <div>
      <strong>Atalhos</strong>
      <a href="/#operadoras" onClick={e => { e.preventDefault(); toOperators(); }}>Escolher operadora</a>
      {articles.map(a => <a key={a.slug} href={`/${a.slug}`} onClick={e => { e.preventDefault(); go(`/${a.slug}`); }}>{a.title}</a>)}
    </div>
    <div>
      <strong>Responsável pelo site</strong>
      <p>SYGMA SOLUCOES LTDA</p>
      <p>CNPJ: 30.061.720/0001-28</p>
      <p>R. Marconi, 107, sala 702 — República<br />São Paulo/SP — CEP 01047-000</p>
      <a href="mailto:atendimento@sygmasolucoes.com.br">atendimento@sygmasolucoes.com.br</a>
      <a href="tel:+551120739875">(11) 2073-9875</a>
    </div>
    <div className="footer-legal">
      <a href="/termos-de-uso.html">Termos de Uso</a>
      <a href="/politica-de-privacidade.html">Política de Privacidade</a>
      <small>Marcas e nomes de operadoras pertencem aos respectivos titulares. Citá-los não indica parceria, afiliação ou aprovação.</small>
    </div>
    <small>© {new Date().getFullYear()} Guia da Recarga. Site independente, sem vínculo com operadoras.</small>
  </footer>;
}

function Faq({ items }) {
  const [open, setOpen] = useState(null);
  return items.map(([q, a], i) => <div className={`faq-row ${open === i ? 'open' : ''}`} key={q}>
    <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}><span>{q}</span><b>{open === i ? '−' : '+'}</b></button>
    {open === i && <p>{a}</p>}
  </div>);
}

function Home() {
  return <>
    <Header /><Notice />
    <main className="home home-new" style={{ '--operator': '#10223a' }}>
      <section className="top-banner">
        <div className="home-banner home-banner-top text-banner">
          <span className="eyebrow">GUIA DE CONSULTA SOBRE RECARGA PRÉ-PAGA</span>
          <h1>Confira os dados antes de recarregar seu celular pré-pago.</h1>
          <p>Veja o que verificar antes de pagar, como reconhecer golpes e onde procurar os canais oficiais de cada operadora. Este site não faz recargas.</p>
          <button className="banner-cta" onClick={toOperators}>Ver operadoras <span>→</span></button>
        </div>
      </section>

      <section id="operadoras" className="operators-section home-operators">
        <div className="section-heading">
          <div><span className="eyebrow">ESCOLHA UMA OPÇÃO</span><h2>Qual é a sua operadora?</h2></div>
          <p>Selecione a operadora e veja o guia<br />com orientações gerais.</p>
        </div>
        <div className="operator-grid">
          {operators.map(op => <button className="operator-card" key={op.slug} onClick={() => go(`/guia-${op.slug}`)}>
            <span className="operator-logo letter-badge" aria-hidden="true">{op.name[0]}</span>
            <span><strong>{op.name}</strong></span>
            <b className="arrow">↗</b>
          </button>)}
        </div>
      </section>

      <section className="content-section why-section">
        <div className="content-heading">
          <span className="eyebrow">CONSULTA GRATUITA E SEM CADASTRO</span>
          <h2>Por que usar o Guia da Recarga?</h2>
        </div>
        <div className="feature-list">
          {['Informação gratuita, sem cadastro.', 'Não pedimos o seu número de telefone.', 'Não vendemos recargas nem recebemos pagamentos.', 'Checklist para conferir operadora, número e validade.', 'Alertas sobre golpes comuns de recarga.', 'Aviso claro de que o site é independente das operadoras.', 'Orientação sobre onde reclamar: Anatel e consumidor.gov.br.'].map(t => <div key={t}><span>✓</span><strong>{t}</strong></div>)}
        </div>
      </section>

      <section id="como-funciona" className="content-section info-section">
        <div className="content-heading centered-heading">
          <span className="eyebrow">COMO USAR O GUIA</span>
          <h2>Três passos antes de recarregar.</h2>
        </div>
        <div className="info-cards">
          <article><span className="info-number">01</span><h3>Identifique a operadora</h3><p>Confirme a operadora atual da linha. Quem fez portabilidade mantém o número, mas a operadora muda.</p></article>
          <article><span className="info-number">02</span><h3>Confira o checklist</h3><p>Número com DDD, valor final, taxas, validade do crédito e condições de qualquer bônus, direto na operadora.</p></article>
          <article><span className="info-number">03</span><h3>Use um canal oficial</h3><p>Recarregue pelo aplicativo ou atendimento oficial da sua operadora, ou por serviços que ela indique.</p></article>
        </div>
      </section>

      <section id="guias" className="content-section everything-section">
        <div className="content-heading">
          <span className="eyebrow">GUIAS E ARTIGOS</span>
          <h2>Informação sobre recarga pré-paga.</h2>
        </div>
        <div className="article-grid">
          {articles.map(a => <article key={a.slug}><h3>{a.title}</h3><p>{a.intro}</p><a className="read-link" href={`/${a.slug}`} onClick={e => { e.preventDefault(); go(`/${a.slug}`); }}>Ler o guia →</a></article>)}
        </div>
      </section>

      <section id="duvidas" className="faq home-faq">
        <span className="eyebrow">PERGUNTAS FREQUENTES</span>
        <h2>Perguntas frequentes sobre este guia</h2>
        <Faq items={homeFaqs} />
      </section>
    </main>
    <Footer />
  </>;
}

function OperatorPage({ op }) {
  const faqs = [
    ['Este guia faz recargas da ' + op.name + '?', 'Não. Ele só informa. Para recarregar, use os canais oficiais da ' + op.name + '.'],
    ['Preciso informar meu número aqui?', 'Não. O site não pede número de telefone nem dados pessoais.'],
    ['Onde vejo valores e bônus atuais?', 'Direto na ' + op.name + '. Ofertas mudam e este guia não as lista.'],
  ];
  return <>
    <Header /><Notice />
    <main className="recharge-page operator-modern" style={{ '--operator': '#10223a' }}>
      <section className="top-banner">
        <div className="home-banner home-banner-top text-banner">
          <span className="eyebrow">GUIA INFORMATIVO</span>
          <h1>Recarga pré-paga {op.name}: o que conferir antes de pagar.</h1>
          <p>Orientações gerais para linhas pré-pagas {op.name}. Este guia não faz recargas e não substitui os canais oficiais da operadora.</p>
        </div>
      </section>
      <div className="operator-main-card">
        <div className="operator-intro">
          <div className="operator-logo-large"><span className="letter-badge large" aria-hidden="true">{op.name[0]}</span></div>
          <h1>Guia {op.name}</h1>
          <button type="button" className="change-operator" onClick={() => go('/')}>Não é {op.name}? <strong>Trocar operadora</strong></button>
          <p>Informações gerais para consulta. Confirme sempre detalhes e ofertas na {op.name}.</p>
        </div>
        <div className="operator-form-section">
          <div className="operator-step-title"><span>1</span><div><strong>Confira a sua linha</strong><small>Antes de qualquer pagamento.</small></div></div>
          <ul className="info-list">{checklist.map(t => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="operator-form-section">
          <div className="operator-step-title"><span>2</span><div><strong>Use canais oficiais</strong><small>Onde recarregar.</small></div></div>
          <p className="info-text">Recarregue apenas por canais oficiais da {op.name} ou estabelecimentos e serviços que ela indique. O caminho mais seguro é abrir o aplicativo ou o atendimento oficial da própria operadora e ver as formas de recarga disponíveis para o seu número. Valores, bônus e validade são definidos pela {op.name} e mudam; por isso não são listados aqui.</p>
        </div>
        <div className="operator-form-section">
          <div className="operator-step-title"><span>3</span><div><strong>Se algo der errado</strong><small>Como agir.</small></div></div>
          <ul className="info-list">
            <li>Guarde o comprovante, a data e o valor pago.</li>
            <li>Fale primeiro com o canal onde pagou e com o atendimento da {op.name}.</li>
            <li>Sem solução, registre reclamação na Anatel (telefone 1331) ou em consumidor.gov.br.</li>
          </ul>
        </div>
      </div>
      <section className="operator-trust-row">
        <div><b>Somos independentes</b><span>Não representamos as operadoras de telefonia.</span></div>
        <div><b>Sem pagamento</b><span>O site não vende recargas nem recebe pagamentos.</span></div>
        <div><b>Contato</b><span>atendimento@sygmasolucoes.com.br</span></div>
      </section>
      <section id="duvidas" className="faq operator-faq">
        <span className="eyebrow">DÚVIDAS FREQUENTES</span>
        <h2>Sobre o guia {op.name}.</h2>
        <Faq items={faqs} />
      </section>
    </main>
    <Footer />
  </>;
}

function ArticlePage({ a }) {
  return <>
    <Header /><Notice />
    <main className="recharge-page article-page" style={{ '--operator': '#10223a' }}>
      <button className="back" onClick={() => go('/')}>← Voltar ao início</button>
      <article className="article-card">
        <span className="eyebrow">GUIA</span>
        <h1>{a.title}</h1>
        <p className="article-lead">{a.intro}</p>
        {a.sections.map(([h, items]) => <section key={h}><h2>{h}</h2><ul className="info-list">{items.map(t => <li key={t}>{t}</li>)}</ul></section>)}
        <p className="article-note">Conteúdo informativo e geral, sem vínculo com operadoras. Regras e ofertas mudam; confirme na fonte oficial. Atualizado em 30/09/2026.</p>
      </article>
    </main>
    <Footer />
  </>;
}

function App() {
  const [, refresh] = useState(0);
  useEffect(() => { const fn = () => refresh(x => x + 1); window.addEventListener('popstate', fn); return () => window.removeEventListener('popstate', fn); }, []);
  const p = path();
  if (p === '/') return <Home />;
  const art = articles.find(a => p === `/${a.slug}`);
  if (art) return <ArticlePage a={art} />;
  const op = operators.find(o => p === `/guia-${o.slug}`);
  if (op) return <OperatorPage op={op} />;
  return <><Header /><Notice /><main className="recharge-page article-page"><article className="article-card"><h1>Página não encontrada</h1><button className="secondary" onClick={() => go('/')}>Voltar ao início</button></article></main><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
