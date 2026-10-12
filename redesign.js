const $ = s => document.querySelector(s);
const state = {diet:'all',category:'all',query:''};
const rupee = n => '\u20b9' + Number(n).toLocaleString('en-IN');
function renderMenu(){
  const groups = window.MENU.filter(g => state.diet === 'all' || g.diet === state.diet);
  if(state.category !== 'all' && !groups.some(g=>g.name===state.category)) state.category='all';
  $('#category').replaceChildren(); $('#categories').replaceChildren();
  ['all',...groups.map(g=>g.name)].forEach(name=>{
    const label=name==='all'?'All categories':name;
    const option=new Option(label,name); option.selected=state.category===name; $('#category').add(option);
    const b=document.createElement('button'); b.textContent=label;b.setAttribute('aria-pressed',String(state.category===name));b.onclick=()=>{state.category=name;renderMenu()};$('#categories').append(b);
  });
  $('#dishes').replaceChildren();let total=0,index=0;
  groups.filter(g=>state.category==='all'||g.name===state.category).forEach(g=>{
    const items=g.items.filter(i=>(i.name+' '+g.name).toLowerCase().includes(state.query));if(!items.length)return;
    total+=items.length;const details=document.createElement('details');details.className='dish-section';details.open=!!state.query||state.category!=='all'||index++===0;
    const summary=document.createElement('summary'),mark=document.createElement('span'),heading=document.createElement('h3');
    mark.className='mark '+g.diet;mark.setAttribute('aria-label',g.diet==='veg'?'Vegetarian':'Non-vegetarian');heading.textContent=g.name;summary.append(mark,heading);details.append(summary);
    const grid=document.createElement('div');grid.className='dish-grid';items.forEach(i=>{const row=document.createElement('div'),name=document.createElement('span'),price=document.createElement('span');row.className='dish';name.textContent=i.name;price.className='dish-price';price.textContent=rupee(i.price);row.append(name,price);grid.append(row)});details.append(grid);$('#dishes').append(details);
  });
  $('#count').textContent=total+' dishes';$('#empty').hidden=total!==0;
  document.querySelectorAll('[data-diet]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.diet===state.diet)));
}
document.querySelectorAll('[data-diet]').forEach(b=>b.onclick=()=>{state.diet=b.dataset.diet;renderMenu()});
$('#category').onchange=e=>{state.category=e.target.value;renderMenu()};$('#search').oninput=e=>{state.query=e.target.value.trim().toLowerCase();renderMenu()};
$('#reset').onclick=()=>{Object.assign(state,{diet:'all',category:'all',query:''});$('#search').value='';renderMenu()};
document.querySelectorAll('[data-category]').forEach(a=>a.onclick=()=>{Object.assign(state,{diet:'all',category:a.dataset.category,query:''});$('#search').value='';renderMenu()});
renderMenu();
const dateParts=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
const today=`${dateParts.year}-${dateParts.month}-${dateParts.day}`;
const commonFields=`<div class="form-row"><label class="field">Your name<input name="guestName" autocomplete="name" maxlength="80" required></label><label class="field">Phone number<input name="phone" type="tel" autocomplete="tel" maxlength="20" required></label></div><div class="form-row"><label class="field">Preferred date<input name="date" type="date" min="${today}" required></label><label class="field">Preferred time (IST)<input name="time" type="time" required></label></div>`;
const policy=`<div class="policy"><strong>Before you request</strong><p>Requests are subject to availability. Pay only after our team approves your slot and shares the restaurant's payment details. Your booking is confirmed only after our team verifies payment.</p><p><strong>Cancellations within 24 hours of the scheduled booking are non-refundable.</strong> For earlier cancellations, please confirm the applicable terms with our team before paying.</p></div><label class="consent"><input name="terms" type="checkbox" required><span>I agree to the booking and cancellation terms above.</span></label>`;
['table','event'].forEach(mode=>{
  const isTable=mode==='table';
  const choices=isTable?`<fieldset><legend>Choose your table</legend><div class="table-choices"><label class="table-choice"><input name="table" type="radio" value="4" checked><span>4-person table<strong>${rupee(77)}</strong></span></label><label class="table-choice"><input name="table" type="radio" value="6"><span>6-person table<strong>${rupee(99)}</strong></span></label></div></fieldset><p class="fee-note" aria-live="polite">Table booking payment: <strong id="table-fee">${rupee(77)}</strong>. Food and drinks are charged separately.</p>`:`<div class="form-row"><label class="field">Occasion<select name="occasion" required><option value="">Choose an occasion</option><option>Birthday party</option><option>Anniversary</option><option>Get-together</option><option>Family celebration</option><option>Other</option></select></label><label class="field">Number of guests<input name="guests" type="number" min="2" step="1" required></label></div><label class="field">Lunch or dinner<select name="session" required><option value="">Choose a meal</option><option>Lunch</option><option>Dinner</option></select></label><p class="fee-note">Celebration pricing is quoted by our team before payment. The ${rupee(77)} / ${rupee(99)} table fees are not restaurant-hire prices. Exclusive use of the restaurant requires separate confirmation.</p>`;
  $(`#${mode}-panel`).innerHTML=`<form id="${mode}-booking">${choices}${commonFields}<label class="field">Anything else we should know? (optional)<textarea name="notes" rows="3" maxlength="1000" placeholder="Tell us about your plans or any special requests"></textarea></label>${policy}<button class="button gold" type="submit"><i data-lucide="message-circle"></i>Send ${isTable?'table':'celebration'} request on WhatsApp</button><p class="form-note">No payment is collected here. WhatsApp opens with your request; tap Send there to deliver it to our team.</p><div class="request-result" role="status" hidden></div></form>`;
  const form=$(`#${mode}-booking`),result=form.querySelector('.request-result');
  form.addEventListener('input',()=>{result.hidden=true;result.replaceChildren();form.elements.guestName.setCustomValidity('');form.elements.phone.setCustomValidity('');form.elements.time.setCustomValidity('');if(isTable)$('#table-fee').textContent=rupee(form.elements.table.value==='4'?77:99)});
  form.addEventListener('submit',e=>{
    e.preventDefault();const f=form.elements;f.guestName.setCustomValidity(f.guestName.value.trim()?'':'Please enter your name.');const digits=f.phone.value.replace(/\D/g,'');f.phone.setCustomValidity(digits.length>=10&&digits.length<=15?'':'Please enter a valid phone number.');f.time.setCustomValidity(new Date(`${f.date.value}T${f.time.value}:00+05:30`).getTime()>Date.now()?'':'Please choose a future date and time.');if(!form.reportValidity())return;
    const msg=['Hello Copper Barbeque, I would like to request '+(isTable?'a table.':'a celebration booking.'),isTable?`Table: ${f.table.value} people\nTable booking payment: ${rupee(f.table.value==='4'?77:99)}`:`Occasion: ${f.occasion.value}\nGuests: ${f.guests.value}\nMeal: ${f.session.value}\nPrice: Please share a quote before payment.`,`Name: ${f.guestName.value.trim()}`,`Phone: ${f.phone.value.trim()}`,`Date: ${f.date.value}`,`Time: ${f.time.value} IST`,f.notes.value.trim()?`Notes: ${f.notes.value.trim()}`:'','I agree that cancellations within 24 hours are non-refundable. Please confirm earlier-cancellation terms before payment.','Please check availability and share payment details only after approval. I understand this request is not a confirmed booking.'].filter(Boolean).join('\n');
    const url='https://wa.me/919777702734?text='+encodeURIComponent(msg);const p=document.createElement('p');p.textContent='Your request is ready. Send it in WhatsApp so our team can check availability. Your booking is not confirmed yet.';const link=document.createElement('a');link.className='text-link';link.href=url;link.target='_blank';link.rel='noopener';link.textContent='Open request in WhatsApp';result.replaceChildren(p,link);result.hidden=false;window.open(url,'_blank','noopener');
  });
});
function switchMode(mode,focus=false){document.querySelectorAll('[data-mode]').forEach(b=>{const active=b.dataset.mode===mode;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;$(`#${b.dataset.mode}-panel`).hidden=!active;if(active&&focus)b.focus()})}
document.querySelectorAll('[data-mode]').forEach(b=>{b.onclick=()=>switchMode(b.dataset.mode);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();switchMode(e.key==='Home'?'table':e.key==='End'?'event':b.dataset.mode==='table'?'event':'table',true)}}});
$('#plan-event').onclick=()=>switchMode('event');
document.querySelectorAll('a[href="#reserve"]:not(#plan-event)').forEach(a=>a.addEventListener('click',()=>switchMode('table')));
const toggle=$('.nav-toggle');function closeNav(){toggle.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open')}
toggle.onclick=()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open)};
$('#navigation').addEventListener('click',e=>{if(e.target.closest('a'))closeNav()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeNav();toggle.focus()}});
const film=$('#film');document.querySelectorAll('[data-film]').forEach(b=>b.onclick=()=>film.showModal());$('#close-film').onclick=()=>film.close();film.addEventListener('close',()=>film.querySelector('video').pause());
if(window.lucide)window.lucide.createIcons();document.querySelectorAll('svg').forEach(svg=>svg.setAttribute('aria-hidden','true'));
