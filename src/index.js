import $ from 'jquery'
import saveAs from "./FileSaver.js"
import { Base64 } from './base64.js'

window.$ = window.jQuery = $
var head = $("head").html();
var mybody = $("body").html();
var md = $("#saved").html();
console.log("body = " + mybody);
var includeJS = "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal.min.js\"></script>\n" +
  "    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js\"></script>\n" +
  "    <script src=\"https://cdn.jsdelivr.net/jquery.layout/1.4.3/jquery.layout.min.js\"></script>";
// load sample text and get anchor links correct
$(() => {
  const editor = require('./editor').default
  $(document).keydown(function(e){
    // ctrl + s
    if( e.ctrlKey  == true && e.keyCode == 83 ){
      console.log('ctrl+s: ');
      let md = editor.getValue();
      editor.setValue('');
      let html = "\ufeff<!DOCTYPE html><html><head>" + head + "</head><body>" + "<template id='saved'>" + Base64.encode(md) +  "</template>" + mybody  + includeJS + "</body></html>";
      console.log("html: " + html);
      console.log("path: " + location.pathname);
      var blob = new Blob([html], {type: "text/plain;charset=UTF-8"});
      saveAs(blob, "测试.html");
      editor.setValue(md);
      return false; // 截取返回false就不会保存网页了
    }
  });

  require('./init')
  require('./preferences')
  require('./index.css')
  console.log("md: " + md);
  if(md != null && md != undefined && md.length>0){
    editor.setValue(Base64.decode(md));
    setTimeout(() => {
      editor.setValue(Base64.decode(md));
      editor.refresh();
      console.log("remove");
      $("#saved").remove();
      editor.refresh();
      // a little gap to top
      window.addEventListener('hashchange', () => {
        $('.ui-layout-east').scrollTop($('.ui-layout-east').scrollTop() - 6)
      })

      // scroll to hash element
      if (window.location.hash.length > 0) {
        $('.ui-layout-east').scrollTop($(window.location.hash).offset().top - 30)
      }
    }, 1);
  }

})
