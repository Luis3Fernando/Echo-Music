import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@theme/colors';
import Toggle from '../atoms/Toggle';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  iconBgColor: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

const SettingOption = ({ 
  icon, 
  iconBgColor, 
  title, 
  description, 
  value, 
  onValueChange 
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon} size={20} color={Colors.white} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Toggle value={value} onValueChange={onValueChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 0,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
  },
  description: {
    fontSize: 11,
    color: Colors.gray,
    marginTop: 2,
    lineHeight: 14,
  },
});

export default SettingOption;