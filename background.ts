import { addExtensionOption, onMenuClickHandler } from "~utils"

// thêm option của extension
chrome.runtime.onInstalled.addListener(addExtensionOption)

// thêm xử lý khi ấn vào option trên
chrome.contextMenus.onClicked.addListener(onMenuClickHandler)

export {}
