// Sends PlanWell Pro waitlist signups to a Google Form.
// The form's id and question entry ids live on the <form> as data attributes.
(function () {
  var form = document.getElementById('join');
  if (!form) return;
  var status = form.querySelector('.pro-status');
  var button = form.querySelector('.pro-submit');
  var formId = form.dataset.formId;
  var emailEntry = form.dataset.emailEntry;
  var devicesEntry = form.dataset.devicesEntry;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      form.email.focus();
      return;
    }
    if (!formId || !emailEntry) {
      status.textContent = 'Signups open very soon. Please check back in a day or two.';
      return;
    }

    var data = new URLSearchParams();
    data.append('entry.' + emailEntry, email);
    if (devicesEntry) {
      form.querySelectorAll('input[name="devices"]:checked').forEach(function (box) {
        data.append('entry.' + devicesEntry, box.value);
      });
    }

    button.disabled = true;
    status.textContent = 'Joining…';
    // Google Forms sends no CORS headers, so the response can't be read. A network
    // error still rejects, which is the failure worth reporting.
    fetch('https://docs.google.com/forms/d/e/' + formId + '/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: data
    }).then(function () {
      form.classList.add('done');
      status.textContent = "You're on the list. Thank you! I'll email you when PlanWell Pro is ready to try.";
    }).catch(function () {
      button.disabled = false;
      status.textContent = "That didn't go through. Check your connection and try again.";
    });
  });
})();
