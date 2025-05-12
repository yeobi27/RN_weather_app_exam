// src/screens/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getDistance } from 'geolib';

type Props = NativeStackScreenProps<RootStackParamList, 'Sona'>;

const HomeScreen = ({ navigation }: Props) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log('📍 현재 위치:', loc.coords); // ← 여기 추가!

      setUserCoords({
        // latitude: loc.coords.latitude,
        // longitude: loc.coords.longitude,
        latitude: 35.2113,
        longitude: 129.0096,
      });

      // 내위치 이상하게 가져와져서 임시 : 35.2113, 129.0096
      setRegion({
        // latitude: loc.coords.latitude,
        // longitude: loc.coords.longitude,
        latitude: 35.2113,
        longitude: 129.0096,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);
  useEffect(() => {
    if (errorMsg) {
      Alert.alert('위치 정보를 가져오는 데 실패했습니다.', errorMsg);
    }
  }, [errorMsg]);
  // 예시 랜드마크 (부민병원)
  const landmark = {
    name: '부민병원',
    latitude: 35.2119,
    longitude: 129.0111,
  };

  const handleMarkerPress = () => {
    if (!userCoords) return;

    const distance = getDistance(userCoords, {
      latitude: landmark.latitude,
      longitude: landmark.longitude,
    });

    console.log(`📏 현재 위치와 마커의 거리: ${distance}m`);

    if (distance < 500) {
      navigation.navigate('WishWrite');
    } else {
      Alert.alert('너무 멀어요!', '근처에서만 소원을 빌 수 있어요 🌙');
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{
              latitude: landmark.latitude,
              longitude: landmark.longitude,
            }}
            title={landmark.name}
            onPress={() => {
              handleMarkerPress();
              console.log('📍 마커 클릭됨');
            }}
          />
        </MapView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe042',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  title: {
    fontSize: 28,
    color: 'black',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
});
