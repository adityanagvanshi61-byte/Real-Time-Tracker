// debug.js - captures global errors and shows an overlay so the page isn't blank
(function(){
  function showError(message){
    try{
      var el = document.createElement('div');
      el.id = 'debug-error-overlay';
      el.innerText = message;
      document.body.appendChild(el);
    }catch(e){/* ignore */}
    console.error('Debug overlay:', message);
  }

  window.addEventListener('error', function(e){
    showError('Error: ' + (e && e.message ? e.message : String(e)));
  });
  window.addEventListener('unhandledrejection', function(e){
    showError('Promise rejection: ' + (e && e.reason ? e.reason : String(e)));
  });

  // quick onload marker so we can see the script loaded
  console.log('debug.js loaded');
})();
