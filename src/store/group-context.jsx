import { createContext } from "react";

const GroupContext = createContext({
    groups: [],
    selectedGroup: null,
    addGroup: ()=>{}
});

export default GroupContext;