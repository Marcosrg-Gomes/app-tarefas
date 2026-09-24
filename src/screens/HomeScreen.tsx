
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Task, Filter } from '../types';
import AddTaskInput from '../components/AddTaskInput';
import TaskItem from '../components/TaskItem';
import FilterTabs from '../components/FilterTabs';

const STORAGE_KEY = '@todo:tasks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>('all');

    // Etapa 8: carregar tarefas salvas localmente
    useEffect(() => {
        (async () => {
            try {
                const json = await AsyncStorage.getItem(STORAGE_KEY);
                if (json) setTasks(JSON.parse(json));
            } catch (e) {
                console.warn('Falha ao carregar tarefas', e);
            }
        })();
    }, []);

    // Etapa 8: persistir a cada mudanca
    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(() => { });
    }, [tasks]);

    // Etapa 3: adicionar tarefa
    const addTask = (title: string) => {
        const task: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        setTasks(prev => [task, ...prev]);
    };

    // Etapa 4: marcar como concluida
    const toggleTask = (id: string) => {
        setTasks(prev =>
            prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
        );
    };

    // Etapa 5: excluir tarefa
    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    // Etapa 9: filtros
    const visible = tasks.filter(t => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const pendingCount = tasks.filter(t => !t.completed).length;

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Minhas tarefas</Text>
                <Text style={styles.subtitle}>
                    {pendingCount === 0
                        ? 'Tudo em dia'
                        : pendingCount + (pendingCount === 1 ? ' tarefa pendente' : ' tarefas pendentes')}
                </Text>

                <AddTaskInput onAdd={addTask} />
                <FilterTabs value={filter} onChange={setFilter} />

                <FlatList
                    data={visible}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        // Etapa 7: tocar abre a segunda tela com detalhes
                        <TaskItem
                            task={item}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onPress={task => navigation.navigate('Details', { task })}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.empty}>Nenhuma tarefa por aqui.</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { 
        flex: 1, 
        backgroundColor: '#F7F8FA' 
    },
    container: { 
        flex: 1, 
        paddingHorizontal: 20, 
        paddingTop: 24 
    },
    title: { 
        fontSize: 28, 
        fontWeight: '700', 
        color: '#111827' 
    },
    subtitle: { 
        fontSize: 14, 
        color: '#6B7280', 
        marginTop: 4, 
        marginBottom: 24 
    },
    empty: { 
        textAlign: 'center', 
        color: '#9CA3AF', 
        marginTop: 48 
    },
});