// Colega.IA - Ellie, a assistente flutuante da página (respostas SIMULADAS).
(function(){
 const panel=document.getElementById('chatPanel'), launch=document.getElementById('chatLauncher');
 const body=document.getElementById('ellieChatBody'), form=document.getElementById('ellieChatForm'), input=document.getElementById('ellieChatInput');
 function openChat(){panel.classList.add('open');panel.setAttribute('aria-hidden','false');launch.setAttribute('aria-expanded','true');input.focus();}
 function closeChat(){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');launch.setAttribute('aria-expanded','false');launch.focus();}
 launch.addEventListener('click',()=>panel.classList.contains('open')?closeChat():openChat());
 document.getElementById('chatClose').addEventListener('click',closeChat);
 function bubble(text,who){const el=document.createElement('div');el.className='chat-bubble'+(who==='user'?' user':'');el.textContent=text;if(who==='user'){el.style.marginLeft='auto';el.style.background='#e3f3e1';el.style.borderRadius='16px 16px 5px 16px';}body.appendChild(el);body.scrollTop=body.scrollHeight;}
 function answer(text){
   const t=text.toLowerCase();
   if(/atender|cliente|suporte|d[uú]vida/.test(t)) return 'Uma IA pode responder perguntas frequentes, explicar serviços e encaminhar casos para uma pessoa quando necessário. Podemos configurar as respostas com as informações da sua empresa.';
   if(/venda|vender|produto|comercial/.test(t)) return 'Podemos planejar uma assistente de vendas para apresentar produtos, tirar dúvidas e orientar o cliente. Integrações com estoque ou pedidos seriam uma etapa técnica separada.';
   if(/automat|agenda|agendamento|tarefa/.test(t)) return 'Podemos desenhar uma IA para organizar solicitações e ajudar com agendamentos. Para executar ações de verdade, ela precisará de integrações e permissões configuradas.';
   if(/preço|preco|valor|custa|plano/.test(t)) return 'Os planos ainda estão em estudo. A ideia é oferecer opções acessíveis, com limites claros de uso. Posso te ajudar a identificar o que sua empresa precisaria.';
   if(/personal|apar[eê]ncia|nome|voz/.test(t)) return 'A Ellie é a assistente da Colega.IA. Já a IA que criarmos para sua empresa pode ter nome, tom de voz, função e identidade visual próprios.';
   if(/humano|pessoa|atendente/.test(t)) return 'O encaminhamento para uma pessoa pode fazer parte do projeto. O canal de contato será definido quando a plataforma estiver pronta.';
   return 'Legal! A proposta da Colega.IA é criar uma assistente ajustada ao seu negócio. Me conta: ela ajudaria mais no atendimento, nas vendas ou na organização de tarefas?';
 }
 function send(text){text=text.trim();if(!text)return;bubble(text,'user');const choices=document.getElementById('ellieChoices');if(choices)choices.remove();window.setTimeout(()=>bubble(answer(text),'bot'),250);}
 document.getElementById('ellieChoices').addEventListener('click',e=>{const b=e.target.closest('button[data-reply]');if(b){send(b.dataset.reply);}});
 form.addEventListener('submit',e=>{e.preventDefault();send(input.value);input.value='';});
 const wave=document.getElementById('ellieWave');if(wave)wave.addEventListener('click',()=>{wave.innerHTML='Oi! <span>♡</span>';document.querySelector('.ellie-card-copy p').textContent='Que bom ter você aqui! Eu sou a Ellie, sua guia na Colega.IA.';});
 const present=document.getElementById('elliePresent');if(present)present.addEventListener('click',()=>{document.getElementById('demo').scrollIntoView({behavior:'smooth'});});
})();
