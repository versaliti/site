(function () {
  "use strict";

  // Bootstrap modal
  const aiFab = document.getElementById("aiFab");
  const aiModalEl = document.getElementById("aiModal");
  const aiChat = document.getElementById("aiChat");
  const aiQuick = document.getElementById("aiQuickReplies");
  const aiForm = document.getElementById("aiForm");
  const aiInput = document.getElementById("aiInput");

  if (!aiFab || !aiModalEl || !aiChat || !aiQuick || !aiForm || !aiInput) return;

  const modal = new bootstrap.Modal(aiModalEl);

  // Estado do fluxo
  const state = {
    step: "welcome",
    profile: null,
    goal: null,
    urgency: null,
    budget: null,
    lead: { name: null, whatsapp: null, email: null, message: null },
  };

  const GOALS = [
    "Criar um site / landing page",
    "Melhorar um site existente",
    "Aumentar vendas e leads",
    "Melhorar presença no Google (SEO)",
    "Organizar marca e identidade (branding)",
    "Automatizar processos / integrações",
    "Entender qual serviço contratar (não sei por onde começar)",
  ];

  const PROFILES = ["Empresa", "Profissional liberal", "E-commerce", "Estou validando uma ideia"];
  const URGENCY = ["Urgente (até 15 dias)", "Em 30 dias", "Em 60–90 dias", "Sem pressa, quero fazer bem feito"];
  const BUDGET = ["Básico", "Intermediário", "Premium", "Ainda não defini"];

  function scrollToBottom() {
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  function addMsg(role, text) {
    const wrap = document.createElement("div");
    wrap.className = `ai-msg ${role}`;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    wrap.appendChild(bubble);
    aiChat.appendChild(wrap);
    scrollToBottom();
  }

  function setQuickReplies(options, onPick) {
    aiQuick.innerHTML = "";
    options.forEach((label) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", () => onPick(label));
      aiQuick.appendChild(btn);
    });
  }

  function clearQuickReplies() {
    aiQuick.innerHTML = "";
  }

  function recommendService() {
    const { profile, goal, urgency } = state;

    // Regra principal
    let primary = "Consultoria Estratégica";
    let secondary = null;
    let why = "assim alinhamos prioridades, escopo e o melhor plano de ação com foco em resultado.";

    if (goal === "Criar um site / landing page") {
      primary = "Criação de Sites / Plataformas Digitais";
      why = "porque você precisa de uma base digital moderna, responsiva e pronta para converter.";
      secondary = "SEO";
    } else if (goal === "Melhorar um site existente") {
      primary = "Otimização de Performance";
      why = "porque melhorar velocidade, UX e estrutura aumenta conversão e fortalece seu posicionamento.";
      secondary = "SEO (técnico)";
    } else if (goal === "Aumentar vendas e leads") {
      primary = "Estratégias de Marketing";
      why = "para criar um funil claro de aquisição e converter visitas em leads com previsibilidade.";
      secondary = "Landing Page + Integrações";
    } else if (goal === "Melhorar presença no Google (SEO)") {
      primary = "SEO";
      why = "para aumentar visibilidade e atrair tráfego qualificado com consistência.";
      secondary = "Otimização de Performance";
    } else if (goal === "Organizar marca e identidade (branding)") {
      primary = "Branding Criativo";
      why = "para criar uma identidade forte, coerente e memorável para o seu público.";
      secondary = "Website Institucional";
    } else if (goal === "Automatizar processos / integrações") {
      primary = "Integrações & APIs";
      why = "para conectar ferramentas e reduzir trabalho manual com automação inteligente.";
      secondary = "Plataformas Digitais";
    }

    // Ajustes por perfil (leve)
    let nuance = "";
    if (profile === "E-commerce") nuance = " Para e-commerce, normalmente olhamos conversão, checkout e integração com ferramentas.";
    if (profile === "Profissional liberal") nuance = " Para profissional liberal, o foco costuma ser autoridade + captação de contatos.";
    if (profile === "Empresa") nuance = " Para empresas, equilibramos performance, posicionamento e geração de demanda.";
    if (profile === "Estou validando uma ideia") nuance = " Se você está validando uma ideia, dá pra começar enxuto e evoluir por etapas.";

    // Ajuste por urgência (só comunicação)
    let timing = "";
    if (urgency && urgency.includes("Urgente")) timing = " Como você tem urgência, o ideal é fecharmos um escopo objetivo (MVP) primeiro.";

    return { primary, secondary, why, nuance, timing };
  }

  function askProfile() {
    state.step = "ask_profile";
    addMsg("bot", "Pra eu te direcionar melhor: qual é o seu perfil?");
    setQuickReplies(PROFILES, (pick) => {
      state.profile = pick;
      addMsg("user", pick);
      askGoal();
    });
  }

  function askGoal() {
    state.step = "ask_goal";
    addMsg("bot", "Perfeito. E hoje você está buscando mais o quê?");
    setQuickReplies(GOALS, (pick) => {
      state.goal = pick;
      addMsg("user", pick);
      askUrgency();
    });
  }

  function askUrgency() {
    state.step = "ask_urgency";
    addMsg("bot", "Tem alguma urgência ou prazo ideal?");
    setQuickReplies(URGENCY, (pick) => {
      state.urgency = pick;
      addMsg("user", pick);
      askBudget();
    });
  }

  function askBudget() {
    state.step = "ask_budget";
    addMsg("bot", "Pra eu orientar melhor, seu investimento está mais para qual faixa? (Pode ser aproximado.)");
    setQuickReplies(BUDGET, (pick) => {
      state.budget = pick;
      addMsg("user", pick);
      showRecommendation();
    });
  }

  function showRecommendation() {
    clearQuickReplies();
    const { primary, secondary, why, nuance, timing } = recommendService();

    let msg = `Com base no que você me contou, eu recomendo começar por: ${primary}.`;
    msg += `\nMotivo: ${why}`;
    if (secondary) msg += `\nComplemento comum: ${secondary}.`;
    if (nuance) msg += `\n${nuance}`;
    if (timing) msg += `\n${timing}`;

    addMsg("bot", msg);

    // Handoff
    addMsg("bot", "Quer que eu encaminhe isso para um especialista da Versaliti continuar com você?");
    setQuickReplies(["Sim, quero orçamento/contato", "Só tirando dúvidas por enquanto"], (pick) => {
      addMsg("user", pick);
      if (pick.startsWith("Sim")) {
        clearQuickReplies();
        state.step = "lead_name";
        addMsg("bot", "Show! Qual seu nome?");
      } else {
        clearQuickReplies();
        state.step = "free_questions";
        addMsg("bot", "Perfeito. Me diga sua dúvida e eu te respondo por aqui. 😊");
      }
    });
  }

  function resetChat() {
    aiChat.innerHTML = "";
    clearQuickReplies();
    state.step = "welcome";
    state.profile = null;
    state.goal = null;
    state.urgency = null;
    state.budget = null;
    state.lead = { name: null, whatsapp: null, email: null, message: null };

    addMsg("bot", "Oi! Eu sou o Assistente Inteligente da Versaliti. Posso te ajudar a entender nossos serviços, indicar a melhor solução e agilizar seu atendimento.");
    askProfile();
  }

  // Tratamento do input livre conforme etapa
  function handleUserText(text) {
    const t = text.trim();
    if (!t) return;

    addMsg("user", t);

    if (state.step === "lead_name") {
      state.lead.name = t;
      state.step = "lead_whatsapp";
      addMsg("bot", `Prazer, ${state.lead.name}! Qual seu WhatsApp?`);
      return;
    }

    if (state.step === "lead_whatsapp") {
      state.lead.whatsapp = t;
      state.step = "lead_email";
      addMsg("bot", "E seu e-mail?");
      return;
    }

    if (state.step === "lead_email") {
      state.lead.email = t;
      state.step = "lead_message";
      addMsg("bot", "Quer deixar uma mensagem rápida com detalhes do que você precisa? (Opcional)");
      return;
    }

    if (state.step === "lead_message") {
      state.lead.message = t;

      const waNumber = "5511941247618"; // Versaliti (do site)
      const summary =
        `Olá! Vim pelo site da Versaliti e gostaria de atendimento.

          *Resumo do meu pedido*
          • Nome: ${state.lead.name || "-"}
          • Perfil: ${state.profile || "-"}
          • Objetivo: ${state.goal || "-"}
          • Prazo: ${state.urgency || "-"}
          • Investimento: ${state.budget || "-"}
          • WhatsApp: ${state.lead.whatsapp || "-"}
          • E-mail: ${state.lead.email || "-"}

        *Detalhes*
        ${state.lead.message || "-"}

        (Enviado pelo Assistente do site)`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(summary)}`;

        state.step = "done";
        addMsg("bot", "Perfeito! Preparei um resumo e vou te encaminhar para o WhatsApp da Versaliti agora. ✅");
        addMsg("bot", "Se não abrir automaticamente, toque no botão abaixo:");

        // Botão de ação
        clearQuickReplies();
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Abrir WhatsApp com resumo";
        btn.addEventListener("click", () => window.open(waUrl, "_blank", "noopener,noreferrer"));
        aiQuick.appendChild(btn);

        // Abre automaticamente (bom para desktop; no mobile pode pedir confirmação)
        window.open(waUrl, "_blank", "noopener,noreferrer");

        return;
    }


    // Perguntas livres (sem IA ainda)
    if (state.step === "free_questions") {
      addMsg(
        "bot",
        "Entendi. No MVP eu consigo te orientar pelo nosso fluxo e te encaminhar para um especialista. Se você quiser, me diga: seu perfil e objetivo (ex: Empresa + aumentar leads) que eu te indico o caminho."
      );
      return;
    }

    // fallback
    addMsg("bot", "Me diz rapidinho: qual seu perfil e seu objetivo principal? Assim eu te direciono certinho.");
    askProfile();
  }

  // Abertura
  aiFab.addEventListener("click", () => {
    modal.show();
    // reinicia sempre que abrir (pode mudar para manter histórico se quiser)
    resetChat();
  });

  // Envio do input
  aiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = aiInput.value;
    aiInput.value = "";
    handleUserText(text);
  });

})();