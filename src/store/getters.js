"use strict";

export default {
    getUsers(state, getters) {
        return _ => {
            try {
                return state.data._embedded.items;
            } catch(e) {
                return [];
            }
        }
    },
    getGroups(state, getters) {
        return _ => {
            try {
                return state.groups;
            } catch(e) {
                return [];
            }
        }
    },
    getChains(state, getters) {
        return _ => {
            try {
                return state.chains;
            } catch(e) {
                return [];
            }
        }
    },
}
