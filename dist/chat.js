// The browser talks only to our backend. No API key belongs in this file.
(() => {
  const widget=document.createElement('aside');
  widget.className='chat-widget';
  widget.innerHTML=`<button class="btn chat-launch" id="chat-launch" aria-expanded="false" aria-controls="chat-panel">✦ Tư vấn sản phẩm</button><section id="chat-panel" class="chat-panel" hidden aria-label="Tư vấn sản phẩm bằng AI"><div class="chat-heading"><div><strong>Tư vấn hương trầm</strong><small>Trợ lý AI · Gemini</small></div><button type="button" id="chat-close" aria-label="Đóng khung tư vấn">×</button></div><p class="chat-disclaimer">AI có thể trả lời chưa chính xác. Giá và sản phẩm hiện là dữ liệu mẫu. Câu hỏi được gửi đến Google Gemini; vui lòng không nhập thông tin cá nhân.</p><div class="chat-messages" id="chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div><div class="chat-suggestions"><button type="button">Có những loại trầm nào?</button><button type="button">Vòng trầm giá bao nhiêu?</button></div><form id="chat-form"><label for="chat-input">Câu hỏi của bạn</label><div class="chat-input-row"><textarea id="chat-input" rows="2" maxlength="1000" placeholder="Hỏi về sản phẩm, giá hoặc cách bảo quản…" required></textarea><button class="btn" id="chat-send" type="submit">Gửi</button></div><div id="chat-status" role="status"></div></form><div class="chat-bottom"><button type="button" id="chat-reset">Cuộc trò chuyện mới</button><a href="#/lien-he">Liên hệ cửa hàng →</a></div></section>`;
  document.body.append(widget);
  const select=id=>document.getElementById(id),panel=select('chat-panel'),launch=select('chat-launch'),input=select('chat-input'),send=select('chat-send'),status=select('chat-status'),messages=select('chat-messages');
  let history=[],busy=false;
  function bubble(text,role){const el=document.createElement('div');el.className='chat-message '+role;const label=document.createElement('small');label.textContent=role==='user'?'Bạn':'Trợ lý AI';const content=document.createElement('div');content.textContent=text;el.append(label,content);messages.append(el);messages.scrollTop=messages.scrollHeight;return el}
  function welcome(){messages.replaceChildren();bubble('Chào bạn! Tôi có thể giúp bạn khám phá vòng tay, nhang trầm, nụ trầm và trầm nguyên liệu trong danh mục mẫu. Bạn đang tìm sản phẩm nào?','model')}
  function open(value){panel.hidden=!value;launch.setAttribute('aria-expanded',String(value));if(value)input.focus();else launch.focus()}
  launch.addEventListener('click',()=>open(panel.hidden));select('chat-close').addEventListener('click',()=>open(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)open(false)});
  select('chat-reset').addEventListener('click',()=>{if(busy)return;history=[];welcome();status.textContent='';input.value='';input.focus()});
  widget.querySelectorAll('.chat-suggestions button').forEach(button=>button.addEventListener('click',()=>{if(busy)return;input.value=button.textContent;select('chat-form').requestSubmit()}));
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();if(!busy)select('chat-form').requestSubmit()}});
  select('chat-form').addEventListener('submit',async e=>{
    e.preventDefault();const text=input.value.trim();if(busy||!text)return;
    busy=true;send.disabled=true;input.disabled=true;select('chat-reset').disabled=true;status.textContent='Gemini đang trả lời…';status.className='';
    const userBubble=bubble(text,'user');input.value='';
    try {
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,history}),signal:AbortSignal.timeout(35000)});
      const result=await response.json();
      if(!response.ok||!result.answer)throw new Error(result.error||'AI chưa thể trả lời. Vui lòng thử lại.');
      bubble(result.answer,'model');history=[...history,{role:'user',text},{role:'model',text:result.answer}].slice(-8);status.textContent='';
    }catch(error){userBubble.remove();input.value=text;status.className='chat-error';status.textContent=error.name==='TimeoutError'?'Hết thời gian chờ. Vui lòng gửi lại câu hỏi.':error instanceof TypeError?'Không kết nối được máy chủ. Vui lòng thử lại.':error.message}
    finally{busy=false;send.disabled=false;input.disabled=false;select('chat-reset').disabled=false;if(!panel.hidden)input.focus()}
  });
  welcome();
})();
