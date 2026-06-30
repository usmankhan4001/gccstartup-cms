(function(){
  window.LEAD_ENDPOINT = '/api/lead';

  function param(n) { return new URLSearchParams(location.search).get(n) || ''; }
  
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // Used by Tax Guide CTA and others
  window.tgLeadSubmit = function(e) {
    e.preventDefault();
    var btn = document.getElementById('tgSubmitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    var err = document.getElementById('tgErr');
    if (err) err.classList.remove('show');

    var eid = uuid();
    var data = {};
    new FormData(e.target).forEach(function(v, k) { data[k] = v; });
    data.page = location.href;
    data.fbclid = param('fbclid');
    data.eventId = eid;
    data.source = 'Website Lead'
      + (param('utm_source') ? ' · ' + param('utm_source') : '')
      + (param('utm_campaign') ? ' · ' + param('utm_campaign') : '')
      + (param('utm_content') ? ' · ' + param('utm_content') : '');

    fetch(window.LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function() {
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', { content_name: 'Lead Submitted', currency: 'USD', value: 0 }, { eventID: eid });
      }
      var form = e.target;
      form.style.display = 'none';
      var success = document.getElementById('tgSuccess') || document.getElementById('successMsg');
      if (success) success.classList.add('show');
    })
    .catch(function() {
      if (err) err.classList.add('show');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Try Again';
      }
    });
    return false;
  };
})();
