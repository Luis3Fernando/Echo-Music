import { Switch } from 'react-native';
import { Colors } from '@theme/colors';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const Toggle = ({ value, onValueChange }: ToggleProps) => (
  <Switch
    trackColor={{ false: "#D1D1D1", true: Colors.primary }}
    thumbColor={Colors.white}
    ios_backgroundColor="#D1D1D1"
    onValueChange={onValueChange}
    value={value}
  />
);

export default Toggle;