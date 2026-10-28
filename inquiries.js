(() => {
  'use strict';
  const hub = document.querySelector('[data-inquiry-hub]');
  if (!hub) return;
  const tablist = hub.querySelector('.inquiry-tabs');
  const tabs = [...tablist.querySelectorAll('[data-inquiry-kind]')];
  const panels = [...hub.querySelectorAll('[data-inquiry-panel]')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const panelFor = kind => panels.find(panel => panel.dataset.inquiryPanel === kind);
  const kindFromHash = () => panels.find(panel => `#${panel.id}` === window.location.hash)?.dataset.inquiryPanel;

  function selectPanel(kind, focusTab = false) {
    const selected = panelFor(kind);
    if (!selected) return null;
    panels.forEach(panel => { panel.hidden = panel !== selected; });
    tabs.forEach(tab => {
      const active = tab.dataset.inquiryKind === kind;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus({ preventScroll: true });
    });
    return selected;
  }

  function updateHash(panel) {
    if (window.location.hash !== `#${panel.id}`) {
      window.history.pushState(null, '', `#${panel.id}`);
    }
  }

  function selectValue(panel, name, value) {
    if (!value) return;
    const field = panel.querySelector(`select[name="${name}"]`);
    if (!field || ![...field.options].some(option => option.value === value)) return;
    // Only an explicitly requested selection changes; typed fields are never reset.
    field.value = value;
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }

  tablist.setAttribute('role', 'tablist');
  tabs.forEach(tab => {
    const panel = panelFor(tab.dataset.inquiryKind);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
  });
  hub.classList.add('is-enhanced');
  selectPanel(kindFromHash() || 'franchise');

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = event.target.closest('[data-inquiry-kind], a[href="#franchise-inquiry"], a[href="#member-inquiry"], a[href="#recruitment-inquiry"]');
    if (!trigger) return;
    const kind = trigger.dataset.inquiryKind || panels.find(panel => `#${panel.id}` === trigger.getAttribute('href'))?.dataset.inquiryPanel;
    const panel = selectPanel(kind, tablist.contains(trigger));
    if (!panel) return;
    event.preventDefault();
    selectValue(panel, 'branch', trigger.dataset.inquiryBranch);
    selectValue(panel, 'interest', trigger.dataset.inquiryInterest);
    selectValue(panel, 'role', trigger.dataset.inquiryRole);
    updateHash(panel);
    if (!tablist.contains(trigger)) {
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' });
    }
  });

  tablist.addEventListener('keydown', event => {
    const index = tabs.indexOf(event.target);
    if (index === -1) return;
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else if (event.key === ' ') { event.preventDefault(); event.target.click(); return; }
    else return;
    event.preventDefault();
    const panel = selectPanel(tabs[next].dataset.inquiryKind, true);
    updateHash(panel);
  });

  const syncHash = () => {
    const kind = kindFromHash();
    if (kind) {
      const panel = selectPanel(kind);
      requestAnimationFrame(() => panel.scrollIntoView({ behavior: 'instant', block: 'start' }));
    }
  };
  window.addEventListener('hashchange', syncHash);
  window.addEventListener('popstate', syncHash);
  if (kindFromHash()) syncHash();
  // No submit interception: browser validation and Netlify's real POST response apply.
})();
