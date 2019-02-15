import $ from 'jquery'
import saveAs from './FileSaver.js'

window.$ = window.jQuery = $
var htmlHead = $('head').html();
var htmlBody = $('body').html();
var md = localStorage.getItem(location.pathname);
if (md == null || md.length == 0) {
  md = $('#saved').html();
}
const includeJS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/remodal/1.1.1/remodal.min.js"></script>\n' +
  '    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>\n' +
  '    <script src="https://cdn.jsdelivr.net/jquery.layout/1.4.3/jquery.layout.min.js"></script>'
$(() => {
  const editor = require('./editor').default
  $(document).keydown(function (e) {
    // ctrl + s
    if (e.ctrlKey == true && e.keyCode == 83) {
      let md = editor.getValue()
      localStorage.setItem(location.pathname, md)
      return false
    }
  })

  $('#save_file').click(() => {
    let md = editor.getValue()
    let html = '\ufeff<!DOCTYPE html><html><head>' + htmlHead + '</head><body>' +
      '<xmp id=\'saved\' style=\'visibility: hidden\'>' + md + '</xmp>' +
      htmlBody + includeJS + '</body></html>'
    let blob = new Blob([html], {type: 'text/plain;charset=UTF-8'});
    let pos = location.pathname.lastIndexOf("/");
    saveAs(blob, location.pathname.substr(pos+1))
    localStorage.removeItem(location.pathname);
  });

  require('./init')
  require('./preferences')
  require('./index.css')
  if (md != null && md != undefined && md.length > 0) {
    setTimeout(() => {
      $('#saved').remove()
      editor.setValue(md)
      editor.refresh()
    }, 1)
  }

})
