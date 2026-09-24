const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:3000/#dashboard",
  virtualConsole
});

dom.window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const routerView = dom.window.document.getElementById("router-view");
    console.log("ROUTER VIEW HTML LENGTH:", routerView.innerHTML.length);
    if (routerView.innerHTML.length < 500) {
        console.log("ROUTER VIEW:", routerView.innerHTML);
    }
  }, 1000);
});
