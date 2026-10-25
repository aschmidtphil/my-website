/* Lokales Teilen-Vorschaubild aus dem bestehenden Designsystem rendern. */
const fs=require('fs'),path=require('path');
const {chromium}=require('../.tmp-momente/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const font=name=>'data:font/woff2;base64,'+fs.readFileSync(path.join(root,'assets/fonts',name)).toString('base64');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
  await page.setContent(`<!doctype html><html lang="de"><meta charset="utf-8"><style>
   @font-face{font-family:Syne;src:url('${font('syne-latin-wght-normal.woff2')}');font-weight:400 800}
   @font-face{font-family:DM;src:url('${font('dm-sans-latin-wght-normal.woff2')}');font-weight:100 900}
   *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;padding:66px 80px;background:linear-gradient(140deg,#0b0c14,#191b2e);color:#ece6d6;border-top:7px solid #c9a227;font-family:DM,sans-serif}
   h1{font-family:Syne,sans-serif;font-size:100px;line-height:1.1;font-weight:800;letter-spacing:-4px;margin:32px 0 32px}h1 span{color:#c9a227}
   p{font-size:32px;color:#b8b9c8;margin:0 0 18px;line-height:1.4}p:last-of-type{font-size:27px;color:#9a9caf}
   footer{position:absolute;bottom:56px;font-size:25px;color:#c9a227;border-top:2px solid #c9a227;padding-top:22px}
  </style><body><h1>A.Schmidt<span>.</span></h1><p>Philosophie · Mythologie · Persönliche Momente</p><p>Götterkosmos · Philosophen-Timeline · Weltkarte</p><p>Reisen, Alltag und ein Archiv meiner Statusmeldungen</p><footer>aschmidtphil.github.io/my-website</footer></body></html>`);
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:path.join(root,'assets/og-bild-20261025.png')});
  console.log('Teilen-Vorschau erzeugt: assets/og-bild-20261025.png (1200 x 630)');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
