"use strict";

export default {
    
    init(state, data) {
        state.data = data.dataUsers;
        state.groups = data.groups;
        state.chains = data.chains; 
    },
}
