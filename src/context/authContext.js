import React from "react";

const authContext = React.createContext({authenticated: false, loginHandle: () => {}}); /* properties added
for autocomplete, will be changed in future. */

export default authContext;