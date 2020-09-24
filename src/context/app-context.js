// Create a context for managing application settings and provide this at the application level
  // Display or Hide completed items (boolean)
  // Number of items to display per screen (number)
  // Default sort field (string)
  // You may manually set (hard code) those state settings in the context provider during development

import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const state = {

  };

  return(
    <SettingsProvider value={state}>
      {props.children}
    </SettingsProvider>
  )
}

export default SettingsProvider;