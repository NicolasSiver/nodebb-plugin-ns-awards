export function awardUidToId(aid) {
    return parseInt(aid.replace('award:', ''), 10);
}

export function createAwardUid(id) {
    return 'award:' + id;
}
