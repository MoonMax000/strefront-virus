'use client';

import { useState, useEffect, useCallback } from 'react';

interface IValidationRule {
  check: (value: string, formData: Record<string, FormFieldValue>) => boolean;
  message: string;
}

export interface IValidationSchema {
  [key: string]: IValidationRule[];
}

type FormFieldValue = string | string[] | number | boolean | null | undefined;

export interface IFormErrors {
  [key: string]: string | undefined;
}

export const useForm = <T>(
  onSubmit: (formData: T) => Promise<null | string | undefined | void> | void,
  validationSchema: IValidationSchema,
  initValue: T = {} as T,
  activeField?: string,
) => {
  const [formData, setFormData] = useState<T>(initValue);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [isProgress, setIsProgress] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [formError, setFormError] = useState<null | string>(null);

  useEffect(() => {
    setFormData(initValue);
  }, [initValue]);

  const handleChangeField = useCallback(
    (name: keyof T) => (newValue: FormFieldValue) => {
      const value: FormFieldValue = newValue;

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e && 'preventDefault' in e) {
      e.preventDefault();
    }
    setShowErrors(true);
    if (isValid) {
      setIsProgress(true);
      setFormError(null);
      const call = async () => {
        try {
          const res = await onSubmit(formData);
          setFormError(res || null);
        } catch (error) {
          if (error instanceof Error) {
            setFormError(error.message);
          } else {
            setFormError('Unknown error occurred');
          }
        } finally {
          setIsProgress(false);
        }
      };
      call();
    }
  };

  const handleReset = () => {
    setFormData(JSON.parse(JSON.stringify(initValue)));
    setShowErrors(false);
  };

  const setExternalErrors = (externalErrors: IFormErrors) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...externalErrors,
    }));
    setIsValid(Object.values(externalErrors).every((el) => el === undefined));
  };

  useEffect(() => {
    const newErrors: IFormErrors = {};

    if (activeField) {
      validationSchema[activeField]?.forEach((rule) => {
        if (
          !rule.check(
            (formData as Record<string, FormFieldValue>)[activeField]?.toString() || '',
            formData as Record<string, FormFieldValue>,
          )
        ) {
          newErrors[activeField] = rule.message;
        }
      });
    } else {
      Object.keys(validationSchema).forEach((key) => {
        validationSchema[key].forEach((rule) => {
          if (newErrors[key]) {
            return;
          }
          if (
            !rule.check(
              (formData as Record<string, FormFieldValue>)[key]?.toString() || '',
              formData as Record<string, FormFieldValue>,
            )
          ) {
            newErrors[key] = rule.message;
          }
        });
      });
    }

    setErrors(newErrors);
    setIsValid(Object.values(newErrors).every((el) => el == undefined));
  }, [formData, validationSchema, activeField]);

  return {
    handleChangeField,
    formData,
    handleSubmit,
    handleReset,
    setExternalErrors,
    errors,
    isValid,
    showErrors,
    formError,
    isProgress,
    setFormData,
  };
};
