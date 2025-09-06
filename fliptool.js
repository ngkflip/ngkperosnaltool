(function(){
  // 🔄 Toggle → if popup already exists, remove it
  if(document.getElementById('flipToolContainer')){
    document.getElementById('flipToolContainer').remove();
    return;
  }

  // === CSS from <style> in index.html ===
  var style=document.createElement('style');
  style.innerHTML=`
    /* paste everything that was inside your <style>...</style> here */
  `;
  document.head.appendChild(style);

  // === HTML from <body> in index.html ===
  var c=document.createElement('div');
  c.id="flipToolContainer";
  c.innerHTML=`
    <!-- paste everything that was inside <body>...</body> here -->
  `;
  document.body.appendChild(c);

  // === JavaScript from <script> in index.html ===
  // copy your event listeners, functions, draggable code, etc.
})();
