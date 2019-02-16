import Cookies from 'js-cookie'
import { debounce } from 'lodash'
import mdc from '../markdown-core/src/index-browser'

import layout from './layout'
import editor from './editor'
var previewWidth;


if(globalConfig.defaultViewMode === 'preview'){
  gViewMode = "preview";
}else if(globalConfig.defaultViewMode === 'editor'){
  gViewMode = "editor";
}else{
  gViewMode = "all";
}

const getPreviewWidth = () => {
  console.log("getPreviewWidth");

  if(gViewMode === 'preview'){
    return "100%";
  }else if(gViewMode === 'editor'){
    return "1";
  }else{
    return "50%";
  }

  // if (previewWidth === undefined) {
  //   previewWidth = "50%";
  //   return globalConfig.previewWidth
  // }
  // return previewWidth
}

// neither editor or preview is hidden
const getNormalPreviewWidth = () => {
  console.log("getNormalPreviewWidth");
  return "50%";
  let previewWidth = getPreviewWidth()
  if (previewWidth === '1' || previewWidth === '100%') {
    previewWidth = '50%'
  }
  console.log("normal preview width: " + previewWidth);
  return previewWidth
}

// user changes markdown text
const lazyChange = debounce(() => {
  if (layout.panes.east.outerWidth() < 8) { // preview is hidden
    return // no need to update preview if it's hidden
  }
  mdc.init(editor.getValue()) // realtime preview
}, 1024, false)

// adjust layout according to percentage configuration
const lazyResize = debounce(() => {
  layout.sizePane('east', getPreviewWidth())
}, 1024, false)

export { getPreviewWidth, getNormalPreviewWidth, lazyChange, lazyResize }
