let TOKENS = {
  //_lunesfullnode
  "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": "ZEN Token",
  //_odyx.me
  "3NjPCAdGhPPWs8bJjauAjuRHRuzsgicA58J1fAF3q89J": "OPN Token",
  "FaX52248YNpHY1WUyCipamX51177P2Y3NmJ3imZw7fzG": "Teste Token",
  //_thelordofnodes
  "": "Not found",
  //_lunes.in
  // "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": "ZEN Token",
  //legion.cash
  "": "Not Found",
  //_spartan node
  "": "Not Found",
  //_lunesrealnode.com
  "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk": "NEO Token",
  // "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": "ZEN Token",
  "Gf5ko4JJ2jRrtEnRdZXJ15cF3cuFVHRZti9sBXcspba8": "NEO Token",
  //_masternodebrasil
  "":"Not Found"
}

function findAssetName(assetId) {
  let token = TOKENS[assetId]
  if (!token)
    return "LUNES"
  return token
}

export {
    TOKENS,
    findAssetName
}
