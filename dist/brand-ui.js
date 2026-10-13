// Geometric stroke icons, aligned with the new brand guideline.
(() => {
  const paths={leaf:'M20 4C11 3 4 7 4 14a6 6 0 0 0 6 6c7 0 11-7 10-16ZM4 20l10-10',menu:'M4 6h16M4 12h16M4 18h16',home:'m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8',grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',book:'M12 5v16M3 4c4-1 6 0 9 1 3-1 5-2 9-1v16c-4-1-6 0-9 1-3-1-5-2-9-1V4Z',guide:'M6 3h12v18H6zM9 7h6M9 11h6M9 15h4',contact:'M4 5h16v14H4zM4 6l8 7 8-7',chat:'M4 4h16v12H9l-5 4V4ZM8 8h8M8 12h5'};
  const icon=name=>`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"></path></svg>`;
  document.querySelector('.seal').innerHTML=icon('leaf');
  document.getElementById('menu').innerHTML=icon('menu');
  const names=['home','grid','book','guide','contact'];
  document.querySelectorAll('#navigation a').forEach((link,i)=>link.insertAdjacentHTML('afterbegin',icon(names[i])));
  const launcher=document.getElementById('chat-launch');if(launcher)launcher.innerHTML=icon('chat')+' Tư vấn sản phẩm';
})();
