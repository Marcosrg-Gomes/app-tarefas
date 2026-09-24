import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Filter } from '../types';

type FilterTabsProps = {
  value: Filter;
  onChange: (value: Filter) => void;
};

const tabs: Filter[] = ['all', 'pending', 'completed'];

export default function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <View style={styles.row}>
      {tabs.map((tab) => {
        const isActive = value === tab;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.tab, isActive && styles.tabActive]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab === 'all' ? 'Todos' : tab === 'pending' ? 'Pendentes' : 'Concluídas'}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#DBEAFE',
  },
  tabText: {
    color: '#374151',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#1D4ED8',
  },
});
