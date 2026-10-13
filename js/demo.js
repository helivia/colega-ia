// Colega.IA - personalização do assistente e chat de demonstração (respostas SIMULADAS).
const FN={atendimento:["Atendimento ao cliente","Posso tirar dúvidas sobre os produtos e serviços da empresa."],vendas:["Vendas","Posso ajudar você a escolher e registrar seu interesse."],agenda:["Agendamentos","Posso ajudar você a reservar um horário."],interno:["Suporte interno","Posso ajudar a equipe com as dúvidas do dia a dia."]};
const TONE={amigavel:["Amigável","Oi! ","Como posso ajudar?"],formal:["Formal","Olá. ","Em que posso ser útil?"],descontraido:["Descontraído","E aí! ","Bora ver o que você precisa?"]};
const COLORS=[["#c8ff2e","Lima"],["#7c3aed","Violeta"],["#ff7a29","Laranja"],["#16a34a","Verde"],["#ec4899","Rosa"],["#0ea5e9","Azul"]];
const st={kind:"personagem",char:"robo",name:"Bia",fn:"atendimento",tone:"amigavel",color:"#c8ff2e"};
const $=s=>document.querySelector(s);

function group(key,items){
  return items.map((it,i)=>`<input type="radio" name="${key}" id="${key}${i}" value="${it[0]}"${st[key]===it[0]?" checked":""}><label for="${key}${i}">${it[2]?`<span class="sw" style="background:${it[2]}"></span>`:""}${it[1]}</label>`).join("");
}
function drawChars(){$("#g-char").innerHTML=group("char",Object.keys(CH).filter(k=>KIND[k]===st.kind).map(k=>[k,CH[k][0]]));}
$("#g-kind").innerHTML=group("kind",[["personagem","Personagem"],["pessoa","Pessoa virtual"]]);
drawChars();
$("#g-tone").innerHTML=group("tone",Object.entries(TONE).map(([k,v])=>[k,v[0]]));
$("#g-color").innerHTML=group("color",COLORS.map(c=>[c[0],c[1],c[0]]));

const chips=["Quais são os horários?","Quanto custa?","Quero falar com uma pessoa"];
$("#chips").innerHTML=chips.map(t=>`<button type="button">${t}</button>`).join("");

function render(){
  const svg=CH[st.char][1](st.color);
  // (corrigido) a linha que escrevia em #heroStage foi removida: esse elemento não existe mais no hero.
  $("#miniStage").innerHTML=svg;
  $("#pName").textContent=st.name;
  $("#pFn").textContent=FN[st.fn][0];
}
function add(who,text){
  // Cada mensagem recebe uma linha própria. A IA usa o personagem escolhido pelo cliente.
  const line=document.createElement("div");
  line.className="message-line "+(who==="bot"?"bot-line":"user-line");
  const d=document.createElement("div");
  d.className="msg "+who;
  const l=document.createElement("small");
  l.textContent=who==="bot"?st.name+" (simulado)":"Você";
  const p=document.createElement("span");
  p.textContent=text;
  d.append(l,p);
  if(who==="bot"){
    const avatar=document.createElement("div");
    avatar.className="msg-avatar";
    avatar.setAttribute("aria-label","Avatar de "+st.name);
    avatar.innerHTML=CH[st.char][1](st.color);
    line.append(avatar,d);
  }else{
    line.append(d);
  }
  $("#log").appendChild(line);
  $("#log").scrollTop=$("#log").scrollHeight;
  return d;
}
function greet(){
  $("#log").innerHTML="";
  const T=TONE[st.tone];
  add("bot",T[1]+"Eu sou "+st.name+". "+FN[st.fn][1]+" "+T[2]);
}
function reply(t){
  const x=t.toLowerCase(),T=TONE[st.tone][1];
  if(/humano|pessoa|atendente/.test(x))return T+"Claro, posso encaminhar você para uma pessoa da equipe. Na versão real, a empresa define como isso acontece.";
  if(/hor[aá]rio|agend|marcar|reserv/.test(x))return T+"Posso ajudar a marcar. Que dia e período ficam melhores? (Simulado: nada será agendado de verdade.)";
  if(/pre[cç]o|valor|quanto|custa/.test(x))return T+"Os valores dependem do serviço. Na versão real, eu consultaria as informações que a empresa cadastrou.";
  return T+"Entendi. Nesta demonstração eu só tenho respostas de exemplo. Na versão real, eu responderia com base nas informações da empresa.";
}
function send(text){
  text=text.trim().slice(0,200);
  if(!text)return;
  add("user",text);
  const w=add("bot","digitando...");
  setTimeout(()=>{w.closest(".message-line").remove();add("bot",reply(text));},600); // (corrigido) remove a linha inteira, inclusive o avatar
}
$("#cfg").addEventListener("input",e=>{
  const k=e.target.name;
  if(k==="name"){st.name=e.target.value.trim().slice(0,24)||"Assistente";render();document.querySelectorAll("#log .msg.bot small").forEach(el=>el.textContent=st.name+" (simulado)");return;}
  st[k]=e.target.value;
  if(k==="kind"){st.char=Object.keys(CH).find(c=>KIND[c]===st.kind);drawChars();}
  render();
  if(k!=="color")greet();
});
$("#chat").addEventListener("submit",()=>{send($("#msg").value);$("#msg").value="";});
$("#chips").addEventListener("click",e=>{if(e.target.tagName==="BUTTON")send(e.target.textContent);});
const dlg=$("#dlg");
function openDlg(t,p){$("#dlgT").textContent=t;$("#dlgP").textContent=p;dlg.showModal();}
$("#openAcc").onclick=()=>openDlg("Criar conta","O cadastro ainda não existe nesta versão. Ele entra numa etapa futura do projeto (usuários e login). Por enquanto, nada é coletado e nenhum dado seu é salvo.");
document.querySelectorAll(".talkIT").forEach(b=>b.onclick=()=>openDlg("Falar com um profissional de TI","O canal de contato ainda está sendo definido. Quando estiver pronto, você poderá conversar com uma pessoa da equipe para configurar o seu assistente. Nada é coletado nesta versão."));
$("#dlgX").onclick=()=>dlg.close();
render();greet();
