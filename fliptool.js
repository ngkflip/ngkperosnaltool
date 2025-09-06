(function(){
  if(document.getElementById('flipToolContainer')){
    document.getElementById('flipToolContainer').remove();
    return;
  }

  // === CSS injection ===
  var style = document.createElement('style');
  style.innerHTML = `:root { --accent:#2ea44f; --danger:#dc3545; --muted:#b9bbbe; }
  html,body{height:100%;margin:0;background:#0f0f11;font-family:Montserrat,Arial,sans-serif;color:#fff;}
  /* Tool container */
  #flipToolContainer{
    position:fixed; top:24px; left:50%; transform:translateX(-50%);
    width:640px; min-width:320px; max-width:96%;
    border-radius:14px; z-index:999999; resize:both; overflow:auto;
    padding:12px; box-sizing:border-box; backdrop-filter: blur(8px);
    background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45));
    box-shadow: 0 12px 30px rgba(0,0,0,0.6);
    background-image: url("https://media.giphy.com/media/TjndRLCJ9KkF5etqAY/giphy.gif");
    background-position:center; background-size:cover;
  }
  /* header banner w/ robot gif and centered title */
  #toolHeader{
    height:96px; border-radius:10px; overflow:hidden; position:relative;
    margin:0 0 12px; background: url("https://media1.giphy.com/media/Y38iUdpAHYtBySPxGp/giphy.gif") center/contain no-repeat;
  }
  #toolHeader .title{
    position:absolute; left:0; right:0; top:0; bottom:0;
    display:flex; align-items:center; justify-content:center;
    font-family:Roboto,Arial,sans-serif; font-weight:700; font-size:22px;
    color:#fff; text-shadow:2px 2px 8px rgba(0,0,0,0.7); pointer-events:none;
  }

  .nav { display:flex; gap:8px; justify-content:center; margin-bottom:12px; }
  .nav button{ background:transparent; border:1px solid rgba(255,255,255,0.12); color:#fff; padding:8px 12px; border-radius:8px; cursor:pointer; font-weight:600; }
  .nav button.active{ border-color:rgba(255,255,255,0.25); background: linear-gradient(135deg,var(--accent),#20c99720); }

  label{ display:block; font-weight:600; color:#e6eef6; margin:8px 0 6px; font-size:13px; }
  input[type="text"], select, textarea{
    width:100%; padding:8px 10px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.35); color:#fff; font-size:14px; box-sizing:border-box;
  }
  textarea{ min-height:80px; resize:vertical; }

  .row { display:flex; gap:10px; align-items:stretch; }
  .col{ flex:1; }

.controls { text-align:center; margin-top:12px; }

.btn {
  display: inline-block;
  padding: 12px 20px;
  min-width: 120px;        /* same width for all buttons */
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  margin: 6px;
  background: linear-gradient(135deg, #2ea44f, #20c997); /* unified green */
  transition: all 0.2s ease;
  text-align: center;
}

.btn:hover {
  filter: brightness(1.1);
}

/* Optional special buttons */
.btn.copy {
  background: linear-gradient(135deg, #f6c200, #ffb703); /* yellow copy button */
  color: #000;
}

.btn.clear {
  background: linear-gradient(135deg, #dc3545, #e74c3c); /* red clear button */
  color: #fff;
}

/* unify container spacing for all buttons */
.controls {
  text-align: center;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;  /* space between buttons */
}


  /* emoji input area hidden/shown */
  #emojiInputs{ display:none; margin-top:8px; }

  /* Emoji palette */
  #emojiPaletteWrap{ margin-top:8px; }
  #emojiPaletteHeader{ display:flex; align-items:center; gap:8px; color:var(--muted); font-size:12px; }
  #emojiAddBtn{ padding:4px 8px; border-radius:8px; border:1px dashed rgba(255,255,255,0.3); background:transparent; color:#fff; cursor:pointer; font-weight:700; }
  #emojiPalette{ display:flex; flex-wrap:wrap; gap:6px; margin-top:6px; }
  .emoji-chip{
    position:relative; display:inline-flex; align-items:center; justify-content:center;
    width:36px; height:36px; border-radius:8px; background:rgba(255,255,255,0.06); cursor:pointer;
    user-select:none; font-size:18px; padding:4px;
  }
  .emoji-chip.custom .remove{
    position:absolute; top:-6px; right:-6px; width:18px; height:18px; border-radius:50%;
    background:#ff4757; color:#fff; font-size:12px; line-height:18px; text-align:center; cursor:pointer;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);
  }

  /* discord-like preview */
  #previewWrap {
  position: relative;   /* default = inline inside Posting Tool */
  margin-top: 12px;
  border-radius: 10px;
  background: #2f3136;
  padding: 12px;
  color: #dcddde;
  z-index: 1;
}
  #previewHeader{ display:flex; gap:8px; align-items:center; margin-bottom:8px; }
  #previewAvatar{ width:36px; height:36px; border-radius:50%; background:#72767d; }
  #previewTitle{ font-weight:700; color:#fff; font-size:14px; }
  #previewMessage{ margin-top:8px; color:#dcddde; line-height:1.35; font-size:14px; white-space:pre-wrap; word-break:break-word; }
  #previewMessage strong{ font-weight:800; color:#fff; }
  #previewMessage code{ background:#202225; padding:2px 6px; border-radius:6px; color:#fff; font-family:monospace; }
  #previewMessage a{ color:#00b0f4; text-decoration:none; }

/* Drag handle for previewWrap */
#previewWrapHeader {
  cursor: move;
  padding: 6px 8px;
  background: rgba(0,0,0,0.25);
  border-radius: 8px 8px 0 0;
  font-size:12px;
  color:#b9bbbe;
  user-select: none;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #2ea44f, #20c997); /* same green as theme */
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  padding: 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  transition: all 0.2s ease;
}
.close-btn:hover {
  filter: brightness(1.2);
  transform: scale(1.1);
}`;
  document.head.appendChild(style);

  // === HTML injection ===
  var container = document.createElement('div');
  container.innerHTML = `<div id="flipToolContainer" role="dialog" aria-label="Flip Tool">
  <div id="toolHeader">
  <div class="title"></div>
  <button class="close-btn" id="closeToolBtn">×</button>
</div>

  <div class="nav">
    <button id="navFlip" class="active">Flip Tool</button>
    <button id="navPost">Posting Tool</button>
  </div>

  <!-- Flip Tool Page -->
<div id="pageFlip">
  <label>Enter Search</label>
  <input type="text" id="flipInput" placeholder="keyword or UPC">

  <label>Category</label>
  <select id="flipCategory">
    <option value="online">Online Flip</option>
    <option value="local">Local Flip</option>
    <option value="store">Store Search</option>
  </select>

  <label>Site</label>
  <select id="flipSite"></select>

  <div class="controls">
    <button id="flipSearch" class="btn">Search</button>
    <button id="closeTool" class="btn">Close</button>
  </div>
</div> <!-- END pageFlip -->

<!-- Posting Tool Page -->
<div id="pagePost" style="display:none;">
  <div class="row">
    <div class="col">
      <label>Client</label>
      <select id="clientSelect">
        <option>Client 1</option>
        <option>Client 2</option>
        <option>Client 3</option>
      </select>
    </div>
    <div class="col">
      <label>Emoji Mode</label>
      <select id="emojiMode">
        <option value="yes">Yes (defaults)</option>
        <option value="no">No (custom)</option>
      </select>
    </div>
  </div>

  <label>Product Title</label>
  <input type="text" id="productTitle" placeholder="Full product title">

  <label>Product Link</label>
  <input type="text" id="productLink" placeholder="https://...">

  <label>Notes</label>
  <textarea id="productNotes" placeholder="Notes (optional)"></textarea>

  <label>Comps Link</label>
  <input type="text" id="compsLink" placeholder="https://... (Comps link)">

  <div class="row" style="margin-top:8px;">
    <div class="col">
      <label>Retail</label>
      <input type="text" id="retailInput" placeholder="$xx.xx">
    </div>
    <div class="col">
      <label>Resell</label>
      <input type="text" id="resellInput" placeholder="$xx.xx">
    </div>
  </div>

    <!-- emoji inputs only if emojiMode=no -->
    <div id="emojiInputs">
      <div class="row" style="margin-top:8px;">
        <div class="col">
          <label>Retail Emoji</label>
          <input type="text" id="emojiRetail" placeholder="e.g. 🏷️">
        </div>
        <div class="col">
          <label>Resell Emoji</label>
          <input type="text" id="emojiResell" placeholder="e.g. 💰">
        </div>
      </div>
      <div style="margin-top:8px;">
        <label>Comps Emoji</label>
        <input type="text" id="emojiComps" placeholder="e.g. 📊">
      </div>

      <!-- Emoji palette with add/remove -->
      <div id="emojiPaletteWrap">
        <div id="emojiPaletteHeader">
          <span>Emoji palette</span>
          <button id="emojiAddBtn" title="Add emoji to this client's palette">+</button>
          <span style="opacity:.8">• per-client & removable</span>
        </div>
        <div id="emojiPalette"></div>
      </div>
    </div>

    <div class="controls">
  <button id="generateBtn" class="btn">Generate</button>
  <button id="copyBtn" class="btn">Copy</button>
  <button id="clearBtn" class="btn">Clear All</button>
</div>

    <div id="previewWrap">
  <div id="previewWrapHeader">
  Format Preview
  <button class="close-btn" id="closePreviewBtn">×</button>
</div>
  <div id="previewHeader">
    <div id="previewAvatar" aria-hidden="true"></div>
    <div>
      <div id="previewTitle">NGK • <span id="previewClient">Client 1</span></div>
      <div style="font-size:12px;color:#b9bbbe;">Preview (Discord style)</div>
    </div>
  </div>
  <div id="previewMessage" role="article" aria-live="polite"></div>
   </div>
</div>


<script>
/* helper */
const $ = id => document.getElementById(id);
function escapeHtml(s){ if(s===undefined||s===null) return ""; return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

/* small markdown-ish renderer for preview */
function mdToHtml(md){
  if(!md) return "";
  let s = escapeHtml(md);

  // colon emoji shortcode map (preview only)
  const emojiMap = {
    ':map:': '🗺️',
    ':dollar:': '💵',
    ':money_mouth:': '🤑',
    ':notepad_spiral:': '📝',
    ':point_right:': '👉'
  };
  for(const code in emojiMap){
    s = s.replaceAll(code, emojiMap[code]);
  }

  // links [text](https://...)
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // inline code
  s = s.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
  // bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // line breaks
  s = s.replace(/\r?\n/g, '<br>');
  return s;
}

/* flip tool sites */
const siteMap = {
  online:[{value:"ebay",text:"eBay Sold"},{value:"mercari",text:"Mercari"},{value:"watchcount",text:"WatchCount"},{value:"goat",text:"GOAT"},{value:"stockx",text:"StockX"}],
  local:[{value:"offerup",text:"OfferUp"},{value:"fbmarket",text:"Facebook Marketplace"},{value:"craigslist",text:"Craigslist"},{value:"nextdoor",text:"Nextdoor"},{value:"letgo",text:"Letgo"}],
  store:[{value:"gamestop",text:"GameStop"},{value:"bestbuy",text:"BestBuy"},{value:"amazon",text:"Amazon"},{value:"walmart",text:"Walmart"},{value:"target",text:"Target"},{value:"costco",text:"Costco"},{value:"samsclub",text:"Sam's Club"},{value:"lowes",text:"Lowe's"},{value:"homedepot",text:"Home Depot"}]
};
function populateSites(cat){
  const sel = $('flipSite'); sel.innerHTML = '';
  siteMap[cat].forEach(it=>{ const o=document.createElement('option'); o.value=it.value; o.textContent=it.text; sel.appendChild(o); });
}
populateSites('online'); $('flipCategory').addEventListener('change', ()=> populateSites($('flipCategory').value) );

/* flip search */
$('flipSearch').addEventListener('click', ()=>{
  const q = $('flipInput').value.trim(); if(!q){ alert('Enter a keyword or UPC'); return; }
  const s = $('flipSite').value; let u="";
  if(s==="ebay")u="https://www.ebay.com/sch/i.html?_nkw="+encodeURIComponent(q)+"&LH_Sold=1&LH_Complete=1";
  else if(s==="mercari")u="https://www.mercari.com/search/?itemStatuses=2-3&keyword="+encodeURIComponent(q);
  else if(s==="watchcount")u="https://www.watchcount.com/sold/"+encodeURIComponent(q)+"/-/all";
  else if(s==="goat")u="https://www.goat.com/search?query="+encodeURIComponent(q);
  else if(s==="stockx")u="https://stockx.com/search?s="+encodeURIComponent(q);
  else if(s==="offerup")u="https://offerup.com/search/?query="+encodeURIComponent(q);
  else if(s==="fbmarket")u="https://www.facebook.com/marketplace/search/?query="+encodeURIComponent(q);
  else if(s==="craigslist")u="https://www.craigslist.org/search/sss?query="+encodeURIComponent(q);
  else if(s==="nextdoor")u="https://nextdoor.com/news_feed/?query="+encodeURIComponent(q);
  else if(s==="letgo")u="https://www.letgo.com/arama?query_text="+encodeURIComponent(q);
  else if(s==="gamestop")u="https://www.gamestop.com/search/?q="+encodeURIComponent(q);
  else if(s==="bestbuy")u="https://www.bestbuy.com/site/searchpage.jsp?st="+encodeURIComponent(q);
  else if(s==="amazon")u="https://www.amazon.com/s?k="+encodeURIComponent(q);
  else if(s==="walmart")u="https://www.walmart.com/search/?query="+encodeURIComponent(q);
  else if(s==="target")u="https://www.target.com/s?searchTerm="+encodeURIComponent(q);
  else if(s==="costco")u="https://www.costco.com/CatalogSearch?keyword="+encodeURIComponent(q);
  else if(s==="samsclub")u="https://www.samsclub.com/s/search="+encodeURIComponent(q);
  else if(s==="lowes")u="https://www.lowes.com/search?searchTerm="+encodeURIComponent(q);
  else if(s==="homedepot")u="https://www.homedepot.com/s/"+encodeURIComponent(q);
  if(u) window.open(u,'_blank');
});

/* navigation */
$('navFlip').addEventListener('click', ()=>{ 
  $('pageFlip').style.display='block'; 
  $('pagePost').style.display='none'; 
  $('navFlip').classList.add('active'); 
  $('navPost').classList.remove('active'); 
});
$('navPost').addEventListener('click', ()=>{
  $('pageFlip').style.display='none';
  $('pagePost').style.display='block';
  $('navFlip').classList.remove('active');
  $('navPost').classList.add('active');

  resetPreviewPosition(); // <-- fixed call
});

/* Posting tool elements */
const clientSelect = $('clientSelect');
const emojiMode = $('emojiMode');
const productTitle = $('productTitle');
const productLink = $('productLink');
const productNotes = $('productNotes');
const compsLink = $('compsLink');
const retailInput = $('retailInput');
const resellInput = $('resellInput');
const emojiRetail = $('emojiRetail');
const emojiResell = $('emojiResell');
const emojiComps = $('emojiComps');

const previewMessage = $('previewMessage');
const previewClient = $('previewClient');

/* show/hide emoji inputs based on mode */
function refreshEmojiInputs(){
  const on = (emojiMode.value === 'no');
  $('emojiInputs').style.display = on ? 'block' : 'none';
  if(on) updatePreview();
}

/* ---------- Per-client saved templates ---------- */
const FIELDS = ['productTitle','productLink','productNotes','compsLink','retailInput','resellInput','emojiRetail','emojiResell','emojiComps'];
function clientKeyBase(){ return clientSelect.value || 'Client 1'; }
function getStorageKey(suffix){ return \`post_${clientKeyBase()}_${suffix}\`; }
function saveFieldSet(){ try{ FIELDS.forEach(f => localStorage.setItem(getStorageKey(f), $(f).value)); }catch(e){ console.warn('save failed', e); } }
function loadFieldSet(){ try{ FIELDS.forEach(f => { const v = localStorage.getItem(getStorageKey(f)); if(v !== null) $(f).value = v; }); }catch(e){ console.warn('load failed', e); } }
function saveLastClient(){ localStorage.setItem('post_lastClient', clientSelect.value); }
function loadLastClient(){ const v = localStorage.getItem('post_lastClient'); if(v) clientSelect.value = v; }

/* ---------- Emoji palette (defaults + per-client custom) ---------- */
const DEFAULT_EMOJIS = ['🏷️','💰','📊','📝','🔗','📦','💵','🔥','⚠️','✅'];
function getPaletteKey(){ return \`post_${clientKeyBase()}_emojiPalette\`; }
function readCustomPalette(){ try{ const raw = localStorage.getItem(getPaletteKey()); if(!raw) return []; const arr = JSON.parse(raw); if(Array.isArray(arr)) return arr; }catch(e){} return []; }
function writeCustomPalette(arr){ try{ localStorage.setItem(getPaletteKey(), JSON.stringify(arr)); }catch(e){} }
function renderPalette(){
  const wrap = $('emojiPalette'); wrap.innerHTML='';
  DEFAULT_EMOJIS.forEach(e=>{
    const chip = document.createElement('div'); chip.className='emoji-chip'; chip.textContent=e; chip.title='Click to insert';
    chip.addEventListener('click', ()=> insertEmojiToFocused(e)); wrap.appendChild(chip);
  });
  const custom = readCustomPalette();
  custom.forEach((e, idx)=>{
    const chip = document.createElement('div'); chip.className='emoji-chip custom'; chip.textContent=e; chip.title='Click to insert';
    chip.addEventListener('click', (ev)=>{ if(ev.target.classList.contains('remove')) return; insertEmojiToFocused(e); });
    const rm = document.createElement('div'); rm.className='remove'; rm.textContent='×'; rm.title='Remove from this client palette';
    rm.addEventListener('click', (ev)=>{ ev.stopPropagation(); const arr=readCustomPalette(); arr.splice(idx,1); writeCustomPalette(arr); renderPalette(); });
    chip.appendChild(rm); wrap.appendChild(chip);
  });
}
$('emojiAddBtn').addEventListener('click', ()=>{
  const e = prompt('Add emoji (paste one or more emoji characters):',''); if(!e) return;
  const arr = readCustomPalette(); arr.push(e); writeCustomPalette(arr); renderPalette();
});

/* Track which emoji input is focused */
let focusedEmojiInput = null;
['emojiRetail','emojiResell','emojiComps'].forEach(id=>{
  const el = $(id); if(!el) return;
  el.addEventListener('focus',()=>{ focusedEmojiInput = el; });
});
function insertAtCursor(el, text){
  if(!el) return;
  try{
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0,start) + text + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start + text.length;
    el.dispatchEvent(new Event('input'));
  }catch(e){ el.value = (el.value||'') + text; el.dispatchEvent(new Event('input')); }
}
function insertEmojiToFocused(e){ if(!focusedEmojiInput) focusedEmojiInput=$('emojiRetail'); insertAtCursor(focusedEmojiInput,e); }

/* localStorage helpers */
function saveGlobal(){ try{ localStorage.setItem('post_emojiMode', emojiMode.value); saveLastClient(); }catch(e){} }
function loadGlobal(){ try{ const em=localStorage.getItem('post_emojiMode'); if(em!==null) emojiMode.value=em; }catch(e){} }

/* clear current client's data & palette */
function clearCurrentClient(){ if(!confirm(\`Clear all fields & saved template for ${clientKeyBase()}?\`)) return;
  FIELDS.forEach(f=>{ localStorage.removeItem(getStorageKey(f)); $(f).value=''; });
  writeCustomPalette([]);
  renderPalette(); updatePreview();
}

/* Build markdown string */
function buildMarkdown(){
  const client=clientSelect.value||'';
  const title=productTitle.value.trim()||'';
  const notes=productNotes.value.trim()||'';
  const retail=retailInput.value.trim()||'';
  const resell=resellInput.value.trim()||'';

  const normalizeLink = l => { if(!l) return ''; return l.startsWith('http')?l:'https://'+l; };
  const link=normalizeLink(productLink.value.trim()||'');
  const comps=normalizeLink(compsLink.value.trim()||'');

  let storeLabel='Store';
  if(link){ try{ const u=new URL(link); storeLabel=u.hostname.replace(/^www\./,'').split('.')[0]; storeLabel=storeLabel.charAt(0).toUpperCase()+storeLabel.slice(1); }catch(e){} }

  const DEFAULTS={ retail: ':dollar:', resell: ':money_mouth:', notes: ':notepad_spiral:', where: ':map:', comps: ':point_right:' };
  const emojis = (emojiMode.value==='no') ? { retail:emojiRetail.value||DEFAULTS.retail, resell:emojiResell.value||DEFAULTS.resell, notes:DEFAULTS.notes, where:DEFAULTS.where, comps:emojiComps.value||DEFAULTS.comps } : DEFAULTS;

  let md='';
  if(client==='Client 1'){
    md+=\`### **${title}**\n\`;
    md+=\`${emojis.where} **Where:** ${storeLabel} | [Currently Avail Online](${link})\n\`;
    md+=\`${emojis.retail} **Retail:** ${retail}\n\`;
    md+=\`${emojis.resell} **Resell:** ${resell}\n\n\`;
    if(notes) md+=\`${emojis.notes} **Notes |** ${notes}\n\n\`;
    if(comps) md+=\`${emojis.comps} [eBay Comps](${comps})\n\`;
  } else if(client==='Client 2'){
    md+=\` **${title}**  \n\`;
    md+=\` \\`Store:\\` ${storeLabel} | [Currently Avail Online](${link})  \n\`;
    md+=\` ${emojis.retail} \\`Retail:\\` ${retail}  \n\`;
    md+=\` ${emojis.resell} \\`Resell:\\` ${resell}  \n\`;
    if(notes) md+=\` ${emojis.notes} \\`Notes:\\` ${notes}\n\`;
  } else if(client==='Client 3'){
    md+=\`**${title}**  \n\`;
    md+=\`${emojis.retail} \\`Retail:\\` ${retail} [${storeLabel}](${link}) | ${emojis.resell} \\`Resell:\\` ${resell}\`;
    if(comps) md+=\` ${emojis.comps} [eBay](${comps})\`;
    md+=\`  \n\`;
    if(notes) md+=\`${emojis.notes} \\`Notes:\\` ${notes}\n\`;
  }

  return md;
}

/* update Preview (renders markdown->html) */
function updatePreview(){
  saveFieldSet();
  saveGlobal();
  const md=buildMarkdown();
  previewMessage.innerHTML = mdToHtml(md);
  previewClient.textContent = clientSelect.value;
}

/* wire inputs for live preview & saving */
[clientSelect,emojiMode,productTitle,productLink,productNotes,compsLink,retailInput,resellInput,emojiRetail,emojiResell,emojiComps].forEach(el=>{
  if(!el) return;
  el.addEventListener('input', updatePreview);
  el.addEventListener('change', updatePreview);
});

/* initial load */
loadLastClient();
loadGlobal();
refreshEmojiInputs();
loadFieldSet();
renderPalette();
updatePreview();

/* emoji mode change updates visibility and preview */
emojiMode.addEventListener('change', ()=>{ refreshEmojiInputs(); updatePreview(); });

/* change client -> save previous, load new client's data + palette */
clientSelect.addEventListener('change', ()=>{ saveLastClient(); loadFieldSet(); renderPalette(); refreshEmojiInputs(); updatePreview(); });

/* generate button */
$('generateBtn').addEventListener('click', updatePreview);

/* copy button */
$('copyBtn').addEventListener('click', ()=>{ const md=buildMarkdown(); navigator.clipboard.writeText(md).then(()=>{ alert('Markdown copied to clipboard — paste into Discord.'); }); });

/* clear all button */
$('clearBtn').addEventListener('click', clearCurrentClient);

/* close tool */
$('closeTool').addEventListener('click', ()=>{
  resetPreviewPosition();   // snap back inline before removing
  $('flipToolContainer').remove();
});

/* draggable Flip Tool header */
(function(){
  const container = $('flipToolContainer');
  const header = $('toolHeader');
  let dragging=false, offsetX=0, offsetY=0;
  header.style.cursor='move';
  header.addEventListener('mousedown', e => {
  dragging = true;
  container.style.position = "fixed";   // float outside Posting Tool
  const rect = container.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = 'none';
});
  window.addEventListener('mousemove', (e)=>{
    if(!dragging) return;
    container.style.left = (e.clientX - offsetX)+'px';
    container.style.top = (e.clientY - offsetY)+'px';
    container.style.transform = 'none';
    container.style.zIndex=999999;
  });
  window.addEventListener('mouseup', ()=>{
    dragging=false;
    document.body.style.userSelect='auto';
  });
})();

/* ---------- Preview drag + reset ---------- */
(function(){
  const container = $('previewWrap');
  const header = $('previewWrapHeader');
  const controls = document.querySelector('#pagePost .controls');

  let dragging = false, offsetX = 0, offsetY = 0;

  // Reset preview back inside Posting Tool
function resetPreviewPosition(){
  // move back inside Posting Tool container
  const postingTool = document.getElementById("pagePost");
  if (postingTool && !postingTool.contains(container)) {
    postingTool.appendChild(container);
  }

  container.style.position = "relative";
  container.style.left = "";
  container.style.top = "";
  container.style.zIndex = 1;

  // remove floating wrapper if exists
  const floater = document.getElementById("preview-floater");
  if (floater) floater.remove();
}

header.addEventListener('mousedown', e => {
  dragging = true;

  // re-parent into a floating wrapper under <body>
  if (container.parentElement.id !== "preview-floater") {
    const floater = document.createElement("div");
    floater.id = "preview-floater";
    document.body.appendChild(floater);
    floater.appendChild(container);
  }

  container.style.position = "fixed";   // float outside Posting Tool
  const rect = container.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = 'none';
});

  window.addEventListener('mousemove', e => {
    if(!dragging) return;
    container.style.left = (e.clientX - offsetX) + 'px';
    container.style.top = (e.clientY - offsetY) + 'px';
    container.style.zIndex = 999999;
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    document.body.style.userSelect = 'auto';
  });

  // Expose globally for nav switch
  window.resetPreviewPosition = resetPreviewPosition;
// Close Flip Tool with X
$('closeToolBtn').addEventListener('click', () => {
  resetPreviewPosition();
  $('flipToolContainer').remove();
});

// Close Preview popup with X
$('closePreviewBtn').addEventListener('click', () => {
  resetPreviewPosition();
});

})();


</script>`;
  document.body.appendChild(container);

  // === JS logic (runs after injection) ===
  (function(){
/* helper */
const $ = id => document.getElementById(id);
function escapeHtml(s){ if(s===undefined||s===null) return ""; return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

/* small markdown-ish renderer for preview */
function mdToHtml(md){
  if(!md) return "";
  let s = escapeHtml(md);

  // colon emoji shortcode map (preview only)
  const emojiMap = {
    ':map:': '🗺️',
    ':dollar:': '💵',
    ':money_mouth:': '🤑',
    ':notepad_spiral:': '📝',
    ':point_right:': '👉'
  };
  for(const code in emojiMap){
    s = s.replaceAll(code, emojiMap[code]);
  }

  // links [text](https://...)
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // inline code
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  // bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // line breaks
  s = s.replace(/\r?\n/g, '<br>');
  return s;
}

/* flip tool sites */
const siteMap = {
  online:[{value:"ebay",text:"eBay Sold"},{value:"mercari",text:"Mercari"},{value:"watchcount",text:"WatchCount"},{value:"goat",text:"GOAT"},{value:"stockx",text:"StockX"}],
  local:[{value:"offerup",text:"OfferUp"},{value:"fbmarket",text:"Facebook Marketplace"},{value:"craigslist",text:"Craigslist"},{value:"nextdoor",text:"Nextdoor"},{value:"letgo",text:"Letgo"}],
  store:[{value:"gamestop",text:"GameStop"},{value:"bestbuy",text:"BestBuy"},{value:"amazon",text:"Amazon"},{value:"walmart",text:"Walmart"},{value:"target",text:"Target"},{value:"costco",text:"Costco"},{value:"samsclub",text:"Sam's Club"},{value:"lowes",text:"Lowe's"},{value:"homedepot",text:"Home Depot"}]
};
function populateSites(cat){
  const sel = $('flipSite'); sel.innerHTML = '';
  siteMap[cat].forEach(it=>{ const o=document.createElement('option'); o.value=it.value; o.textContent=it.text; sel.appendChild(o); });
}
populateSites('online'); $('flipCategory').addEventListener('change', ()=> populateSites($('flipCategory').value) );

/* flip search */
$('flipSearch').addEventListener('click', ()=>{
  const q = $('flipInput').value.trim(); if(!q){ alert('Enter a keyword or UPC'); return; }
  const s = $('flipSite').value; let u="";
  if(s==="ebay")u="https://www.ebay.com/sch/i.html?_nkw="+encodeURIComponent(q)+"&LH_Sold=1&LH_Complete=1";
  else if(s==="mercari")u="https://www.mercari.com/search/?itemStatuses=2-3&keyword="+encodeURIComponent(q);
  else if(s==="watchcount")u="https://www.watchcount.com/sold/"+encodeURIComponent(q)+"/-/all";
  else if(s==="goat")u="https://www.goat.com/search?query="+encodeURIComponent(q);
  else if(s==="stockx")u="https://stockx.com/search?s="+encodeURIComponent(q);
  else if(s==="offerup")u="https://offerup.com/search/?query="+encodeURIComponent(q);
  else if(s==="fbmarket")u="https://www.facebook.com/marketplace/search/?query="+encodeURIComponent(q);
  else if(s==="craigslist")u="https://www.craigslist.org/search/sss?query="+encodeURIComponent(q);
  else if(s==="nextdoor")u="https://nextdoor.com/news_feed/?query="+encodeURIComponent(q);
  else if(s==="letgo")u="https://www.letgo.com/arama?query_text="+encodeURIComponent(q);
  else if(s==="gamestop")u="https://www.gamestop.com/search/?q="+encodeURIComponent(q);
  else if(s==="bestbuy")u="https://www.bestbuy.com/site/searchpage.jsp?st="+encodeURIComponent(q);
  else if(s==="amazon")u="https://www.amazon.com/s?k="+encodeURIComponent(q);
  else if(s==="walmart")u="https://www.walmart.com/search/?query="+encodeURIComponent(q);
  else if(s==="target")u="https://www.target.com/s?searchTerm="+encodeURIComponent(q);
  else if(s==="costco")u="https://www.costco.com/CatalogSearch?keyword="+encodeURIComponent(q);
  else if(s==="samsclub")u="https://www.samsclub.com/s/search="+encodeURIComponent(q);
  else if(s==="lowes")u="https://www.lowes.com/search?searchTerm="+encodeURIComponent(q);
  else if(s==="homedepot")u="https://www.homedepot.com/s/"+encodeURIComponent(q);
  if(u) window.open(u,'_blank');
});

/* navigation */
$('navFlip').addEventListener('click', ()=>{ 
  $('pageFlip').style.display='block'; 
  $('pagePost').style.display='none'; 
  $('navFlip').classList.add('active'); 
  $('navPost').classList.remove('active'); 
});
$('navPost').addEventListener('click', ()=>{
  $('pageFlip').style.display='none';
  $('pagePost').style.display='block';
  $('navFlip').classList.remove('active');
  $('navPost').classList.add('active');

  resetPreviewPosition(); // <-- fixed call
});

/* Posting tool elements */
const clientSelect = $('clientSelect');
const emojiMode = $('emojiMode');
const productTitle = $('productTitle');
const productLink = $('productLink');
const productNotes = $('productNotes');
const compsLink = $('compsLink');
const retailInput = $('retailInput');
const resellInput = $('resellInput');
const emojiRetail = $('emojiRetail');
const emojiResell = $('emojiResell');
const emojiComps = $('emojiComps');

const previewMessage = $('previewMessage');
const previewClient = $('previewClient');

/* show/hide emoji inputs based on mode */
function refreshEmojiInputs(){
  const on = (emojiMode.value === 'no');
  $('emojiInputs').style.display = on ? 'block' : 'none';
  if(on) updatePreview();
}

/* ---------- Per-client saved templates ---------- */
const FIELDS = ['productTitle','productLink','productNotes','compsLink','retailInput','resellInput','emojiRetail','emojiResell','emojiComps'];
function clientKeyBase(){ return clientSelect.value || 'Client 1'; }
function getStorageKey(suffix){ return `post_${clientKeyBase()}_${suffix}`; }
function saveFieldSet(){ try{ FIELDS.forEach(f => localStorage.setItem(getStorageKey(f), $(f).value)); }catch(e){ console.warn('save failed', e); } }
function loadFieldSet(){ try{ FIELDS.forEach(f => { const v = localStorage.getItem(getStorageKey(f)); if(v !== null) $(f).value = v; }); }catch(e){ console.warn('load failed', e); } }
function saveLastClient(){ localStorage.setItem('post_lastClient', clientSelect.value); }
function loadLastClient(){ const v = localStorage.getItem('post_lastClient'); if(v) clientSelect.value = v; }

/* ---------- Emoji palette (defaults + per-client custom) ---------- */
const DEFAULT_EMOJIS = ['🏷️','💰','📊','📝','🔗','📦','💵','🔥','⚠️','✅'];
function getPaletteKey(){ return `post_${clientKeyBase()}_emojiPalette`; }
function readCustomPalette(){ try{ const raw = localStorage.getItem(getPaletteKey()); if(!raw) return []; const arr = JSON.parse(raw); if(Array.isArray(arr)) return arr; }catch(e){} return []; }
function writeCustomPalette(arr){ try{ localStorage.setItem(getPaletteKey(), JSON.stringify(arr)); }catch(e){} }
function renderPalette(){
  const wrap = $('emojiPalette'); wrap.innerHTML='';
  DEFAULT_EMOJIS.forEach(e=>{
    const chip = document.createElement('div'); chip.className='emoji-chip'; chip.textContent=e; chip.title='Click to insert';
    chip.addEventListener('click', ()=> insertEmojiToFocused(e)); wrap.appendChild(chip);
  });
  const custom = readCustomPalette();
  custom.forEach((e, idx)=>{
    const chip = document.createElement('div'); chip.className='emoji-chip custom'; chip.textContent=e; chip.title='Click to insert';
    chip.addEventListener('click', (ev)=>{ if(ev.target.classList.contains('remove')) return; insertEmojiToFocused(e); });
    const rm = document.createElement('div'); rm.className='remove'; rm.textContent='×'; rm.title='Remove from this client palette';
    rm.addEventListener('click', (ev)=>{ ev.stopPropagation(); const arr=readCustomPalette(); arr.splice(idx,1); writeCustomPalette(arr); renderPalette(); });
    chip.appendChild(rm); wrap.appendChild(chip);
  });
}
$('emojiAddBtn').addEventListener('click', ()=>{
  const e = prompt('Add emoji (paste one or more emoji characters):',''); if(!e) return;
  const arr = readCustomPalette(); arr.push(e); writeCustomPalette(arr); renderPalette();
});

/* Track which emoji input is focused */
let focusedEmojiInput = null;
['emojiRetail','emojiResell','emojiComps'].forEach(id=>{
  const el = $(id); if(!el) return;
  el.addEventListener('focus',()=>{ focusedEmojiInput = el; });
});
function insertAtCursor(el, text){
  if(!el) return;
  try{
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0,start) + text + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start + text.length;
    el.dispatchEvent(new Event('input'));
  }catch(e){ el.value = (el.value||'') + text; el.dispatchEvent(new Event('input')); }
}
function insertEmojiToFocused(e){ if(!focusedEmojiInput) focusedEmojiInput=$('emojiRetail'); insertAtCursor(focusedEmojiInput,e); }

/* localStorage helpers */
function saveGlobal(){ try{ localStorage.setItem('post_emojiMode', emojiMode.value); saveLastClient(); }catch(e){} }
function loadGlobal(){ try{ const em=localStorage.getItem('post_emojiMode'); if(em!==null) emojiMode.value=em; }catch(e){} }

/* clear current client's data & palette */
function clearCurrentClient(){ if(!confirm(`Clear all fields & saved template for ${clientKeyBase()}?`)) return;
  FIELDS.forEach(f=>{ localStorage.removeItem(getStorageKey(f)); $(f).value=''; });
  writeCustomPalette([]);
  renderPalette(); updatePreview();
}

/* Build markdown string */
function buildMarkdown(){
  const client=clientSelect.value||'';
  const title=productTitle.value.trim()||'';
  const notes=productNotes.value.trim()||'';
  const retail=retailInput.value.trim()||'';
  const resell=resellInput.value.trim()||'';

  const normalizeLink = l => { if(!l) return ''; return l.startsWith('http')?l:'https://'+l; };
  const link=normalizeLink(productLink.value.trim()||'');
  const comps=normalizeLink(compsLink.value.trim()||'');

  let storeLabel='Store';
  if(link){ try{ const u=new URL(link); storeLabel=u.hostname.replace(/^www\./,'').split('.')[0]; storeLabel=storeLabel.charAt(0).toUpperCase()+storeLabel.slice(1); }catch(e){} }

  const DEFAULTS={ retail: ':dollar:', resell: ':money_mouth:', notes: ':notepad_spiral:', where: ':map:', comps: ':point_right:' };
  const emojis = (emojiMode.value==='no') ? { retail:emojiRetail.value||DEFAULTS.retail, resell:emojiResell.value||DEFAULTS.resell, notes:DEFAULTS.notes, where:DEFAULTS.where, comps:emojiComps.value||DEFAULTS.comps } : DEFAULTS;

  let md='';
  if(client==='Client 1'){
    md+=`### **${title}**\n`;
    md+=`${emojis.where} **Where:** ${storeLabel} | [Currently Avail Online](${link})\n`;
    md+=`${emojis.retail} **Retail:** ${retail}\n`;
    md+=`${emojis.resell} **Resell:** ${resell}\n\n`;
    if(notes) md+=`${emojis.notes} **Notes |** ${notes}\n\n`;
    if(comps) md+=`${emojis.comps} [eBay Comps](${comps})\n`;
  } else if(client==='Client 2'){
    md+=` **${title}**  \n`;
    md+=` \`Store:\` ${storeLabel} | [Currently Avail Online](${link})  \n`;
    md+=` ${emojis.retail} \`Retail:\` ${retail}  \n`;
    md+=` ${emojis.resell} \`Resell:\` ${resell}  \n`;
    if(notes) md+=` ${emojis.notes} \`Notes:\` ${notes}\n`;
  } else if(client==='Client 3'){
    md+=`**${title}**  \n`;
    md+=`${emojis.retail} \`Retail:\` ${retail} [${storeLabel}](${link}) | ${emojis.resell} \`Resell:\` ${resell}`;
    if(comps) md+=` ${emojis.comps} [eBay](${comps})`;
    md+=`  \n`;
    if(notes) md+=`${emojis.notes} \`Notes:\` ${notes}\n`;
  }

  return md;
}

/* update Preview (renders markdown->html) */
function updatePreview(){
  saveFieldSet();
  saveGlobal();
  const md=buildMarkdown();
  previewMessage.innerHTML = mdToHtml(md);
  previewClient.textContent = clientSelect.value;
}

/* wire inputs for live preview & saving */
[clientSelect,emojiMode,productTitle,productLink,productNotes,compsLink,retailInput,resellInput,emojiRetail,emojiResell,emojiComps].forEach(el=>{
  if(!el) return;
  el.addEventListener('input', updatePreview);
  el.addEventListener('change', updatePreview);
});

/* initial load */
loadLastClient();
loadGlobal();
refreshEmojiInputs();
loadFieldSet();
renderPalette();
updatePreview();

/* emoji mode change updates visibility and preview */
emojiMode.addEventListener('change', ()=>{ refreshEmojiInputs(); updatePreview(); });

/* change client -> save previous, load new client's data + palette */
clientSelect.addEventListener('change', ()=>{ saveLastClient(); loadFieldSet(); renderPalette(); refreshEmojiInputs(); updatePreview(); });

/* generate button */
$('generateBtn').addEventListener('click', updatePreview);

/* copy button */
$('copyBtn').addEventListener('click', ()=>{ const md=buildMarkdown(); navigator.clipboard.writeText(md).then(()=>{ alert('Markdown copied to clipboard — paste into Discord.'); }); });

/* clear all button */
$('clearBtn').addEventListener('click', clearCurrentClient);

/* close tool */
$('closeTool').addEventListener('click', ()=>{
  resetPreviewPosition();   // snap back inline before removing
  $('flipToolContainer').remove();
});

/* draggable Flip Tool header */
(function(){
  const container = $('flipToolContainer');
  const header = $('toolHeader');
  let dragging=false, offsetX=0, offsetY=0;
  header.style.cursor='move';
  header.addEventListener('mousedown', e => {
  dragging = true;
  container.style.position = "fixed";   // float outside Posting Tool
  const rect = container.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = 'none';
});
  window.addEventListener('mousemove', (e)=>{
    if(!dragging) return;
    container.style.left = (e.clientX - offsetX)+'px';
    container.style.top = (e.clientY - offsetY)+'px';
    container.style.transform = 'none';
    container.style.zIndex=999999;
  });
  window.addEventListener('mouseup', ()=>{
    dragging=false;
    document.body.style.userSelect='auto';
  });
})();

/* ---------- Preview drag + reset ---------- */
(function(){
  const container = $('previewWrap');
  const header = $('previewWrapHeader');
  const controls = document.querySelector('#pagePost .controls');

  let dragging = false, offsetX = 0, offsetY = 0;

  // Reset preview back inside Posting Tool
function resetPreviewPosition(){
  // move back inside Posting Tool container
  const postingTool = document.getElementById("pagePost");
  if (postingTool && !postingTool.contains(container)) {
    postingTool.appendChild(container);
  }

  container.style.position = "relative";
  container.style.left = "";
  container.style.top = "";
  container.style.zIndex = 1;

  // remove floating wrapper if exists
  const floater = document.getElementById("preview-floater");
  if (floater) floater.remove();
}

header.addEventListener('mousedown', e => {
  dragging = true;

  // re-parent into a floating wrapper under <body>
  if (container.parentElement.id !== "preview-floater") {
    const floater = document.createElement("div");
    floater.id = "preview-floater";
    document.body.appendChild(floater);
    floater.appendChild(container);
  }

  container.style.position = "fixed";   // float outside Posting Tool
  const rect = container.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  document.body.style.userSelect = 'none';
});

  window.addEventListener('mousemove', e => {
    if(!dragging) return;
    container.style.left = (e.clientX - offsetX) + 'px';
    container.style.top = (e.clientY - offsetY) + 'px';
    container.style.zIndex = 999999;
  });

  window.addEventListener('mouseup', () => {
    dragging = false;
    document.body.style.userSelect = 'auto';
  });

  // Expose globally for nav switch
  window.resetPreviewPosition = resetPreviewPosition;
// Close Flip Tool with X
$('closeToolBtn').addEventListener('click', () => {
  resetPreviewPosition();
  $('flipToolContainer').remove();
});

// Close Preview popup with X
$('closePreviewBtn').addEventListener('click', () => {
  resetPreviewPosition();
});

})();
  })();

})();
