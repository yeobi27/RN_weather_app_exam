import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const WishWriteScreen = () => {
  const [wishText, setWishText] = useState('');

  const handleSubmitWish = () => {
    if (!wishText.trim()) {
      Alert.alert('⚠️ 소원을 입력해주세요.');
      return;
    }

    // 여기서 서버 저장, 로컬 저장 등 실제 저장 로직을 연결하면 됨
    Alert.alert('🌟 소원이 등록되었습니다!', wishText);
    setWishText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌠 소원을 적어보세요</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 건강하게 해주세요"
        multiline
        value={wishText}
        onChangeText={setWishText}
      />
      <Button title="소원 빌기" onPress={handleSubmitWish} color="#4CAF50" />
    </View>
  );
};

export default WishWriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    height: 150,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});
