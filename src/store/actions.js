"use strict";

export default {
    
    async init(context, params) {
    
        let apiUsers = await fetch(params.apiLinkUsers);
        let apiGroups = await fetch(params.apiLinkGroups);

        if(!apiUsers.ok && !apiGroups.ok) {
            throw new Error('Connection error');
        }

        let dataUsers = await apiUsers.json();
        let dataGroups = await apiGroups.json();
        
        let groups = dataGroups.groups;
        let chains = dataGroups.chains;

        context.commit('init', {dataUsers, groups, chains});
    
    },

}
