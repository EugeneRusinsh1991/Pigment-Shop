// Diagnostic: find which element actually scrolls on the page
const http = require('http');

const JS_PAYLOAD = `
(function() {
  // Walk up from a deep element and find which ancestors can scroll
  const results = [];
  
  // Check #root
  const root = document.getElementById('root');
  if (root) {
    results.push({
      id: 'root',
      scrollTop: root.scrollTop,
      scrollHeight: root.scrollHeight,
      clientHeight: root.clientHeight,
      overflow: getComputedStyle(root).overflow,
      overflowY: getComputedStyle(root).overflowY,
      canScroll: root.scrollHeight > root.clientHeight
    });
  }

  // Check body
  results.push({
    id: 'body',
    scrollTop: document.body.scrollTop,
    scrollHeight: document.body.scrollHeight,
    clientHeight: document.body.clientHeight,
    overflow: getComputedStyle(document.body).overflow,
    overflowY: getComputedStyle(document.body).overflowY,
    canScroll: document.body.scrollHeight > document.body.clientHeight
  });

  // Check html
  const html = document.documentElement;
  results.push({
    id: 'html',
    scrollTop: html.scrollTop,
    scrollHeight: html.scrollHeight,
    clientHeight: html.clientHeight,
    overflow: getComputedStyle(html).overflow,
    overflowY: getComputedStyle(html).overflowY,
    canScroll: html.scrollHeight > html.clientHeight
  });

  // Check window
  results.push({
    id: 'window',
    scrollY: window.scrollY,
    innerHeight: window.innerHeight
  });

  // Walk #root children recursively (2 levels) to find scrollable elements
  function checkEl(el, depth, path) {
    if (depth > 4 || !el || !el.children) return;
    for (let i = 0; i < el.children.length && i < 10; i++) {
      const child = el.children[i];
      const cs = getComputedStyle(child);
      const tag = child.tagName + (child.id ? '#' + child.id : '') + '.' + (child.className || '').substring(0, 40);
      const info = {
        path: path + '>' + tag,
        scrollTop: child.scrollTop,
        scrollHeight: child.scrollHeight,
        clientHeight: child.clientHeight,
        overflowY: cs.overflowY,
        overflow: cs.overflow,
        canScroll: child.scrollHeight > child.clientHeight
      };
      if (info.canScroll || child.scrollTop > 0) {
        results.push(info);
      }
      checkEl(child, depth + 1, path + '>' + tag);
    }
  }
  
  if (root) checkEl(root, 0, '#root');

  return JSON.stringify(results, null, 2);
})()
`;

// Use CDP to evaluate JS in the browser
const net = require('net');

async function findCDPPort() {
  // Try common CDP ports
  for (const port of [9222, 9229]) {
    try {
      const res = await fetch('http://127.0.0.1:' + port + '/json');
      const tabs = await res.json();
      return { port, tabs };
    } catch(e) {}
  }
  return null;
}

// Alternative: just output the script for manual use
console.log('=== Paste this in browser DevTools console ===');
console.log(JS_PAYLOAD);
