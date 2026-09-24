import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

type AddTaskInputProps = {
  onAdd: (title: string) => void;
};

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    const value = text.trim();
    if (!value) return;

    onAdd(value);
    setText('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Adicionar tarefa"
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        onSubmitEditing={handleAdd}
      />
      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#111827',
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
