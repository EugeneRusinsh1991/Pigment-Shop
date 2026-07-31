import { registerRootComponent } from 'expo';
import React from 'react';
import { Text, View } from 'react-native';

function RootApp() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e6ffe6' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#000' }}>EXPO NATIVE TEST SUCCESS</Text>
    </View>
  );
}

registerRootComponent(RootApp);
