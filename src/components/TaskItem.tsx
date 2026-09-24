import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onPress }: TaskItemProps) {
  return (
    <Pressable onPress={() => onPress(task)} style={styles.card}>
      <Pressable onPress={() => onToggle(task.id)} style={styles.checkBox}>
        <Text style={styles.checkBoxText}>{task.completed ? '✓' : ''}</Text>
      </Pressable>

      <View style={styles.body}>
        <Text style={[styles.title, task.completed && styles.titleDone]}>{task.title}</Text>
        <Text style={styles.meta}>{new Date(task.createdAt).toLocaleDateString('pt-BR')}</Text>
      </View>

      <Pressable onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Excluir</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#60A5FA',
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkBoxText: {
    color: '#1D4ED8',
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  meta: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  deleteText: {
    color: '#B91C1C',
    fontWeight: '600',
  },
});
