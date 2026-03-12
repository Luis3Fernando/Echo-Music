import { View, StyleSheet } from "react-native";
import { InputText } from "../atoms/InputText";
import { TextError } from "../atoms/TextError";

interface FormFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  [key: string]: any; 
}

export const FormField = ({ label, error, touched, ...props }: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <InputText 
        label={label} 
        error={error}
        touched={touched}
        {...props} 
      />
      {touched && error && <TextError>{error}</TextError>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    marginBottom: 16,
    width: "100%",
  }
});