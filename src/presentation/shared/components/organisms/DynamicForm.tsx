import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { Spacing } from "@/core/theme/spacing";
import { InputImage } from "../atoms/InputImage";

interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "image";
  multiline?: boolean;
}

interface DynamicFormProps {
  fields: FieldConfig[];
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => void;
  submitLabel: string;
}

export const DynamicForm = ({ 
  fields, 
  initialValues, 
  validationSchema, 
  onSubmit, 
  submitLabel 
}: DynamicFormProps) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize 
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formWrapper}>
            <View style={styles.fieldsContainer}>
              {fields.map((field) => {
                if (field.type === "image") {
                  return (
                    <View key={field.name} style={styles.imageWrapper}>
                      <InputImage
                        label={field.label}
                        currentImage={values[field.name]}
                        onImagePicked={(uri) => setFieldValue(field.name, uri)}
                      />
                    </View>
                  );
                }
                return (
                  <FormField
                    key={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    multiline={field.multiline}
                    onChangeText={handleChange(field.name)}
                    onBlur={handleBlur(field.name)}
                    value={values[field.name]}
                    error={errors[field.name] as string}
                    touched={touched[field.name] as boolean}
                    keyboardType={field.type === "number" ? "numeric" : "default"}
                  />
                );
              })}
            </View>
            <View style={styles.footer}>
              <Button 
                title={submitLabel} 
                onPress={handleSubmit} 
                textColor="white"
                style={styles.submitBtn}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  formWrapper: {
    flex: 1, 
    justifyContent: "space-between",
  },
  fieldsContainer: {
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  footer: {
  },
  submitBtn: {
    width: "100%",
  },
});