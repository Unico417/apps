/**
 * グローバルなUIDを返す
 * @returns {String}
 */
function uid () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 引数全てが定義済みであれば、trueを返す
 * @param  {...any} targets 
 * @returns 
 */
function defined (...targets) {
    let result = true;
    for (const target of targets) {
        result = result
            && !(target === undefined || target === null);
    }
    return result;
}

export { uid, defined };
