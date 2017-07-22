export function awardUidToId(aid) {
    return parseInt(aid.replace('award:', ''), 10);
}

export function compareAwards(award1, award2) {
    return !!award1 && !!award2 && award1.aid === award2.aid;
}

export function compareUsers(user1, user2) {
    return !!user1 && !!user2 && user1.uid === user2.uid;
}

export function createAwardUid(id) {
    return 'award:' + id;
}

export function getItemIndex(list, item, predicate) {
    let i = 0, len = list.length;

    for (i; i < len; ++i) {
        if (predicate(list[i], item)) {
            return i;
        }
    }

    return -1;
}
