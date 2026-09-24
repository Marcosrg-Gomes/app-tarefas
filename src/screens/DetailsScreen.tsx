import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.status}>
        {task.completed ? 'Concluída' : 'Pendente'}
      </Text>
      <Text style={styles.date}>Criada em: {new Date(task.createdAt).toLocaleString('pt-BR')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  status: {
    fontSize: 16,
    color: '#1D4ED8',
    fontWeight: '600',
    marginBottom: 8,
  },
  date: {
    color: '#6B7280',
    fontSize: 14,
  },
});
